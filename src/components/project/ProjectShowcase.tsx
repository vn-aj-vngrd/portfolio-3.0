import Image from "next/image";

import type { Project } from "@/types/content";

export function ProjectShowcase({ project }: { project: Project }) {
  return (
    <section
      className="project-showcase"
      aria-labelledby={`${project.slug}-showcase-title`}
    >
      <header className="project-showcase-heading">
        <div>
          <p>Product showcase</p>
          <h2 id={`${project.slug}-showcase-title`}>Inside {project.name}</h2>
        </div>
        <p>
          Selected product surfaces from the live experience, presented without
          simulated chrome or scroll-driven effects.
        </p>
      </header>

      <div className="project-showcase-list">
        {project.images.map((image, index) => {
          const isPortrait = image.height > image.width;

          return (
            <figure
              className="project-showcase-item"
              data-orientation={isPortrait ? "portrait" : "landscape"}
              key={image.src}
            >
              <div className="project-showcase-media">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes={
                    isPortrait
                      ? "(max-width: 700px) 82vw, 420px"
                      : "(max-width: 700px) 94vw, 1180px"
                  }
                  priority={index === 0}
                />
              </div>
              <figcaption>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{image.label ?? `Screen ${index + 1}`}</strong>
                <a href={image.src} target="_blank" rel="noreferrer">
                  Full resolution ↗
                </a>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
