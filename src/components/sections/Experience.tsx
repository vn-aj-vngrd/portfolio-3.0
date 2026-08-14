import { experience } from "@/content/experience";

export function Experience() {
  return (
    <section
      className="section experience-section"
      id="experience"
      aria-labelledby="experience-title"
      data-reveal
    >
      <div className="section-heading section-heading-wide">
        <div className="section-index">
          <span>03</span>
          <span>Experience</span>
        </div>
        <h2 id="experience-title">From requirements to release.</h2>
        <p>
          A working history of turning operational needs into maintainable
          software—across interfaces, APIs, data, quality, and delivery.
        </p>
      </div>

      <ol className="experience-timeline">
        {experience.map((item, index) => (
          <li className="timeline-item" key={`${item.company}-${item.period}`}>
            <div className="timeline-period">
              <time>{item.period}</time>
              <span>{item.kind}</span>
            </div>

            <div className="timeline-track" aria-hidden="true">
              <span className={item.current ? "is-current" : ""} />
            </div>

            <article className="experience-entry">
              <header>
                <div>
                  <p className="experience-sequence">0{index + 1}</p>
                  <h3>{item.role}</h3>
                  <p className="experience-company">{item.company}</p>
                </div>
                {item.current ? <span className="current-role">Current</span> : null}
              </header>

              <p className="experience-summary">{item.summary}</p>

              <ul className="experience-highlights">
                {item.highlights.map((highlight) => (
                  <li key={highlight.action}>
                    <strong>{highlight.action}</strong> {highlight.detail}
                  </li>
                ))}
              </ul>

              <ul className="experience-stack" aria-label={`${item.role} technologies`}>
                {item.stack.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>

      <a className="text-link" href="/resume">
        View full résumé →
      </a>
    </section>
  );
}
