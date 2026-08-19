"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

const legacySectionIds: Record<string, string> = {
  work: "my-work",
  engineering: "tech-stack",
  certifications: "credentials",
};

export function SectionAnchorSync() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (pathname !== "/") return;
    const requestedId = decodeURIComponent(window.location.hash.slice(1));
    if (!requestedId) return;

    const id = legacySectionIds[requestedId] ?? requestedId;
    if (id !== requestedId) window.history.replaceState(null, "", `#${id}`);

    const target = document.getElementById(id);
    const main = document.getElementById("main-content");
    if (!target || !main) return;

    const expectedTop = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    let stopped = false;
    let timeout = 0;

    const alignToSection = () => {
      if (stopped || Math.abs(target.getBoundingClientRect().top - expectedTop) <= 2) return;
      document.dispatchEvent(
        new CustomEvent("portfolio-scroll-to", {
          detail: { id, immediate: true },
        }),
      );
    };

    const observer = new ResizeObserver(alignToSection);
    const stopTracking = () => {
      if (stopped) return;
      stopped = true;
      observer.disconnect();
      window.clearTimeout(timeout);
      window.removeEventListener("click", stopTracking);
      window.removeEventListener("wheel", stopTracking);
      window.removeEventListener("touchstart", stopTracking);
      window.removeEventListener("keydown", stopTracking);
    };

    alignToSection();
    observer.observe(main);
    void document.fonts.ready.then(alignToSection);

    timeout = window.setTimeout(stopTracking, 4_000);
    window.addEventListener("click", stopTracking);
    window.addEventListener("wheel", stopTracking, { passive: true });
    window.addEventListener("touchstart", stopTracking, { passive: true });
    window.addEventListener("keydown", stopTracking);

    return stopTracking;
  }, [pathname]);

  return null;
}
