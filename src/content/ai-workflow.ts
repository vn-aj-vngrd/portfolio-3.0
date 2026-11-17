// `mark` names a small monochrome mark in src/components/ai/ToolMark.tsx; null shows a monogram.
export const aiTools = {
  claudeCode: { name: "Claude Code", kind: "Agent harness", mark: "claude" },
  opus: { name: "Claude Opus", kind: "Planning model", mark: "claude" },
  sonnet: { name: "Claude Sonnet", kind: "Building model", mark: "claude" },
  herdr: {
    name: "Herdr",
    kind: "Terminal workspace for coding agents",
    mark: "herdr",
  },
  handy: { name: "Handy", kind: "Voice input", mark: null },
} as const;

export type AiToolId = keyof typeof aiTools;

export function aiToolNames(ids: readonly AiToolId[]) {
  return ids.map((id) => aiTools[id].name);
}

// The current Claude setup shown in the homepage stack.
export const engineeringAgentTools = aiToolNames([
  "claudeCode",
  "opus",
  "sonnet",
  "herdr",
  "handy",
]);

export const aiWorkflow = {
  path: "/ai",
  navigationLabel: "AI workflow",
  kicker: "Claude Code · Opus plans · Sonnet builds",
  title: "How I build with agents.",
  introduction:
    "I start with the product question: who needs this, what should change, and what could go wrong? Then I build with Claude Code. Opus plans, Sonnet builds, and agents review. I approve the plan and merge the result.",
  profileSummary:
    "I build AI features and agents into real products, including assistants that propose changes and wait for approval. I build with Claude Code, where Opus plans and Sonnet builds, and I direct the work, review the code, and verify the results.",
  setup: {
    kicker: "My setup right now",
    title: "One harness. Two models. I stay in charge.",
    lead: "My setup is fully Claude. I moved from a mix of Claude and GPT tools to Claude Code as the harness for all of my work, with Claude models behind it. Herdr holds the sessions and Handy takes my voice.",
  },
  home: {
    title: "How I build with agents",
    description:
      "Question the idea first. Capture the decisions, slice the work into small end-to-end tasks, and use tests and review to challenge the implementation—not just produce more code.",
  },
  resumeSummary:
    "Direct coding agents through product discovery, implementation, and review; retain ownership of technical decisions and verify changes with tests and direct inspection.",
  attribution: {
    text: "My workflow adapts Matt Pocock’s agent skills to the size of the change.",
    label: "Matt Pocock’s agent skills",
    href: "https://github.com/mattpocock/skills",
  },
  loopNote:
    "The factory runs this loop on tickets; I still run it by hand for discovery, prototypes, and small fixes.",
  flexibility:
    "A small fix may need only a clear decision and acceptance criteria; larger changes get a spec and tickets. I approve what is committed and released and check the deployed result. Shipping is never an unattended agent decision.",
  feedbackLoop: "Review, refine, repeat. Findings inform the next pass.",
} as const;

export const setupItems = [
  {
    tool: "claudeCode",
    kicker: "Harness",
    title: "Claude Code",
    body: "Every agent I run is Claude Code: the terminal agent with its tools, permissions, subagents, skills, and hooks. One harness means one set of instructions and skills across every project, and my factory is built from the same parts.",
    link: {
      label: "Claude Code",
      href: "https://www.anthropic.com/claude-code",
    },
  },
  {
    tool: "opus",
    kicker: "Plans",
    title: "Claude Opus",
    body: "Plans and judges. In the factory, Opus writes the plan and rates its risk, reviews security, and makes the final call before a pull request. It also builds when a plan is rated high risk.",
    link: {
      label: "Model information",
      href: "https://www.anthropic.com/claude/opus",
    },
  },
  {
    tool: "sonnet",
    kicker: "Builds",
    title: "Claude Sonnet",
    body: "Builds and checks. Sonnet implements each slice test-first, judges the UI screenshots, and reviews code and design.",
    link: {
      label: "Model information",
      href: "https://www.anthropic.com/claude/sonnet",
    },
  },
  {
    tool: "herdr",
    kicker: "Workspace",
    title: "Herdr",
    body: "Herdr keeps my Claude Code sessions in workspaces, tabs, and panes on one screen and recognizes the agents running in them, so parallel work stays visible.",
    link: { label: "Herdr", href: "https://herdr.dev" },
  },
  {
    tool: "handy",
    kicker: "Voice input",
    title: "Handy",
    body: "I dictate prompts, grill answers, and notes with Handy. It turns speech into text; it makes no decisions.",
    link: { label: "Handy", href: "https://handy.computer" },
  },
] as const satisfies readonly {
  tool: AiToolId;
  kicker: string;
  title: string;
  body: string;
  link?: { label: string; href: string };
}[];

