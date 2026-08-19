export const favoriteModels = [
  {
    name: "GPT-5.6 Sol",
    role: "Daily driver",
    use: "Repository implementation, code analysis, debugging, test planning, and review.",
  },
  {
    name: "Sonnet 5.0",
    role: "Daily driver",
    use: "Product requirements, architecture discussions, technical writing, and interface review.",
  },
] as const;

export const agentSurfaces = [
  {
    title: "Orchestration",
    tools: ["cmux", "HERDR"],
    description: "Run parallel agent sessions and keep each task, terminal, and result visible.",
  },
  {
    title: "Terminal agents",
    tools: ["Claude Code", "Codex CLI", "Pi"],
    description: "Inspect repositories, edit code, run commands, diagnose failures, and review changes from the terminal.",
  },
  {
    title: "Desktop agents",
    tools: ["Claude app", "Codex app"],
    description: "Research documentation, compare approaches, review plans, and work through decisions outside the editor.",
  },
  {
    title: "Editors",
    tools: ["Cursor", "VS Code", "GitHub Copilot"],
    description: "Edit and navigate code directly, use completions where they help, and inspect every change in context.",
  },
] as const;

export const workflowStages = [
  {
    title: "Frame",
    description: "Write down the user need, constraints, existing evidence, open questions, and acceptance criteria before editing code.",
    output: "Scope and acceptance criteria",
  },
  {
    title: "Challenge",
    description: "Check assumptions against the repository and documentation, then identify edge cases, failure modes, and unnecessary scope.",
    output: "Reviewed approach",
  },
  {
    title: "Build",
    description: "Break the plan into bounded changes, keep responsibilities clear, and review each diff before moving to the next step.",
    output: "Reviewable changes",
  },
  {
    title: "Verify",
    description: "Run the relevant tests, type checks, browser flows, accessibility checks, and production-like scenarios.",
    output: "Verification evidence",
  },
  {
    title: "Ship",
    description: "Review the complete diff, record important decisions, commit the change, and check the deployed result.",
    output: "Verified release",
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
  "Define the requirement and acceptance criteria before choosing a model or agent.",
  "Give each agent a bounded task with an output that can be reviewed.",
  "Check repository code and primary documentation before accepting a claim.",
  "Run tests, type checks, browser checks, and direct code review before release.",
  "Keep employer, client, credential, and private repository data out of prompts and portfolio material.",
] as const;
