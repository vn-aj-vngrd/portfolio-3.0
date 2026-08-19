import type { Metadata } from "next";
import Link from "next/link";

import { CopyControl } from "@/components/design/CopyControl";
import {
  colorTokens,
  componentInventory,
  componentSnippet,
  cssTokenSnippet,
  designMarkdown,
  spacingTokens,
} from "@/content/design-system";

export const metadata: Metadata = {
  title: "Design System",
  description:
    "The documented visual language, tokens, components, accessibility rules, and responsive structure behind Portfolio 3.0.",
  alternates: { canonical: "/design" },
};

const principles = [
  "Products and evidence lead; technology supports the story.",
  "Typography and spacing establish hierarchy before containers do.",
  "Signal Blue communicates state instead of decorating empty space.",
  "Flat structure, real screenshots, and hairlines create depth honestly.",
  "Every motion keeps a complete reduced-motion equivalent.",
  "Anything that does not improve comprehension is removed.",
] as const;

export default function DesignPage() {
  return (
    <main id="main-content" className="design-page">
      <section className="design-hero" aria-labelledby="design-title" data-reveal>
        <Link className="page-back-link" href="/">
          <span aria-hidden="true">←</span> Back to portfolio
        </Link>
        <div className="design-hero-grid">
          <div>
            <p className="design-kicker">Portfolio 3.0 · interface specification</p>
            <h1 id="design-title">The system behind the surface.</h1>
          </div>
          <div className="design-hero-copy">
            <p>
              A living reference for the typography, color, layout, components,
              and rules that keep this portfolio coherent. Inspect it, copy it,
              or use the raw DESIGN.md with an engineering agent.
            </p>
            <div className="design-actions">
              <CopyControl value={designMarkdown} label="Copy DESIGN.md" className="design-primary-action" />
              <a href="/design.md" target="_blank" rel="noreferrer">Open raw file ↗</a>
            </div>
          </div>
        </div>
        <div className="design-blueprint" aria-label="Portfolio interface anatomy">
          <div className="design-blueprint-rail">
            <span>15.5rem</span>
            <strong>Studio rail</strong>
            <i />
            <i />
            <i />
          </div>
          <div className="design-blueprint-canvas">
            <span>74rem editorial canvas</span>
            <strong>Product release narrative</strong>
            <div>
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </section>

      <nav className="design-index" aria-label="Design system sections">
        <a href="#foundations"><span>01</span> Foundations</a>
        <a href="#type"><span>02</span> Typography</a>
        <a href="#components"><span>03</span> Components</a>
        <a href="#structure"><span>04</span> Structure</a>
        <a href="#rules"><span>05</span> Rules</a>
      </nav>

      <section className="design-section" id="foundations" aria-labelledby="foundations-title" data-reveal>
        <header className="design-section-heading">
          <p>01 · Foundations</p>
          <div>
            <h2 id="foundations-title">Neutral by default. Blue only when it means something.</h2>
            <p>
              The palette stays out of the product&apos;s way. Each semantic token has a
              tuned dark counterpart rather than a mechanically inverted value.
            </p>
          </div>
        </header>

        <div className="color-ledger">
          <div className="color-ledger-header" aria-hidden="true">
            <span>Token</span><span>Light / dark</span><span>Purpose</span><span>Value</span>
          </div>
          {colorTokens.map((token) => (
            <article key={token.variable}>
              <div>
                <strong>{token.name}</strong>
                <code>{token.variable}</code>
              </div>
              <div className="color-pair" aria-label={`${token.name}: ${token.light} in light mode and ${token.dark} in dark mode`}>
                <i style={{ backgroundColor: token.light }} />
                <i style={{ backgroundColor: token.dark }} />
              </div>
              <p>{token.use}</p>
              <CopyControl value={`var(${token.variable})`} label={token.light} />
            </article>
          ))}
        </div>

        <div className="spacing-specimen">
          <header>
            <h3>Spacing rhythm</h3>
            <p>Small steps tighten interface details; fluid section space carries the editorial rhythm.</p>
          </header>
          <ol>
            {spacingTokens.map((token, index) => (
              <li key={token.name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{token.name}</strong>
                <i style={{ width: token.name === "Section" ? "100%" : token.value }} />
                <code>{token.value}</code>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="design-section" id="type" aria-labelledby="type-title" data-reveal>
        <header className="design-section-heading">
          <p>02 · Typography</p>
          <div>
            <h2 id="type-title">Two voices, each with a specific job.</h2>
            <p>
              Geist handles editorial clarity. Geist Mono carries identity, technical
              metadata, and measured data. Decorative code and terminal styling are excluded.
            </p>
          </div>
        </header>

        <div className="type-specimens">
          <article className="type-specimen-display">
            <header><span>Display / Geist</span><code>clamp(3.4rem, 7vw, 6.3rem)</code></header>
            <p>Ideas become reliable products.</p>
          </article>
          <article className="type-specimen-mono">
            <header><span>Identity / Geist Mono</span><code>520 · −0.065em</code></header>
            <p>Van AJ Vanguardia</p>
          </article>
          <article className="type-specimen-body">
            <header><span>Body / Geist</span><code>1rem / 1.65 · 42rem max</code></header>
            <p>
              Build the smallest coherent system that solves the user&apos;s problem,
              then validate the details that make it dependable in production.
            </p>
          </article>
          <article className="type-specimen-label">
            <header><span>Metadata / Geist Mono</span><code>.62–.72rem</code></header>
            <p>TYPESCRIPT · ASP.NET CORE · CEB 10.3157° N</p>
          </article>
        </div>
      </section>

      <section className="design-section" id="components" aria-labelledby="components-title" data-reveal>
        <header className="design-section-heading">
          <p>03 · Components</p>
          <div>
            <h2 id="components-title">Reusable behavior without a component showroom aesthetic.</h2>
            <p>
              Components exist to preserve meaning, state, and accessibility. Most
              editorial content remains unboxed and gains structure from alignment.
            </p>
          </div>
        </header>

        <div className="component-stage">
          <div className="component-live">
            <p>Live controls</p>
            <div>
              <a className="specimen-primary" href="#structure">See implementation <span>↓</span></a>
              <a className="specimen-secondary" href="/design.md" target="_blank" rel="noreferrer">Open DESIGN.md</a>
              <a className="specimen-link" href="#rules">Signal link →</a>
            </div>
          </div>
          <div className="component-state">
            <p>State language</p>
            <div>
              <span><i /> Available for work</span>
              <code>03 · EXPERIENCE</code>
              <kbd>⌘ 3</kbd>
            </div>
          </div>
        </div>

        <ol className="component-inventory">
          {componentInventory.map((component, index) => (
            <li key={component.name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{component.name}</strong>
              <p>{component.role}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="design-section" id="structure" aria-labelledby="structure-title" data-reveal>
        <header className="design-section-heading">
          <p>04 · Structure</p>
          <div>
            <h2 id="structure-title">A page is a narrative, not a pile of cards.</h2>
            <p>
              Every route starts with orientation, develops one subject through evidence,
              and ends with a useful next step. These fragments are ready to copy.
            </p>
          </div>
        </header>

        <div className="code-specimens">
          <article>
            <header><div><span>CSS</span><strong>Semantic tokens</strong></div><CopyControl value={cssTokenSnippet} label="Copy tokens" /></header>
            <pre data-lenis-prevent><code>{cssTokenSnippet}</code></pre>
          </article>
          <article>
            <header><div><span>TSX</span><strong>Editorial section</strong></div><CopyControl value={componentSnippet} label="Copy component" /></header>
            <pre data-lenis-prevent><code>{componentSnippet}</code></pre>
          </article>
        </div>

        <div className="responsive-ledger">
          <article><span>Desktop</span><strong>&gt; 980px</strong><p>Fixed studio rail, full editorial canvas, asymmetric product storytelling.</p></article>
          <article><span>Tablet</span><strong>701–980px</strong><p>Sticky top header, reduced columns, content order preserved.</p></article>
          <article><span>Mobile</span><strong>≤ 700px</strong><p>Single-column narrative, 44px targets, intentional data scrolling.</p></article>
        </div>
      </section>

      <section className="design-rules" id="rules" aria-labelledby="rules-title" data-reveal>
        <div>
          <p>05 · Operating rules</p>
          <h2 id="rules-title">Restraint is part of the implementation.</h2>
        </div>
        <ol>
          {principles.map((principle, index) => (
            <li key={principle}><span>{String(index + 1).padStart(2, "0")}</span>{principle}</li>
          ))}
        </ol>
      </section>

      <footer className="design-footer" data-reveal>
        <div>
          <p>Portable specification</p>
          <h2>Use the same decisions in the next iteration.</h2>
        </div>
        <div>
          <CopyControl value={designMarkdown} label="Copy full DESIGN.md" className="design-primary-action" />
          <a href="/design.md" target="_blank" rel="noreferrer">Open plain text ↗</a>
        </div>
      </footer>
    </main>
  );
}
