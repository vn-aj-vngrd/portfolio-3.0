"use client";

// The tour's on-page mark: one spotlight that greys everything outside the current
// stop. It sits in document coordinates, so the page scrolls it natively and it never
// trails the content.
const SPOT_PAD = 14;

export type Stage = {
  /** Frame `el`; `instant` skips the morph from the previous stop. */
  highlight: (el: HTMLElement, instant?: boolean) => void;
  /** Re-measure the framed element after a layout change. */
  refresh: () => void;
  setRate: (rate: number) => void;
  destroy: () => void;
};

export function createStage(): Stage {
  const spot = document.createElement("div");
  spot.className = "tour-spot";
  spot.setAttribute("aria-hidden", "true");
  spot.dataset.instant = "";

  document.body.append(spot);

  let framed: HTMLElement | null = null;
  let placed = false;

  const release = (node: HTMLElement) => {
    // Re-enable transitions on the next frame so the first placement snaps.
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => delete node.dataset.instant);
    });
  };

  function frame(el: HTMLElement, instant: boolean) {
    const rect = el.getBoundingClientRect();
    const style = spot.style;
    if (instant || !placed) spot.dataset.instant = "";
    style.left = `${Math.round(rect.left + window.scrollX - SPOT_PAD)}px`;
    style.top = `${Math.round(rect.top + window.scrollY - SPOT_PAD)}px`;
    style.width = `${Math.round(rect.width + SPOT_PAD * 2)}px`;
    style.height = `${Math.round(rect.height + SPOT_PAD * 2)}px`;
    if (instant || !placed) release(spot);
    placed = true;
  }

  const stage: Stage = {
    highlight(el, instant = false) {
      framed = el;
      frame(el, instant);
    },
    refresh() {
      if (framed?.isConnected) frame(framed, true);
    },
    setRate(rate) {
      document.documentElement.style.setProperty("--tour-rate", String(rate));
    },
    destroy() {
      document.documentElement.style.removeProperty("--tour-rate");
      spot.remove();
      framed = null;
    },
  };
  return stage;
}
