"use client";

// The tour engine. All mutable state lives at module scope; React only subscribes
// through the store. One requestAnimationFrame loop advances the clock, moves the
// stage from stop to stop and publishes changes.
import { tourChapters } from "@/content/tour";
import { reveal, REVEAL_SELECTOR } from "@/lib/reveal";
import {
  buildTimeline,
  chapterAt,
  chapterStart,
  duckEnvelope,
  frameAt,
  prevTarget,
  scrollDuration,
  scrollTopFor,
  type TimelineStop,
  TOUR_TIMELINE_ESTIMATE,
  tourManifest,
  type TourTimeline,
} from "@/lib/tour";
import { fetchNarration, loadStopBuffer, playStop } from "@/lib/tour/narration";
import { MUSIC_LEVEL, type ScoreHandle, startScore } from "@/lib/tour/score";

import { createStage, type Stage } from "./stage";
import {
  emitTourFrame,
  getAudioContext,
  getSnapshot,
  loadTourPrefs,
  type PauseReason,
  primeAudio,
  resetTourState,
  saveTourPrefs,
  setTourState,
  type TourScroller,
  type TourSpeed,
} from "./store";

const MOBILE_QUERY = "(max-width: 980px)";
const MOBILE_HEADER = 68;
const DESKTOP_TOP_INSET = 24;
const PLAYER_FALLBACK = 190;
const PLAYER_GAP = 16;
const CUT_OUT_MS = 170;
const VOICE_LEVEL = 0.95;
const FIRST_AUDIO_WAIT_MS = 4000;
const AUDIO_START_WAIT_MS = 300;
const FETCH_CONCURRENCY = 3;

type LogEntry = { at: number; type: string; [key: string]: unknown };

let scroller: TourScroller | null = null;
let timeline: TourTimeline | null = null;
let active = false;
let playing = false;
let base = 0;
let wallAt = 0;
let raf = 0;
let stopIndex = -1;
let activeEl: HTMLElement | null = null;
let invokerEl: HTMLElement | null = null;
let scrolling = false;
let cutting = false;
let teardown: (() => void)[] = [];
let startToken = 0;
let stage: Stage | null = null;
// Playback speed. The tour clock runs `rate` timeline-seconds per real second; the
// voice follows through playbackRate, scrolls and pointer moves shorten to match.
let rate = 1;
let rateDirty = false;

// Audio. `mode` picks the clock: the AudioContext when it is running (pause freezes
// sound and clock together), otherwise performance.now() so captions still advance.
let ctx: AudioContext | null = null;
let master: DynamicsCompressorNode | null = null;
let voiceBus: GainNode | null = null;
let duck: GainNode | null = null;
let musicBus: GainNode | null = null;
let score: ScoreHandle | null = null;
let mode: "audio" | "perf" = "perf";
const buffers = new Map<string, AudioBuffer>();
const requests = new Map<string, Promise<void>>();
const failed = new Set<string>();
let sources: { id: string; source: AudioBufferSourceNode }[] = [];
let queue: TimelineStop[] = [];
let workers = 0;
const eventLog: LogEntry[] = [];

const html = () => document.documentElement;
const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function log(type: string, extra: Record<string, unknown> = {}) {
  eventLog.push({ at: Math.round(performance.now()), type, ...extra });
  if (eventLog.length > 400) eventLog.shift();
}

export function attach(next: TourScroller) {
  scroller = next;
}

export function preload() {
  for (const stop of TOUR_TIMELINE_ESTIMATE.stops.slice(0, 3)) {
    if (stop.audio) void fetchNarration(stop.audio).catch(() => undefined);
  }
}

const clockNow = () =>
  mode === "audio" && ctx ? ctx.currentTime : performance.now() / 1000;
const delay = (ms: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, ms));

function now() {
  if (!timeline) return 0;
  const t = playing ? base + (clockNow() - wallAt) * rate : base;
  return Math.min(t, timeline.duration);
}

/** Context time at which timeline time `t` is heard. Valid right after base/wallAt are set. */
const contextTimeAt = (t: number) => wallAt + (t - base) / rate;

