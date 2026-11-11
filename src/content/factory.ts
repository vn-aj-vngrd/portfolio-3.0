// Facts about the software factory. No runtime imports: the Node tests load this file directly.
// Publish no run counts, rates, timings or cost; the factory has too few finished jobs to support one.

export type FactoryStageId =
  | "issue"
  | "grill"
  | "plan"
  | "gate"
  | "build"
  | "prove"
  | "review"
  | "approve"
  | "pr"
  | "merge";

export type FactoryStage = {
  id: FactoryStageId;
  label: string;
  actor: string;
  models: readonly ("Opus" | "Sonnet")[];
  phase?: string;
  summary: string;
};

export const factoryIntro = {
  kicker: "The software factory",
  title: "A ticket goes in. A draft PR comes out. I merge.",
  lead: [
    "I built a software factory on Claude Code. It takes a GitHub issue through a plan, test-first building, proof in the real UI, and independent reviews, and it ends at a draft pull request with screenshots. My one gate is the plan. The merge is mine too.",
  ],
  aqdLine: {
    before: "I run it on my own products, starting with ",
    linkText: "AQD",
    href: "/work/aqd",
    after: ".",
  },
} as const;

export const factoryStages = [
  {
    id: "issue",
    label: "Issue",
    actor: "Me",
    models: [],
    phase: "Before code · I take part",
    summary:
      "I write the problem, spec, and acceptance criteria as a GitHub issue. Open issues run oldest first.",
  },
  {
    id: "grill",
    label: "Grill",
    actor: "Claude Code",
    models: [],
    summary:
      "Asks only what the issue leaves open, each question with a recommended answer.",
  },
  {
    id: "plan",
    label: "Plan",
    actor: "Opus",
    models: ["Opus"],
    summary:
      "Reads the code, then writes thin slices, locked criteria, UI proof scenarios, and a risk rating.",
  },
  {
    id: "gate",
    label: "Approve plan",
    actor: "Me",
    models: [],
    summary: "My one gate: yes, changes, or skip. Yes locks the plan.",
  },
  {
    id: "build",
    label: "Build",
    actor: "Sonnet · Opus on high risk",
    models: ["Sonnet", "Opus"],
    phase: "After my yes · agents only",
    summary:
      "Builds each slice test-first: a failing test, the code that passes it, one commit.",
  },
  {
    id: "prove",
    label: "Prove",
    actor: "Sonnet",
    models: ["Sonnet"],
    summary:
      "Runs the checks, drives the real UI, and judges each screenshot against its pass condition.",
  },
  {
    id: "review",
    label: "Review",
    actor: "Sonnet · Opus for security",
    models: ["Sonnet", "Opus"],
    summary:
      "Code review always, design review on UI, security review on risk. Findings go back to the builder.",
  },
  {
    id: "approve",
    label: "Approve",
    actor: "Opus",
    models: ["Opus"],
    summary:
      "Re-runs the checks, confirms every criterion, and writes the PR description. Escalates what only I can judge.",
  },
  {
    id: "pr",
    label: "Draft PR",
    actor: "Script",
    models: [],
    summary:
      "A script, not an agent, pushes the branch and opens a draft PR with screenshots that closes the issue on merge.",
  },
  {
    id: "merge",
    label: "Merge",
    actor: "Me",
    models: [],
    phase: "Outside the factory",
    summary: "I review, merge, and deploy. The factory never does.",
  },
] as const satisfies readonly FactoryStage[];

export const factoryFigureDescription =
  "Ten stages. I write an issue. Claude Code asks only the open questions. Opus writes the plan. I approve it; this is my one gate. Sonnet builds each slice test-first, the checks and UI proof run, and code, design, and security reviews read the diff; changes go back to the builder. Opus approves, a script opens a draft pull request, and I review and merge.";

export const factoryReviewLoopText =
  "Findings go back to the builder, two rounds at most.";

