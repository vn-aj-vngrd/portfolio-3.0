// Plain-Markdown copies of the portfolio for AI assistants, crawlers, and recruiters' tools.
// Every line derives from src/content; nothing is restated by hand here.
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projectCatalog } from "@/content/projects";
import { resume, resumeProducts } from "@/content/resume";
import { absoluteUrl, SITE_DESCRIPTION, SITE_URL } from "@/lib/seo";
import type { Project } from "@/types/content";

const bullets = (items: readonly string[]) =>
  items.map((item) => `- ${item}`).join("\n");

const currentRole = experience.find(
  (item) => "current" in item && item.current
);

const role = profile.title.replace(/\.$/u, "");

function facts() {
  return bullets([
    `Name: ${profile.name}`,
    `Role: ${role}`,
    `Location: ${profile.location} (UTC+8)`,
    `Availability: ${profile.availability}`,
    ...(currentRole
      ? [
          `Current position: ${currentRole.role}, ${currentRole.company} (${currentRole.period})`,
        ]
      : []),
    `Education: ${profile.education}`,
    `Email: ${profile.email}`,
    `GitHub: ${profile.github}`,
    `LinkedIn: ${profile.linkedin}`,
    `Website: ${SITE_URL}`,
  ]);
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
  for (const item of experience) {
    lines.push(
      `### ${item.role}, ${item.company} (${item.period})`,
      "",
      `${item.kind}. ${item.summary}`,
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
  return lines.join("\n").trimEnd();
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
      `[Full profile](${absoluteUrl("/llms-full.txt")}): every case study, role, and skill on this site as one Markdown file`,
      `[Résumé](${absoluteUrl("/resume.md")}): the résumé as Markdown`,
    ]),
    "",
    "## Pages",
    "",
    bullets([
      `[Portfolio](${SITE_URL}): introduction, products, tech stack, experience, credentials, and contact`,
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
          `[${project.name}](${absoluteUrl(`/work/${project.slug}`)}): ${project.category}. ${project.summary}`
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
    "## Skills",
    "",
    skillsMarkdown(),
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
