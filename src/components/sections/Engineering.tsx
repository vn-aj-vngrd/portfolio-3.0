import { engineeringPillars, stackGroups } from "@/content/engineering";

export function Engineering() {
  return (
    <section
      className="section engineering-section"
      id="tech-stack"
      aria-labelledby="engineering-title"
      data-reveal
    >
      <div className="section-heading section-heading-wide">
        <div className="section-index">
          <span>02</span>
          <span>Tech stack</span>
        </div>
        <h2 id="engineering-title">TypeScript for the product. Backend systems around it.</h2>
        <p>
          I use TypeScript across web, mobile, and Node.js services. ASP.NET Core,
          relational databases, cloud platforms, testing tools, and deployment
          automation support the rest of the system when the work requires them.
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
        <h3>The technologies I use, grouped by the work they support.</h3>
        <p>
          TypeScript is the stack I use most often. The remaining tools reflect
          backend systems, databases, infrastructure, testing, design, and team
          environments I have worked with.
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