function setMode(next: "audio" | "perf") {
  if (mode === next) return;
  base = now();
  mode = next;
  wallAt = clockNow();
}

function ensureGraph() {
  if (!ctx || master) return;
  master = ctx.createDynamicsCompressor();
  master.threshold.value = -10;
  master.ratio.value = 3;
  master.connect(ctx.destination);
  voiceBus = ctx.createGain();
  voiceBus.gain.value = getSnapshot().voice ? VOICE_LEVEL : 0;
  voiceBus.connect(master);
  // score -> duck -> musicBus -> master
  musicBus = ctx.createGain();
  musicBus.gain.value = getSnapshot().music ? 1 : 0;
  musicBus.connect(master);
  duck = ctx.createGain();
  duck.connect(musicBus);
}

function envelopeAt(env: [number, number][], t: number) {
  let value = 1;
  for (let i = 0; i < env.length; i += 1) {
    if (env[i][0] > t) {
      const prev = env[i - 1] ?? env[i];
      return (
        prev[1] +
        ((env[i][1] - prev[1]) * (t - prev[0])) /
          Math.max(1e-6, env[i][0] - prev[0])
      );
    }
    value = env[i][1];
  }
  return value;
}

/** Duck the bed under the narration on the tour timeline; flat when there is no voice to duck for. */
function scheduleDuck(fromT: number) {
  if (!ctx || !duck || !timeline) return;
  const gain = duck.gain;
  const c = ctx.currentTime;
  gain.cancelScheduledValues(c);
  const snap = getSnapshot();
  if (!snap.voice || snap.narration === "unavailable") {
    gain.setTargetAtTime(1, c, 0.25);
    return;
  }
  const env = duckEnvelope(timeline);
  gain.setValueAtTime(envelopeAt(env, fromT), c);
  for (const [t, value] of env) {
    if (t > fromT) gain.linearRampToValueAtTime(value, contextTimeAt(t));
  }
}

/** Fade in at the start (or quickly after a seek) and out over the last 3 s. */
function scheduleMusic(fromT: number, fresh: boolean) {
  if (!ctx || !score || !timeline) return;
  const gain = score.level.gain;
  const c = ctx.currentTime;
  gain.cancelScheduledValues(c);
  if (fresh) {
    gain.setValueAtTime(0, c);
    gain.linearRampToValueAtTime(MUSIC_LEVEL, c + 3.5);
  } else {
    gain.setValueAtTime(gain.value, c);
    gain.linearRampToValueAtTime(MUSIC_LEVEL, c + 0.6);
  }
  const fadeStart = Math.max(timeline.duration - 3, fromT + 0.7);
  gain.setValueAtTime(MUSIC_LEVEL, Math.max(contextTimeAt(fadeStart), c + 0.6));
  gain.linearRampToValueAtTime(0, contextTimeAt(timeline.duration + 0.5));
  scheduleDuck(fromT);
}

function beginScore(fromT: number) {
  if (!ctx || !duck || mode !== "audio") return;
  score?.stop(0.1);
  score = startScore(ctx, duck, { seed: 3 });
  score.schedule(ctx.currentTime + 6);
  scheduleMusic(fromT, fromT < 0.5);
}

function stopSources() {
  for (const { source } of sources) {
    try {
      source.stop();
    } catch {
      // Already ended.
    }
    source.disconnect();
  }
  sources = [];
}

function scheduleStop(stop: TimelineStop) {
  const buffer = buffers.get(stop.id);
  if (!ctx || !voiceBus || mode !== "audio" || !buffer || !playing) return;
  const t = now();
  if (stop.voiceEnd - t < 0.25) return;
  if (sources.some((entry) => entry.id === stop.id)) return;
  // A stop already under way (speed change, late decode) joins at its own offset.
  const late = Math.max(0, t - stop.voiceStart);
  const source = playStop(
    ctx,
    voiceBus,
    buffer,
    late > 0.03 ? ctx.currentTime : contextTimeAt(stop.voiceStart),
    late > 0.03 ? late : 0,
    rate
  );
  const entry = { id: stop.id, source };
  sources.push(entry);
  source.onended = () => {
    sources = sources.filter((item) => item !== entry);
  };
}

