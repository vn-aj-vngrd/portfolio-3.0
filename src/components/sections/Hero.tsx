import Image from "next/image";
import Link from "next/link";

import { HeroIntro } from "@/components/sections/HeroIntro";
import { TourEntry } from "@/components/tour/TourEntry";
import { aiWorkflow } from "@/content/ai-workflow";
import { profile } from "@/content/profile";

const signals = [
  { value: "3+ years", label: "Product engineering" },
  { value: "Web and mobile", label: "Interfaces people use" },
  { value: "Backend and cloud", label: "APIs, data, delivery" },
  { value: "AI features", label: "Agents and Claude Code" },
] as const;

export function Hero() {
  return (
    <section
      className="hero"
      aria-labelledby="hero-title"
      data-tour-stop="hero"
      data-reveal="list"
    >
      <div className="hero-portrait" aria-hidden="true">
        <Image
          src="/images/profile.jpg"
          alt=""
          width={1000}
          height={1000}
          priority
          sizes="(max-width: 700px) 72vw, 360px"
        />
      </div>

      <div className="hero-copy">
        <p className="hero-kicker">Hello, I’m</p>
        <h1 id="hero-title">{profile.name}</h1>
        <p className="hero-role">{profile.title}</p>
        <HeroIntro />
        <nav className="hero-links" aria-label="Profile links">
          <TourEntry variant="hero" />
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <Link href="/resume">Résumé ↗</Link>
          <Link href={aiWorkflow.path}>{aiWorkflow.navigationLabel} →</Link>
        </nav>
      </div>

      <dl className="signal-strip" data-tour-stop="hero-signals">
        {signals.map((signal) => (
          <div key={signal.value}>
            <dt>{signal.value}</dt>
            <dd>{signal.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