export const factoryRoles = [
  {
    who: "Me",
    does: "Write and order the issues, answer the grill, approve the plan, review and merge the pull request, deploy.",
  },
  {
    who: "Opus",
    does: "Planner, security reviewer, final approver, product agent, and the builder on high-risk plans.",
  },
  {
    who: "Sonnet",
    does: "Builder, UI verifier, code reviewer, and design reviewer.",
  },
  {
    who: "Scripts",
    does: "Job state, git, checks, the push, and the draft pull request. No agent pushes.",
  },
] as const;

export const factoryGuardrails = [
  "Change the plan after I approve it. The plan is locked; a mismatch stops the run.",
  "Push, merge, rebase, deploy, reach the network, or read secrets. A guard hook checks every tool call against the agent’s role. It is a seatbelt, not a sandbox.",
  "Quietly weaken the checks. Skipping or deleting a test, or adding a lint or type suppression, turns verification red.",
  "Touch migrations, auth, payments, infrastructure, CI, or secrets without me. Those paths always stop for my review.",
  "Keep retrying forever. After two rework rounds, a red base, or a conflict, it stops and tells me why.",
  "Merge or deploy. It ends at a draft pull request.",
] as const;

export const factoryImprovement =
  "Every run logs what slowed it down or went wrong. A retro reads those logs and proposes one fix for the biggest bottleneck: a new check, a lesson, or an agent edit. Nothing changes until I approve it.";

export type FactoryFrame = {
  id: string;
  stage: FactoryStageId;
  mode: "active" | "waiting" | "approved" | "changes" | "return";
  ms: number;
  caption: string;
};

export const factoryIdleCaption = "Follow one issue through the factory.";

export const factoryRunFrames = [
  {
    id: "issue",
    stage: "issue",
    mode: "active",
    ms: 1800,
    caption:
      "I file an issue: the problem, the spec, and how we’ll know it works.",
  },
  {
    id: "grill",
    stage: "grill",
    mode: "active",
    ms: 2000,
    caption:
      "Claude Code asks only what the issue leaves open and recommends an answer to each question.",
  },
  {
    id: "plan",
    stage: "plan",
    mode: "active",
    ms: 2400,
    caption:
      "Opus reads the code and plans thin slices with locked criteria and a risk rating.",
  },
  {
    id: "gate-wait",
    stage: "gate",
    mode: "waiting",
    ms: 2800,
    caption:
      "The run stops and waits for me. I approve the plan, change it, or skip the issue.",
  },
  {
    id: "gate-yes",
    stage: "gate",
    mode: "approved",
    ms: 1200,
    caption:
      "Approved. The plan is locked, and from here the factory runs without asking.",
  },
  {
    id: "build",
    stage: "build",
    mode: "active",
    ms: 2400,
    caption:
      "Sonnet builds each slice test-first: a failing test, the code that passes it, one commit.",
  },
  {
    id: "prove",
    stage: "prove",
    mode: "active",
    ms: 2200,
    caption:
      "The checks run, then the real UI is driven and each screenshot is judged against its pass condition.",
  },
  {
    id: "review-changes",
    stage: "review",
    mode: "changes",
    ms: 2400,
    caption:
      "Reviewers read the whole diff. One asks for changes, so the work goes back to the builder.",
  },
  {
    id: "rework",
    stage: "build",
    mode: "return",
    ms: 1800,
    caption:
      "The builder fixes each finding, test first. Rework stops after two rounds.",
  },
  {
    id: "prove-again",
    stage: "prove",
    mode: "active",
    ms: 1200,
    caption: "The checks and screenshots run again.",
  },
  {
    id: "review-pass",
    stage: "review",
    mode: "active",
    ms: 1600,
    caption: "Code, design, and security reviews pass.",
  },
  {
    id: "approve",
    stage: "approve",
    mode: "active",
    ms: 2000,
    caption:
      "Opus re-runs the checks, confirms every criterion, and writes the PR description.",
  },
  {
    id: "pr",
    stage: "pr",
    mode: "active",
    ms: 2000,
    caption:
      "A script pushes the branch and opens a draft PR with the screenshots.",
  },
  {
    id: "merge",
    stage: "merge",
    mode: "waiting",
    ms: 0,
    caption:
      "The factory stops here. I review and merge; nothing merges or deploys on its own.",
  },
] as const satisfies readonly FactoryFrame[];