function scheduleAll() {
  stopSources();
  if (!timeline) return;
  for (const stop of timeline.stops) scheduleStop(stop);
}

function updateNarration() {
  if (!timeline) return;
  const withAudio = timeline.stops.filter((stop) => stop.audio);
  let narration = getSnapshot().narration;
  if (!ctx || withAudio.length === 0) narration = "unavailable";
  else if (failed.size > 0 && failed.size >= withAudio.length)
    narration = "unavailable";
  else if (buffers.size > 0) narration = failed.size > 0 ? "partial" : "ready";
  else narration = "pending";
  setTourState({ narration });
  if (narration === "unavailable" && score) scheduleDuck(now());
}

function request(stop: TimelineStop) {
  if (!ctx || !stop.audio) return Promise.resolve();
  let pending = requests.get(stop.id);
  if (!pending) {
    pending = loadStopBuffer(ctx, stop.audio).then(
      (buffer) => {
        if (!active) return;
        buffers.set(stop.id, buffer);
        log("audio", { id: stop.id });
        scheduleStop(stop);
      },
      () => {
        failed.add(stop.id);
        log("audio-failed", { id: stop.id });
      }
    );
    pending = pending.then(updateNarration);
    requests.set(stop.id, pending);
  }
  return pending;
}

async function worker() {
  workers += 1;
  try {
    while (queue.length) {
      const stop = queue.shift();
      if (stop) await request(stop);
    }
  } finally {
    workers -= 1;
  }
}

/** Fetch stops in play order from `index`, then the ones before it. */
function prioritize(index: number) {
  if (!timeline || !ctx || !getSnapshot().voice) return;
  const stops = timeline.stops;
  queue = [...stops.slice(index), ...stops.slice(0, index)].filter(
    (stop) => stop.audio && !requests.has(stop.id)
  );
  while (workers < FETCH_CONCURRENCY && queue.length) void worker();
}

function stopElement(selector: string) {
  return document.querySelector<HTMLElement>(`[data-tour-stop="${selector}"]`);
}

function computeTarget() {
  if (!activeEl) return null;
  const viewportH = window.innerHeight;
  const rect = activeEl.getBoundingClientRect();
  const player = document.querySelector<HTMLElement>(".tour-player");
  const bottomInset = player
    ? Math.max(0, viewportH - player.getBoundingClientRect().top) + PLAYER_GAP
    : PLAYER_FALLBACK;
  return scrollTopFor({
    elTop: rect.top + window.scrollY,
    elHeight: rect.height,
    viewportH,
    topInset: window.matchMedia(MOBILE_QUERY).matches
      ? MOBILE_HEADER
      : DESKTOP_TOP_INSET,
    bottomInset,
    maxScroll: Math.max(0, document.documentElement.scrollHeight - viewportH),
  });
}

function releaseScrolling(afterMs: number) {
  window.setTimeout(() => {
    scrolling = false;
  }, afterMs);
}

/** Scroll the active stop into place; `onSettled` runs once, when the page has stopped. */
function align(instant = false, onSettled?: () => void) {
  let settled = false;
  const settle = () => {
    if (settled) return;
    settled = true;
    onSettled?.();
  };
  const target = computeTarget();
  if (target === null || !scroller) {
    settle();
    return;
  }
  const distance = target - window.scrollY;
  if (Math.abs(distance) < 2) {
    settle();
    return;
  }

  const planned = instant
    ? 0
    : scrollDuration(distance, window.innerHeight, reducedMotion());
  if (planned === "cut") {
    cut(target, settle);
    return;
  }
  const duration = planned / rate;
  scrolling = true;
  if (duration === 0) {
    scroller.scrollPageTo(target, { duration: 0, immediate: true });
    releaseScrolling(120);
    window.requestAnimationFrame(settle);
    return;
  }
  scroller.scrollPageTo(target, {
    duration,
    onComplete: () => {
      scrolling = false;
      settle();
    },
  });
  releaseScrolling(duration * 1000 + 300);
  window.setTimeout(settle, duration * 1000 + 120);
}

