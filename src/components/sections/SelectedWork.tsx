import Link from "next/link";

import { ProjectFeature } from "@/components/project/ProjectFeature";
import { Chip } from "@/components/ui/Chip";
import { projectCatalog } from "@/content/projects";
import type { ChipIcon } from "@/types/content";

const productChips: readonly {
  name: string;
  slug: string;
  icon: ChipIcon;
}[] = [
  { name: "Relay", slug: "relay", icon: "users" },
  { name: "Roleway", slug: "roleway", icon: "briefcase" },
  { name: "Viya", slug: "viya", icon: "plane" },
  { name: "ACSFI", slug: "acsfi", icon: "news" },
  { name: "Balay", slug: "balay", icon: "home" },
  { name: "AQD", slug: "aqd", icon: "shirt" },
];

export function SelectedWork() {
  const featured = projectCatalog.list({ featured: true });
  const supporting = projectCatalog.list({ featured: false });

  return (
    <section
      className="section work-section"
      id="my-work"
      aria-labelledby="work-title"
    >
      <div className="section-heading" data-tour-stop="work" data-reveal>
        <div className="section-index">
          <span>01</span>
          <span>My work</span>
        </div>
        <h2 id="work-title">Products I designed and built.</h2>
        <div className="section-lede">
          <p>
            Six products, built end to end. Source is public where available;
            Balay is closed source.
          </p>
          <p className="chip-row">
            {productChips.map((product) => (
              <Chip
                key={product.slug}
                icon={product.icon}
                href={`/work/${product.slug}`}
              >
                {product.name}
              </Chip>
            ))}
          </p>
        </div>
      </div>
      <div className="project-list" data-reveal="list">
        {featured.map((project, index) => (
          <ProjectFeature key={project.slug} project={project} index={index} />
        ))}
      </div>

      {supporting.length ? (
        <div
          className="supporting-work"
          aria-labelledby="supporting-title"
          data-reveal
        >
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
                {project.repository ? (
                  <a href={project.repository} target="_blank" rel="noreferrer">
                    Source ↗
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
