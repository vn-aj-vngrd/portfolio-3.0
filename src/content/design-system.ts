export const colorTokens = [
  {
    name: "Canvas",
    variable: "--canvas",
    light: "#FBFBFA",
    dark: "#0B0C0E",
    use: "Primary page background",
  },
  {
    name: "Surface",
    variable: "--surface",
    light: "#F1F2F2",
    dark: "#141619",
    use: "Quiet media and data stages",
  },
  {
    name: "Strong surface",
    variable: "--surface-strong",
    light: "#E7E9EA",
    dark: "#1C1F23",
    use: "Raised tonal separation",
  },
  {
    name: "Ink",
    variable: "--ink",
    light: "#121416",
    dark: "#F1F3F4",
    use: "Primary text and controls",
  },
  {
    name: "Muted ink",
    variable: "--muted",
    light: "#62686F",
    dark: "#A3A9B0",
    use: "Supporting copy",
  },
  {
    name: "Faint ink",
    variable: "--faint",
    light: "#686E75",
    dark: "#7B828A",
    use: "AA-compliant metadata and tertiary labels",
  },
  {
    name: "Border",
    variable: "--border",
    light: "#DFE2E4",
    dark: "#292D32",
    use: "Structural hairlines",
  },
  {
    name: "Signal",
    variable: "--signal",
    light: "#155EEF",
    dark: "#77A6FF",
    use: "Links, focus, and active state",
  },
  {
    name: "Signal soft",
    variable: "--signal-soft",
    light: "#E9EFFF",
    dark: "#14213C",
    use: "Selected-state background",
  },
  {
    name: "Signal inverse",
    variable: "--signal-inverse",
    light: "#77A6FF",
    dark: "#155EEF",
    use: "Small accent text on inverted ink surfaces",
  },
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
  {
    name: "Studio rail",
    role: "Persistent identity, section state, utilities, and direct contact.",
  },
  {
    name: "Page back link",
    role: "A consistent return path on every focused route.",
  },
  {
    name: "Editorial heading",
    role: "A restrained thesis with readable supporting context.",
  },
  {
    name: "Signal link",
    role: "Text-first action reserved for meaningful navigation.",
  },
  {
    name: "Data ledger",
    role: "Comparable facts separated by rules instead of floating cards.",
  },
  {
    name: "Media stage",
    role: "A quiet product-first surface for authentic screenshots.",
  },
  {
    name: "Interface controls",
    role: "Equal-size theme and sound controls with explicit labels; opt-in sounds are soft synthesized plucks, never files.",
  },
  {
    name: "Focus ring",
    role: "A three-pixel Signal Blue outline visible across themes.",
  },
  {
    name: "Rail row",
    role: "A neutral line icon, a label, and a hairline key hint; every row has its own icon and none is Signal Blue.",
  },
  {
    name: "Guided tour",
    role: "A narrated walk with captions, music, and a player; it always opens a start card first and never begins by itself.",
  },
  {
    name: "Quick navigation",
    role: "A rail row and a one-time tip that open the section index; holding the platform key shows the same panel.",
  },
  {
    name: "Mobile menu",
    role: "An icon-only 44px header button that opens a full-screen index with square 44px controls.",
  },
  {
    name: "Process diagram",
    role: "Hairline nodes, real text, connectors with chevrons; container queries switch an authored vertical layout below 56rem; Signal Blue only marks the current stage.",
  },
  {
    name: "Factory run",
    role: "A scroll-started walkthrough of one issue: captions per stage, Pause/Play and Replay controls, autoplay once, pauses offscreen and in a hidden tab; reduced motion shows the complete static diagram.",
  },
  {
    name: "Mobile header",
    role: "A compact sticky header on tablet and mobile: home link, a Guided tour button, and the icon-only menu button.",
  },
  {
    name: "Hero tour link",
    role: "A compact text link in the hero that opens the tour start card; it never starts the tour itself.",
  },
  {
    name: "Start card",
    role: "The first step of every tour start: chapters, narration and music toggles, Play, and Explore on my own.",
  },
  {
    name: "Tour player",
    role: "A flat player on the canvas: meta row, one caption sentence, a chapter scrubber, and 40px controls; the current stop stays lit while the rest dims.",
  },
  {
    name: "Product Lab",
    role: "A rail row and a mobile menu entry that open a full-screen takeover with playable product specimens.",
  },
  {
    name: "Particle flow",
    role: "2px particles that travel along live connectors on /ai; transform and opacity only, paused offscreen, in a hidden tab and while paused.",
  },
  {
    name: "Stat ledger",
    role: "Comparable metrics on drawn hairlines: each number counts once to its exact value, cells and rules draw in as the ledger enters view.",
  },
  {
    name: "Workflow diagram",
    role: "The five-stage loop on the home page and /ai: connectors draw in order, each icon draws as work reaches it, then restrained particles flow only while it is in view.",
  },
  {
    name: "Activity summary",
    role: "The GitHub stats panel: numbers count up once to the exact figures (tabular numerals, final value in the accessible text), dividers draw, contribution cells appear column by column.",
  },
  {
    name: "Reveal",
    role: "The one entrance for every page and section: opacity and a short rise on --motion-reveal, staggered for lists; see Motion.",
  },
  {
    name: "Overlay",
    role: "Popovers, dialogs, and takeovers share one entrance and exit: floating surfaces rise and fade, full-screen ones sweep.",
  },
] as const;

