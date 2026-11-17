// Plain-Markdown copies of the portfolio for AI assistants, crawlers, and recruiters' tools.
// Every line derives from src/content; nothing is restated by hand here.
import { shippedAi } from "@/content/ai-workflow";
import { experience } from "@/content/experience";
import { factoryIntro, factoryPair } from "@/content/factory";
import { hiring } from "@/content/hiring";
import { profile } from "@/content/profile";
import { projectCatalog } from "@/content/projects";
import { resume, resumeProducts } from "@/content/resume";
import {
  absoluteUrl,
  RESUME_PDF_PATH,
  SITE_DESCRIPTION,
  SITE_URL,
} from "@/lib/seo";
import type { Project } from "@/types/content";

const bullets = (items: readonly string[]) =>
  items.map((item) => `- ${item}`).join("\n");

const role = profile.title.replace(/\.$/u, "");

function facts() {
  return bullets([
    `Name: ${profile.name}`,
    `Headline: ${role}`,
    ...hiring.facts
      .filter((fact) => fact.label !== "Contact")
      .map((fact) => `${fact.label}: ${fact.value}`),
    `Email: ${profile.email}`,
    `GitHub: ${profile.github}`,
    `LinkedIn: ${profile.linkedin}`,
    `Website: ${SITE_URL}`,
    `Résumé (PDF): ${absoluteUrl(RESUME_PDF_PATH)}`,
  ]);
}

const link = (href: string) =>
  href.startsWith("/") ? absoluteUrl(href) : href;

function claimsMarkdown() {
  return hiring.claims
    .map(
      (item) =>
        `- **${item.claim}** ${item.detail} Proof: ${item.proof
          .map((proof) => `[${proof.label}](${link(proof.href)})`)
          .join(", ")}`
    )
    .join("\n");
}

function faqMarkdown() {
  return hiring.faq
    .map((item) => `**${item.question}** ${item.answer}`)
    .join("\n\n");
}

// /hire.md: the hiring brief as Markdown.
export function hireMarkdown() {
  return [
    `# ${profile.name}: hiring brief`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    hiring.introduction,
    "",
    "## Facts",
    "",
    facts(),
    "",
    "## Claims and proof",
    "",
    claimsMarkdown(),
    "",
    "## Questions",
    "",
    faqMarkdown(),
    "",
    "## More",
    "",
    bullets([
      `[Full profile](${absoluteUrl("/llms-full.txt")})`,
      `[Résumé as Markdown](${absoluteUrl("/resume.md")})`,
      `[Résumé as PDF](${absoluteUrl(RESUME_PDF_PATH)})`,
    ]),
    "",
  ].join("\n");
}

