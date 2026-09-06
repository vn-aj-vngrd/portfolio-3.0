import Link from "next/link";

import { WorkflowSteps } from "@/components/ai/WorkflowSteps";
import {
  agentGuardrails, aiToolNames, aiWorkflow, executionContexts,
  modelPreferences, skillGroups, supportingContexts, workflowEvidence,
} from "@/content/ai-workflow";
import { projectCatalog } from "@/content/projects";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "AI Engineering Workflow",
  description: "How Van AJ Vanguardia uses coding agents: product questions, focused specifications, vertical slices, implementation, and independent code review.",
  path: aiWorkflow.path,
});

export default function AiWorkflowPage() {
  return (
    <main id="main-content" className="ai-page">
      <section className="ai-hero" aria-labelledby="ai-title">
        <Link className="page-back-link" href="/">← Back to portfolio</Link>
        <p className="ai-kicker">AI-assisted engineering</p>
        <h1 id="ai-title">{aiWorkflow.title}</h1>
        <p className="ai-introduction">{aiWorkflow.introduction}</p>
        <nav className="ai-links" aria-label="Workflow sections">
          <a href="#workflow">The workflow ↓</a>
          <a href="#evidence">Public evidence ↓</a>
        </nav>
      </section>

      <section className="ai-section" id="workflow" aria-labelledby="workflow-title">
        <header className="ai-section-heading">
          <h2 id="workflow-title">Decisions before implementation.</h2>
          <p>{aiWorkflow.attribution.text} <a href={aiWorkflow.attribution.href}>Explore the source skills ↗</a></p>
        </header>
        <WorkflowSteps />
        <div className="ai-notes"><p>{aiWorkflow.flexibility}</p><p>{aiWorkflow.releaseResponsibility}</p></div>
      </section>

      <section className="ai-section" aria-labelledby="setup-title">
        <header className="ai-section-heading">
          <h2 id="setup-title">A lightweight daily setup.</h2>
          <p>{aiWorkflow.workspace}</p>
        </header>
        <div className="ai-ledger">
          {executionContexts.map((context) => (
            <article key={context.title}>
              <h3>{context.title}</h3>
              <div><p>{context.description}</p><p className="ai-tool-list">{aiToolNames(context.tools).join(" · ")}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="ai-section" id="evidence" aria-labelledby="evidence-title">
        <header className="ai-section-heading">
          <h2 id="evidence-title">Inspect the work, not just the tools.</h2>
          <p>Public projects show the engineering practices and product decisions I value. These artifacts are not a claim that every change followed the same agent workflow.</p>
        </header>
        <div className="ai-ledger">
          {workflowEvidence.map((evidence) => {
            const project = projectCatalog.find(evidence.slug);
            if (!project) throw new Error(`Missing workflow evidence: ${evidence.slug}`);
            return (
              <article key={evidence.slug}>
                <div><p className="ai-kicker">{project.name}</p><h3>{evidence.title}</h3></div>
                <div><p>{evidence.description}</p><div className="ai-links"><Link href={`/work/${project.slug}`}>Read the case study →</Link><a href={evidence.artifact.href}>{evidence.artifact.label} ↗</a></div></div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="ai-section" aria-labelledby="skills-title">
        <header className="ai-section-heading">
          <h2 id="skills-title">Reusable skills. Human judgment.</h2>
          <p>I adapt shared skills and custom instructions across agents. They make recurring tasks consistent without replacing product questions or learning through the work.</p>
        </header>
        <div className="agent-skills">
          {skillGroups.map((group) => (
            <details key={group.title}>
              <summary><strong>{group.title}</strong><span>{group.description}</span></summary>
              <ul>{group.skills.map((skill) => <li key={skill.name}><code>{skill.name}</code><p>{skill.description}</p></li>)}</ul>
            </details>
          ))}
        </div>
        <div className="ai-guardrails">
          <h3>What I remain accountable for</h3>
          <ul>{agentGuardrails.map((guardrail) => <li key={guardrail}>{guardrail}</li>)}</ul>
        </div>
      </section>

      <section className="ai-section" aria-labelledby="tools-title">
        <header className="ai-section-heading">
          <h2 id="tools-title">Models and supporting tools.</h2>
          <p>The model, agent harness, and workspace serve different purposes. I choose each for the context rather than treating one setup as universal.</p>
        </header>
        <div className="ai-ledger">
          {Object.values(modelPreferences).map((model) => <article key={model.name}><div><p className="ai-kicker">{model.context}</p><h3>{model.name}</h3></div><div><p>{model.use}</p><a className="ai-source-link" href={model.source}>Model information ↗</a></div></article>)}
          {supportingContexts.map((context) => <article key={context.title}><h3>{context.title}</h3><div><p>{context.description}</p><p className="ai-tool-list">{aiToolNames(context.tools).join(" · ")}</p></div></article>)}
        </div>
      </section>
      <footer className="ai-footer"><p>Tools support the work. The products show the result.</p><Link href="/#my-work">Explore my products →</Link></footer>
    </main>
  );
}
