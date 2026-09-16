import Image from "next/image";
import Link from "next/link";

import { aiWorkflow } from "@/content/ai-workflow";
import { profile } from "@/content/profile";

import styles from "./Hero.module.css";

const signals = [
  { value: "3+ years", label: "Full-stack work" },
  { value: "TypeScript", label: "Web and mobile" },
  { value: "ASP.NET Core", label: "APIs and data" },
  { value: "Coding agents", label: "Research, build, review" },
] as const;

export function Hero() {
  return (
    <section className={`hero ${styles.hero}`} aria-labelledby="hero-title">
      <div className={`hero-portrait ${styles.portrait}`} aria-hidden="true">
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
        <p className="hero-statement">{profile.statement}</p>
        <p className="hero-intro">{profile.introduction}</p>
        <nav
          className={`hero-links ${styles.links}`}
          aria-label="Profile links"
        >
          <Link href="/#my-work" className={styles.workLink}>
            Explore my work →
          </Link>
          <Link href="/resume">Résumé ↗</Link>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <Link href={aiWorkflow.path}>{aiWorkflow.navigationLabel} →</Link>
        </nav>
      </div>

      <dl className="signal-strip">
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
