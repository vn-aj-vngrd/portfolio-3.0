import { RichText } from "@/components/ui/Chip";
import { profile } from "@/content/profile";

export function HeroIntro() {
  return (
    <div className="hero-intro-rich">
      {profile.intro.map((parts, index) => (
        <p key={index}>
          <RichText parts={parts} />
        </p>
      ))}
    </div>
  );
}
