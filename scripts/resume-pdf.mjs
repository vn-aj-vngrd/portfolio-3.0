// Prints /resume to public/Van-AJ-Vanguardia-Resume.pdf, the file recruiters' tools download.
// The manifest records a hash of the résumé's source modules; the content test fails when
// they change without a new PDF.
//
// Usage: yarn dev (in another terminal), then yarn resume:pdf
// Needs the agent-browser CLI on PATH.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
export const pdfPath = join(root, "public/Van-AJ-Vanguardia-Resume.pdf");
export const manifestPath = join(root, "src/lib/resume-pdf.json");

const sources = [
  "src/content/resume.ts",
  "src/content/experience.ts",
  "src/content/profile.ts",
];

export function resumeSourceHash() {
  const hash = createHash("sha256");
  for (const file of sources) hash.update(readFileSync(join(root, file)));
  return hash.digest("hex").slice(0, 16);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const url = process.env.RESUME_URL ?? "http://localhost:3001/resume";
  const run = (...args) =>
    execFileSync("agent-browser", args, {
      stdio: ["ignore", "ignore", "inherit"],
    });
  run("open", url);
  run("wait", "1500");
  run("pdf", pdfPath);
  run("close");
  writeFileSync(
    manifestPath,
    `${JSON.stringify({ source: resumeSourceHash() }, null, 2)}\n`
  );
  process.stdout.write(`Wrote ${pdfPath}\n`);
}
