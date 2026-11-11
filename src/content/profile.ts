import { aiWorkflow } from "@/content/ai-workflow";

export type IntroIcon =
  | "code"
  | "web"
  | "mobile"
  | "server"
  | "sparkles"
  | "agent"
  | "terminal"
  | "pin";

export type IntroPart = string | { chip: string; icon: IntroIcon };

// Plain-text twins of these paragraphs feed metadata; keep both in step.
const intro: readonly (readonly IntroPart[])[] = [
  [
    "I’m a ",
    { chip: "product-driven engineer", icon: "code" },
    " in ",
    { chip: "Cebu", icon: "pin" },
    " with 3+ years taking products from requirements to production across ",
    { chip: "web", icon: "web" },
    ", ",
    { chip: "mobile apps", icon: "mobile" },
    ", and ",
    { chip: "backend", icon: "server" },
    ".",
  ],
  [
    "These days I’m building ",
    { chip: "AI features", icon: "sparkles" },
    " and ",
    { chip: "agents", icon: "agent" },
    " into real products, working daily with ",
    { chip: "Claude Code", icon: "terminal" },
    " and ",
    { chip: "Codex", icon: "terminal" },
    ". I direct the work, review the code, and verify the results.",
  ],
];

export const profile = {
  name: "Van AJ Vanguardia",
  title: "AI Product Engineer / Software Engineer.",
  statement:
    "I’m a product-driven engineer in Cebu with 3+ years taking products from requirements to production across web, mobile apps, and backend.",
  intro,
  introduction: `I am based in Cebu, Philippines. ${aiWorkflow.profileSummary}`,
  location: "Cebu, Philippines",
  availability: "Open to opportunities",
  email: "vanajvanguardia@gmail.com",
  github: "https://github.com/vn-aj-vngrd",
  linkedin: "https://www.linkedin.com/in/van-aj-vanguardia-a0654a223/",
  philosophy:
    "I start with the user’s task and choose the simplest architecture that can support it. I care about clear interfaces, accessible behavior, performance, documentation, and code that remains easy to test and change. AI tools help me move faster, but I still review the decisions and verify the behavior.",
  education:
    "BS Information Technology, University of San Carlos, Talamban Campus, 2024",
} as const;
