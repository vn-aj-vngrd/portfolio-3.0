export const aiTools = {
  claudeCode: { name: "Claude Code", kind: "Coding agent" },
  codex: { name: "Codex", kind: "Coding agent and app" },
  pi: { name: "Pi Agent", kind: "Coding agent harness" },
  cursor: { name: "Cursor", kind: "AI editor" },
  copilot: { name: "GitHub Copilot", kind: "Coding assistant" },
  chatgpt: { name: "ChatGPT", kind: "Research and reasoning app" },
  claude: { name: "Claude", kind: "Research and reasoning app" },
  cowork: { name: "Cowork", kind: "Desktop workspace" },
  cmux: { name: "cmux", kind: "Terminal workspace" },
  herdr: { name: "HERDR", kind: "Agent workspace management" },
  wispr: { name: "Wispr Flow", kind: "Voice dictation" },
  termius: { name: "Termius", kind: "Remote terminal access" },
  vscode: { name: "VS Code", kind: "Editor" },
  opencode: { name: "OpenCode", kind: "Coding agent" },
} as const;

type AiToolId = keyof typeof aiTools;

export function aiToolNames(ids: readonly AiToolId[]) {
  return ids.map((id) => aiTools[id].name);
}

export const resumeAiTools = aiToolNames([
  "claudeCode", "codex", "pi", "cursor", "copilot", "chatgpt", "claude",
]);
export const resumeWorkflowTools = aiToolNames(["cmux", "herdr", "wispr"]);

// Preserve the wider working inventory, not just the highlighted daily setup.
export const engineeringAgentTools = aiToolNames([
  "claudeCode", "codex", "cursor", "copilot", "pi", "opencode", "cmux", "herdr",
  "chatgpt", "claude", "wispr", "termius",
]);

export const modelPreferences = {
  professional: {
    name: "Claude models",
    context: "Professional work",
    use: "My usual model family for professional development with Claude Code. I choose the model and interface to suit the task.",
    source: "https://www.anthropic.com/claude",
  },
  personal: {
    name: "GPT-6 Astra",
    context: "Personal-project daily driver",
    use: "My current daily driver for personal projects. Pi Agent is my lightweight CLI harness for OpenAI/Codex models; I also use the Codex app and ChatGPT as the task requires.",
    source: "https://developers.openai.com/api/docs/models/gpt-6-astra",
  },
} as const;

export const aiWorkflow = {
  path: "/ai",
  navigationLabel: "AI workflow",
  title: "How I build with agents.",
  introduction:
    "I start with the product question: who needs this, what should change, and what could go wrong? Agents help me investigate, implement, and review. I remain responsible for the decisions and the result.",
  profileSummary:
    "I use coding agents to explore product decisions, implement focused changes, and check them through tests and review.",
  home: {
    title: "How I build with agents",
    description:
      "Question the idea first. Capture the decisions, slice the work into small end-to-end tasks, and use tests and review to challenge the implementation—not just produce more code.",
  },
  resumeSummary:
    "Use coding agents for product discovery, implementation, and review; adapt the workflow to each task and verify results with tests and direct inspection.",
  attribution: {
    text: "My workflow adapts Matt Pocock’s agent skills to the size of the change.",
    label: "Matt Pocock’s agent skills",
    href: "https://github.com/mattpocock/skills",
  },
  flexibility:
    "This is a working loop, not a documentation ceremony. A small fix may need only a clear decision and acceptance criteria; larger changes deserve a spec and tickets. Research and prototypes help when the answer is still uncertain.",
  releaseResponsibility:
    "Planning and verification happen throughout. I approve what is committed or released and check the deployed result; shipping is not an unattended agent decision.",
  workspace:
    "cmux is my daily terminal workspace. HERDR keeps CLI agents, tasks, and sessions organized in one place. I default to a lightweight terminal setup and switch to desktop tools when the task benefits from broader app or computer interaction.",
} as const;

export const workflowStages = [
  {
    id: "grill",
    title: "Grill",
    description: "Question the user need, inspect the codebase, and challenge assumptions. Research or prototype when an answer is not yet clear.",
    output: "Agreed decisions and constraints",
  },
  {
    id: "spec",
    title: "Spec",
    description: "Record the resolved behavior, boundaries, and acceptance criteria. Preserve the reasoning without restarting discovery.",
    output: "A durable specification",
  },
  {
    id: "tickets",
    title: "Tickets",
    description: "Split larger work into small vertical slices across the relevant layers, with dependencies and a way to verify each result.",
    output: "Verifiable end-to-end tasks",
  },
  {
    id: "implement",
    title: "Implement",
    description: "Give agents bounded tasks and focused context. Build incrementally with tests, type checks, runtime feedback, and direct inspection.",
    output: "Reviewable changes and checks",
  },
  {
    id: "review",
    title: "Code Review",
    description: "Check engineering standards and requirement fidelity separately. Review the findings, exercise the result, and iterate before acceptance.",
    output: "Reviewed implementation",
  },
] as const;

