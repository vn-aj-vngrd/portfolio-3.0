"use client";

// The tour engine. All mutable state lives at module scope; React only subscribes
// through the store. One requestAnimationFrame loop advances the clock, moves the
// stage from stop to stop and publishes changes.
import { tourChapters } from "@/content/tour";
import {
  buildTimeline,
  chapterAt,
  chapterStart,
  frameAt,
  prevTarget,
  scrollDuration,
  scrollTopFor,
  tourManifest,
  type TourTimeline,
} from "@/lib/tour";

import {
  emitTourFrame,
  getSnapshot,
  loadTourPrefs,
  type PauseReason,
  resetTourState,
  setTourState,
  type TourScroller,
} from "./store";

const MOBILE_QUERY = "(max-width: 980px)";
const MOBILE_HEADER = 68;
const DESKTOP_TOP_INSET = 24;
const PLAYER_FALLBACK = 190;
const PLAYER_GAP = 16;
const CUT_OUT_MS = 170;

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
  // Narration preloading arrives with the recorded audio.
}

function now() {
  if (!timeline) return 0;
  const t = playing ? base + (performance.now() - wallAt) / 1000 : base;
  return Math.min(t, timeline.duration);
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

function align(instant = false) {
  const target = computeTarget();
  if (target === null || !scroller) return;
  const distance = target - window.scrollY;
  if (Math.abs(distance) < 2) return;

  const duration = instant
    ? 0
    : scrollDuration(distance, window.innerHeight, reducedMotion());
  if (duration === "cut") {
    cut(target);
    return;
  }
  scrolling = true;
  if (duration === 0) {
    scroller.scrollPageTo(target, { duration: 0, immediate: true });
    releaseScrolling(120);
    return;
  }
  scroller.scrollPageTo(target, {
    duration,
    onComplete: () => {
      scrolling = false;
    },
  });
  releaseScrolling(duration * 1000 + 300);
}

function cut(target: number) {
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
        })
      );
    },
    reducedMotion() ? 0 : CUT_OUT_MS
  );
}

export function realign() {
  if (active && getSnapshot().status !== "idle") align(true);
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
  align();
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
  wallAt = performance.now();
  playing = true;
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
  base = Math.min(Math.max(t, 0), timeline.duration);
  wallAt = performance.now();
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
  update(base);
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
      if (playing) align(true);
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
      if (!playing || scrolling || cutting) return;
      const target = computeTarget();
      if (target !== null && Math.abs(target - window.scrollY) > 8) align(true);
    });
    layoutObserver.observe(main);
    teardown.push(() => layoutObserver.disconnect());
  }
}

export function start(
  options: { chapterKey?: string | null; invoker?: HTMLElement | null } = {}
) {
  if (active) return;
  loadTourPrefs();
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
    "[data-reveal]"
  )) {
    element.dataset.revealed = "true";
  }

  active = true;
  playing = true;
  wallAt = performance.now();
  stopIndex = -1;
  setStage("playing");
  setTourState({
    status: "playing",
    timeline,
    chapter: 0,
    stop: 0,
    cue: null,
    pauseReason: null,
  });
  installListeners();
  log("start", { chapter: chapterIndex });
  update(base);
  startLoop();
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
  stopIndex = -1;
  scrolling = false;
  cutting = false;
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
      log: () => eventLog.slice(),
    },
  });
}
