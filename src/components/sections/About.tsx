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
        <h2 id="about-title">Engineering for the product after launch.</h2>
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
          <li>User value before unnecessary complexity.</li>
          <li>Architecture should protect the product.</li>
          <li>AI accelerates judgment; it does not replace it.</li>
          <li>Quality is part of delivery, not a final pass.</li>
        </ol>
      </aside>
    </section>
  );
}