type ToolContext = {
  title: string;
  description: string;
  tools: readonly AiToolId[];
};

export const executionContexts = [
  {
    title: "Professional CLI work",
    description: "Claude Code with Claude models is my usual work setup. HERDR keeps sessions and tasks visible while I move between implementation and review.",
    tools: ["claudeCode", "cmux", "herdr"],
  },
  {
    title: "Personal CLI work",
    description: `Pi Agent runs OpenAI/Codex models for my personal projects, with ${modelPreferences.personal.name} as my current daily driver. Pi provides the agent harness; OpenAI provides the model.`,
    tools: ["pi", "cmux", "herdr"],
  },
  {
    title: "Complex desktop tasks",
    description: "I use the Codex app, Claude Code on desktop, and Claude’s Cowork for tasks involving other apps, files, or supported computer interactions. I choose the environment and permissions for the task, rather than treating every chat as computer access.",
    tools: ["codex", "claudeCode", "claude", "cowork"],
  },
] as const satisfies readonly ToolContext[];

export const supportingContexts = [
  {
    title: "Research and decisions",
    description: "Question assumptions, compare approaches, and learn enough to make an informed product or engineering decision.",
    tools: ["chatgpt", "claude"],
  },
  {
    title: "Editing and inspection",
    description: "Navigate the code, use assistance where useful, and inspect changes directly in context.",
    tools: ["cursor", "vscode", "copilot"],
  },
  {
    title: "Voice input",
    description: "Dictate prompts, questions, and notes with Wispr Flow. It is an input layer, not the agent making the decisions.",
    tools: ["wispr"],
  },
  {
    title: "Remote access",
    description: "Use Termius for remote terminal access to my Mac and HERDR workspace. I also continue supported Claude and Codex sessions through their native remote features; terminal access and remote-agent control are different tools.",
    tools: ["termius", "herdr", "claudeCode", "codex"],
  },
] as const satisfies readonly ToolContext[];

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
      { name: "grilling", description: "Challenge assumptions, inspect the codebase, and resolve product ambiguity through questions." },
      { name: "research", description: "Check primary sources and record the findings that inform a decision." },
      { name: "prototype", description: "Explore uncertain interfaces, behavior, and technical approaches with disposable work." },
      { name: "domain-modeling", description: "Keep domain terminology and important architectural decisions explicit." },
    ],
  },
  {
    title: "Implementation and quality",
    description: "Build testable changes, diagnose failures, and review the result.",
    skills: [
      { name: "codebase-design", description: "Define clear module boundaries and testing seams." },
      { name: "tdd", description: "Use red-green-refactor where the agreed testing seam supports it." },
      { name: "diagnosing-bugs", description: "Reproduce a failure, investigate the cause, and verify the fix." },
      { name: "code-review", description: "Review engineering standards and fidelity to the originating issue or specification." },
      { name: "resolving-merge-conflicts", description: "Resolve conflicts without silently discarding intended behavior." },
    ],
  },
  {
    title: "Product and interface",
    description: "Review the experience people will actually use.",
    skills: [
      { name: "impeccable", description: "Shape, audit, and refine interface behavior and presentation." },
      { name: "frontend-design", description: "Make intentional visual decisions for new and existing interfaces." },
      { name: "web-design-guidelines", description: "Check accessibility, interaction, and web-interface practices." },
      { name: "vercel-react-best-practices", description: "Review React and Next.js performance patterns." },
    ],
  },
  {
    title: "Agent operations",
    description: "Make instructions reusable and execution inspectable across agents.",
    skills: [
      { name: "writing-for-agents", description: "Maintain agent instructions and custom skills for recurring work." },
      { name: "agent-browser", description: "Exercise browser flows, inspect interfaces, and capture verification evidence." },
      { name: "wizard", description: "Guide human-only setup and configuration steps explicitly." },
    ],
  },
] as const;

export const agentGuardrails = [
  "Keep the user need, constraints, and acceptance criteria explicit.",
  "Give each agent a bounded task and an output I can inspect.",
  "Check repository evidence and primary documentation instead of accepting confident claims.",
  "Treat generated code as a proposal: run relevant tests, type checks, browser checks, and direct review.",
  "Protect confidential employer and client information, credentials, private source, and remote-access details.",
  "Keep tool permissions, final acceptance, commits, and release decisions under human control.",
] as const;
