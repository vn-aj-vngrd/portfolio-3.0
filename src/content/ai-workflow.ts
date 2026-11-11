export const aiTools = {
  claudeCode: { name: "Claude Code", kind: "Agent harness" },
  opus: { name: "Claude Opus", kind: "Planning model" },
  sonnet: { name: "Claude Sonnet", kind: "Building model" },
  herdr: { name: "Herdr", kind: "Terminal workspace for coding agents" },
  handy: { name: "Handy", kind: "Voice input" },
} as const;

type AiToolId = keyof typeof aiTools;

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
    kicker: "Harness",
    title: "Claude Code",
    body: "Every agent I run is Claude Code: the terminal agent with its tools, permissions, subagents, skills, and hooks. One harness means one set of instructions and skills across every project, and my factory is built from the same parts.",
    link: {
      label: "Claude Code",
      href: "https://www.anthropic.com/claude-code",
    },
  },
  {
    kicker: "Plans",
    title: "Claude Opus",
    body: "Plans and judges. In the factory, Opus writes the plan and rates its risk, reviews security, and makes the final call before a pull request. It also builds when a plan is rated high risk.",
    link: {
      label: "Model information",
      href: "https://www.anthropic.com/claude/opus",
    },
  },
  {
    kicker: "Builds",
    title: "Claude Sonnet",
    body: "Builds and checks. Sonnet implements each slice test-first, judges the UI screenshots, and reviews code and design.",
    link: {
      label: "Model information",
      href: "https://www.anthropic.com/claude/sonnet",
    },
  },
  {
    kicker: "Workspace",
    title: "Herdr",
    body: "Herdr keeps my Claude Code sessions in workspaces, tabs, and panes on one screen and recognizes the agents running in them, so parallel work stays visible.",
  },
  {
    kicker: "Voice input",
    title: "Handy",
    body: "I dictate prompts, grill answers, and notes with Handy. It turns speech into text; it makes no decisions.",
  },
] as const satisfies readonly {
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

export const agentGuardrails = [
  "Keep the user need, constraints, and acceptance criteria explicit.",
  "Give each agent a bounded task and an output I can inspect.",
  "Check repository evidence and primary documentation instead of accepting confident claims.",
  "Treat generated code as a proposal: run relevant tests, type checks, browser checks, and direct review.",
  "Protect confidential employer and client information, credentials, private source, and remote-access details.",
  "Keep tool permissions, plan approval, merges, and releases under my control.",
] as const;
