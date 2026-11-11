import { experience } from "@/content/experience";
import { projectCatalog } from "@/content/projects";
import type { Experience } from "@/types/content";

// Shared facts stay in experience.ts; compact selections keep the résumé focused.
function experienceEntry(company: string, bullets?: readonly string[]) {
  const entry: Experience | undefined = experience.find(
    (item) => item.company === company
  );
  if (!entry) throw new Error(`Missing résumé experience: ${company}`);
  const selectedBullets = bullets ?? entry.resumeBullets;
  if (!selectedBullets) throw new Error(`Missing résumé bullets: ${company}`);
  return { ...entry, bullets: selectedBullets };
}

export const resume = {
  title: "AI Product Engineer / Software Engineer",
  summary:
    "AI Product Engineer / Software Engineer with 3+ years shipping customer-facing products across web, mobile, and backend. Builds AI features and agents, such as tool-calling assistants with approval-gated actions, and builds with Claude Code through a personal software factory that turns GitHub issues into reviewed draft PRs. Delivers with React, C# / ASP.NET Core, SQL Server, AWS, and TypeScript; founded NextDevs and led delivery of three PWAs.",
  skills: [
    {
      label: "Frontend & mobile",
      detail:
        "TypeScript, React, Next.js, Angular, Blazor, React Native, Expo, Swift, SwiftUI, PWAs",
    },
    {
      label: "Backend & APIs",
      detail: "C#, ASP.NET Core, Microservices, Node.js, NestJS, Fastify, Hono",
    },
    {
      label: "Data & backend services",
      detail:
        "SQL Server (MSSQL), PostgreSQL, Prisma, Drizzle ORM, Supabase, Convex",
    },
    {
      label: "Cloud & delivery",
      detail:
        "AWS, Microsoft Azure, Docker, Terraform, Vercel; CI/CD with GitHub Actions and Zoho",
    },
    {
      label: "Testing & quality",
      detail: "Vitest, Playwright, Postman, WCAG-guided accessibility",
    },
    {
      label: "AI engineering",
      detail:
        "Vercel AI SDK, OpenRouter, OpenAI / Anthropic / Gemini APIs, Apple Foundation Models (on-device), tool calling, streaming, Zod-validated structured output, approval-gated actions",
    },
    {
      label: "AI agent setup",
      detail:
        "Claude Code, Claude Opus and Sonnet, subagents, custom skills, hooks, MCPs, Herdr, multi-agent orchestration, agent loops",
    },
  ],
  professional: [
    experienceEntry("Full Scale Teams PH"),
    experienceEntry("NextDevs Software Development Services"),
  ],
  internships: [
    experienceEntry("Full Scale"),
    experienceEntry("MYT SoftDev Solutions Inc."),
    experienceEntry("Astro Shipping Management Inc."),
  ],
  capstone: experienceEntry("University of San Carlos"),
} as const;

const productSelections = [
  {
    slug: "relay",
    description:
      "Pickleball RSVPs, rotations, scores, and shared costs, with a streaming AI agent over permission-checked tools and approval-gated creation. Server-side authorization tested with Vitest and Playwright.",
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Drizzle ORM",
      "Vercel AI SDK",
      "OpenRouter",
      "Zod",
      "Vitest",
      "Playwright",
    ],
  },
  {
    slug: "roleway",
    description:
      "Job-search workspace with a tool-loop AI agent on user-connected providers that proposes tasks, notes, interviews, and contacts for approval; PostgreSQL functions authorize execution, with row-level security and encrypted credentials.",
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Vercel AI SDK",
      "OpenAI, Anthropic, Gemini, OpenRouter",
      "Zod",
      "Vitest",
      "Playwright",
    ],
  },
  {
    slug: "acsfi",
    description:
      "Website and Strapi CMS for a nonprofit foundation so editors publish programs, reports, and events without code; Next.js static generation with incremental regeneration.",
    stack: ["Next.js", "TypeScript", "Strapi", "MySQL", "Docker"],
  },
  {
    slug: "aqd",
    description:
      "Private on-device iPhone closet app in SwiftUI and SwiftData, with no account or backend; an Apple Foundation Models agent answers from the closet and drafts reviewable, undoable change sets.",
    stack: [
      "Swift",
      "SwiftUI",
      "SwiftData",
      "Foundation Models",
      "WeatherKit",
      "Swift Testing",
      "XCUITest",
    ],
  },
] as const;

export const resumeProducts = productSelections.map((selection) => {
  const project = projectCatalog.find(selection.slug);
  if (!project) throw new Error(`Missing résumé product: ${selection.slug}`);
  return { ...project, ...selection };
});
