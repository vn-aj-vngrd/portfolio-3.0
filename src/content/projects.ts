import type { Project } from "@/types/content";

export const projects = [
  {
    slug: "relay",
    name: "Relay",
    category: "Full-stack web product · Social sports",
    summary:
      "Relay gives recreational pickleball groups one place to plan a session, invite players, split court costs, manage rotations, score matches, and save a recap.",
    problem:
      "Recreational pickleball groups coordinate the plan, roster, venue cost, court order, and scores across group chats, spreadsheets, and whoever happens to remember what comes next.",
    solution:
      "A host creates one session and shares a public link. The same workspace holds the plan, roster, venue costs, court queue, match scores, chat, and recap, so the group does not need to reconstruct the night across separate tools.",
    role: "Designed and built independently",
    status: "Live web product · Source available",
    featured: true,
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Drizzle ORM",
      "Zod",
      "Vitest",
      "Playwright",
    ],
    decisions: [
      {
        title: "Make the session the product boundary",
        body: "The session owns the plan, roster, expenses, courts, queue, matches, chat, and recap. Users can move through one game without learning separate management areas.",
      },
      {
        title: "Let the shared link carry the plan",
        body: "Invitees can check the time, venue, capacity, estimated cost, and booking status, then RSVP by name without creating an account.",
      },
      {
        title: "Design for courtside use",
        body: "Large score controls, deterministic rotations, visible queue state, and focused live views prioritize fast one-handed decisions beside the court.",
      },
    ],
    architectureSummary:
      "Next.js Server Components load the initial session state. Server actions and queries enforce authorization and product rules, while small client components handle RSVP, scoring, forms, and live court updates.",
    architecture: [
      {
        title: "Feature-based modules",
        body: "Session, roster, payment, match, queue, group, and notification code is organized with its schemas, actions, queries, and interface components.",
      },
      {
        title: "Authorization on every write",
        body: "Mutations validate the signed-in user, session role, lifecycle state, and Zod input before changing data.",
      },
      {
        title: "Typed relational model",
        body: "Drizzle and PostgreSQL model sessions, players, courts, matches, queues, expenses, chat, and memories with explicit constraints.",
      },
      {
        title: "Small client boundaries",
        body: "Public RSVP, progressive forms, court controls, scoring, and realtime reconciliation run on the client. The rest of the page remains server-rendered.",
      },
    ],
    evidence: [
      "The deployed application supports session creation, public invitations, five play formats, court scoring, repayment tracking, chat, and recap stories.",
      "The database model covers users, sessions, guests, rosters, queues, matches, scores, expenses, messages, groups, and memories.",
      "Automated tests cover RSVP and waitlist rules, expense splitting, queue assignment, standings, permissions, rotation formats, and accessible interface behavior.",
      "The public repository documents authorization rules, domain structure, accessibility targets, integration boundaries, local setup, and quality commands.",
    ],
    images: [
      {
        src: "/images/projects/relay/invite.webp",
        alt: "Relay public pickleball invitation with session details, roster capacity, and guest RSVP controls",
        width: 2880,
        height: 1800,
        label: "Plan and RSVP",
      },
      {
        src: "/images/projects/relay/format.webp",
        alt: "Relay play setup showing Paddle Stack, Mix It Up, Court Climb, and Team Round Robin formats",
        width: 2880,
        height: 1800,
        label: "Play format",
      },
      {
        src: "/images/projects/relay/courts.webp",
        alt: "Relay active courts view with live scoring and the paddle queue",
        width: 2880,
        height: 1800,
        label: "Live courts",
      },
      {
        src: "/images/projects/relay/scoring.webp",
        alt: "Relay courtside scoring view with large team scores and touch controls",
        width: 2880,
        height: 1800,
        label: "Courtside scoring",
      },
    ],
    coverImage: {
      src: "/images/projects/relay/cover.webp",
      alt: "Relay product homepage introducing one shared workspace for an entire pickleball session",
      width: 2560,
      height: 1440,
    },
    repository: "https://github.com/vn-aj-vngrd/relay",
    liveUrl: "https://relay-pickleball.vercel.app/",
  },
  {
    slug: "roleway",
    name: "Roleway",
    category: "Full-stack web product · Job search",
    summary:
      "Roleway keeps jobs, applications, next actions, tasks, interviews, documents, and follow-ups in one private workspace, with optional AI drafts that remain under the user's control.",
    problem:
      "A serious job search spreads across browser tabs, spreadsheets, calendars, documents, and notes. As the number of applications grows, follow-ups are missed, preparation loses context, and it becomes difficult to decide what needs attention next.",
    solution:
      "Roleway separates jobs being reviewed from opportunities being actively pursued. Each opportunity holds its stage, next action, due date, tasks, notes, interviews, documents, and activity history. A Today view collects current work, while Assist prepares reviewable drafts only when the user requests them.",
    role: "Designed and built independently",
    status: "Live web product · Source available",
    featured: true,
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Turborepo",
      "Zod",
      "Vitest",
      "Playwright",
    ],
    decisions: [
      {
        title: "Separate discovery from active work",
        body: "A saved Job contains listing data. It becomes an Opportunity only when the user decides to pursue it, preventing the pipeline from becoming a second bookmarks folder.",
      },
      {
        title: "Make the next action explicit",
        body: "Every active opportunity can carry one concrete next action and due date. Today brings those actions together with interviews, tasks, follow-ups, and jobs waiting for review.",
      },
      {
        title: "Keep AI optional and approval-gated",
        body: "Tracking works without an AI provider. When a user connects one, Roleway sends only selected context, records the run, validates structured output, and leaves consequential changes for the user to approve.",
      },
      {
        title: "Protect workspace data at two boundaries",
        body: "PostgreSQL row-level security restricts records to their owner, while server actions authenticate the caller and constrain every mutation by user ID.",
      },
    ],
    architectureSummary:
      "Roleway is a TypeScript monorepo with a Next.js application and packages for domain rules, schemas, data, AI providers, configuration, and shared interface code. Supabase provides PostgreSQL, authentication, and row-level security.",
    architecture: [
      {
        title: "Next.js application",
        body: "Server Components load authenticated workspace data. Server Actions handle forms and mutations, while client components are limited to interactive controls, onboarding, tours, and local interface state.",
      },
      {
        title: "Domain and schema packages",
        body: "Opportunity stage transitions, tool permissions, and Zod schemas live outside route components so product rules can be tested without rendering the interface.",
      },
      {
        title: "Owned PostgreSQL records",
        body: "Jobs, opportunities, tasks, notes, interviews, documents, notifications, preferences, and AI runs are scoped to the authenticated workspace through row-level security and server-side checks.",
      },
      {
        title: "Provider-neutral AI boundary",
        body: "OpenAI, Anthropic, Gemini, OpenRouter, and compatible providers sit behind one structured-generation interface. User-supplied credentials are encrypted before storage and never enter browser code.",
      },
    ],
    evidence: [
      "The deployed product includes onboarding, job capture, a seven-stage opportunity pipeline, next actions, tasks, notes, interviews, documents, notifications, insights, settings, and account deletion.",
      "Assist supports user-selected providers and validates structured responses while keeping the rest of the workspace available without AI.",
      "Unit tests cover stage transitions, AI tool permissions, provider response parsing, credential encryption, URL validation, and job input validation.",
      "Playwright covers the public landing page, keyboard and mobile behavior, onboarding, opportunity creation, session protection, and typed confirmation for account deletion.",
      "The application is installable as a PWA. Its service worker caches versioned static assets but keeps authenticated pages and API responses on the network.",
    ],
    images: [
      {
        src: "/images/projects/roleway/pipeline.png",
        alt: "Roleway opportunity pipeline showing roles by stage with a next action on each application",
        width: 1180,
        height: 539,
        label: "Opportunity pipeline",
      },
      {
        src: "/images/projects/roleway/workspace.png",
        alt: "Roleway opportunity workspace with role details, tasks, application context, and the next action",
        width: 1180,
        height: 586,
        label: "Opportunity workspace",
      },
      {
        src: "/images/projects/roleway/preparation.png",
        alt: "Roleway interview preparation view with preparation tasks, documents, and an optional Assist action",
        width: 660,
        height: 441,
        label: "Interview preparation",
      },
    ],
    repository: "https://github.com/vn-aj-vngrd/roleway",
    liveUrl: "https://roleway.vercel.app/",
  },
  {
    slug: "viya",
    name: "Viya",
    category: "Mobile product · AI workspace",
    summary:
      "Viya is a mobile travel workspace for itineraries, budgets, documents, bookings, and trip readiness, with AI-assisted changes that travelers review before saving.",
    problem:
      "Travel plans are fragmented across messages, booking apps, receipts, maps, notes, and spreadsheets. Most AI travel tools stop after generating an itinerary.",
    solution:
      "Each trip has structured records for itinerary, budget, documents, bookings, readiness, and risks. The assistant can draft changes across those records, explain them, and wait for the traveler to approve them.",
    role: "Designed and built independently",
    status: "Mobile prototype · Source available",
    featured: true,
    stack: [
      "TypeScript",
      "React Native",
      "Expo",
      "Convex",
      "Clerk",
      "Zod",
      "Turborepo",
    ],
    decisions: [
      {
        title: "A workspace, not an itinerary generator",
        body: "Itinerary, budget, documents, bookings, readiness, and risks share one trip-scoped model.",
      },
      {
        title: "AI proposes; the traveler decides",
        body: "Generated changes are checked against shared schemas, explained to the traveler, and saved only after approval.",
      },
      {
        title: "Demo reliability without fake success",
        body: "Deterministic fixtures and fallbacks keep critical flows testable when a model or provider is unavailable.",
      },
    ],
    architectureSummary:
      "The mobile app, Convex backend, and AI provider layer share TypeScript and Zod contracts. Each layer can be tested or replaced without moving product rules into the interface.",
    architecture: [
      {
        title: "Mobile application",
        body: "Expo Router and React Native organize authentication, trip workspaces, Vault, budget, and readiness flows.",
      },
      {
        title: "Shared TypeScript contracts",
        body: "Pure TypeScript logic and Zod schemas keep the mobile application, backend functions, and generated output aligned.",
      },
      {
        title: "Convex backend",
        body: "Queries, mutations, storage, and user-owned trip records sit behind Clerk-backed identity checks.",
      },
      {
        title: "AI provider boundary",
        body: "Provider selection, structured generation, trip context, and deterministic fallbacks are kept behind one interface.",
      },
    ],
    evidence: [
      "Domain and backend contract tests cover trip modules, budgets, itinerary, readiness, Vault, and AI draft application.",
      "Shared schemas validate structured AI outputs before application code consumes them.",
      "Architecture, security, setup, testing, demo, and product decisions are documented in the public repository.",
      "An Android preview-build path and repeatable demo fixtures are documented for release review.",
    ],
    images: [
      {
        src: "/images/projects/viya/home.png",
        alt: "Viya home dashboard showing an active trip, readiness, budget, and travel ideas",
        width: 1290,
        height: 2796,
        label: "Trip home",
      },
      {
        src: "/images/projects/viya/ask.png",
        alt: "Ask Viya screen offering reviewable trip actions for budget, documents, and itinerary",
        width: 1290,
        height: 2796,
        label: "Ask Viya",
      },
      {
        src: "/images/projects/viya/budget.png",
        alt: "Viya trip budget screen showing planned spend, tracked expenses, and a receipt",
        width: 1290,
        height: 2796,
        label: "Trip budget",
      },
    ],
    repository: "https://github.com/vn-aj-vngrd/viya-app",
  },
  {
    slug: "acsfi",
    name: "ACSFI",
    category: "Full-stack nonprofit website · Headless CMS",
    summary:
      "ACSFI gives the Astro Charitable and Scholarship Foundation a public website for its mission, programs, activity reports, upcoming events, and contact information, backed by a CMS for ongoing updates.",
    problem:
      "The foundation needed one public source for its programs and community work. New activity reports, event details, statistics, and media also needed to be published without editing the website source for every update.",
    solution:
      "The website presents the foundation's mission, programs, stories, and contact details through a responsive Next.js frontend. A separate Strapi CMS stores hero media, programs, activities, statistics, quotes, and upcoming events for the public pages to retrieve through a typed API client.",
    role: "Designed and built the public website and CMS",
    status: "Live organization website · Source available",
    featured: true,
    stack: [
      "Next.js",
      "TypeScript",
      "Strapi",
      "MySQL",
      "Cloudinary",
      "Turborepo",
      "Bun",
      "Docker",
    ],
    decisions: [
      {
        title: "Separate presentation from content management",
        body: "The public website and Strapi administration run as separate applications. Foundation content can change through the CMS while the frontend keeps control of layout, interaction, and accessibility.",
      },
      {
        title: "Model activities as structured reports",
        body: "Each activity can store its title, date, venue, participants, objectives, purpose, narrative, authors, program relation, featured state, and media instead of reducing the work to a generic blog post.",
      },
      {
        title: "Pre-render public content",
        body: "Core pages are statically generated from the CMS. The stories index uses incremental regeneration so published activity reports can appear without rebuilding every request on the server.",
      },
      {
        title: "Keep deployments independent",
        body: "Turborepo manages the frontend and CMS in one repository, while Vercel, Docker, and the production API configuration allow each application to be built and deployed for its own runtime needs.",
      },
    ],
    architectureSummary:
      "A Bun and Turborepo monorepo contains a typed Next.js frontend and a Strapi backend. The frontend retrieves CMS content through authenticated server-side requests, while MySQL stores production content and Cloudinary serves managed media.",
    architecture: [
      {
        title: "Next.js public frontend",
        body: "The Pages Router provides the homepage, About, Programs, Stories, individual activity reports, Contact, and a custom not-found page. Static generation and incremental regeneration keep public pages fast to serve.",
      },
      {
        title: "Typed content boundary",
        body: "TypeScript models mirror Strapi entities for activities, programs, media, statistics, quotes, and upcoming events. One server-only fetch wrapper centralizes the API URL, bearer token, and response handling.",
      },
      {
        title: "Strapi content service",
        body: "Strapi collection and single types give administrators structured fields and program relationships. MySQL stores production records and Cloudinary handles uploaded images and files.",
      },
      {
        title: "Monorepo delivery",
        body: "Bun installs the workspaces, Turborepo coordinates tasks, Biome and Lefthook check staged code, and separate Docker configurations support the frontend and CMS runtimes.",
      },
    ],
    evidence: [
      "The live website includes Home, About, Programs, Stories, individual activity reports, Contact, responsive navigation, and the foundation brochure.",
      "The CMS defines structured content types for hero media, activities, programs, statistics, quotes, and upcoming events.",
      "Activity pages render program context, dates, venues, objectives, narratives, photo galleries, reading time, and share controls from CMS records.",
      "The homepage retrieves independent CMS resources in parallel, while the Stories route uses a 60-second incremental regeneration window.",
      "The repository documents local development, Vercel deployment, standalone Docker builds, MySQL production storage, Cloudinary media, and Biome checks.",
    ],
    images: [
      {
        src: "/images/projects/acsfi/home.png",
        alt: "ACSFI homepage with a community outreach photograph and the message Empowering communities, inspiring change",
        width: 1920,
        height: 1200,
        label: "Foundation homepage",
      },
      {
        src: "/images/projects/acsfi/programs.png",
        alt: "ACSFI programs page introducing charitable, educational, and social welfare programs",
        width: 1920,
        height: 1200,
        label: "Programs directory",
      },
      {
        src: "/images/projects/acsfi/story.png",
        alt: "ACSFI activity report showing the title, date, venue, photograph, and objectives of a relief activity",
        width: 1920,
        height: 1200,
        label: "Activity report",
      },
    ],
    repository: "https://github.com/vn-aj-vngrd/acsfi-app",
    liveUrl: "https://www.astro-foundation.com/",
  },
] satisfies readonly Project[];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
