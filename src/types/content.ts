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
  architectureSummary: string;
  architecture: readonly ProjectStage[];
  evidence: readonly string[];
  images: readonly ProjectImage[];
  coverImage?: ProjectImage;
  coverImageIndex?: number;
  repository: string;
  liveUrl?: string;
};

export type ExperienceHighlight = {
  action: string;
  detail: string;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  kind: string;
  current?: boolean;
  summary: string;
  highlights: readonly ExperienceHighlight[];
  stack: readonly string[];
};
