import Image from "next/image";
import Link from "next/link";

import { projects } from "@/content/projects";
import type { Project } from "@/types/content";

export function ProjectCaseStudy({ project }: { project: Project }) {
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main id="main-content" className="case-study">
      <header className="case-hero" data-reveal>
        <Link className="back-link" href="/#work">
          ← Selected products
        </Link>
        <p className="project-category">{project.category}</p>
        <h1>{project.name}</h1>
        <p className="case-summary">{project.summary}</p>
        <dl className="case-meta">
          <div>
            <dt>Contribution</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Current state</dt>
            <dd>{project.status}</dd>
          </div>
          <div>
            <dt>Built with</dt>
            <dd>{project.stack.join(" · ")}</dd>
          </div>
        </dl>
        <div className="project-links">
          <a href={project.repository} target="_blank" rel="noreferrer">
            View source ↗
          </a>
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              Open live product ↗
            </a>
          ) : null}
        </div>
      </header>

      <section
        className={`case-media case-media-${project.slug}`}
        aria-label={`${project.name} product screens`}
        data-reveal
      >
        {project.images.map((image) => (
          <figure key={image.src}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 700px) 88vw, 460px"
              priority={image === project.images[0]}
            />
          </figure>
        ))}
      </section>

      <section className="case-context" aria-labelledby="context-title" data-reveal>
        <h2 id="context-title">What needed to change</h2>
        <div>
          <h3>The problem</h3>
          <p>{project.problem}</p>
        </div>
        <div>
          <h3>The product response</h3>
          <p>{project.solution}</p>
        </div>
      </section>

      <section
        className="case-architecture"
        aria-labelledby="architecture-title"
        data-reveal
      >
        <div className="section-heading">
          <h2 id="architecture-title">How the system is shaped</h2>
          <p>{project.architectureSummary}</p>
        </div>
        <ol className="architecture-list">
          {project.architecture.map((layer) => (
            <li key={layer.title}>
              <h3>{layer.title}</h3>
              <p>{layer.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="case-decisions" aria-labelledby="decisions-title" data-reveal>
        <div className="section-heading">
          <h2 id="decisions-title">Trade-offs that mattered</h2>
          <p>
            These choices changed how the product behaves—not just how the code
            is organized.
          </p>
        </div>
        <div className="decision-list">
          {project.decisions.map((decision) => (
            <article key={decision.title}>
              <h3>{decision.title}</h3>
              <p>{decision.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="case-evidence" aria-labelledby="evidence-title" data-reveal>
        <div>
          <h2 id="evidence-title">Evidence in the public build</h2>
          <p>
            Concrete signals across source, documentation, tests, and the
            running product.
          </p>
        </div>
        <ul>
          {project.evidence.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <footer className="case-footer" data-reveal>
        <p>Next product</p>
        <Link href={`/work/${nextProject.slug}`}>
          <strong>{nextProject.name}</strong>
          <span>{nextProject.summary}</span>
          <span aria-hidden="true">Read next →</span>
        </Link>
      </footer>
    </main>
  );
}
