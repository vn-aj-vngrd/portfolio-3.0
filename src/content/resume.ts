import { experience } from "@/content/experience";
import { projectCatalog } from "@/content/projects";

// Résumé-specific selections; shared portfolio history and case studies stay complete.
function experienceEntry(company: string, bullets: readonly string[]) {
  const entry = experience.find((item) => item.company === company);
  if (!entry) throw new Error(`Missing résumé experience: ${company}`);
  return { ...entry, bullets };
}

export const resume = {
  title: "Full-Stack Software Developer",
  summary:
    "Full-stack developer focused on ASP.NET Core backends with C# and React frontends with TypeScript. Translate operational requirements into production features across APIs, SQL databases, and integrations. Independently built products demonstrate authorization, automated testing, and user-approved AI workflows.",
  skills: [
    { label: "Primary stack", detail: "C#, ASP.NET Core, React, TypeScript, JavaScript, SQL Server (MSSQL)" },
    { label: "Additional stack", detail: "Next.js, Node.js, NestJS, PostgreSQL, React Native" },
    { label: "Delivery", detail: "Docker, Git, CI/CD, REST APIs" },
    { label: "Testing", detail: "Vitest, Playwright, Postman" },
  ],
  professional: [
    experienceEntry("Full Scale Teams PH", [
      "Delivered a custom Salesforce application from operational requirements, implementing workflows to simplify business processes and improve stored-data consistency.",
      "Build production features across React interfaces, ASP.NET Core APIs in C#, SQL Server data flows, and third-party integrations.",
      "Optimized database queries and integration paths to address latency and reliability; containerized applications with Docker for repeatable delivery.",
      "Participate in planning, review, and release; apply WCAG guidance to interfaces and review AI-assisted changes before integration.",
    ]),
    experienceEntry("NextDevs Software Development Services", [
      "Defined service and database boundaries for crew-management workflows, implementing typed APIs with NestJS, Fastify, and Prisma.",
      "Worked with frontend and QA contributors to integrate APIs using Swagger and Postman, and resolved Next.js interface and performance issues.",
      "Configured Docker and NGINX environments for integration testing and release review.",
    ]),
  ],
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