function cut(target: number, onSettled?: () => void) {
  if (!scroller) return;
  log("cut", { target: Math.round(target) });
  cutting = true;
  scrolling = true;
  html().classList.add("tour-cut");
  window.setTimeout(
    () => {
      scroller?.scrollPageTo(target, { duration: 0, immediate: true });
      window.requestAnimationFrame(() =>
        window.requestAnimationFrame(() => {
          html().classList.remove("tour-cut");
          cutting = false;
          releaseScrolling(300);
          onSettled?.();
        })
      );
    },
    reducedMotion() ? 0 : CUT_OUT_MS
  );
}

export function realign() {
  if (!active || getSnapshot().status === "idle") return;
  align(true, () => {
    stage?.refresh();
    if (activeEl) stage?.point(activeEl, true);
  });
}

function enterStop(index: number) {
  if (!timeline) return;
  const stop = timeline.stops[index];
  const el = stopElement(stop.stop);
  if (activeEl && activeEl !== el) activeEl.removeAttribute("data-tour-active");
  activeEl = el;
  if (!el) return;
  el.setAttribute("data-tour-active", "");
  log("stop", { id: stop.id });
  stage?.highlight(el);
  align(false, () => {
    stage?.refresh();
    if (active && activeEl === el) stage?.point(el);
  });
}

function setStage(status: "playing" | "paused" | "ended") {
  html().dataset.tour = status;
}

function update(t: number) {
  if (!timeline) return;
  const frame = frameAt(timeline, t);
  emitTourFrame(t);
  if (frame.ended) {
    finish();
    return;
  }
  if (frame.stop !== stopIndex) {
    const previousChapter =
      stopIndex >= 0 ? timeline.stops[stopIndex].chapter : -1;
    stopIndex = frame.stop;
    if (frame.chapter !== previousChapter)
      log("chapter", { index: frame.chapter });
    enterStop(frame.stop);
  }
  const snap = getSnapshot();
  if (
    snap.chapter !== frame.chapter ||
    snap.stop !== frame.stop ||
    snap.cue !== frame.cue
  ) {
    if (snap.cue !== frame.cue && frame.cue) log("cue", { text: frame.cue });
    setTourState({ chapter: frame.chapter, stop: frame.stop, cue: frame.cue });
  }
}

function tick() {
  raf = 0;
  if (!active || !playing) return;
  update(now());
  if (ctx && score) score.schedule(ctx.currentTime + 6);
  if (playing && active) raf = window.requestAnimationFrame(tick);
}

function startLoop() {
  if (!raf) raf = window.requestAnimationFrame(tick);
}

function finish() {
  if (!timeline) return;
  playing = false;
  base = timeline.duration;
  window.cancelAnimationFrame(raf);
  raf = 0;
  stopSources();
  if (mode === "audio") {
    // Let the score's closing fade finish before the context freezes.
    window.setTimeout(() => {
      if (getSnapshot().status !== "ended") return;
      score?.stop(0.2);
      score = null;
      void ctx?.suspend();
    }, 900);
  }
  setStage("ended");
  setTourState({ status: "ended", cue: null, pauseReason: null });
  emitTourFrame(timeline.duration);
  log("end");
}

export function pause(reason: Exclude<PauseReason, null> = "user") {
  if (!active || !playing) return;
  base = now();
  playing = false;
  window.cancelAnimationFrame(raf);
  raf = 0;
  if (mode === "audio") void ctx?.suspend();
  setStage("paused");
  setTourState({ status: "paused", pauseReason: reason });
  log("pause", { reason });
}

