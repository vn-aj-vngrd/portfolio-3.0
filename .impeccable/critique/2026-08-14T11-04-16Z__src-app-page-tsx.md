---
target: src/app/page.tsx
total_score: 31
p0_count: 0
p1_count: 2
timestamp: 2026-08-14T11-04-16Z
slug: src-app-page-tsx
---
# Portfolio 3.0 Design Critique

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of system status | 3 | Copy-email feedback exists; theme state is only visual. |
| 2 | Match system / real world | 3 | Clear employer language, but repository-audit phrasing feels mechanical. |
| 3 | User control and freedom | 3 | Navigation and back paths are clear. |
| 4 | Consistency and standards | 4 | Cohesive tokens, layout, links, and case-study structure. |
| 5 | Error prevention | 3 | Few risky actions; failed Crave screenshot is presented as product evidence. |
| 6 | Recognition rather than recall | 4 | Sections and actions are explicit. |
| 7 | Flexibility and efficiency | 3 | Direct anchors, source, live links, résumé, and contact routes. |
| 8 | Aesthetic and minimalist design | 3 | Strong restraint, but repeated template structure and excessive empty space feel generated. |
| 9 | Error recovery | 2 | Portfolio has little error surface; live-project failure context is unexplained. |
| 10 | Help and documentation | 3 | Case studies provide context, but technical evidence is still shallow. |
| **Total** | | **31/40** | **Good foundation; premium proof and specificity are missing.** |

## Anti-patterns verdict

The interface avoids the worst AI portfolio tells: no gradients, glass cards, floating code, skill-logo wall, or repeated rounded grids. It is calmer and more credible than the previous version. It does not immediately scream “AI generated.”

It still carries second-order AI portfolio grammar: a giant generic role headline, small blue mono category labels, repeated Problem/Solution/Decisions templates, numbered rows that are not sequences, and meta-copy explaining that projects were selected “not [for] repository count.” These choices feel generated because they could be applied to nearly any engineer.

The deterministic detector could not run because the installed skill is missing `scripts/lib/impeccable-config.mjs`. Browser evidence and the latest Vercel Web Interface Guidelines were used as fallback.

## Overall impression

Professional and restrained, but not yet premium. The biggest opportunity is to replace generic portfolio scaffolding with stronger, project-specific proof. Viya supports this level; Crave and WatchBox currently do not.

## What’s working

- Real product imagery gives Viya immediate credibility and creates the strongest visual peak.
- The neutral palette, large type, and disciplined spacing establish confidence without visual noise.
- Homepage hierarchy is easy to scan and the employer journey is direct: positioning, work, engineering, experience, contact.

## Priority issues

### P1 — Weak project evidence is being treated as equal

Crave is shown in a geolocation-denied error state, while WatchBox shows only authentication. These visuals undermine the claim that the portfolio presents polished products.

Fix: replace Crave with successful live-flow screenshots; demote WatchBox to compact supporting work until product screens and role details are available.

### P1 — Case studies are templated and too shallow

Every route repeats the same hero, image, Problem/Solution, and Decisions table. The structure is clean but reads like generated case-study filler rather than authored product analysis.

Fix: make Viya’s page product-specific with architecture, AI trust boundary, quality evidence, and release artifacts. Give Crave a short flow narrative and API path. Do not create a full case study when evidence is insufficient.

### P2 — Mobile technical links and metadata are undersized

Several project links are 24px tall and metadata drops to 12px. They are readable but not premium or comfortably tappable.

Fix: make mobile links at least 44px high, use 14px minimum metadata on mobile, and increase spacing around clustered actions.

### P2 — Generic developer-portfolio grammar remains

Blue mono labels, non-sequential numbering, “Selected work,” “How I build,” and the generic role headline create a refined but familiar Vercel-style engineer portfolio.

Fix: remove decorative numbering and the hero name eyebrow, use plain sans metadata, sharpen copy around turning product ambiguity into released software, and let project-specific visuals carry identity.

### P3 — Case-study pacing has emotional valleys

Large blank intervals separate thin content sections, especially near case-study endings. The pages lose energy after the main screenshot.

Fix: tighten vertical spacing, add meaningful architecture/validation content, and end with a next-project preview rather than generic footer copy.

## Persona red flags

- **Recruiter scanning in 60 seconds:** understands the role, but sees 3 projects presented as equivalent even though only Viya has convincing product evidence.
- **Engineering manager:** gets stack names and decisions but not enough architecture, trade-off, test, or release evidence to evaluate depth.
- **Distracted mobile visitor:** hero is clear, but the 6-line title consumes most of the first viewport and technical action links are smaller than comfortable touch targets.
- **Keyboard/low-vision visitor:** structure and focus treatment are good; several text links have small visual/touch footprints and the theme symbol is ambiguous without assistive text.

## Minor observations

- “Sole listed repository contributor” sounds like an audit note, not portfolio copy.
- “Products selected…not repository count” is meta-criticism and should be direct product copy.
- The Crave hero preview exposes an error message.
- WatchBox’s sign-in screenshot does not demonstrate collections, ratings, or notes.
- The `◐` theme glyph feels provisional.

## Questions to consider

- If Viya is clearly the strongest product, why not let it own half the homepage narrative?
- Would 2 convincing projects and 1 compact supporting entry feel stronger than 3 equal case studies?
- What evidence would make an engineering manager believe “idea to release” without the site needing to say it?
