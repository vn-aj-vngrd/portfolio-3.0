import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

const staged = process.argv[2] === "--staged";
let range = [];
if (!staged) {
  const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"));
  const base = event.pull_request?.base.sha ?? event.before;
  if (!/^[a-f0-9]{40}$/u.test(base ?? "") || /^0+$/u.test(base))
    throw new Error("Missing comparison base for formatting.");
  range = [base, "HEAD"];
}
const paths = execFileSync(
  "git",
  [
    "diff",
    ...(staged ? ["--cached"] : range),
    "--name-only",
    "--diff-filter=ACMR",
    "-z",
  ],
  { encoding: "utf8" }
)
  .split("\0")
  .filter((path) => /\.(?:[cm]?[jt]sx?|json|ya?ml|css|md)$/u.test(path));
for (const path of paths) {
  const input = staged
    ? execFileSync("git", ["show", `:${path}`], { encoding: "utf8" })
    : readFileSync(path, "utf8");
  const result = spawnSync(
    process.execPath,
    ["node_modules/prettier/bin/prettier.cjs", "--stdin-filepath", path],
    { input, encoding: "utf8" }
  );
  if (result.status !== 0 || input !== result.stdout) {
    console.error(
      `Format ${path} with corepack yarn prettier --write, then stage the result.\n${result.stderr}`
    );
    process.exitCode = 1;
  }
}
