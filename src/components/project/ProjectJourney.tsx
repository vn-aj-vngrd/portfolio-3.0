import Image from "next/image";

import type { Project } from "@/types/content";

export function ProjectJourney({ project }: { project: Project }) {
  const journey = project.journey;
  if (!journey) return null;

  return (
    <section
      className="project-journey"
      aria-labelledby={`${project.slug}-journey-title`}
      data-reveal
    >
      <header className="project-journey-heading">
        <div>
          <p>Product journey · {journey.chapters.length} chapters</p>
          <h2 id={`${project.slug}-journey-title`}>{journey.title}</h2>
        </div>
        <p>{journey.summary}</p>
      </header>

      <ol className="project-journey-list">
        {journey.chapters.map((chapter, index) => (
          <li key={chapter.label} className="journey-chapter">
            <div className="journey-copy">
              <p className="journey-label">
                <span>{String(index + 1).padStart(2, "0")}</span>
                {chapter.label}
              </p>
              <h3>{chapter.title}</h3>
              <p className="journey-lead">{chapter.lead}</p>
              <ul>
                {chapter.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="journey-screens">
              {chapter.screens.map((screen) => (
                <figure key={screen.src}>
                  <Image
                    src={screen.src}
                    alt={screen.alt}
                    width={screen.width}
                    height={screen.height}
                    sizes="(max-width: 700px) 44vw, 240px"
                  />
                  <figcaption>{screen.label}</figcaption>
                </figure>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
