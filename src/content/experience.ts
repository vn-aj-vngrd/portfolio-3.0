import type { Experience } from "@/types/content";

export const experience = [
  {
    company: "Full Scale Teams PH",
    role: "Full-Stack Developer",
    period: "Jul 2024 – Present",
    kind: "Professional",
    current: true,
    summary:
      "Build and maintain production applications across React interfaces, ASP.NET Core services, MSSQL databases, third-party integrations, accessibility, and deployment.",
    highlights: [
      {
        action: "Develop features across React and ASP.NET Core.",
        detail:
          "The work spans user interfaces, API services, MSSQL data flows, and external integrations.",
      },
      {
        action: "Delivered a custom Salesforce application.",
        detail:
          "Translated operational requirements into software that simplified business workflows and improved the consistency of stored data.",
      },
      {
        action: "Improved database and integration performance.",
        detail:
          "Optimized database queries and integration paths to reduce latency and make application flows more reliable.",
      },
      {
        action: "Supported repeatable delivery.",
        detail:
          "Containerized applications with Docker and worked within Agile delivery practices across planning, review, and release.",
      },
      {
        action: "Applied accessibility and review practices.",
        detail:
          "Used WCAG guidance for interface work and reviewed AI-assisted changes before integrating them.",
      },
    ],
    stack: ["React", "ASP.NET Core", "MSSQL", "Salesforce", "Docker"],
  },
  {
    company: "NextDevs Software Development Services",
    role: "Full-Stack Developer",
    period: "Apr 2023 – Apr 2024",
    kind: "Professional",
    summary:
      "Worked on crew management systems across backend architecture, typed APIs, databases, Next.js interfaces, and Docker-based local environments.",
    highlights: [
      {
        action: "Structured the backend and database.",
        detail:
          "Defined service and data boundaries for Crew Management and Crew Portal systems.",
      },
      {
        action: "Built typed APIs with NestJS and Fastify.",
        detail:
          "Used NestJS with Fastify and Prisma to connect product workflows to type-safe data access.",
      },
      {
        action: "Worked across implementation and QA.",
        detail:
          "Collaborated with frontend and QA contributors through Swagger and Postman, then resolved Next.js interface and performance issues.",
      },
      {
        action: "Configured local integration environments.",
        detail:
          "Used Docker and NGINX to reproduce the application stack for integration testing and release review.",
      },
    ],
    stack: ["NestJS", "Fastify", "Prisma", "Next.js", "Docker", "NGINX"],
  },
  {
    company: "Full Scale",
    role: "Developer Intern",
    period: "Sep 2023 – Jan 2024",
    kind: "Internship",
    summary:
      "Completed a full-stack internship program and built assessment projects with Next.js, ASP.NET Core, MSSQL, and Docker.",
    highlights: [
      {
        action: "Built an event registration workflow.",
        detail:
          "Collaborated on an event registration system using ASP.NET Core Web API, Next.js, MSSQL, and Docker.",
      },
      {
        action: "Implemented attendee tracking.",
        detail:
          "Added QR-based attendance flows and real-time event statistics for organizers.",
      },
      {
        action: "Built an independent assessment project.",
        detail:
          "Independently developed a contact-management system across interface, API, database, and containerized environment.",
      },
    ],
    stack: ["Next.js", "ASP.NET Core", "MSSQL", "Docker"],
  },
  {
    company: "University of San Carlos",
    role: "Full-Stack Developer, NextGig",
    period: "Aug 2023 – Nov 2023",
    kind: "Capstone",
    summary:
      "Co-developed a mobile marketplace that connected student freelancers with clients through a React Native app, web administration, backend data, and authentication.",
    highlights: [
      {
        action: "Built the mobile and web interfaces.",
        detail:
          "Implemented the mobile application with Expo, React Native, and TypeScript, plus the admin interface and landing page with Next.js.",
      },
      {
        action: "Connected shared data and authentication.",
        detail:
          "Integrated Convex as the shared backend and Clerk for secure passwordless authentication.",
      },
      {
        action: "Prepared the capstone release.",
        detail:
          "Deployed the product across mobile distribution channels and Vercel as part of the capstone delivery.",
      },
    ],
    stack: ["React Native", "Expo", "Next.js", "Convex", "Clerk"],
  },
  {
    company: "MYT SoftDev Solutions Inc.",
    role: "Developer Intern",
    period: "Sep 2022 – Dec 2022",
    kind: "Internship",
    summary:
      "Contributed to backend, documentation, QA, and frontend maintenance across internal business systems.",
    highlights: [
      {
        action: "Documented and implemented APIs.",
        detail:
          "Created API documentation and implemented CodeIgniter backend endpoints for an Alumni Portal.",
      },
      {
        action: "Tested API and production behavior.",
        detail:
          "Used Postman for manual API testing and worked with senior developers to resolve visible production issues.",
      },
      {
        action: "Maintained an existing ERP interface.",
        detail:
          "Refined jQuery and JavaScript frontend code for an enterprise resource-planning system.",
      },
    ],
    stack: ["PHP", "CodeIgniter", "JavaScript", "jQuery", "Postman"],
  },
  {
    company: "Astro Shipping Management Inc.",
    role: "IT Intern",
    period: "Jun 2022 – Jul 2022",
    kind: "Internship",
    summary:
      "Used Python automation to prepare legacy operational data for a new planned-maintenance system.",
    highlights: [
      {
        action: "Automated legacy data preparation.",
        detail:
          "Developed a Python workflow with Pandas and NumPy to migrate and format legacy Excel records.",
      },
      {
        action: "Standardized records for import.",
        detail:
          "Prepared consistent source records for database import and reduced manual handling during system implementation.",
      },
    ],
    stack: ["Python", "Pandas", "NumPy", "Excel"],
  },
] satisfies readonly Experience[];
