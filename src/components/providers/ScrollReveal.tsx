"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import {
  prepareCount,
  restoreCount,
  reveal,
  REVEAL_SELECTOR,
} from "@/lib/reveal";

// The one observer behind the scroll story (see DESIGN.md, Motion): it only sets
// data-revealed once per element; CSS owns the look and src/lib/reveal.ts owns Count.
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
    ).filter((element) => !element.dataset.revealed);
    if (!elements.length) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) {
      for (const element of elements) reveal(element, true);
      return;
    }

    for (const element of elements) {
      if (element.hasAttribute("data-count")) prepareCount(element);
    }

    const pending = new Set(elements);
    const show = (element: HTMLElement, instant = false) => {
      pending.delete(element);
      observer.unobserve(element);
      reveal(element, instant);
    };

    // Anything scrolled past without being seen (anchor jumps, fast scrolls,
    // back/forward restoration) must never stay hidden.
    const revealAbove = () => {
      for (const element of pending) {
        if (element.getBoundingClientRect().top < 0) show(element, true);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) show(entry.target as HTMLElement);
        }
        revealAbove();
      },
      { rootMargin: "0px 0px -8%", threshold: 0 }
    );

    for (const element of elements) observer.observe(element);

    let frame = 0;
    const onScroll = () => {
      if (frame || !pending.size) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        revealAbove();
      });
    };
    const showAll = () => {
      for (const element of [...pending]) show(element, true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pageshow", revealAbove);
    window.addEventListener("beforeprint", showAll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pageshow", revealAbove);
      window.removeEventListener("beforeprint", showAll);
      observer.disconnect();
      for (const element of elements) restoreCount(element);
    };
  }, [pathname]);

  return null;
}
