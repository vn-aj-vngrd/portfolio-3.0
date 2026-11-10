---
name: portfolio-content
description: Add, update, or remove Portfolio 3.0 data (products and case studies, experience, résumé selections, certifications, gear, profile, engineering copy) so every surface stays consistent. Use whenever the user asks to add or edit a product, project, job, certificate, gear item, or other portfolio fact.
compatibility: Agent Skills-compatible harness with shell access, Node 24, yarn, and an agent-browser or equivalent for screenshots.
---

# Manage portfolio data

Portfolio facts live in typed modules under `src/content/`, but several surfaces read or repeat them. A change is complete only when every touchpoint below agrees. Edit data first; touch components only when the table says so.

## 0. Before editing

1. Read `AGENTS.md` (content integrity), `PRODUCT.md`, and `docs/DEVELOPMENT_WORKFLOW.md`.
2. Start from fresh `origin/main` on `van/<short-kebab-description>`. Keep independent changes (for example a new product and an SEO change) in separate PRs.
3. Collect facts from the user, the repo, or the live product. Label unknowns and ask; never infer metrics, impact, ownership, or mastery.
4. Apply the confidentiality rules: no employer, client, or private repository details; no addresses, lot numbers, owner names, or other personal data in public copy. A closed-source product has `repository: undefined`, and its `status` says "Closed source".

## 1. Where each fact lives

| Change                                | Edit                            | Also check                                                                                                                                        |
| ------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Product or case study                 | `src/content/projects.ts`       | Product touchpoints (section 2)                                                                                                                   |
| Name, title, links, bio               | `src/content/profile.ts`        | `src/lib/seo.ts`, the layout JSON-LD, `resume.ts` summary                                                                                         |
| Job, internship, capstone             | `src/content/experience.ts`     | `resume.ts` (`experienceEntry` looks entries up by exact company name and needs `resumeBullets`), `profile.ts` statement if years or stack change |
| Résumé wording, skills, product picks | `src/content/resume.ts`         | The product `slug` must exist in `projects.ts`; build fails loudly if not                                                                         |
| Degree, award, certificate            | `src/content/certifications.ts` | Certificate files go in `public/certificates/`                                                                                                    |
| Hardware                              | `src/content/gear.ts`           | `GearKind` in the same file and `components/gear/GearIllustration.tsx` for a new kind                                                             |
| Engineering pillars and stack groups  | `src/content/engineering.ts`    | Homepage Tech section                                                                                                                             |
| AI tools and workflow                 | `src/content/ai-workflow.ts`    | `/ai` page, résumé tool lists, `profile.introduction`                                                                                             |
| Design tokens documentation           | `src/content/design-system.ts`  | `DESIGN.md` and `globals.css`                                                                                                                     |

## 2. Product touchpoints

Adding a product to `projectCatalog` updates automatically: the homepage list, `/work/[slug]`, the sitemap, case-study metadata, and the Product Lab rounds. These do not update by themselves; check each:

1. `src/content/projects.ts`: the new entry. Match the shape and voice of existing entries: category `Type · Domain`; role `Designed and built independently` (or the true contribution); status `Live … · Source available` or `… · Closed source`; four `decisions`, four `architecture` items, four to five `evidence` lines that can each be verified; three images with specific alt text and a short `label`. `liveUrl` only if the product is public. Order is display order, and Product Lab round order.
2. `src/components/game/ProductMatchScene.tsx`: add one `productDevices` entry (uppercase name, accent colour, body and screen size). Positions and camera fit are computed from the list length. A missing entry leaves a round with no 3D device.
3. `src/components/project/ProjectFeature.tsx`: if the product should use the laptop frame or phone screens, add its slug to those lists.
4. `src/app/globals.css`: add `.project-<slug> .project-media` background and `::before` beside its siblings, and add the slug to the shared `min-height` rules (desktop and the mobile block).
5. `src/components/sections/SelectedWork.tsx`: the intro sentence names the products and what they cover; update it.
6. `PRODUCT.md`: the public case-study list.
7. `src/content/resume.ts`: add a `productSelections` entry only if the product belongs on the résumé; keep it to a few strong ones.
8. `README.md` and `DESIGN.md`: only if a route, token, or structure changed.

Media: `public/images/projects/<slug>/`. Capture the live product at 1920×1200, convert with `cwebp -q 86` to `.webp`, keep file names descriptive (`exterior.webp`, `floor-plan.webp`), and check each image for private information before committing.

## 3. Updating or removing

- Update the one source file, then re-run section 2 and section 1's "Also check" column for anything the edit changes: a renamed product touches the intro sentence, `PRODUCT.md`, `ProductMatchScene` device name, and `resume.ts`; a changed status or link touches the card, the case study, and the résumé description.
- Removing a product: delete its entry, device, CSS block, résumé selection, intro mention, `PRODUCT.md` line, and image folder. Search the repo for the slug and the name to confirm nothing is left.
- Keep dates and statuses current ("Live", "Prototype", "Closed source"). If the user gives a new fact, replace the old one rather than adding a second.

## 4. Verify

1. `yarn typecheck`, `yarn eslint src`, then `git diff --check`.
2. `yarn dev` (port 3001) and look at: `/` My work card, `/work/<slug>`, `/resume` if touched, and Product Lab → Product Match at 1440px and 390px (round tracker and legend show every product; no horizontal overflow).
3. Check the page `<title>` of any changed route.
4. Search for stale mentions: `grep -rniE "<old name or fact>" src README.md PRODUCT.md`.

## 5. Ship

Commit and open a PR as `docs/DEVELOPMENT_WORKFLOW.md` describes: Lefthook runs format, lint, types, and tests; format hook failures mean run `prettier --write` on the staged files, restage, and retry. Subject: `feat(work): Add <Name> <short description>` for a product; `fix(content): …` or `docs(content): …` for corrections. Fill `.github/pull_request_template.md` in order, with concrete test evidence. Merge and deploy only with explicit authorization; deployment uses `deploy-vercel`.
