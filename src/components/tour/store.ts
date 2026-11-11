"use client";

// Tiny external store for the guided tour. React reads it through `useTour()`;
// the engine lives in `director.ts`, loaded on demand so a plain page view only
// pays for the entry buttons and this module.
import { useSyncExternalStore } from "react";

import { TOUR_TIMELINE_ESTIMATE, type TourTimeline } from "@/lib/tour";

export type TourStatus = "idle" | "loading" | "playing" | "paused" | "ended";
export type PauseReason = "user" | "scroll" | "hidden" | "overlay" | null;
export const TOUR_SPEEDS = [1, 1.25, 1.5, 2] as const;
export type TourSpeed = (typeof TOUR_SPEEDS)[number];
export const isTourSpeed = (value: unknown): value is TourSpeed =>
  TOUR_SPEEDS.some((speed) => speed === value);

export type NarrationState = "pending" | "ready" | "partial" | "unavailable";

export type TourSnapshot = {
  status: TourStatus;
  chapter: number;
  stop: number;
  cue: string | null;
  voice: boolean;
  music: boolean;
  speed: TourSpeed;
  pauseReason: PauseReason;
  narration: NarrationState;
  soundBlocked: boolean;
  timeline: TourTimeline;
  /** Share-link start card (`/?tour`): open while set; `chapter` is the requested chapter key. */
  invite: { chapter: string | null } | null;
};

const IDLE: TourSnapshot = {
  status: "idle",
  chapter: 0,
  stop: 0,
  cue: null,
  voice: true,
  music: true,
  speed: 1,
  pauseReason: null,
  narration: "pending",
  soundBlocked: false,
  timeline: TOUR_TIMELINE_ESTIMATE,
  invite: null,
};

let snapshot: TourSnapshot = IDLE;
const listeners = new Set<() => void>();

export const getSnapshot = () => snapshot;
const getServerSnapshot = () => IDLE;

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setTourState(patch: Partial<TourSnapshot>) {
  const next = { ...snapshot, ...patch };
  if (
    (Object.keys(next) as (keyof TourSnapshot)[]).every(
      (key) => next[key] === snapshot[key]
    )
  )
    return;
  snapshot = next;
  for (const listener of listeners) listener();
}

export function resetTourState() {
  setTourState({
    ...IDLE,
    voice: snapshot.voice,
    music: snapshot.music,
    speed: snapshot.speed,
    invite: snapshot.invite,
  });
}

export function useTour() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export const isTourActive = () => snapshot.status !== "idle";

export const openTourInvite = (chapter: string | null) =>
  setTourState({ invite: { chapter } });
export const closeTourInvite = () => setTourState({ invite: null });

// A start requested from another route: entries prime audio in the click, navigate to `/`,
// and `TourRoot` starts the tour once the home page is on screen.
let pending: { chapterKey: string | null; invoker: HTMLElement | null } | null =
  null;
export const setPendingTour = (next: typeof pending) => {
  pending = next;
};
export function takePendingTour() {
  const taken = pending;
  pending = null;
  return taken;
}

export function setTourPreference(key: "voice" | "music", on: boolean) {
  setTourState({ [key]: on });
  saveTourPrefs();
}

// Per-frame values (clock, scrubber fill) bypass React: listeners write to the DOM.
type FrameListener = (time: number) => void;
const frameListeners = new Set<FrameListener>();
export function onTourFrame(listener: FrameListener) {
  frameListeners.add(listener);
  return () => {
    frameListeners.delete(listener);
  };
}
export function emitTourFrame(time: number) {
  for (const listener of frameListeners) listener(time);
}

// Preferences
const PREFS_KEY = "portfolio.tour.prefs";
export function loadTourPrefs() {
  try {
    const raw = window.localStorage.getItem(PREFS_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as {
      voice?: unknown;
      music?: unknown;
      speed?: unknown;
    };
    setTourState({
      voice: typeof parsed.voice === "boolean" ? parsed.voice : true,
      music: typeof parsed.music === "boolean" ? parsed.music : true,
      speed: isTourSpeed(parsed.speed) ? parsed.speed : 1,
    });
  } catch {
    // Storage can be blocked; the defaults stand.
  }
}
export function saveTourPrefs() {
  try {
    window.localStorage.setItem(
      PREFS_KEY,
      JSON.stringify({
        voice: snapshot.voice,
        music: snapshot.music,
        speed: snapshot.speed,
      })
    );
  } catch {
    // Not persisted; the choice still applies to this visit.
  }
}

// Audio. The context is created inside the click that starts the tour so browsers allow sound.
let audioContext: AudioContext | null = null;
export const getAudioContext = () => audioContext;

export function primeAudio() {
  if (typeof window === "undefined") return null;
  if (!audioContext) {
    const Constructor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Constructor) return null;
    try {
      audioContext = new Constructor({ latencyHint: "playback" });
    } catch {
      return null;
    }
  }
  try {
    // iOS Safari mutes Web Audio with the ring switch unless the session is "playback".
    (
      navigator as Navigator & { audioSession?: { type: string } }
    ).audioSession!.type = "playback";
  } catch {
    // Not supported; sound may follow the ring switch.
  }
  void audioContext.resume().catch(() => undefined);
  return audioContext;
}

// Director bridge
export type TourScroller = {
  scrollPageTo: (
    top: number,
    options: { duration: number; immediate?: boolean; onComplete?: () => void }
  ) => void;
};
type DirectorModule = typeof import("./director");
let directorModule: DirectorModule | null = null;
let directorPromise: Promise<DirectorModule> | null = null;
let scroller: TourScroller | null = null;

function loadDirector() {
  directorPromise ??= import("./director").then((module) => {
    directorModule = module;
    if (scroller) module.attach(scroller);
    return module;
  });
  return directorPromise;
}

export function attachTourScroller(next: TourScroller) {
  scroller = next;
  directorModule?.attach(next);
  return () => {
    if (scroller === next) scroller = null;
  };
}

const saveData = () => {
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  return (
    Boolean(connection?.saveData) ||
    /^(slow-2g|2g|3g)$/u.test(connection?.effectiveType ?? "")
  );
};

export function preloadTour() {
  if (saveData()) return;
  void loadDirector().then((module) => module.preload());
}

export function startTour(
  options: { chapterKey?: string | null; invoker?: HTMLElement | null } = {}
) {
  if (isTourActive()) {
    focusTourPlayer();
    return;
  }
  primeAudio();
  void loadDirector().then((module) => module.start(options));
}

export function focusTourPlayer() {
  document.querySelector<HTMLElement>(".tour-player")?.focus();
}

/** Run a director action once the module is loaded; no-op when idle. */
export function tourControl(action: (director: DirectorModule) => void) {
  if (directorModule) action(directorModule);
}
