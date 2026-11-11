"use client";

import { useRef } from "react";

import { Rule } from "@/components/ui/Rule";
import {
  prepareCount,
  restoreCount,
  reveal,
  REVEAL_SELECTOR,
} from "@/lib/reveal";

type Row = {
  readonly name: string;
  readonly attribute: string;
  readonly rule: string;
};

// Live specimen of the scroll story. Replay re-runs every move with the same API pages use.
export function RevealSpecimen({ story }: { story: readonly Row[] }) {
  const root = useRef<HTMLDivElement>(null);

  function replay() {
    const element = root.current;
    if (!element) return;
    const targets = Array.from(
      element.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
    );
    for (const target of targets) {
      restoreCount(target);
      delete target.dataset.revealed;
      if (target.hasAttribute("data-count")) prepareCount(target);
    }
    void element.offsetHeight;
    for (const target of targets) reveal(target);
  }

  const demo = (name: string) => {
    if (name === "Count") return <strong data-count>885</strong>;
    if (name === "Draw") {
      return (
        <span className="reveal-demo">
          <Rule />
        </span>
      );
    }
    if (name === "Fill") {
      return (
        <span className="reveal-demo">
          <i data-fill />
        </span>
      );
    }
    return (
      <span className="reveal-demo-text">
        {name === "Reveal" ? "Rises" : "In steps"}
      </span>
    );
  };

  return (
    <div className="reveal-specimen" ref={root}>
      <header>
        <div>
          <p>Scroll story</p>
          <h3>
            Reveal, Sequence, Count, Draw and Fill: one observer, shared tokens.
          </h3>
        </div>
        <button type="button" onClick={replay}>
          Replay
        </button>
      </header>
      <ul data-reveal="list">
        {story.map((row) => (
          <li key={row.name}>
            <strong>{row.name}</strong>
            <code>{row.attribute}</code>
            {demo(row.name)}
            <span>{row.rule}</span>
          </li>
        ))}
      </ul>
      <p className="reveal-specimen-note">
        With reduced motion, scripting off, or in print, everything is simply
        visible.
      </p>
    </div>
  );
}