export const setupMap = {
  voice: {
    kicker: "Voice in",
    title: "Handy",
    line: "Speech to text in any prompt",
  },
  me: {
    kicker: "Me",
    title: "Decide",
    line: "What to build, which plan, what ships",
  },
  herdr: "Herdr · terminal workspace",
  harness: "Claude Code · harness",
  models: [
    { name: "Opus", role: "Plans, reviews security, approves" },
    { name: "Sonnet", role: "Builds, verifies, reviews code and design" },
  ],
  parts: "Skills · subagents · hooks",
  out: {
    kicker: "Out",
    title: "Draft PR",
    line: "Description, commits, screenshots, CI",
  },
  returnLabel: "Back to me to review and merge",
  caption:
    "My voice goes in through Handy. I decide what to build. Claude Code runs in Herdr, with Opus planning and Sonnet building. The work comes back to me as a draft pull request.",
} as const;

export const workflowStages = [
  {
    id: "grill",
    title: "Grill",
    description:
      "Question the need, read the code, and challenge assumptions. Research or prototype when the answer is unclear.",
    output: "Agreed decisions",
  },
  {
    id: "spec",
    title: "Spec",
    description:
      "Record the behavior, boundaries, and acceptance criteria, with the reasoning behind them.",
    output: "A durable spec",
  },
  {
    id: "tickets",
    title: "Tickets",
    description:
      "Split the work into thin vertical slices, each with a way to verify it.",
    output: "Verifiable tickets",
  },
  {
    id: "implement",
    title: "Implement",
    description:
      "Build in small steps with tests, type checks, runtime feedback, and direct inspection.",
    output: "Reviewable changes",
  },
  {
    id: "review",
    title: "Code Review",
    description:
      "Review standards and the spec separately, exercise the result, and iterate before acceptance.",
    output: "Reviewed code",
  },
] as const;

export const workflowEvidence = [
  {
    slug: "relay",
    title: "Domain rules that can be checked",
    description:
      "Relay’s public documentation identifies RSVP, queue, expense, and permission rules alongside repeatable quality commands. The decisions and checks are more useful evidence than a claim about how quickly code was generated.",
    artifact: {
      label: "Read the documented checks",
      href: "https://github.com/vn-aj-vngrd/relay/blob/master/README.md#quality-commands",
    },
  },
  {
    slug: "roleway",
    title: "Approval is part of the product",
    description:
      "Roleway’s agent prepares internal changes for explicit approval. Its public documentation describes access controls and end-to-end checks. This is AI product functionality, distinct from the coding agents I use to develop it.",
    artifact: {
      label: "Read the security and quality notes",
      href: "https://github.com/vn-aj-vngrd/roleway/blob/main/README.md#security-and-privacy",
    },
  },
] as const;

