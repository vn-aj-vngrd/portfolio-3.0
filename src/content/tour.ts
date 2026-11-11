// Guided tour narration. Third person, calm guide. Every claim must be backed by
// the repo-relative `evidence` file; `scripts/tour.test.mjs` checks each string.
// Run `yarn narrate:tour` after changing any line.
// No runtime imports: the node test runner loads this file directly.

export type TourEvidence = { file: string; text: string };

export type TourStop = {
  id: string;
  /** DOM target: [data-tour-stop="<stop>"] */
  stop: string;
  /** One sentence per entry; each becomes one caption cue. */
  lines: readonly string[];
  evidence: readonly TourEvidence[];
  /** Skipped when the target is missing from the page. */
  optional?: boolean;
};

export type TourChapter = {
  key: string;
  title: string;
  stops: readonly TourStop[];
};

export const tourStopId = {
  project: (slug: string) => `project-${slug}`,
  experience: (company: string) =>
    `experience-${company
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}`,
};

export const tourChapters: readonly TourChapter[] = [
  {
    key: "welcome",
    title: "Welcome",
    stops: [
      {
        id: "intro-1",
        stop: "hero",
        lines: [
          "This is the portfolio of Van AJ Vanguardia, a product-driven engineer in Cebu.",
          "Let’s take three minutes to walk through what he builds, and the evidence behind it.",
        ],
        evidence: [
          { file: "src/content/profile.ts", text: 'name: "Van AJ Vanguardia"' },
          {
            file: "src/content/profile.ts",
            text: "I’m a product-driven engineer in Cebu",
          },
        ],
      },
      {
        id: "intro-2",
        stop: "hero-signals",
        lines: [
          "He has 3+ years taking products from requirements to production, across web, mobile apps, and backend.",
          "Today, he builds AI features and agents into real products.",
        ],
        evidence: [
          {
            file: "src/content/profile.ts",
            text: "3+ years taking products from requirements to production across web, mobile apps, and backend",
          },
          {
            file: "src/content/ai-workflow.ts",
            text: "I build AI features and agents into real products",
          },
        ],
      },
    ],
  },
  {
    key: "work",
    title: "Selected work",
    stops: [
      {
        id: "work-intro",
        stop: "work",
        lines: [
          "First, the work: six products, each designed and built end to end.",
          "Source is public where available.",
        ],
        evidence: [
          {
            file: "src/components/sections/SelectedWork.tsx",
            text: "Six products, built end to end. Source is public where available",
          },
        ],
      },
      {
        id: "work-relay",
        stop: "project-relay",
        lines: [
          "Relay keeps a pickleball session together, from the first invite to the final score.",
          "Its AI agent answers game questions and prepares plans for review.",
        ],
        evidence: [
          {
            file: "src/content/projects.ts",
            text: "From the first invite to the final score, Relay keeps a pickleball session together",
          },
          {
            file: "src/content/projects.ts",
            text: "AI Agent to answer game questions and prepare plans for review",
          },
        ],
      },
      {
        id: "work-roleway",
        stop: "project-roleway",
        lines: [
          "Roleway turns a scattered job search into focused workspaces and clear next steps.",
          "It’s open source and self-hostable.",
        ],
        evidence: [
          {
            file: "src/content/projects.ts",
            text: "Roleway turns a scattered job search into focused Workspaces and clear next steps",
          },
          {
            file: "src/content/projects.ts",
            text: "Live · Open source · Self-hostable",
          },
        ],
      },
      {
        id: "work-viya",
        stop: "project-viya",
        lines: [
          "Viya is a mobile travel workspace for itineraries, budgets, documents, and bookings.",
          "AI-assisted changes wait for the traveler’s review before saving.",
        ],
        evidence: [
          {
            file: "src/content/projects.ts",
            text: "Viya is a mobile travel workspace for itineraries, budgets, documents, bookings",
          },
          {
            file: "src/content/projects.ts",
            text: "AI-assisted changes that travelers review before saving",
          },
        ],
      },
      {
        id: "work-acsfi",
        stop: "project-acsfi",
        lines: [
          "ACSFI is the live website of a scholarship foundation, backed by a headless CMS.",
          "The team publishes programs, reports, and events without changing code.",
        ],
        evidence: [
          {
            file: "src/content/projects.ts",
            text: "Astro Charitable and Scholarship Foundation",
          },
          {
            file: "src/content/projects.ts",
            text: "Full-stack nonprofit website · Headless CMS",
          },
          {
            file: "src/content/projects.ts",
            text: "without changing website code for every update",
          },
        ],
      },
      {
        id: "work-balay",
        stop: "project-balay",
        lines: [
          "Balay is a two-storey house you can walk through in the browser, drawn live in three.js.",
          "It has a narrated tour, too.",
        ],
        evidence: [
          {
            file: "src/content/projects.ts",
            text: "a two-storey tropical-modern house you can walk through in the browser",
          },
          {
            file: "src/content/projects.ts",
            text: "Balay is one typed layout drawn live in three.js",
          },
          { file: "src/content/projects.ts", text: "Take a narrated tour" },
        ],
      },
      {
        id: "work-aqd",
        stop: "project-aqd",
        lines: [
          "And AQD is a private closet for iPhone, with an on-device agent.",
          "No account, no backend, no cloud AI.",
        ],
        evidence: [
          {
            file: "src/content/projects.ts",
            text: "AQD is a private closet for iPhone",
          },
          {
            file: "src/content/projects.ts",
            text: "no account, no backend, no cloud AI",
          },
        ],
      },
    ],
  },
  {
    key: "craft",
    title: "How he builds",
    stops: [
      {
        id: "craft-method",
        stop: "tech-pillars",
        lines: [
          "Across all of it, the method stays the same.",
          "Clarify the requirement, map the user flow, build it, then revise it against real behavior.",
        ],
        evidence: [
          {
            file: "src/content/engineering.ts",
            text: "Clarify the requirement, map the user flow, build the interface and supporting system, then revise it against real behavior.",
          },
        ],
      },
      {
        id: "craft-agents",
        stop: "tech-workflow",
        lines: [
          "He works with Claude Code and Codex every day, in five stages: grill, spec, tickets, implement, and code review.",
          "He directs the work, reviews the code, and verifies the results.",
        ],
        evidence: [
          {
            file: "src/content/ai-workflow.ts",
            text: "I work with Claude Code and Codex every day, directing the work, reviewing the code, and verifying the results",
          },
          { file: "src/content/ai-workflow.ts", text: 'title: "Code Review"' },
        ],
      },
      {
        id: "craft-stack",
        stop: "tech-stack-groups",
        lines: [
          "TypeScript is home, across web, mobile, and Node.js.",
          "ASP.NET Core, databases, and cloud sit behind it when the work needs them.",
        ],
        evidence: [
          {
            file: "src/components/sections/Engineering.tsx",
            text: "TypeScript across web, mobile, and Node.js, with",
          },
          {
            file: "src/components/sections/Engineering.tsx",
            text: "behind it when the work needs them",
          },
        ],
      },
    ],
  },
  {
    key: "github",
    title: "GitHub activity",
    stops: [
      {
        id: "github-activity",
        stop: "github",
        optional: true,
        lines: [
          "His GitHub activity covers the last twelve months, private work included.",
          "Private work appears only as totals: no repository names, no source.",
        ],
        evidence: [
          {
            file: "src/components/sections/GitHubSnapshot.tsx",
            text: "GitHub activity from the last twelve months.",
          },
          {
            file: "src/components/sections/GitHubSnapshot.tsx",
            text: "does not request or display private repository names, organizations,",
          },
        ],
      },
    ],
  },
  {
    key: "experience",
    title: "Experience",
    stops: [
      {
        id: "career-now",
        stop: "experience-full-scale-teams-ph",
        lines: [
          "Today he’s a full-stack developer at Full Scale.",
          "He delivers customer-facing features, AI capabilities, accessibility, and cloud modernization for client products.",
        ],
        evidence: [
          {
            file: "src/content/experience.ts",
            text: 'company: "Full Scale Teams PH"',
          },
          {
            file: "src/content/experience.ts",
            text: "Customer-facing features, AI capabilities, accessibility, and cloud modernization.",
          },
          {
            file: "src/content/experience.ts",
            text: "Full-stack delivery for client products",
          },
        ],
      },
      {
        id: "career-nextdevs",
        stop: "experience-nextdevs-software-development-services",
        lines: [
          "Before that, he founded NextDevs and led a team building three crew-management web apps.",
          "Two of them were adopted across the client company.",
        ],
        evidence: [
          {
            file: "src/content/experience.ts",
            text: "Founded NextDevs and led a team building three PWAs for crew management.",
          },
          {
            file: "src/content/experience.ts",
            text: "The CMS and portal were adopted across the client company.",
          },
        ],
      },
    ],
  },
  {
    key: "credentials",
    title: "Credentials",
    stops: [
      {
        id: "credentials",
        stop: "credentials",
        lines: [
          "He studied Information Technology at the University of San Carlos.",
          "He was a Hackfest finalist and earned an Outstanding Intern Award.",
        ],
        evidence: [
          {
            file: "src/content/profile.ts",
            text: "BS Information Technology, University of San Carlos",
          },
          {
            file: "src/content/certifications.ts",
            text: "Hackfest 2024: Fusion Finalist",
          },
          {
            file: "src/content/certifications.ts",
            text: "Outstanding Intern Award",
          },
        ],
      },
    ],
  },
  {
    key: "principles",
    title: "Principles",
    stops: [
      {
        id: "principles",
        stop: "about",
        lines: [
          "He cares about what happens after the first release.",
          "Start with the user’s task, then choose the simplest architecture that supports it.",
        ],
        evidence: [
          {
            file: "src/components/sections/About.tsx",
            text: "I care about what happens after the first release.",
          },
          {
            file: "src/content/profile.ts",
            text: "I start with the user’s task and choose the simplest architecture that supports it.",
          },
        ],
      },
    ],
  },
  {
    key: "contact",
    title: "Contact",
    stops: [
      {
        id: "contact",
        stop: "contact",
        lines: [
          "He’s open to AI product engineering and software engineering roles.",
          "Email is the best way to reach him, and every case study is one click away.",
          "Thanks for taking the tour.",
        ],
        evidence: [
          {
            file: "src/components/sections/Contact.tsx",
            text: "Email is the best way to reach me.",
          },
          {
            file: "src/components/sections/Contact.tsx",
            text: "AI product engineering",
          },
        ],
      },
    ],
  },
];

/** Spoken respellings; captions keep the real word. Matched on whole tokens. */
export const tourPronunciations: Readonly<Record<string, string>> = {
  AJ: "A.J.",
  Vanguardia: "Vangwardia",
  Cebu: "Seh-boo",
  ACSFI: "A. C. S. F. I.",
  AQD: "A. Q. D.",
  Viya: "Vee-ya",
  Balay: "Bah-lie",
  "three.js": "three J S",
  "Node.js": "Node J S",
  "ASP.NET": "A S P dot net",
  "3+": "three-plus",
  NextDevs: "Next Devs",
};
