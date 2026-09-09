import { aiWorkflow, resumeAiTools, resumeWorkflowTools } from "@/content/ai-workflow";
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
    "Product-driven full-stack developer with 3+ years of professional experience building React applications backed by C# / ASP.NET Core microservices, Microsoft SQL Server, and AWS. Develops personal web and mobile products in the TypeScript ecosystem and uses adaptable, AI-assisted workflows to turn product requirements into tested, reviewed features.",
  skills: [
    { label: "Professional stack", detail: "React, C#, ASP.NET Core, Microservices, SQL Server (MSSQL), AWS" },
    { label: "Personal products", detail: "TypeScript, Next.js, Supabase, Hono, PostgreSQL, React Native, Expo, Vercel" },
    { label: "Additional stack", detail: "Node.js, NestJS, Blazor, Angular" },
    { label: "Cloud & delivery", detail: "AWS, Microsoft Azure, Docker, GitHub Actions, CI/CD, Vercel, Terraform" },
    { label: "AI tools", detail: resumeAiTools.join(", ") },
    { label: "Workflow tooling", detail: resumeWorkflowTools.join(", ") },
  ],
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
      "Built a pickleball session app for RSVPs, court rotations, scoring, and shared expenses. Enforced authorization on server-side writes and added automated tests for permissions and session workflows.",
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Vitest", "Playwright"],
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
] as const;

export const resumeProducts = productSelections.map((selection) => {
  const project = projectCatalog.find(selection.slug);
  if (!project) throw new Error(`Missing résumé product: ${selection.slug}`);
  return { ...project, ...selection };
});
