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
      "Deliver full-stack product development through Full Scale’s offshore development teams. Currently maintain and extend Lytho, a creative operations platform for marketing workflows and digital assets, using React, C# / ASP.NET Core microservices, Microsoft SQL Server, and AWS. Earlier engagements include internal billing and client applications using Microsoft Azure, Blazor, Angular, and Salesforce.",
    highlights: [
      {
        action: "Maintain and evolve Lytho.",
        detail:
          "Build new features across React interfaces and ASP.NET Core services, fix production bugs, and improve frontend, backend, and database performance as part of ongoing product development.",
      },
      {
        action: "Add AI features and improve accessibility.",
        detail:
          "Implement AI-powered product features and WCAG-guided accessibility improvements alongside regular frontend development and maintenance.",
      },
      {
        action: "Move Windows services to Linux containers.",
        detail:
          "Adapted and containerized Windows services to run in Linux Docker containers on AWS ECS Fargate. Also worked on AWS Lambda file-processing functions.",
      },
      {
        action: "Deliver internal billing capabilities.",
        detail:
          "Built features across an ASP.NET Core backend and Blazor frontend, optimized database and backend performance, and integrated QuickBooks, Zoho, and other internal tools. Set up CI/CD with GitHub Actions and Microsoft Azure.",
      },
      {
        action: "Build event-booking and payment features.",
        detail:
          "Delivered a Salesforce event-booking dashboard for an earlier client, then developed ASP.NET Core and Angular features and integrated Stripe payments.",
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
      "Maintain and extend Lytho’s creative operations platform across React, C# / ASP.NET Core microservices, Microsoft SQL Server, and AWS.",
      "Add AI features, improve frontend accessibility against WCAG guidance, fix bugs, and optimize UI, backend, and database performance.",
      "Adapted Windows services for Linux Docker containers on AWS ECS Fargate; worked on AWS Lambda file processors.",
      "Built and optimized internal billing features with ASP.NET Core and Blazor; integrated QuickBooks and Zoho and set up GitHub Actions CI/CD with Microsoft Azure.",
      "Delivered a Salesforce event-booking dashboard, then added ASP.NET Core and Angular features and Stripe payment integration for that client.",
      "Use sprint-based Agile, trunk-based development, and continuous delivery, with AI-assisted workflows, direct code review, and verification.",
    ],
    stack: ["React", "C#", "ASP.NET Core", "Microservices", "SQL Server", "AWS", "ECS Fargate", "AWS Lambda", "Docker", "Microsoft Azure", "GitHub Actions"],
  },
  {
    company: "NextDevs Software Development Services",
    role: "Full-Stack Developer",
    period: "Apr 2023 – Apr 2024",
    kind: "Professional",
    summary:
      "Founded NextDevs, a software development startup, and led the team building Crew Management Software. Combined hands-on full-stack development with direct client collaboration and application support, focusing on API endpoints, infrastructure, and Next.js interfaces.",
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
          "Built Next.js features, integrated backend APIs, and resolved interface and performance issues in the crew-management application.",
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
      "Founded NextDevs, a software development startup, and led the team building Crew Management Software; worked directly with clients to clarify requirements and prioritize features.",
      "Built API endpoints and the data layer with NestJS, Fastify, and Prisma, connecting crew-management workflows to Next.js interfaces.",
      "Developed frontend features, resolved interface and performance issues, and configured Docker/NGINX integration environments; validated APIs with Swagger and Postman.",
      "Provided direct client support, investigated application issues, and coordinated fixes with frontend and QA contributors.",
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
      "Co-developed an event registration system with Next.js, ASP.NET Core Web API, and MSSQL, connecting registration interfaces to backend services.",
      "Implemented QR-based attendance tracking and real-time event statistics so organizers could monitor check-ins and participation.",
      "Independently built a contact-management assessment application across the frontend, API, database, and Docker environment.",
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
    resumeBullets: [
      "Co-developed a student freelance marketplace in TypeScript; built the React Native/Expo mobile app and Next.js web administration and landing page.",
      "Integrated Convex data and Clerk passwordless authentication; prepared mobile distribution and deployed web interfaces on Vercel.",
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
      "Built CodeIgniter API endpoints for an Alumni Portal and documented their behavior to support integration and testing.",
      "Tested APIs with Postman and worked with senior developers to investigate and resolve production issues.",
      "Refined JavaScript and jQuery interfaces in an existing ERP system, supporting ongoing maintenance of business workflows.",
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
      "Built a Python workflow with Pandas and NumPy to transform legacy Excel records for a planned-maintenance system.",
      "Standardized records for database import, reducing manual data preparation during system implementation.",
    ],
    stack: ["Python", "Pandas", "NumPy", "Excel"],
  },
] satisfies readonly Experience[];
