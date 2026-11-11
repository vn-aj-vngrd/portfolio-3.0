import { CopyEmail } from "@/components/ui/CopyEmail";
import { profile } from "@/content/profile";

export function Contact() {
  return (
    <section
      className="section contact-section"
      id="contact"
      aria-labelledby="contact-title"
      data-reveal
    >
      <div className="section-index">
        <span>06</span>
        <span>Contact</span>
      </div>
      <h2 id="contact-title">Interested in working together?</h2>
      <p>
        I am open to AI product engineering and software engineering roles
        involving AI features, agents, web, mobile, or backend applications.
        Email is the best way to reach me.
      </p>
      <div className="contact-email">
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <CopyEmail email={profile.email} />
      </div>
      <nav aria-label="Contact links">
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn ↗
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
        <a href="/resume">Resume →</a>
      </nav>
    </section>
  );
}
