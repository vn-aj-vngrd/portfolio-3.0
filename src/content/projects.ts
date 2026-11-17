import type { ProductMatchEntry, Project } from "@/types/content";

function aqdScreen(file: string, label: string, alt: string) {
  return {
    src: `/images/projects/aqd/${file}.webp`,
    alt,
    width: 1320,
    height: 2868,
    label,
  } as const;
}

function viyaScreen(file: string, label: string, alt: string) {
  return {
    src: `/images/projects/viya/${file}.webp`,
    alt,
    width: 1320,
    height: 2868,
    label,
  } as const;
}

function acsfiScreen(file: string, label: string, alt: string, height = 1200) {
  return {
    src: `/images/projects/acsfi/${file}.webp`,
    alt,
    width: 1920,
    height,
    label,
  } as const;
}

function balayScreen(file: string, label: string, alt: string) {
  return {
    src: `/images/projects/balay/${file}.webp`,
    alt,
    width: 1920,
    height: 1200,
    label,
  } as const;
}

function qsmScreen(file: string, label: string, alt: string) {
  return {
    src: `/images/projects/qsm/${file}.webp`,
    alt,
    width: 1920,
    height: 1200,
    label,
  } as const;
}

function relayScreen(
  file: string,
  label: string,
  alt: string,
  width = 2880,
  height = 1800
) {
  return {
    src: `/images/projects/relay/${file}.webp`,
    alt,
    width,
    height,
    label,
  } as const;
}

