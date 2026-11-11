import { Chip, ChipIconSvg } from "@/components/ui/Chip";
import { profile } from "@/content/profile";
import type { ChipIcon } from "@/types/content";

const principles: readonly { icon: ChipIcon; text: string }[] = [
  {
    icon: "user",
    text: "Understand the user’s task before choosing the implementation.",
  },
  {
    icon: "layers",
    text: "Add architectural complexity only when it solves a real constraint.",
  },
  {
    icon: "agent",
    text: "Review and test agent-generated work before it ships.",
  },
  {
    icon: "access",
    text: "Include accessibility, performance, and maintainability in the definition of done.",
  },
];

export function About() {
  const [degree, ...rest] = profile.education.split(", ");
  const school = rest.filter((part) => !/Campus/u.test(part)).join(", ");
  return (
    <section
      className="section about-section"
      id="about"
      data-tour-stop="about"
      aria-labelledby="about-title"
      data-reveal
    >
      <div className="about-copy">
        <div className="section-index">
          <span>05</span>
          <span>About</span>
        </div>
        <h2 id="about-title">
          I care about what happens after the first release.
        </h2>
        <p className="about-lead">{profile.philosophy}</p>
        <dl className="about-details">
          <div>
            <dt>Based in</dt>
            <dd>
              <Chip icon="pin">{profile.location}</Chip>
            </dd>
          </div>
          <div>
            <dt>Education</dt>
            <dd>
              <Chip icon="grad">{degree}</Chip>
              <span>{school}</span>
            </dd>
          </div>
          <div>
            <dt>Outside software</dt>
            <dd>
              <Chip icon="music">Music</Chip>
              <Chip icon="ball">Basketball</Chip>
              <Chip icon="plane">Travel</Chip>
              <Chip icon="sun">Outdoors</Chip>
            </dd>
          </div>
        </dl>
      </div>
      <aside className="about-note" aria-label="Working principles">
        <p>Working principles</p>
        <ol>
          {principles.map((principle) => (
            <li key={principle.text}>
              <span className="principle-icon">
                <ChipIconSvg icon={principle.icon} />
              </span>
              <p>{principle.text}</p>
            </li>
          ))}
        </ol>
      </aside>
    </section>
  );
}
