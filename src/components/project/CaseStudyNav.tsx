"use client";

import { useEffect, useRef, useState } from "react";

export type CaseStudySection = { id: string; label: string };

// A quiet sticky bar: where you are, where you can jump, and how much is left.
export function CaseStudyNav({
  sections,
  minutes,
}: {
  sections: readonly CaseStudySection[];
  minutes: number;
}) {
  const [active, setActive] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = main.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      setProgress(
        scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0
      );
      let current: string | null = null;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) {
          current = section.id;
        }
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sections]);

  // Keep the active link visible in the horizontal list without moving the page.
  useEffect(() => {
    const list = listRef.current;
    const link = active
      ? list?.querySelector<HTMLElement>(`[data-section="${active}"]`)
      : null;
    if (!list || !link) return;
    const left = link.offsetLeft - list.clientWidth / 2 + link.clientWidth / 2;
    list.scrollTo({ left, behavior: "auto" });
  }, [active]);

  const jump = (event: React.MouseEvent, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    const bar = document.querySelector<HTMLElement>(".case-nav");
    const offset = (bar?.offsetHeight ?? 0) + 24;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - offset,
      behavior: reduced ? "auto" : "smooth",
    });
    history.replaceState(null, "", `#${id}`);
  };

  const left = Math.max(0, Math.ceil(minutes * (1 - progress)));

  return (
    <nav className="case-nav" aria-label="On this page">
      <ul ref={listRef}>
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              data-section={section.id}
              aria-current={active === section.id ? "location" : undefined}
              onClick={(event) => jump(event, section.id)}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="case-nav-left" aria-hidden="true">
        {progress > 0.97 ? "Finished" : `${left} min left`}
      </p>
      <span
        className="case-nav-progress"
        aria-hidden="true"
        style={{ transform: `scaleX(${progress})` }}
      />
    </nav>
  );
}
