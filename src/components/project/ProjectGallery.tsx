"use client";

import Image from "next/image";
import { useState } from "react";

import type { Project } from "@/types/content";

export function ProjectGallery({ project }: { project: Project }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = project.images[activeIndex];
  const isPortrait = activeImage.height > activeImage.width;

  return (
    <section
      className="project-gallery"
      aria-label={`${project.name} product gallery`}
      data-reveal
    >
      <div className="gallery-stage" data-orientation={isPortrait ? "portrait" : "landscape"}>
        <header>
          <div>
            <span>Product screen</span>
            <strong>{activeImage.label ?? `Screen ${activeIndex + 1}`}</strong>
          </div>
          <p>
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <i aria-hidden="true">/</i>
            {String(project.images.length).padStart(2, "0")}
          </p>
        </header>

        <figure
          key={activeImage.src}
          aria-label={activeImage.label ?? `Screen ${activeIndex + 1}`}
        >
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            width={activeImage.width}
            height={activeImage.height}
            sizes={isPortrait ? "(max-width: 700px) 78vw, 420px" : "(max-width: 900px) 94vw, 1280px"}
            priority={activeIndex === 0}
            unoptimized={project.slug === "relay"}
          />
        </figure>

        <a href={activeImage.src} target="_blank" rel="noreferrer">
          Open full resolution ↗
        </a>
      </div>

      <div
        className="gallery-index"
        role="group"
        aria-label="Choose a product screen"
        data-lenis-prevent
      >
        {project.images.map((image, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={image.src}
              type="button"
              aria-pressed={isActive}
              data-active={isActive}
              onClick={() => setActiveIndex(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span className="gallery-thumbnail" data-orientation={image.height > image.width ? "portrait" : "landscape"}>
                <Image
                  src={image.src}
                  alt=""
                  width={image.width}
                  height={image.height}
                  sizes="160px"
                />
              </span>
              <strong>{image.label ?? `Screen ${index + 1}`}</strong>
            </button>
          );
        })}
      </div>
    </section>
  );
}
