// Pure tour timeline. Type-only imports and erasable TypeScript only: the node
// test runner loads this file directly.
import type { TourChapter, TourStop } from "@/content/tour";

export const SCROLL = 1.2;
export const FIRST_SCROLL = 0.6;
export const LEAD = 0.35;
export const TAIL = 0.9;
export const CUE_HOLD = 0.6;
export const CUE_GAP = 0.28;
const CUE_LEAD = 0.1;
const MIN_ESTIMATE_SENTENCE = 0.15;
const ESTIMATE_WORDS_PER_SECOND = 2.75;
export const RESTART_WINDOW = 2.5;

export type ManifestStop = {
  file: string;
  hash: string;
  seconds: number;
  bytes: number;
  lines: readonly string[];
  cues: readonly { start: number; end: number }[];
};

export type TourManifest = {
  engine?: string;
  voice?: string;
  speed?: number;
  bitrateKbps?: number;
  stops: Readonly<Record<string, ManifestStop>>;
};

export type TimelineCue = { text: string; start: number; end: number };

export type TimelineStop = {
  id: string;
  stop: string;
  chapter: number;
  index: number;
  start: number;
  voiceStart: number;
  voiceEnd: number;
  end: number;
  cues: TimelineCue[];
  audio: string | null;
};

export type TimelineChapter = {
  key: string;
  title: string;
  index: number;
  start: number;
  end: number;
  stops: TimelineStop[];
};

export type TourTimeline = {
  duration: number;
  chapters: TimelineChapter[];
  stops: TimelineStop[];
};

const wordCount = (text: string) => text.split(/\s+/u).filter(Boolean).length;

function sameLines(a: readonly string[], b: readonly string[]) {
  return a.length === b.length && a.every((line, i) => line === b[i]);
}

function estimateStop(lines: readonly string[]) {
  const cues: { start: number; end: number }[] = [];
  let at = 0;
  for (const [i, line] of lines.entries()) {
    const length =
      MIN_ESTIMATE_SENTENCE + wordCount(line) / ESTIMATE_WORDS_PER_SECOND;
    cues.push({ start: at, end: at + length });
    at += length + (i < lines.length - 1 ? CUE_GAP : 0);
  }
  return { seconds: at, cues };
}

export function buildTimeline(
  chapters: readonly TourChapter[],
  manifest: TourManifest,
  options: { keep?: (stop: TourStop) => boolean } = {}
): TourTimeline {
  const keep = options.keep ?? (() => true);
  const outChapters: TimelineChapter[] = [];
  const outStops: TimelineStop[] = [];
  let t = 0;

  for (const chapter of chapters) {
    const stops = chapter.stops.filter((stop) => !stop.optional || keep(stop));
    if (!stops.length) continue;
    const chapterIndex = outChapters.length;
    const built: TimelineStop[] = [];
    const chapterStart = t;

    for (const stop of stops) {
      const entry = manifest.stops[stop.id];
      const fresh = entry !== undefined && sameLines(entry.lines, stop.lines);
      const timing = fresh
        ? { seconds: entry.seconds, cues: entry.cues }
        : estimateStop(stop.lines);
      const scroll = outStops.length === 0 ? FIRST_SCROLL : SCROLL;
      const voiceStart = t + scroll + LEAD;
      const voiceEnd = voiceStart + timing.seconds;
      const end = voiceEnd + TAIL;
      const item: TimelineStop = {
        id: stop.id,
        stop: stop.stop,
        chapter: chapterIndex,
        index: outStops.length,
        start: t,
        voiceStart,
        voiceEnd,
        end,
        cues: stop.lines.map((text, i) => ({
          text,
          start: voiceStart + timing.cues[i].start,
          end: voiceStart + timing.cues[i].end,
        })),
        audio: fresh ? entry.file : null,
      };
      built.push(item);
      outStops.push(item);
      t = end;
    }

    outChapters.push({
      key: chapter.key,
      title: chapter.title,
      index: chapterIndex,
      start: chapterStart,
      end: t,
      stops: built,
    });
  }

  return { duration: t, chapters: outChapters, stops: outStops };
}

