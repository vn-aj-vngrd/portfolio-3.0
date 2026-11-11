// Records the guided tour narration offline with Kokoro-82M (Apache-2.0) and writes
// public/tour/<id>.<hash>.m4a plus src/lib/tour/narration.json (measured seconds and
// one caption cue per sentence). The words live in src/content/tour.ts only.
//
// Kokoro is not a project dependency: it installs on demand into a cache directory
// outside the repo (TOUR_TTS_DIR, default ~/.cache/portfolio-tour-tts) and the model
// (~310 MB) downloads into that cache on first run.
//
// Usage: yarn narrate:tour [voice] [speed] [--all]
//   voice  default af_heart      speed  default 0.95
//   --all  re-record every stop (otherwise only stops whose spoken text, voice or speed changed)
//   --engine=say --force-say  local experiments only; refuses to write into public/tour otherwise
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { homedir, tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

import { tourChapters, tourPronunciations } from "../src/content/tour.ts";

const out = (text) => process.stdout.write(`${text}\n`);
const args = process.argv.slice(2);
const flags = new Set(args.filter((arg) => arg.startsWith("--")));
const [voiceArg, speedArg] = args.filter((arg) => !arg.startsWith("--"));
const engineArg = args.find((arg) => arg.startsWith("--engine="))?.slice(9);

const root = new URL("..", import.meta.url).pathname;
const audioDir = join(root, "public/tour");
const manifestPath = join(root, "src/lib/tour/narration.json");
const cacheDir =
  process.env.TOUR_TTS_DIR ?? join(homedir(), ".cache/portfolio-tour-tts");
const work = join(tmpdir(), `portfolio-tour-${process.pid}`);
const BITRATE = 64;
const GAP = 0.28;
const MODEL = "onnx-community/Kokoro-82M-v1.0-ONNX";

const run = (bin, binArgs, options = {}) =>
  execFileSync(bin, binArgs, { encoding: "utf8", ...options });
for (const bin of ["ffmpeg", "ffprobe"]) {
  try {
    run("which", [bin], { stdio: "ignore" });
  } catch {
    throw new Error(`${bin} is required (brew install ffmpeg).`);
  }
}

const engine = engineArg === "say" ? "say" : "kokoro-82m";
if (engine === "say" && !flags.has("--force-say")) {
  throw new Error(
    "--engine=say writes system-voice audio; pass --force-say to confirm. Never commit it."
  );
}
const voice = voiceArg ?? (engine === "say" ? "Samantha" : "af_heart");
const speed = Number(speedArg ?? (engine === "say" ? 170 : 0.95));

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
const pronunciations = Object.entries(tourPronunciations)
  .sort(([a], [b]) => b.length - a.length)
  .map(([word, say]) => [
    new RegExp(`(?<![\\w.])${escapeRegExp(word)}(?![\\w])`, "gu"),
    say,
  ]);
const spoken = (text) =>
  pronunciations.reduce((t, [pattern, say]) => t.replace(pattern, say), text);

let tts = null;
if (engine === "kokoro-82m") {
  const entry = join(cacheDir, "node_modules/kokoro-js/dist/kokoro.js");
  if (!existsSync(entry)) {
    out(`Installing kokoro-js@1.2.1 into ${cacheDir} (about 650 MB, once)...`);
    mkdirSync(cacheDir, { recursive: true });
    if (!existsSync(join(cacheDir, "package.json"))) {
      writeFileSync(
        join(cacheDir, "package.json"),
        '{ "name": "portfolio-tour-tts", "private": true }\n'
      );
    }
    run(
      "npm",
      [
        "install",
        "--prefix",
        cacheDir,
        "--no-audit",
        "--no-fund",
        "kokoro-js@1.2.1",
      ],
      {
        stdio: "inherit",
      }
    );
  }
  try {
    const { KokoroTTS } = await import(pathToFileURL(entry).href);
    out(`Loading ${MODEL} (first run downloads about 310 MB)...`);
    tts = await KokoroTTS.from_pretrained(MODEL, {
      dtype: "fp32",
      device: "cpu",
    });
  } catch (error) {
    throw new Error(
      `Kokoro could not load: ${error.message}. Committed audio is never recorded with a fallback voice.`
    );
  }
}

mkdirSync(audioDir, { recursive: true });
mkdirSync(work, { recursive: true });
const tmp = (name) => join(work, name);
const duration = (file) =>
  Number(
    run("ffprobe", [
      "-v",
      "error",
      "-show_entries",
      "format=duration",
      "-of",
      "csv=p=0",
      file,
    ])
  );

async function renderSentence(text, wav) {
  if (engine === "kokoro-82m") {
    const audio = await tts.generate(text, { voice, speed });
    await audio.save(wav);
    return;
  }
  run("say", ["-v", voice, "-r", String(speed), "-o", tmp("say.aiff"), text]);
  run("afconvert", ["-f", "WAVE", "-d", "LEI16@24000", tmp("say.aiff"), wav]);
}

const trim =
  "silenceremove=start_periods=1:start_silence=0.08:start_threshold=-50dB";

async function recordStop(stop) {
  const trimmed = [];
  const lengths = [];
  for (const [i, line] of stop.lines.entries()) {
    const raw = tmp(`${stop.id}-${i}.raw.wav`);
    const clean = tmp(`${stop.id}-${i}.wav`);
    await renderSentence(spoken(line), raw);
    run("ffmpeg", [
      "-y",
      "-loglevel",
      "error",
      "-i",
      raw,
      "-af",
      `${trim},areverse,${trim},areverse`,
      "-ar",
      "24000",
      "-ac",
      "1",
      clean,
    ]);
    trimmed.push(clean);
    lengths.push(duration(clean));
  }

  const gap = tmp("gap.wav");
  run("ffmpeg", [
    "-y",
    "-loglevel",
    "error",
    "-f",
    "lavfi",
    "-i",
    "anullsrc=r=24000:cl=mono",
    "-t",
    String(GAP),
    gap,
  ]);
  const inputs = [];
  trimmed.forEach((file, i) => {
    if (i > 0) inputs.push(gap);
    inputs.push(file);
  });
  const joined = tmp(`${stop.id}-joined.wav`);
  run("ffmpeg", [
    "-y",
    "-loglevel",
    "error",
    ...inputs.flatMap((file) => ["-i", file]),
    "-filter_complex",
    `${inputs.map((_, i) => `[${i}:a]`).join("")}concat=n=${inputs.length}:v=0:a=1[out]`,
    "-map",
    "[out]",
    joined,
  ]);
  const planned =
    lengths.reduce((sum, length) => sum + length, 0) +
    GAP * (lengths.length - 1);

  const hash = createHash("sha256")
    .update(
      `${engine}|${voice}|${speed}|${BITRATE}|${stop.lines.map(spoken).join("\n")}`
    )
    .digest("hex")
    .slice(0, 8);
  const file = `/tour/${stop.id}.${hash}.m4a`;
  const target = join(root, "public", file);
  run("ffmpeg", [
    "-y",
    "-loglevel",
    "error",
    "-i",
    joined,
    "-af",
    "highpass=f=80,loudnorm=I=-16:TP=-1.5:LRA=11",
    "-ar",
    "48000",
    "-ac",
    "1",
    "-c:a",
    "aac",
    "-b:a",
    `${BITRATE}k`,
    "-movflags",
    "+faststart",
    target,
  ]);
  const seconds = duration(target);
  const scale = seconds / planned;
  let at = 0;
  const cues = lengths.map((length) => {
    const cue = {
      start: +(at * scale).toFixed(2),
      end: +((at + length) * scale).toFixed(2),
    };
    at += length + GAP;
    return cue;
  });
  return {
    file,
    hash,
    seconds: +seconds.toFixed(2),
    bytes: statSync(target).size,
    lines: [...stop.lines],
    cues,
  };
}

const previous = existsSync(manifestPath)
  ? JSON.parse(readFileSync(manifestPath, "utf8"))
  : { stops: {} };
const sameVoice =
  previous.engine === engine &&
  previous.voice === voice &&
  previous.speed === speed &&
  previous.bitrateKbps === BITRATE;
const wantHash = (stop) =>
  createHash("sha256")
    .update(
      `${engine}|${voice}|${speed}|${BITRATE}|${stop.lines.map(spoken).join("\n")}`
    )
    .digest("hex")
    .slice(0, 8);

const stops = {};
const words = (stop) => stop.lines.join(" ").split(/\s+/u).length;
out(
  `${"stop".padEnd(18)} ${"sec".padStart(6)} ${"w/s".padStart(5)} ${"KB".padStart(6)}`
);
for (const chapter of tourChapters) {
  for (const stop of chapter.stops) {
    const old = previous.stops?.[stop.id];
    let entry;
    if (
      !flags.has("--all") &&
      sameVoice &&
      old?.hash === wantHash(stop) &&
      existsSync(join(root, "public", old.file))
    ) {
      entry = old;
    } else {
      entry = await recordStop(stop);
    }
    stops[stop.id] = entry;
    out(
      `${stop.id.padEnd(18)} ${entry.seconds.toFixed(2).padStart(6)} ${(words(stop) / entry.seconds).toFixed(2).padStart(5)} ${(entry.bytes / 1000).toFixed(1).padStart(6)}`
    );
  }
}

const referenced = new Set(
  Object.values(stops).map((entry) => entry.file.replace("/tour/", ""))
);
for (const name of readdirSync(audioDir)) {
  if (name.endsWith(".m4a") && !referenced.has(name))
    rmSync(join(audioDir, name));
}
writeFileSync(
  manifestPath,
  `${JSON.stringify({ engine, voice, speed, bitrateKbps: BITRATE, stops }, null, 2)}\n`
);
rmSync(work, { recursive: true, force: true });
const total = Object.values(stops).reduce((sum, entry) => sum + entry.bytes, 0);
const seconds = Object.values(stops).reduce(
  (sum, entry) => sum + entry.seconds,
  0
);
out(
  `${Object.keys(stops).length} stops · ${seconds.toFixed(1)} s of speech · ${(total / 1e6).toFixed(2)} MB · ${engine} · ${voice} · speed ${speed}`
);