// AI inside products, as distinct from the coding agents used to build them.
// Each line repeats a fact from the product's case study or the experience entry.
export const shippedAi = [
  {
    slug: "relay",
    name: "Relay",
    title: "A tool-calling agent over permission-checked data",
    description:
      "Relay’s Agent streams answers from Zod-validated tools that read only the games, groups, and courts a player is allowed to see. Creating anything goes through a review card and an explicit approval, and the server rechecks permissions before it writes.",
    stack: "Vercel AI SDK · OpenRouter · Zod",
    loop: {
      reads:
        "Games, groups, and courts the player may see, through permission-checked tools",
      checks: "Tools and proposals are validated with Zod",
      approval:
        "A review card the player approves; the server rechecks permissions before it writes",
      proof:
        "Live Agent evals passed 52 of 54 checks over six runs on one model (Nov 2026)",
    },
  },
  {
    slug: "roleway",
    name: "Roleway",
    title: "A provider-neutral tool loop, authorized by the database",
    description:
      "Roleway’s Agent runs on the provider the user connects: OpenAI, Anthropic, Gemini, or OpenRouter. Proposals are validated with Zod, and approval calls PostgreSQL functions that recheck ownership, status, and expiry in a transaction.",
    stack: "Vercel AI SDK · OpenAI, Anthropic, Gemini APIs · PostgreSQL",
    loop: {
      reads: "Scoped read tools over bounded Workspace context, not raw SQL",
      checks: "Zod validates the answer and every proposal",
      approval:
        "Each change approved one by one; PostgreSQL functions recheck ownership, status, and expiry",
      proof:
        "Unit tests cover provider parsing and validation; Playwright covers authorization",
    },
  },
  {
    slug: "aqd",
    name: "AQD",
    title: "An on-device agent with reviewed change sets",
    description:
      "AQD’s Agent runs on Apple Foundation Models with no cloud AI. It answers from the closet and drafts changes as change sets the owner ticks, applies, and can undo. A deterministic eval gate and a live on-device eval check it.",
    stack: "Swift · Foundation Models · Swift Testing",
    loop: {
      reads: "The closet on the phone, with no cloud AI",
      checks: "Grounding repair and Agent budgets are pure, tested Core rules",
      approval: "Change sets the owner ticks, applies, and can undo",
      proof:
        "Release gate: 714 of 747 cases fully clean over 24 live runs (Oct 2026)",
    },
  },
  {
    slug: "qsm",
    name: "QSM · client work",
    title: "AI import, editor, and assistant in a production system",
    description:
      "In a ship-management company’s safety system, AI Import turns a legacy PDF into a structured form: one page per model call, validated against the form schema, repaired on failure, and reviewed against the page image. An editor streams document help under fixed maritime rules, and an assistant answers from permission-checked data. Every call is capped per user and audited.",
    stack: "Vercel AI SDK · Google, Anthropic, OpenAI-compatible · BullMQ",
    loop: {
      reads: "The assistant answers from permission-checked database summaries",
      checks:
        "Imports are validated against the form schema, repaired on failure, and checked for leaked prompt text",
      approval:
        "An import lands as a draft beside the source PDF for a person to correct",
      proof:
        "AI package tests cover parsing, repair, prompt building, and rate limits",
    },
  },
  {
    slug: "viya",
    name: "Viya",
    title: "A trip agent with 17 scoped tools",
    description:
      "Viya’s agent is scoped to one trip. Every proposed change is validated against shared schemas and saved as a draft for the traveler to review, with deterministic fallbacks behind one provider interface.",
    stack: "TypeScript · Convex · Zod",
    loop: {
      reads:
        "Ten of its 17 tools read the trip: itinerary, budget, bookings, readiness, and more",
      checks: "Shared schemas validate every structured output",
      approval:
        "A draft the traveler applies or dismisses; the agent never edits a trip",
      proof: "Backend contract tests cover AI draft application",
    },
  },
  {
    name: "Full Scale · Lytho",
    title: "Agent features in a customer product",
    description:
      "At Full Scale I built AI Reviewer and AI Insights for Lytho and contributed to AI Skills and AI Teammates: agent features that help customers review content and surface insights.",
    stack: "React · C# / ASP.NET Core · AWS",
  },
] as const satisfies readonly {
  slug?: string;
  name: string;
  title: string;
  description: string;
  stack: string;
  // Where the agent sits in the shared loop; each line restates the case study in projects.ts.
  loop?: { reads: string; checks: string; approval: string; proof: string };
}[];

