import Link from "next/link";

import type { ChipIcon, RichPart } from "@/types/content";

const paths: Record<ChipIcon, React.ReactNode> = {
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
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z" />
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
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M16 5.2a3.2 3.2 0 0 1 0 5.6M18 14.8c1.8.7 3 2.4 3 5.2" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 13h18" />
    </>
  ),
  plane: <path d="M21 3 10.5 13.5M21 3l-6.5 18-4-7.5L3 9.5z" />,
  news: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2.5" />
      <path d="M8 9h8M8 13h8M8 17h4" />
    </>
  ),
  home: (
    <path d="M4 11 12 4l8 7v8.5a.5.5 0 0 1-.5.5H15v-6H9v6H4.5a.5.5 0 0 1-.5-.5z" />
  ),
  shirt: (
    <path d="M8 4 3.5 7l2 3.5L8 9.5V20h8V9.5l2.5 1 2-3.5L16 4a4 4 0 0 1-8 0z" />
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.8" />
      <path d="M5 6v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V6M5 12v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-6" />
    </>
  ),
  cloud: (
    <path d="M7 18a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17 9.5 4.3 4.3 0 0 1 17.5 18z" />
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.5 12.3 2.3 2.3 4.7-5" />
    </>
  ),
  layers: (
    <path d="m12 4 8.5 4.5L12 13 3.5 8.5zM3.5 12.5 12 17l8.5-4.5M3.5 16.5 12 21l8.5-4.5" />
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="m9 13.5-1.5 6.5 4.5-2.5 4.5 2.5-1.5-6.5" />
    </>
  ),
  grad: (
    <path d="m3 9 9-4.5L21 9l-9 4.5zM7 11.5V16c0 1.2 2.2 2.5 5 2.5s5-1.3 5-2.5v-4.5" />
  ),
};

export function Chip({
  icon,
  href,
  children,
}: {
  icon: ChipIcon;
  href?: string;
  children: React.ReactNode;
}) {
  const content = (
    <>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {paths[icon]}
      </svg>
      {children}
    </>
  );
  return href ? (
    <Link className="intro-chip intro-chip-link" href={href}>
      {content}
    </Link>
  ) : (
    <span className="intro-chip">{content}</span>
  );
}

export function RichText({ parts }: { parts: readonly RichPart[] }) {
  return parts.map((part, index) =>
    typeof part === "string" ? (
      part
    ) : (
      <Chip key={index} icon={part.icon} href={part.href}>
        {part.chip}
      </Chip>
    )
  );
}
