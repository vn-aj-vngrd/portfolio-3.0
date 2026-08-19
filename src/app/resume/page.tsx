import type { Metadata } from "next";
import Link from "next/link";

import { PrintButton } from "@/components/ui/PrintButton";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { getGitHubStats } from "@/lib/github-stats";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Résumé for Van AJ Vanguardia, a full-stack software developer working across TypeScript, React, Next.js, ASP.NET Core, Node.js, and databases.",
  alternates: { canonical: "/resume" },
};

export default async function ResumePage() {
  const github = await getGitHubStats();

  return (
    <main id="main-content" className="resume-page">
      <div className="resume-controls print-hidden">
        <Link className="page-back-link" href="/">
          <span aria-hidden="true">←</span> Back to portfolio
        </Link>
        <PrintButton />
      </div>
      <article className="resume-sheet" data-reveal>
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

        {github ? (
          <section>
            <h2>GitHub engineering activity · last 12 months</h2>
            <div className="resume-github">
              <p>
                <strong>{github.contributions.total.toLocaleString("en-US")}</strong>
                Contributions
              </p>
              <p>
                <strong>{github.contributions.private.toLocaleString("en-US")}</strong>
                Private contributions included
              </p>
              <p>
                <strong>{github.repositories.total}</strong>
                Owned repositories
              </p>
              <Link href="/github">Full GitHub activity →</Link>
            </div>
          </section>
        ) : null}

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
