import Link from "next/link";

import { hiring } from "@/content/hiring";
import { profile } from "@/content/profile";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  JsonLd,
  PERSON_ID,
  WEBSITE_ID,
} from "@/lib/structured-data";

// The years of experience are computed from today's date, so re-render daily.
export const revalidate = 86400;

export const metadata = createPageMetadata({
  title: "Hiring Brief: AI Engineer and Software Engineer",
  description:
    "Hiring brief for Van AJ Vanguardia, an AI engineer and full-stack software engineer in Cebu, Philippines: target roles, experience, and each claim linked to the case study, repository, or live product that proves it.",
  path: hiring.path,
});
metadata.alternates = {
  canonical: hiring.path,
  types: { "text/markdown": "/hire.md" },
};

function ProofLink({ label, href }: { label: string; href: string }) {
  return href.startsWith("/") ? (
    <Link href={href}>{label} →</Link>
  ) : (
    <a href={href}>{label} ↗</a>
  );
}

export default function HirePage() {
  const url = absoluteUrl(hiring.path);
  return (
    <main id="main-content" className="ai-page hire-page">
      <JsonLd
        graph={[
          {
            "@type": "ProfilePage",
            "@id": `${url}#profile-page`,
            url,
            name: `${profile.name} hiring brief`,
            description: hiring.introduction,
            inLanguage: "en-PH",
            isPartOf: { "@id": WEBSITE_ID },
            mainEntity: { "@id": PERSON_ID },
          },
          {
            "@type": "FAQPage",
            "@id": `${url}#faq`,
            about: { "@id": PERSON_ID },
            mainEntity: hiring.faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          },
          breadcrumbSchema(hiring.navigationLabel, hiring.path),
        ]}
      />
      <section
        className="ai-hero"
        aria-labelledby="hire-title"
        data-reveal="list"
      >
        <Link className="page-back-link" href="/">
          <span aria-hidden="true">←</span> Back to portfolio
        </Link>
        <div className="ai-hero-grid">
          <div>
            <p className="ai-kicker">{hiring.kicker}</p>
            <h1 id="hire-title">{hiring.title}</h1>
          </div>
          <div>
            <p className="ai-introduction">{hiring.introduction}</p>
            <nav className="ai-links" aria-label="Page sections">
              <a href="#facts">Facts ↓</a>
              <a href="#proof">Proof ↓</a>
              <a href="#questions">Questions ↓</a>
              <Link href="/resume">Résumé →</Link>
            </nav>
          </div>
        </div>
      </section>

      <section className="ai-section" id="facts" aria-labelledby="facts-title">
        <header className="ai-section-heading" data-reveal>
          <h2 id="facts-title">The facts a first screen needs.</h2>
        </header>
        <dl className="factory-roles hire-facts" data-reveal="list">
          {hiring.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>
                {fact.label === "Contact" ? (
                  <a href={`mailto:${fact.value}`}>{fact.value}</a>
                ) : (
                  fact.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="ai-section" id="proof" aria-labelledby="proof-title">
        <header className="ai-section-heading" data-reveal>
          <h2 id="proof-title">Each claim, and where to check it.</h2>
          <p>
            Nothing here asks to be taken on trust. Follow a link to the case
            study, the public source, or the running product.
          </p>
        </header>
        <div className="ai-ledger" data-reveal="list">
          {hiring.claims.map((item) => (
            <article key={item.claim}>
              <div>
                <h3>{item.claim}</h3>
              </div>
              <div>
                <p>{item.detail}</p>
                <div className="ai-links">
                  {item.proof.map((proof) => (
                    <ProofLink key={proof.href + proof.label} {...proof} />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="ai-section"
        id="questions"
        aria-labelledby="questions-title"
      >
        <header className="ai-section-heading" data-reveal>
          <h2 id="questions-title">Questions a screen usually asks.</h2>
        </header>
        <dl className="hire-faq" data-reveal="list">
          {hiring.faq.map((item) => (
            <div key={item.question}>
              <dt>{item.question}</dt>
              <dd>{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <footer className="ai-footer" data-reveal>
        <p>
          The same brief is available as plain text for AI agents:{" "}
          <a href="/hire.md">hire.md</a>, <a href="/llms.txt">llms.txt</a>, and{" "}
          <a href="/llms-full.txt">llms-full.txt</a>.
        </p>
        <a href={`mailto:${profile.email}`}>Email me →</a>
      </footer>
    </main>
  );
}
