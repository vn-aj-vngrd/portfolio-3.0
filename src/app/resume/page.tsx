import type { Metadata } from "next";
import Link from "next/link";

import { PrintButton } from "@/components/ui/PrintButton";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Résumé for Van AJ Vanguardia, product-minded full-stack software engineer.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <main id="main-content" className="resume-page">
      <div className="resume-controls print-hidden">
        <Link className="text-link" href="/">
          ← Portfolio
        </Link>
        <PrintButton />
      </div>
      <article className="resume-sheet">
        <header>
          <div>
            <h1>{profile.name}</h1>
            <p>{profile.title}</p>
          </div>
          <address>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <br />
            {profile.location}
            <br />
            <a href={profile.github}>GitHub</a> ·{" "}
            <a href={profile.linkedin}>LinkedIn</a>
          </address>
        </header>

        <section>
          <h2>Profile</h2>
          <p>
            {profile.statement} {profile.introduction}
          </p>
        </section>

        <section>
          <h2>Experience</h2>
          {experience.map((item) => (
            <div className="resume-entry" key={item.company}>
              <div>
                <h3>{item.role}</h3>
                <p>{item.company}</p>
              </div>
              <time>{item.period}</time>
              <p>{item.summary}</p>
              <ul>
                {item.highlights.slice(0, 3).map((highlight) => (
                  <li key={highlight.action}>
                    <strong>{highlight.action}</strong> {highlight.detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2>Selected products</h2>
          {projects.map((project) => (
            <div className="resume-entry" key={project.slug}>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <p className="resume-stack">{project.stack.join(" · ")}</p>
            </div>
          ))}
        </section>

        <section className="resume-two-column">
          <div>
            <h2>Core stack</h2>
            <p>
              TypeScript, React, Next.js, React Native, Node.js, ASP.NET Core,
              PostgreSQL, MSSQL, Docker, Git, CI/CD
            </p>
          </div>
          <div>
            <h2>Education</h2>
            <p>{profile.education}</p>
          </div>
        </section>
      </article>
    </main>
  );
}
