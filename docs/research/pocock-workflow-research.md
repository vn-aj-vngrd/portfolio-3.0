# Research: Matt Pocock’s agent-skills workflow

## Summary
The proposed **GRILL → SPEC → TICKETS → IMPLEMENT → CODE REVIEW** is a defensible compression of the current repository’s skills, **not a verified quotation or mandatory five-stage methodology**. Pocock’s own broader article explicitly presents **seven phases: Idea → Research (optional) → Prototype (optional) → PRD → Kanban Board → Execution → QA**; the current repository uses newer names and emphasizes small, adaptable, composable skills.

## Findings
1. **Claim: Current engineering names are `/grill-with-docs`, `/to-spec`, `/to-tickets`, `/implement`, and `/code-review`.** `/grill-me` still exists, but the README positions it for non-code uses and `/grill-with-docs` for engineering. The latter adds shared domain vocabulary, `CONTEXT.md`, and ADRs. **Sources:** [Current README](https://github.com/mattpocock/skills/blob/main/README.md). **Support:** direct evidence. **Confidence:** high. Calling this sequence “my adaptation of Matt Pocock’s skills” is more accurate than “Matt Pocock’s canonical 2026 process.”

2. **Claim: Research and prototyping are conditional discovery work, not missing mandatory stages.** His seven-phase article places them before the PRD: research for external dependencies/difficult exploration; prototypes to explore UI, architecture, and integrations. Research assets should not linger uncritically because they can become stale. The current README also exposes research and prototype as reusable model-invoked skills. **Sources:** [Seven phases](https://www.aihero.dev/my-7-phases-of-ai-development), [README](https://github.com/mattpocock/skills/blob/main/README.md). **Support:** direct evidence. **Confidence:** high. **Researcher inference:** A five-stage portfolio presentation can put “research and prototype when uncertainty warrants it” inside its first stage without claiming Pocock requires those tasks on every change.

3. **Claim: `/to-spec` records an already-discussed destination rather than restarting discovery.** Its explicit instruction is “Do NOT interview the user; just synthesize what you already know.” It nevertheless asks the agent to check proposed testing seams with the user. Its template covers problem, solution, extensive user stories, implementation/testing decisions, exclusions, and notes; it respects existing domain vocabulary and ADRs. File paths and code snippets are normally excluded as brittle, with an exception for decision-rich prototype snippets. **Sources:** [to-spec skill](https://github.com/mattpocock/skills/blob/main/skills/engineering/to-spec/SKILL.md). **Support:** direct evidence. **Confidence:** high.

4. **Claim: Tickets are tracer-bullet vertical slices, not separate frontend/backend/test batches.** Each should traverse the relevant layers, be independently demoable or verifiable, fit a fresh context window, and declare blockers. The user approves granularity and dependencies. The skill accepts a **plan, spec, or conversation**, so a separate spec is not an absolute prerequisite. It explicitly exempts wide mechanical refactors, using expand–contract instead. **Sources:** [to-tickets skill](https://github.com/mattpocock/skills/blob/main/skills/engineering/to-tickets/SKILL.md). **Support:** direct evidence. **Confidence:** high.

5. **Claim: Tests belong inside implementation; review is also built into implementation.** `/implement` says to use TDD where possible at pre-agreed seams, run typechecking and individual test files regularly, run the full suite at the end, then invoke `/code-review`. The README describes that review as parallel, separated **Standards** and **Spec** sub-agents: repository standards plus a Fowler smell baseline versus fidelity to the originating issue/spec. This is separation of review concerns—not evidence of independent human reviewers or independent models. **Sources:** [implement skill](https://github.com/mattpocock/skills/blob/main/skills/engineering/implement/SKILL.md), [README](https://github.com/mattpocock/skills/blob/main/README.md). **Support:** direct evidence. **Confidence:** high. The skill also instructs a commit; that must not override this portfolio’s explicit user-authorized commit/release policy.

6. **Claim: Human QA remains important; deploy/monitor is not an established named stage in these materials.** The seven-phase article ends with a human QA plan, testing/review, and new tickets feeding another execution loop. It says code review may sit in execution or QA. **Sources:** [Seven phases](https://www.aihero.dev/my-7-phases-of-ai-development). **Support:** direct evidence for QA; interpretation for the absence of a deploy/monitor stage in the inspected material. **Confidence:** high for QA; medium for scope-limited absence. Deploy/monitor can be a sensible personal extension, but should not be attributed as Pocock’s exact final stage.

## Recommended faithful five-stage portfolio wording
**Clarify → Specify → Slice → Implement → Review**

- **Clarify:** Challenge assumptions; research primary sources or prototype when needed.
- **Specify:** Record the agreed behavior, constraints, decisions, and testing approach.
- **Slice:** Break larger work into verifiable end-to-end tickets with clear dependencies.
- **Implement:** Build incrementally with tests, types, and runtime feedback.
- **Review:** Check standards and requirements separately, then exercise the result and iterate.

Suggested attribution: **“My workflow adapts Matt Pocock’s agent skills to the size of the change.”**

**Researcher inference / portfolio adaptation:** Keep small changes lightweight: a concise durable decision and clear acceptance criteria may suffice; larger changes justify a fuller spec and tickets. Do not imply Pocock’s actual spec template is minimal—it explicitly requests extensive user stories. His README supports composability and adaptation, and his ticket skill permits conversation input, but neither establishes a universal “no specs” doctrine. Only claim personal use of these practices when user-confirmed. Describe explicit release verification and monitoring separately if actually practiced.

## Contradictions
- **Author material has evolved:** the seven-phase article names `/write-a-prd` (including grilling) and `/prd-to-issues`; the live repository names `/to-spec` (synthesis without re-interview) and `/to-tickets`. Treat the former as that article’s process, not current executable skill names.
- **Internal README mismatch:** its architecture section says `/to-spec` “quizzes” about modules, while its reference section and the actual skill say no interview. The skill does require confirmation of testing seams. Prefer the operative skill text when describing behavior.
- The article describes GitHub as lacking native blocking relationships; the current ticket skill allows native blocking/sub-issue links where supported. Tracker-capability claims were not independently assessed and are unnecessary for the portfolio wording.

## Missing evidence
No inspected primary source establishes the uppercase five-stage chain as Pocock’s named, universal methodology, or deployment/monitoring as its canonical ending. Five primary pages were inspected successfully; the review mechanics are supported by the README rather than a separate full review-skill inspection. Repository `main` is mutable; no release date or commit chronology was independently verified. A `source_check` on the composite workflow claim returned **unclear** (0.30); the findings above therefore rely on direct inspection of fetched originals, not automated validation or search summaries.

## Sources
- **Kept:** [Repository README](https://github.com/mattpocock/skills/blob/main/README.md) — current names, composability, domain decisions, review axes.
- **Kept:** [My 7 Phases Of AI Development](https://www.aihero.dev/my-7-phases-of-ai-development) — author’s explicitly named broader lifecycle and human QA.
- **Kept:** [to-spec/SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/to-spec/SKILL.md) — exact synthesis and testing requirements.
- **Kept:** [to-tickets/SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/to-tickets/SKILL.md) — vertical slices, blockers, exceptions, optional spec input.
- **Kept:** [implement/SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/implement/SKILL.md) — tests, review, commit behavior.
- **Rejected/deprioritized:** Joao Queiros AI, AIE Talks, Zolotube summaries — not needed as evidence of the author’s exact current process; GitHub discussions and stale search-result paths — discovery only. Old root-level skill URLs returned 404; current paths were taken from the live README.

## Next steps
Before publishing personal workflow claims, confirm which practices Van actually uses. Pin repository links to a verified commit if the portfolio needs stable attribution rather than a reference to an evolving skill collection.
