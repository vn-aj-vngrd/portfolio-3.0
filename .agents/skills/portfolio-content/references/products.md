# Products and case studies

Source: `src/content/projects.ts`. Adding an entry updates automatically: the homepage list, `/work/[slug]`, the sitemap, case-study metadata, and the Product Lab rounds (order = array order).

## Entry shape

Copy the nearest existing entry. The content test enforces the counts.

- `slug` kebab-case; `name`; `category` as `Type · Domain`.
- `summary` one paragraph; `problem`, `solution`; `role` (`Designed and built independently` unless the contribution differs).
- `status` as `Live … · Source available`, `Live · Open source · …`, or `… · Closed source`. "Source available" and "Open source" need `repository`; "Closed source" has none.
- `liveUrl` only for a public product; `https` always.
- `match`: `prompt` (the user's problem), `clue` (how to spot the product), `result` (what it does). These drive Product Match.
- 3–4 `decisions`, 4–6 `architecture` items, 4–6 `evidence` lines that each verify against the product, 3–6 `images`, `stack` of 4 or more.

## Touchpoints

1. `projects.ts` entry.
2. `src/components/game/ProductMatchScene.tsx`: one `productDevices` entry per product, in array order (uppercase name, accent colour, sizes).
3. `src/components/project/ProjectFeature.tsx`: add the slug to the laptop or phone frame test when the screenshots are desktop or mobile.
4. `src/app/globals.css`: `.project-<slug> .project-media` background and `::before` beside the siblings; add the slug to the shared `min-height` rules (desktop and the mobile block).
5. `src/components/sections/SelectedWork.tsx`: the intro sentence names every featured product and what it covers.
6. `PRODUCT.md`: the public case-study list.
7. `src/content/resume.ts` `productSelections`: only for a product that belongs on the résumé.
8. `README.md`, `DESIGN.md`: only when a route, token, or structure changed.

## Media

`public/images/projects/<slug>/`. Capture the live product at 1920×1200, convert with `cwebp -q 86` to descriptive `.webp` names (`exterior.webp`, `floor-plan.webp`), write specific alt text and a short `label`, and read each image for private information before committing.

## Update and remove

- Rename: entry, `productDevices` name, intro sentence, `PRODUCT.md`, résumé description.
- Status or link change: the card, case study, and résumé description all read it, so check each.
- Remove: entry, device, CSS block, résumé pick, intro mention, `PRODUCT.md` line, image folder; then search the slug and name across `src`, `public`, and the docs.

## Pages to view

`/` (My work card), `/work/<slug>`, Product Lab → Product Match (tracker and legend show every product), `/resume` when touched.
