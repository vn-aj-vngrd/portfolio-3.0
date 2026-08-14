import { engineeringPillars } from "@/content/engineering";

export function Engineering() {
  return (
    <section
      className="section engineering-section"
      id="engineering"
      aria-labelledby="engineering-title"
    >
      <div className="section-heading section-heading-wide">
        <div className="section-index"><span>02</span><span>How I build</span></div>
        <h2 id="engineering-title">One engineer across the product lifecycle.</h2>
        <p>
          The stack changes with the problem. The responsibility stays the same:
          understand it, build it, validate it, and prepare it to ship.
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
    </section>
  );
}
