// Portfolio content contract: the mechanical half of `.agents/skills/portfolio-content`.
// Content modules are typed TypeScript, so a drift between them fails here before review.
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(join(root, path), "utf8");
const load = async (path) => import(pathToFileURL(join(root, path)).href);

const { projectCatalog } = await load("src/content/projects.ts");
const { experience } = await load("src/content/experience.ts");
const { certifications } = await load("src/content/certifications.ts");
const { gear } = await load("src/content/gear.ts");
const { projectReadingMinutes } = await load("src/lib/reading-time.ts");

const projects = projectCatalog.list();
const filled = (value) => typeof value === "string" && value.trim().length > 0;
const within = (n, min, max) => n >= min && n <= max;
const secure = (url) => /^https:\/\//u.test(url);

test("project slugs are unique kebab-case", () => {
  const slugs = projects.map((project) => project.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const slug of slugs) assert.match(slug, /^[a-z0-9]+(-[a-z0-9]+)*$/u);
});

test("every project is complete and uses the shared case-study shape", () => {
  for (const project of projects) {
    const where = `project ${project.slug}`;
    for (const key of [
      "name",
      "category",
      "summary",
      "problem",
      "solution",
      "role",
      "status",
      "architectureSummary",
    ]) {
      assert.ok(filled(project[key]), `${where}: ${key} is empty`);
    }
    assert.ok(
      filled(project.match.prompt) &&
        filled(project.match.clue) &&
        filled(project.match.result),
      `${where}: Product Match prompt, clue, and result are required`
    );
    assert.ok(project.stack.length >= 4, `${where}: stack needs 4+ items`);
    assert.ok(
      within(project.decisions.length, 3, 4),
      `${where}: 3-4 decisions`
    );
    assert.ok(
      within(project.architecture.length, 4, 6),
      `${where}: 4-6 architecture items`
    );
    assert.ok(
      within(project.evidence.length, 4, 6),
      `${where}: 4-6 evidence lines`
    );
    assert.ok(within(project.images.length, 3, 6), `${where}: 3-6 images`);
    for (const item of [...project.decisions, ...project.architecture]) {
      assert.ok(
        filled(item.title) && filled(item.body),
        `${where}: empty stage`
      );
    }
  }
});

test("project media exists with alt text, a label, and real dimensions", () => {
  for (const project of projects) {
    for (const image of project.images) {
      assert.ok(
        existsSync(join(root, "public", image.src)),
        `${project.slug}: missing ${image.src}`
      );
      assert.ok(
        filled(image.alt) && filled(image.label),
        `${project.slug}: alt and label`
      );
      assert.ok(
        image.width > 0 && image.height > 0,
        `${project.slug}: dimensions`
      );
    }
  }
});

test("status wording matches source and link facts", () => {
  for (const project of projects) {
    if (project.repository)
      assert.ok(secure(project.repository), `${project.slug}: repository`);
    if (project.liveUrl)
      assert.ok(secure(project.liveUrl), `${project.slug}: liveUrl`);
    if (/(source available|open source)/iu.test(project.status)) {
      assert.ok(
        project.repository,
        `${project.slug}: "Source available" and "Open source" need a repository`
      );
    }
    if (/closed source/iu.test(project.status)) {
      assert.equal(
        project.repository,
        undefined,
        `${project.slug}: closed source has no repository`
      );
    }
  }
});

test("Product Lab has one 3D device per project, in order", () => {
  const scene = read("src/components/game/ProductMatchScene.tsx");
  const devices = [...scene.matchAll(/^\s{4}name: "([^"]+)"/gmu)].map(
    (m) => m[1]
  );
  assert.deepEqual(
    devices,
    projects.map((project) => project.name.toUpperCase())
  );
});

test("every product is named on the homepage intro and in PRODUCT.md", () => {
  const intro = read("src/components/sections/SelectedWork.tsx");
  const product = read("PRODUCT.md");
  for (const project of projects.filter((item) => item.featured)) {
    assert.ok(
      intro.includes(project.name),
      `SelectedWork intro misses ${project.name}`
    );
    assert.ok(
      product.includes(project.name),
      `PRODUCT.md misses ${project.name}`
    );
  }
});

test("résumé products point at real projects", () => {
  const slugs = new Set(projects.map((project) => project.slug));
  const resume = read("src/content/resume.ts");
  const selections = resume.slice(resume.indexOf("productSelections"));
  for (const match of selections.matchAll(/slug: "([^"]+)"/gu)) {
    assert.ok(
      slugs.has(match[1]),
      `résumé references unknown project ${match[1]}`
    );
  }
});

test("experience entries are complete and dated consistently", () => {
  const companies = experience.map((entry) => entry.company);
  assert.equal(new Set(companies).size, companies.length);
  assert.equal(
    experience.filter((entry) => entry.current).length,
    1,
    "exactly one current role"
  );
  const month = "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)";
  const period = new RegExp(
    `^${month} \\d{4} – (${month} \\d{4}|Present)$`,
    "u"
  );
  for (const entry of experience) {
    for (const key of ["company", "role", "kind", "summary"]) {
      assert.ok(filled(entry[key]), `${entry.company}: ${key} is empty`);
    }
    assert.match(
      entry.period,
      period,
      `${entry.company}: period "${entry.period}"`
    );
    assert.ok(entry.highlights.length >= 1, `${entry.company}: highlights`);
    assert.ok(entry.stack.length >= 1, `${entry.company}: stack`);
    assert.ok(
      entry.period.endsWith("Present") === Boolean(entry.current),
      `${entry.company}: current flag disagrees with the period`
    );
  }
});

test("résumé experience lookups resolve and carry résumé bullets", () => {
  const resume = read("src/content/resume.ts");
  const byCompany = new Map(experience.map((entry) => [entry.company, entry]));
  for (const match of resume.matchAll(/experienceEntry\("([^"]+)"/gu)) {
    const entry = byCompany.get(match[1]);
    assert.ok(entry, `résumé references unknown company ${match[1]}`);
    assert.ok(
      entry.resumeBullets?.length,
      `${match[1]}: resumeBullets required for the résumé`
    );
  }
});

test("certifications are complete and their files exist", () => {
  for (const item of certifications) {
    assert.ok(
      filled(item.title) && filled(item.issuer) && filled(item.kind),
      item.title
    );
    if (item.href?.startsWith("/")) {
      assert.ok(
        existsSync(join(root, "public", item.href)),
        `missing ${item.href}`
      );
    }
  }
});

test("gear entries are complete", () => {
  for (const item of gear) {
    assert.ok(
      filled(item.name) && filled(item.detail) && filled(item.use),
      item.name
    );
  }
});

test("profile keeps the identity fields every surface reads", () => {
  const profile = read("src/content/profile.ts");
  for (const key of [
    "name",
    "title",
    "statement",
    "introduction",
    "location",
    "email",
    "github",
    "linkedin",
    "philosophy",
    "education",
  ]) {
    assert.match(
      profile,
      new RegExp(`\\b${key}:`, "u"),
      `profile.${key} missing`
    );
  }
  assert.match(profile, /name: "Van AJ Vanguardia"/u);
});

test("case studies carry a believable reading time", () => {
  for (const project of projects) {
    const minutes = projectReadingMinutes(project);
    assert.ok(within(minutes, 2, 25), `${project.slug}: ${minutes} min`);
  }
});
