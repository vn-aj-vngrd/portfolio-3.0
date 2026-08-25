export const colorTokens = [
  { name: "Canvas", variable: "--canvas", light: "#FBFBFA", dark: "#0B0C0E", use: "Primary page background" },
  { name: "Surface", variable: "--surface", light: "#F1F2F2", dark: "#141619", use: "Quiet media and data stages" },
  { name: "Strong surface", variable: "--surface-strong", light: "#E7E9EA", dark: "#1C1F23", use: "Raised tonal separation" },
  { name: "Ink", variable: "--ink", light: "#121416", dark: "#F1F3F4", use: "Primary text and controls" },
  { name: "Muted ink", variable: "--muted", light: "#62686F", dark: "#A3A9B0", use: "Supporting copy" },
  { name: "Faint ink", variable: "--faint", light: "#686E75", dark: "#7B828A", use: "AA-compliant metadata and tertiary labels" },
  { name: "Border", variable: "--border", light: "#DFE2E4", dark: "#292D32", use: "Structural hairlines" },
  { name: "Signal", variable: "--signal", light: "#155EEF", dark: "#77A6FF", use: "Links, focus, and active state" },
  { name: "Signal soft", variable: "--signal-soft", light: "#E9EFFF", dark: "#14213C", use: "Selected-state background" },
  { name: "Signal inverse", variable: "--signal-inverse", light: "#77A6FF", dark: "#155EEF", use: "Small accent text on inverted ink surfaces" },
] as const;

export const spacingTokens = [
  { name: "2XS", value: "4px" },
  { name: "XS", value: "8px" },
  { name: "SM", value: "12px" },
  { name: "MD", value: "16px" },
  { name: "LG", value: "24px" },
  { name: "XL", value: "40px" },
  { name: "2XL", value: "64px" },
  { name: "Section", value: "clamp(6rem, 10vw, 9rem)" },
] as const;

export const componentInventory = [
  { name: "Studio rail", role: "Persistent identity, section state, utilities, and direct contact." },
  { name: "Page back link", role: "A consistent return path on every focused route." },
  { name: "Editorial heading", role: "A restrained thesis with readable supporting context." },
  { name: "Signal link", role: "Text-first action reserved for meaningful navigation." },
  { name: "Data ledger", role: "Comparable facts separated by rules instead of floating cards." },
  { name: "Media stage", role: "A quiet product-first surface for authentic screenshots." },
  { name: "Interface controls", role: "Equal-size theme and sound controls with explicit labels." },
  { name: "Focus ring", role: "A three-pixel Signal Blue outline visible across themes." },
] as const;

export const cssTokenSnippet = `:root {
  --canvas: #fbfbfa;
  --surface: #f1f2f2;
  --surface-strong: #e7e9ea;
  --ink: #121416;
  --muted: #62686f;
  --faint: #686e75;
  --border: #dfe2e4;
  --signal: #155eef;
  --signal-soft: #e9efff;
  --signal-inverse: #77a6ff;
  --rail: 15.5rem;
  --max: 74rem;
  --text-max: 42rem;
  --section-space: clamp(6rem, 10vw, 9rem);
}`;

export const componentSnippet = `<section className="section" aria-labelledby="section-title">
  <header className="section-heading">
    <span className="section-index">01</span>
    <h2 id="section-title">A clear product claim.</h2>
    <p>Evidence and context, kept within a readable measure.</p>
  </header>
  {/* Product evidence, not decorative cards */}
</section>`;

export const designMarkdown = `---
name: Portfolio 3.0
description: The visual and interaction system for a full-stack software developer portfolio.
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
  signalInverse: "#77A6FF"
layout:
  rail: "15.5rem"
  maxContent: "74rem"
  readableMeasure: "42rem"
  sectionSpace: "clamp(6rem, 10vw, 9rem)"
---

# Portfolio 3.0 Design System

## Creative north star

Show the problem, the working product, and the implementation decisions. Use typography, spacing, and product imagery to make the evidence easy to inspect.

## Typography

- Geist carries editorial headings, body copy, and interface controls.
- Geist Mono carries identity moments, technical metadata, coordinates, and data.
- Display: clamp(3.4rem, 7vw, 6.3rem), 0.94 line-height, -0.06em tracking.
- Section heading: clamp(2.3rem, 5vw, 4.3rem), 1.0 line-height.
- Body: 1rem, 1.65 line-height, capped near 42rem.
- Metadata: 0.62–0.72rem in Geist Mono.

## Color

The system is neutral and light-led. Signal Blue is reserved for links, focus, selected state, and technical markers. Keep it below ten percent of a page. Inverted ink surfaces use a separate signal token so small blue labels retain AA contrast in both themes. Dark mode uses tuned tokens rather than mechanical inversion.

## Layout

A 15.5rem studio rail frames a 74rem content area on desktop. Mobile replaces the rail with a compact sticky header. Sections use generous spacing, readable line lengths, selective asymmetry, and thin structural borders. Cards are used only when content needs a contained surface.

## Components

- Studio rail: identity, navigation state, tools, presence, and contact.
- Page back link: consistent return path across focused routes.
- Editorial heading: thesis plus restrained context.
- Signal link: text-first action for meaningful navigation.
- Data ledger: comparable evidence organized with hairlines.
- Media stage: quiet surface for real product imagery.
- Interface controls: equal-size theme and sound controls.
- Focus ring: 3px Signal Blue with 4px offset.

## Motion

Motion explains state. Theme changes use one radial reveal from the initiating control. Smooth scrolling preserves user control. Hover feedback stays under 300ms. Honor prefers-reduced-motion and keep the static experience complete.

## Responsive behavior

- Desktop (>980px): fixed studio rail and full editorial canvas.
- Tablet (701–980px): sticky top header and compact navigation.
- Mobile (≤700px): single-column narratives, 44px minimum targets, horizontally scrollable dense data only where necessary.

## Accessibility

Use semantic landmarks, one h1 per page, ordered heading levels, visible focus, keyboard navigation, sufficient contrast, reduced-motion support, descriptive alt text, and live regions only for meaningful status changes. Target WCAG 2.2 AA where practical.

## Rules

1. Products and evidence lead; technology supports the story.
2. Typography and spacing create hierarchy before containers do.
3. Signal Blue marks links, focus, selection, and status.
4. Prefer flat structure, real screenshots, and thin separators.
5. Every motion has a static and reduced-motion equivalent.
6. Do not use glowing or decorative gradients, glassmorphism, giant pills, logo walls, or decorative code.
7. Do not claim impact that public evidence cannot support.
8. Remove an element when it does not improve comprehension.
`;
