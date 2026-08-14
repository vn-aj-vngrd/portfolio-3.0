export const engineeringPillars = [
  {
    title: "Product delivery",
    description:
      "Turn a rough problem into flows, interfaces, implementation decisions, and a releaseable product.",
    evidence: "Requirements · UX · implementation · iteration",
  },
  {
    title: "Full-stack systems",
    description:
      "Build typed interfaces, authenticated APIs, domain models, integrations, and data-backed workflows.",
    evidence: "Web · mobile · backend · data",
  },
  {
    title: "AI with guardrails",
    description:
      "Use structured outputs, provider boundaries, deterministic fallbacks, and reviewable changes instead of opaque AI features.",
    evidence: "LLM integration · agents · validation",
  },
  {
    title: "Quality and release",
    description:
      "Treat testing, accessibility, performance, documentation, and repeatable delivery as product requirements.",
    evidence: "Test · review · automate · ship",
  },
] as const;

type StackGroup = {
  title: string;
  description: string;
  primary?: boolean;
  technologies: readonly string[];
};

export const stackGroups: readonly StackGroup[] = [
  {
    title: "TypeScript product engineering",
    description:
      "My primary ecosystem for building polished web and mobile product surfaces.",
    primary: true,
    technologies: [
      "TypeScript",
      "React",
      "Next.js",
      "React Native",
      "Expo",
      "Vite",
      "PWA",
      "Tailwind CSS",
      "shadcn/ui",
      "HeroUI",
    ],
  },
  {
    title: "TypeScript backend and architecture",
    description:
      "Typed services, authentication, payments, APIs, monorepos, and application boundaries.",
    technologies: [
      "Node.js",
      "Bun",
      "NestJS",
      "Express",
      "Hono",
      "Fastify",
      "tRPC",
      "REST APIs",
      "Microservices",
      "Prisma",
      "Drizzle",
      "Better Auth",
      "Clerk",
      "Stripe",
      "Turborepo",
    ],
  },
  {
    title: "Additional backend ecosystems",
    description:
      "Backend work outside TypeScript when the product or existing system calls for it.",
    technologies: ["ASP.NET Core", "Laravel"],
  },
  {
    title: "Data, cloud, and infrastructure",
    description:
      "Relational and document data, managed backends, deployment platforms, and reproducible environments.",
    technologies: [
      "PostgreSQL",
      "MSSQL",
      "MySQL",
      "MongoDB",
      "NoSQL",
      "Redis",
      "Convex",
      "Supabase",
      "AWS",
      "Vercel",
      "Docker",
    ],
  },
  {
    title: "Quality and delivery tooling",
    description:
      "Testing, formatting, hooks, API validation, and source-control practices that protect delivery.",
    technologies: [
      "Vitest",
      "Jest",
      "Maestro",
      "Biome",
      "Ultracite",
      "Prettier",
      "Lefthook",
      "Husky",
      "Postman",
      "Git",
      "GitHub",
    ],
  },
  {
    title: "AI and agentic engineering",
    description:
      "Coding agents and orchestration tools used to accelerate implementation while keeping review and validation explicit.",
    technologies: [
      "Claude Code",
      "Codex",
      "Cursor",
      "Pi Agent",
      "OpenCode",
      "cmux",
      "HERDR",
    ],
  },
  {
    title: "Design, collaboration, and workspace",
    description:
      "The practical environment around product planning, interface work, debugging, and team delivery.",
    technologies: [
      "Figma",
      "VS Code",
      "DataGrip",
      "OrbStack",
      "Notion",
      "Jira",
    ],
  },
] as const;
