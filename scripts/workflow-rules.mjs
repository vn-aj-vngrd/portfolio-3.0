export const prSections = [
  "Summary",
  "Changes",
  "Technical details",
  "How to test",
  "Risk / impact",
  "Companion PRs",
  "Follow-ups",
];

const subjectPattern =
  /^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(\([a-z0-9][a-z0-9._/-]*\))?!?: [A-Z0-9`][^\r\n]*[^.\s]$/u;

export function validateSubject(subject, { maintenance = false } = {}) {
  if (
    maintenance &&
    /^(Merge (branch|remote-tracking branch) |Revert ")/u.test(subject)
  )
    return [];
  return !/[\r\n]/u.test(subject) &&
    subjectPattern.test(subject) &&
    subject.length <= 72
    ? []
    : [
        "Use a Conventional Commit subject of at most 72 characters, with a sentence-case summary and no trailing period (e.g. feat: Add project search).",
      ];
}

export function validateBranch(branch, { bot = false } = {}) {
  if (bot && /^(dependabot\/|renovate\/|imgbot$)/u.test(branch)) return [];
  return /^van\/[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(branch)
    ? []
    : [
        "Use van/<short-kebab-case-description>; keep ticket references in the body. Work reaches main through a PR.",
      ];
}

export function validatePush(input) {
  return input
    .split("\n")
    .some((line) => line.trim().split(/\s+/u)[2] === "refs/heads/main")
    ? [
        "Push a feature branch and open a PR; direct updates or deletion of main are blocked.",
      ]
    : [];
}

export function validatePullRequest(pr) {
  if (!pr) return ["Missing pull request metadata."];
  const errors = [
    ...validateSubject(pr.title ?? ""),
    ...validateBranch(pr.head?.ref ?? "", { bot: pr.user?.type === "Bot" }),
  ];
  if (pr.base?.ref !== "main") errors.push("Target main.");
  const body = (pr.body ?? "").replace(/<!--[\s\S]*?-->/gu, "");
  const headings = [...body.matchAll(/^## (.+)\s*$/gmu)];
  if (
    headings.map((match) => match[1].trim()).join("|") !== prSections.join("|")
  ) {
    errors.push("Use the PR template headings, once each and in order.");
  }
  for (const [index, heading] of headings.entries()) {
    const content = body
      .slice(
        heading.index + heading[0].length,
        headings[index + 1]?.index ?? body.length
      )
      .replace(/^\s*(?:[-*]|\d+\.)\s*/gmu, "")
      .trim();
    if (!content || /^(todo|tbd|n\/a|\.\.\.)\.?$/iu.test(content)) {
      errors.push(
        `Fill in ${heading[1].trim()} with evidence or an explicit None.`
      );
    }
    if (
      ["Summary", "Changes", "How to test"].includes(heading[1].trim()) &&
      /^none\.?$/iu.test(content)
    ) {
      errors.push(`${heading[1].trim()} needs a concrete explanation.`);
    }
  }
  if (/!:/u.test(pr.title ?? "") && !/BREAKING CHANGE: \S/u.test(body)) {
    errors.push(
      "Describe impact and migration in a BREAKING CHANGE: footer for a breaking PR."
    );
  }
  return errors;
}
