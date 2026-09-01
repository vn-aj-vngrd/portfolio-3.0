import Link from "next/link";

import { ProjectFeature } from "@/components/project/ProjectFeature";
import { projectCatalog } from "@/content/projects";

export function SelectedWork() {
  const featured = projectCatalog.list({ featured: true });
  const supporting = projectCatalog.list({ featured: false });

  return (
    <section
      className="section work-section"
      id="my-work"
      aria-labelledby="work-title"
      data-reveal
    >
      <div className="section-heading">
        <div className="section-index"><span>01</span><span>My work</span></div>
        <h2 id="work-title">Products I designed and built.</h2>
        <p>
          Relay, Roleway, Viya, and ACSFI cover social sports, job-search
          operations, mobile travel, and nonprofit publishing. Together they show
          how I handle product scope, interface design, domain modeling, backend
          architecture, content systems, testing, and release. Each case study
          links to the public source where it is available.
        </p>
      </div>
      <div className="project-list">
        {featured.map((project, index) => (
          <ProjectFeature key={project.slug} project={project} index={index} />
        ))}
      </div>

      {supporting.length ? (
        <div className="supporting-work" aria-labelledby="supporting-title">
          <h3 id="supporting-title">Supporting work</h3>
          {supporting.map((project) => (
            <article key={project.slug}>
              <div>
                <h4>{project.name}</h4>
                <p>{project.summary}</p>
              </div>
              <p className="supporting-stack">{project.stack.join(" · ")}</p>
              <div className="supporting-links">
                <Link href={`/work/${project.slug}`}>Details →</Link>
                <a href={project.repository} target="_blank" rel="noreferrer">
                  Source ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
