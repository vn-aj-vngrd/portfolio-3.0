import type { Experience, RichPart } from "@/types/content";

export const experienceIntroduction =
  "Product work across frontend, backend, data, and delivery, from new features to AI capabilities, accessibility, and cloud.";

export const experienceIntro: readonly RichPart[] = [
  "Product work across ",
  { chip: "frontend", icon: "web" },
  ", ",
  { chip: "backend", icon: "server" },
  ", ",
  { chip: "data", icon: "database" },
  ", and ",
  { chip: "cloud delivery", icon: "cloud" },
  ", from new features to AI capabilities and accessibility.",
];

const fullScaleGroups = [
  {
    client: "Lytho",
    label: "Current client · React, C# / ASP.NET Core, SQL Server, AWS",
    bullets: [
      "Shipped multiple customer-facing feature epics, expanding how teams manage content, customize data, and coordinate approvals.",
      "Contributed AI Insights, AI Reviewer, AI Skills, and AI Teammates, agent features that help customers review content and surface insights.",
      "Fixed form-rendering and UI defects that supported a passed third-party WCAG 2.2 AA audit.",
      "Resolved export, complex-query, and Lambda processing bottlenecks; QA and customers verified exports after the fixes.",
      "Helped move Windows services from EC2 to Linux containers on ECS Fargate and built Lambda file processors with no Windows dependency.",
    ],
  },
  {
    client: "TicketBooth",
    label: "Earlier client · ASP.NET Core, Angular, Salesforce, Stripe",
    bullets: [
      "Built a Salesforce event-booking dashboard for a corporate ticket-management platform.",
      "Delivered ASP.NET Core and Angular features and integrated Stripe payments.",
    ],
  },
  {
    client: "Billing (Internal)",
    label: "ASP.NET Core, Blazor, Azure",
    bullets: [
      "Sped up data fetches by replacing slow external API calls with direct database access and optimized queries.",
      "Extended billing workflows and exports, and integrated QuickBooks employee data so staff no longer switch tools.",
      "Set up GitHub Actions and Zoho CI/CD for Azure deployment.",
    ],
  },
] as const;

const fullScaleHomeGroups = [
  {
    client: "Lytho",
    label: "Current client · React, C# / ASP.NET Core, SQL Server, AWS",
    bullets: [
      "Shipped customer-facing feature epics across React and ASP.NET Core services: content management, data customization, and approval workflows.",
      "Built AI features, including AI Insights, AI Reviewer, AI Skills, and AI Teammates, so customers can review content and surface insights.",
      "Improved UI and accessibility, including form-rendering fixes, for a product that passed a third-party WCAG 2.2 AA audit.",
      "Fixed slow and failing exports, complex queries, and Lambda file processing; QA and customers confirmed the fixes.",
      "Helped move Windows services from EC2 to Linux containers on ECS Fargate and added Lambda file processors without Windows dependencies.",
    ],
  },
  {
    client: "TicketBooth",
    label: "Earlier client · ASP.NET Core, Angular, Salesforce, Stripe",
    bullets: [
      "Built a Salesforce event-booking dashboard for a platform that centralizes corporate ticket inventory, requests, allocations, and reporting.",
      "Developed ASP.NET Core and Angular features and integrated Stripe payments.",
    ],
  },
  {
    client: "Billing (Internal)",
    label: "ASP.NET Core, Blazor, Azure",
    bullets: [
      "Sped up data fetches by replacing slow external API calls with direct database access and optimized queries.",
      "Extended billing workflows and exports, and integrated QuickBooks employee data so staff can work without switching tools.",
      "Set up CI/CD with GitHub Actions and Zoho for Azure deployment.",
    ],
  },
] as const;