export function resume() {
  if (!active) return;
  const status = getSnapshot().status;
  if (status === "ended") {
    replay();
    return;
  }
  if (status !== "paused") return;
  align();
  wallAt = clockNow();
  playing = true;
  if (mode === "audio") {
    void ctx?.resume();
    if (rateDirty) {
      rateDirty = false;
      stopSources();
      if (score) scheduleMusic(base, false);
    }
    if (sources.length === 0) scheduleAll();
  }
  setStage("playing");
  setTourState({ status: "playing", pauseReason: null });
  startLoop();
  log("resume");
}

export function toggle() {
  const status = getSnapshot().status;
  if (status === "playing") pause("user");
  else resume();
}

function seek(t: number) {
  if (!timeline || !active) return;
  if (getSnapshot().status === "loading") {
    // Still preparing: move the start point, `start` begins playback from here.
    base = Math.min(Math.max(t, 0), timeline.duration);
    stopIndex = -1;
    update(base);
    prioritize(frameAt(timeline, base).stop);
    return;
  }
  const wasEnded = getSnapshot().status === "ended";
  stopSources();
  if (wasEnded) {
    score?.stop(0.1);
    score = null;
  }
  base = Math.min(Math.max(t, 0), timeline.duration);
  wallAt = clockNow();
  stopIndex = -1;
  log("seek", { to: Number(base.toFixed(2)) });
  if (base >= timeline.duration) {
    update(base);
    return;
  }
  if (!playing) {
    playing = true;
    setStage("playing");
    setTourState({ status: "playing", pauseReason: null });
  }
  if (mode === "audio") void ctx?.resume();
  update(base);
  scheduleAll();
  if (score) scheduleMusic(base, false);
  else beginScore(base);
  prioritize(frameAt(timeline, base).stop);
  startLoop();
}

export function goToChapter(index: number) {
  if (!timeline) return;
  seek(chapterStart(timeline, index));
}

export function next() {
  if (!timeline) return;
  const current = chapterAt(timeline, now());
  if (current >= timeline.chapters.length - 1) seek(timeline.duration);
  else goToChapter(current + 1);
}

export function prev() {
  if (!timeline) return;
  seek(prevTarget(timeline, now()));
}

export function replay() {
  seek(0);
}

function isOverlayOpen() {
  const classes = html().classList;
  return (
    classes.contains("product-lab-open") || classes.contains("mobile-menu-open")
  );
}

function installListeners() {
  const add = <K extends keyof WindowEventMap>(
    type: K,
    handler: (event: WindowEventMap[K]) => void,
    options: AddEventListenerOptions = {}
  ) => {
    window.addEventListener(type, handler, options);
    teardown.push(() => window.removeEventListener(type, handler, options));
  };
  const inPlayer = (event: Event) =>
    event.target instanceof Element &&
    event.target.closest(".tour-player") !== null;
  const userScroll = (event: Event) => {
    if (playing && !inPlayer(event)) pause("scroll");
  };

  add("wheel", userScroll, { passive: true, capture: true });
  add("touchmove", userScroll, { passive: true, capture: true });
  add(
    "pointerdown",
    (event) => {
      if (
        event.pointerType === "mouse" &&
        event.clientX >= document.documentElement.clientWidth
      ) {
        userScroll(event);
      }
    },
    { capture: true }
  );
  add(
    "click",
    (event) => {
      const anchor = (
        event.target as Element | null
      )?.closest<HTMLAnchorElement>("a[href*='#']");
      if (!anchor || inPlayer(event) || !playing) return;
      const url = new URL(anchor.href, window.location.href);
      if (
        url.origin === window.location.origin &&
        url.pathname === window.location.pathname
      ) {
        pause("scroll");
      }
    },
    { capture: true }
  );
  add("keydown", (event) => {
    const target = event.target as Element | null;
    const typing = target?.closest(
      "input, textarea, select, [contenteditable='true'], [contenteditable='']"
    );
    if (typing || isOverlayOpen()) return;
    const modified = event.metaKey || event.ctrlKey || event.altKey;
    if (modified) {
      if (/^\d$/u.test(event.key) && (event.metaKey || event.ctrlKey))
        userScroll(event);
      return;
    }
    switch (event.key) {
      case " ":
        if (event.shiftKey) {
          userScroll(event);
          return;
        }
        if (target?.closest("button, a, summary, [role='button']")) return;
        event.preventDefault();
        toggle();
        return;
      case "ArrowLeft":
        if (!event.shiftKey) {
          event.preventDefault();
          prev();
        }
        return;
      case "ArrowRight":
        if (!event.shiftKey) {
          event.preventDefault();
          next();
        }
        return;
      case "Escape":
        stop();
        return;
      case "PageUp":
      case "PageDown":
      case "Home":
      case "End":
      case "ArrowUp":
      case "ArrowDown":
        if (!inPlayer(event) || event.key.startsWith("Page")) userScroll(event);
        return;
    }
  });
  const onVisibility = () => {
    if (document.hidden) pause("hidden");
  };
  document.addEventListener("visibilitychange", onVisibility);
  teardown.push(() =>
    document.removeEventListener("visibilitychange", onVisibility)
  );

  let resizeTimer = 0;
  add("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (playing) realign();
      else stage?.refresh();
    }, 200);
  });
  teardown.push(() => window.clearTimeout(resizeTimer));

  const classObserver = new MutationObserver(() => {
    if (isOverlayOpen() && playing) pause("overlay");
  });
  classObserver.observe(html(), {
    attributes: true,
    attributeFilter: ["class"],
  });
  teardown.push(() => classObserver.disconnect());

  const main = document.getElementById("main-content");
  if (main) {
    const layoutObserver = new ResizeObserver(() => {
      if (cutting) return;
      stage?.refresh();
      if (!playing || scrolling) return;
      const target = computeTarget();
      if (target !== null && Math.abs(target - window.scrollY) > 8) realign();
    });
    layoutObserver.observe(main);
    if (activeEl) layoutObserver.observe(activeEl);
    teardown.push(() => layoutObserver.disconnect());
  }
}

