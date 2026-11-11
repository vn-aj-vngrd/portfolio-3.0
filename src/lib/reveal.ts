// The scroll-story API, shared by ScrollReveal and the guided tour.
// data-reveal | data-reveal="list" (Reveal, Sequence), data-count (Count),
// data-draw (Draw), data-fill (Fill). Every one just waits for data-revealed;
// CSS owns Reveal/Draw/Fill, and Count is the only JS-driven motion (below).
export const REVEAL_SELECTOR =
  "[data-reveal],[data-count],[data-draw],[data-fill]";

type Counter = {
  final: string;
  token: string;
  decimals: number;
  grouped: boolean;
  view: HTMLElement;
  frame: number;
};

const NUMBER = /\d[\d,]*(?:\.\d+)?/u;
const counters = new WeakMap<HTMLElement, Counter>();

function render(counter: Counter, value: number) {
  const text = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: counter.decimals,
    maximumFractionDigits: counter.decimals,
    useGrouping: counter.grouped,
  }).format(value);
  return counter.final.replace(counter.token, text);
}

// The server text is the final value. Only the first plain number in a leaf element counts.
export function prepareCount(element: HTMLElement) {
  if (counters.has(element) || element.children.length) return;
  const final = element.textContent ?? "";
  const token = final.match(NUMBER)?.[0];
  if (!token || /^0\d/u.test(token)) return;
  const view = document.createElement("span");
  view.setAttribute("aria-hidden", "true");
  const counter: Counter = {
    final,
    token,
    decimals: token.split(".")[1]?.length ?? 0,
    grouped: token.includes(","),
    view,
    frame: 0,
  };
  view.textContent = render(counter, 0);
  const label = document.createElement("span");
  label.className = "sr-only";
  label.textContent = final;
  element.replaceChildren(view, label);
  counters.set(element, counter);
}

export function restoreCount(element: HTMLElement) {
  const counter = counters.get(element);
  if (!counter) return;
  cancelAnimationFrame(counter.frame);
  element.textContent = counter.final;
  counters.delete(element);
}

function runCount(element: HTMLElement, instant: boolean) {
  const counter = counters.get(element);
  if (!counter) return;
  if (instant) return restoreCount(element);
  const target = parseFloat(counter.token.replace(/,/gu, ""));
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--motion-count")
    .trim();
  const duration = (parseFloat(raw) || 0.9) * (raw.endsWith("ms") ? 1 : 1000);
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    if (t >= 1) return restoreCount(element);
    counter.view.textContent = render(
      counter,
      target * (1 - Math.pow(1 - t, 3))
    );
    counter.frame = requestAnimationFrame(tick);
  };
  counter.frame = requestAnimationFrame(tick);
}

export function reveal(element: HTMLElement, instant = false) {
  if (element.dataset.revealed) return;
  element.dataset.revealed = "true";
  if (element.hasAttribute("data-count")) runCount(element, instant);
}
