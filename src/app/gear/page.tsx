import type { Metadata } from "next";
import Link from "next/link";

import { GearIllustration } from "@/components/gear/GearIllustration";
import { gear, type GearItem } from "@/content/gear";

export const metadata: Metadata = {
  title: "Gear",
  description:
    "The hardware and desk setup Van AJ Vanguardia uses for full-stack, mobile, and AI-assisted product engineering.",
  alternates: { canonical: "/gear" },
};

const groups: { title: string; description: string; items: readonly GearItem[] }[] = [
  {
    title: "Displays",
    description: "A wide working canvas with a dedicated secondary context.",
    items: gear.slice(1, 3),
  },
  {
    title: "Input",
    description: "Daily controls chosen for long implementation and review sessions.",
    items: gear.slice(3, 5),
  },
  {
    title: "Everyday devices",
    description: "Communication, focus, and real-device product validation.",
    items: gear.slice(5, 7),
  },
  {
    title: "Desk and power",
    description: "A flexible workspace with fewer cables and less friction.",
    items: gear.slice(7),
  },
];

export default function GearPage() {
  const primary = gear[0];

  return (
    <main id="main-content" className="gear-page">
      <section className="gear-hero" aria-labelledby="gear-title" data-reveal>
        <Link className="page-back-link" href="/">
          <span aria-hidden="true">←</span> Back to portfolio
        </Link>
        <div className="gear-hero-grid">
          <div>
            <p className="gear-kicker">Development setup</p>
            <h1 id="gear-title">The tools around the work.</h1>
          </div>
          <p>
            A practical setup for full-stack development, mobile QA, local
            infrastructure, AI-assisted workflows, and focused product delivery.
          </p>
        </div>
      </section>

      <section className="gear-primary" aria-labelledby="primary-gear-title" data-reveal>
        <div className="gear-primary-visual">
          <GearIllustration kind={primary.kind} />
        </div>
        <article>
          <p>Primary machine</p>
          <h2 id="primary-gear-title">{primary.name}</h2>
          <strong>{primary.detail}</strong>
          {primary.color ? <span>{primary.color}</span> : null}
          <p>{primary.use}</p>
        </article>
      </section>

      <div className="gear-groups">
        {groups.map((group, groupIndex) => (
          <section className="gear-group" key={group.title} data-reveal>
            <header>
              <p>0{groupIndex + 1}</p>
              <div>
                <h2>{group.title}</h2>
                <p>{group.description}</p>
              </div>
            </header>
            <div className="gear-list">
              {group.items.map((item) => (
                <article className="gear-item" key={item.name}>
                  <div className="gear-item-visual">
                    <GearIllustration kind={item.kind} />
                  </div>
                  <div className="gear-item-copy">
                    {item.color ? <p>{item.color}</p> : null}
                    <h3>{item.name}</h3>
                    <strong>{item.detail}</strong>
                    <span>{item.use}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="gear-footer" data-reveal>
        <p>Tools matter when they remove friction—not when they become the work.</p>
        <Link href="/#my-work">See what I build →</Link>
      </footer>
    </main>
  );
}
