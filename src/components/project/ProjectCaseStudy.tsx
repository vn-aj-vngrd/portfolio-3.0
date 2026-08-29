import Link from "next/link";

import { ProjectShowcase } from "@/components/project/ProjectShowcase";
import { RelayHighlights } from "@/components/project/RelayHighlights";
import { projects } from "@/content/projects";
import type { Project } from "@/types/content";

export function ProjectCaseStudy({ project }: { project: Project }) {
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main id="main-content" className="case-study">
      <header className="case-hero" data-reveal>
        <Link className="back-link" href="/#my-work">
          ← My work
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

      <ProjectShowcase project={project} />

      <section className="case-context" aria-labelledby="context-title" data-reveal>
        <h2 id="context-title">Problem and response</h2>
        <div>
          <h3>The problem</h3>
          <p>{project.problem}</p>
        </div>
        <div>
          <h3>The approach</h3>
          <p>{project.solution}</p>
        </div>
      </section>

      {project.slug === "relay" ? <RelayHighlights /> : null}

      <section
        className="case-architecture"
        aria-labelledby="architecture-title"
        data-reveal
      >
        <div className="section-heading">
          <h2 id="architecture-title">Architecture</h2>
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
          <h2 id="decisions-title">Key product and engineering decisions</h2>
          <p>
            These decisions affect what users can do, where product rules live,
            and how the system handles failure or change.
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
          <h2 id="evidence-title">What you can inspect</h2>
          <p>
            The live product and public repository provide concrete evidence of
            the implemented features, architecture, tests, and documentation.
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
