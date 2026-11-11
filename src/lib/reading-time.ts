import type { Project } from "../types/content";

const WORDS_PER_MINUTE = 220;
const SECONDS_PER_IMAGE = 8;

function words(text: string) {
  return text.trim().split(/\s+/u).filter(Boolean).length;
}

// Every string a reader scrolls through, plus a small allowance per screenshot.
export function projectReadingMinutes(project: Project) {
  const text: string[] = [
    project.summary,
    project.problem,
    project.solution,
    project.architectureSummary,
    project.role,
    project.status,
    ...project.evidence,
    ...[
      ...project.decisions,
      ...project.architecture,
      ...(project.features ?? []),
    ].flatMap((item) => [item.title, item.body]),
  ];
  let images = 0;
  if (project.agent) {
    text.push(project.agent.summary);
    for (const step of project.agent.steps) text.push(step.title, step.body);
  }
  if (project.journey) {
    text.push(project.journey.title, project.journey.summary);
    for (const chapter of project.journey.chapters) {
      text.push(chapter.title, chapter.lead, ...chapter.points);
      images += chapter.screens.length;
    }
  } else {
    images += project.images.length;
  }
  const seconds =
    (text.reduce((sum, part) => sum + words(part), 0) / WORDS_PER_MINUTE) * 60 +
    images * SECONDS_PER_IMAGE;
  return Math.max(1, Math.round(seconds / 60));
}