export type TourFrame = {
  chapter: number;
  stop: number;
  cue: string | null;
  cueIndex: number;
  ended: boolean;
};

export function frameAt(tl: TourTimeline, t: number): TourFrame {
  const last = tl.stops.length - 1;
  if (t >= tl.duration) {
    const stop = tl.stops[last];
    return {
      chapter: stop.chapter,
      stop: last,
      cue: null,
      cueIndex: -1,
      ended: true,
    };
  }
  let index = 0;
  for (let i = last; i >= 0; i -= 1) {
    if (t >= tl.stops[i].start) {
      index = i;
      break;
    }
  }
  const stop = tl.stops[index];
  let cueIndex = -1;
  for (let i = stop.cues.length - 1; i >= 0; i -= 1) {
    if (t >= stop.cues[i].start - CUE_LEAD) {
      cueIndex = i;
      break;
    }
  }
  if (cueIndex === stop.cues.length - 1 && cueIndex >= 0) {
    if (t >= Math.min(stop.voiceEnd + CUE_HOLD, stop.end)) cueIndex = -1;
  }
  return {
    chapter: stop.chapter,
    stop: index,
    cue: cueIndex >= 0 ? stop.cues[cueIndex].text : null,
    cueIndex,
    ended: false,
  };
}

export function chapterStart(tl: TourTimeline, index: number) {
  const i = Math.min(Math.max(index, 0), tl.chapters.length - 1);
  return tl.chapters[i].start;
}

export function chapterAt(tl: TourTimeline, t: number) {
  let found = 0;
  for (const chapter of tl.chapters)
    if (t >= chapter.start) found = chapter.index;
  return found;
}

/** Start of the current chapter, or the previous one when less than 2.5 s in. */
export function prevTarget(tl: TourTimeline, t: number) {
  const current = chapterAt(tl, t);
  if (t - tl.chapters[current].start > RESTART_WINDOW)
    return tl.chapters[current].start;
  return tl.chapters[Math.max(0, current - 1)].start;
}

export function duckEnvelope(
  tl: TourTimeline,
  depth = 0.33,
  attack = 0.35,
  release = 0.6
): [number, number][] {
  const mergeGap = attack + release + 0.3;
  const groups: [number, number][] = [];
  for (const stop of tl.stops) {
    const previous = groups[groups.length - 1];
    if (previous && stop.voiceStart - previous[1] < mergeGap)
      previous[1] = stop.voiceEnd;
    else groups.push([stop.voiceStart, stop.voiceEnd]);
  }
  const points: [number, number][] = [[0, 1]];
  for (const [start, end] of groups) {
    points.push(
      [Math.max(0, start - attack), 1],
      [start, depth],
      [end, depth],
      [end + release, 1]
    );
  }
  return points;
}

export function scrollTopFor(input: {
  elTop: number;
  elHeight: number;
  viewportH: number;
  topInset: number;
  bottomInset: number;
  maxScroll: number;
}) {
  const { elTop, elHeight, viewportH, topInset, bottomInset, maxScroll } =
    input;
  const available = viewportH - topInset - bottomInset;
  const target =
    elHeight <= available - 32
      ? elTop - topInset - (available - elHeight) / 2
      : elTop - topInset - 24;
  return Math.min(Math.max(target, 0), maxScroll);
}

export function scrollDuration(
  distance: number,
  viewportH: number,
  reduced = false
): number | "cut" {
  if (reduced) return 0;
  const d = Math.abs(distance);
  if (d > 2.5 * viewportH) return "cut";
  return Math.min(Math.max(0.7 + (0.5 * d) / viewportH, 0.7), SCROLL);
}

export function formatClock(seconds: number) {
  const whole = Math.max(0, Math.floor(seconds));
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}
