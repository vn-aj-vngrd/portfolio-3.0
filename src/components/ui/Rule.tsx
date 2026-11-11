import type { CSSProperties } from "react";

// A drawn hairline (Draw in the scroll story). The parent must be position: relative.
// axis "x" is a horizontal line at `at` from the top; axis "y" a vertical line at `at` from the start.
// `only` limits a line to wide (>800px) or narrow layouts when a grid reflows.
export function Rule({
  axis = "x",
  at = "0px",
  only,
}: {
  axis?: "x" | "y";
  at?: string;
  only?: "wide" | "narrow";
}) {
  return (
    <i
      className="rule"
      data-axis={axis}
      data-draw={axis}
      data-only={only}
      style={{ "--at": at } as CSSProperties}
      aria-hidden="true"
    />
  );
}
