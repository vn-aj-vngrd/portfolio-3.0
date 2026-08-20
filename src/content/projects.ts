import type { Project } from "@/types/content";

export const projects = [
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
] satisfies readonly Project[];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
