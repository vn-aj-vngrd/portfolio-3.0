export type LabGameId = "stack" | "ship" | "match";

export type LabGame = {
  id: LabGameId;
  slug: string;
  index: string;
  title: string;
  kind: string;
  duration: string;
  description: string;
  shows: string;
  howTo: string;
  controls: readonly { keys: string; action: string }[];
};

export const labGames: readonly LabGame[] = [
  {
    id: "stack",
    slug: "stack-builder",
    index: "01",
    title: "Stack Builder",
    kind: "3D timing game",
    duration: "45 sec",
    description: "Time five moving 3D layers and build a stable product stack.",
    shows:
      "The stack I reach for on a web product, a mobile product, and an agent workflow, one layer at a time.",
    howTo:
      "Choose a brief, then align each moving layer on the one below it. The tower gets faster and narrower as it rises. Land all five to copy the finished stack.",
    controls: [
      { keys: "Click / Tap / Space", action: "Drop the moving layer" },
    ],
  },
  {
    id: "ship",
    slug: "release-run",
    index: "02",
    title: "Release Run",
    kind: "First-person product run",
    duration: "45 sec",
    description:
      "Navigate a first-person build corridor and activate every release stage.",
    shows:
      "The order I ship in: plan, build, test, then release. Each stage unlocks only after the one before it.",
    howTo:
      "Click the scene to take control, walk the corridor, and activate each lit signal in order. On a phone, use the on-screen pads.",
    controls: [
      { keys: "W A S D", action: "Move" },
      { keys: "Mouse", action: "Aim" },
      { keys: "Click / Space", action: "Activate a signal" },
      { keys: "Esc", action: "Release the cursor" },
    ],
  },
  {
    id: "match",
    slug: "product-match",
    index: "03",
    title: "Product Match",
    kind: "3D case-study challenge",
    duration: "55 sec",
    description:
      "Match real products to the problems they were designed to solve.",
    shows:
      "The problem behind every product in this portfolio, with a link to each case study once the set is complete.",
    howTo:
      "Read the problem, then pick the product that solves it. A wrong pick gives a clue instead of ending the round.",
    controls: [
      { keys: "Click / Tap", action: "Pick a product in the scene" },
      { keys: "Name buttons", action: "Pick the same products by name" },
    ],
  },
];

export function findLabGame(slug: string) {
  return labGames.find((game) => game.slug === slug);
}
