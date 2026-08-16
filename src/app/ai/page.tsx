import type { Metadata } from "next";
import Link from "next/link";

import {
  agentGuardrails,
  agentSurfaces,
  favoriteModels,
  skillGroups,
  workflowStages,
} from "@/content/ai-workflow";

export const metadata: Metadata = {
  title: "Agentic Workflow",
  description:
    "How Van AJ Vanguardia uses AI models, coding agents, reusable skills, and engineering guardrails to build and validate software.",
  alternates: { canonical: "/ai" },
};

export default function AiWorkflowPage() {
  const skillCount = skillGroups.reduce((total, group) => total + group.skills.length, 0);

  return (
    <main id="main-content" className="ai-page">
      <section className="ai-hero" aria-labelledby="ai-title" data-reveal>
        <Link className="page-back-link" href="/">
          <span aria-hidden="true">←</span> Back to portfolio
        </Link>
        <div className="ai-hero-grid">
          <div>
            <p className="ai-kicker">Agentic engineering</p>
            <h1 id="ai-title">AI is leverage. Judgment stays human.</h1>
          </div>
          <div className="ai-hero-copy">
            <p>
              I use models, coding agents, and reusable skills as an engineering
              system—from framing the problem to validating production.
            </p>
            <p>
              The goal is not more generated code. It is faster feedback, clearer
              decisions, smaller diffs, and software that still holds up after review.
            </p>
          </div>
        </div>
        <dl className="ai-signals">
          <div>
            <dt>{favoriteModels.length}</dt>
            <dd>Daily-driver models</dd>
          </div>
          <div>
            <dt>{workflowStages.length}</dt>
            <dd>Workflow stages</dd>
          </div>
          <div>
            <dt>{skillCount}</dt>
            <dd>Reusable agent skills</dd>
          </div>
          <div>
            <dt>{agentSurfaces.length}</dt>
            <dd>Working surfaces</dd>
          </div>
        </dl>
      </section>

      <section className="ai-section ai-models" aria-labelledby="models-title" data-reveal>
        <header className="ai-section-heading">
          <p>01 · Models</p>
          <div>
            <h2 id="models-title">A deliberate pair of daily drivers.</h2>
            <p>Different models for different kinds of thinking—not a leaderboard.</p>
          </div>
        </header>
        <div className="model-pair">
          {favoriteModels.map((model, index) => (
            <article key={model.name}>
              <span>0{index + 1}</span>
              <p>{model.role}</p>
              <h3>{model.name}</h3>
              <strong>{model.use}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="ai-section" aria-labelledby="workflow-title" data-reveal>
        <header className="ai-section-heading">
          <p>02 · Workflow</p>
          <div>
            <h2 id="workflow-title">From an ambiguous request to verified software.</h2>
            <p>Agents move the work forward; explicit gates keep the work trustworthy.</p>
          </div>
        </header>
        <ol className="agent-workflow">
          {workflowStages.map((stage, index) => (
            <li key={stage.title}>
              <span>0{index + 1}</span>
              <div>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
              </div>
              <strong>{stage.output}</strong>
            </li>
          ))}
        </ol>
      </section>

      <section className="ai-section" aria-labelledby="surfaces-title" data-reveal>
        <header className="ai-section-heading">
          <p>03 · Setup</p>
          <div>
            <h2 id="surfaces-title">One workflow across terminal, desktop, and editor.</h2>
            <p>cmux and HERDR sit alongside focused agents and familiar development tools.</p>
          </div>
        </header>
        <div className="agent-surfaces">
          {agentSurfaces.map((surface, index) => (
            <article key={surface.title}>
              <span>0{index + 1}</span>
              <h3>{surface.title}</h3>
              <p>{surface.description}</p>
              <ul aria-label={`${surface.title} tools`}>
                {surface.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="ai-section" aria-labelledby="skills-title" data-reveal>
        <header className="ai-section-heading">
          <p>04 · Skills</p>
          <div>
            <h2 id="skills-title">Reusable expertise, loaded only when the task calls for it.</h2>
            <p>
              Skills turn broad agent capability into repeatable workflows with a clear
              purpose and definition of done.
            </p>
          </div>
        </header>
        <div className="agent-skills">
          {skillGroups.map((group) => (
            <section key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill.name}>
                    <code>{skill.name}</code>
                    <p>{skill.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section className="ai-guardrails" aria-labelledby="guardrails-title" data-reveal>
        <div>
          <p>05 · Guardrails</p>
          <h2 id="guardrails-title">Agent-driven does not mean autopilot.</h2>
        </div>
        <ol>
          {agentGuardrails.map((guardrail, index) => (
            <li key={guardrail}>
              <span>0{index + 1}</span>
              {guardrail}
            </li>
          ))}
        </ol>
      </section>

      <footer className="ai-footer" data-reveal>
        <p>The workflow is only useful if the shipped product is useful.</p>
        <Link href="/#my-work">See selected work →</Link>
      </footer>
    </main>
  );
}
