import Link from "next/link";

import { PrintButton } from "@/components/ui/PrintButton";
import { profile } from "@/content/profile";
import { resume, resumeProducts } from "@/content/resume";
import { createPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Résumé",
  description:
    "Résumé for Van AJ Vanguardia, a full-stack software developer building ASP.NET Core backends in C# and React frontends with TypeScript.",
  path: "/resume",
});

function displayUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export default function ResumePage() {
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
          <h1>{profile.name}</h1>
          <p>{resume.title}</p>
          <address>
            <span>{profile.location}</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={SITE_URL}>{displayUrl(SITE_URL)}</a>
            <a href={profile.github}>{displayUrl(profile.github)}</a>
            <a href={profile.linkedin}>{displayUrl(profile.linkedin)}</a>
          </address>
        </header>

        <section>
          <h2>Summary</h2>
          <p>{resume.summary}</p>
        </section>

        <section>
          <h2>Technical Skills</h2>
          <dl className="resume-skills">
            {resume.skills.map((skill) => (
              <div key={skill.label}>
                <dt>{skill.label}</dt>
                <dd>{skill.detail}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2>Professional Experience</h2>
          {resume.professional.map((item) => (
            <div className="resume-entry" key={item.company}>
              <div>
                <h3>{item.role}</h3>
                <p>{item.company}</p>
              </div>
              <p className="resume-period">{item.period}</p>
              <ul>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="resume-products">
          <h2>Products</h2>
          {resumeProducts.map((project) => (
            <div className="resume-entry resume-product" key={project.slug}>
              <div>
                <h3>{project.name}</h3>
                <p className="resume-ownership">{project.role}</p>
              </div>
              <p>{project.description}</p>
              <p className="resume-stack">{project.stack.join(" · ")}</p>
              <p className="resume-product-links">
                {project.repository ? (
                  <a href={project.repository}>
                    Source: {displayUrl(project.repository)}
                  </a>
                ) : null}
                {project.liveUrl ? (
                  <a href={project.liveUrl}>
                    Live: {displayUrl(project.liveUrl)}
                  </a>
                ) : null}
              </p>
            </div>
          ))}
        </section>

        <section className="resume-workflow">
          <h2>AI-Assisted Development</h2>
          <p><strong>Tools:</strong> {resume.aiWorkflow.tools.join(" · ")}</p>
          <p>{resume.aiWorkflow.summary}</p>
          <p>
            <a href={`${SITE_URL}/ai`}>Workflow: {displayUrl(SITE_URL)}/ai</a>
          </p>
        </section>

        <section className="resume-internships">
          <h2>Internships</h2>
          {resume.internships.map((item) => (
            <div className="resume-entry resume-entry-compact" key={item.company}>
              <div>
                <h3>{item.role}</h3>
                <p>{item.company}</p>
              </div>
              <p className="resume-period">{item.period}</p>
              <p>{item.bullets[0]}</p>
            </div>
          ))}
        </section>

        <section className="resume-education">
          <h2>Education</h2>
          <p>{profile.education}</p>
          <div className="resume-entry resume-entry-compact">
            <h3>NextGig · University capstone</h3>
            <p className="resume-period">{resume.capstone.period}</p>
            <p>{resume.capstone.bullets[0]}</p>
          </div>
        </section>
      </article>
    </main>
  );
}
