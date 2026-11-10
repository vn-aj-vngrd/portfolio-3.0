---
name: portfolio-content
description: Portfolio content for Portfolio 3.0. Use before adding, updating, or removing any portfolio fact: a product or case study, experience, résumé, profile or intro copy, certifications, gear, engineering or AI-workflow copy.
---

# Portfolio content

Content is typed data in `src/content/`. Several surfaces read it and a few repeat it by hand. `scripts/content.test.mjs` encodes the mechanical rules, so a missed touchpoint fails `yarn test`.

## Rules

Hold every rule on every edit.

- **Traceable.** Each claim names its source: repository evidence, deployed behavior, or Van's confirmation. A missing fact becomes a question to Van; metrics, impact, ownership, and mastery stay unwritten until confirmed.
- **Public-safe.** Publish only names already in content or confirmed public by Van. Employer and client detail, private repositories, addresses, lot numbers, owner names, and private GitHub activity stay out.
- **One source.** Each fact lives in one module (table below). Other surfaces derive it by `slug` or exact company name, so retyping a fact is a defect. The three hand-written mirrors (homepage intro, `PRODUCT.md`, Product Match devices) are guarded by the content test.
- **Voice.** Calm, precise, technical, human. State what was built, the problem it solves, and how it works, in concrete verbs. Profile copy is first person; case studies speak of the product; résumé bullets open with a verb. Match the file's typography (curly `’`, `·`, `–`).
- **Current.** Replace the old fact in place. Periods read `Mon YYYY – Mon YYYY` or `Mon YYYY – Present`, and exactly one role is current.
- **Curated.** Strongest evidence first; featured work is public or deployed products only.

## Where facts live

| Fact                                                                                    | Source                                                                          | Reference                          |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------- |
| Product, case study, Product Lab round                                                  | `projects.ts`                                                                   | [products](references/products.md) |
| Job, internship, capstone                                                               | `experience.ts`                                                                 | [career](references/career.md)     |
| Résumé wording, skills, product picks                                                   | `resume.ts`                                                                     | [career](references/career.md)     |
| Name, title, statement, intro, philosophy, education, links                             | `profile.ts`                                                                    | [career](references/career.md)     |
| Degree, award, certificate                                                              | `certifications.ts`                                                             | [career](references/career.md)     |
| Gear, engineering pillars and stack, AI tools and workflow, design tokens, SEO metadata | `gear.ts`, `engineering.ts`, `ai-workflow.ts`, `design-system.ts`, `lib/seo.ts` | [site](references/site.md)         |

## Steps

1. Open the reference for the branch. Done when its touchpoint list is in view.
2. `git fetch`, then branch `van/<short-kebab-description>` from `origin/main`. One concern per PR.
3. Collect the facts and note each one's source. Done when no claim lacks a source.
4. Edit the source module, then every touchpoint in the reference. Done when each touchpoint is edited or marked n/a, and `grep -rniE "<old name or fact>" src PRODUCT.md README.md` finds nothing stale.
5. Run `yarn test`, `yarn typecheck`, and `yarn eslint src`. Done when all pass. A failing content test means a touchpoint was missed: fix the data. Change a test only when the rule itself changes, in the same PR as this skill.
6. Run `yarn dev` (port 3001) and view each page the reference lists at 1440px and 390px. Done when every page renders the new fact with no horizontal overflow.
7. Ship per `docs/DEVELOPMENT_WORKFLOW.md`, listing the sources in the PR body. Merge and deploy wait for Van's explicit authorization.
