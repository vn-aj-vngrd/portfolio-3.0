import { aiWorkflow } from "@/content/ai-workflow";
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
    "Product-driven full-stack developer building customer-facing applications with React, C# / ASP.NET Core, SQL Server, and AWS, alongside personal web and mobile products in the TypeScript ecosystem. Founded NextDevs and led client-facing product delivery. Prioritizes user experience and adapts technology choices to product needs. Uses AI-assisted workflows while staying hands-on from planning through delivery, guiding decisions, reviewing code, and verifying results.",
  skills: [
    { label: "Frontend & mobile", detail: "TypeScript, React, Next.js, Angular, Blazor, React Native, Expo, PWAs" },
    { label: "Backend & APIs", detail: "C#, ASP.NET Core, Microservices, Node.js, NestJS, Fastify, Hono" },
    { label: "Data & backend services", detail: "SQL Server (MSSQL), PostgreSQL, Prisma, Drizzle ORM, Supabase, Convex" },
    { label: "Cloud & delivery", detail: "AWS, Microsoft Azure, Docker, Terraform, Vercel; CI/CD with GitHub Actions and Zoho" },
    { label: "Testing & quality", detail: "Vitest, Playwright, Postman, WCAG-guided accessibility" },
  ],
  engagementLabels: ["Lytho (current client)", "Ticket Booth (earlier client)", "Internal Billing System"],
  professional: [
    experienceEntry("Full Scale Teams PH"),
    experienceEntry("NextDevs Software Development Services"),
  ],
  aiWorkflow: {
    summary: aiWorkflow.resumeSummary,
  },
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
      "Built Relay so pickleball groups can coordinate RSVPs, court rotations, scores, and shared expenses in one app. Enforced authorization on server-side writes and tested permissions and session workflows with Vitest and Playwright.",
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Drizzle ORM", "Vitest", "Playwright"],
  },
  {
    slug: "roleway",
    description:
      "Built Roleway to track job opportunities with optional AI assistance. Required approval for agent-driven changes, enforced row-level access control, and encrypted provider credentials to keep users in control of their data and actions.",
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Drizzle ORM", "Playwright"],
  },
  {
    slug: "acsfi",
    description:
      "Built the Astro Charitable and Scholarship Foundation’s website and Strapi CMS so editors can update programs, reports, and events without changing code. Used Next.js static generation with incremental regeneration to serve pages and refresh published content.",
    stack: ["Next.js", "TypeScript", "Strapi", "MySQL", "Docker"],
  },
] as const;

export const resumeProducts = productSelections.map((selection) => {
  const project = projectCatalog.find(selection.slug);
  if (!project) throw new Error(`Missing résumé product: ${selection.slug}`);
  return { ...project, ...selection };
});