export const experience = [
  {
    company: "Full Scale Teams PH",
    role: "Full-Stack Developer",
    period: "Jul 2024 – Present",
    kind: "Professional",
    current: true,
    summary:
      "Full-stack delivery for client products through Full Scale’s offshore teams, in sprint-based Agile with trunk-based development. Uses Claude Code, Cursor, Codex, and Copilot with direct review of generated changes.",
    highlights: [
      {
        action: "Lytho.",
        detail:
          "Customer-facing features, AI capabilities, accessibility, and cloud modernization.",
      },
      {
        action: "TicketBooth.",
        detail:
          "Event booking and payments for a corporate ticketing platform.",
      },
      {
        action: "Billing (Internal).",
        detail:
          "Faster data access, workflows, integrations, and CI/CD for an internal system.",
      },
    ],
    // Compact wording for the résumé, grouped by client; each bullet is an action and its confirmed result.
    groups: fullScaleHomeGroups,
    resumeGroups: fullScaleGroups,
    resumeBullets: fullScaleGroups.flatMap((group) => group.bullets),
    stack: [
      "React",
      "C#",
      "ASP.NET Core",
      "Microservices",
      "SQL Server",
      "AWS",
      "ECS Fargate",
      "AWS Lambda",
      "Docker",
      "Microsoft Azure",
      "GitHub Actions",
    ],
  },
  {
    company: "NextDevs Software Development Services",
    role: "Full-Stack Developer",
    period: "Apr 2023 – Apr 2024",
    kind: "Professional",
    summary:
      "Founded NextDevs and led a team building three PWAs for crew management.",
    highlights: [
      {
        action: "Led delivery.",
        detail:
          "Founded NextDevs and led three PWAs: Crew Management System, Crew Portal, and Crew Application, on Next.js, NestJS/Fastify, and Prisma. The CMS and portal were adopted across the client company.",
      },
      {
        action: "Worked with clients.",
        detail:
          "Defined requirements and priorities, coordinated frontend and QA, and resolved client-reported issues.",
      },
      {
        action: "Built crew workflows.",
        detail:
          "Admin reports and alerts for expiring documents, contracts, and disembarkation schedules, plus in-app contract generation and export.",
      },
      {
        action: "Made it testable.",
        detail:
          "Docker and NGINX environments for integration testing; APIs documented and validated with Swagger and Postman.",
      },
    ],
    resumeBullets: [
      "Founded NextDevs and led delivery of three PWAs (Crew Management System, Crew Portal, Crew Application) with Next.js, NestJS/Fastify, and Prisma; the CMS and portal were adopted across the client company.",
      "Defined requirements and priorities directly with clients, coordinated frontend and QA, and resolved client-reported issues.",
      "Built admin reports and alerts for expiring documents, contracts, and disembarkation schedules, plus in-app generation and export of crew contracts.",
      "Set up Docker and NGINX integration-test environments; documented and validated APIs with Swagger and Postman.",
    ],
    stack: [
      "Next.js",
      "NestJS",
      "Fastify",
      "Prisma",
      "Docker",
      "NGINX",
      "Swagger",
      "Postman",
    ],
  },
  {
    company: "Full Scale",
    role: "Developer Intern",
    period: "Sep 2023 – Jan 2024",
    kind: "Internship",
    summary:
      "Full-stack internship program with Next.js, ASP.NET Core, MSSQL, and Docker.",
    highlights: [
      {
        action: "Built an event registration system.",
        detail:
          "Co-built with ASP.NET Core, Next.js, MSSQL, and Docker, including QR-based attendance tracking and real-time check-in statistics.",
      },
      {
        action: "Built an assessment project alone.",
        detail:
          "A contact-management system across interface, API, database, and Docker.",
      },
    ],
    resumeBullets: [
      "Co-developed an event registration system with Next.js, ASP.NET Core, and MSSQL; implemented QR-based attendance tracking and real-time statistics so organizers could monitor check-ins and participation.",
      "Independently built a contact-management assessment application, implementing the interface, API, database, and Docker environment.",
    ],
    stack: ["Next.js", "ASP.NET Core", "MSSQL", "Docker"],
  },
  {
    company: "University of San Carlos",
    role: "Full-Stack Developer, NextGig",
    period: "Aug 2023 – Nov 2023",
    kind: "Capstone",
    summary:
      "Co-developed NextGig, a marketplace connecting student freelancers with clients.",
    highlights: [
      {
        action: "Built the mobile and web apps.",
        detail:
          "Expo and React Native app, plus a Next.js admin interface and landing page, in TypeScript.",
      },
      {
        action: "Connected data and auth.",
        detail:
          "Shared Convex backend with Clerk passwordless authentication; web deployed on Vercel, mobile distribution prepared.",
      },
    ],
    resumeBullets: [
      "Co-developed NextGig, a marketplace connecting student freelancers with clients, building the React Native/Expo app and Next.js administration interface and landing page in TypeScript.",
      "Connected web and mobile interfaces to a shared Convex backend and Clerk passwordless authentication; deployed web interfaces on Vercel and prepared mobile distribution.",
    ],
    stack: [
      "TypeScript",
      "React Native",
      "Expo",
      "Next.js",
      "Convex",
      "Clerk",
      "Vercel",
    ],
  },
  {
    company: "MYT SoftDev Solutions Inc.",
    role: "Developer Intern",
    period: "Sep 2022 – Dec 2022",
    kind: "Internship",
    summary:
      "Backend, documentation, QA, and frontend maintenance for internal business systems.",
    highlights: [
      {
        action: "Built and documented APIs.",
        detail:
          "CodeIgniter APIs for an Alumni Portal, validated with Postman.",
      },
      {
        action: "Supported production.",
        detail:
          "Worked with senior developers on production issues and maintained JavaScript and jQuery interfaces for ERP workflows.",
      },
    ],
    resumeBullets: [
      "Built and documented CodeIgniter APIs for an Alumni Portal, validating endpoint behavior with Postman to support integration and testing.",
      "Worked with senior developers to resolve production issues and maintained JavaScript/jQuery interfaces supporting ERP business workflows.",
    ],
    stack: ["PHP", "CodeIgniter", "JavaScript", "jQuery", "Postman"],
  },
  {
    company: "Astro Shipping Management Inc.",
    role: "IT Intern",
    period: "Jun 2022 – Jul 2022",
    kind: "Internship",
    summary:
      "Prepared legacy operational data for a planned-maintenance system with Python.",
    highlights: [
      {
        action: "Automated data preparation.",
        detail:
          "Standardized legacy Excel records with Python, Pandas, and NumPy for import, reducing manual work.",
      },
    ],
    resumeBullets: [
      "Automated preparation of legacy Excel records with Python, Pandas, and NumPy, standardizing data for import into a planned-maintenance system and reducing manual preparation.",
    ],
    stack: ["Python", "Pandas", "NumPy", "Excel"],
  },
] satisfies readonly Experience[];
