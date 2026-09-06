# AI workflow refresh — consolidated plan

Status: approved by the user, implemented, and validated locally. No commit, push, or deployment performed.

## Implementation validation

- Homepage and `/ai` inspected at 1440px and 390px; no page-level horizontal overflow. Light and dark theme inspected; studio utility dock remains visible on desktop.
- Native skill disclosures tested with Enter and pointer input; keyboard focus has a visible solid outline. Reduced-motion preference verified through browser emulation.
- Résumé inspected at 390px and as actual A4 and Letter PDFs (Letter uses an explicit page-size override, not scaled A4). Both contain two pages, with print text at 10pt or larger. Skip link is hidden; white print margins work from dark mode.
- Consolidated the workflow sentence and URL under Technical Skills. In print, product ownership sits beside the title; modest spacing changes preserve every product, internship, and capstone without shrinking type.
- Compared rendered engineering inventory against HEAD: all 70 previous technology entries retained, four supporting tools added.
- Roleway and Relay case routes, public README URLs, and source skill repository returned HTTP 200. ACSFI remains live-link-only.
- Full lint, TypeScript (`tsc --noEmit`), and `git diff --check` pass. No production build run.

## Goal

Make Van’s AI-assisted product engineering legible to recruiters and engineering managers evaluating intermediate full-stack roles. Explain how he clarifies decisions, directs bounded agent work, and verifies results. Keep shipped products and professional engineering evidence ahead of tools.

Preserve both sides of the positioning:
- Professional work: React, C# / ASP.NET Core, SQL Server, AWS/Azure, product maintenance and delivery.
- Personal work: the existing TypeScript ecosystem, including Next.js, React Native, Expo, Vite, PWA, Tailwind CSS, shadcn/ui, and HeroUI.

Do not replace the existing stack or rebrand the candidate as an ML researcher or autonomous-agent specialist without supporting evidence.

## Research findings that affect the plan

