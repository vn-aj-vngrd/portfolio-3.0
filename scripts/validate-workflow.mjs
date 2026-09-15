import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

import {
  validateBranch,
  validatePullRequest,
  validatePush,
  validateSubject,
} from "./workflow-rules.mjs";

const [mode, argument] = process.argv.slice(2);
const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();
let errors = [];
if (mode === "--branch") {
  errors = validateBranch(git("branch", "--show-current"));
} else if (mode === "--push") {
  errors = validatePush(readFileSync(0, "utf8"));
} else if (mode === "--commit-message") {
  errors = validateSubject(readFileSync(argument, "utf8").split("\n")[0], {
    maintenance: true,
  });
} else if (mode === "--pull-request") {
  const { pull_request: pr } = JSON.parse(
    readFileSync(process.env.GITHUB_EVENT_PATH, "utf8")
  );
  errors = validatePullRequest(pr);
  if (pr && pr.user?.type !== "Bot") {
    for (const hash of git(
      "rev-list",
      "--no-merges",
      `${pr.base.sha}..${pr.head.sha}`
    )
      .split("\n")
      .filter(Boolean)) {
      errors.push(
        ...validateSubject(git("show", "-s", "--format=%s", hash), {
          maintenance: true,
        }).map((error) => `${hash.slice(0, 7)}: ${error}`)
      );
    }
  }
} else {
  errors = [
    "Expected --branch, --push, --commit-message <file>, or --pull-request.",
  ];
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
}
