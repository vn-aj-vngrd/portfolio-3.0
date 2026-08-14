---
name: Portfolio 3.0
description: A calm product release narrative for a product-minded full-stack engineer.
fonts:
  sans: Geist
  mono: Geist Mono
colors:
  canvas: "#FBFBFA"
  surface: "#F1F2F2"
  ink: "#121416"
  muted: "#62686F"
  border: "#DFE2E4"
  signal: "#155EEF"
layout:
  rail: "15.5rem"
  maxContent: "74rem"
  readableMeasure: "42rem"
  sectionSpace: "clamp(6rem, 10vw, 9rem)"
---

# Portfolio 3.0 Design System

## Creative north star

The Product Release Narrative. Present the problem, the product in use, and the decisions that make it dependable. The interface should feel engineered, not decorated.

## Typography

- Geist carries editorial headings, body copy, and interface controls.
- Geist Mono carries identity moments, technical metadata, coordinates, and data.
- Display: `clamp(3.4rem, 7vw, 6.3rem)`, `0.94` line-height, `-0.06em` tracking.
- Section heading: `clamp(2.3rem, 5vw, 4.3rem)`, `1.0` line-height.
- Body: `1rem`, `1.65` line-height, capped near `42rem`.
- Metadata: `0.62–0.72rem` in Geist Mono.

## Color

The system is neutral and light-led. Signal Blue is reserved for links, focus, selected state, and technical markers. Keep it below ten percent of a page. Dark mode uses tuned tokens rather than inversion.

## Layout

A `15.5rem` studio rail frames a `74rem` editorial canvas on desktop. Mobile replaces the rail with a compact sticky header. Sections use generous vertical rhythm, readable copy widths, deliberate asymmetry, and structural hairlines. Content is not wrapped in cards by default.

## Components

- **Studio rail:** Identity, navigation state, tools, presence, and contact.
- **Page back link:** Consistent return path across focused routes.
- **Editorial heading:** Thesis plus restrained context.
- **Signal link:** Text-first action for meaningful navigation.
- **Data ledger:** Comparable evidence organized with hairlines.
- **Media stage:** Quiet surface for real product imagery.
- **Interface controls:** Equal-size theme and sound controls.
- **Focus ring:** 3px Signal Blue with 4px offset.

## Motion

Motion explains state. Theme changes use one radial reveal from the initiating control. Smooth scrolling preserves user control. Hover feedback stays under 300ms. Honor `prefers-reduced-motion` and keep the static experience complete.

## Responsive behavior

- **Desktop (>980px):** Fixed studio rail and full editorial canvas.
- **Tablet (701–980px):** Sticky top header and compact navigation.
- **Mobile (≤700px):** Single-column narratives, 44px minimum targets, horizontally scrollable dense data only where necessary.

## Accessibility

Use semantic landmarks, one `h1` per page, ordered heading levels, visible focus, keyboard navigation, sufficient contrast, reduced-motion support, descriptive alt text, and live regions only for meaningful status changes. Target WCAG 2.2 AA where practical.

## Rules

1. Products and evidence lead; technology supports the story.
2. Typography and spacing create hierarchy before containers do.
3. Signal Blue communicates state—it does not decorate empty space.
4. Prefer flat structure, real screenshots, and thin separators.
5. Every motion has a static and reduced-motion equivalent.
6. Do not use glowing or decorative gradients, glassmorphism, giant pills, logo walls, or decorative code.
7. Do not claim impact that public evidence cannot support.
8. Remove an element when it does not improve comprehension.
