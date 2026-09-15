import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";

import {
  prSections,
  validateBranch,
  validatePullRequest,
  validatePush,
  validateSubject,
} from "./workflow-rules.mjs";

const body = prSections
  .map((section) => `## ${section}\n\n- Verified with concrete evidence.`)
  .join("\n\n");
const pr = {
  title: "feat: Add project search",
  head: { ref: "van/project-search" },
  base: { ref: "main" },
  user: { type: "User" },
  body,
};

test("subjects require consistent release-compatible format", () => {
  for (const subject of [
    "feat: Add search",
    "fix(ui): Align focus",
    "feat!: Replace navigation",
    "docs: Explain setup",
  ])
    assert.deepEqual(validateSubject(subject), []);
  for (const subject of [
    "Add search",
    "feat: add search",
    "feat: Add search.",
    "feat: Add search\nfix: Hidden subject",
    "feat: Add search\n",
    `feat: ${"A".repeat(70)}`,
    "PORT-123: Add search",
  ])
    assert.ok(validateSubject(subject).length, subject);
  assert.deepEqual(
    validateSubject("Merge branch 'main' into van/search", {
      maintenance: true,
    }),
    []
  );
  assert.ok(validateSubject("Merge branch 'main'").length);
});

test("branch and destination guards reject direct main updates", () => {
  assert.deepEqual(validateBranch("van/project-search"), []);
  for (const branch of [
    "main",
    "feature/search",
    "van/Search",
    "van/search_thing",
    "van/search--thing",
  ])
    assert.ok(validateBranch(branch).length);
  assert.deepEqual(validateBranch("dependabot/npm/search", { bot: true }), []);
  assert.ok(validateBranch("dependabot/npm/search").length);
  assert.deepEqual(
    validatePush("refs/heads/van/search abc refs/heads/van/search def\n"),
    []
  );
  assert.ok(
    validatePush("refs/heads/van/search abc refs/heads/main def\n").length
  );
  assert.ok(validatePush("(delete) 0000 refs/heads/main abc\n").length);
});

test("PR metadata requires the complete template and breaking impact", () => {
  assert.deepEqual(validatePullRequest(pr), []);
  for (const invalid of [
    { ...pr, title: "Update code" },
    { ...pr, body: "## Summary\n\nDone" },
    { ...pr, body: body.replace("## Summary", "## Sum<!-- hint -->mary") },
    {
      ...pr,
      body: body.replace(
        "- Verified with concrete evidence.",
        "<!-- evidence goes here -->\n-"
      ),
    },
    { ...pr, body: body.replace("- Verified with concrete evidence.", "None") },
    { ...pr, body: `${body}\n\n## Summary\n\nDuplicate` },
    { ...pr, base: { ref: "development" } },
    { ...pr, title: "feat!: Replace navigation" },
  ])
    assert.ok(validatePullRequest(invalid).length);
  assert.deepEqual(
    validatePullRequest({
      ...pr,
      title: "feat!: Replace navigation",
      body: `${body}\n\nBREAKING CHANGE: Update old navigation links.`,
    }),
    []
  );
});

const require = createRequire(import.meta.url);
const releaseRequire = createRequire(require.resolve("semantic-release"));
const { analyzeCommits } = await import(
  releaseRequire.resolve("@semantic-release/commit-analyzer")
);
const { generateNotes } = await import(
  releaseRequire.resolve("@semantic-release/release-notes-generator")
);
const config = JSON.parse(
  readFileSync(new URL("../.releaserc.json", import.meta.url))
);
const logger = { log() {}, error() {} };
for (const [message, expected] of [
  ["feat: Add project search", "minor"],
  ["fix: Restore navigation", "patch"],
  ["docs: Explain workflow", "patch"],
  ["ci: Add required checks", "patch"],
  ["chore(deps): Update packages", "patch"],
  [
    "feat!: Replace routes\n\nBREAKING CHANGE: Migrate bookmarked links",
    "major",
  ],
  ["feat!: Replace routes", "major"],
]) {
  test(`release analysis: ${message.split("\n")[0]}`, async () => {
    assert.equal(
      await analyzeCommits(config.plugins[0][1], {
        commits: [{ message, hash: "1234567890" }],
        logger,
        cwd: process.cwd(),
      }),
      expected
    );
  });
}

test("release notes work with the installed conventional preset", async () => {
  const notes = await generateNotes(config.plugins[1][1], {
    commits: [{ message: "fix: Restore navigation", hash: "1234567890abcdef" }],
    logger,
    cwd: process.cwd(),
    options: { repositoryUrl: "https://github.com/vn-aj-vngrd/portfolio-3.0" },
    lastRelease: { version: "1.0.0", gitTag: "v1.0.0" },
    nextRelease: { version: "1.0.1", gitTag: "v1.0.1" },
  });
  assert.match(notes, /Restore navigation/u);
});
