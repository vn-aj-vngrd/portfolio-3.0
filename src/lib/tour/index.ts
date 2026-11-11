import { tourChapters } from "@/content/tour";

import narration from "./narration.json";
import { buildTimeline, type TourManifest } from "./timeline";

export const tourManifest = narration as TourManifest;

/** The timeline with every stop, built at import time from the committed manifest. */
export const TOUR_TIMELINE_ESTIMATE = buildTimeline(tourChapters, tourManifest);

export const TOUR_DURATION_LABEL = "3 min";

export * from "./link";
export * from "./timeline";
