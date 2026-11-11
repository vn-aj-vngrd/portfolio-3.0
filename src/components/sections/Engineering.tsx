import Link from "next/link";

import { AiMotion } from "@/components/ai/AiMotion";
import { WorkflowSteps } from "@/components/ai/WorkflowSteps";
import { Chip } from "@/components/ui/Chip";
import { aiWorkflow } from "@/content/ai-workflow";
import { engineeringPillars, stackGroups } from "@/content/engineering";

export function Engineering() {
  return (
    <section
      className="section engineering-section"
      id="tech-stack"
      aria-labelledby="engineering-title"
    >
      <div className="section-heading section-heading-wide" data-reveal>
        <div className="section-index">
          <span>02</span>
          <span>Tech stack</span>
        </div>
        <h2 id="engineering-title">
          TypeScript for the product. Backend systems around it.
        </h2>
        <p>
          TypeScript across web, mobile, and Node.js, with{" "}
          <Chip icon="server">ASP.NET Core</Chip>,{" "}
          <Chip icon="database">databases</Chip>,{" "}
          <Chip icon="cloud">cloud</Chip>, and <Chip icon="check">testing</Chip>{" "}
          behind it when the work needs them.
        </p>
      </div>

      <div
        className="pillar-list"
        data-tour-stop="tech-pillars"
        data-reveal="list"
      >
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
        data-tour-stop="tech-workflow"
        data-reveal
        aria-labelledby="workflow-preview-title"
      >
        <h3 id="workflow-preview-title">{aiWorkflow.home.title}</h3>
        <p>{aiWorkflow.home.description}</p>
        <WorkflowSteps compact />
        <AiMotion />
        <div className="ai-links">
          <Link href={aiWorkflow.path}>Explore my AI workflow →</Link>
          <Link href="/work/roleway">See Roleway’s approval-gated agent →</Link>
        </div>
      </section>

      <div className="stack-introduction" data-reveal>
        <p>Working stack</p>
        <h3>The technologies I use, grouped by the work they support.</h3>
        <p>
          TypeScript is the stack I use most often. The remaining tools reflect
          backend systems, databases, infrastructure, testing, design, and team
          environments I have worked with.
        </p>
      </div>

      <div
        className="stack-groups"
        data-tour-stop="tech-stack-groups"
        data-reveal="list"
      >
        {stackGroups.map((group) => (
          <article
            className={
              group.primary ? "stack-group stack-group-primary" : "stack-group"
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
    </section>
  );
}