[Matt Pocock’s current skill repository](https://github.com/mattpocock/skills/blob/main/README.md) supports a five-stage adaptation using engineering grilling, specification, vertical tickets, implementation, and code review. It does not establish the uppercase chain as a universal named methodology. His [seven-phase article](https://www.aihero.dev/my-7-phases-of-ai-development) uses a broader lifecycle. Use attribution: **“My workflow adapts Matt Pocock’s agent skills to the size of the change.”**

The actual ticket skill accepts a plan, specification, or conversation; not every task requires a large spec. Tests and review are part of execution, not reasons to invent extra mandatory stages. Standards review and requirements/spec review are different concerns; neither automatically means independent models or human reviewers.

Model naming resolved after the user supplied the official announcement URL: the directly fetched [OpenAI model documentation](https://developers.openai.com/api/docs/models/gpt-6-astra) identifies **GPT-6 Astra** (`gpt-6-astra`). Use that name for the user-confirmed personal daily driver, replacing the old Sol label. The announcement itself returned 403; verification comes from the model documentation. Use **Claude models** for professional context, without inventing an exact version.

Research notes:
- [Pocock workflow](../research/pocock-workflow-research.md)
- [Tool terminology and model-name limitations](../research/agent-tool-context.md)

## 1. Canonical workflow narrative

Use the user’s chosen labels, with plain-language explanations:

| Stage | Purpose | Visible output |
|---|---|---|
| Grill | Question the product need, inspect the repository, resolve ambiguity, and research/prototype when uncertainty warrants it. | Agreed decisions and constraints |
| Spec | Capture the resolved behavior, boundaries and acceptance criteria. Document enough to preserve decisions, not paperwork for its own sake. | Specification appropriate to the change |
| Tickets | Slice larger work vertically through the necessary layers; record dependencies and acceptance criteria. | Small, verifiable tickets |
| Implement | Give agents bounded work and manageable context; use tests, types, runtime feedback and direct inspection. | Reviewable changes and validation evidence |
| Code Review | Check engineering standards and requirement fidelity separately, then make a human acceptance decision and iterate. | Findings resolved or explicitly deferred |

Display **Grill → Spec → Tickets → Implement → Code Review** as a personal adaptation, not a rigid pipeline or a quotation of a canonical process. Feedback may lead back to earlier decisions. Small fixes can traverse these concerns briefly without five separate documents.

Do not add separate PLAN, VERIFY or SHIP stages. Planning, tests and verification remain embedded; release authorization and checking the deployed result remain explicit responsibilities, not an attributed extra Pocock stage. No automatic commit/deploy behavior is authorized by this plan.

## 2. Represent the actual setup accurately

| Context | Tools and role |
|---|---|
| Lightweight daily workspace | cmux with HERDR to organize and manage CLI-agent work |
| Professional CLI work | Claude Code using Claude models, managed through HERDR |
| Personal CLI work | Pi agent running OpenAI/Codex models; do not call this Codex CLI |
| Complex desktop work | Codex app and Claude desktop/Claude Code desktop/Cowork, chosen for tasks that benefit from supported app, browser or computer interaction |
| Research and decisions | ChatGPT and Claude for questioning, learning, comparison and decision support |
| Editing assistance | Cursor and GitHub Copilot, retaining existing confirmed tooling |
| Voice input | Wispr Flow for dictating prompts and notes; no personal WPM or speed multiplier without measurements |
| Remote terminal access | Termius to access the Mac/workspace remotely; no SSH addresses or configuration details published |
| Remote agent sessions | Supported Claude/Codex remote features; distinguish continuing agent sessions from unrestricted remote-desktop control |
| Reusable instructions | Matt Pocock-inspired and custom agent skills for questioning, domain decisions, task slicing, implementation and review |

These are user-reported usage choices, not vendor performance comparisons. Keep models, agent harnesses, desktop apps, orchestration, dictation and SSH clients in distinct categories. Do not imply all Claude desktop modes have identical permissions or all remote/computer features exist in every environment. Preserve the user’s stated “Codex app” name unless the displayed installed product label is clarified; fetched documentation alone did not establish why its current title differs.

## 3. Refresh `/ai`: process before inventory

Proposed page order:
1. **Short introduction:** product decisions first; agents assist delivery; Van remains responsible for requirements, review and result.
2. **Five-stage workflow:** purpose and concrete output for each stage, with brief attribution.
3. **Daily setup and context switching:** lightweight CLI default, when desktop assistance is useful, professional versus personal model choices.
4. **Applied evidence:** connect the method to existing public products and verified artifacts.
5. **Reusable skills and guardrails:** highlight capabilities rather than lead with a count of installed skills.
6. **Current models and supporting tools:** lower-priority, easily updated configuration information.

Replace the current “2 models / 5 stages / 16 skills / 4 surfaces” counters. Those counts are not engineering outcomes. Do not replace them with invented productivity metrics.

For evidence, distinguish:
- **AI-assisted engineering:** how work is clarified, implemented and reviewed.
- **AI product functionality:** features such as Roleway’s approval-gated agent and Viya’s validated proposed changes.

They are related, not interchangeable. Link actual public case studies and, where verifiable, a real decision/spec, ticket, implementation/test or review artifact. Do not fabricate retrospective artifacts or expose private professional work. If the full artifact chain is unavailable, use the verified subset and state its scope.

Keep the existing neutral visual system, hairlines and typography. Shorten the oversized opening so the workflow is reached sooner. Use an ordered list with a compact horizontal arrangement on desktop and an authored vertical flow on mobile. No decorative terminals, logo wall, fake orchestration dashboard or animation needed to understand the content.

## 4. Add a homepage entry point

Add a compact **“How I build with agents”** preview within the engineering section, after the engineering pillars and before the full technology inventory:
- One short explanation grounded in questioning, vertical slices and reviewed implementation.
- The five stages in a concise readable sequence.
- A text link to `/ai` and a relevant public case study, such as Roleway.

Add an **AI workflow** text link beside the existing GitHub, LinkedIn and Résumé links in the hero. Keep the current professional title, TypeScript emphasis, .NET experience, product order and utility rail intact. Existing “AI integration” content should remain about product capabilities, while the new preview explains the development process.

## 5. Add AI tools to résumé Technical Skills

Yes: include AI tools, but below the primary engineering stack.

Proposed compact entries:
- **AI tools:** Claude Code, Codex, Pi, Cursor, GitHub Copilot, ChatGPT, Claude.
- **Workflow tooling:** cmux, HERDR, Wispr Flow.

“Codex” covers the stated app/model ecosystem without incorrectly claiming Codex CLI usage. Pi’s role can be clarified in the workflow sentence or linked `/ai` page. Termius, native remote features, desktop mode distinctions and model versions belong on the portfolio rather than consuming résumé space.

Replace the duplicate tool list in the existing AI-Assisted Development section with one short process/evidence sentence and the `/ai` link, or consolidate that sentence under the skills block if print layout benefits. Suggested concise wording:

> Clarify product decisions, break work into small vertical tasks, and verify agent-assisted changes through tests and code review.

Keep two A4/Letter pages, body and metadata at least 10pt, all four products, public links only, and clear separation of internships/capstone from employment. First remove repeated tool names and redundant copy if space is tight. Any further reduction in older internship detail should be called out rather than silently deleting history. Do not sacrifice the core stack, product evidence or readability to fit every utility name.

## 6. Keep the three surfaces synchronized

Use `src/content/ai-workflow.ts` as the canonical source for:
- Workflow stages and outputs.
- Tool names, categories and contextual usage.
- Work/personal setup and model labels.
- Full narrative plus deliberately curated homepage and résumé summaries.
- Attribution and public evidence links.

The homepage, `/ai`, résumé and engineering tool group should select from this data instead of maintaining conflicting copies. Use explicit subsets for compact surfaces; not every tool should automatically appear everywhere. Preserve the broader existing stack/tool inventory even when it is not part of the highlighted daily setup.

Expected implementation targets:
- `src/content/ai-workflow.ts`
- `src/app/ai/page.tsx`
- `src/components/sections/Engineering.tsx` and, if useful, a small server-rendered preview component
- `src/components/sections/Hero.tsx`
- `src/content/engineering.ts`
- `src/content/resume.ts` and `src/app/resume/page.tsx`
- Scoped rules in `src/app/globals.css`
- `src/content/profile.ts` only if the short introduction needs alignment

No new backend, dependency, public session viewer, live agent connection or client-side state is required.

## Acceptance checks

- Shared five-stage sequence, tool spelling and work/personal context agree on all surfaces.
- Pi + OpenAI/Codex models is not mislabeled as Codex CLI.
- The obsolete daily-driver label is removed when its replacement/family fallback is agreed; no unverified official model claim is published.
- Existing TypeScript primary group and all existing technologies remain available.
- No private repository names/source, remote-access details, credentials or unverified productivity claims.
- Real links work; claims about artifact evidence match what those links actually show.
- 390px mobile and desktop reflow, keyboard navigation, focus visibility, reduced motion, theme contrast and utility rail checked in development.
- A4 and Letter remain two readable pages; extracted text and URLs are checked.
- `git diff --check`, full lint and TypeScript checks pass. No production build, commit or deployment without a separate request.

## Decisions resolved

1. User approved implementation of the process-first page, homepage preview, and compact résumé rows.
2. GPT-6 Astra naming verified from the official model-specific documentation after the user supplied the announcement link. No model performance claims or productivity metrics added.