// /work/<slug>.md: one case study as Markdown.
export function caseStudyMarkdown(slug: string) {
  const project = projectCatalog.find(slug);
  if (!project) return null;
  return [
    `# ${project.name}: case study by ${profile.name}`,
    "",
    projectMarkdown(project).replace(/^### .*\n\n/u, ""),
    "",
    `Author: ${profile.name}, ${role}. ${absoluteUrl(hiring.path)}`,
    "",
  ].join("\n");
}

function projectLinks(project: Project) {
  return [
    `Case study: ${absoluteUrl(`/work/${project.slug}`)}`,
    ...(project.liveUrl ? [`Live: ${project.liveUrl}`] : []),
    ...(project.repository ? [`Source: ${project.repository}`] : []),
  ];
}

function projectMarkdown(project: Project) {
  const lines = [
    `### ${project.name}`,
    "",
    `${project.category}. ${project.role}. ${project.status}.`,
    "",
    project.summary,
    "",
    `**Problem.** ${project.problem}`,
    "",
    `**Solution.** ${project.solution}`,
    "",
    `**Stack.** ${project.stack.join(", ")}`,
  ];
  if (project.agent) {
    lines.push(
      "",
      `**AI agent.** ${project.agent.summary}`,
      "",
      bullets(project.agent.steps.map((step) => `${step.title}: ${step.body}`))
    );
  }
  lines.push(
    "",
    `**Architecture.** ${project.architectureSummary}`,
    "",
    bullets(project.architecture.map((item) => `${item.title}: ${item.body}`)),
    "",
    "**Key decisions.**",
    "",
    bullets(project.decisions.map((item) => `${item.title}: ${item.body}`)),
    "",
    "**Evidence.**",
    "",
    bullets(project.evidence),
    "",
    bullets(projectLinks(project))
  );
  return lines.join("\n");
}

function experienceMarkdown() {
  const lines: string[] = [];
  const groups = [
    ["Professional", "Professional experience"],
    ["Internship", "Internships"],
    ["Capstone", "University capstone"],
  ] as const;
  for (const [kind, heading] of groups) {
    lines.push(`### ${heading}`, "");
    for (const item of experience.filter((entry) => entry.kind === kind)) {
      lines.push(
        `#### ${item.role}, ${item.company} (${item.period})`,
        "",
        item.summary,
        ""
      );
      if ("resumeGroups" in item && item.resumeGroups) {
        for (const group of item.resumeGroups) {
          lines.push(
            `**${group.client}** (${group.label})`,
            "",
            bullets(group.bullets),
            ""
          );
        }
      } else if (item.resumeBullets) {
        lines.push(bullets(item.resumeBullets), "");
      }
      lines.push(`Stack: ${item.stack.join(", ")}`, "");
    }
  }
  return lines.join("\n").trimEnd();
}

function aiSection() {
  return [
    "AI agents shipped in products:",
    "",
    bullets(
      shippedAi.map(
        (item) =>
          `**${item.name}: ${item.title}.** ${item.description} (${item.stack})`
      )
    ),
    "",
    `**Software factories.** ${factoryIntro.lead.join(" ")} ${factoryPair.lead}`,
    "",
    bullets(
      factoryPair.rows.map(
        (row) =>
          `${row.label}. ${factoryPair.columns.personal.name}: ${row.personal} ${factoryPair.columns.work.name}: ${row.work}`
      )
    ),
    "",
    factoryPair.note,
  ].join("\n");
}

// /ai.md: the AI page as Markdown.
export function aiMarkdown() {
  return [
    `# ${profile.name}: AI engineering and software factories`,
    "",
    aiSection(),
    "",
    `Page: ${absoluteUrl("/ai")}. Hiring brief: ${absoluteUrl(hiring.path)}`,
    "",
  ].join("\n");
}

function skillsMarkdown() {
  return bullets(
    resume.skills.map((skill) => `**${skill.label}:** ${skill.detail}`)
  );
}

// A plain Markdown copy of the résumé: paste into any editor, Word, or Docs to restyle.
export function resumeMarkdown() {
  const lines: string[] = [
    `# ${profile.name}`,
    "",
    resume.title,
    "",
    [
      profile.location,
      profile.email,
      SITE_URL,
      profile.github,
      profile.linkedin,
    ].join(" | "),
    "",
    "## Summary",
    "",
    resume.summary,
    "",
    "## Professional Experience",
  ];

  for (const item of resume.professional) {
    lines.push("", `### ${item.role}, ${item.company} (${item.period})`, "");
    if ("resumeGroups" in item && item.resumeGroups) {
      for (const group of item.resumeGroups) {
        lines.push(
          `**${group.client}** (${group.label})`,
          "",
          bullets(group.bullets),
          ""
        );
      }
    } else {
      lines.push(bullets(item.bullets));
    }
  }

  lines.push("", "## Personal Products", "");
  for (const project of resumeProducts) {
    const links = [project.repository, project.liveUrl]
      .filter(Boolean)
      .join(" | ");
    lines.push(
      `- **${project.name}** (${project.role}): ${project.description} Stack: ${project.stack.join(", ")}.${links ? ` ${links}` : ""}`
    );
  }

  lines.push("", "## Technical Skills", "", skillsMarkdown());

  lines.push("", "## Internships");
  for (const item of resume.internships) {
    lines.push(
      "",
      `### ${item.role}, ${item.company} (${item.period})`,
      "",
      bullets(item.bullets)
    );
  }

  lines.push(
    "",
    "## Education",
    "",
    profile.education,
    "",
    `### ${resume.capstone.role}, team capstone (${resume.capstone.period})`,
    "",
    bullets(resume.capstone.bullets),
    ""
  );
  return lines.join("\n");
}

// /llms.txt: a short index in the llmstxt.org shape, pointing at the full copies.
export function llmsIndex() {
  const projects = projectCatalog.list();
  return [
    `# ${profile.name}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    resume.summary,
    "",
    "## Facts",
    "",
    facts(),
    "",
    "## Full text",
    "",
    bullets([
      `[Hiring brief](${absoluteUrl("/hire.md")}): target roles, facts, and each claim linked to its proof`,
      `[Full profile](${absoluteUrl("/llms-full.txt")}): every case study, role, and skill on this site as one Markdown file`,
      `[Résumé](${absoluteUrl("/resume.md")}): the résumé as Markdown`,
      `[Résumé PDF](${absoluteUrl(RESUME_PDF_PATH)}): the résumé as a file`,
      `[AI engineering](${absoluteUrl("/ai.md")}): shipped agents and the two software factories`,
    ]),
    "",
    "## Pages",
    "",
    bullets([
      `[Portfolio](${SITE_URL}): introduction, products, tech stack, experience, credentials, and contact`,
      `[Hiring brief](${absoluteUrl(hiring.path)}): the short version for recruiters and their AI agents`,
      `[Résumé](${absoluteUrl("/resume")}): printable résumé`,
      `[AI workflow](${absoluteUrl("/ai")}): how Van builds with Claude Code and his software factory`,
      `[GitHub activity](${absoluteUrl("/github")}): contribution and language aggregates`,
    ]),
    "",
    "## Case studies",
    "",
    bullets(
      projects.map(
        (project) =>
          `[${project.name}](${absoluteUrl(`/work/${project.slug}.md`)}): ${project.category}. ${project.summary}`
      )
    ),
    "",
  ].join("\n");
}

// /llms-full.txt: the whole portfolio as one Markdown document.
export function llmsFull() {
  return [
    `# ${profile.name}: ${role}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "## Facts",
    "",
    facts(),
    "",
    "## Summary",
    "",
    resume.summary,
    "",
    profile.philosophy,
    "",
    "## Claims and proof",
    "",
    claimsMarkdown(),
    "",
    "## Questions",
    "",
    faqMarkdown(),
    "",
    "## Skills",
    "",
    skillsMarkdown(),
    "",
    "## AI engineering",
    "",
    aiSection(),
    "",
    `Details: ${absoluteUrl("/ai")}`,
    "",
    "## Products and case studies",
    "",
    projectCatalog.list().map(projectMarkdown).join("\n\n"),
    "",
    "## Experience",
    "",
    experienceMarkdown(),
    "",
    "## Contact",
    "",
    bullets([
      `Email: ${profile.email}`,
      `GitHub: ${profile.github}`,
      `LinkedIn: ${profile.linkedin}`,
      `Résumé: ${absoluteUrl("/resume")}`,
    ]),
    "",
  ].join("\n");
}
