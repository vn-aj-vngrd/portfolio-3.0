import type { Project } from "@/types/content";

export const projects = [
  {
    slug: "relay",
    name: "Relay",
    category: "Full-stack web product · Social sports",
    summary:
      "A mobile-first pickleball session product that carries one game from invitation and RSVP through repayment tracking, court rotations, scoring, and the shared memory afterward.",
    problem:
      "Recreational pickleball groups coordinate the plan, roster, venue cost, court order, and scores across group chats, spreadsheets, and whoever happens to remember what comes next.",
    solution:
      "Relay makes the session the shared product surface: a host creates one game, sends one public link, coordinates the roster and costs, then runs courts and scoring from the same workspace.",
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
        body: "The plan, roster, expenses, courts, queue, matches, chat, and memories all return to one understandable session instead of separate management screens.",
      },
      {
        title: "Let the shared link carry the plan",
        body: "Invitees can understand time, place, capacity, cost, and booking status—and RSVP by name—before creating an account.",
      },
      {
        title: "Design for courtside use",
        body: "Large score controls, deterministic rotations, visible queue state, and focused live views prioritize fast one-handed decisions beside the court.",
      },
    ],
    architectureSummary:
      "A server-first Next.js application keeps authorization and product rules near feature-owned data boundaries while narrow client components handle RSVP, scoring, and other immediate interactions.",
    architecture: [
      {
        title: "Feature-owned domain",
        body: "Session, roster, payment, match, queue, group, and notification rules live beside their schemas, actions, queries, and focused UI.",
      },
      {
        title: "Server-authorized workflows",
        body: "Server Components render initial product state; mutations validate identity, role, lifecycle, and Zod input before writing.",
      },
      {
        title: "Typed relational model",
        body: "Drizzle and PostgreSQL model sessions, players, courts, matches, queues, expenses, chat, and memories with explicit constraints.",
      },
      {
        title: "Selective live interaction",
        body: "Small client boundaries own public RSVP, progressive forms, court controls, scoring, and realtime reconciliation rather than turning the application into one client bundle.",
      },
    ],
    evidence: [
      "The deployed product exposes a complete product story from creation and public invitation through play formats, scoring, repayment coordination, and session memory.",
      "Database-backed workflows cover authentication, session creation, guest RSVP and waitlisting, rosters, queue setup, matches, persistent scoring, standings, chat, and profiles.",
      "Automated tests cover RSVP and waitlist rules, expense splitting, queue assignment, standings, permissions, rotation formats, and accessible interface behavior.",
      "The public repository documents product principles, authorization, domain modeling, architecture, accessibility targets, integration boundaries, and quality commands.",
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
      "A mobile AI travel workspace that brings itineraries, budgets, documents, bookings, and readiness into one trip-scoped product.",
    problem:
      "Travel plans are fragmented across messages, booking apps, receipts, maps, notes, and spreadsheets. Most AI travel tools stop after generating an itinerary.",
    solution:
      "Viya models each trip as a structured workspace and lets AI propose reviewable updates across itinerary, budget, Vault, bookings, readiness, and risks.",
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
        body: "Generated changes are validated, explained, and presented as drafts before they touch workspace records.",
      },
      {
        title: "Demo reliability without fake success",
        body: "Deterministic fixtures and fallbacks keep critical flows testable when a model or provider is unavailable.",
      },
    ],
    architectureSummary:
      "Trip data, mobile UI, and AI generation share contracts while remaining separate enough to test and change independently.",
    architecture: [
      {
        title: "Native product",
        body: "Expo Router and React Native organize authentication, trip workspaces, Vault, budget, and readiness flows.",
      },
      {
        title: "Shared domain",
        body: "Pure TypeScript logic and Zod schemas keep mobile, backend, and AI contracts aligned.",
      },
      {
        title: "Convex backend",
        body: "Queries, mutations, storage, and user-owned trip records sit behind Clerk-backed identity checks.",
      },
      {
        title: "AI provider layer",
        body: "Provider selection, structured generation, trip context, and deterministic fallbacks stay behind one boundary.",
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