export const scrollStory = [
  {
    name: "Reveal",
    attribute: "data-reveal",
    rule: "Opacity and a short rise on --motion-reveal; headings, copy and blocks.",
  },
  {
    name: "Sequence",
    attribute: 'data-reveal="list"',
    rule: "Direct children reveal one after another, stepping by --motion-stagger, capped at five steps.",
  },
  {
    name: "Count",
    attribute: "data-count",
    rule: "A metric rises once to its exact value on --motion-count with tabular numerals; the final text is always in the DOM. Dates and prose stay static.",
  },
  {
    name: "Draw",
    attribute: "data-draw",
    rule: "A hairline draws along its axis from the reading-start edge with scaleX or scaleY.",
  },
  {
    name: "Fill",
    attribute: "data-fill",
    rule: 'Bars and meters grow from their baseline; data-fill="cells" fills a grid column by column.',
  },
] as const;

export const layoutTokens = [
  { variable: "--rail", value: "15.5rem", use: "Desktop studio rail width" },
  { variable: "--max", value: "74rem", use: "Editorial canvas" },
  { variable: "--text-max", value: "42rem", use: "Readable measure" },
  {
    variable: "--section-space",
    value: "clamp(6rem, 10vw, 9rem)",
    use: "Vertical rhythm between sections",
  },
] as const;

export const motionTokens = [
  {
    variable: "--ease-out",
    value: "cubic-bezier(0.16, 1, 0.3, 1)",
    use: "Every entrance, including the reveal",
  },
  {
    variable: "--ease-in",
    value: "cubic-bezier(0.7, 0, 0.84, 0)",
    use: "Every exit",
  },
  { variable: "--motion-in", value: "0.3s", use: "Floating surfaces enter" },
  { variable: "--motion-out", value: "0.18s", use: "Floating surfaces leave" },
  {
    variable: "--motion-sweep-in",
    value: "0.5s",
    use: "Full-screen takeovers enter; diagram connectors draw",
  },
  {
    variable: "--motion-sweep-out",
    value: "0.3s",
    use: "Full-screen takeovers retract",
  },
  {
    variable: "--motion-rise",
    value: "0.75rem",
    use: "Distance every entrance travels",
  },
  {
    variable: "--motion-reveal",
    value: "0.6s",
    use: "Reveal duration: the one entrance for every page and section",
  },
  {
    variable: "--motion-count",
    value: "0.9s",
    use: "Count duration: a number rises once to its exact value",
  },
  {
    variable: "--motion-stagger",
    value: "0.05s",
    use: "Reveal step between siblings, capped at five steps",
  },
] as const;

const tokenLine = (variable: string, value: string) =>
  `  ${variable}: ${value};`;

