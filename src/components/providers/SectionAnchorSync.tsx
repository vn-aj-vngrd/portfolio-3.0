"use client";

import { useEffect } from "react";

export function SectionAnchorSync() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    let lastPageHeight = 0;
    let stableSince = performance.now();
    let stopped = false;

    const alignToSection = () => {
      if (stopped) return;
      const target = document.getElementById(id);
      if (!target) return;

      const pageHeight = document.documentElement.scrollHeight;
      const isMisaligned = Math.abs(target.getBoundingClientRect().top) > 2;
      if (pageHeight !== lastPageHeight || isMisaligned) {
        lastPageHeight = pageHeight;
        stableSince = performance.now();
        document.dispatchEvent(
          new CustomEvent("portfolio-scroll-to", {
            detail: { id, immediate: true },
          }),
        );
      }

      if (performance.now() - stableSince > 2_000) stopTracking();
    };

    const stopTracking = () => {
      if (stopped) return;
      stopped = true;
      window.clearInterval(interval);
      window.clearTimeout(timeout);
      window.removeEventListener("wheel", stopTracking);
      window.removeEventListener("touchstart", stopTracking);
      window.removeEventListener("keydown", stopTracking);
    };

    const interval = window.setInterval(alignToSection, 100);
    const timeout = window.setTimeout(stopTracking, 10_000);
    window.addEventListener("wheel", stopTracking, { passive: true });
    window.addEventListener("touchstart", stopTracking, { passive: true });
    window.addEventListener("keydown", stopTracking);
    alignToSection();

    return stopTracking;
  }, []);

  return null;
}
