import type { ProductMatchEntry, Project } from "@/types/content";

const projectEntries = [
  {
    slug: "relay",
    name: "Relay",
    category: "Full-stack web product · Social sports",
    summary:
      "From the first invite to the final score, Relay keeps a pickleball session together. Find a court, bring the crew, run rotations, and share a Story—with an AI Agent to answer game questions and prepare plans for review.",
    match: {
      prompt:
        "A pickleball group coordinates the plan, roster, costs, courts, and scores across disconnected tools.",
      clue: "Look for the product built around one shared game link.",
      result:
        "Relay carries one pickleball session from invitation and RSVP through repayment, rotations, scoring, and the shared memory afterward.",
    },
    problem:
      "Recreational pickleball groups coordinate the plan, roster, venue cost, court order, and scores across group chats, spreadsheets, and whoever happens to remember what comes next.",
    solution:
      "Start with a court, a hosted game, or device-local Quick Play. A shared game link connects guest RSVPs, the roster, costs, rotations, scores, chat, and Stories. Agent adds a conversational entry point: explore authorized game details, answer one missing question at a time, and review a proposal before creating anything.",
    role: "Designed and built independently",
    status: "Live web product · Source available",
    featured: true,
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Supabase",
      "Resend",
      "PostgreSQL",
      "Drizzle ORM",
      "Vercel AI SDK",
      "OpenRouter",
      "Tiptap",
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
    agent: {
      summary:
        "A conversation grounded in the game, with a separate boundary for creation.",
      steps: [
        {
          title: "Explore the game",
          body: "Ask about upcoming games, rosters, invitations, groups, open games, Philippine courts, or Relay guides. Answers use permission-checked tools and link back to relevant records.",
        },
        {
          title: "Build a plan in conversation",
          body: "When enabled, prepare a hosted game or draft, replay a completed game, create a group, or set up device-local Quick Play. Agent reuses supplied details and asks one missing question at a time.",
        },
        {
          title: "Review, then create",
          body: "A server-owned proposal makes the schedule, audience, and creation effects explicit. Confirmation rechecks permissions; retries recover the saved result. Creation availability depends on current Agent settings.",
        },
      ],
      guideUrl: "https://relay.vanajvanguardia.tech/help/agent-capabilities",
    },
    architectureSummary:
      "Next.js Server Components load the initial session state. Server actions and queries enforce authorization and product rules. Agent uses Vercel AI SDK and OpenRouter to stream answers through permission-checked tools, with explicit approval before creation.",
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
        title: "Tool-calling Agent with scoped data",
        body: "An authenticated API validates requests and usage limits, then uses Vercel AI SDK, @ai-sdk/react, and OpenRouter for chat and streaming. Zod-validated tools read authorized games, groups, courts, and Help Center articles. Models receive selected fields, never a database connection or arbitrary SQL access.",
      },
      {
        title: "Review before creation",
        body: "When creation is enabled, Agent gathers missing details into owner-scoped proposals. Server-generated review cards require explicit approval; confirmation rechecks permissions and calls shared business commands. Stored results let retries recover an existing creation without duplicates. Provider credentials are encrypted server-side with AES-256-GCM.",
      },
      {
        title: "Small client boundaries",
        body: "Public RSVP, progressive forms, court controls, scoring, and realtime reconciliation run on the client. The rest of the page remains server-rendered.",
      },
    ],
    evidence: [
      "The public product presents a Philippines court finder, guest RSVP, device-local Quick Play, five play formats, court scoring, repayment tracking, and game chat. Story offers Court Pop, Studio, Scrapbook, Soft Serve, and Clubhouse themes with 1080 × 1920 export.",
      "The database model covers users, sessions, guests, rosters, queues, matches, scores, expenses, messages, groups, and memories.",
      "Automated tests cover RSVP and waitlist rules, expense splitting, queue assignment, standings, permissions, rotation formats, and accessible interface behavior.",
      "The public repository documents authorization rules, domain structure, accessibility targets, integration boundaries, local setup, and quality commands.",
    ],
    images: [
      {
        src: "/images/projects/relay/agent-demo.webp",
        alt: "Relay public Agent demo answering a question about the next game, roster, waitlist, and court booking with sample data",
        width: 1440,
        height: 1000,
        label: "Agent · public demo with sample data",
      },
      {
        src: "/images/projects/relay/story-themes.webp",
        alt: "Relay public Story showcase presenting five visual themes for invitations, photo memories, and results",
        width: 1440,
        height: 1000,
        label: "Story themes · public showcase",
      },
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
      src: "/images/projects/relay/landing-2026-09.webp",
      alt: "Updated Relay landing page with Create game, Quick Play, court discovery, and AI Agent entry points",
      width: 1440,
      height: 1000,
    },
    repository: "https://github.com/vn-aj-vngrd/relay",
    liveUrl: "https://relay.vanajvanguardia.tech/",
  },
  {
    slug: "roleway",
    name: "Roleway",
    category: "Full-stack web product · Job-search operating system",
    summary:
      "Roleway turns a scattered job search into focused Workspaces and clear next steps. Keep roles, interviews, people, and documents together, then ask its AI Agent to explore your search or prepare a Workspace, task, note, or Next Action for approval.",
    match: {
      prompt:
        "A job seeker is mixing career targets, next actions, interview notes, and follow-ups across spreadsheets, documents, and browser tabs.",
      clue: "Look for the product organized around focused Workspaces, Opportunities, and one clear Next Action.",
      result:
        "Roleway gives each focused search its own Workspace, keeps complete Opportunity context together, and lets an optional Agent prepare changes that the user must approve.",
    },
    problem:
      "A serious job search spreads across browser tabs, spreadsheets, calendars, documents, and notes. Different career targets blur together, follow-ups are missed, preparation loses context, and it becomes difficult to decide what deserves attention next.",
    solution:
      "An Account owns a Career Profile and multiple Workspaces, each with its own Jobs, Opportunities, preferences, people, documents, goals, and results. Home orders current work and each Opportunity retains its dossier and one Next Action. Agent helps users explore selected search context and create through conversation: clarify the destination, gather missing details, review the exact proposal, and open the saved result after approval.",
    role: "Designed and built independently",
    status: "Live · Open source · Self-hostable",
    featured: true,
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Supabase",
      "Resend",
      "PostgreSQL",
      "OpenAI API",
      "Anthropic API",
      "Gemini API",
      "OpenRouter",
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
        body: "Core tracking works without AI. Create and Explore are discoverable from the same + and / menu. Agent asks for missing details in chat, then presents the exact destination, text, and date for approval. Applications and employer messages remain user actions.",
      },
      {
        title: "Protect data at two boundaries",
        body: "PostgreSQL row-level security scopes records to their owner and Workspace, while server actions independently authenticate callers and constrain mutations by owner and Workspace IDs.",
      },
    ],
    features: [
      {
        title: "Capture, then commit",
        body: "Save a listing to Inbox. Track it as an Opportunity when it deserves active work, with a stage and one concrete Next Action.",
      },
      {
        title: "Prepare with the full record",
        body: "Keep interviews, contacts, preparation tasks, and document versions connected to the right Opportunity and Workspace.",
      },
      {
        title: "Know what needs attention",
        body: "Home brings due work and upcoming interviews together. Notifications and Insights reflect activity recorded in the product.",
      },
      {
        title: "Keep AI optional",
        body: "Connect your own provider for Agent; core tracking works without it. Provider charges are separate from Roleway capacity limits.",
      },
    ],
    agent: {
      summary:
        "Explore your search, turn a request into a proposal, and stay in control of every saved change.",
      steps: [
        {
          title: "Choose Create or Explore",
          body: "The + and / controls reveal supported actions. Explore helps prioritize work, prepare interview answers, and draft text from bounded Workspace and Opportunity context.",
        },
        {
          title: "Fill the gaps through chat",
          body: "Agent asks for missing details one at a time and clarifies the target Opportunity, Workspace, or date. It can propose a Workspace, task, note, or Next Action.",
        },
        {
          title: "Approve the exact change",
          body: "Review the destination and proposed fields before approval. Applied means the record was saved; Open takes you to the result. Expired or stale Next Action proposals require a fresh review.",
        },
      ],
      guideUrl: "https://roleway.vanajvanguardia.tech/help/agent-create",
    },
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
        body: "Next.js Server Actions gather bounded account context before one generation request through custom HTTP adapters for OpenAI, Anthropic, Gemini, OpenRouter, or compatible endpoints. Zod validates the structured answer and proposals before storage. Responses appear after completion; this implementation does not use Vercel AI SDK or token streaming. User-supplied credentials are encrypted with AES-256-GCM.",
      },
      {
        title: "Database-authorized Agent actions",
        body: "Agent proposes Workspaces, Opportunity tasks, Next Actions, and notes. Explicit approval invokes PostgreSQL functions that recheck ownership, proposal status, expiry, and domain rules in a transaction. Stale Next Action proposals are rejected instead of overwriting intervening edits. Explore uses bounded snapshots, not exhaustive account search. Documents contribute metadata; their full bodies, notes, activity history, and Help Center articles are not retrieved into model context.",
      },
    ],
    evidence: [
      "The deployed product includes multiple Workspaces, Home, Job Inbox, list and board Opportunity views, detailed Opportunity dossiers, contacts, interviews, documents, entity search, notifications, Insights, settings, export, account deletion, and an admin console.",
      "Public job URLs are fetched server-side with private-network blocking, redirect and size limits, and a per-user quota; Ashby, Greenhouse, and Lever use public job-board endpoints with JSON-LD and metadata fallbacks.",
      "The public Agent showcase demonstrates next-step exploration and conversational Workspace/task creation with illustrative data. The live creation guide documents all four supported changes, correction, rejection, and recovery. These demos do not execute live AI calls.",
      "Unit tests cover workflow transitions, provider parsing, encrypted credentials, rich text, dates, URL safety, and validation. Playwright covers signup, onboarding, Workspaces, capture, Opportunity progression, application records, documents, interviews, Home, search, export, authorization, and account deletion.",
      "The Apache-2.0 repository is self-hostable. The PWA caches versioned static assets while authenticated pages and API responses remain network-only.",
    ],
    images: [
      {
        src: "/images/projects/roleway/agent-demo.webp",
        alt: "Roleway public Agent demo gathering a Workspace objective in conversation before asking the user to review a proposal",
        width: 1440,
        height: 1000,
        label: "Conversational creation · illustrative public demo",
      },
      {
        src: "/images/projects/roleway/opportunities-list.webp",
        alt: "Roleway Opportunities list showing an expanded Workspace rail, grouped stages, priorities, Next Actions, and due dates",
        width: 1280,
        height: 410,
        label: "Workspace opportunities",
      },
      {
        src: "/images/projects/roleway/workspace-home.webp",
        alt: "Roleway Home view ordering overdue and current work beside Workspace details, pulse, and active Opportunities",
        width: 1440,
        height: 1400,
        label: "Workspace Home · illustrative public demo",
      },
    ],
    coverImage: {
      src: "/images/projects/roleway/landing-2026-09.webp",
      alt: "Updated Roleway landing page introducing its AI job-search assistant and an Opportunity list with Next Actions",
      width: 1440,
      height: 1000,
    },
    repository: "https://github.com/vn-aj-vngrd/roleway",
    liveUrl: "https://roleway.vanajvanguardia.tech/",
  },
  {
    slug: "viya",
    name: "Viya",
    category: "Mobile product · AI workspace",
    summary:
      "Viya is a mobile travel workspace for itineraries, budgets, documents, bookings, and trip readiness, with AI-assisted changes that travelers review before saving.",
    match: {
      prompt:
        "Travel plans are fragmented across bookings, budgets, documents, and messages.",
      clue: "Look for the mobile workspace built around one trip.",
      result:
        "Viya keeps the itinerary, budget, documents, bookings, readiness, and reviewable AI updates in one trip workspace.",
    },
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
    match: {
      prompt:
        "A nonprofit needs to publish its programs, activity reports, events, and media without changing website code for every update.",
      clue: "Look for the public organization website backed by a headless CMS.",
      result:
        "ACSFI presents the foundation's work through a Next.js website while Strapi manages programs, stories, statistics, events, and media behind it.",
    },
    problem:
      "The foundation needed one public source for its programs and community work. New activity reports, event details, statistics, and media also needed to be published without editing the website source for every update.",
    solution:
      "The website presents the foundation's mission, programs, stories, and contact details through a responsive Next.js frontend. A separate Strapi CMS stores hero media, programs, activities, statistics, quotes, and upcoming events for the public pages to retrieve through a typed API client.",
    role: "Designed and built the public website and CMS",
    status: "Live organization website",
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
    repository: undefined,
    liveUrl: "https://www.astro-foundation.com/",
  },
] satisfies readonly Project[];

type ProjectFilter = { featured?: boolean };

export const projectCatalog = {
  list(filter: ProjectFilter = {}) {
    if (filter.featured === undefined) return projectEntries;
    return projectEntries.filter(
      (project) => project.featured === filter.featured
    );
  },
  find(slug: string) {
    return projectEntries.find((project) => project.slug === slug);
  },
  next(slug: string) {
    const currentIndex = projectEntries.findIndex(
      (project) => project.slug === slug
    );
    return projectEntries[(currentIndex + 1) % projectEntries.length];
  },
  productMatches(): readonly ProductMatchEntry[] {
    return projectEntries.map((project) => ({
      slug: project.slug,
      name: project.name,
      href: `/work/${project.slug}`,
      ...project.match,
    }));
  },
};
