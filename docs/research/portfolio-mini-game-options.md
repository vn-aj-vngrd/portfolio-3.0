# Portfolio Product Lab

## Decision

Build one **Product Lab** containing three short 3D games. Keep one **Play** entry in the studio rail; do not add three sidebar rows. The games should map directly to the three questions an employer has:

1. **Stack Builder** — How does Van build?
2. **Release Run** — Can Van take work from idea to release?
3. **Product Match** — What has Van actually built?

Stack Builder is the flagship and should be prototyped first. All three games should reuse one visual system, scene shell, input model, audio preference, loading state, and completion pattern so the result feels like one authored product rather than three unrelated demos.

## Shared Product Lab

```text
Studio rail
└── Play                 ⌘/Ctrl + K

Product Lab
├── Stack Builder        Build a product architecture
├── Release Run          First-person idea-to-release challenge
└── Product Match        Match real products to real problems
```

Desktop opens an immersive dialog. Mobile opens the same experience as a full-screen surface. The launcher should show one sculptural preview per game, a plain-language objective, and an honest 20–45 second duration.

## Game 1 — Stack Builder (flagship)

### Concept

Choose a product brief—**Web product**, **Mobile product**, or **Agent workflow**—then play a 3D timing game inspired by physical block stacking. Each moving block is one real layer of Van's stack. Drop all five with enough overlap to keep the tower stable as speed increases and the available surface becomes narrower.

This is an arcade game rather than technology trivia. The technology names explain what the tower represents; timing and spatial judgment create the challenge.

### Layers

1. **Experience** — React, Next.js, React Native, Expo
2. **Services** — ASP.NET Core, NestJS, Hono, Fastify, Laravel
3. **Data** — PostgreSQL, MSSQL, MySQL, MongoDB, Redis, Convex, Supabase
4. **Delivery** — Vercel, Docker, AWS, Turborepo, GitHub CI/CD
5. **Quality and workflow** — TypeScript, Vitest, Jest, Maestro, Biome, Claude Code, Codex, Pi

The available modules should change by brief so the interface never becomes a logo wall. Show only a small, curated set of credible choices in each round.

### Example round

```text
Brief: A mobile travel workspace with reviewable AI actions

Experience   React Native + Expo
Services     Convex functions
Data         Convex
Identity     Clerk
Quality      TypeScript + Maestro
Workflow     Claude Code / Codex
```

This round can use the publicly documented Viya architecture. Other rounds can draw from Crave Roulette and WatchBox without inventing responsibilities or outcomes.

### Interaction

- Pointer/touch: click or tap the 3D stage—or use the visible Drop control—to stop the moving block.
- Keyboard: Space or Enter drops the active layer.
- Misaligned overhang is cut away and falls, making the next layer harder; a complete miss ends the run.
- Completion reports alignment accuracy and produces a concise stack sheet visitors can copy.
- Duration: 30–60 seconds.

### Why it belongs

- Showcases the TypeScript ecosystem as an interconnected practice rather than a badge cloud.
- Communicates architecture and product judgment to technical employers.
- Remains understandable to non-technical visitors because every layer is named by purpose.
- Turns the existing “How I build” content into an interactive proof point.

### Main risk

A familiar stacking mechanic can feel generic if the technology layers are merely labels. The industrial scene, real curated stacks, progressive trimming, alignment score, and portfolio-specific completion sheet must make the mechanic belong to Van.

## Game 2 — Release Run

### Concept

Navigate a first-person 3D build corridor and activate Plan, Build, Test, and Ship in sequence. The visitor must move, aim, and interact rather than complete a form disguised as a game.

### Interaction

- Desktop: WASD movement, mouse look with pointer lock, click or Space to activate a target.
- Mobile: touch movement pad, turn controls, and a dedicated Activate action.
- The active stage emits Signal Blue; completed stages remain visible in the HUD.
- Completion confirms that the idea moved through the complete delivery path.
- Duration: 30–60 seconds.

### Why it belongs

It turns the portfolio's core promise—taking ideas and requirements through implementation, testing, and release—into an actual spatial challenge rather than another marketing sentence.

### Main risk

First-person controls can exclude visitors or create motion discomfort. Keep the corridor short, provide complete touch and keyboard controls, avoid camera bob and acceleration, keep Escape available, and maintain reduced-motion behavior.

## Game 3 — Product Match

### Concept

Three real product problems enter a 3D review table. The visitor rotates a device carousel and docks the product that addresses each problem. A correct match unfolds a short product explanation and one verified engineering decision.

### Verified rounds