// The loop every shipped agent follows, drawn above the ledger.
export const shippedAgentLoop = {
  title: "The loop every agent follows",
  labels: {
    reads: "Reads",
    checks: "Checks",
    approval: "Needs approval",
    proof: "Proof",
  },
  steps: [
    {
      label: "Read",
      detail: "Scoped tools return only what the user may see",
    },
    {
      label: "Validate",
      detail: "Model output is checked against schemas before anything uses it",
    },
    {
      label: "Propose",
      detail: "A draft, review card, or change set waits for a person",
      person: true,
    },
    {
      label: "Apply",
      detail:
        "Only after approval. Relay and Roleway recheck permissions; AQD can undo",
    },
  ],
  caption:
    "Each agent below reads, checks, and proposes on its own. Nothing is written until a person approves it, and a dismissed proposal changes nothing.",
} as const;

export const skillGroups = [
  {
    title: "Research and product decisions",
    description: "Clarify the problem before committing to an implementation.",
    skills: [
      {
        name: "grilling",
        description:
          "Challenge assumptions, inspect the codebase, and resolve product ambiguity through questions.",
      },
      {
        name: "research",
        description:
          "Check primary sources and record the findings that inform a decision.",
      },
      {
        name: "prototype",
        description:
          "Explore uncertain interfaces, behavior, and technical approaches with disposable work.",
      },
      {
        name: "domain-modeling",
        description:
          "Keep domain terminology and important architectural decisions explicit.",
      },
    ],
  },
  {
    title: "Implementation and quality",
    description:
      "Build testable changes, diagnose failures, and review the result.",
    skills: [
      {
        name: "codebase-design",
        description: "Define clear module boundaries and testing seams.",
      },
      {
        name: "tdd",
        description:
          "Use red-green-refactor where the agreed testing seam supports it.",
      },
      {
        name: "diagnosing-bugs",
        description:
          "Reproduce a failure, investigate the cause, and verify the fix.",
      },
      {
        name: "code-review",
        description:
          "Review engineering standards and fidelity to the originating issue or specification.",
      },
      {
        name: "resolving-merge-conflicts",
        description:
          "Resolve conflicts without silently discarding intended behavior.",
      },
    ],
  },
  {
    title: "Product and interface",
    description: "Review the experience people will actually use.",
    skills: [
      {
        name: "impeccable",
        description:
          "Shape, audit, and refine interface behavior and presentation.",
      },
      {
        name: "frontend-design",
        description:
          "Make intentional visual decisions for new and existing interfaces.",
      },
      {
        name: "web-design-guidelines",
        description:
          "Check accessibility, interaction, and web-interface practices.",
      },
      {
        name: "vercel-react-best-practices",
        description: "Review React and Next.js performance patterns.",
      },
    ],
  },
  {
    title: "Agent operations",
    description:
      "Make instructions reusable and execution inspectable across agents.",
    skills: [
      {
        name: "writing-for-agents",
        description:
          "Maintain agent instructions and custom skills for recurring work.",
      },
      {
        name: "agent-browser",
        description:
          "Exercise browser flows, inspect interfaces, and capture verification evidence.",
      },
      {
        name: "wizard",
        description:
          "Guide human-only setup and configuration steps explicitly.",
      },
    ],
  },
  {
    title: "Factory",
    description: "My own skills that run the factory.",
    skills: [
      {
        name: "factory",
        description:
          "Takes an issue through grill, plan, building, proof, and review to a draft pull request.",
      },
      {
        name: "product",
        description:
          "Turns an idea into tickets and keeps each product’s notes current.",
      },
      {
        name: "factory-retro",
        description:
          "Reads the run logs and proposes a fix for the biggest bottleneck.",
      },
    ],
  },
] as const;

// Each item is one accountability: a short label for scanning, then the commitment itself.
export const agentGuardrails = [
  {
    title: "Requirements",
    text: "Keep the user need, constraints, and acceptance criteria explicit.",
  },
  {
    title: "Scope",
    text: "Give each agent a bounded task and an output I can inspect.",
  },
  {
    title: "Evidence",
    text: "Check repository evidence and primary documentation instead of accepting confident claims.",
  },
  {
    title: "Verification",
    text: "Treat generated code as a proposal: run relevant tests, type checks, browser checks, and direct review.",
  },
  {
    title: "Confidentiality",
    text: "Protect confidential employer and client information, credentials, private source, and remote-access details.",
  },
  {
    title: "Control",
    text: "Keep tool permissions, plan approval, merges, and releases under my control.",
  },
] as const;
