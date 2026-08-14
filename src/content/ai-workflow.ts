export const favoriteModels = [
  {
    name: "GPT-5.6 Sol",
    role: "Daily driver",
    use: "Implementation, code reasoning, review passes, and structured execution across a repository.",
  },
  {
    name: "Sonnet 5.0",
    role: "Daily driver",
    use: "Product thinking, architecture, writing, interface critique, and long-context collaboration.",
  },
] as const;

export const agentSurfaces = [
  {
    title: "Orchestration",
    tools: ["cmux", "HERDR"],
    description: "Coordinate parallel agent work while keeping sessions and responsibilities visible.",
  },
  {
    title: "Terminal agents",
    tools: ["Claude Code", "Codex CLI", "Pi"],
    description: "Repository-native planning, implementation, diagnosis, review, and validation.",
  },
  {
    title: "Desktop agents",
    tools: ["Claude app", "Codex app"],
    description: "Focused reasoning, research, review, and cross-project conversations.",
  },
  {
    title: "Editors",
    tools: ["Cursor", "VS Code", "GitHub Copilot"],
    description: "Direct code editing, navigation, completion, and human-in-the-loop refinement.",
  },
] as const;

export const workflowStages = [
  {
    title: "Frame",
    description: "Turn the request into constraints, evidence, acceptance criteria, and a reviewable plan.",
    output: "Problem definition",
  },
  {
    title: "Challenge",
    description: "Stress-test assumptions, terminology, architecture, scope, and hidden failure modes.",
    output: "Sharper decisions",
  },
  {
    title: "Build",
    description: "Delegate bounded work, preserve module seams, and keep each change easy to inspect.",
    output: "Small coherent diffs",
  },
  {
    title: "Verify",
    description: "Run tests, builds, browser checks, accessibility review, and evidence-based critique.",
    output: "Validated behavior",
  },
  {
    title: "Ship",
    description: "Review the final diff, document trade-offs, commit intentionally, and verify production.",
    output: "Released software",
  },
] as const;

export const skillGroups = [
  {
    title: "Product and interface",
    skills: [
      {
        name: "impeccable",
        description: "Design, audit, polish, or optimize frontend interfaces and UX.",
      },
      {
        name: "frontend-design",
        description: "Create distinctive, intentional visual designs for new or existing UIs.",
      },
      {
        name: "prototype",
        description: "Build throwaway prototypes to explore logic, state models, or UI.",
      },
      {
        name: "web-design-guidelines",
        description: "Audit UI code for accessibility, UX, and web-interface best practices.",
      },
    ],
  },
  {
    title: "Architecture and quality",
    skills: [
      {
        name: "code-review",
        description: "Review changes against repository standards and the originating spec.",
      },
      {
        name: "codebase-design",
        description: "Design deeper, clearer module interfaces and architectural seams.",
      },
      {
        name: "diagnosing-bugs",
        description: "Diagnose difficult bugs, failures, and performance regressions.",
      },
      {
        name: "domain-modeling",
        description: "Define domain terminology, models, and architectural decisions.",
      },
      {
        name: "tdd",
        description: "Develop features and fixes test-first using red-green-refactor.",
      },
      {
        name: "resolving-merge-conflicts",
        description: "Resolve active Git merge or rebase conflicts.",
      },
      {
        name: "vercel-react-best-practices",
        description: "Optimize React and Next.js code using Vercel’s performance guidance.",
      },
    ],
  },
  {
    title: "Research and decisions",
    skills: [
      {
        name: "grilling",
        description: "Relentlessly stress-test a plan, decision, or idea.",
      },
      {
        name: "research",
        description: "Research topics using high-trust sources and record findings in Markdown.",
      },
    ],
  },
  {
    title: "Agent operations",
    skills: [
      {
        name: "wizard",
        description: "Create interactive Bash wizards for human-only setup or migration steps.",
      },
      {
        name: "writing-for-agents",
        description: "Create or edit agent instructions, skills, AGENTS.md, and CLAUDE.md.",
      },
      {
        name: "agent-browser",
        description: "Automate websites, browser testing, scraping, screenshots, and Electron apps.",
      },
    ],
  },
] as const;

export const agentGuardrails = [
  "Start with the product requirement, not the model.",
  "Give agents bounded responsibilities and inspectable outputs.",
  "Prefer repository evidence over confident-sounding assumptions.",
  "Keep tests, builds, browser checks, and human review in the loop.",
  "Never use confidential employer or client code as portfolio material.",
] as const;
