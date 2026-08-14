"use client";

import type Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function SmoothScroll() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let generation = 0;

    const setup = async () => {
      const currentGeneration = ++generation;
      lenis?.destroy();
      lenis = null;

      if (reducedMotion.matches) return;

      const { default: LenisConstructor } = await import("lenis");
      if (currentGeneration !== generation) return;

      lenis = new LenisConstructor({
        autoRaf: true,
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.88,
        anchors: { lerp: 0.08 },
        prevent: (node) => Boolean(node.closest("[data-lenis-prevent]")),
      });
    };

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href*='#']");
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
      if (url.hash) window.history.replaceState(null, "", url.hash);
    };

    const handleScrollRequest = (event: Event) => {
      const id = (event as CustomEvent<{ id?: string }>).detail?.id;
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;

      if (lenis) {
        lenis.scrollTo(target, { lerp: 0.08 });
      } else {
        target.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth" });
      }
    };

    const handleRouteScrollTop = () => {
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    void setup();
    const handlePreferenceChange = () => void setup();
    reducedMotion.addEventListener("change", handlePreferenceChange);
    document.addEventListener("click", handleAnchorClick);
    document.addEventListener("portfolio-scroll-to", handleScrollRequest);
    document.addEventListener("portfolio-route-top", handleRouteScrollTop);

    return () => {
      generation += 1;
      lenis?.destroy();
      reducedMotion.removeEventListener("change", handlePreferenceChange);
      document.removeEventListener("click", handleAnchorClick);
      document.removeEventListener("portfolio-scroll-to", handleScrollRequest);
      document.removeEventListener("portfolio-route-top", handleRouteScrollTop);
    };
  }, []);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    document.dispatchEvent(new Event("portfolio-route-top"));
  }, [pathname]);

  return null;
}
