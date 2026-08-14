# Portfolio 3.0

Product-driven portfolio for Van AJ Vanguardia, a product-minded full-stack software engineer.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- `next-themes`

The homepage, living design system, AI workflow, gear catalog, résumé, GitHub engineering activity, and project case studies use statically generated or revalidated server content. Client JavaScript supports theme selection, smooth scrolling, keyboard navigation, live anonymous presence, Bug Hunt, email copying, and résumé printing.

## Content

Typed portfolio content lives in:

```text
src/content/
├── profile.ts
├── projects.ts
├── engineering.ts
├── experience.ts
├── certifications.ts
├── ai-workflow.ts
└── gear.ts
```

Project media lives in `public/images/projects/`.

## Routes

```text
/
/ai
/github
/design
/design.md
/gear
/resume
/work/viya
/work/crave-roulette
/work/watchbox
```

Metadata routes provide `/sitemap.xml`, `/robots.txt`, and `/opengraph-image`. The `/design` route presents the portfolio system as live specimens with copyable tokens and components; `/design.md` exposes the portable Markdown specification.

## GitHub activity

`/github` uses the GitHub GraphQL API to show hourly-revalidated contribution, repository, and GitHub Linguist aggregates. Set `GITHUB_STATS_TOKEN` in the server environment to include private activity. Private repository names and source code are never rendered; private data appears only in aggregate counts and language totals.

Language figures are repository bytes reported by GitHub Linguist, not lines of code.

## Development

```bash
yarn install
yarn dev
```

## Validation

```bash
yarn lint
yarn build
```

## Design context

- `PRODUCT.md` defines audience, purpose, positioning, and strategic constraints.
- `DESIGN.md` defines the visual system and implementation guardrails.
