import Link from "next/link";

import { AiMotion } from "@/components/ai/AiMotion";
import { FactoryPipeline } from "@/components/ai/FactoryPipeline";
import { FactoryRun } from "@/components/ai/FactoryRun";
import { SetupMap } from "@/components/ai/SetupMap";
import { WorkflowSteps } from "@/components/ai/WorkflowSteps";
import {
  agentGuardrails,
  aiWorkflow,
  setupItems,
  skillGroups,
  workflowEvidence,
} from "@/content/ai-workflow";
import {
  factoryGuardrails,
  factoryImprovement,
  factoryIntro,
  factoryRoles,
} from "@/content/factory";
import { projectCatalog } from "@/content/projects";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "AI Engineering Workflow",
  description:
    "How Van AJ Vanguardia builds with Claude Code: Opus plans, Sonnet builds, and his software factory turns GitHub issues into reviewed draft pull requests.",
  path: aiWorkflow.path,
});

export default function AiWorkflowPage() {
  return (
    <main id="main-content" className="ai-page">
      <AiMotion />
      <section
        className="ai-hero"
        aria-labelledby="ai-title"
        data-reveal="list"
      >
        <Link className="page-back-link" href="/">
          <span aria-hidden="true">←</span> Back to portfolio
        </Link>
        <div className="ai-hero-grid">
          <div>
            <p className="ai-kicker">{aiWorkflow.kicker}</p>
            <h1 id="ai-title">{aiWorkflow.title}</h1>
          </div>
          <div>
            <p className="ai-introduction">{aiWorkflow.introduction}</p>
            <nav className="ai-links" aria-label="Page sections">
              <a href="#setup">My setup ↓</a>
              <a href="#factory">The factory ↓</a>
              <a href="#loop">The loop ↓</a>
              <a href="#evidence">Evidence ↓</a>
            </nav>
          </div>
        </div>
      </section>

      <section className="ai-section" id="setup" aria-labelledby="setup-title">
        <header className="ai-section-heading" data-reveal>
          <p className="ai-kicker">{aiWorkflow.setup.kicker}</p>
          <h2 id="setup-title">{aiWorkflow.setup.title}</h2>
          <p>{aiWorkflow.setup.lead}</p>
        </header>
        <SetupMap />
        <div className="ai-ledger" data-reveal="list">
          {setupItems.map((item) => (
            <article key={item.title}>
              <div>
                <p className="ai-kicker">{item.kicker}</p>
                <h3>{item.title}</h3>
              </div>
              <div>
                <p>{item.body}</p>
                {"link" in item ? (
                  <a className="ai-source-link" href={item.link.href}>
                    {item.link.label} ↗
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="ai-section"
        id="factory"
        aria-labelledby="factory-title"
      >
        <header className="ai-section-heading" data-reveal>
          <p className="ai-kicker">{factoryIntro.kicker}</p>
          <h2 id="factory-title">{factoryIntro.title}</h2>
          {factoryIntro.lead.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            {factoryIntro.aqdLine.before}
            <Link href={factoryIntro.aqdLine.href}>
              {factoryIntro.aqdLine.linkText}
            </Link>
            {factoryIntro.aqdLine.after}
          </p>
        </header>
        <FactoryRun>
          <FactoryPipeline />
        </FactoryRun>
        <div className="factory-notes">
          <div>
            <h3>Who does what</h3>
            <dl className="factory-roles" data-reveal="list">
              {factoryRoles.map((role) => (
                <div key={role.who}>
                  <dt>{role.who}</dt>
                  <dd>{role.does}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3>What the factory can’t do</h3>
            <ul data-reveal="list">
              {factoryGuardrails.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="factory-improve">
          <h3>How it improves</h3>
          <p>{factoryImprovement}</p>
        </div>
      </section>

      <section className="ai-section" id="loop" aria-labelledby="loop-title">
        <header className="ai-section-heading" data-reveal>
          <p className="ai-kicker">The loop</p>
          <h2 id="loop-title">Decisions before implementation.</h2>
          <p>
            {aiWorkflow.attribution.text} {aiWorkflow.loopNote}{" "}
            <a href={aiWorkflow.attribution.href}>
              Explore the source skills ↗
            </a>
          </p>
        </header>
        <WorkflowSteps />
        <p className="workflow-feedback">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m7 5-4 4 4 4M3 9h12a5 5 0 0 1 0 10h-3" />
          </svg>
          {aiWorkflow.feedbackLoop}
        </p>
        <p className="ai-section-note">{aiWorkflow.flexibility}</p>
      </section>

      <section
        className="ai-section"
        id="evidence"
        aria-labelledby="evidence-title"
      >
        <header className="ai-section-heading" data-reveal>
          <h2 id="evidence-title">Inspect the work, not just the tools.</h2>
          <p>
            Public projects show the engineering practices and product decisions
            I value. These artifacts are not a claim that every change followed
            the same agent workflow.
          </p>
        </header>
        <div className="ai-ledger" data-reveal="list">
          {workflowEvidence.map((evidence) => {
            const project = projectCatalog.find(evidence.slug);
            if (!project)
              throw new Error(`Missing workflow evidence: ${evidence.slug}`);
            return (
              <article key={evidence.slug}>
                <div>
                  <p className="ai-kicker">{project.name}</p>
                  <h3>{evidence.title}</h3>
                </div>
                <div>
                  <p>{evidence.description}</p>
                  <div className="ai-links">
                    <Link href={`/work/${project.slug}`}>
                      Read the case study →
                    </Link>
                    <a href={evidence.artifact.href}>
                      {evidence.artifact.label} ↗
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="ai-section" aria-labelledby="skills-title">
        <header className="ai-section-heading" data-reveal>
          <h2 id="skills-title">Reusable skills. Human judgment.</h2>
          <p>
            I adapt shared skills and write my own. They make recurring work
            consistent without replacing product questions or learning through
            the work.
          </p>
        </header>
        <div className="agent-skills" data-reveal="list">
          {skillGroups.map((group) => (
            <details key={group.title}>
              <summary>
                <strong>{group.title}</strong>
                <span>{group.description}</span>
              </summary>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill.name}>
                    <code>{skill.name}</code>
                    <p>{skill.description}</p>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
        <div className="ai-guardrails">
          <h3>What I remain accountable for</h3>
          <ul data-reveal="list">
            {agentGuardrails.map((guardrail) => (
              <li key={guardrail}>{guardrail}</li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="ai-footer" data-reveal>
        <p>Tools support the work. The products show the result.</p>
        <Link href="/#my-work">Explore my products →</Link>
      </footer>
    </main>
  );
}
