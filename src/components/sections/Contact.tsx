import { Chip } from "@/components/ui/Chip";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { profile } from "@/content/profile";

export function Contact() {
  return (
    <section
      className="section contact-section"
      id="contact"
      data-tour-stop="contact"
      aria-labelledby="contact-title"
      data-reveal
    >
      <div className="section-index">
        <span>06</span>
        <span>Contact</span>
      </div>
      <h2 id="contact-title">Interested in working together?</h2>
      <p>
        Open to <Chip icon="sparkles">AI product engineering</Chip> and{" "}
        <Chip icon="code">software engineering</Chip> roles across{" "}
        <Chip icon="web">web</Chip>, <Chip icon="mobile">mobile</Chip>, and{" "}
        <Chip icon="server">backend</Chip>. Email is the best way to reach me.
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
