import { aiWorkflow } from "@/content/ai-workflow";
import type { RichPart } from "@/types/content";

// Plain-text twins of these paragraphs feed metadata; keep both in step.
const intro: readonly (readonly RichPart[])[] = [
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
    " into real products with ",
    { chip: "Claude Code", icon: "terminal" },
    " and my own ",
    { chip: "software factory", icon: "layers", href: "/ai#factory" },
    ". I\u00a0direct the work, review the code, and verify the results.",
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
    "I start with the user’s task and choose the simplest architecture that supports it. AI helps me move faster; I still review the decisions and verify the behavior.",
  education:
    "BS Information Technology, University of San Carlos, Talamban Campus, 2024",
} as const;
