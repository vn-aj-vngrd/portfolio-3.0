# Portfolio 3.0

Product-driven portfolio for Van AJ Vanguardia, a product-minded full-stack software engineer.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- `next-themes`

The homepage and project case studies are statically generated. Client JavaScript is limited to theme selection, mobile navigation, email copying, and résumé printing.

## Content

Typed portfolio content lives in:

```text
src/content/
├── profile.ts
├── projects.ts
├── engineering.ts
└── experience.ts
```

Project media lives in `public/images/projects/`.

## Routes

```text
/
/resume
/work/viya
/work/crave-roulette
/work/watchbox
```

Metadata routes provide `/sitemap.xml`, `/robots.txt`, and `/opengraph-image`.

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
