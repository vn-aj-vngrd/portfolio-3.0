import { profile } from "@/content/profile";
import { resume, resumeProducts } from "@/content/resume";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

const bullets = (items: readonly string[]) =>
  items.map((item) => `- ${item}`).join("\n");

// A plain Markdown copy of the résumé: paste into any editor, Word, or Docs to restyle.
function template() {
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

  lines.push("", "## Technical Skills", "");
  for (const skill of resume.skills) {
    lines.push(`- **${skill.label}:** ${skill.detail}`);
  }

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

export function GET() {
  return new Response(template(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="Van-AJ-Vanguardia-Resume-Template.md"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
