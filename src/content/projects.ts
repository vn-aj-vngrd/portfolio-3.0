import type { Project } from "@/types/content";

export const projects = [
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
      },
      {
        src: "/images/projects/viya/ask.png",
        alt: "Ask Viya screen offering reviewable trip actions for budget, documents, and itinerary",
        width: 1290,
        height: 2796,
      },
      {
        src: "/images/projects/viya/budget.png",
        alt: "Viya trip budget screen showing planned spend, tracked expenses, and a receipt",
        width: 1290,
        height: 2796,
      },
    ],
    repository: "https://github.com/vn-aj-vngrd/viya-app",
  },
  {
    slug: "crave-roulette",
    name: "Crave Roulette",
    category: "Web product · AI curation",
    summary:
      "A location-aware dining app that combines nearby restaurant data, AI curation, and a roulette flow to resolve “Where should we eat?”",
    problem:
      "People can spend longer comparing restaurants than enjoying the meal, especially when a group has only a vague mood or budget in mind.",
    solution:
      "The product retrieves nearby restaurants, interprets a selected vibe, and turns the final choice into a decisive roulette interaction with a veto path.",
    role: "Designed and built independently",
    status: "Live web product · Source available",
    featured: true,
    stack: [
      "Next.js",
      "TypeScript",
      "Gemini",
      "TomTom API",
      "Supabase",
      "Vitest",
    ],
    decisions: [
      {
        title: "Ground recommendations in nearby places",
        body: "TomTom supplies real restaurant candidates before Gemini interprets the selected mood.",
      },
      {
        title: "Keep the final choice playful",
        body: "The roulette and veto loop turns comparison into a decision without repeatedly fetching the same candidates.",
      },
      {
        title: "Keep failure recoverable",
        body: "Manual location entry and model fallbacks preserve the core flow when browser location or AI is unavailable.",
      },
    ],
    architectureSummary:
      "The flow stays linear: resolve a location, retrieve real candidates, curate them, then keep the decision loop in the session.",
    architecture: [
      {
        title: "Location",
        body: "Browser geolocation or a typed city and address establishes the search center.",
      },
      {
        title: "Restaurant retrieval",
        body: "A server-side TomTom request returns nearby restaurant candidates.",
      },
      {
        title: "Vibe curation",
        body: "Gemini ranks retrieved candidates against the selected mood and returns structured reasoning.",
      },
      {
        title: "Roulette session",
        body: "The client runs the spin, result, and veto loop against the curated candidate set.",
      },
    ],
    evidence: [
      "External provider keys stay in Server Actions rather than shipping to the browser.",
      "The live product supports manual location entry when geolocation is unavailable.",
      "Unit tests cover distance calculation and the supported vibe set.",
      "The public implementation documents empty, rate-limit, API-failure, and all-vetoed states.",
    ],
    images: [
      {
        src: "/images/projects/crave/location.png",
        alt: "Crave Roulette choice screen for AI vibe matching or manual restaurant entry",
        width: 390,
        height: 844,
      },
      {
        src: "/images/projects/crave/vibes.png",
        alt: "Crave Roulette vibe selection with options including Chill, Date Night, Budget, and Hidden Gem",
        width: 390,
        height: 844,
      },
    ],
    repository: "https://github.com/vn-aj-vngrd/crave-roulette",
    liveUrl: "https://crave-roulette.vercel.app/",
  },
  {
    slug: "watchbox",
    name: "WatchBox",
    category: "Collaborative project · full-stack web",
    summary:
      "A collaborative media tracker for organizing movies and shows into shareable collections with ratings, notes, and generated metadata.",
    problem:
      "Viewing histories, recommendations, ratings, and personal notes are usually split across streaming services and ad-hoc lists.",
    solution:
      "WatchBox gives authenticated users flexible collections composed from movie entries, notes, dividers, ratings, and sharing controls.",
    role: "Collaborative build",
    status: "Live authenticated product · Source available",
    featured: false,
    stack: [
      "Next.js",
      "TypeScript",
      "tRPC",
      "Prisma",
      "CockroachDB",
      "NextAuth",
    ],
    decisions: [
      {
        title: "Typed full stack",
        body: "tRPC and Prisma connect interface actions to a relational model with shared TypeScript contracts.",
      },
      {
        title: "Flexible collections",
        body: "A collection can compose text, media entries, and dividers rather than enforcing one fixed list shape.",
      },
      {
        title: "Ownership",
        body: "Authentication and protected routers scope user-owned boxes, favorites, sessions, and account data.",
      },
    ],
    architectureSummary:
      "The interface and protected API share TypeScript contracts while Prisma owns the relational collection model.",
    architecture: [
      {
        title: "Next.js interface",
        body: "Authenticated dashboards, collection composition, entries, reviews, notes, and account settings.",
      },
      {
        title: "Typed API",
        body: "Protected tRPC routers connect interface actions to server-side product operations.",
      },
      {
        title: "Relational data",
        body: "Prisma models users, boxes, flexible components, media entries, favorites, and sessions in CockroachDB.",
      },
    ],
    evidence: [
      "The public data model separates collections, composable content, media entries, favorites, and user ownership.",
      "Authentication and protected routers are visible in the public source.",
      "The repository records multiple named contributors; this portfolio does not claim sole ownership.",
    ],
    images: [
      {
        src: "/images/projects/watchbox/sign-in.png",
        alt: "WatchBox authentication screen with email and social sign-in options",
        width: 1280,
        height: 800,
      },
    ],
    repository: "https://github.com/vn-aj-vngrd/watchbox",
    liveUrl: "https://watchbox.vercel.app/",
  },
] satisfies readonly Project[];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
