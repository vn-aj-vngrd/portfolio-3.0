import Link from "next/link";

import {
  agentGuardrails,
  agentSurfaces,
  favoriteModels,
  skillGroups,
  workflowStages,
} from "@/content/ai-workflow";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "AI Engineering Workflow",
  description:
    "The models, coding agents, reusable skills, review steps, and validation practices Van AJ Vanguardia uses during software development.",
  path: "/ai",
});

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
            <p className="ai-kicker">AI engineering workflow</p>
            <h1 id="ai-title">How I use coding agents in day-to-day development.</h1>
          </div>
          <div className="ai-hero-copy">
            <p>
              I use Claude Code, Codex CLI, Pi, Cursor, and supporting orchestration
              tools for repository research, implementation, debugging, and review.
            </p>
            <p>
              I remain responsible for the requirement, architecture, final diff,
              tests, browser behavior, and deployed result. Agents shorten parts of
              the work; they do not approve their own output.
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
            <h2 id="models-title">The models I use most.</h2>
            <p>I choose between them based on the task, repository context, and quality of the result.</p>
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
            <h2 id="workflow-title">A five-step path from request to production.</h2>
            <p>Each stage produces something concrete that I can inspect before the work continues.</p>
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
            <h2 id="surfaces-title">Where the work happens.</h2>
            <p>Terminal agents handle repository work, desktop tools support research, and editors keep direct code inspection close.</p>
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
            <h2 id="skills-title">Reusable instructions for recurring engineering tasks.</h2>
            <p>
              Each skill defines when it should run, the steps it follows, and the
              evidence required before the task is complete.
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
          <h2 id="guardrails-title">What I verify myself.</h2>
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
        <p>The selected projects show how this workflow is applied in public repositories.</p>
        <Link href="/#my-work">See selected work →</Link>
      </footer>
    </main>
  );
}
