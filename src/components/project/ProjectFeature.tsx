import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/types/content";

export function ProjectFeature({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const usesPhoneScreens = project.slug === "viya";
  const usesLaptopFrame = ["relay", "roleway", "acsfi"].includes(project.slug);
  const featureImage =
    project.coverImage ?? project.images[project.coverImageIndex ?? 0];

  return (
    <article className={`project-feature project-${project.slug}`}>
      <div className="project-copy">
        <p className="project-number">0{index + 1}</p>
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
          <a href={project.repository} target="_blank" rel="noreferrer">
            Source ↗
          </a>
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
          project.images
            .slice(0, usesPhoneScreens ? 2 : 1)
            .map((image, imageIndex) => (
              <figure
                key={image.src}
                className={imageIndex === 1 ? "media-secondary" : ""}
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
                  priority={index === 0 && imageIndex === 0}
                />
              </figure>
            ))
        )}
      </div>
    </article>
  );
}
