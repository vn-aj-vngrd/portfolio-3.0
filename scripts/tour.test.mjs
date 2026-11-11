// Guided tour contract: narration evidence, stop targets, budgets, timeline math.
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(join(root, path), "utf8");
const load = async (path) => import(pathToFileURL(join(root, path)).href);
const squash = (text) => text.replace(/\s+/gu, " ");

const { tourChapters, tourStopId } = await load("src/content/tour.ts");
const { projectCatalog } = await load("src/content/projects.ts");
const { experience } = await load("src/content/experience.ts");
const timeline = await load("src/lib/tour/timeline.ts");
const link = await load("src/lib/tour/link.ts");
const manifest = JSON.parse(read("src/lib/tour/narration.json"));

const stops = tourChapters.flatMap((chapter) => chapter.stops);
const sentences = stops.flatMap((stop) =>
  stop.lines.map((line) => ({ stop, line }))
);
const words = (text) => text.split(/\s+/u).filter(Boolean).length;

function walk(dir) {
  return readdirSync(join(root, dir), { withFileTypes: true }).flatMap(
    (entry) =>
      entry.isDirectory()
        ? walk(join(dir, entry.name))
        : [join(dir, entry.name)]
  );
}

test("every narration claim has its evidence verbatim in its source file", () => {
  for (const stop of stops) {
    assert.ok(stop.evidence.length > 0, `${stop.id} has no evidence`);
    for (const { file, text } of stop.evidence) {
      assert.ok(
        squash(read(file)).includes(squash(text)),
        `${stop.id}: "${text}" not found in ${file}`
      );
    }
  }
});

test("every stop targets a real element", () => {
  const slugs = new Set(projectCatalog.list().map((project) => project.slug));
  const experienceIds = new Set(
    experience.map((item) => tourStopId.experience(item.company))
  );
  const components = walk("src/components").filter((file) =>
    file.endsWith(".tsx")
  );
  const source = components.map(read).join("\n");
  for (const { id, stop } of stops) {
    if (stop.startsWith("project-")) {
      assert.ok(
        slugs.has(stop.slice("project-".length)),
        `${id}: unknown project ${stop}`
      );
    } else if (stop.startsWith("experience-")) {
      assert.ok(experienceIds.has(stop), `${id}: unknown experience ${stop}`);
    } else {
      assert.ok(
        source.includes(`data-tour-stop="${stop}"`),
        `${id}: no data-tour-stop="${stop}"`
      );
    }
  }
});

test("every featured project has one stop, in catalog order", () => {
  const featured = projectCatalog
    .list({ featured: true })
    .map((project) => tourStopId.project(project.slug));
  const toured = stops
    .map((stop) => stop.stop)
    .filter((stop) => stop.startsWith("project-"));
  assert.deepEqual(toured, featured);
});