- **Fragmented travel planning** → **Viya** — trip-scoped workspace for itinerary, budget, documents, bookings, readiness, risks, and reviewable AI updates.
- **“Where should we eat?” decision fatigue** → **Crave Roulette** — nearby restaurant data, AI vibe curation, roulette, and a veto path.
- **Scattered viewing lists and notes** → **WatchBox** — authenticated, shareable collections with media entries, ratings, notes, and flexible content.

### Interaction

- Pointer/touch: select one of three floating 3D product devices; a correct device moves into the central dock.
- Keyboard: equivalent named product buttons provide the same selection path.
- A mismatch shakes the selected device and reveals one useful clue; no score penalty.
- A match transitions into a concise micro-case-study using verified portfolio content.
- Completion links directly to the selected case studies.
- Duration: 30–45 seconds.

### Why it belongs

It makes visitors understand the actual projects and their user problems. The game is therefore a discovery path into the portfolio, not entertainment detached from it.

### Main risk

It can feel like a quiz if the prompts are obscure. Keep each problem concrete, show product category clues, and treat mismatches as exploration rather than failure.

## Visual direction

Treat the Product Lab as one small industrial product:

- fixed isometric camera with restrained perspective
- matte neutral stage in light and dark themes
- machined forms, engraved labels, hairline coordinates
- Signal Blue only for active state, valid connection, and completion
- Geist Mono for data and controls; Geist for instructions
- authored shadows and restrained highlights
- no neon bloom, star fields, particle fog, glass panels, fake terminal, floating card cloud, or game HUD chrome

The visual signature is **the portfolio becoming tangible**: stacks lock together, release stages become a navigable world, and real products dock into the problems they solve.

## Mobile and accessibility

- Use tap-first mechanics; dragging is optional, never required.
- Keep a fixed camera on mobile and increase object hit targets.
- Provide semantic HTML controls and status outside the canvas bitmap.
- Support keyboard completion for every game.
- Keep instructions visible and under two sentences.
- Reduced motion removes camera sweeps, spring overshoot, parallax, and oscillation; game state remains complete.
- Provide a 2D semantic fallback if WebGL is unavailable.
- Preserve visible close, reset, mute, and instructions controls.
- Use no time pressure by default.

## Performance architecture

- Dynamically import the 3D runtime only when Play opens; the homepage should not ship the game bundle up front.
- Share one renderer and scene shell across all three modes.
- Prefer procedural geometry and existing project screenshots over downloaded model packs.
- Use deterministic authored motion; avoid a general physics dependency.
- Render on demand and run animation frames only during interaction or transitions.
- Pause rendering and audio whenever the lab is hidden or the document is not visible.
- Cap device pixel ratio and test thermals on iPhone-sized devices.
- Prefer raw Three.js for this bounded experience; add React Three Fiber only if a prototype proves it materially improves maintainability.

## Delivery sequence

1. Prototype Stack Builder with one Viya-derived brief and the shared scene shell.
2. Validate interaction at 390px, keyboard flow, reduced motion, loading cost, and visual quality.
3. Add Release Run using the same materials, audio preference, and completion system.
4. Add Product Match using existing project content and screenshots.
5. Keep Product Lab as the single game launcher; Bug Hunt remains removed.

## Concepts deliberately rejected

- **Bug Hunt or code trivia:** excludes non-technical visitors and tests the visitor instead of expressing the portfolio.
- **Three separate sidebar game rows:** adds clutter and makes the portfolio feel like an arcade.
- **Drive-around 3D portfolio:** slows navigation and lets the medium overshadow Van's products.
- **Endless runner or cube dodger:** reads as a tutorial mechanic unrelated to the portfolio identity.
- **Leaderboard or login:** adds privacy, moderation, and cheating concerns without improving the hiring story.
- **3D desk explorer:** overlaps the Gear page and emphasizes consumer products rather than engineering judgment.

## Primary sources

- Three.js, “Rendering on Demand” — continuous rendering can waste device power when nothing changes; render in response to input and state changes: https://threejs.org/manual/en/rendering-on-demand.html
- Three.js, “Responsive Design” — canvas display size, drawing-buffer size, camera aspect, and responsive resizing: https://threejs.org/manual/en/responsive.html
- Three.js, “Picking” — pointer/touch object selection through raycasting: https://threejs.org/manual/en/picking.html
- MDN, `<canvas>` — fallback content and the accessibility limits of bitmap canvas content: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas
- web.dev, “prefers-reduced-motion: Sometimes less movement is more” — motion-reduced variants and the impact of excessive animation: https://web.dev/articles/prefers-reduced-motion
- W3C, WCAG 2.2, Keyboard (2.1.1), Animation from Interactions (2.3.3), and Target Size (Minimum) (2.5.8): https://www.w3.org/TR/WCAG22/
