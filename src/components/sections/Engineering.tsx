import { engineeringPillars, stackGroups } from "@/content/engineering";

export function Engineering() {
  return (
    <section
      className="section engineering-section"
      id="engineering"
      aria-labelledby="engineering-title"
      data-reveal
    >
      <div className="section-heading section-heading-wide">
        <div className="section-index">
          <span>02</span>
          <span>Tech stack</span>
        </div>
        <h2 id="engineering-title">TypeScript at the center. Product delivery end to end.</h2>
        <p>
          TypeScript is my default ecosystem, supported by backend, data,
          infrastructure, quality, and AI tooling selected for the problem—not
          for the trend.
        </p>
      </div>

      <div className="pillar-list">
        {engineeringPillars.map((pillar) => (
          <article key={pillar.title}>
            <h3>{pillar.title}</h3>
            <p>{pillar.description}</p>
            <span className="pillar-evidence">{pillar.evidence}</span>
          </article>
        ))}
      </div>

      <div className="stack-introduction">
        <p>Working stack</p>
        <h3>A grouped view of the technologies and tools I use or have worked with.</h3>
        <p>
          The hierarchy is intentional: TypeScript product engineering is the
          core; the remaining tools support particular systems, teams, and
          delivery constraints.
        </p>
      </div>

      <div className="stack-groups">
        {stackGroups.map((group) => (
          <article
            className={group.primary ? "stack-group stack-group-primary" : "stack-group"}
            key={group.title}
          >
            <div>
              <h4>{group.title}</h4>
              <p>{group.description}</p>
            </div>
            <ul aria-label={`${group.title} technologies`}>
              {group.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
