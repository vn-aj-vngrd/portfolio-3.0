---
name: Portfolio 3.0
description: A calm product release narrative for a product-minded full-stack software engineer.
colors:
  signal-blue: "#1768E5"
  canvas: "#FCFCFD"
  surface: "#F4F5F7"
  ink: "#111214"
  muted-ink: "#5D6673"
  border: "#E1E4E8"
  dark-canvas: "#090A0C"
  dark-surface: "#121419"
  dark-ink: "#F5F6F8"
  dark-muted-ink: "#A6ADB8"
typography:
  display:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "clamp(3rem, 7vw, 5.5rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Geist Mono, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  section: "clamp(5rem, 11vw, 9rem)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.md}"
    padding: "12px 18px"
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "12px 18px"
---

# Design System: Portfolio 3.0

## Overview

**Creative North Star: "The Product Release Narrative"**

The portfolio presents real products the way a careful engineer would present a release: the problem first, the product in use, then the decisions that made it dependable. Real screenshots carry personality while the surrounding interface remains quiet, exact, and easy to scan.

The system combines product-first storytelling and generous hierarchy with a compact developer identity. It explicitly rejects résumé-page density, decorative technical costume, generic card grids, and startup-landing-page spectacle.

**Key Characteristics:**

- Light-led neutral canvas with a restrained signal blue.
- Large, controlled typography paired with narrow readable copy.
- Real product screens before technology lists.
- Flat surfaces, thin separators, and rare structural depth.
- Motion that enhances an already complete static experience.

## Colors

The palette is neutral and high-contrast; Signal Blue is reserved for links, focus, and meaningful state.

### Primary

- **Signal Blue:** Used for links, focus, and selected technical decisions. It never becomes a decorative wash.

### Neutral

- **Clear Canvas:** The primary light background.
- **Soft Surface:** A restrained stage for product media.
- **Near-black Ink:** Primary text and high-emphasis controls.
- **Slate Muted Ink:** Secondary copy that remains WCAG-readable.
- **Quiet Border:** Structural separators.

**The Ten Percent Rule.** Signal Blue occupies less than ten percent of a page; its rarity is the point.

## Typography

**Display Font:** Geist with system sans-serif fallback
**Body Font:** Geist with system sans-serif fallback
**Label/Mono Font:** Geist Mono

**Character:** Neutral enough to let the products lead, but precise in scale and spacing. Mono is metadata, never shorthand for “developer.”

### Hierarchy

- **Display** (600, fluid to 5.5rem, 0.98): Hero thesis and flagship case-study title only.
- **Headline** (600, fluid to 3.75rem, 1.05): Major section titles.
- **Title** (600, fluid to 2.25rem, 1.15): Projects and roles.
- **Body** (400, 1–1.25rem, 1.65): Prose capped at 72 characters.
- **Label** (500, 0.8125rem): Technical metadata in sentence case.

**The No-Shouting Rule.** Display type never exceeds 5.5rem and tracking never tightens beyond -0.04em.

## Elevation

The system is flat by default. Depth comes from tonal separation, scale, overlap of authentic product imagery, and thin borders. Shadows appear only under media that needs physical separation from its stage.

**The Flat-by-Default Rule.** A surface never combines a decorative border with a wide soft shadow.

## Components

### Buttons

- **Shape:** Compact, gently squared corners (10px).
- **Primary:** Solid ink with canvas text.
- **Hover / Focus:** Small tonal shift and a visible two-pixel Signal Blue focus ring.
- **Secondary:** Transparent or canvas surface with a quiet border.

### Chips

- **Style:** Used only for short project stack metadata; no large skill cloud.
- **State:** Static labels are visually quieter than interactive controls.

### Cards / Containers

- **Corner Style:** Media stages use 16px; most editorial content has no container.
- **Background:** Canvas or Soft Surface.
- **Shadow Strategy:** Flat at rest.
- **Border:** Quiet Border only when structure needs it.
- **Internal Padding:** Fluid 20–48px.

### Inputs / Fields

- The homepage has no contact form. Any future field uses a visible label, 10px radius, high-contrast border, and explicit focus/error state.

### Navigation

- Compact sticky row with a solid canvas, thin divider, sentence-case links, and a native mobile disclosure. No glass capsule or animated progress dock.

### Decision Rail

- A compact sequence used only inside project storytelling: Problem, Product model, Technical decision, Validation, Release. It is content, not numbered decoration.

## Do's and Don'ts

### Do:

- **Do** lead with real screenshots and verified product decisions.
- **Do** keep body copy within 65–72 characters.
- **Do** use generous spacing and deliberate asymmetry.
- **Do** make content visible before JavaScript or animation runs.
- **Do** provide a static reduced-motion experience.

### Don't:

- **Don't** resemble a résumé converted into a website, a generic developer template, a SaaS landing page, or AI-generated portfolio UI.
- **Don't** use glowing gradients, decorative code fragments, glassmorphism, excessive Bento grids, giant pills, logo walls, meaningless badges, floating cards, or unnecessary 3D.
- **Don't** use gradient text or repeated tiny uppercase section eyebrows.
- **Don't** put every section inside a rounded card.
- **Don't** clone Apple or Bryl Lim.
