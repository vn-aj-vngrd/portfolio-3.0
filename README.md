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

## Traffic analytics

Vercel Web Analytics is enabled for the `portfolio` project on the Hobby plan.
Open the private [portfolio analytics dashboard](https://vercel.com/van-aj-vanguardias-projects/portfolio/analytics) to see visitors, page views, popular pages, referrers, countries, devices, browsers, and operating systems.

The root layout loads the official Next.js tracker on every page. Local development uses the SDK's debug mode without sending analytics; Vercel preview deployments omit the tracker. No API key is needed.

The integration must be deployed before it can collect production visits. After release, visit the canonical site, navigate to a case study, and confirm the requests to `/_vercel/insights/` succeed and visits appear in the dashboard. Earlier visits cannot be backfilled. Dashboard enablement alone does not verify collection.

Hobby includes 50,000 events/month shared across the team's projects and a one-month reporting window. Country data is approximate; reports do not identify people. Custom click events and UTM reports are not included on Hobby. See [official pricing](https://vercel.com/docs/analytics/limits-and-pricing) and the [provider comparison](docs/analytics-research.md).

Review the last seven days weekly: visitor trend, which project pages attract attention, where visitors come from, and desktop/mobile mix. A résumé page view indicates interest, not a verified download or contact.

## Development

Use Node from `.nvmrc` and the Yarn version pinned in `package.json`. Local installation sets up Lefthook. Follow [Development workflow](docs/DEVELOPMENT_WORKFLOW.md) for branches, commit messages, PRs, review resolution, and automated releases.

```bash
yarn install
yarn dev
```

## Validation

```bash
yarn check:quality
```

Commit hooks also check staged formatting. GitHub CI performs the production build and CodeQL scan. Releases use the squash commit after successful main CI; Git tags and GitHub Releases carry the version.

## Design context

- `PRODUCT.md` defines audience, purpose, positioning, and strategic constraints.
- `DESIGN.md` defines the visual system and implementation guardrails.
