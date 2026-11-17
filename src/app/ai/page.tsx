import Link from "next/link";

import { AiMotion } from "@/components/ai/AiMotion";
import { FactoryPipeline } from "@/components/ai/FactoryPipeline";
import { FactoryRun } from "@/components/ai/FactoryRun";
import {
  FactoryArtifacts,
  FactoryImprovement,
  FactoryReviewLoop,
  FactoryRoute,
  FactorySwimlane,
} from "@/components/ai/FactoryVisuals";
import { SetupMap } from "@/components/ai/SetupMap";
import { AgentStrip, ShippedAgentLoop } from "@/components/ai/ShippedVisuals";
import { ToolMark } from "@/components/ai/ToolMark";
import { WorkflowSteps } from "@/components/ai/WorkflowSteps";
import {
  agentGuardrails,
  aiWorkflow,
  setupItems,
  shippedAi,
  skillGroups,
  workflowEvidence,
} from "@/content/ai-workflow";
import {
  factoryGuardrails,
  factoryIntro,
  factoryPair,
  factoryRoles,
} from "@/content/factory";
import { projectCatalog } from "@/content/projects";
import { createPageMetadata, SITE_URL } from "@/lib/seo";
import {
  breadcrumbSchema,
  JsonLd,
  PERSON_ID,
  WEBSITE_ID,
} from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "AI Engineering and Software Factory",
  description:
    "The AI agents Van AJ Vanguardia has shipped in products, and how he builds with Claude Code: two software factories that turn tickets into reviewed pull requests.",
  path: aiWorkflow.path,
});
metadata.alternates = {
  canonical: aiWorkflow.path,
  types: { "text/markdown": "/ai.md" },
};

export default function AiWorkflowPage() {
  return (
    <main id="main-content" className="ai-page">
      <JsonLd
        graph={[
          {
            "@type": "TechArticle",
            "@id": `${SITE_URL}${aiWorkflow.path}#article`,
            url: `${SITE_URL}${aiWorkflow.path}`,
            headline: aiWorkflow.title,
            description: aiWorkflow.introduction,
            inLanguage: "en-PH",
            author: { "@id": PERSON_ID },
            isPartOf: { "@id": WEBSITE_ID },
            about: [
              "AI-assisted software engineering",
              "Claude Code",
              "Coding agents",
              "Multi-agent orchestration",
            ],
          },
          breadcrumbSchema("AI workflow", aiWorkflow.path),
        ]}
      />
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
              <a href="#shipped">Shipped AI ↓</a>
              <a href="#setup">My setup ↓</a>
              <a href="#factory">The factory ↓</a>
              <a href="#loop">The loop ↓</a>
              <a href="#evidence">Evidence ↓</a>
            </nav>
          </div>
        </div>
      </section>

      <section
        className="ai-section"
        id="shipped"
        aria-labelledby="shipped-title"
      >
        <header className="ai-section-heading" data-reveal>
          <p className="ai-kicker">AI in the products</p>
          <h2 id="shipped-title">Agents I’ve shipped. Approval built in.</h2>
          <p>
            Before the tools I build with, the AI I have built: agents inside
            real products. Each one reads through scoped tools, validates what
            the model returns, and waits for a person before it changes
            anything.
          </p>
        </header>
        <ShippedAgentLoop />
        <div className="ai-ledger ai-shipped" data-reveal="list">
          {shippedAi.map((item) => (
            <article key={item.name}>
              <div className="ai-shipped-head">
                <p className="ai-kicker">{item.name}</p>
                <h3>{item.title}</h3>
              </div>
              <div className="ai-shipped-desc">
                <p>{item.description}</p>
              </div>
              {"loop" in item ? <AgentStrip loop={item.loop} /> : null}
              <div className="ai-shipped-meta">
                <p className="ai-ledger-stack">{item.stack}</p>
                <div className="ai-links">
                  {"slug" in item ? (
                    <Link href={`/work/${item.slug}`}>
                      Read the case study →
                    </Link>
                  ) : (
                    <Link href="/#experience">See the experience →</Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="ai-section" id="setup" aria-labelledby="setup-title">
        <header className="ai-section-heading" data-reveal>
          <p className="ai-kicker">{aiWorkflow.setup.kicker}</p>
          <h2 id="setup-title">{aiWorkflow.setup.title}</h2>
          <p>{aiWorkflow.setup.lead}</p>
        </header>
        <SetupMap />
        <div className="ai-ledger ai-tools" data-reveal="list">
          {setupItems.map((item) => (
            <article key={item.title}>
              <div className="ai-tool-name">
                <ToolMark tool={item.tool} />
                <div>
                  <p className="ai-kicker">{item.kicker}</p>
                  <h3>{item.title}</h3>
                </div>
              </div>
              <div>
                <p>{item.body}</p>
                <a
                  className="ai-source-link"
                  href={item.link.href}
                  aria-label={
                    item.link.label.includes(item.title)
                      ? undefined
                      : `${item.link.label} for ${item.title}`
                  }
                >
                  {item.link.label} ↗
                </a>
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
        <FactorySwimlane />
        <FactoryReviewLoop />
        <FactoryArtifacts />
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
            <ul className="ai-rules ai-rules-stacked" data-reveal="list">
              {factoryGuardrails.map((item) => {
                const cut = item.indexOf(". ") + 1;
                return (
                  <li key={item}>
                    <span className="ai-rule-mark" aria-hidden="true" />
                    <strong>{item.slice(0, cut)}</strong>
                    <span>{item.slice(cut + 1)}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="factory-pair" id="factory-pair">
          <h3>{factoryPair.title}</h3>
          <p>{factoryPair.lead}</p>
          <FactoryRoute />
          <table>
            <thead>
              <tr>
                <td />
                <th scope="col">
                  {factoryPair.columns.personal.name}
                  <span>{factoryPair.columns.personal.scope}</span>
                </th>
                <th scope="col">
                  {factoryPair.columns.work.name}
                  <span>{factoryPair.columns.work.scope}</span>
                </th>
              </tr>
            </thead>
            <tbody data-reveal="list">
              {factoryPair.rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  <td data-label={factoryPair.columns.personal.name}>
                    {row.personal}
                  </td>
                  <td data-label={factoryPair.columns.work.name}>{row.work}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="ai-section-note">{factoryPair.note}</p>
        </div>
        <div className="factory-improve">
          <h3 id="factory-improve-title">How it improves</h3>
          <FactoryImprovement />
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
          <ol className="ai-rules" data-reveal="list">
            {agentGuardrails.map((item, index) => (
              <li key={item.title}>
                <span className="ai-rule-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <footer className="ai-footer" data-reveal>
        <p>Tools support the work. The products show the result.</p>
        <Link href="/#my-work">Explore my products →</Link>
      </footer>
    </main>
  );
}
