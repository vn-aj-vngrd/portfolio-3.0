import Link from "next/link";

import { GearIllustration } from "@/components/gear/GearIllustration";
import { gear, type GearItem } from "@/content/gear";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Gear",
  description:
    "The hardware and desk setup Van AJ Vanguardia uses for full-stack, mobile, and AI-assisted product engineering.",
  path: "/gear",
});

const groups: { title: string; description: string; items: readonly GearItem[] }[] = [
  {
    title: "Displays",
    description: "The ultrawide holds the main editor and browser; the second display keeps documentation, terminals, and communication visible.",
    items: gear.slice(1, 3),
  },
  {
    title: "Input",
    description: "The keyboard and mouse I use for daily development, navigation, and review.",
    items: gear.slice(3, 5),
  },
  {
    title: "Everyday devices",
    description: "Audio, communication, and real-device checks for responsive web and mobile work.",
    items: gear.slice(5, 7),
  },
  {
    title: "Desk and power",
    description: "A sit-stand desk and shared charging point keep the workspace easy to reset between tasks.",
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
            <h1 id="gear-title">My development setup.</h1>
          </div>
          <p>
            I use this setup for full-stack development, mobile testing, local
            containers, coding-agent sessions, database work, and interface review.
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
        <p>This equipment supports the work; the selected projects show the result.</p>
        <Link href="/#my-work">See what I build →</Link>
      </footer>
    </main>
  );
}
