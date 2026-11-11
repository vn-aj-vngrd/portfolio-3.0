"use client";

import { usePathname, useRouter } from "next/navigation";

import { TOUR_DURATION_LABEL } from "@/lib/tour";

import {
  focusTourPlayer,
  isTourActive,
  openTourInvite,
  preloadTour,
  setPendingTour,
} from "./store";
import { PlayIcon, TourGuideIcon } from "./TourIcons";

type Variant = "rail" | "header" | "hero";

const ACCESSIBLE_NAME = `Start the guided tour, ${TOUR_DURATION_LABEL.replace("min", "minutes")}, narrated`;

export function TourEntry({ variant }: { variant: Variant }) {
  const pathname = usePathname();
  const router = useRouter();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isTourActive()) {
      focusTourPlayer();
      return;
    }
    if (pathname !== "/") {
      // The tour lives on the home page: go there, then the start card opens.
      setPendingTour({ chapterKey: null, invoker: event.currentTarget });
      router.push("/");
      return;
    }
    // Never start cold: the start card says what the tour is and asks for sound first.
    openTourInvite(null);
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
            <TourGuideIcon />
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
        <TourGuideIcon />
        <span>Tour</span>
      </button>
    );
  }

  return (
    <button {...common} className="tour-entry tour-entry-hero">
      <PlayIcon />
      <span>Guided tour</span>
      <em>{TOUR_DURATION_LABEL}</em>
    </button>
  );
}
