export type ProjectStage = {
  title: string;
  body: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  label?: string;
};

export type ProductMatchEntry = {
  slug: string;
  name: string;
  href: string;
  prompt: string;
  clue: string;
  result: string;
};

export type ProjectChapter = {
  label: string;
  title: string;
  lead: string;
  points: readonly string[];
  screens: readonly ProjectImage[];
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  match: Omit<ProductMatchEntry, "slug" | "name" | "href">;
  problem: string;
  solution: string;
  role: string;
  status: string;
  featured: boolean;
  stack: readonly string[];
  decisions: readonly ProjectStage[];
  features?: readonly ProjectStage[];
  journey?: {
    screenShape?: "phone" | "wide";
    title: string;
    summary: string;
    chapters: readonly ProjectChapter[];
  };
  agent?: {
    summary: string;
    steps: readonly ProjectStage[];
    guideUrl: string;
  };
  architectureSummary: string;
  architecture: readonly ProjectStage[];
  evidence: readonly string[];
  images: readonly ProjectImage[];
  coverImage?: ProjectImage;
  coverImageIndex?: number;
  repository?: string;
  liveUrl?: string;
};

export type ExperienceHighlight = {
  action: string;
  detail: string;
};

export type ResumeGroup = {
  client: string;
  label: string;
  bullets: readonly string[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  kind: string;
  current?: boolean;
  summary: string;
  highlights: readonly ExperienceHighlight[];
  resumeBullets?: readonly string[];
  resumeGroups?: readonly ResumeGroup[];
  groups?: readonly ResumeGroup[];
  stack: readonly string[];
};

export type ChipIcon =
  | "code"
  | "web"
  | "mobile"
  | "server"
  | "sparkles"
  | "agent"
  | "terminal"
  | "pin"
  | "users"
  | "briefcase"
  | "plane"
  | "news"
  | "home"
  | "shirt"
  | "database"
  | "cloud"
  | "check"
  | "layers"
  | "award"
  | "grad"
  | "music"
  | "ball"
  | "sun"
  | "user"
  | "access"
  | "mail"
  | "globe"
  | "github"
  | "linkedin";

// Prose with inline chips; a chip with `href` links to a case study or page.
export type RichPart = string | { chip: string; icon: ChipIcon; href?: string };
