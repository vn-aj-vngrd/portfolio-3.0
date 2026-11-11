// /ai page contract: current tools only, factory facts, run frames and state derivation.
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(join(root, path), "utf8");
const load = async (path) => import(pathToFileURL(join(root, path)).href);

const { aiTools, setupItems, engineeringAgentTools } = await load(
  "src/content/ai-workflow.ts"
);
const { factoryStages, factoryRunFrames } = await load(
  "src/content/factory.ts"
);
const { statusesAt } = await load("src/lib/ai/factory-run.ts");

const stageIds = factoryStages.map((stage) => stage.id);

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

// File -> reason. Empty: no retained exceptions.
const allowList = new Map();

test("retired tools and daily-driver framing are gone from published copy", () => {
  const files = [
    ...walk(join(root, "src")).filter((file) =>
      /\.(ts|tsx|json|css)$/u.test(file)
    ),
    join(root, "PRODUCT.md"),
    join(root, "README.md"),
    join(root, "DESIGN.md"),
  ];
  const retired =
    /\b(Codex|Wispr|GPT-6|Astra|Pi Agent|PI Agent|OpenCode|cmux|ChatGPT|Copilot|Cursor|Cowork|Termius)\b/u;
  const framing = /daily driver|every day|works daily|working daily/iu;
  for (const file of files) {
    const rel = relative(root, file);
    if (allowList.has(rel)) continue;
    const text = readFileSync(file, "utf8");
    assert.doesNotMatch(text, retired, `${rel} names a retired tool`);
    assert.doesNotMatch(text, framing, `${rel} uses daily-driver framing`);
    if (rel.startsWith("src/"))
      assert.doesNotMatch(text, /HERDR/u, `${rel} spells Herdr in capitals`);
  }
});

test("factory stages match the published list", () => {
  assert.deepEqual(stageIds, [
    "issue",
    "grill",
    "plan",
    "gate",
    "build",
    "prove",
    "review",
    "approve",
    "pr",
    "merge",
  ]);
  const by = Object.fromEntries(factoryStages.map((s) => [s.id, s]));
  for (const stage of factoryStages) {
    assert.ok(stage.label && stage.actor && stage.summary);
    assert.ok(stage.summary.length <= 140, `${stage.id} summary too long`);
  }
  for (const id of ["issue", "gate", "merge"]) assert.equal(by[id].actor, "Me");
  assert.equal(by.pr.actor, "Script");
  for (const id of ["plan", "approve"])
    assert.ok(by[id].models.includes("Opus"));
  assert.ok(by.build.models.includes("Sonnet"));
  assert.ok(by.build.models.includes("Opus"));
});

test("run frames are coherent", () => {
  const frames = factoryRunFrames;
  let total = 0;
  for (const frame of frames) {
    assert.ok(stageIds.includes(frame.stage));
    assert.ok(frame.caption.length > 0 && frame.caption.length <= 120);
    total += frame.ms;
  }
  assert.ok(total >= 15000 && total <= 35000);
  assert.equal(frames[0].stage, "issue");
  const lastFrame = frames.at(-1);
  assert.equal(lastFrame.stage, "merge");
  assert.equal(lastFrame.mode, "waiting");
  const gate = frames.findIndex(
    (f) => f.stage === "gate" && f.mode === "waiting"
  );
  const build = frames.findIndex((f) => f.stage === "build");
  assert.ok(gate >= 0 && gate < build);
  frames.forEach((frame, i) => {
    if (frame.stage === "review" && frame.mode === "changes") {
      assert.equal(frames[i + 1].stage, "build");
      assert.equal(frames[i + 1].mode, "return");
    }
  });
});

test("statusesAt derives stage state from a frame", () => {
  const frames = factoryRunFrames;
  const idle = statusesAt(stageIds, frames, -1);
  assert.ok(stageIds.every((id) => idle[id].status === "pending"));

  const gate = statusesAt(stageIds, frames, 3);
  assert.equal(gate.gate.status, "waiting");
  for (const id of ["issue", "grill", "plan"])
    assert.equal(gate[id].status, "done");
  assert.equal(gate.build.status, "pending");

  const rework = statusesAt(stageIds, frames, 8);
  assert.equal(rework.build.status, "active");
  assert.equal(rework.review.status, "pending");
  assert.equal(rework.review.state, "Changes");

  const complete = statusesAt(stageIds, frames, "static");
  for (const id of stageIds)
    assert.equal(complete[id].status, id === "merge" ? "waiting" : "done");
  assert.equal(complete.gate.state, "Approved");
});

test("setup lists only current tools", () => {
  assert.deepEqual(Object.keys(aiTools), [
    "claudeCode",
    "opus",
    "sonnet",
    "herdr",
    "handy",
  ]);
  const names = Object.values(aiTools).map((tool) => tool.name);
  for (const item of setupItems) assert.ok(names.includes(item.title));
  assert.deepEqual(engineeringAgentTools, names);
});

test("no factory internals leak into published copy", () => {
  for (const file of ["src/content/factory.ts", "src/content/ai-workflow.ts"]) {
    // The leading comment in factory.ts may name what is withheld; strip comments.
    const text = read(file).replace(/^\s*\/\/.*$/gmu, "");
    assert.doesNotMatch(
      text,
      /~\/|Documents\/van|\.factory|plan\.lock|criteria\.json|slices\.json/u,
      `${file} leaks factory internals`
    );
  }
});
