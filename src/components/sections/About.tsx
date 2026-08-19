import { profile } from "@/content/profile";

export function About() {
  return (
    <section
      className="section about-section"
      id="about"
      aria-labelledby="about-title"
      data-reveal
    >
      <div className="about-copy">
        <div className="section-index"><span>05</span><span>About</span></div>
        <h2 id="about-title">I care about what happens after the first release.</h2>
        <p className="about-lead">{profile.philosophy}</p>
        <div className="about-details">
          <p>
            <strong>Based in</strong>
            <br />
            {profile.location}
          </p>
          <p>
            <strong>Education</strong>
            <br />
            {profile.education}
          </p>
          <p>
            <strong>Outside software</strong>
            <br />
            Music, basketball, travel, and time outdoors.
          </p>
        </div>
      </div>
      <aside className="about-note" aria-label="Working principles">
        <p>Working principles</p>
        <ol>
          <li>Understand the user’s task before choosing the implementation.</li>
          <li>Add architectural complexity only when it solves a real constraint.</li>
          <li>Review and test agent-generated work before it ships.</li>
          <li>Include accessibility, performance, and maintainability in the definition of done.</li>
        </ol>
      </aside>
    </section>
  );
}
