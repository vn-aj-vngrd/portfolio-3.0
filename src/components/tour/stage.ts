"use client";

// The tour's on-page marks: one spotlight that greys everything outside the current
// stop, and one pointer that settles on it. Both are single elements outside React.
// The spotlight sits in document coordinates, so the page scrolls it natively and it
// never trails the content; the pointer sits in viewport coordinates and only moves
// once the page has stopped.
const SPOT_PAD = 14;
const POINTER_INSET = 20;
const POINTER_ANCHOR = "h1, h2, h3, [data-tour-point]";

export type Stage = {
  /** Frame `el`; `instant` skips the morph from the previous stop. */
  highlight: (el: HTMLElement, instant?: boolean) => void;
  /** Re-measure the framed element after a layout change. */
  refresh: () => void;
  /** Move the pointer onto `el` and press. */
  point: (el: HTMLElement, instant?: boolean) => void;
  setRate: (rate: number) => void;
  destroy: () => void;
};

const POINTER_SVG = `<svg viewBox="0 0 20 24" width="20" height="24" aria-hidden="true" focusable="false"><path d="M2 1.5v17.2l4.6-4.1 3 6.9 3-1.3-3-6.8h6.3z" /></svg>`;

export function createStage(): Stage {
  const spot = document.createElement("div");
  spot.className = "tour-spot";
  spot.setAttribute("aria-hidden", "true");
  spot.dataset.instant = "";

  const pointer = document.createElement("div");
  pointer.className = "tour-pointer";
  pointer.setAttribute("aria-hidden", "true");
  pointer.dataset.instant = "";
  pointer.innerHTML = `<span class="tour-pointer-ring"></span>${POINTER_SVG}`;

  document.body.append(spot, pointer);

  let framed: HTMLElement | null = null;
  let placed = false;
  let pointerPlaced = false;
  let pressTimer = 0;

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

  function target(el: HTMLElement) {
    const anchor = el.querySelector<HTMLElement>(POINTER_ANCHOR) ?? el;
    const rect = anchor.getBoundingClientRect();
    const player = document.querySelector<HTMLElement>(".tour-player");
    const floor = player
      ? player.getBoundingClientRect().top - POINTER_INSET
      : window.innerHeight - POINTER_INSET;
    const x = Math.min(
      Math.max(rect.left + Math.min(rect.width * 0.55, 220), POINTER_INSET),
      window.innerWidth - POINTER_INSET
    );
    const y = Math.min(
      Math.max(rect.top + Math.min(rect.height / 2, 30), POINTER_INSET + 48),
      floor
    );
    return { x, y };
  }

  const stage: Stage = {
    highlight(el, instant = false) {
      framed = el;
      frame(el, instant);
    },
    refresh() {
      if (framed?.isConnected) frame(framed, true);
    },
    point(el, instant = false) {
      const { x, y } = target(el);
      if (instant || !pointerPlaced) {
        pointer.dataset.instant = "";
        if (!pointerPlaced) {
          // First appearance: drift in from the lower right instead of the corner.
          pointer.style.transform = `translate3d(${window.innerWidth * 0.72}px, ${window.innerHeight * 0.72}px, 0)`;
          void pointer.offsetWidth;
          delete pointer.dataset.instant;
        }
      }
      pointer.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
      if (instant) release(pointer);
      pointerPlaced = true;

      window.clearTimeout(pressTimer);
      delete pointer.dataset.press;
      pressTimer = window.setTimeout(
        () => {
          pointer.dataset.press = "";
        },
        instant ? 0 : 520
      );
    },
    setRate(rate) {
      document.documentElement.style.setProperty("--tour-rate", String(rate));
    },
    destroy() {
      window.clearTimeout(pressTimer);
      document.documentElement.style.removeProperty("--tour-rate");
      spot.remove();
      pointer.remove();
      framed = null;
    },
  };
  return stage;
}