export async function start(
  options: { chapterKey?: string | null; invoker?: HTMLElement | null } = {}
) {
  if (active) return;
  loadTourPrefs();
  rate = getSnapshot().speed;
  rateDirty = false;
  timeline = buildTimeline(tourChapters, tourManifest, {
    keep: (stopDef) => stopElement(stopDef.stop) !== null,
  });
  if (!timeline.stops.length) return;

  const chapterIndex = options.chapterKey
    ? timeline.chapters.findIndex(
        (chapter) => chapter.key === options.chapterKey
      )
    : -1;
  base = chapterIndex > 0 ? timeline.chapters[chapterIndex].start : 0;
  invokerEl = options.invoker ?? null;

  for (const element of document.querySelectorAll<HTMLElement>(
    REVEAL_SELECTOR
  )) {
    reveal(element, true);
  }
  for (const element of document.querySelectorAll<HTMLElement>("[data-flow]")) {
    element.dataset.drawn = "true";
  }

  const token = ++startToken;
  active = true;
  playing = false;
  stopIndex = -1;
  mode = "perf";
  ctx = getAudioContext() ?? primeAudio();
  ensureGraph();
  setStage("playing");
  setTourState({
    status: "loading",
    timeline,
    chapter: 0,
    stop: 0,
    cue: null,
    pauseReason: null,
    soundBlocked: false,
    narration: "pending",
  });
  stage = createStage();
  stage.setRate(rate);
  installListeners();
  log("start", { chapter: chapterIndex });
  update(base);
  updateNarration();

  // Start when the first narration is decoded or after a short wait, whichever is first.
  const firstIndex = frameAt(timeline, base).stop;
  const firstStop = timeline.stops[firstIndex];
  prioritize(firstIndex);
  const ready: Promise<unknown>[] = [];
  if (ctx) {
    ready.push(
      Promise.race([
        ctx.resume().catch(() => undefined),
        delay(AUDIO_START_WAIT_MS),
      ])
    );
    if (getSnapshot().voice && firstStop.audio) {
      ready.push(
        Promise.race([request(firstStop), delay(FIRST_AUDIO_WAIT_MS)])
      );
    }
  }
  await Promise.all(ready);
  if (!active || token !== startToken) return;

  mode = ctx && ctx.state === "running" ? "audio" : "perf";
  wallAt = clockNow();
  playing = true;
  setTourState({
    status: "playing",
    soundBlocked: Boolean(ctx) && mode === "perf",
  });
  scheduleAll();
  beginScore(base);
  startLoop();
}

