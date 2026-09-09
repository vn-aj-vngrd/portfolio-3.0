import type { Experience } from "@/types/content";

export const experienceIntroduction =
  "My work spans product maintenance, new features, AI capabilities, accessibility, integrations, and cloud delivery. I connect React frontends with C# / ASP.NET Core services and SQL Server, with AWS and Microsoft Azure across current and earlier engagements.";

export const experience = [
  {
    company: "Full Scale Teams PH",
    role: "Full-Stack Developer",
    period: "Jul 2024 – Present",
    kind: "Professional",
    current: true,
    summary:
      "Deliver full-stack product development through Full Scale’s offshore development teams. Currently maintain and extend Lytho, a creative operations platform for marketing workflows and digital assets, using React, C# / ASP.NET Core microservices, Microsoft SQL Server, and AWS. Earlier work includes Ticket Booth, a corporate event-ticket management platform, using Salesforce, ASP.NET Core, and Angular, plus internal billing tooling using ASP.NET Core, Blazor, and Microsoft Azure.",
    highlights: [
      {
        action: "Maintain and evolve Lytho.",
        detail:
          "Deliver customer-facing features across React interfaces and ASP.NET Core services, including AI insights, data customization, and approval workflows. Features reached customers and received positive feedback; QA and customers verified successful exports after fixes to slow or failing export workflows.",
      },
      {
        action: "Add AI features and improve accessibility.",
        detail:
          "Implement AI insights and custom AI skill workflows. Contributed accessibility fixes to a product that passed a third-party WCAG 2.2 AA audit.",
      },
      {
        action: "Move Windows services to Linux containers.",
        detail:
          "Contributed to backend modernization through EC2-to-ECS migration and ECR container images. Adapted Windows services to run in Linux Docker containers on ECS Fargate and built new AWS Lambda file processors to handle work without legacy Windows dependencies.",
      },
      {
        action: "Deliver internal billing capabilities.",
        detail:
          "Expanded an internally used ASP.NET Core and Blazor billing system with workflows, exports, and QuickBooks employee-data integration. Improved fetch response times by replacing slow external API calls with direct database access, implementing connection and factory setup and optimized queries. Configured CI/CD and development workflows using GitHub Actions and Zoho for Microsoft Azure deployment.",
      },
      {
        action: "Build event-booking and payment features.",
        detail:
          "Delivered a Salesforce event-booking dashboard for Ticket Booth, a platform that centralizes corporate ticket inventory, requests, allocations, and reporting. Developed ASP.NET Core backend and Angular frontend features and integrated Stripe payments.",
      },
      {
        action: "Work in a continuous delivery cycle.",
        detail:
          "Contribute within sprint-based Agile teams using trunk-based development, connecting feature work, bug fixes, review, and release to product needs.",
      },
      {
        action: "Integrate AI-assisted engineering workflows.",
        detail:
          "Use Claude Code, Cursor, Codex, and GitHub Copilot for development tasks, with direct code review and verification of generated changes.",
      },
    ],
    // Compact wording for the résumé, maintained alongside the full account above.
    resumeBullets: [
      "Lytho (current client): Continuously deliver full-stack features and enhancements for Lytho’s customer base using React, C# / ASP.NET Core microservices, SQL Server, and AWS. Completed multiple feature epics released to customers, expanding how teams manage content, customize data, and coordinate approvals.",
      "Improved UI/UX and accessibility, including form-rendering fixes, contributing to a successful WCAG 2.2 AA audit conducted by Ramp Accessible.",
      "Addressed performance bottlenecks and defects across exports, complex data queries, and AWS Lambda file processing; QA and customers verified successful exports after the fixes.",
      "Contributed to backend modernization through EC2-to-ECS migration and ECR container images; adapted Windows services to run in Linux containers on ECS Fargate and built new AWS Lambda file processors to handle work without legacy Windows dependencies.",
      "Ticket Booth (earlier client): Built a Salesforce dashboard, ASP.NET Core backend and Angular frontend features, and Stripe payment integration for a corporate event-ticket management platform.",
      "Internal Billing System: Improved data-fetch response times by replacing slow external API calls with direct database access, implementing connection management and optimized queries.",
      "Expanded ASP.NET Core and Blazor billing workflows and exports; integrated QuickBooks employee data so internal staff could access information without switching tools.",
      "Configured billing CI/CD and development workflows using GitHub Actions and Zoho for Microsoft Azure deployment.",
    ],
    stack: ["React", "C#", "ASP.NET Core", "Microservices", "SQL Server", "AWS", "ECS Fargate", "AWS Lambda", "Docker", "Microsoft Azure", "GitHub Actions"],
  },
  {
    company: "NextDevs Software Development Services",
    role: "Full-Stack Developer",
    period: "Apr 2023 – Apr 2024",
    kind: "Professional",
    summary:
      "Founded NextDevs and led the team building three applications: an administrative Crew Management System (CMS), a crew portal for personal information and documents, and a Crew Application app for online applications. Delivered all three as Progressive Web Apps (PWAs), combining hands-on full-stack development with direct client collaboration, team coordination, and support.",
    highlights: [
      {
        action: "Led product development with clients.",
        detail:
          "Worked directly with clients to clarify crew-management requirements and prioritize features, then coordinated implementation across frontend and QA contributors.",
      },
      {
        action: "Built the APIs behind crew-management workflows.",
        detail:
          "Developed endpoints with NestJS and Fastify, structured service and database boundaries, and used Prisma for typed data access connecting the application’s interfaces to backend operations.",
      },
      {
        action: "Developed and refined the frontend.",
        detail:
          "Built Next.js interfaces for three applications: an administrative CMS for crew-management, crew-change, and reporting; a crew portal for personal information and documents; and a Crew Application app for online submissions. All three are PWAs; the CMS and crew portal are adopted across the client company. Integrated backend APIs and resolved interface and performance issues.",
      },
      {
        action: "Made the application stack testable together.",
        detail:
          "Configured Docker and NGINX environments for integration testing and release review. Used Swagger and Postman to document and validate API behavior with the team.",
      },
      {
        action: "Supported clients beyond feature development.",
        detail:
          "Provided direct application support, investigated client-reported issues, and coordinated fixes with the development team.",
      },
    ],
    resumeBullets: [
      "Founded NextDevs and led full-stack delivery of three Progressive Web Apps (PWAs): Crew Management System (CMS), Crew Portal, and Crew Application, using Next.js, NestJS/Fastify, and Prisma. The CMS and portal were adopted across the client company.",
      "Worked directly with clients to define requirements and prioritize features; coordinated frontend and QA delivery and resolved client-reported issues.",
      "Built Crew Portal for managing documents and viewing essential information, and a separate Crew Application app for submitting application details online or through an office kiosk.",
      "Built CMS reports and admin alerts for expiring documents, contracts, and disembarkation schedules, helping administrators track crew-change requirements and upcoming actions.",
      "Implemented in-app generation and export of crew contracts and other documents using crew- and admin-supplied information, enabling staff to prepare documents directly in the system.",
      "Configured Docker and NGINX environments for full-stack integration testing before release; documented and validated APIs with Swagger and Postman.",
    ],
    stack: ["Next.js", "NestJS", "Fastify", "Prisma", "Docker", "NGINX", "Swagger", "Postman"],
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
      "Co-developed a marketplace connecting student freelancers with clients using Next.js for web interfaces, React Native with Expo for mobile, and Convex for the shared backend.",
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
    resumeBullets: [
      "Co-developed NextGig, a marketplace connecting student freelancers with clients, building the React Native/Expo app and Next.js administration interface and landing page in TypeScript.",
      "Connected web and mobile interfaces to a shared Convex backend and Clerk passwordless authentication; deployed web interfaces on Vercel and prepared mobile distribution.",
    ],
    stack: ["TypeScript", "React Native", "Expo", "Next.js", "Convex", "Clerk", "Vercel"],
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
    resumeBullets: [
      "Automated preparation of legacy Excel records with Python, Pandas, and NumPy, standardizing data for import into a planned-maintenance system and reducing manual preparation.",
    ],
    stack: ["Python", "Pandas", "NumPy", "Excel"],
  },
] satisfies readonly Experience[];
