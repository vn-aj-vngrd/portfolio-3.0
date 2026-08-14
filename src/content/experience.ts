import type { Experience } from "@/types/content";

export const experience = [
  {
    company: "Full Scale Teams PH",
    role: "Software Developer",
    period: "Jul 2024 — Present",
    kind: "Professional",
    current: true,
    summary:
      "Owns work across frontend, backend, data, integrations, accessibility, and deployment for production full-stack applications.",
    highlights: [
      {
        action: "Build across the stack.",
        detail:
          "Develop and maintain React interfaces, ASP.NET Core services, MSSQL data flows, and external API integrations.",
      },
      {
        action: "Turn operations into software.",
        detail:
          "Delivered a custom Salesforce application that streamlined critical business workflows and improved data accuracy.",
      },
      {
        action: "Improve system behavior.",
        detail:
          "Optimized database queries and integration paths to reduce latency and make application flows more reliable.",
      },
      {
        action: "Make delivery repeatable.",
        detail:
          "Containerized applications with Docker and worked within Agile delivery practices across planning, review, and release.",
      },
      {
        action: "Build for more users.",
        detail:
          "Applied WCAG accessibility practices and used AI-assisted workflows while keeping engineering review in the loop.",
      },
    ],
    stack: ["React", "ASP.NET Core", "MSSQL", "Salesforce", "Docker"],
  },
  {
    company: "NextDevs Software Development Services",
    role: "Full-Stack Developer",
    period: "Apr 2023 — Apr 2024",
    kind: "Professional",
    summary:
      "Worked on crew-management products spanning backend architecture, typed APIs, databases, Next.js interfaces, and local deployment environments.",
    highlights: [
      {
        action: "Designed the backend foundation.",
        detail:
          "Structured database and service architecture for Crew Management and Crew Portal systems.",
      },
      {
        action: "Built typed, high-performance APIs.",
        detail:
          "Used NestJS with Fastify and Prisma to connect product workflows to type-safe data access.",
      },
      {
        action: "Closed delivery gaps.",
        detail:
          "Collaborated with frontend and QA contributors through Swagger and Postman, then resolved Next.js interface and performance issues.",
      },
      {
        action: "Reproduced production locally.",
        detail:
          "Configured Docker and NGINX environments for dependable integration testing and release review.",
      },
    ],
    stack: ["NestJS", "Fastify", "Prisma", "Next.js", "Docker", "NGINX"],
  },
  {
    company: "Full Scale",
    role: "Developer Intern",
    period: "Sep 2023 — Jan 2024",
    kind: "Internship",
    summary:
      "Applied a structured full-stack training program to assessment products built with Microsoft and TypeScript technologies.",
    highlights: [
      {
        action: "Shipped an event workflow.",
        detail:
          "Collaborated on an event registration system using ASP.NET Core Web API, Next.js, MSSQL, and Docker.",
      },
      {
        action: "Automated attendee tracking.",
        detail:
          "Implemented QR-based attendance flows and real-time event statistics for organizers.",
      },
      {
        action: "Owned an assessment product.",
        detail:
          "Independently developed a contact-management system across interface, API, database, and containerized environment.",
      },
    ],
    stack: ["Next.js", "ASP.NET Core", "MSSQL", "Docker"],
  },
  {
    company: "University of San Carlos",
    role: "Full-Stack Developer — NextGig",
    period: "Aug 2023 — Nov 2023",
    kind: "Capstone",
    summary:
      "Co-developed a mobile talent marketplace connecting student freelancers with clients across native, web, backend, and authentication surfaces.",
    highlights: [
      {
        action: "Built cross-platform product surfaces.",
        detail:
          "Implemented the mobile application with Expo, React Native, and TypeScript, plus the admin interface and landing page with Next.js.",
      },
      {
        action: "Connected product and identity.",
        detail:
          "Integrated Convex as the shared backend and Clerk for secure passwordless authentication.",
      },
      {
        action: "Prepared a multi-platform release.",
        detail:
          "Deployed the product across mobile distribution channels and Vercel as part of the capstone delivery.",
      },
    ],
    stack: ["React Native", "Expo", "Next.js", "Convex", "Clerk"],
  },
  {
    company: "MYT SoftDev Solutions Inc.",
    role: "Developer Intern",
    period: "Sep 2022 — Dec 2022",
    kind: "Internship",
    summary:
      "Contributed to backend, documentation, QA, and frontend maintenance across internal business systems.",
    highlights: [
      {
        action: "Made APIs understandable.",
        detail:
          "Created API documentation and implemented CodeIgniter backend endpoints for an Alumni Portal.",
      },
      {
        action: "Validated behavior before release.",
        detail:
          "Used Postman for manual API testing and worked with senior developers to resolve visible production issues.",
      },
      {
        action: "Improved an existing interface.",
        detail:
          "Refined jQuery and JavaScript frontend code for an enterprise resource-planning system.",
      },
    ],
    stack: ["PHP", "CodeIgniter", "JavaScript", "jQuery", "Postman"],
  },
  {
    company: "Astro Shipping Management Inc.",
    role: "IT Intern",
    period: "Jun 2022 — Jul 2022",
    kind: "Internship",
    summary:
      "Used Python automation to prepare legacy operational data for a new planned-maintenance system.",
    highlights: [
      {
        action: "Replaced repetitive data entry.",
        detail:
          "Developed a Python workflow with Pandas and NumPy to migrate and format legacy Excel records.",
      },
      {
        action: "Protected data quality.",
        detail:
          "Standardized source records for database import, reducing manual handling during system implementation.",
      },
    ],
    stack: ["Python", "Pandas", "NumPy", "Excel"],
  },
] satisfies readonly Experience[];
