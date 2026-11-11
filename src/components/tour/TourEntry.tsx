"use client";

import { TOUR_DURATION_LABEL } from "@/lib/tour";

import { preloadTour, startTour } from "./store";
import { PlayIcon } from "./TourIcons";

type Variant = "rail" | "header" | "hero";

const ACCESSIBLE_NAME = `Start the guided tour, ${TOUR_DURATION_LABEL.replace("min", "minutes")}, narrated`;

export function TourEntry({ variant }: { variant: Variant }) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    startTour({ invoker: event.currentTarget });
  };
  const common = {
    type: "button" as const,
    onClick: handleClick,
    onPointerEnter: preloadTour,
    onFocus: preloadTour,
  };

  if (variant === "rail") {
    return (
      <div className="tour-entry-rail">
        <button
          {...common}
          className="tour-entry tour-trigger"
          aria-label={ACCESSIBLE_NAME}
        >
          <i aria-hidden="true">
            <PlayIcon />
          </i>
          <span>Guided tour</span>
          <kbd aria-hidden="true">{TOUR_DURATION_LABEL.toUpperCase()}</kbd>
        </button>
      </div>
    );
  }

  if (variant === "header") {
    return (
      <button
        {...common}
        className="tour-entry tour-entry-header"
        aria-label={ACCESSIBLE_NAME}
      >
        <PlayIcon />
        <span>Tour</span>
      </button>
    );
  }

  return (
    <button {...common} className="tour-entry tour-entry-hero">
      <PlayIcon />
      <span>Take the guided tour · {TOUR_DURATION_LABEL}</span>
    </button>
  );
}
