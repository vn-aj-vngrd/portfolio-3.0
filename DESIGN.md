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
- **Interface controls:** Equal-size theme and sound controls. Interface sounds are off until chosen, synthesized in the browser (soft sine plucks in the tour score's F major pentatonic: a quiet random note on hover, a damped press with a tiny transient on click, a rising fifth when enabled) and silent while the guided tour plays.
- **Focus ring:** 3px Signal Blue with 4px offset.
- **Rail row:** A neutral line icon, a label, and a hairline key hint. Every row has its own icon; none is Signal Blue.
- **Quick navigation:** A rail row and a one-time tip open the section index; holding the platform key shows the same panel. The tip shows once, never during the tour, and only with a keyboard and pointer.
- **Mobile menu:** An icon-only 44px button with a hairline border opens a full-screen index with square 6px-radius controls; the current row's tint extends past the row so text and arrow never shift.
- **Process diagram:** Hairline nodes, real text, connectors with chevrons; container queries switch an authored vertical layout below 56rem; Signal Blue only marks the current stage.
- **Factory run:** A scroll-started walkthrough of one issue: captions per stage, Pause/Play and Replay controls, autoplay once, pauses offscreen and in a hidden tab; reduced motion shows the complete static diagram.
- **Mobile header:** A compact sticky header below 980px with the home link, a Guided tour button, and the icon-only menu button.
- **Hero tour link:** A compact text link in the hero that opens the start card; it never starts the tour by itself.
- **Start card:** Chapters, narration and music toggles, Play, and Explore on my own; the first step of every tour start.
- **Tour player:** A flat player on the canvas (opaque, 1px hairline, 4px radius) with a meta row, one caption sentence, a chapter scrubber and 40px controls.
- **Product Lab:** A rail row and a mobile menu entry that open a full-screen takeover with playable product specimens.
- **Particle flow:** 2px particles that travel along live connectors on /ai; transform and opacity only.
- **Stat ledger:** Comparable metrics on drawn hairlines; each number counts once to its exact value, and rules and cells draw in as the ledger enters view.
- **Workflow diagram:** the five-stage loop on the home page and /ai; connectors draw in order, each icon draws as work reaches it, then restrained particles flow only while it is in view.
- **Activity summary:** the GitHub stats panel; its numbers count up once to the exact figures (tabular numerals, final value in the accessible text), its dividers draw, and the contribution cells appear column by column.
- **Reveal:** The one entrance for every page and section (see Motion).
- **Overlay:** Popovers, dialogs, and takeovers share one entrance and exit (see Motion).
- **Guided tour:** A rail row (`Guided tour`, duration in a hairline box), a mobile header button, and a compact hero link open a start card (chapters, narration and music toggles, Play, Explore on my own); the tour never starts before Play. Once started it is a narrated walk. A flat player on the canvas (opaque, 1px hairline, 4px radius) holds the meta row, one caption sentence, a chapter scrubber (Signal Blue marks the current chapter only) and 40px controls. While it plays, one hairline-framed spotlight sits on the current stop and everything outside it greys toward the canvas (74%, 88% under `prefers-contrast: more`); a small pointer glides to the stop's heading and presses once (desktop only). The controls include a playback speed cycle (1×, 1.25×, 1.5×, 2×) that scales the clock, voice, scrolls and pointer; pausing removes the spotlight and pointer. A long jump is a short fade cut, not a fast scroll. No glass, glow or badge marks the active stop.

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
