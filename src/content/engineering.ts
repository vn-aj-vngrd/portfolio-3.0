export const engineeringPillars = [
  {
    title: "Product development",
    description:
      "Clarify the requirement, map the user flow, build the interface and supporting system, then revise it against real behavior.",
    evidence: "Requirements · UX · implementation · iteration",
  },
  {
    title: "Full-stack implementation",
    description:
      "Connect typed interfaces to authenticated APIs, domain rules, databases, background work, and external services.",
    evidence: "Web · mobile · backend · data",
  },
  {
    title: "AI integration",
    description:
      "Validate model output, isolate providers, provide deterministic fallbacks, and require user review before generated changes affect stored data.",
    evidence: "LLM integration · agents · validation",
  },
  {
    title: "Testing and release",
    description:
      "Use automated tests, accessibility checks, performance review, documentation, and repeatable deployment steps before release.",
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
      "The ecosystem I use for my personal web and mobile products, from interfaces to shared application code.",
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
      "Server runtimes, API frameworks, data access, authentication, payments, and monorepo tooling.",
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
    title: "Professional application frameworks",
    description:
      "C# and ASP.NET Core power my core professional backend work, alongside React frontends. Other engagements include Blazor, Angular, and additional backend frameworks.",
    technologies: ["C#", "ASP.NET Core", "Blazor", "Angular", "Laravel"],
  },
  {
    title: "Data, cloud, and infrastructure",
    description:
      "Relational databases, document storage, managed backends, cloud deployment, caching, and containers.",
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
      "ECS Fargate",
      "AWS Lambda",
      "Microsoft Azure",
      "Vercel",
      "Docker",
    ],
  },
  {
    title: "Quality and delivery tooling",
    description:
      "Testing, code review, and CI/CD tooling used with trunk-based development and sprint-based Agile delivery.",
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
      "GitHub Actions",
    ],
  },
  {
    title: "Coding agents",
    description:
      "Tools I use for repository research, implementation, debugging, code review, and browser-based validation.",
    technologies: [
      "Claude Code",
      "Codex",
      "Cursor",
      "GitHub Copilot",
      "Pi Agent",
      "OpenCode",
      "cmux",
      "HERDR",
    ],
  },
  {
    title: "Design, collaboration, and workspace",
    description:
      "Design, editing, database, container, documentation, and planning tools used in daily work.",
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
