import { experience } from "@/content/experience";
import { projectCatalog } from "@/content/projects";
import type { Experience } from "@/types/content";

// Shared facts stay in experience.ts; compact selections keep the résumé focused.
function experienceEntry(company: string, bullets?: readonly string[]) {
  const entry: Experience | undefined = experience.find((item) => item.company === company);
  if (!entry) throw new Error(`Missing résumé experience: ${company}`);
  const selectedBullets = bullets ?? entry.resumeBullets;
  if (!selectedBullets) throw new Error(`Missing résumé bullets: ${company}`);
  return { ...entry, bullets: selectedBullets };
}

export const resume = {
  title: "Full-Stack Software Developer",
  summary:
    "Product-minded full-stack developer building and maintaining web applications with React, C# / ASP.NET Core, and Microsoft SQL Server. Work spans AI features, accessibility, cloud services, integrations, and continuous delivery across AWS and Microsoft Azure.",
  skills: [
    { label: "Primary stack", detail: "C#, ASP.NET Core, React, TypeScript, JavaScript, SQL Server (MSSQL)" },
    { label: "Additional stack", detail: "Next.js, Node.js, NestJS, PostgreSQL, React Native, Expo, Blazor, Angular" },
    { label: "Cloud & delivery", detail: "AWS, ECS Fargate, Lambda, Microsoft Azure, Docker, GitHub Actions, CI/CD" },
    { label: "Testing", detail: "Vitest, Playwright, Postman" },
  ],
  professional: [
    experienceEntry("Full Scale Teams PH"),
    experienceEntry("NextDevs Software Development Services", [
      "Defined service and database boundaries for crew-management workflows, implementing typed APIs with NestJS, Fastify, and Prisma.",
      "Worked with frontend and QA contributors to integrate APIs using Swagger and Postman, and resolved Next.js interface and performance issues.",
      "Configured Docker and NGINX environments for integration testing and release review.",
    ]),
  ],
  aiWorkflow: {
    tools: ["Claude Code", "Codex CLI", "Pi", "Cursor", "GitHub Copilot"],
    summary:
      "Define acceptance criteria and bounded tasks for research, implementation, and debugging. Verify changes through direct code review, tests, type checks, and browser checks before release.",
  },
  internships: [
    experienceEntry("Full Scale", [
      "Collaborated on event registration and QR attendance workflows with Next.js, ASP.NET Core, and MSSQL; independently built a contact-management assessment project.",
    ]),
    experienceEntry("MYT SoftDev Solutions Inc.", [
      "Implemented CodeIgniter API endpoints, tested APIs with Postman, and maintained JavaScript interfaces for internal business systems.",
    ]),
    experienceEntry("Astro Shipping Management Inc.", [
      "Automated legacy Excel data preparation with Python, Pandas, and NumPy for import into a planned-maintenance system.",
    ]),
  ],
  capstone: experienceEntry("University of San Carlos", [
    "Co-developed NextGig, a student freelance marketplace, using Expo, React Native, and Next.js with Convex-backed data and Clerk authentication.",
  ]),
} as const;

const productSelections = [
  {
    slug: "relay",
    description:
      "Built a pickleball session app for RSVPs, court rotations, scoring, and shared expenses. Enforced authorization on server-side writes and added automated tests for permissions and session workflows.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Vitest", "Playwright"],
  },
  {
    slug: "roleway",
    description:
      "Built a job-search workspace with opportunity tracking and an optional AI agent. Implemented approval-gated changes, row-level access control, and encrypted provider credentials.",
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Playwright"],
  },
  {
    slug: "acsfi",
    description:
      "Built the foundation’s public website and Strapi CMS so programs, reports, and events can be updated without editing site code. Separated content management from presentation and used static generation with incremental regeneration.",
    stack: ["Next.js", "TypeScript", "Strapi", "MySQL", "Docker"],
  },
  {
    slug: "viya",
    description:
      "Built a mobile travel-workspace prototype for itineraries, budgets, and bookings. Shared TypeScript and Zod contracts validate AI-proposed changes before travelers approve them.",
    stack: ["React Native", "Expo", "Convex", "Clerk", "Zod"],
  },
] as const;

export const resumeProducts = productSelections.map((selection) => {
  const project = projectCatalog.find(selection.slug);
  if (!project) throw new Error(`Missing résumé product: ${selection.slug}`);
  return { ...project, ...selection };
});