// Generated from the token data above so the copyable snippet cannot drift.
export const cssTokenSnippet = `:root {
${[
  ...colorTokens.map((token) =>
    tokenLine(token.variable, token.light.toLowerCase())
  ),
  ...layoutTokens.map((token) => tokenLine(token.variable, token.value)),
  ...motionTokens.map((token) => tokenLine(token.variable, token.value)),
].join("\n")}
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
- Interface controls: equal-size theme and sound controls. Interface sounds are off until chosen, synthesized in the browser (soft sine plucks in the tour score's F major pentatonic: a quiet random note on hover, a damped press with a tiny transient on click, a rising fifth when enabled) and silent while the guided tour plays.
- Focus ring: 3px Signal Blue with 4px offset.
- Rail row: neutral line icon, label, and a hairline key hint. Every row has its own icon and none is Signal Blue.
- Guided tour: a rail row, a mobile header button, and a hero link open a start card (chapters, narration and music toggles, Play, Explore on my own); nothing plays until Play. A flat player on the canvas holds captions, a chapter scrubber, and controls. While it plays, everything except the current stop dims.
- Quick navigation: a rail row and a one-time tip open the section index; holding the platform key shows the same panel. The tip appears once, never during the tour, and only with a keyboard and pointer.
- Mobile menu: an icon-only 44px button with a hairline border opens a full-screen index. Controls are square (6px radius). The current row is highlighted by extending its tint past the row, so text and arrow never shift.
- Process diagram: Hairline nodes, real text, connectors with chevrons; container queries switch an authored vertical layout below 56rem; Signal Blue only marks the current stage.
- Factory run: A scroll-started walkthrough of one issue: captions per stage, Pause/Play and Replay controls, autoplay once, pauses offscreen and in a hidden tab; reduced motion shows the complete static diagram.
- Mobile header: a compact sticky header below 980px with the home link, a Guided tour button, and the icon-only menu button.
- Hero tour link: a compact text link in the hero that opens the start card; it never starts the tour by itself.
- Start card: chapters, narration and music toggles, Play, and Explore on my own; the first step of every tour start.
- Tour player: a flat player on the canvas (opaque, 1px hairline, 4px radius) with a meta row, one caption sentence, a chapter scrubber and 40px controls.
- Product Lab: a rail row and a mobile menu entry that open a full-screen takeover with playable product specimens.
- Particle flow: 2px particles that travel along live connectors on /ai; transform and opacity only.
- Stat ledger: comparable metrics on drawn hairlines; each number counts once to its exact value, and rules and cells draw in as the ledger enters view.
- Workflow diagram: the five-stage loop on the home page and /ai; connectors draw in order, each icon draws as work reaches it, then restrained particles flow only while it is in view.
- Activity summary: the GitHub stats panel; its numbers count up once to the exact figures (tabular numerals, final value in the accessible text), its dividers draw, and the contribution cells appear column by column.
- Reveal: the one entrance for every page and section (see Motion).
- Overlay: every popover, dialog, and takeover uses the same entrance and exit (see Motion).

## Motion

Motion explains state. Theme changes use one radial reveal from the initiating control. Smooth scrolling preserves user control; the guided tour scrolls and dims by itself but pauses at the first wheel, key or touch, and with reduced motion every move is immediate. Hover feedback stays under 300ms. Honor prefers-reduced-motion and keep the static experience complete.

### Overlay motion

Overlays share one set of tokens in globals.css: --motion-in, --motion-out, --motion-sweep-in, --motion-sweep-out, --motion-rise, --ease-out and --ease-in. Floating surfaces (start card, quick navigation, tip, tour player) fade and rise 12px in 300ms with an ease-out curve and leave in 180ms with an ease-in curve. Full-screen takeovers (Product Lab, the mobile menu) sweep down from the top in 500ms and retract in 300ms. Scrims fade on the same timing. New dialogs and popovers use these tokens and never their own durations.

### Reveal

One recipe for every entrance and scroll reveal, on every page: opacity 0 to 1 and a rise of --motion-rise (0.75rem) to rest, over --motion-reveal (0.6s) with --ease-out. Siblings in a list step by --motion-stagger (0.05s), capped at five steps. Nothing scales, blurs, wipes or slides sideways, and no component sets its own reveal duration. One ScrollReveal observer sets data-revealed once per element: data-reveal reveals one element, data-reveal="list" staggers its direct children, and page heroes reveal on load the same way. Sections already above the viewport (anchor jumps, back and forward, fast scrolling) reveal immediately, and the guided tour reveals everything before it starts. The sticky rail, the header and overlays never reveal; they use the overlay tokens. With reduced motion, with scripting off and in print, everything is visible at once with no transform.

### Scroll story

A page tells its story as it is scrolled, with five named moves and one observer. Each block starts as it enters the lower part of the viewport, never waits on something offscreen, and takes under 1.2s. Headings and copy only Reveal; data components animate the way they explain themselves. One ScrollReveal observer sets data-revealed once per element; pages opt in with a data attribute and never set their own timing.

- Reveal (data-reveal): opacity and a short rise on --motion-reveal.
- Sequence (data-reveal="list"): direct children step by --motion-stagger, capped at five steps.
- Count (data-count): a metric rises once to its exact value on --motion-count with tabular numerals; the final value is always the element's text, so no-JS, print and screen readers get it. Only the first plain number counts, so dates and prose stay static.
- Draw (data-draw): hairlines and dividers draw along their axis from the reading-start edge (scaleX or scaleY).
- Fill (data-fill): bars and meters grow from their baseline; data-fill="cells" fills a grid column by column.

Reduced motion, scripting off, print, the guided tour and anchor jumps show the final state at once.

### Flow

Process walkthroughs draw connectors with --motion-sweep-in and change node state with --motion-in; they never loop on their own. On the /ai page the diagrams draw their connectors and icons in order the first time they enter view. Flow is shown as 2px particles (transform and opacity only, no glow) that travel along live connectors and pause offscreen, in a hidden tab and while the factory run is paused; in the factory run a ticket marker rides card to card along the connectors, the plan-approval and merge stops hold it as a hollow ring with the particles gathered until release, and the review loop returns it to Build. Reduced motion shows the final tinted state with no particles.

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
