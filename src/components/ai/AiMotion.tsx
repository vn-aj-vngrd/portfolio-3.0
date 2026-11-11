"use client";

import { useEffect } from "react";

import { buildLoopFlow, buildSetupFlow, Flow } from "@/lib/ai/flow";

// Diagram motion (the /ai page and the home workflow diagram): one-shot draw-in and ambient particle flow that runs only while a diagram is visible.
const builders = { setup: buildSetupFlow, loop: buildLoopFlow } as const;
const ambientAfter = { setup: 3000, loop: 4200 } as const;

export function AiMotion() {
  useEffect(() => {
    const figures = document.querySelectorAll<HTMLElement>("[data-flow]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      for (const el of figures) el.dataset.drawn = "true";
      return;
    }

    const cleanups: (() => void)[] = [];

    for (const el of figures) {
      const kind = el.dataset.flow as keyof typeof builders;
      const build = builders[kind];
      const host = (kind === "loop" ? el.parentElement : el) ?? el;
      if (!build) continue;
      let flow: Flow | null = null;
      let visible = false;
      let drawn = false;
      let timer = 0;
      const sync = () => flow?.setPaused(!visible || document.hidden);
      const mount = () => {
        flow?.dispose();
        flow = new Flow(host);
        build(host, flow);
        sync();
      };
      const observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible && !drawn) {
            drawn = true;
            el.dataset.drawn = "true";
            timer = window.setTimeout(mount, ambientAfter[kind]);
          }
          sync();
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      let resizeTimer = 0;
      let lastWidth = el.clientWidth;
      const resize = new ResizeObserver(() => {
        if (el.clientWidth === lastWidth) return;
        lastWidth = el.clientWidth;
        window.clearTimeout(resizeTimer);
        if (flow) resizeTimer = window.setTimeout(mount, 200);
      });
      resize.observe(el);
      document.addEventListener("visibilitychange", sync);
      cleanups.push(() => {
        window.clearTimeout(timer);
        window.clearTimeout(resizeTimer);
        observer.disconnect();
        resize.disconnect();
        document.removeEventListener("visibilitychange", sync);
        flow?.dispose();
      });
    }
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
