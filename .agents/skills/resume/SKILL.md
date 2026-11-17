---
name: resume
description: Write, tighten, or review Van's résumé (src/content/resume.ts and the Full Scale groups in experience.ts) for employers and for AI agents or ATS parsers that screen it. Use before changing résumé wording, bullets, summary, skills, or the /resume page and its print output.
---

# Résumé

The résumé is typed data rendered at `/resume` and printed to A4. Humans and automated screeners (ATS parsers, LLM reviewers) read the same text, so write plain, specific, verifiable lines. Load `portfolio-content` too: its source, confidentiality, and touchpoint rules still apply.

## Rules

- **Action, then result.** One line per achievement: strong verb, what changed, who or what it helped. 15–28 words. No filler ("responsible for", "worked on", "various").
- **Metrics only when confirmed.** Use a number only if Van gave it or the repo or a public source shows it (for example "three PWAs", a passed WCAG 2.2 AA audit). Never estimate or invent. When a bullet has no number, state the concrete outcome instead, and add the missing metric to the "Ask Van" list below.
- **Group by client.** The Full Scale role is grouped Lytho (current), TicketBooth (earlier), Billing (Internal), each with a short stack label. Keep 2–5 bullets per client, strongest first. Client names stay as already published.
- **Summary: 3 sentences.** Role and years, what Van builds (AI features and agents, web, mobile, backend), the core stack and one proof point. Lead with the target title.
- **Keywords are earned.** Name the technology where the work used it (React, C# / ASP.NET Core, SQL Server, AWS, Vercel AI SDK, Claude Code, Codex). No keyword dumps, hidden text, or tools Van has not used.
- **Parse-safe structure.** Standard headings (Summary, Professional Experience, Personal Products, Technical Skills, Internships, Education), single column, real text for every link, one date format (`Mon YYYY – Mon YYYY`). No tables, images, or icons inside the printed text; screen-only chips collapse to plain text in print.
- **Length.** Two A4 pages at most. Cut the weakest bullet before shrinking type. Personal products get 1–2 lines each: what it is, the hard part, how it is verified.
- **AI claims.** Describe what the system does (tool-calling, approval-gated actions, validated output), not adjectives. Claude Code and Codex are daily tools; claim only that.
- **Voice.** Verb-first, past tense for finished work, present tense for the current role. Match the file's typography (curly `’`, `·`, `–`).

## Steps

1. Read `docs/research/resume-employer-guidance.md` (primary-source rules: factual action bullets, conditional numbers, simple structure) and `resume-audit.md`.
2. `git fetch`, branch `van/<short-kebab-description>` from `origin/main`.
3. Edit `src/content/resume.ts` (summary, skills, product lines) or `src/content/experience.ts` (`fullScaleGroups`, other `resumeBullets`). The full account in `highlights` stays the long form; do not copy résumé text there.
4. Run `yarn test`, `yarn typecheck`, `yarn eslint src`.
5. Open `/resume` at 1440px and 390px, then print it (`agent-browser pdf`) and confirm two A4 pages with no clipped lines, chips collapsed to text, and groups not split mid-heading.
6. Ship per `docs/DEVELOPMENT_WORKFLOW.md`. Merge waits for Van.

## Standing principles (always great)

Van wants the résumé and portfolio to stay strong for three readers at once: a recruiter skimming for 10 seconds, an engineering manager judging depth, and an ATS or AI agent parsing text. Hold these on every content edit, not only résumé edits.

1. **Outcome first, then how.** Open with the verb and the result for the user or customer; name the stack second. "Built X so customers can Y", not "Worked on X using Z".
2. **Proof beats adjectives.** Prefer a confirmed number, then a named verifiable outcome (passed WCAG 2.2 AA audit, three PWAs adopted company-wide, tests and evals in CI), then a concrete mechanism. Never "passionate", "robust", "various".
3. **Ownership is stated exactly.** "Built" only for work Van owned; "contributed to" or "helped" for shared work. Never inflate; an overstated claim costs more than a modest one.
4. **One headline, one proof point.** The summary leads with the target title and holds one proof point; the strongest differentiator (the Claude Code software factory, shipped AI agents) appears in the first screen, not the last line.
5. **Context in every role.** Each role or client carries its stack label, period, and what the product does, so a reader with no context understands the scale of the work.
6. **Metrics pipeline.** Whenever a bullet lacks a number, keep the outcome wording and list the missing metric under "Ask Van" in your PR and final reply. When Van supplies one, add it in the same source module and every mirror (homepage group, résumé group, `resume.md`, tour, `llms.txt`).
7. **Machine-readable parity.** `/resume`, `/resume.md`, `/llms.txt`, structured data and the PDF all derive from the typed data. Change the data once, regenerate the PDF (`yarn dev`, then `yarn resume:pdf`), and keep the test suite green.
8. **Earned keywords only.** A skill appears in the skills section only if a role, product, or the engineering and AI pages show it being used.

### Evaluation loop (max 2 rounds)

After any non-trivial copy change:

1. **Round 1: independent read.** Spawn a fresh reviewer that has only the files and these rules, not your conclusions. Ask for ranked weaknesses, drop-in replacements built from facts already in the repo, and any claim that overstates its source.
2. **Apply** the valid findings. Reject any suggestion that invents a number, ownership, or confidential detail.
3. **Round 2: self-check** against the principles and the 15–28 word rule, then confirm two A4 pages in the PDF.
4. Stop after two rounds. Remaining gaps go on the "Ask Van" list, not into the copy.

## Ask Van (metrics not yet confirmed)

Collect any of these before writing them down: users or customers reached by the Lytho epics; export or query speedup (before and after); size of the AWS migration (services moved); Billing fetch-time improvement; TicketBooth events, tickets, or payment volume; NextDevs headcount and adoption (users, crew records); latency, test, or coverage numbers for personal products.