function rolewayScreen(
  file: string,
  label: string,
  alt: string,
  width: number,
  height: number
) {
  return {
    src: `/images/projects/roleway/${file}.webp`,
    alt,
    width,
    height,
    label,
  } as const;
}

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
      "Start with a court, a hosted game, or device-local Quick Play. A shared game link connects guest RSVPs, the roster, costs and repayment status, rotations, scores, chat, and Stories. Court Finder searches a Philippines-wide directory, and personal game insights summarize hosted games and match records. Agent adds a conversational entry point: explore authorized game details, answer one missing question at a time, and review a proposal before creating anything.",
    role: "Designed and built independently",
    status: "Live web product · Source available",
    featured: true,
    tags: ["ai", "web"],
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
    journey: {
      screenShape: "wide",
      title: "One game, from the first link to the last score.",
      summary:
        "Relay is one game link that grows with the session. The screens below follow a game in order: meet the product, plan and invite, find a court, track who is coming, run the courts, settle the cost, keep the memory, ask Agent, and come back for more. Public pages are shown with the product’s own sample data; signed-in screens use seeded games.",
      chapters: [
        {
          label: "Meet Relay",
          title: "Start from a link, a court, or Quick Play.",
          lead: "The landing page leads with the promise, pickleball plans in one link, and offers four ways in before anyone signs up.",
          points: [
            "Create game, Start Quick Play, Find a court, and Explore open games all work without an account; logging in is for keeping a game.",
            "A sample game shows what the one link carries: who is going, the live court, the cost per player, and the chat.",
            "A feature carousel walks the whole flow in order: find a court, set the plan, invite players, play, split the cost, and keep the memory.",
          ],
          screens: [
            relayScreen(
              "landing-2026-11",
              "Landing",
              "Relay landing page with the headline Plan the game, Share the link, Play, and Create game, Start Quick Play, Find a court, and Explore open games actions"
            ),
            relayScreen(
              "features-overview",
              "What Relay does",
              "Relay See what Relay does carousel with cards for finding a court, setting the plan, and inviting players with one link"
            ),
            relayScreen(
              "sample-game",
              "One link, everyone in the loop",
              "Relay sample game Saturday Night Pickle showing the roster, a live court score, the cost per player, and game chat"
            ),
          ],
        },
        {
          label: "Plan the game",
          title: "Set the court, time, and access in four steps.",
          lead: "A short Plan, Players and access, Details, and Review flow ends in one shared game link.",
          points: [
            "The plan starts with a name, a court from Relay’s directory or one you type, a date, and start and end times.",
            "Hosts set the player limit and who can find the game, then optionally add booking and payment details before publishing.",
            "Players see the same facts the host entered: venue, capacity, waitlist, estimated cost, and booking status.",
          ],
          screens: [
            relayScreen(
              "plan-and-invite",
              "Plan and invite",
              "Relay Create a game form at step one next to a published Saturday Night Pickle game card with a guest name field and Going, Maybe, and Can’t go buttons"
            ),
            relayScreen(
              "create-game",
              "Create game · step 1 of 4",
              "Relay Create a game page at step one of four with game name, court, date, start time, and end time fields",
              1260,
              952
            ),
            relayScreen(
              "guest-rsvp",
              "Guest RSVP",
              "Relay guest RSVP card with a name field, playing experience, Going, Maybe, and Can’t go buttons, and a Share game action"
            ),
          ],
        },
        {
          label: "Find a court",
          title: "Search courts across the Philippines.",
          lead: "Court Finder lists 305 places on a map, and a court can start a game with its details already filled in.",
          points: [
            "Search by court, city, province, or amenity, or use your location.",
            "Filter by setting, access, parking, price, and availability; restricted facilities stay listed when their access and booking rules are clear.",
            "Relay links to directions and external booking. It does not reserve courts.",
          ],
          screens: [
            relayScreen(
              "court-finder",
              "Court Finder",
              "Relay Court Finder with a searchable list of 305 Philippines places beside a clustered map and filters for setting, access, parking, price, and availability"
            ),
            relayScreen(
              "court-search",
              "Courts near a city",
              "Relay landing Court Finder section with a list of Cebu courts and a map zoomed to Mandaue and Lapu-Lapu"
            ),
          ],
        },
        {
          label: "Know who is coming",
          title: "A roster, a response, and a place for the group.",
          lead: "The game overview answers the questions players ask in the chat: where, when, who is in, and what happens next.",
          points: [
            "Overview shows the date, court, duration, booking status, host note, and activity for Play, Payments, and Chat.",
            "Players answer Going, Maybe, or Can’t go; capacity and the waitlist stay authoritative, and an ended game shows its final roster.",
            "Groups keep recurring crews together, with owner and member roles and the next game for each.",
          ],
          screens: [
            relayScreen(
              "game-overview",
              "Game overview",
              "Relay game overview for Next Weekend Maybe with date, court, a note, a response card, and a Who’s playing roster",
              1260,
              952
            ),
            relayScreen(
              "game-ended",
              "Ended game",
              "Relay ended game Sunday Morning Rotations with a View recap button and a final roster",
              1260,
              952
            ),
            relayScreen(
              "groups",
              "Groups",
              "Relay Groups list showing four groups with member counts and owner or member roles",
              1260,
              952
            ),
          ],
        },
        {
          label: "Run the courts",
          title: "Pick a format, start the courts, and score from a phone.",
          lead: "Courtside controls favor large targets and clear state over exhaustive configuration.",
          points: [
            "Five formats: Paddle Stack, Mix It Up, Balanced Mix, Court Climb, and Team Round Robin, with partner style and queue rules.",
            "Active courts show the match in progress, big team scores, plus and minus controls, and Finish match; the queue shows who is up next.",
            "After the game, the recap keeps matches, points played, court minutes, and each result with its winner.",
          ],
          screens: [
            relayScreen(
              "play-setup",
              "Set up Play",
              "Relay Set up Play panel listing five formats next to an Active courts panel with a live court score"
            ),
            relayScreen(
              "courtside-score",
              "Courtside score",
              "Relay scoreboard at courtside scale with two large team scores and a Finish match button"
            ),
            relayScreen(
              "game-recap",
              "Final recap",
              "Relay final recap for Sunday Morning Rotations with matches, points played, court minutes, and match results",
              1500,
              812
            ),
          ],
        },
        {
          label: "Split the cost, keep talking",
          title: "Repayment and conversation stay with the game.",
          lead: "Relay tracks who has paid. It never moves the money; players pay the host their usual way.",
          points: [
            "The host enters the total and payment method; each player sees their share and can upload a screenshot as proof, which the host marks as paid.",
            "Hosts can adjust one player’s share without changing the rest, and a fixed per-player price is stated before anyone joins.",
            "Game chat carries arrival updates, parking notes, photos, and reactions, with notifications for invites, waitlist changes, and payments.",
          ],
          screens: [
            relayScreen(
              "split-cost",
              "Split the court cost",
              "Relay repayment card showing a ₱300 share, the host’s payment method, and a proof of payment upload"
            ),
            relayScreen(
              "game-chat",
              "Game chat",
              "Relay game chat with messages from players, day separators, a thumbs-up reaction, and a message box",
              1260,
              952
            ),
          ],
        },
        {
          label: "Keep the story",
          title: "Turn the game into something you can share.",
          lead: "A finished game becomes a vertical Story built from its results and the photos people add.",
          points: [
            "Five themes: Court Pop, Studio, Scrapbook, Soft Serve, and Clubhouse.",
            "Pick up to four photos, a layout, a look, and the details to show, then share or download a 1080 × 1920 image.",
            "Device photos stay in the Story; the game album is unchanged.",
          ],
          screens: [
            relayScreen(
              "story-templates",
              "Story templates",
              "Relay Story section showing three phone-sized Story templates with a score, a match count, and a photo scrapbook"
            ),
            relayScreen(
              "story-builder",
              "Story builder",
              "Relay Story builder with a Same court next week template and tabs for Photos, Layout, Look, and Details",
              1260,
              952
            ),
          ],
        },
        {
          label: "Ask Agent",
          title: "Get back to the game in plain language.",
          lead: "Agent answers from the games, groups, and courts you are allowed to see, and prepares plans for review before anything is created.",
          points: [
            "Ask when the next game is, who is joining, which courts are nearby, or how Relay works; answers link back to the records.",
            "When creation is enabled, Agent asks one missing question at a time and shows a proposal to approve.",
            "Free hosts get 50 Agent messages a month; saved chats can be reopened.",
          ],
          screens: [
            relayScreen(
              "agent-landing",
              "Agent",
              "Relay Agent section with a sample conversation asking when the next game is and who is joining"
            ),
            relayScreen(
              "agent-chat",
              "Agent chat",
              "Relay Agent page with suggested prompts such as Help me create a game and Find courts near me",
              1500,
              812
            ),
          ],
        },
        {
          label: "Come back to it",
          title: "Try it first, then keep your games.",
          lead: "Quick Play needs no account and stays on the device; signing in keeps games, history, and insights.",
          points: [
            "Quick Play takes four to twenty-four names, a format, and a review, then runs rotations and scores locally.",
            "Home lists recent games, and personal insights show games hosted and played, match record, and points for fun.",
            "Free hosts get twelve games a month; Plus and Pro are listed as coming soon.",
          ],
          screens: [
            relayScreen(
              "quick-play",
              "Quick Play",
              "Relay Quick Play step one with player name fields, a Paste names action, and an Add player option"
            ),
            relayScreen(
              "pricing",
              "Pricing",
              "Relay pricing page with Free, Plus, and Pro plans showing games per month, photo storage, and Agent messages"
            ),
            relayScreen(
              "home",
              "Home",
              "Relay Home with a Ready for your next game heading, a list of what the link carries, and recent games",
              1500,
              812
            ),
            relayScreen(
              "insights",
              "Game insights",
              "Relay personal game insights with match record, win rate, games hosted and played, points, and recent games",
              1288,
              931
            ),
          ],
        },
      ],
    },
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
      "The public product presents guest RSVP, device-local Quick Play, five play formats, court scoring, repayment tracking with proof and host confirmation, and game chat. Court Finder lists 305 places on a map with setting, access, parking, price, and availability filters. Story offers Court Pop, Studio, Scrapbook, Soft Serve, and Clubhouse themes with 1080 × 1920 export.",
      "Signed-in players get personal game insights: games hosted and played, match record, win rate, points, and recent results. The database model covers users, sessions, guests, rosters, queues, matches, scores, expenses, messages, groups, and memories.",
      "2,789 automated tests passed in CI (Sep 2026), covering RSVP and waitlist rules, expense splitting, queue assignment, standings, permissions, rotation formats, and accessible interface behavior. Live Agent evals passed 52 of 54 checks over six runs on one model (Nov 2026); the prompt-injection marker was never printed. Agent also has saved chat history, reply feedback, and admin metrics and eval views.",
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
        src: "/images/projects/relay/courts.webp",
        alt: "Relay active courts view with live scoring and the paddle queue",
        width: 2880,
        height: 1800,
        label: "Live courts",
      },
      {
        src: "/images/projects/relay/court-finder.webp",
        alt: "Relay Court Finder showing a searchable list of Philippines pickleball courts beside a clustered map with setting, access, parking, price, and availability filters",
        width: 2880,
        height: 1800,
        label: "Court Finder · 305 places",
      },
      {
        src: "/images/projects/relay/insights.webp",
        alt: "Relay personal game insights showing match record, win rate, games hosted and played, points scored, and recent games",
        width: 1288,
        height: 931,
        label: "Personal game insights",
      },
    ],
    coverImage: {
      src: "/images/projects/relay/landing-2026-11.webp",
      alt: "Relay landing page headline Plan the game, Share the link, Play, with Create game, Quick Play, Find a court, and Explore open games actions above a sample game preview",
      width: 2880,
      height: 1800,
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
      "An Account owns a Career Profile and multiple Workspaces, each with its own Jobs, Opportunities, preferences, people, documents, goals, and results. Home orders current work and each Opportunity retains its dossier and one Next Action. Agent helps users explore selected search context and create through conversation: clarify the destination, gather missing details, stream progress, review the exact proposal, and open the saved result after approval.",
    role: "Designed and built independently",
    status: "Live · Open source · Self-hostable",
    featured: true,
    tags: ["ai", "web"],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Supabase",
      "Resend",
      "PostgreSQL",
      "Vercel AI SDK",
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
        body: "Core tracking works without AI. Create and Explore are discoverable from the same + and / menu. Agent asks for missing details in chat, then presents the exact destination, text, and date for approval. Interviews and contacts can be created too, but invitations, messages, and applications remain user actions.",
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
    journey: {
      screenShape: "wide",
      title: "A job search, one Workspace at a time.",
      summary:
        "Roleway keeps each search in its own Workspace and follows a role from discovery to outcome. The screens below walk the product in order. Public pages show the product’s own sample data; the Inbox and Opportunity screens come from a fictional Workspace.",
      chapters: [
        {
          label: "Meet Roleway",
          title: "A clear next move, with AI when you want it.",
          lead: "The landing page opens on the idea: every target gets a Workspace, and every serious role keeps one Next Action.",
          points: [
            "The hero shows a Workspace of Opportunities grouped by stage with a due Next Action beside each.",
            "Core tracking works without AI. Agent is optional and uses a provider you connect.",
            "Plans set capacity: Free includes one active Workspace; Plus and Pro, with more Workspaces and storage, are listed as coming soon.",
          ],
          screens: [
            rolewayScreen(
              "landing-2026-11",
              "Landing",
              "Roleway landing page headline Your job search with a clear next move above a sample Workspace of Opportunities grouped by stage",
              2880,
              1800
            ),
            rolewayScreen(
              "pricing",
              "Plans",
              "Roleway pricing with Free, Plus, and Pro plans showing active Workspaces and saved content",
              2880,
              2400
            ),
          ],
        },
        {
          label: "Start from Home",
          title: "The day’s work, ordered.",
          lead: "Home brings due work, follow-ups, interviews, and Jobs to review into one briefing for the active Workspace.",
          points: [
            "Next up groups overdue, today, and upcoming items, each linking to its Opportunity.",
            "Workspace details keep target roles, locations, industries, seniority, and work arrangement in view.",
            "Notifications collect interview reminders, Opportunity changes, and due tasks across all Workspaces.",
          ],
          screens: [
            rolewayScreen(
              "sample-home",
              "Workspace Home",
              "Roleway Workspace Home with a Next up briefing, Workspace details, Workspace pulse, and active Opportunities",
              2408,
              1888
            ),
            rolewayScreen(
              "sample-notifications",
              "Notifications",
              "Roleway Notifications grouping interview, Opportunity, and task updates with an At a glance summary",
              1928,
              1048
            ),
          ],
        },
        {
          label: "Capture, then commit",
          title: "Every Job gets a deliberate first decision.",
          lead: "A discovered listing lands in the Inbox. Tracking it creates an Opportunity; until then it is only a Job.",
          points: [
            "Add a Job by hand or import a public listing; Ashby, Greenhouse, and Lever endpoints and page metadata fill the details.",
            "The Inbox shows role, company, compensation, and description, then Track, Review later, or Dismiss.",
            "Tracking creates an Opportunity with a stage, a priority, and a first Next Action.",
          ],
          screens: [
            rolewayScreen(
              "sample-inbox",
              "Inbox review",
              "Roleway Inbox with a Job expanded to its details and actions to track it, review it later, or dismiss it",
              2608,
              1348
            ),
            rolewayScreen(
              "add-job",
              "Add job",
              "Roleway Add a job dialog with role title, company, description, location, compensation, work arrangement, and a Job URL import",
              1260,
              952
            ),
            rolewayScreen(
              "inbox-review",
              "Jobs to review",
              "Roleway Inbox listing three Jobs to review with an expanded Job and an Inbox overview",
              1260,
              952
            ),
          ],
        },
        {
          label: "Track serious roles",
          title: "List or board, one Next Action each.",
          lead: "Opportunities are grouped by stage and show priority, Next Action, and due date at a glance.",
          points: [
            "Work from the List by default and switch to the Board when moving stages is the work.",
            "Each Opportunity page keeps the description, tasks, interviews, documents, people, and activity together.",
            "Mark application submitted to record when, where, and what you sent; Roleway adds a follow-up and never contacts the employer.",
          ],
          screens: [
            rolewayScreen(
              "sample-opportunities",
              "Opportunities list",
              "Roleway Opportunities list grouped by Interested, Preparing, and Applied with priority, Next Action, and due date columns",
              2608,
              988
            ),
            rolewayScreen(
              "opportunity-dossier",
              "Opportunity dossier",
              "Roleway Opportunity page with tabs for Overview, Tasks, Interviews, Documents, People, and Activity, a Next Action, and a status panel",
              1260,
              952
            ),
          ],
        },
        {
          label: "Interviews, people, and documents",
          title: "Preparation stays attached to the role.",
          lead: "Conversations, contacts, and drafts belong to an Opportunity or to the whole Workspace.",
          points: [
            "Interviews list upcoming, next seven days, history, and a calendar, each with time zone and a preparation check.",
            "Contacts track relationship, linked Opportunity, and the next follow-up, with overdue ones surfaced first.",
            "Documents keep drafts and approved versions, such as resumes, research notes, and application answers, with a recently updated list.",
          ],
          screens: [
            rolewayScreen(
              "sample-interviews",
              "Interviews",
              "Roleway Interviews page listing upcoming conversations with dates, times, Opportunities, and a preparation check",
              2416,
              1348
            ),
            rolewayScreen(
              "sample-contacts",
              "Contacts",
              "Roleway Contacts table with recruiters, hiring managers, and referrals, their Opportunities, and follow-up dates",
              2416,
              1068
            ),
            rolewayScreen(
              "sample-documents",
              "Documents",
              "Roleway Document library with resumes, research notes, and application answers marked Draft or Approved",
              2416,
              1228
            ),
          ],
        },
        {
          label: "See the whole search",
          title: "Insights that only claim what was recorded.",
          lead: "Account-wide activity across Workspaces, with a plain note about what the numbers can and cannot say.",
          points: [
            "Jobs captured, applications, interviews held, and offers recorded for a chosen period.",
            "Activity over time and a Needs attention panel for missing, overdue, or stale Next Actions.",
            "Conversion rates appear only after enough applications are recorded; counts never imply causation.",
          ],
          screens: [
            rolewayScreen(
              "sample-insights",
              "Insights",
              "Roleway Insights with jobs captured, applications, interviews held, offers, an activity chart, and a Needs attention panel",
              2608,
              1628
            ),
          ],
        },
        {
          label: "Ask Agent",
          title: "Explore, draft, and propose, then approve.",
          lead: "Agent reads the active Workspace or all Workspaces, streams its answer, and proposes changes you approve one by one.",
          points: [
            "The + and / menu offers Create and Explore prompts; Create covers Workspace, task, Next Action, note, interview, and contact.",
            "Agent asks for missing details in chat and shows the exact destination and fields before anything is saved.",
            "Connect your own provider and choose a model; saved conversations can be resumed.",
          ],
          screens: [
            rolewayScreen(
              "agent-workspaces",
              "Agent across Workspaces",
              "Roleway Agent opened across all Workspaces with a message box, a plus menu for Create and Explore actions, and a model selector",
              1288,
              930
            ),
            rolewayScreen(
              "sample-agent",
              "Sample conversation",
              "Roleway Agent sample conversation answering what to focus on today and preparing for an interview",
              1172,
              1234
            ),
            rolewayScreen(
              "agent-demo",
              "Conversational creation",
              "Roleway public Agent demo gathering a Workspace objective in conversation before asking the user to review a proposal",
              1440,
              1000
            ),
          ],
        },
      ],
    },
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
          body: "Agent asks for missing details one at a time and clarifies the target Opportunity, Workspace, or date. It can propose a Workspace, task, Next Action, note, interview, or contact.",
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
        body: "A route handler authenticates the request, checks quota and scope, and gathers bounded context. A Vercel AI SDK ToolLoopAgent streams progress and the answer through the OpenAI, Anthropic, Gemini, OpenRouter, or compatible provider the user connected, calling scoped read tools rather than raw SQL. Zod validates the structured answer and proposals before they are saved with the conversation. The stream is feedback; only the saved run counts. User-supplied credentials are encrypted on the server.",
      },
      {
        title: "Database-authorized Agent actions",
        body: "Agent proposes Workspaces, Opportunity tasks, Next Actions, notes, interviews, and contacts. Explicit approval invokes PostgreSQL functions that recheck ownership, proposal status, expiry, and domain rules in a transaction. Stale Next Action proposals are rejected instead of overwriting intervening edits. Explore uses bounded snapshots, not exhaustive account search. Documents contribute metadata; their full bodies, notes, activity history, and Help Center articles are not retrieved into model context.",
      },
    ],
    evidence: [
      "The deployed product includes multiple Workspaces, Home, Job Inbox, list and board Opportunity views, detailed Opportunity dossiers, contacts, interviews, documents, entity search, notifications, Insights, settings, export, account deletion, and an admin console.",
      "Public job URLs are fetched server-side with private-network blocking, redirect and size limits, and a per-user quota; Ashby, Greenhouse, and Lever use public job-board endpoints with JSON-LD and metadata fallbacks.",
      "The public Agent showcase demonstrates next-step exploration and conversational Workspace/task creation with illustrative data. The live creation guide documents the supported changes, correction, rejection, and recovery. These demos do not execute live AI calls. Signed in, Agent reads across Workspaces or one fixed scope, saves resumable conversations, and lets the user choose a connected model.",
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
        src: "/images/projects/roleway/agent-workspaces.webp",
        alt: "Roleway Agent opened across all Workspaces with a message box, a plus menu for Create and Explore actions, and a model selector",
        width: 1288,
        height: 930,
        label: "Agent across Workspaces",
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
      src: "/images/projects/roleway/landing-2026-11.webp",
      alt: "Roleway landing page headline Your job search with a clear next move, above a sample Workspace of Opportunities grouped by stage with Next Actions",
      width: 2880,
      height: 1800,
    },
    repository: "https://github.com/vn-aj-vngrd/roleway",
    liveUrl: "https://roleway.vanajvanguardia.tech/",
  },
  {
    slug: "qsm",
    name: "QSM",
    category: "Offline-first web and tablet system · Maritime safety",
    summary:
      "QSM moves a ship-management company’s paper safety management system onto a shore-office web app and vessel tablets. Office staff design forms, manuals, and circulars; crews fill them in offline; and three AI features turn legacy PDFs into structured forms, help write controlled documents, and answer questions from permission-checked data.",
    match: {
      prompt:
        "A fleet runs its safety checklists and manuals on paper, and the ships are often offline.",
      clue: "Look for the office web app paired with vessel tablets that keep working without a connection.",
      result:
        "QSM lets the office publish controlled forms, manuals, and circulars to each vessel, where crews complete them offline and sync when a connection returns.",
    },
    problem:
      "A ship-management company ran its safety management system on paper: checklists, manuals, and fleet notices were printed, filled in by hand, and sent back to the office. Vessels are offline for long stretches, every document is controlled and versioned, and hundreds of existing PDF forms had to be rebuilt before anything could go digital.",
    solution:
      "The office designs block-based forms, controlled documents, and circulars on the web, sends them through a maker, checker, and approver workflow, and publishes them to each vessel. Shared tablets on board hold a local database, so crews read manuals and complete forms offline and sync later. AI Import converts a legacy PDF into an editable form draft, AI Editor helps write and revise documents, and an in-app assistant answers from data the user is allowed to see.",
    role: "Co-built with one other engineer; led AI, import, export, and infrastructure",
    status: "In production · Client work · Closed source",
    featured: true,
    tags: ["ai", "web", "mobile"],
    stack: [
      "TypeScript",
      "React",
      "TanStack Router",
      "React Native",
      "Expo",
      "PowerSync",
      "Hono",
      "oRPC",
      "PostgreSQL",
      "Drizzle ORM",
      "Redis",
      "BullMQ",
      "Vercel AI SDK",
      "Docker",
    ],
    decisions: [
      {
        title: "Treat the ship as offline by default",
        body: "PostgreSQL is the source of truth, and each tablet holds a SQLite copy kept in step by PowerSync. Sync rules are scoped to the vessel, so a device receives only its own forms, documents, and circulars, and submissions made at sea upload when a connection returns.",
      },
      {
        title: "Treat model output as untrusted input",
        body: "Nothing a model returns is saved as it arrives. An imported form is parsed and validated against the same schema the designer uses, repaired when it fails, checked for leaked prompt text, and reviewed against the page image. It then lands as a draft beside the source PDF for a person to correct.",
      },
      {
        title: "One form definition, three renderers",
        body: "A form template is one block-based schema. The web app, the tablet app, and the PDF export each render it, and parity between them is documented and tested so a checklist looks the same on screen, on board, and on paper.",
      },
      {
        title: "Controlled content keeps its history",
        body: "Forms, documents, and circulars are versioned, pass through a maker, checker, and approver workflow before release, and keep an audit log. Submissions keep their own version history, and the office can restore an earlier version.",
      },
    ],
    agent: {
      title: "AI features",
      summary:
        "Three AI features, each behind an admin switch, a permission check, and a per-user daily limit.",
      steps: [
        {
          title: "AI Import: a legacy PDF becomes a structured form",
          body: "The browser extracts each page’s text and image from the PDF, and the server queues the job. The model drafts one page per call. The draft is validated against the form schema; if it fails, a repair prompt gets one attempt, then a full retry at temperature 0. A guard rejects output that leaks prompt text, and a visual review pass compares the page image with the draft and returns corrected blocks. The result opens as a draft in a split screen next to the source.",
        },
        {
          title: "AI Editor: streamed help inside controlled documents",
          body: "In the document and circular editors, a writer can improve writing, fix spelling, make formal, simplify, or ask for anything in their own words. The system prompt carries fixed rules, such as never inventing regulations, vessel facts, deadlines, approvals, or signatures, plus guidelines an administrator sets for each module. The answer streams into the editor for the writer to accept or discard.",
        },
        {
          title: "Assistant: answers from what the user may see",
          body: "A floating assistant sends the current screen’s route, module, and visible facts with the question. The server chooses the relevant modules and builds context from permission-checked database summaries, capped at 8,000 characters. The prompt forbids inventing totals, implying access to hidden records, or claiming an action was performed.",
        },
        {
          title: "Provider-neutral, capped, and audited",
          body: "An administrator chooses Google, Anthropic, or any OpenAI-compatible provider and model at runtime. API keys are encrypted with AES-GCM and shown masked, and a connection test reports whether the model accepts images. Each user has a daily limit per feature (50 editor requests, 50 imports, 75 assistant messages), and every call is written to the audit log with its provider, model, and token count.",
        },
      ],
    },
    architectureSummary:
      "A Bun and Turborepo monorepo holds three apps (web, tablet, and API server) and thirteen shared packages. Typed oRPC contracts connect the clients to a Hono server; PostgreSQL holds the data, PowerSync carries it to the tablets, and a queue runs AI imports and PDF exports in the background.",
    architecture: [
      {
        title: "Typed contracts end to end",
        body: "The web and tablet apps call a Hono server through shared oRPC contracts, so a change to an API shape fails type checking in every client that uses it.",
      },
      {
        title: "Relational model",
        body: "PostgreSQL with Drizzle ORM models forms, submissions, documents, circulars, vessels, crew, devices, roles, approvals, and audit history across 58 tables and 69 migrations.",
      },
      {
        title: "Offline sync",
        body: "PowerSync replicates each vessel’s slice of PostgreSQL into SQLite on its tablets and queues local writes for upload. Devices are enrolled with provisioning codes.",
      },
      {
        title: "AI package",
        body: "One package owns prompts, schemas, provider selection, limits, and audit helpers on the Vercel AI SDK. Imports run as BullMQ jobs with a five-minute timeout and report completion over a realtime channel, with polling as the fallback. The editor and assistant stream their answers.",
      },
      {
        title: "Export engine",
        body: "PDF exports render the same React templates on the server and print them with Playwright, so the exported form matches what the office designed.",
      },
      {
        title: "Self-hosted delivery",
        body: "Docker Compose runs the server, web app, PostgreSQL, Redis, object storage, and PowerSync behind Traefik on the company’s own server, with documented backup, recovery, and a staging-to-production cutover.",
      },
    ],
    evidence: [
      "The repository is private client work, so these figures are read from it rather than linked: 1,433 commits between Jan and Oct 2026, 703 of them mine.",
      "My commits lead the AI package, the import engine, the export engine, and the Docker infrastructure; my co-developer leads the tablet app.",
      "The codebase has 555 test files, 26 of them in the AI package, and 34 Maestro flows for the tablet app.",
      "The AI package validates every imported form against the designer’s own schema and has tests for parsing, repair, prompt building, and rate limits.",
      "The screenshots show a local instance with invented demo records. Client names, branding, documents, and vessel data are removed.",
    ],
    images: [
      qsmScreen(
        "designer",
        "Form designer",
        "QSM form designer with a block palette on the left, a demo engine room checklist on the canvas with a Yes, No, N/A table and a signature field, and table properties on the right"
      ),
      qsmScreen(
        "ai-import",
        "AI Import",
        "QSM AI Import workspace with a demo checklist PDF on the left, the form canvas on the right, and a Generating draft with AI status"
      ),
      qsmScreen(
        "ai-editor",
        "AI writing tools",
        "QSM document editor on a demo safety bulletin with the AI writing tools menu open: Ask AI anything, Improve Writing, Fix Spelling, Make Formal, and Simplify"
      ),
      qsmScreen(
        "assistant",
        "Assistant",
        "QSM dashboard with the assistant panel open, offering to summarize the dashboard and find items needing action, with Dashboard as its context"
      ),
      qsmScreen(
        "ai-settings",
        "AI settings",
        "QSM AI settings form with provider, model, base URL, and an empty API key field, plus switches for AI editor, AI import, and AI assistant"
      ),
      qsmScreen(
        "version-history",
        "Version history",
        "QSM version history for a demo form template showing version 2 beside version 1 with the added checklist rows highlighted"
      ),
    ],
    repository: undefined,
    liveUrl: undefined,
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
    tags: ["ai", "mobile"],
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
        title: "Philippine context built in",
        body: "Destination ranking, season and typhoon risk, and Philippines-first place search shape the suggestions before any model is asked.",
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
      "The trip agent’s 17 tools are scoped to one trip, and every proposed change is validated and saved as a draft rather than written to the trip.",
      "Budget, readiness, itinerary scheduling, and Philippine destination ranking live in pure TypeScript with their own unit tests.",
    ],
    images: [
      viyaScreen(
        "workspace",
        "Trip workspace",
        "Viya trip workspace for Cebu and Bohol Escape with a typhoon-watch next step and rows for itinerary, places, bookings, readiness, budget, risks, and drafts"
      ),
      viyaScreen(
        "agent-draft",
        "Ask Viya",
        "Viya chat in a trip saving a draft for a relaxed Day 4 beach afternoon with a weather note, a Draft ready to review card, and a Review drafts button"
      ),
      viyaScreen(
        "budget",
        "Trip budget",
        "Viya budget showing 18,530 pesos spent of 60,000, 31,800 planned in the itinerary, and a breakdown by booking, expenses, and category"
      ),
      viyaScreen(
        "itinerary",
        "Itinerary",
        "Viya itinerary with Day 1 and Day 2 of a Cebu and Bohol trip listing timed stops with durations, locations, and daily totals"
      ),
    ],
    journey: {
      title: "From a place to think about, to a trip you have run.",
      summary:
        "Viya follows one trip through its life: find somewhere to go, start the trip, plan the days, track bookings and money, check readiness, keep the papers, ask the agent, run the day, and look back. Every screen below comes from the app running on an iPhone 17 Pro Max with fictional seeded trips. The places and businesses are real; the travelers are made up.",
      chapters: [
        {
          label: "Find a place",
          title: "Ideas ranked for the Philippines, by season.",
          lead: "Discover starts from where you are going and when, not from a feed of photos.",
          points: [
            "Destinations are ranked from a built-in set of Philippine places by their best and avoid months, typhoon exposure, budget, and the traveler’s preferences.",
            "Each card says why it fits: best season, the usual weather, trip length, and the province.",
            "Once a trip exists, Discover turns to it: a season warning for its dates and a better-suited alternative to consider.",
          ],
          screens: [
            viyaScreen(
              "discover",
              "Discover",
              "Viya Discover with the next trip Cebu and Bohol Escape, Philippine destination cards for Bacolod and Vigan with Best season badges, and a typhoon warning for the trip dates"
            ),
          ],
        },
        {
          label: "Start a trip",
          title: "Three steps from a destination to a workspace.",
          lead: "A trip needs a place, dates, and who is going. Everything else can be filled in later.",
          points: [
            "Destination search is Philippines-first, with suggestions from the same ranking as Discover.",
            "A destination and dates passed in from Discover land on Review with a default name taken from the place, such as Cebu and Bohol Trip.",
            "Creating the trip also generates its itinerary days and a baseline readiness checklist, so the workspace is useful on first open.",
          ],
          screens: [
            viyaScreen(
              "create-destination",
              "Where to",
              "Viya Where to step with a destination field, suggested Philippine places Vigan, Sagada, Bacolod, La Union, and Tagaytay, and an Ask Viya instead option"
            ),
            viyaScreen(
              "create-review",
              "Review",
              "Viya trip review step showing the destination Cebu and Bohol, dates 12 to 16 Dec, a name field with the default Cebu and Bohol Trip, traveler type, style, pace, and budget"
            ),
          ],
        },
        {
          label: "One workspace",
          title: "Everything about a trip lives in one place.",
          lead: "The workspace opens on the one thing that needs attention, then lists every part of the trip with its state.",
          points: [
            "Next up is chosen from the trip’s state: an urgent risk first, then budget pressure, then departure prep, then the next booking to make.",
            "Each row shows live counts, such as 33 stops across 5 of 5 planned days, 4 of 7 bookings made, 57% ready, and what is left to spend.",
            "The Trips list keeps upcoming, completed, and early-stage trips side by side with a countdown or status.",
          ],
          screens: [
            viyaScreen(
              "workspace",
              "Trip workspace",
              "Viya trip workspace for Cebu and Bohol Escape with a Late-November typhoon watch next step and rows for itinerary, places, bookings, readiness, budget, risks, and Drafts from Viya"
            ),
            viyaScreen(
              "trips",
              "All trips",
              "Viya Trips list with Cebu and Bohol Escape in 12 days, Siargao Surf Week completed, and Palawan El Nido to Coron in 90 days, with All, Upcoming, and Past filters and a search field"
            ),
            viyaScreen(
              "early-trip",
              "An early trip",
              "Viya workspace for a Palawan trip 90 days away with nothing planned yet, a Book ferry next step, and empty itinerary, bookings, and budget rows"
            ),
          ],
        },
        {
          label: "Plan the days",
          title: "A day-by-day plan that checks itself.",
          lead: "Itinerary days follow the trip dates, and a stop is a time, a place, and a cost.",
          points: [
            "Days are generated from the trip dates. Changing the dates moves existing days and stops with them instead of dropping them.",
            "Stops are timed and ordered. Two stops that overlap are flagged, and a stop can move to another day.",
            "Skipped stops stay visible but struck through, and stay out of the budget.",
            "Saved places that are not on a day yet wait in their own list until they are assigned.",
          ],
          screens: [
            viyaScreen(
              "itinerary",
              "Days",
              "Viya itinerary listing Day 1 and Day 2 of the Cebu and Bohol trip with timed stops such as Fly Manila to Cebu, Basilica del Santo Niño, and Kawasan Falls canyoneering, plus daily totals"
            ),
            viyaScreen(
              "day-plan",
              "One day",
              "Viya Day 2 view with a summary, timed stops with costs, a skipped sardine-run stop shown struck through, a pace setting, and an Add stop button"
            ),
            viyaScreen(
              "places",
              "Places",
              "Viya itinerary Places tab with three places not on a day yet and a list of places assigned to Day 1"
            ),
          ],
        },
        {
          label: "Book it",
          title: "What is booked, and what still needs booking.",
          lead: "Bookings are grouped by type with a status, so the gaps are as visible as the confirmations.",
          points: [
            "Flights, stays, transport, and activities each show provider, date, cost, and status.",
            "The workspace reads the same list: 4 of 7 booked, with the next booking to make named in Next up.",
            "Booked items carry their confirmation reference into Travel Mode.",
          ],
          screens: [
            viyaScreen(
              "bookings",
              "Bookings",
              "Viya bookings list showing 4 of 7 booked with flights and a stay confirmed, a ferry booked, and a second stay and a countryside tour marked Not booked"
            ),
          ],
        },
        {
          label: "Know the budget",
          title: "Money counted once.",
          lead: "The budget separates what is spent from what is only planned, so a number never means two things.",
          points: [
            "Spent is booked costs plus logged expenses. An expense linked to a booking replaces the booking’s quoted cost instead of adding to it.",
            "Planned itinerary costs are estimates and reduce what is left, but are not counted as spent.",
            "The daily safe amount divides what remains across the days still ahead, and the dashboard warns as spend nears or passes the total.",
            "Amounts in another currency are set aside rather than mixed into the total.",
          ],
          screens: [
            viyaScreen(
              "budget",
              "Budget",
              "Viya budget showing 18,530 pesos spent of 60,000, 9,670 left after 31,800 planned, a per-day safe amount, and a breakdown by bookings, logged expenses, planned itinerary, and category"
            ),
          ],
        },
        {
          label: "Be ready",
          title: "Readiness and risks, in order of urgency.",
          lead: "A readiness score and a short list of risks say what could go wrong before the trip does.",
          points: [
            "The checklist is split into To do, Risks, and Done, with due dates and priority, and a Mark done action on the next task.",
            "Risks carry a severity and a suggested action, such as keeping a flexible day during a typhoon watch or leaving earlier for a tight ferry transfer.",
            "The same open risks feed Next up and Travel Mode.",
          ],
          screens: [
            viyaScreen(
              "readiness",
              "Checklist",
              "Viya readiness at 57 percent with a Confirm booking coverage next task and a To do list of documents, bookings, packing, and backup-plan tasks with due dates"
            ),
            viyaScreen(
              "risks",
              "Risks",
              "Viya Risks tab listing a High late-November typhoon watch, a Medium unbooked Panglao stay, and a Medium tight ferry transfer, each with what to do"
            ),
          ],
        },
        {
          label: "Keep the papers",
          title: "Documents, notes, and the people on the trip.",
          lead: "Trip-level records sit beside the plan, not in a separate app.",
          points: [
            "Vault lists the documents a trip needs and whether each is saved or missing. A file added to Vault is read to suggest bookings and expenses for review.",
            "Notes are grouped by category, with chips to filter by food, booking, or reminder.",
            "Travelers list names and roles, including an emergency contact. Contact details stay out of anything sent to the model.",
          ],
          screens: [
            viyaScreen(
              "vault",
              "Vault",
              "Viya Vault listing Government ID as saved and Travel insurance as missing, with an empty state offering Add file"
            ),
            viyaScreen(
              "notes",
              "Notes",
              "Viya trip notes with All, Food, Booking, and Reminder chips and three notes about food, ferry check-in, and canyoneering packing"
            ),
            viyaScreen(
              "travelers",
              "Travelers",
              "Viya Travelers list with an emergency contact and a traveler"
            ),
          ],
        },
        {
          label: "Ask Viya",
          title: "An agent that reads the trip before it answers.",
          lead: "Chat inside a trip is grounded in that trip’s records through tools, not in a pasted summary.",
          points: [
            "The agent has 17 tools scoped to one trip: ten read the itinerary, budget, bookings, readiness, risks, places, notes and documents, companions, and the season and destination, and seven propose changes.",
            "A request such as planning a beach afternoon reads Day 4 and the season first, then drafts a stop, notes it as an estimate, and flags the weather.",
            "Prices and opening hours are marked as estimates when they are not in the trip’s records, and the reply says plainly that nothing has changed yet.",
          ],
          screens: [
            viyaScreen(
              "agent-thinking",
              "Reading the trip",
              "Viya trip chat after the request Day 4 looks thin, plan a relaxed beach afternoon, check the weather risk, and draft it, showing a Thinking row"
            ),
            viyaScreen(
              "agent-draft",
              "Draft saved",
              "Viya trip chat replying with a saved draft for a Wednesday 2 December slow beach afternoon at Alona Kew, a weather note on typhoon season, and a Draft ready to review card with Review drafts"
            ),
          ],
        },
        {
          label: "Review before it counts",
          title: "Every change is a draft you decide on.",
          lead: "The agent never edits a trip. It saves a draft, and the traveler applies or dismisses it.",
          points: [
            "A draft is checked against the trip as it is now before it is saved: overlapping times, dates outside the trip, reversed bookings, and unrealistic budgets are returned to the model as errors it can correct.",
            "The Drafts sheet describes what each draft would change in plain lines, with Apply and Dismiss for each.",
            "Applying is checked again at the time it runs, writes only that draft’s own part of the trip, and cannot be applied twice.",
          ],
          screens: [
            viyaScreen(
              "agent-review",
              "Drafts from Viya",
              "Viya Drafts from Viya sheet with an itinerary draft for a relaxed beach afternoon on Day 4 and a readiness draft for weather and backup checks, each with Dismiss and Apply"
            ),
          ],
        },
        {
          label: "On the day",
          title: "Travel Mode keeps the day in one screen.",
          lead: "Before and during the trip, a single view answers what is next and where the tickets are.",
          points: [
            "Before the trip it counts down to Day 1 and names the first stop and its time.",
            "Open risks are one tap away, and an expense, a note, or a new risk can be added without leaving the screen.",
            "Tickets list each booking with its reference, ready to show.",
          ],
          screens: [
            viyaScreen(
              "travel-mode",
              "Travel Mode",
              "Viya Travel Mode showing the trip starts in 12 days with the first stop Fly Manila to Cebu at 06:10, one urgent risk, quick actions to log an expense, add a note, or add a risk, and a tickets list"
            ),
          ],
        },
        {
          label: "Look back",
          title: "A finished trip becomes a recap.",
          lead: "Completing a trip leads to its recap, and moments kept along the way are what the recap is made from.",
          points: [
            "A completed trip’s workspace leads with Relive this trip instead of preparation tasks.",
            "The recap counts days, places, stops done, total spent, and moments, then lists the highlights by day.",
            "Moments are dated notes with an optional highlight, grouped by day.",
          ],
          screens: [
            viyaScreen(
              "trip-complete",
              "Completed trip",
              "Viya workspace for Siargao Surf Week marked Completed with a Relive this trip next step and rows showing 6 of 6 days planned and all bookings made"
            ),
            viyaScreen(
              "recap",
              "Recap",
              "Viya recap for Siargao showing 6 days, 14 places, 21 of 23 stops done, 69,200 pesos spent, 7 moments, and highlights by day"
            ),
            viyaScreen(
              "moments",
              "Moments",
              "Viya Moments list with 7 moments and 5 highlighted, grouped by day with short captions from Siargao"
            ),
          ],
        },
      ],
    },
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
    tags: ["web"],
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
    journey: {
      screenShape: "wide",
      title: "From the first visit to a published report.",
      summary:
        "ACSFI is the public face of a charitable foundation. Visitors learn who it is, see what it does, and read the work as dated reports, while the foundation keeps all of it current through a CMS.",
      chapters: [
        {
          label: "Arrive",
          title: "A homepage that leads with the mission.",
          lead: "The first screen is a full-bleed hero from the foundation's own photographs, and the page below it answers who they are and what they have done.",
          points: [
            "A hero slider with three slides, a clear headline, and two actions: read the stories or see the mission.",
            "A mission statement and a short account of how the foundation began sit directly under the hero.",
            "A row of four impact counters and a Stories of Impact strip put numbers and real activity on the first page.",
          ],
          screens: [
            acsfiScreen(
              "hero",
              "Hero",
              "ACSFI homepage hero: a full-width photograph of the foundation banner with the headline Empowering communities, inspiring change and two buttons"
            ),
            acsfiScreen(
              "mission",
              "Mission",
              "ACSFI homepage mission section with a large statement about uplifting underprivileged communities and a short note on how the foundation began"
            ),
            acsfiScreen(
              "impact-stats",
              "Impact numbers and stories",
              "ACSFI homepage showing four impact counters above a Stories of Impact row of three photo cards"
            ),
          ],
        },
        {
          label: "Know the foundation",
          title: "About: vision, commitments, values, and goals.",
          lead: "The About page tells the organization's story in the order a donor or partner would ask for it.",
          points: [
            "A header with the foundation's name and a quick fact row: founded, based in, organization type, and focus.",
            "The vision, three commitments, and three values, each as its own large, readable block with scroll-linked emphasis.",
            "A goals section pairs each aim, such as scholarship grants, educational support, and community projects, with a photograph.",
          ],
          screens: [
            acsfiScreen(
              "about",
              "About",
              "ACSFI About page header reading Astro Charitable and Scholarship Foundation Inc. with a short introduction"
            ),
            acsfiScreen(
              "vision",
              "Vision",
              "ACSFI vision statement: A productive society where no youth or family is left behind"
            ),
            acsfiScreen(
              "values",
              "Values",
              "ACSFI values section listing Equality, Community and Teamwork, and Stewardship with large numerals"
            ),
            acsfiScreen(
              "goals",
              "Goals",
              "ACSFI goals section with the Scholarship Grants goal beside a graduation photograph"
            ),
          ],
        },
        {
          label: "See the programs",
          title: "Three programs, told one at a time.",
          lead: "Programs are laid out as a numbered sequence rather than a list of cards, so each one gets room.",
          points: [
            "Charitable Activities, Institutional Support and Enrichment, and Scholarships and Academic Enrichment, each with its own photographs.",
            "Program photographs are shown in black and white with a large numeral behind each title, which keeps very different pictures consistent.",
            "A closing statement about how every program begins with a community need leads into the stories.",
          ],
          screens: [
            acsfiScreen(
              "programs-intro",
              "Programs",
              "ACSFI Programs page header: Programs That Empower Communities"
            ),
            acsfiScreen(
              "program-rows",
              "Program rows",
              "ACSFI program rows with the Charitable Activities program beside a black and white photograph"
            ),
            acsfiScreen(
              "program-institutional",
              "Institutional support",
              "ACSFI program row for Institutional Support and Enrichment with a black and white photograph of a donation handover"
            ),
            acsfiScreen(
              "program-approach",
              "Our approach",
              "ACSFI Our approach statement: Every program begins with a community's need"
            ),
          ],
        },
        {
          label: "Read the stories",
          title: "A timeline of dated activity reports.",
          lead: "Stories is the foundation's running record. Each entry is a report the team publishes through the CMS.",
          points: [
            "A vertical timeline groups entries by date, with the program tag, reading time, a short excerpt, a photo, and a Read Story link.",
            "The index is pre-rendered and revalidates every 60 seconds, so a new report appears without a redeploy.",
          ],
          screens: [
            acsfiScreen(
              "stories-index",
              "Stories of Change",
              "ACSFI Stories page header reading Stories of Change with an all stories count"
            ),
            acsfiScreen(
              "stories-timeline",
              "Story timeline",
              "ACSFI stories timeline with dated entries, program tags, excerpts and photos"
            ),
          ],
        },
        {
          label: "Open a report",
          title: "Each activity is a structured report, not a blog post.",
          lead: "Every story page is built from fields the foundation fills in once: when, where, who, why, and what happened.",
          points: [
            "A header with the program, reading time, date, time, venue, and participants, then a lead photograph.",
            "Objectives and purpose are separate blocks above the narrative, so the aim of the activity is clear before the story starts.",
            "A photo gallery and a Copy story link button close the page, followed by a prompt to read more.",
          ],
          screens: [
            acsfiScreen(
              "report-header",
              "Report header",
              "ACSFI activity report header with the title Tree Planting Activity, its date, time and venue, and a group photograph"
            ),
            acsfiScreen(
              "report-objectives",
              "Objectives and purpose",
              "ACSFI activity report with separate Objectives and Purpose blocks above the narrative"
            ),
            acsfiScreen(
              "report-gallery",
              "Photo gallery",
              "ACSFI activity report photo gallery arranged in a masonry layout"
            ),
          ],
        },
        {
          label: "Keep it current",
          title: "Content the foundation controls.",
          lead: "Everything a visitor reads is a record in the CMS, and the pages say plainly when there is nothing to show yet.",
          points: [
            "Upcoming events come from the CMS. When none are scheduled, the page shows a calm empty state instead of a blank block.",
            "Hero media, programs, statistics, quotes, and activities are all content types, so staff update the site without touching code.",
            "A downloadable brochure sits in the footer and on the About call to action.",
          ],
          screens: [
            acsfiScreen(
              "upcoming-events",
              "Upcoming events, empty state",
              "ACSFI Upcoming Events section showing a calm message that there are no upcoming events at this time"
            ),
          ],
        },
        {
          label: "Get in touch",
          title: "A contact page that sets expectations.",
          lead: "A short form explains what happens next before the visitor sends anything.",
          points: [
            "Contact opens with an inviting headline and a map to find the office.",
            "The form lists the usual reasons to write, such as partnerships and visits, and states the expected response time.",
          ],
          screens: [
            acsfiScreen(
              "contact",
              "Let's talk",
              "ACSFI Contact page opening with the headline Let's talk"
            ),
            acsfiScreen(
              "contact-form",
              "Message form",
              "ACSFI contact form with full name, email, subject and message fields and a short list of what to expect"
            ),
          ],
        },
        {
          label: "Anywhere",
          title: "Responsive, with a considered not-found page.",
          lead: "Every page reflows from a wide desktop layout down to a phone.",
          points: [
            "On a phone the navigation becomes a full-screen menu, and the hero, programs, and stories reflow to one column.",
            "A custom 404 keeps the navigation and offers a way home or back.",
          ],
          screens: [
            acsfiScreen(
              "mobile-pages",
              "On a phone",
              "ACSFI on a phone: the hero, the full-screen menu, the programs header and a program row",
              980
            ),
            acsfiScreen(
              "not-found",
              "Not found",
              "ACSFI custom 404 page reading This page doesn't exist with buttons to go home or go back"
            ),
          ],
        },
      ],
    },
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
  {
    slug: "aqd",
    name: "AQD",
    category: "Native iOS app · Personal wardrobe",
    summary:
      "AQD is a private closet for iPhone. Photograph what you own, compose outfits and themes, plan days and trips, record what you actually wear, and ask an on-device Agent for help. Everything stays on the phone: no account, no backend, no cloud AI.",
    match: {
      prompt:
        "Someone wants to know what they own and decide what to wear, without handing a library of wardrobe photos to a cloud service.",
      clue: "Look for the iPhone app built around a private closet and an on-device Agent.",
      result:
        "AQD keeps pieces, outfits, plans, trips, and wear history on the phone, and its Agent drafts changes that the owner reviews before anything is saved.",
    },
    problem:
      "A wardrobe is hard to see. Pieces live in drawers and camera rolls, outfits get rebuilt every morning, and nobody remembers what they actually wore. A closet is also personal, so an account and a cloud copy of every photo is a heavy price for knowing what you own.",
    solution:
      "AQD stores pieces, outfits, themes, plans, trips, and wear on the device with SwiftData. Today, Closet, Planner, and Profile cover every manual path without the model. On iPhones that support Apple Intelligence, an on-device Agent answers from the closet and drafts changes as reviewed change sets that the owner ticks, applies, and can undo.",
    role: "Designed and built independently",
    status: "Personal iOS app · Source available",
    featured: true,
    tags: ["ai", "mobile"],
    stack: [
      "Swift",
      "SwiftUI",
      "SwiftData",
      "Foundation Models",
      "Vision",
      "WeatherKit",
      "Swift Testing",
      "XCUITest",
    ],
    decisions: [
      {
        title: "Keep the first version on the device",
        body: "There is no account, backend, sync, or cloud AI. Records and photos use SwiftData with CloudKit off, complete file protection, and backup exclusion. The only network call is the optional WeatherKit lookup for a chosen place and date.",
      },
      {
        title: "Let the Agent draft, never act",
        body: "Every change is a reviewed change set with a tickable row per record. Nothing applies without approval, there is no standing permission, and a failed apply rolls back. Undo stays available while the records are unchanged; delete is a separate confirmation with no undo.",
      },
      {
        title: "Ground a small model in the closet",
        body: "Rule-based intent routing allows at most three tools per intent, records are referenced by handle, and each reply is checked against the real closet with one regeneration before the owner sees it. Private notes are off by default and can never authorize a change.",
      },
      {
        title: "Keep every manual path model-free",
        body: "The Agent needs an Apple Intelligence iPhone on iOS 26 or later. Everyone else gets the full closet, outfits, planner, trips, and wear history on iOS 18 and later, with Liquid Glass behind availability checks and flat fallbacks.",
      },
    ],
    architectureSummary:
      "A SwiftUI app in layers whose imports point down: Core, then Persistence and Services, then DesignSystem, Features, and App. A repository script enforces the import rules, and pure domain rules live in a separate Swift package with its own tests.",
    architecture: [
      {
        title: "Core package",
        body: "Pure rules, validation, and value types for the planner calendar, trip packing, wear insights, and Agent budgets and grounding repair. Core imports only Foundation.",
      },
      {
        title: "Versioned local records",
        body: "SwiftData records carry stable IDs, revisions, and acknowledged-write receipts. Delivered schemas are frozen, and a corrupt or newer store is kept rather than replaced.",
      },
      {
        title: "Media pipeline",
        body: "Each piece starts from a photo that is cropped, rotated, and cut out with Apple Vision or by hand. The app keeps a metadata-minimized original with an edit recipe and prepares media before committing any reference.",
      },
      {
        title: "Agent services",
        body: "Foundation Models sits behind a service layer for intent routing, bounded context, tool calls, streaming with Stop, queued messages, and typed failure states with recovery actions.",
      },
      {
        title: "Design system",
        body: "Shared tokens and components keep charcoal as the only control color, with 44 pt targets, Dynamic Type, and accessibility layouts. A script rejects any color that is not an AppTheme token.",
      },
      {
        title: "Archive and recovery",
        body: "A versioned export, a reviewed restore, and a local erase let the owner move or remove the whole closet without a server.",
      },
    ],
    evidence: [
      "The public repository holds the SwiftUI app, the Core package, the unit and UI test targets, and a feature contract for each area in docs/features.",
      "Import-layer and color-token scripts run in the pre-commit hook, so the architecture rules are checked rather than only documented.",
      "Persistence tests cover Agent undo for pieces, outfits, themes, plans, wear, profile, and whole trips.",
      "A deterministic Agent eval gate lives in Core, and a live on-device eval script checks the real model. The release gate passed over 24 live runs with 714 of 747 cases fully clean; 290 Core tests and 362 device unit tests passed (Oct 2026). The live run is manual on the owner’s phone.",
      "Two decision records explain the device-only first version and the reviewed change-set model for the Agent.",
      "The screenshots on this page come from the app running on an iPhone 17 Pro Max with its built-in sample closet.",
    ],
    images: [
      {
        src: "/images/projects/aqd/today.webp",
        alt: "AQD Today screen showing an Office day look of a blue shirt, grey trousers, oxblood loafers, and a black belt, with Plan details and Record wear actions",
        width: 1320,
        height: 2868,
        label: "Today",
      },
      {
        src: "/images/projects/aqd/agent-answer.webp",
        alt: "AQD Agent answering Tonight’s look with the planned Office day outfit and its four closet pieces",
        width: 1320,
        height: 2868,
        label: "Agent answer",
      },
      {
        src: "/images/projects/aqd/agent-review.webp",
        alt: "AQD Review changes sheet for a week plan, marked Draft, not confirmed saved, with a tick on each day, an Apply button, and Reject with a reason",
        width: 1320,
        height: 2868,
        label: "Reviewed change set",
      },
      {
        src: "/images/projects/aqd/closet.webp",
        alt: "AQD Closet showing twelve pieces in a grid with category chips for shirts, bottoms, dresses, and layers",
        width: 1320,
        height: 2868,
        label: "Closet",
      },
      {
        src: "/images/projects/aqd/planner.webp",
        alt: "AQD Planner week view for November 10 with an Office day plan and a Record wear action",
        width: 1320,
        height: 2868,
        label: "Planner",
      },
      {
        src: "/images/projects/aqd/agent-suggestion.webp",
        alt: "AQD Agent suggested look made of a blue shirt, grey trousers, loafers, and a belt, with Save outfit, Try another, and Adjust actions",
        width: 1320,
        height: 2868,
        label: "Suggested look",
      },
    ],
    journey: {
      title: "From the first photo to the Agent.",
      summary:
        "AQD follows the life of a wardrobe: add a piece, build outfits, group themes, plan days and trips, record what you wore, keep fit memories, and ask the Agent. Every screen below comes from the app running on an iPhone 17 Pro Max with its built-in sample closet.",
      chapters: [
        {
          label: "Add pieces",
          title: "Every piece starts as a photo.",
          lead: "Saving a piece takes a photo, a name, and a category. Everything else is optional, and unknown stays unknown.",
          points: [
            "Take the photo with the camera or pick it from Photos. The camera adds a thirds grid and a centered frame, and the app never alters the original Photos asset.",
            "One Edit photo sheet covers crop and rotate, plus a Cut out tab that uses Apple Vision, with manual tools where automatic cutout is not available.",
            "Color, brand, size, fit, material, season, and condition stay blank unless the owner fills them. Fit is never inferred.",
            "Save stays disabled until the photo, name, and category exist, and a plain hint names what is missing. A failed save keeps the draft and the prepared photo.",
          ],
          screens: [
            aqdScreen(
              "add-piece",
              "Add piece",
              "AQD Add piece sheet with a photo area offering Take photo and Photos, a Name field, category chips, and a More details row"
            ),
            aqdScreen(
              "piece-details",
              "Optional details",
              "AQD piece details sheet with optional fields for color, brand, size, fit, material, season, and condition"
            ),
          ],
        },
        {
          label: "Browse the closet",
          title: "A closet you can read at a glance.",
          lead: "Pieces, outfits, and themes share one place, with filters that combine and clear in one tap.",
          points: [
            "Category chips, a status filter for Available, Unavailable, Laundry, and Archived, metadata search, and sorting by recently added, name, or most and least worn.",
            "Piece detail shows availability, a Style this action, the outfits that use the piece, recorded wears, and the last worn date.",
            "Select mode moves many pieces to Laundry, Available, or Archive. Each piece is its own acknowledged write, and any stale piece is skipped with a count.",
            "Archive keeps outfits and history. Delete first previews the affected outfits and future plans, and never rewrites recorded wear.",
          ],
          screens: [
            aqdScreen(
              "closet",
              "Closet",
              "AQD Closet showing twelve pieces in a grid with category chips for shirts, bottoms, dresses, and layers"
            ),
            aqdScreen(
              "piece-detail",
              "Piece detail",
              "AQD piece detail for a blue cotton shirt with availability, Style this, color, recorded wears, last worn, and the outfits it appears in"
            ),
          ],
        },
        {
          label: "Build outfits",
          title: "Compose a look on a live canvas.",
          lead: "An outfit is an ordered set of owned pieces. The builder shows the result while you choose.",
          points: [
            "A pinned canvas shows the chosen pieces, and a tap removes one. A resizable picker lists the closet by category, with search at larger sizes.",
            "The name defaults to a weekday look and stays editable. A partial look is valid and is never called complete.",
            "Saving is private. It never creates a plan or a wear record, and a retried save creates one outfit.",
            "Outfit detail links its themes, offers Plan outfit and Record wear, and ends in a reviewed delete that names its theme and plan impact.",
          ],
          screens: [
            aqdScreen(
              "build-outfit-empty",
              "Start a look",
              "AQD Build outfit sheet with an empty canvas reading Tap a piece below to start your look and a picker of closet pieces"
            ),
            aqdScreen(
              "build-outfit",
              "Pieces on the canvas",
              "AQD Build outfit sheet titled Tuesday look with a blue shirt and a belt on the canvas and an Add to theme chip"
            ),
            aqdScreen(
              "outfits",
              "Outfits",
              "AQD Outfits grid showing six saved looks with piece counts, themes, and favorite hearts"
            ),
            aqdScreen(
              "outfit-detail",
              "Outfit detail",
              "AQD outfit detail for Office day with four pieces, a Favorite toggle, Plan outfit, Record wear, and a list of its pieces"
            ),
          ],
        },
        {
          label: "Group themes",
          title: "Collect looks into themes.",
          lead: "A theme is a named collection of outfits, such as Weekday, Off duty, or Evening.",
          points: [
            "The cover is a collage generated from the member outfits. It is drawn on demand and never stored.",
            "One outfit can belong to many themes. Renaming a theme keeps its members, and deleting a theme never deletes an outfit.",
            "Names are unique regardless of case, and a theme can start empty, like Ideas to collect.",
            "The grid filters All, With outfits, or Empty, and sorts by name or by most outfits.",
          ],
          screens: [
            aqdScreen(
              "create-theme",
              "Create theme",
              "AQD Create theme sheet with a collage cover, Name and Description fields, and a picker of outfits to include"
            ),
            aqdScreen(
              "themes",
              "Themes",
              "AQD Themes grid with four themes, Evening, Ideas to collect, Off duty, and Weekday, each with a collage cover and outfit count"
            ),
          ],
        },
        {
          label: "Home",
          title: "A home screen you arrange yourself.",
          lead: "Today is a stack of cards that read the closet and never write to it. The owner chooses which cards appear and in what order.",
          points: [
            "Today’s look leads with one action: Record wear for a current plan, Review plan when its outfit changed, Choose outfit when the outfit is gone, or Build outfit with no plan.",
            "Cards cover the week in wear, wear insights, closet in use, upcoming plans, a piece to wear again, favorite outfits, a theme, the fit journal, weather, quick actions, a note, and a photo.",
            "Customize Today is a draft editor to add, hide, duplicate, and reorder cards. Save is atomic, and a failed save keeps both the old layout and the draft.",
            "Personal notes and photos are never uploaded or sent to the Agent. Sample content is never stored as user data.",
          ],
          screens: [
            aqdScreen(
              "today",
              "Today’s look",
              "AQD Today screen showing an Office day look of a blue shirt, grey trousers, oxblood loafers, and a black belt, with Plan details and Record wear actions"
            ),
            aqdScreen(
              "today-upcoming",
              "Upcoming plans",
              "AQD Today card listing upcoming plans for the next seven days, from Coffee run to Office day"
            ),
            aqdScreen(
              "today-wear-again",
              "Wear again",
              "AQD Today cards for a piece to wear again and favorite outfits"
            ),
            aqdScreen(
              "today-customize",
              "Customize Today",
              "AQD Customize Today editor listing every card with a visibility toggle and a reorder handle"
            ),
          ],
        },
        {
          label: "Calendar",
          title: "Plan a day, a week, or a trip.",
          lead: "The Planner keeps intent separate from history. Planning an outfit never records that it was worn.",
          points: [
            "Week is the default view and Month the alternate. Days show their state, such as planned, no outfit yet, worn, or needs review, instead of a count.",
            "Plan one day, several days, a routine with weekdays and occasions for up to three months, or an event or trip. Destinations and activities stay on the device.",
            "A trip builds a packing list from its assigned outfits, with each piece listed once and a check state that survives reassignment.",
            "Editing an outfit flags future entries for review, overlaps offer Keep both or Replace, and bulk saves apply all days or none.",
            "Dates are calendar dates in the plan’s time zone, so they do not shift when the phone travels.",
          ],
          screens: [
            aqdScreen(
              "planner",
              "Week view",
              "AQD Planner week view for November 10 with an Office day plan and a Record wear action"
            ),
            aqdScreen(
              "plan-day",
              "Plan a look",
              "AQD Plan a look sheet with an outfit strip, an Unassigned chip, date, weather context, occasion, and time zone"
            ),
            aqdScreen(
              "plan-trip",
              "New trip",
              "AQD New trip sheet with name, start and end dates, time zone, destination, and activities"
            ),
            aqdScreen(
              "plan-routine",
              "New routine",
              "AQD New routine sheet with weekday toggles, an occasion field, outfit choices, and a repetition rule"
            ),
          ],
        },
        {
          label: "Record wear",
          title: "Keep an honest record of what you wore.",
          lead: "Wear history is separate from plans, so insights come from what actually happened.",
          points: [
            "Record wear shows the pieces on a canvas with a Worn on date and a time zone, and it says plainly that planning does not record wear.",
            "One wear is kept per identical set of pieces per day. A stable operation ID prevents retry duplicates, and a record can be backdated, corrected, or undone.",
            "Each record keeps a minimal snapshot of piece names, so history survives deleting a piece or editing an outfit.",
            "Monthly utilization is based only on recorded wear. With too little history, AQD says Not enough recorded history instead of showing a percentage.",
          ],
          screens: [
            aqdScreen(
              "record-wear",
              "Record wear",
              "AQD Record wear sheet with four pieces on a canvas, a Worn on date, a piece picker, and a time zone row"
            ),
            aqdScreen(
              "today-insights",
              "Wear insights",
              "AQD Today cards for the week in wear and monthly wear insights listing pieces not worn yet"
            ),
          ],
        },
        {
          label: "Profile",
          title: "A private fit journal, not a social feed.",
          lead: "Profile keeps dated memories of what the owner wore. There is no sign-in, no followers, and no public count.",
          points: [
            "A fit is a dated memory with an optional photo, an optional linked outfit, and a caption of up to 500 characters. It needs a photo or an outfit to post.",
            "Without a photo, the fit shows the real pieces of the linked outfit and never a made-up wearer photo. The link keeps a snapshot that survives outfit edits and deletion.",
            "If an outfit is planned for that day, one tap links it. Count as worn can record the wear in the same step.",
            "The header shows Fits, This month, and Day streak. The composer states that only the owner can see a fit and that it stays on the iPhone.",
            "A seven-step style questionnaire feeds suggestions. Body details are off by default and can be revoked at any time.",
          ],
          screens: [
            aqdScreen(
              "new-fit",
              "New fit",
              "AQD New fit sheet with an optional photo area, a What I wore outfit strip with a planned Office day suggestion, a caption, and a date row"
            ),
          ],
        },
        {
          label: "Ask the Agent",
          title: "Ask in one sentence.",
          lead: "The Agent is a closet copilot that runs on the phone. One request does a closet chore, such as dress me today, plan my week, or pack my trip.",
          points: [
            "Answers show the real pieces as cards, and every reply is checked against the owner’s records before it appears.",
            "Typing a slash opens the tools, including build outfits, make themes, name and label, and plan your days.",
            "When something essential is missing, the Agent asks one question at a time with tappable answers.",
            "The model runs on device through Apple Foundation Models. Everything outside the Agent works without it.",
          ],
          screens: [
            aqdScreen(
              "agent-answer",
              "Grounded answer",
              "AQD Agent answering Tonight’s look with the planned Office day outfit and its four closet pieces"
            ),
            aqdScreen(
              "agent-suggestion",
              "Suggested look",
              "AQD Agent suggested look made of a blue shirt, grey trousers, loafers, and a belt, with Save outfit, Try another, and Adjust actions"
            ),
            aqdScreen(
              "agent-tools",
              "Slash tools",
              "AQD Agent tool list after typing a slash, with Build outfits, Make themes, Name and label, and Plan your days"
            ),
          ],
        },
        {
          label: "Review and undo",
          title: "Nothing changes until you approve it.",
          lead: "Every change the Agent proposes is a draft the owner reviews. There is no standing permission to act.",
          points: [
            "A request like Plan outfits for 3 days in Boracay becomes one review with a different outfit for each day. The app picks varied available pieces and the model supplies only the labels.",
            "The owner chooses what saving does: the outfits always, plus an optional theme that groups them.",
            "Plan reviews have a tickable row per day. Apply uses only the ticked rows, checks each against the revision that was reviewed, and rolls back if any write fails.",
            "A receipt records when the change was saved. Undo is offered only while every record it touched is unchanged, and a delete is never undoable.",
          ],
          screens: [
            aqdScreen(
              "agent-trip",
              "Trip proposal",
              "AQD Agent proposing a Boracay trip with three daily looks, Outfits and Theme chips, and a note that nothing is saved yet"
            ),
            aqdScreen(
              "agent-trip-review",
              "Review changes",
              "AQD Review changes sheet for the Boracay trip listing three days with their pieces, a Draft, not confirmed saved label, and Apply"
            ),
            aqdScreen(
              "agent-review",
              "Ticked days",
              "AQD Review changes sheet for a week plan with a tick beside each day, an Apply button, and Reject with a reason"
            ),
            aqdScreen(
              "agent-trip-saved",
              "Saved receipt",
              "AQD trip review after applying, marked Saved locally, with a saved receipt time and an Open theme link"
            ),
          ],
        },
        {
          label: "Privacy controls",
          title: "The owner decides what the Agent may read.",
          lead: "The Agent only sees the sources the owner leaves on, and it never receives photos.",
          points: [
            "Switches for pieces, outfits, themes, style preferences, profile, wear history, fit journal, Today cards, plans, past chats, and weather decide what each reply may use.",
            "Private notes are off by default and are only information. A note can never approve a change.",
            "The model never sees record IDs. The app gives it short handles, resolves them itself, and checks ownership and revisions again when an action runs.",
            "Devices without Apple Intelligence get a reason-specific screen and the full manual app, and Device support lists every supported iPhone.",
          ],
          screens: [
            aqdScreen(
              "agent-settings",
              "AI sources",
              "AQD Agent settings with switches for pieces, outfits, themes, style preferences, and profile, and Private notes switched off"
            ),
          ],
        },
      ],
    },
    repository: "https://github.com/vn-aj-vngrd/aqd",
  },
  {
    slug: "balay",
    name: "Balay",
    category: "Interactive 3D web experiment · Home design",
    summary:
      "Balay is a fun experiment: a two-storey tropical-modern house you can walk through in the browser. Take a narrated tour, switch between Overview, Walk, and Fly, open doors, cabinets, and curtains, cut the house open by floor, see wiring, plumbing, and structure through the walls, and light it by the Cebu clock or one of five night scenes.",
    match: {
      prompt:
        "A homeowner wants to judge a house design, its rooms, lighting, and wiring, before anything is built.",
      clue: "Look for the product that lets you walk through the house in 3D.",
      result:
        "Balay turns one typed layout into a walkable 3D house, a narrated tour, and a floor plan, so design decisions can be felt before construction starts.",
    },
    problem:
      "Plans and sketches make it hard to judge how a house will feel: how wide the stair is, where light falls at 6 PM, whether a desk fits beside a bed. Every change meant redrawing several documents by hand.",
    solution:
      "One typed data module describes the rooms, openings, furniture, finishes, and electrical points. A three.js engine and a floor-plan page both redraw from it, so a design change shows up in the walkthrough, the tour, and the plan together.",
    role: "Designed and built independently",
    status: "Live experiment · Closed source",
    featured: true,
    tags: ["web"],
    stack: [
      "React",
      "TypeScript",
      "three.js",
      "Vite",
      "Zustand",
      "React Router",
      "Vitest",
      "Vercel",
    ],
    decisions: [
      {
        title: "Make the layout the single source of truth",
        body: "Geometry, furniture, finishes, and electrical points live in typed data files. The 3D scene and the floor plan are drawn from them, so the two views cannot disagree.",
      },
      {
        title: "Keep the engine outside React",
        body: "A framework-agnostic three.js engine owns the scene and exposes a small viewer API. React renders the chrome around it and never touches scene objects directly.",
      },
      {
        title: "Let visitors explore at their own pace",
        body: "Overview orbits the house, Walk moves at eye height, and Fly roams freely. Doors, cabinets, and curtains respond to a switch, and room shortcuts jump straight to a view.",
      },
      {
        title: "Show what is behind the walls",
        body: "X-ray layers reveal wiring and smart-home points, plumbing and drainage, and structure. Lighting presets and a Cebu-time sun show the house in morning light or evening glow.",
      },
    ],
    journey: {
      screenShape: "wide",
      title: "Walk the whole house before it exists.",
      summary:
        "Balay is one typed layout drawn live in three.js. Every control below changes the same model: the views, the open doors, the layers behind the walls, the light, the tour, and the floor plan.",
      chapters: [
        {
          label: "Look at the house",
          title: "Start outside, in daylight or at dusk.",
          lead: "The viewer opens on the front of the house. Outside, Inside, and Cutaways tabs group every saved view, and each view says what it is showing.",
          points: [
            "Seven outside views: the front, the street, the arrival path, the side path, the rear garden, an aerial of the whole lot, and an evening view.",
            "The aerial shows the lot, the street, the carport pocket, and the roof lid, so proportions can be judged before anything else.",
            "The same house reads very differently in morning sun and in the lit dusk view, with soffit downlights and warm interiors.",
          ],
          screens: [
            balayScreen(
              "front-day",
              "Front, daylight",
              "Balay front view in daylight: a two-storey house with a stone base, a timber slat band, a glass balcony and a timber gate, beside the sidebar of views and switches"
            ),
            balayScreen(
              "aerial",
              "Aerial",
              "Balay aerial view of the lot with the house, carport, palms, garden and street"
            ),
            balayScreen(
              "exterior",
              "Evening view",
              "Balay evening view with warm lit interiors, uplit palms and soffit downlights against a dusk sky"
            ),
          ],
        },
        {
          label: "Go to a room",
          title: "Any room is one click or one key away.",
          lead: "A Go to menu groups the rooms by floor and outside, and the number keys jump straight to them.",
          points: [
            "Ground floor, upper floor, and outside shortcuts: living, kitchen and dining, foyer, stair, master bedroom, work desk, balcony, ensuite, second bedroom, front, and the rear garden.",
            "Each stop frames the room the way it is used: the master bed facing the wall TV, the floating oak desk on its hidden brackets, the stair rising past the powder room.",
            "A caption names every view and describes what to look at, so the walkthrough explains itself.",
          ],
          screens: [
            balayScreen(
              "go-to-menu",
              "Go to menu",
              "Balay Go to menu open over the living room, listing ground floor, upper floor and outside rooms with number key hints"
            ),
            balayScreen(
              "master-bedroom",
              "Master bedroom",
              "Balay master bedroom with a bed against a fluted timber wall, bedside tables and a glass balcony door"
            ),
            balayScreen(
              "work-desk",
              "Work desk",
              "Balay work desk: a floating oak desk with a wide monitor and a chair beside a timber partition"
            ),
          ],
        },
        {
          label: "Move your way",
          title: "Overview, Walk, and Fly.",
          lead: "One switch changes how the camera moves, and the rest of the interface gets out of the way.",
          points: [
            "Overview orbits the house. Walk drops the camera to eye height and moves with WASD or touch. Fly roams freely, and a small pill names the mode and where you are.",
            "Keys O, E, and Q jump to a mode, F cycles through them, and H hides the whole interface for a clean look.",
            "Phones get a bottom sheet and touch controls, and landscape gets a side rail, so the same model stays usable away from a desk.",
          ],
          screens: [
            balayScreen(
              "walk-mode",
              "Walk mode",
              "Balay Walk mode at eye height in the living room with the sidebar hidden and a small Walk pill at the top"
            ),
            balayScreen(
              "fly-mode",
              "Fly mode",
              "Balay Fly mode high above the lot with the house, carport and street, and a Fly pill naming the current position"
            ),
          ],
        },
        {
          label: "Open it up",
          title: "Doors, cabinets, and curtains actually move.",
          lead: "Three switches under Open & close answer the questions a drawing cannot: what is inside, and how does the room look closed up.",
          points: [
            "Open all doors swings every door and slider, and Open cabinets pulls the kitchen cabinets and shelves open to show what they hold.",
            "Close curtains draws the sheers across the living, dining, and bedroom glass, including a full-length curtain in the second bedroom.",
            "Each switch is one call on the viewer API, and the sidebar reflects the engine state rather than keeping its own copy.",
          ],
          screens: [
            balayScreen(
              "open-kitchen",
              "Cabinets open",
              "Balay kitchen with cabinet doors and drawers open, showing shelves and the fridge, with the Open all doors and Open cabinets switches on"
            ),
            balayScreen(
              "curtains-bedroom",
              "Curtains closed, bedroom",
              "Balay second bedroom with full-length sheer curtains closed over the window and a desk and shelf beside the beds"
            ),
            balayScreen(
              "curtains-balcony",
              "Curtains closed, balcony door",
              "Balay balcony sliding door seen through closed sheer curtains"
            ),
          ],
        },
        {
          label: "Peel it back",
          title: "Cut the house open, floor by floor.",
          lead: "Display modes and cutaway views show how the floors fit together, which is the part a render never shows.",
          points: [
            "Whole House, No Roof, and Ground modes remove the roof or the upper floor so the plan reads from above.",
            "Ground floor, upper floor, and stair slot cutaways are ready-made dollhouse views with the furniture in place.",
            "Room names label every space on demand, and a sketch-plan overlay lays the lot outline over the model.",
          ],
          screens: [
            balayScreen(
              "cutaway-ground",
              "Ground floor cutaway",
              "Balay ground floor cutaway from above showing the stair, living room, kitchen, foyer and carport"
            ),
            balayScreen(
              "cutaway-upper",
              "Upper floor cutaway",
              "Balay upper floor cutaway from above showing the master bedroom, work desk, balcony and second bedroom"
            ),
            balayScreen(
              "stair-slot",
              "The stair slot",
              "Balay stair slot cutaway looking down on the white stair fold under the skylight beside the living room"
            ),
            balayScreen(
              "room-names",
              "Room names",
              "Balay ground floor cutaway with room name labels on the living room, kitchen and dining, foyer, entry hall and powder room"
            ),
          ],
        },
        {
          label: "See behind the walls",
          title: "Three X-ray layers.",
          lead: "Wiring, plumbing, and structure are drawn through the walls, so the systems can be checked as part of the design.",
          points: [
            "Wiring and smart home shows circuits, outlets, lighting and the network points, with a legend for power, dedicated, aircon, data, and low voltage.",
            "Plumbing and drainage draws cold and hot water, drains, vents, rainwater, the tank, and the septic tank through the walls.",
            "Structure shows footings, columns, beams, and slabs as colored frames over the house.",
          ],
          screens: [
            balayScreen(
              "xray-wiring",
              "Wiring and smart home",
              "Balay upper floor cutaway with colored wiring routes and labeled network points drawn through the walls and a legend at the bottom"
            ),
            balayScreen(
              "xray-plumbing",
              "Plumbing and drainage",
              "Balay ground floor cutaway with teal and orange pipe routes, labeled tank and drains, and a legend for cold water, hot water, drain, vent and rainwater"
            ),
            balayScreen(
              "xray-structure",
              "Structure",
              "Balay aerial view with footings, columns, beams and slabs drawn as blue and orange frames inside the house"
            ),
          ],
        },
        {
          label: "Light it",
          title: "Cebu time, five scenes, and every date.",
          lead: "The light panel follows the clock in Cebu, or hands control back so you can pick the hour, the date, and the scene.",
          points: [
            "A live Cebu time switch sets the sky and sun from the real clock. Touching any other light control turns it off.",
            "Day, Dusk, and Night, plus five night scenes: Evening, Bright, Movie, Reading in bed, and Off.",
            "A date picker and a sun-time slider show where the sun falls on solstice, equinox, and in between, and a ceiling lights switch lights every downlight and cove at once.",
          ],
          screens: [
            balayScreen(
              "light-movie",
              "Movie scene",
              "Balay living room at night in the Movie scene with the TV backlight glowing and the rest of the room dim, beside the Light panel"
            ),
            balayScreen(
              "light-reading",
              "Reading in bed",
              "Balay master bedroom at night in the Reading in bed scene, with both bedside lights on the pillows and the room dim"
            ),
            balayScreen(
              "light-bright",
              "Bright scene",
              "Balay living room at night in the Bright scene with every ceiling light up and a cove light along the ceiling edge"
            ),
            balayScreen(
              "light-ceiling",
              "Ceiling lights on",
              "Balay work desk at night with the ceiling lights switch on and a warm light spread across the wall and floor"
            ),
          ],
        },
        {
          label: "Point and ask",
          title: "Hover to name what you see.",
          lead: "Hover labels turn the model into something that explains itself.",
          points: [
            "Point at any object and a card names it and says what it is, such as the counter-depth fridge, the water dispenser, or the cabinet, and whether it counts toward the build budget.",
            "Overlays, captions, and tooltips share one motion language, so panels open and close the same way everywhere.",
          ],
          screens: [
            balayScreen(
              "hover-labels",
              "Hover labels",
              "Balay kitchen with a hover label describing the refrigerator, pointed at in the 3D view"
            ),
          ],
        },
        {
          label: "Tour and plan",
          title: "A narrated tour, and the plan behind it.",
          lead: "Take the Tour plays twelve chapters with a voice and a score, and the floor plan page reads the same layout data.",
          points: [
            "The tour runs from arrival through foyer, kitchen, living, garden, stair, master, desk, ensuite, balcony, and second bedroom to the evening view, with captions and a progress bar.",
            "Narration is pre-rendered with an open voice model, the music is generated live in the browser, and the whole tour can be downloaded as an MP4 or opened from a share link.",
            "The floor plan has Site, Ground floor, Upper floor, and Areas tabs with dimensions, areas, and a Show in 3D button for every room.",
          ],
          screens: [
            balayScreen(
              "tour-arrival",
              "Tour, arrival",
              "Balay tour at its first chapter: the front of the house with narration captions, a chapter counter and a player bar"
            ),
            balayScreen(
              "tour-garden",
              "Tour, garden",
              "Balay tour in the rear garden chapter with a caption and player controls"
            ),
            balayScreen(
              "plan-upper",
              "Upper floor plan",
              "Balay floor plan page showing the upper floor with the master bedroom, balcony, ensuite, second bedroom and stair, plus lot and area totals"
            ),
            balayScreen(
              "plan-areas",
              "Areas",
              "Balay floor plan Areas tab listing every room and its area for the ground and upper floors, with total floor area"
            ),
          ],
        },
      ],
    },
    architectureSummary:
      "A Vite single-page app with a three.js engine behind a typed viewer API. Zustand holds interface state, React Router serves the 3D viewer and the floor plan, and the whole site deploys as static files on Vercel.",
    architecture: [
      {
        title: "Typed layout data",
        body: "Rooms, openings, heights, furniture, and the site are described in TypeScript. Materials and electrical points sit in their own modules so each concern has one home.",
      },
      {
        title: "three.js viewer engine",
        body: "createViewer() builds the house from the data and returns controls for views, walk and fly modes, picking, lighting, and layers. Test hooks on the window let browser checks drive it.",
      },
      {
        title: "Guided tour",
        body: "A deterministic timeline of camera shots plays pre-rendered narration and a generated score. The same timeline can be exported as an MP4 video in the browser.",
      },
      {
        title: "Floor plan",
        body: "An SVG floor plan with Site, Ground floor, Upper floor, and Areas tabs reads the same layout data. Selecting a room opens it in 3D.",
      },
    ],
    evidence: [
      "The live viewer offers Outside, Inside, and Cutaways views, a Go to menu with number-key shortcuts, Overview, Walk, and Fly modes, and a screenshot control.",
      "Switches open all doors and cabinets, close curtains, and toggle room names, hover labels, and wiring, plumbing, and structure layers.",
      "The Light panel follows the Cebu clock or lets you pick Day, Dusk, or Night, five night scenes, a date, and a sun time.",
      "A twelve-chapter narrated tour plays in the browser, opens from a share link, and downloads as an MP4.",
      "The floor plan page has Site, Ground floor, Upper floor, and Areas tabs, with a Show in 3D button on every room.",
      "Unit tests cover the layout data and pure helpers, and the app builds to static files for Vercel.",
    ],
    images: [
      {
        src: "/images/projects/balay/exterior.webp",
        alt: "Balay 3D viewer showing the front of a two-storey modern house at dusk with a timber gate, palms, and lit interiors",
        width: 1920,
        height: 1200,
        label: "Exterior at dusk",
      },
      {
        src: "/images/projects/balay/living.webp",
        alt: "Balay 3D viewer inside the living room with a fluted timber TV wall, sofa, round coffee table, and full-width glass to the garden",
        width: 1920,
        height: 1200,
        label: "Living room",
      },
      {
        src: "/images/projects/balay/floor-plan.webp",
        alt: "Balay floor plan page showing the ground floor with living, kitchen and dining, entry hall, foyer, carport, and area totals",
        width: 1920,
        height: 1200,
        label: "Floor plan",
      },
    ],
    coverImage: {
      src: "/images/projects/balay/front-morning.webp",
      alt: "Balay 3D viewer showing the front of the two-storey modern house in morning light, with a timber gate, palms, and the tour panel open",
      width: 2880,
      height: 1800,
    },
    repository: undefined,
    liveUrl: "https://balay.vanajvanguardia.tech/",
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
      image: (project.coverImage ?? project.images[0]).src,
      ...project.match,
    }));
  },
};
