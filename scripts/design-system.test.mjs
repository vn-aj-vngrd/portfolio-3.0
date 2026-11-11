// Design system contract: documented tokens exist in CSS, both docs agree on Motion, inventory is documented.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(join(root, path), "utf8");
const load = async (path) => import(pathToFileURL(join(root, path)).href);

const ds = await load("src/content/design-system.ts");
const css = read("src/app/globals.css");
const designFile = read("DESIGN.md");
const rootBlock = css.slice(
  css.indexOf(":root {"),
  css.indexOf("\n}", css.indexOf(":root {"))
);

const section = (markdown, heading) => {
  const start = markdown.indexOf(`\n## ${heading}\n`);
  assert.ok(start >= 0, `missing ## ${heading}`);
  const end = markdown.indexOf("\n## ", start + 1);
  return markdown.slice(start, end < 0 ? undefined : end);
};
const tokenNames = (text) =>
  [...new Set(text.match(/--[a-z][a-z-]*/gu) ?? [])].sort();

test("every token in the snippet and the motion list is defined in globals.css", () => {
  const documented = new Set([
    ...tokenNames(ds.cssTokenSnippet),
    ...ds.motionTokens.map((token) => token.variable),
  ]);
  assert.ok(
    documented.has("--motion-reveal") && documented.has("--motion-stagger")
  );
  for (const variable of documented) {
    assert.match(
      rootBlock,
      new RegExp(`${variable}:`, "u"),
      `${variable} missing from :root in globals.css`
    );
  }
});

test("the snippet values match globals.css", () => {
  for (const line of ds.cssTokenSnippet
    .split("\n")
    .filter((l) => l.includes(": "))) {
    const [variable, value] = line
      .trim()
      .replace(/;$/u, "")
      .split(/:\s(.+)/u);
    const match = rootBlock.match(new RegExp(`${variable}:\\s*([^;]+);`, "u"));
    assert.ok(match, `${variable} not found`);
    assert.equal(
      match[1].trim().toLowerCase(),
      value.toLowerCase(),
      `${variable} differs`
    );
  }
});

test("DESIGN.md and /design.md agree on the Motion tokens", () => {
  const fromFile = tokenNames(section(designFile, "Motion"));
  const fromData = tokenNames(section(ds.designMarkdown, "Motion"));
  assert.deepEqual(fromFile, fromData);
  for (const variable of ds.motionTokens.map((token) => token.variable)) {
    assert.ok(
      fromData.includes(variable),
      `${variable} undocumented in Motion`
    );
  }
});

test("the Motion section documents the reveal recipe in both docs", () => {
  for (const markdown of [designFile, ds.designMarkdown]) {
    const motion = section(markdown, "Motion");
    assert.match(motion, /### Reveal/u);
    assert.match(motion, /reduced motion/iu);
    assert.match(motion, /print/iu);
  }
});

test("every inventory component is documented in both docs and the doc list is not stale", () => {
  const names = ds.componentInventory.map((item) => item.name);
  assert.equal(new Set(names).size, names.length);
  for (const [label, markdown] of [
    ["DESIGN.md", designFile],
    ["designMarkdown", ds.designMarkdown],
  ]) {
    const components = section(markdown, "Components").toLowerCase();
    for (const name of names) {
      assert.ok(
        components.includes(`${name.toLowerCase()}:`),
        `${label} Components misses "${name}"`
      );
    }
  }
});

test("the scroll story vocabulary is documented in both docs and implemented", () => {
  const reveal = read("src/lib/reveal.ts");
  assert.deepEqual(
    ds.scrollStory.map((move) => move.name),
    ["Reveal", "Sequence", "Count", "Draw", "Fill"]
  );
  for (const markdown of [designFile, ds.designMarkdown]) {
    const motion = section(markdown, "Motion");
    assert.match(motion, /### Scroll story/u);
    for (const move of ds.scrollStory) {
      assert.ok(
        motion.includes(move.attribute),
        `Motion misses ${move.attribute}`
      );
    }
  }
  for (const attribute of [
    "data-count",
    "data-draw",
    "data-fill",
    "data-reveal",
  ]) {
    assert.ok(
      reveal.includes(attribute),
      `${attribute} missing from src/lib/reveal.ts`
    );
  }
  for (const selector of [
    "[data-draw]",
    "[data-fill",
    '[data-reveal="list"]',
  ]) {
    assert.ok(css.includes(selector), `${selector} missing from globals.css`);
  }
});
