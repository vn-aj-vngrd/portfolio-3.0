import Image from "next/image";
import Link from "next/link";

import { tourStopId } from "@/content/tour";
import type { Project } from "@/types/content";

const phoneCallouts: Record<string, readonly string[]> = {
  viya: ["57% ready", "Draft · nothing changes until you apply", "₱9,670 left"],
  aqd: [
    "Planned · Office day",
    "Answered on device",
    "Draft, not confirmed saved",
  ],
};

export function ProjectFeature({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const usesPhoneScreens = project.slug === "viya" || project.slug === "aqd";
  const usesLaptopFrame = project.slug === "acsfi" || project.slug === "balay";
  const featureImage =
    project.coverImage ?? project.images[project.coverImageIndex ?? 0];

  return (
    <article
      className={`project-feature project-${project.slug}`}
      data-tags={project.tags.join(" ")}
      data-tour-stop={tourStopId.project(project.slug)}
    >
      <div className="project-copy">
        {/* The number is a CSS counter, so it follows whatever the filter shows. */}
        <p className="project-number" aria-hidden="true" />
        <p className="project-category">{project.category}</p>
        <h3>{project.name}</h3>
        <p className="project-summary">{project.summary}</p>
        <dl className="project-facts">
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{project.status}</dd>
          </div>
        </dl>
        <ul className="stack-list" aria-label={`${project.name} technology`}>
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="project-links">
          <Link href={`/work/${project.slug}`}>
            Read case study <span aria-hidden="true">→</span>
          </Link>
          {project.repository ? (
            <a href={project.repository} target="_blank" rel="noreferrer">
              Source ↗
            </a>
          ) : null}
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              Live ↗
            </a>
          ) : null}
        </div>
      </div>

      <div
        className={`project-media ${usesPhoneScreens ? "project-media-phones" : ""}`}
      >
        {usesLaptopFrame ? (
          <figure className="project-laptop-mockup">
            <div>
              <Image
                src={featureImage.src}
                alt={featureImage.alt}
                width={featureImage.width}
                height={featureImage.height}
                sizes="(max-width: 700px) 90vw, 720px"
                priority={index === 0}
                unoptimized
              />
            </div>
          </figure>
        ) : (
          (usesPhoneScreens
            ? project.images.slice(
                0,
                project.slug === "viya" || project.slug === "aqd" ? 3 : 2
              )
            : [featureImage]
          ).map((image, imageIndex) => (
            <figure
              key={image.src}
              className={imageIndex % 2 === 1 ? "media-secondary" : ""}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes={
                  usesPhoneScreens
                    ? "(max-width: 700px) 52vw, 360px"
                    : "(max-width: 900px) 86vw, 620px"
                }
                // Preserve fine UI text in the already-compressed WebP covers.
                unoptimized={Boolean(project.coverImage)}
                priority={index === 0 && imageIndex === 0}
              />
              {phoneCallouts[project.slug]?.[imageIndex] ? (
                <span className="phone-callout" aria-hidden="true">
                  {phoneCallouts[project.slug][imageIndex]}
                </span>
              ) : null}
            </figure>
          ))
        )}
      </div>
    </article>
  );
}
