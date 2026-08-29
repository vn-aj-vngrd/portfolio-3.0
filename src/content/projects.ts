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
      src: "/images/projects/relay/landing-cover.webp",
      alt: "Relay landing page introducing one shared link for planning and playing a pickleball session",
      width: 2880,
      height: 2000,
    },
    repository: "https://github.com/vn-aj-vngrd/relay",
    liveUrl: "https://relay-pickleball.vercel.app/",
  },
  {
    slug: "roleway",
    name: "Roleway",
    category: "Full-stack web product · Job-search operating system",
    summary:
      "Roleway gives each focused job search its own Workspace, connecting Jobs, Opportunities, next actions, interviews, contacts, documents, and outcomes while an optional Agent prepares work that users approve.",
    problem:
      "A serious job search spreads across browser tabs, spreadsheets, calendars, documents, and notes. Different career targets blur together, follow-ups are missed, preparation loses context, and it becomes difficult to decide what deserves attention next.",
    solution:
      "An Account owns a Career Profile and multiple Workspaces, each with its own Jobs, Opportunities, preferences, people, documents, goals, and results. Home orders current work, Opportunities retain the complete dossier and one Next Action, and Roleway Agent prepares grounded drafts or internal changes without taking external action.",
    role: "Designed and built independently",
    status: "Live · Open source · Self-hostable",
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
        title: "Give each search its own Workspace",
        body: "An Account can hold separate Workspaces for different career targets. Preferences, Jobs, Opportunities, documents, people, goals, notifications, and analytics stay isolated instead of becoming one shared junk drawer.",
      },
      {
        title: "Separate discovery from committed work",
        body: "A Job stores discovered listing data. Tracking it creates an Opportunity with a stage and one concrete Next Action, so the active list represents deliberate work rather than another bookmarks folder.",
      },
      {
        title: "Prepare with Agent, approve every change",
        body: "Core tracking works without AI. Roleway Agent reads disclosed context, prepares grounded work, and presents exact internal mutations for approval; it cannot apply to jobs or contact employers.",
      },
      {
        title: "Protect data at two boundaries",
        body: "PostgreSQL row-level security scopes records to their owner and Workspace, while server actions independently authenticate callers and constrain mutations by owner and Workspace IDs.",
      },
    ],
    architectureSummary:
      "Roleway is a pnpm and Turborepo TypeScript monorepo. A Next.js application composes shared workflow rules and Zod schemas, while Supabase provides authentication, PostgreSQL, row-level security, and the durable records behind Workspaces and Agent runs.",
    architecture: [
      {
        title: "Next.js application",
        body: "Server Components load authenticated Workspace data and Server Actions handle mutations. Client components stay focused on interactive controls, editors, collection views, onboarding, and the installable PWA shell.",
      },
      {
        title: "Core and schema packages",
        body: "Opportunity transitions, workflow labels, Agent permissions, and Zod boundary schemas live in shared packages so domain rules can be tested independently of route components.",
      },
      {
        title: "Owner-scoped PostgreSQL",
        body: "Supabase migrations are the source of truth for Workspaces, Jobs, Opportunities, tasks, contacts, interviews, documents, notifications, analytics, and Agent records. Row-level security and server checks enforce ownership.",
      },
      {
        title: "Provider-neutral Agent boundary",
        body: "User-supplied provider credentials are encrypted server-side. Agent runs disclose their context, validate tool output, record steps and approvals, and keep external actions outside the available permission model.",
      },
    ],
    evidence: [
      "The deployed product includes multiple Workspaces, Home, Job Inbox, list and board Opportunity views, detailed Opportunity dossiers, contacts, interviews, documents, entity search, notifications, Insights, settings, export, account deletion, and an admin console.",
      "Public job URLs are fetched server-side with private-network blocking, redirect and size limits, and a per-user quota; Ashby, Greenhouse, and Lever use public job-board endpoints with JSON-LD and metadata fallbacks.",
      "Roleway Agent supports account-wide conversations, Workspace and Opportunity context, inspectable runs, provider-neutral connections, and exact approval cards while leaving core tracking available without AI.",
      "Unit tests cover workflow transitions, provider parsing, encrypted credentials, rich text, dates, URL safety, and validation. Playwright covers signup, onboarding, Workspaces, capture, Opportunity progression, application records, documents, interviews, Home, search, export, authorization, and account deletion.",
      "The Apache-2.0 repository is self-hostable. The PWA caches versioned static assets while authenticated pages and API responses remain network-only.",
    ],
    images: [
      {
        src: "/images/projects/roleway/opportunities-list.webp",
        alt: "Roleway Opportunities list showing an expanded Workspace rail, grouped stages, priorities, Next Actions, and due dates",
        width: 1280,
        height: 410,
        label: "Workspace opportunities",
      },
      {
        src: "/images/projects/roleway/home.webp",
        alt: "Roleway Home view ordering overdue and current work beside Workspace details, pulse, and active Opportunities",
        width: 1180,
        height: 736,
        label: "Workspace Home",
      },
      {
        src: "/images/projects/roleway/agent.webp",
        alt: "Roleway Agent preparing interview work and presenting an exact create-task proposal for user approval",
        width: 1080,
        height: 586,
        label: "Agent approval flow",
      },
    ],
    coverImage: {
      src: "/images/projects/roleway/landing-cover.webp",
      alt: "Roleway landing page introducing focused job-search Workspaces and one clear next move",
      width: 2880,
      height: 2000,
    },
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