/** The browser blocked autoplay: a click resumes the context and re-syncs the voice. */
export function enableSound() {
  if (!ctx || !active) return;
  void ctx.resume().then(() => {
    if (!active || !ctx || ctx.state !== "running") return;
    setMode("audio");
    setTourState({ soundBlocked: false });
    if (playing) {
      scheduleAll();
      beginScore(base);
    }
  });
}

export function setVoice(on: boolean) {
  setTourState({ voice: on });
  saveTourPrefs();
  log("voice", { on });
  if (ctx && voiceBus) {
    voiceBus.gain.setTargetAtTime(on ? VOICE_LEVEL : 0, ctx.currentTime, 0.08);
  }
  if (on && active && timeline) prioritize(frameAt(timeline, now()).stop);
  if (active) scheduleDuck(now());
}

export function setSpeed(next: TourSpeed) {
  if (next === rate) return;
  // Rebase on the old rate so the timeline position does not jump.
  if (active && timeline && playing) {
    base = now();
    wallAt = clockNow();
  }
  rate = next;
  stage?.setRate(next);
  setTourState({ speed: next });
  saveTourPrefs();
  log("speed", { rate: next });
  if (!active || !timeline) return;
  if (!playing) {
    rateDirty = true;
    return;
  }
  if (mode === "audio") {
    scheduleAll();
    if (score) scheduleMusic(now(), false);
  }
}

export function setMusic(on: boolean) {
  setTourState({ music: on });
  saveTourPrefs();
  log("music", { on });
  if (ctx && musicBus) {
    musicBus.gain.setTargetAtTime(on ? 1 : 0, ctx.currentTime, 0.25);
  }
}

export function stop() {
  if (!active) return;
  active = false;
  playing = false;
  window.cancelAnimationFrame(raf);
  raf = 0;
  for (const dispose of teardown) dispose();
  teardown = [];
  activeEl?.removeAttribute("data-tour-active");
  activeEl = null;
  stage?.destroy();
  stage = null;
  rate = 1;
  rateDirty = false;
  stopIndex = -1;
  scrolling = false;
  cutting = false;
  stopSources();
  queue = [];
  buffers.clear();
  requests.clear();
  failed.clear();
  score?.stop(0.3);
  score = null;
  const released = master;
  master = null;
  voiceBus = null;
  duck = null;
  musicBus = null;
  window.setTimeout(() => {
    released?.disconnect();
    if (!active && ctx?.state === "running") void ctx.suspend();
  }, 500);
  mode = "perf";
  html().classList.remove("tour-cut");
  delete html().dataset.tour;
  html().style.removeProperty("--tour-player-h");
  resetTourState();
  log("stop");

  const restore = invokerEl?.isConnected
    ? invokerEl
    : document.getElementById("main-content");
  invokerEl = null;
  if (restore) {
    if (!restore.matches("button, a, [tabindex]"))
      restore.setAttribute("tabindex", "-1");
    restore.focus({ preventScroll: true });
  }
}

if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
  Object.assign(window, {
    __portfolioTour: {
      snapshot: () => getSnapshot(),
      now,
      goToChapter,
      goToStop: (id: string) => {
        const found = timeline?.stops.find((item) => item.id === id);
        if (found) seek(found.voiceStart + 0.5);
      },
      next,
      prev,
      pause: () => pause("user"),
      resume,
      stop,
      audio: () => ({
        mode,
        state: ctx?.state ?? null,
        buffers: buffers.size,
        failed: failed.size,
        sources: sources.length,
        score: Boolean(score),
        duck: duck?.gain.value ?? null,
        level: score?.level.gain.value ?? null,
      }),
      log: () => eventLog.slice(),
    },
  });
}
