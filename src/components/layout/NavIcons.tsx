import type { ReactNode } from "react";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export const AiWorkflowIcon = () => (
  <Icon>
    <path d="M12 3.5 13.9 9l5.6 1.9-5.6 1.9L12 18.5l-1.9-5.7-5.6-1.9L10.1 9Z" />
  </Icon>
);
export const GitHubStatsIcon = () => (
  <Icon>
    <path d="M5 19V11M12 19V5M19 19v-5" />
  </Icon>
);
export const DesignSystemIcon = () => (
  <Icon>
    <path d="m12 4 8 4-8 4-8-4Z" />
    <path d="m4 12 8 4 8-4M4 16l8 4 8-4" />
  </Icon>
);
export const GearIcon = () => (
  <Icon>
    <rect x="5" y="5.5" width="14" height="9.5" rx="1.2" />
    <path d="M3 18.5h18" />
  </Icon>
);
export const ResumeIcon = () => (
  <Icon>
    <path d="M7 3.5h7l4 4v13H7Z" />
    <path d="M14 3.5v4h4M9.5 12.5h5M9.5 16h5" />
  </Icon>
);
export const QuickNavIcon = () => (
  <Icon>
    <rect x="3.5" y="6.5" width="17" height="11" rx="1.4" />
    <path d="M7 10.5h.01M10.5 10.5h.01M14 10.5h.01M17 10.5h.01M8 14h8" />
  </Icon>
);
export const ProductLabIcon = () => (
  <Icon>
    <path d="M9.5 4h5M10.5 4v5.2L5.4 18a1.5 1.5 0 0 0 1.3 2.2h10.6a1.5 1.5 0 0 0 1.3-2.2l-5.1-8.8V4M8.2 14.5h7.6" />
  </Icon>
);
