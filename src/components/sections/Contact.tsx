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
      <div className="section-index"><span>06</span><span>Contact</span></div>
      <h2 id="contact-title">Let’s build something useful.</h2>
      <p>
        I’m open to product engineering opportunities and conversations about
        web, mobile, backend, and AI-powered software.
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
