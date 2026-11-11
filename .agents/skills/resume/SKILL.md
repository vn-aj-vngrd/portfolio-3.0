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

## Ask Van (metrics not yet confirmed)

Collect any of these before writing them down: users or customers reached by the Lytho epics; export or query speedup (before and after); size of the AWS migration (services moved); Billing fetch-time improvement; TicketBooth events, tickets, or payment volume; NextDevs headcount and adoption (users, crew records); latency, test, or coverage numbers for personal products.