test("narration stays inside its budgets", () => {
  assert.ok(tourChapters.length >= 7 && tourChapters.length <= 10);
  const ids = stops.map((stop) => stop.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.match(id, /^[a-z0-9]+(-[a-z0-9]+)*$/u);
  const keys = tourChapters.map((chapter) => chapter.key);
  assert.equal(new Set(keys).size, keys.length);
  for (const stop of stops) {
    assert.ok(
      stop.lines.length >= 1 && stop.lines.length <= 3,
      `${stop.id}: 1-3 sentences`
    );
    assert.ok(words(stop.lines.join(" ")) <= 34, `${stop.id}: over 34 words`);
  }
  for (const { stop, line } of sentences) {
    assert.ok(line.length <= 120, `${stop.id}: sentence over 120 chars`);
    assert.match(
      line,
      /[.?!]$/u,
      `${stop.id}: sentence must end in punctuation`
    );
  }
});

test("narration avoids banned words", () => {
  const banned =
    /\b(expert|master|world-class|rockstar|ninja|guru|10x|passionate|cutting-edge|seamless|revolutionary|Lytho|TicketBooth)\b/iu;
  for (const { stop, line } of sentences)
    assert.doesNotMatch(line, banned, stop.id);
});

test("manifest matches the narration and the audio on disk", () => {
  const entries = Object.entries(manifest.stops);
  if (entries.length === 0) return;
  let total = 0;
  for (const stop of stops) {
    const entry = manifest.stops[stop.id];
    assert.ok(
      entry,
      `${stop.id}: missing from manifest (run yarn narrate:tour)`
    );
    assert.deepEqual(
      entry.lines,
      stop.lines,
      `${stop.id}: manifest is stale (run yarn narrate:tour)`
    );
    assert.ok(
      existsSync(join(root, "public", entry.file)),
      `${stop.id}: ${entry.file} missing`
    );
    assert.ok(entry.seconds > 0);
    assert.equal(entry.cues.length, stop.lines.length);
    let previous = 0;
    for (const cue of entry.cues) {
      assert.ok(
        cue.start >= previous - 1e-6 &&
          cue.end > cue.start &&
          cue.end <= entry.seconds + 0.01
      );
      previous = cue.end;
    }
    const rate = words(stop.lines.join(" ")) / entry.seconds;
    assert.ok(
      rate >= 2.2 && rate <= 3.1,
      `${stop.id}: ${rate.toFixed(2)} words/s`
    );
    stop.lines.forEach((line, i) => {
      const cue = entry.cues[i];
      assert.ok(
        line.length / (cue.end - cue.start) <= 20,
        `${stop.id}: caption rate over 20 chars/s`
      );
    });
    assert.ok(entry.bytes <= 160_000, `${stop.id}: over 160 KB`);
    total += entry.bytes;
  }
  assert.ok(total <= 2_000_000, `audio total ${total} bytes`);
  const referenced = new Set(
    entries.map(([, entry]) => entry.file.replace(/^\/tour\//u, ""))
  );
  for (const file of readdirSync(join(root, "public/tour")).filter((name) =>
    name.endsWith(".m4a")
  )) {
    assert.ok(referenced.has(file), `orphan audio file ${file}`);
  }
});

test("total tour length is between 150 and 225 seconds", () => {
  const tl = timeline.buildTimeline(tourChapters, manifest);
  assert.ok(
    tl.duration >= 150 && tl.duration <= 225,
    `duration ${tl.duration}`
  );
});

test("buildTimeline is contiguous, monotonic and drops optional stops on request", () => {
  const tl = timeline.buildTimeline(tourChapters, manifest);
  assert.equal(tl.stops.length, stops.length);
  let previousEnd = 0;
  for (const stop of tl.stops) {
    assert.equal(stop.start, previousEnd);
    assert.ok(
      stop.end > stop.voiceEnd &&
        stop.voiceEnd > stop.voiceStart &&
        stop.voiceStart > stop.start
    );
    previousEnd = stop.end;
  }
  assert.equal(tl.duration, tl.stops.at(-1).end);
  assert.ok(
    Math.abs(tl.stops[0].voiceStart - (timeline.FIRST_SCROLL + timeline.LEAD)) <
      1e-9
  );
  assert.equal(tl.chapters[0].start, 0);
  tl.chapters.forEach((chapter, i) => {
    if (i > 0) assert.equal(chapter.start, tl.chapters[i - 1].end);
  });

  const without = timeline.buildTimeline(tourChapters, manifest, {
    keep: (stop) => stop.stop !== "github",
  });
  assert.equal(without.chapters.length, tl.chapters.length - 1);
  assert.ok(!without.chapters.some((chapter) => chapter.key === "github"));
  assert.ok(without.duration < tl.duration);
  without.chapters.forEach((chapter, i) => assert.equal(chapter.index, i));
});

test("a stale manifest entry falls back to the estimate", () => {
  const first = stops[0];
  const stale = {
    stops: {
      [first.id]: {
        file: "/tour/x.m4a",
        hash: "x",
        seconds: 5,
        bytes: 1,
        lines: ["old"],
        cues: [{ start: 0, end: 5 }],
      },
    },
  };
  const tl = timeline.buildTimeline(tourChapters, stale);
  assert.equal(tl.stops[0].audio, null);
  const fresh = {
    stops: {
      [first.id]: {
        file: "/tour/x.m4a",
        hash: "x",
        seconds: 9,
        bytes: 1,
        lines: first.lines,
        cues: first.lines.map((_, i) => ({ start: i * 4, end: i * 4 + 3 })),
      },
    },
  };
  assert.equal(
    timeline.buildTimeline(tourChapters, fresh).stops[0].audio,
    "/tour/x.m4a"
  );
});

test("frameAt follows cues, holds, and ends", () => {
  const tl = timeline.buildTimeline(tourChapters, manifest);
  const stop = tl.stops[1];
  const cue = stop.cues[1];
  assert.equal(timeline.frameAt(tl, cue.start - 0.11).cue, stop.cues[0].text);
  assert.equal(timeline.frameAt(tl, cue.start - 0.09).cue, cue.text);
  assert.equal(timeline.frameAt(tl, stop.start + 0.01).cue, null);
  assert.equal(
    timeline.frameAt(tl, stop.voiceEnd + timeline.CUE_HOLD + 0.01).cue,
    null
  );
  assert.equal(timeline.frameAt(tl, tl.duration).ended, true);
  assert.equal(timeline.frameAt(tl, tl.duration - 1).ended, false);
});

test("prevTarget restarts the chapter after 2.5 s, else goes back", () => {
  const tl = timeline.buildTimeline(tourChapters, manifest);
  const [, second, third] = tl.chapters;
  assert.equal(timeline.prevTarget(tl, third.start + 1), second.start);
  assert.equal(timeline.prevTarget(tl, third.start + 5), third.start);
  assert.equal(timeline.prevTarget(tl, 0.5), 0);
});

test("duckEnvelope holds between close stops and recovers after release", () => {
  const close = {
    duration: 10,
    chapters: [],
    stops: [
      { voiceStart: 1, voiceEnd: 3 },
      { voiceStart: 4, voiceEnd: 6 },
    ],
  };
  const gainAt = (points, t) => {
    let value = points[0][1];
    for (let i = 1; i < points.length; i += 1) {
      const [t0, g0] = points[i - 1];
      const [t1, g1] = points[i];
      if (t >= t0 && t <= t1)
        return t1 === t0 ? g1 : g0 + ((g1 - g0) * (t - t0)) / (t1 - t0);
      value = g1;
    }
    return value;
  };
  const env = timeline.duckEnvelope(close, 0.33, 0.35, 0.6);
  assert.equal(gainAt(env, 3.5), 0.33);
  assert.equal(gainAt(env, 2), 0.33);
  assert.equal(gainAt(env, 6 + 0.6 + 0.01), 1);
  assert.equal(gainAt(env, 0.2), 1);
});

test("scrollTopFor centers short elements and pins tall ones", () => {
  const base = {
    viewportH: 800,
    topInset: 68,
    bottomInset: 200,
    maxScroll: 5000,
  };
  const short = timeline.scrollTopFor({ ...base, elTop: 1000, elHeight: 200 });
  assert.equal(short, 1000 - 68 - (532 - 200) / 2);
  const tall = timeline.scrollTopFor({ ...base, elTop: 1000, elHeight: 900 });
  assert.equal(tall, 1000 - 68 - 24);
  assert.equal(timeline.scrollTopFor({ ...base, elTop: 10, elHeight: 200 }), 0);
  assert.equal(
    timeline.scrollTopFor({ ...base, elTop: 9000, elHeight: 200 }),
    5000
  );
});

test("scrollDuration is zero, a cut, or a clamped glide", () => {
  assert.equal(timeline.scrollDuration(500, 800, true), 0);
  assert.equal(timeline.scrollDuration(3 * 800, 800), "cut");
  assert.equal(timeline.scrollDuration(800, 800), 1.2);
  assert.equal(timeline.scrollDuration(0, 800), 0.7);
});

test("formatClock prints m:ss", () => {
  assert.equal(timeline.formatClock(0), "0:00");
  assert.equal(timeline.formatClock(205.9), "3:25");
});

test("parseTourLink and withoutTourLink", () => {
  assert.deepEqual(link.parseTourLink("?tour"), { chapter: null });
  assert.deepEqual(link.parseTourLink("?tour=1"), { chapter: null });
  assert.deepEqual(link.parseTourLink("?tour=work"), { chapter: "work" });
  assert.deepEqual(link.parseTourLink("?x=1&tour=craft"), { chapter: "craft" });
  assert.equal(link.parseTourLink("?tour=off"), null);
  assert.equal(link.parseTourLink("?x=1"), null);
  assert.equal(link.parseTourLink(""), null);
  assert.equal(link.withoutTourLink("/?tour=work&x=1#about"), "/?x=1#about");
  assert.equal(link.withoutTourLink("/?tour#about"), "/#about");
});
