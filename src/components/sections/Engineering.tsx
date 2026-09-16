import Link from "next/link";

import { WorkflowSteps } from "@/components/ai/WorkflowSteps";
import { aiWorkflow } from "@/content/ai-workflow";
import { engineeringPillars, stackGroups } from "@/content/engineering";

import styles from "./Engineering.module.css";

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
        <h2 id="engineering-title">
          TypeScript for the product. Backend systems around it.
        </h2>
        <p>
          I use TypeScript across web, mobile, and Node.js services. ASP.NET
          Core, relational databases, cloud platforms, testing tools, and
          deployment automation support the rest of the system when the work
          requires them.
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

      <section
        className="ai-workflow-preview"
        aria-labelledby="workflow-preview-title"
      >
        <h3 id="workflow-preview-title">{aiWorkflow.home.title}</h3>
        <p>{aiWorkflow.home.description}</p>
        <WorkflowSteps compact />
        <div className="ai-links">
          <Link href={aiWorkflow.path}>Explore my AI workflow →</Link>
          <Link href="/work/roleway">See Roleway’s approval-gated agent →</Link>
        </div>
      </section>

      <div className="stack-introduction">
        <p>Working stack</p>
        <h3>The core of my day-to-day work.</h3>
        <p>
          React and TypeScript for interfaces. C# / ASP.NET Core, SQL Server,
          and AWS for my professional backend work. Next.js and React Native for
          personal web and mobile products.
        </p>
      </div>

      <details className={styles.inventory}>
        <summary>Explore the full technology and tools inventory</summary>
        <div className="stack-groups">
          {stackGroups.map((group) => (
            <article
              className={
                group.primary
                  ? "stack-group stack-group-primary"
                  : "stack-group"
              }
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
      </details>
    </section>
  );
}
