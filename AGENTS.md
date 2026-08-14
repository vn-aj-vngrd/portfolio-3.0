# Portfolio 3.0 Agent Guide

## Mission

Build a premium, product-led portfolio for recruiters, engineering managers, founders, and technical leads. The site should make Van’s product judgment and full-stack engineering evidence clear within minutes.

Read the relevant source of truth before changing behavior:

- `PRODUCT.md` — audience, positioning, content boundaries, and anti-references.
- `DESIGN.md` — visual language, tokens, components, motion, and responsive rules.
- `README.md` — stack, content locations, routes, and runtime features.

## Workflow

Use a **dev-first loop**:

1. Inspect the affected code and its surrounding pattern.
2. Make the smallest coherent change.
3. Review it in the running development server.
4. Test the changed interaction and responsive states.
5. Keep the work local until the user asks to commit, push, or release.

Routine iteration ends after targeted validation. Run `corepack yarn lint` when a batch is ready for review. Reserve a production build for an explicit release-validation request.

Deployment is an explicit release operation. Load `.agents/skills/deploy-vercel/SKILL.md` only when the user asks to deploy or release to Vercel.

## Architecture

- Use the existing Next.js App Router and strict TypeScript foundation.
- Prefer Server Components. Add `"use client"` only for browser state, events, or platform APIs.
- Keep portfolio copy and structured facts in typed modules under `src/content/`.
- Keep static portfolio content file-backed; a CMS, database, or runtime API needs a concrete product reason.
- Reuse established layout and component language before introducing a new abstraction.
- Prefer browser, React, and Next.js capabilities over another dependency.
- Keep secrets server-side. Refer to environment variables by name without printing their values.

## Interface standard

The visual target is calm, precise, technical, and human. Quality comes from typography, spacing, evidence, and interaction detail.

- Use semantic tokens from `src/app/globals.css`.
- Let hierarchy and hairlines structure content before adding containers.
- Keep Signal Blue reserved for links, focus, selection, and meaningful state.
- Use real product evidence and live specimens instead of decorative technical imagery.
- Keep controls functional; every button and interactive surface must produce an understandable result.
- Preserve the studio rail’s hierarchy and keep its bottom utility dock visible at common laptop heights.
- Treat mobile as an authored layout. Check reflow, copy measure, touch targets, and dense data at 390px.
- Preserve keyboard navigation, visible focus, semantic headings, reduced motion, and WCAG 2.2 AA contrast where practical.
- Keep motion restrained and state-driven. The static experience remains complete.

Reject generic portfolio patterns: glowing decoration, glass panels, repeated floating cards, giant pills, logo walls, excessive Bento grids, ornamental code, and animation without a product purpose.

## Content integrity

- Use only public personal work and user-confirmed professional facts.
- Keep employer, client, and private repository details confidential.
- Make every claim traceable to repository evidence, deployed behavior, or user confirmation.
- Label unknowns for confirmation instead of inferring metrics, impact, ownership, or mastery.
- Present private GitHub activity only as aggregates. Never render private repository names or source.
- Describe GitHub language data as Linguist bytes, not lines of code.
- Write concise, concrete copy: what was built, what problem it solves, and how it works.

## Validation

Match validation effort to the change:

- **Content:** verify facts, links, dates, and confidentiality boundaries.
- **Components:** exercise the changed state with keyboard and pointer input.
- **Responsive UI:** inspect 390px mobile and at least one desktop viewport; confirm zero page-level horizontal overflow.
- **Accessibility:** verify landmarks, heading order, accessible names, focus visibility, and reduced-motion behavior affected by the change.
- **Code:** run `git diff --check` and targeted linting; run the full lint command when the batch is ready.
- **Release:** use the deployment skill, which performs the single production build on Vercel and verifies the canonical domain.

A change is complete when the requested behavior works in development, its affected responsive and accessible states are checked, and no unrelated surface regresses.
