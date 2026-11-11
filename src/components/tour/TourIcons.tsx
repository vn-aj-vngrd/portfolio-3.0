import type { ReactNode } from "react";

function Icon({ children, size }: { children: ReactNode; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
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

export const PlayIcon = ({ size }: { size?: number }) => (
  <Icon size={size}>
    <path d="M8 5.5v13l10.5-6.5Z" />
  </Icon>
);
export const PauseIcon = () => (
  <Icon>
    <path d="M9 5.5v13M15 5.5v13" />
  </Icon>
);
export const PrevIcon = () => (
  <Icon>
    <path d="M7 5.5v13M18 6l-8 6 8 6Z" />
  </Icon>
);
export const NextIcon = () => (
  <Icon>
    <path d="M17 5.5v13M6 6l8 6-8 6Z" />
  </Icon>
);
export const VoiceIcon = ({ on }: { on: boolean }) => (
  <Icon>
    <rect x="9" y="3.5" width="6" height="10" rx="3" />
    <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v2.5" />
    {on ? null : <path d="M4 4l16 16" />}
  </Icon>
);
export const MusicIcon = ({ on }: { on: boolean }) => (
  <Icon>
    <path d="M9 17.5V6l9-2v11.5" />
    <circle cx="6.5" cy="17.5" r="2.5" />
    <circle cx="15.5" cy="15.5" r="2.5" />
    {on ? null : <path d="M4 4l16 16" />}
  </Icon>
);
export const CloseIcon = () => (
  <Icon>
    <path d="m6 6 12 12M18 6 6 18" />
  </Icon>
);
export const ReplayIcon = () => (
  <Icon>
    <path d="M4.5 12a7.5 7.5 0 1 0 2.4-5.5M4.5 4.5v4h4" />
  </Icon>
);
