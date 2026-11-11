import { type IntroIcon, profile } from "@/content/profile";

const paths: Record<IntroIcon, React.ReactNode> = {
  code: <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />,
  web: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  mobile: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2.5" />
      <path d="M11 18h2" />
    </>
  ),
  server: (
    <>
      <rect x="4" y="4" width="16" height="6.5" rx="2" />
      <rect x="4" y="13.5" width="16" height="6.5" rx="2" />
      <path d="M8 7.25h.01M8 16.75h.01" />
    </>
  ),
  sparkles: (
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.7 1.8L21.5 18.5l-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z" />
  ),
  agent: (
    <>
      <rect x="4" y="8" width="16" height="11" rx="3" />
      <path d="M12 4v4M9 13v1M15 13v1" />
      <circle cx="12" cy="3.5" r="0.8" />
    </>
  ),
  terminal: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="m7 10 3 2-3 2M13 15h4" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z" />
      <circle cx="12" cy="11" r="2" />
    </>
  ),
};

function Icon({ name }: { name: IntroIcon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

export function HeroIntro() {
  return (
    <div className="hero-intro-rich">
      {profile.intro.map((parts, index) => (
        <p key={index}>
          {parts.map((part, partIndex) =>
            typeof part === "string" ? (
              part
            ) : (
              <span className="intro-chip" key={partIndex}>
                <Icon name={part.icon} />
                {part.chip}
              </span>
            )
          )}
        </p>
      ))}
    </div>
  );
}
