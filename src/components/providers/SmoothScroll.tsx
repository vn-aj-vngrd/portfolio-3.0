"use client";

import type Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

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
        prevent: (node) => Boolean(node.closest("[data-lenis-prevent]")),
      });
    };

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href*='#']");
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;

      const id = decodeURIComponent(url.hash.slice(1));
      const scrollTarget = id ? document.getElementById(id) : document.documentElement;
      if (!scrollTarget) return;

      event.preventDefault();
      window.history.replaceState(null, "", url.hash || window.location.pathname);
      if (lenis) {
        lenis.scrollTo(scrollTarget, { lerp: 0.08 });
      } else {
        scrollTarget.scrollIntoView({
          behavior: reducedMotion.matches ? "auto" : "smooth",
        });
      }
    };

    const handleScrollRequest = (event: Event) => {
      const detail = (event as CustomEvent<{ id?: string; immediate?: boolean }>).detail;
      if (!detail?.id) return;
      const target = document.getElementById(detail.id);
      if (!target) return;

      if (lenis) {
        if (detail.immediate) lenis.resize();
        lenis.scrollTo(
          target,
          detail.immediate ? { immediate: true, force: true } : { lerp: 0.08 },
        );
      } else {
        target.scrollIntoView({
          behavior: detail.immediate || reducedMotion.matches ? "auto" : "smooth",
        });
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

  useLayoutEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;

    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (!hash) {
      document.dispatchEvent(new Event("portfolio-route-top"));
      return;
    }

    document.dispatchEvent(
      new CustomEvent("portfolio-scroll-to", {
        detail: { id: hash, immediate: true },
      }),
    );
  }, [pathname]);

  return null;
}
