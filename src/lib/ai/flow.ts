// Particle flow for the /ai diagrams. Dots are 2px elements moved with
// transform and opacity only (Web Animations); no dependencies, no glow.

export type Pt = { x: number; y: number };

const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;

export function pathLength(path: readonly Pt[]) {
  const cum = [0];
  for (let i = 1; i < path.length; i++)
    cum.push(
      cum[i - 1] +
        Math.hypot(path[i].x - path[i - 1].x, path[i].y - path[i - 1].y)
    );
  return cum;
}

function pointAt(path: readonly Pt[], cum: number[], d: number): Pt {
  const total = cum[cum.length - 1];
  const dist = Math.max(0, Math.min(total, d));
  let i = 1;
  while (i < cum.length - 1 && cum[i] < dist) i++;
  const span = cum[i] - cum[i - 1] || 1;
  const k = (dist - cum[i - 1]) / span;
  return {
    x: path[i - 1].x + (path[i].x - path[i - 1].x) * k,
    y: path[i - 1].y + (path[i].y - path[i - 1].y) * k,
  };
}

type FrameOptions = {
  from?: number;
  to?: number;
  peak?: number;
  fadeIn?: boolean;
  fadeOut?: boolean;
};

// Eased (in and out at the nodes) positions sampled along the polyline.
function particleFrames(path: readonly Pt[], o: FrameOptions = {}): Keyframe[] {
  const { from = 0, to = 1, peak = 1, fadeIn = true, fadeOut = true } = o;
  const cum = pathLength(path);
  const total = cum[cum.length - 1];
  const steps = 24;
  const out: Keyframe[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const p = pointAt(path, cum, (from + (to - from) * easeInOut(t)) * total);
    const a =
      fadeIn && t < 0.12 ? t / 0.12 : fadeOut && t > 0.88 ? (1 - t) / 0.12 : 1;
    out.push({
      offset: t,
      transform: `translate3d(${p.x.toFixed(2)}px,${p.y.toFixed(2)}px,0)`,
      opacity: a * peak,
    });
  }
  return out;
}

type Held = { dot: HTMLElement; anim: Animation; at: number };

export class Flow {
  readonly layer: HTMLElement;
  private anims: Animation[] = [];
  private held: Held[] = [];
  private paused = false;

  constructor(host: HTMLElement) {
    this.layer = document.createElement("span");
    this.layer.className = "flow-layer";
    this.layer.setAttribute("aria-hidden", "true");
    host.appendChild(this.layer);
  }

  private dot(live: boolean) {
    const dot = document.createElement("i");
    dot.className = "flow-dot";
    if (live) dot.dataset.live = "";
    this.layer.appendChild(dot);
    return dot;
  }

  private track(anim: Animation) {
    if (this.paused) anim.pause();
    this.anims.push(anim);
    return anim;
  }

  /** Static decoration inside the layer (dotted link, ring node). */
  decorate(el: HTMLElement) {
    this.layer.appendChild(el);
  }

  stream(
    path: readonly Pt[],
    o: {
      count: number;
      period: number;
      live?: boolean;
      peak?: number;
      iterations?: number;
      delay?: number;
    }
  ) {
    if (path.length < 2) return;
    const dur = o.period * 0.7;
    const frames = particleFrames(path, { peak: o.peak ?? 0.9 });
    for (let i = 0; i < o.count; i++) {
      const dot = this.dot(o.live ?? false);
      this.track(
        dot.animate(frames, {
          duration: dur,
          delay: (o.delay ?? 0) + (i * o.period) / o.count,
          endDelay: o.period - dur,
          iterations: o.iterations ?? Infinity,
          easing: "linear",
        })
      );
    }
  }

  /** Particles gather near the end of the path and wait. */
  hold(path: readonly Pt[], count: number) {
    if (path.length < 2) return;
    const total = pathLength(path).at(-1) ?? 1;
    for (let i = 0; i < count; i++) {
      const at = Math.max(0, 1 - (7 + i * 6) / total);
      const dot = this.dot(true);
      const anim = this.track(
        dot.animate(
          particleFrames(path, { to: at, fadeOut: false, peak: 0.9 }),
          {
            duration: 800,
            delay: i * 140,
            fill: "forwards",
            easing: "linear",
          }
        )
      );
      this.held.push({ dot, anim, at });
    }
  }

  /** Release gathered particles through the end of the path. */
  release(path: readonly Pt[]) {
    const held = this.held;
    this.held = [];
    held.forEach(({ dot, anim, at }, i) => {
      anim.cancel();
      this.anims = this.anims.filter((a) => a !== anim);
      this.track(
        dot.animate(
          particleFrames(path, { from: at, fadeIn: false, peak: 0.9 }),
          {
            duration: 600,
            delay: i * 90,
            easing: "linear",
          }
        )
      );
    });
  }

  clear() {
    for (const a of this.anims) a.cancel();
    this.anims = [];
    this.held = [];
    this.layer.replaceChildren();
  }

  setPaused(paused: boolean) {
    this.paused = paused;
    for (const a of this.anims) {
      if (a.playState === "finished" || a.playState === "idle") continue;
      if (paused) a.pause();
      else a.play();
    }
  }

  dispose() {
    this.clear();
    this.layer.remove();
  }
}

type Rel = (el: Element) => {
  left: number;
  right: number;
  top: number;
  bottom: number;
  w: number;
  h: number;
  mx: number;
  my: number;
};

export function relativeTo(host: HTMLElement): Rel {
  const base = host.getBoundingClientRect();
  return (el) => {
    const r = el.getBoundingClientRect();
    const left = r.left - base.left;
    const top = r.top - base.top;
    return {
      left,
      top,
      right: left + r.width,
      bottom: top + r.height,
      w: r.width,
      h: r.height,
      mx: left + r.width / 2,
      my: top + r.height / 2,
    };
  };
}

type R = ReturnType<Rel>;

/** One hop between two boxes: sideways when b sits to the right, else down. */
function hop(a: R, b: R, inset = 4): Pt[] {
  if (b.left >= a.right - 1)
    return [
      { x: a.right + inset, y: a.my },
      { x: b.left - inset, y: a.my },
    ];
  return [
    { x: a.mx, y: a.bottom + inset },
    { x: a.mx, y: b.top - inset },
  ];
}

export function buildSetupFlow(host: HTMLElement, flow: Flow) {
  const rel = relativeTo(host);
  const q = (n: string) =>
    host.querySelector<HTMLElement>(`[data-node="${n}"]`);
  const [voice, me, herdr, out] = ["voice", "me", "herdr", "out"].map(q);
  if (!voice || !me || !herdr || !out) return;
  const nodes = [voice, me, herdr, out].map(rel);
  const stream = (path: Pt[], delay: number, count = 2) =>
    flow.stream(path, { count, period: 4200, peak: 0.55, delay });
  for (let i = 0; i < 3; i++) stream(hop(nodes[i], nodes[i + 1]), i * 700);

  const ret = host.querySelector<HTMLElement>(".setup-return");
  if (ret && getComputedStyle(ret).position === "relative") {
    const r = rel(ret);
    const y = r.bottom - 1;
    stream(
      [
        { x: nodes[3].mx, y: r.top + 2 },
        { x: nodes[3].mx, y },
        { x: nodes[1].mx, y },
        { x: nodes[1].mx, y: r.top + 6 },
      ],
      2100
    );
  }

  // Opus plans out, Sonnet builds back, inside the Claude Code container.
  const items = host.querySelectorAll<HTMLElement>(".setup-models li");
  if (items.length < 2) return;
  const [s0, s1] = [
    items[0].querySelector("strong"),
    items[1].querySelector("strong"),
  ];
  if (!s0 || !s1) return;
  const base = host.getBoundingClientRect();
  const ink = (el: Element) => {
    const range = document.createRange();
    range.selectNodeContents(el);
    const r = range.getBoundingClientRect();
    const left = r.left - base.left;
    const top = r.top - base.top;
    return {
      left,
      top,
      right: left + r.width,
      bottom: top + r.height,
      w: r.width,
      h: r.height,
      mx: left + r.width / 2,
      my: top + r.height / 2,
    };
  };
  const [a, b] = [ink(s0), ink(s1)];
  const side = b.left > a.right;
  const link = (p: Pt, q2: Pt) => {
    const el = document.createElement("span");
    el.className = "flow-link";
    el.dataset.axis = side ? "x" : "y";
    el.style.transform = `translate3d(${Math.min(p.x, q2.x)}px,${Math.min(p.y, q2.y)}px,0)`;
    if (side) el.style.width = `${Math.abs(q2.x - p.x)}px`;
    else el.style.height = `${Math.abs(q2.y - p.y)}px`;
    flow.decorate(el);
    for (const pt of [p, q2]) {
      const n = document.createElement("span");
      n.className = "flow-node";
      n.style.transform = `translate3d(${pt.x}px,${pt.y}px,0)`;
      flow.decorate(n);
    }
  };
  let p: Pt;
  let q2: Pt;
  let off: Pt;
  if (side) {
    p = { x: a.right + 12, y: a.my };
    q2 = { x: b.left - 8, y: a.my };
    off = { x: 0, y: 3 };
  } else {
    const ul = items[0].parentElement ? rel(items[0].parentElement) : a;
    p = { x: ul.right + 9, y: a.my };
    q2 = { x: ul.right + 9, y: b.my };
    off = { x: 3, y: 0 };
  }
  link(p, q2);
  const fwd = [
    { x: p.x - off.x, y: p.y - off.y },
    { x: q2.x - off.x, y: q2.y - off.y },
  ];
  const back = [
    { x: q2.x + off.x, y: q2.y + off.y },
    { x: p.x + off.x, y: p.y + off.y },
  ];
  flow.stream(fwd, { count: 1, period: 5200, peak: 0.55, delay: 400 });
  flow.stream(back, { count: 1, period: 5200, peak: 0.55, delay: 3000 });
}

export function buildLoopFlow(host: HTMLElement, flow: Flow) {
  const rel = relativeTo(host);
  const icons = Array.from(host.querySelectorAll(".workflow-symbol svg")).map(
    rel
  );
  for (let i = 0; i < icons.length - 1; i++) {
    const a = icons[i];
    const b = icons[i + 1];
    const path =
      b.left >= a.right - 1
        ? [
            { x: a.right + 12, y: a.my },
            { x: b.left - 6, y: a.my },
          ]
        : [
            { x: a.mx, y: a.bottom + 12 },
            { x: a.mx, y: b.top - 6 },
          ];
    flow.stream(path, { count: 2, period: 4200, peak: 0.55, delay: i * 600 });
  }
}

/** The factory ticket: travels card to card, particles stream with it. */
type Frame = { id: string; stage: string; mode: string };

export function createFactoryFlow(
  root: HTMLElement,
  stageIds: readonly string[],
  frames: readonly Frame[]
) {
  const host = root.querySelector<HTMLElement>(".factory");
  const ticket = host?.querySelector<HTMLElement>(".factory-ticket");
  if (!host || !ticket) return null;
  const flow = new Flow(host);
  let anchors: Record<string, Pt> = {};
  let current: string | null = null;
  let ticketAnim: Animation | null = null;
  let paused = false;
  let wide = false;

  const measure = () => {
    const rel = relativeTo(host);
    const rem =
      parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const tk = 0.35 * rem + 3;
    anchors = {};
    for (const id of stageIds) {
      const node = host.querySelector(`[data-stage="${id}"] .factory-node`);
      if (!node) continue;
      const r = rel(node);
      anchors[id] = { x: r.left + tk, y: r.top + tk };
    }
    const slot = host.querySelector(".factory-wrap-slot");
    wide = !!slot && getComputedStyle(slot).display !== "none";
  };

  const rest = (id: string) => {
    const p = anchors[id];
    if (p) ticket.style.transform = `translate3d(${p.x - 3}px,${p.y - 3}px,0)`;
  };

  const seg = (cls: string, part: string) => {
    const el = host.querySelector(`.${cls} .factory-route-${part}`);
    return el ? relativeTo(host)(el) : null;
  };

  const route = (a: string, b: string): Pt[] => {
    const A = anchors[a];
    const B = anchors[b];
    if (!A || !B) return [];
    if (a === "gate" && b === "build" && wide) {
      const y = seg("factory-wrap", "b")?.top ?? (A.y + B.y) / 2;
      return [A, { x: A.x, y }, { x: B.x, y }, B];
    }
    if (a === "review" && b === "build") {
      if (wide) {
        const y = seg("factory-loop", "b")?.top ?? A.y + 40;
        return [A, { x: A.x, y }, { x: B.x, y }, B];
      }
      const br = host.querySelector(`.factory-bracket[data-part="review"]`);
      const x = br ? relativeTo(host)(br).right - 0.5 : A.x + 200;
      return [A, { x, y: A.y }, { x, y: B.y }, B];
    }
    if (a === "pr" && b === "merge" && wide) {
      const node = host.querySelector(`[data-stage="merge"] .factory-node`);
      const x = node ? relativeTo(host)(node).left - 10 : (A.x + B.x) / 2;
      return [A, { x, y: A.y }, { x, y: B.y }, B];
    }
    const mid = { x: B.x, y: A.y };
    return mid.x === A.x || mid.y === B.y ? [A, B] : [A, mid, B];
  };

  // Time the wrap and loop connector segments to the ticket passing them.
  const timeRoute = (cls: "wrap" | "loop", path: Pt[], dur: number) => {
    if (!wide || path.length < 4) return;
    const cum = pathLength(path);
    const total = cum[cum.length - 1] || 1;
    const a = seg(`factory-${cls}`, "a");
    const b = seg(`factory-${cls}`, "b");
    const c = seg(`factory-${cls}`, "c");
    if (!a || !b || !c) return;
    const A = path[0];
    const spans = [
      [a.top - A.y, a.bottom - A.y],
      [cum[1], cum[2]],
      [
        cum[2],
        cum[2] + (cls === "wrap" ? c.bottom - path[2].y : path[2].y - c.top),
      ],
    ];
    const key = cls === "wrap" ? "w" : "l";
    spans.forEach(([s, e], i) => {
      root.style.setProperty(
        `--${key}${i + 1}-d`,
        `${Math.max(0, (s / total) * dur)}ms`
      );
      root.style.setProperty(
        `--${key}${i + 1}-t`,
        `${Math.max(60, ((e - s) / total) * dur)}ms`
      );
    });
  };

  const ro = new ResizeObserver(() => {
    measure();
    if (current) rest(current);
  });
  ro.observe(host);
  measure();

  const place = (id: string) => {
    ticketAnim?.cancel();
    ticketAnim = null;
    current = id;
    rest(id);
  };

  const api = {
    hide() {
      flow.clear();
      ticketAnim?.cancel();
      ticketAnim = null;
      current = null;
      ticket.dataset.on = "0";
      ticket.dataset.hold = "0";
    },
    show(i: number, isPaused: boolean) {
      paused = isPaused;
      measure();
      const f = frames[i];
      const prev = i > 0 ? frames[i - 1] : null;
      if (prev && prev.stage === f.stage) {
        // Approved: the gathered particles release into the next stage.
        ticket.dataset.hold = "0";
        if (prev.mode === "waiting") {
          const idx = stageIds.indexOf(f.stage);
          flow.release(route(stageIds[idx - 1], f.stage));
          flow.setPaused(paused);
        }
        return;
      }
      flow.clear();
      ticket.dataset.hold = f.mode === "waiting" ? "1" : "0";
      ticket.dataset.on = "1";
      if (!prev) {
        place(f.stage);
        return;
      }
      const path = route(prev.stage, f.stage);
      if (path.length < 2) return place(f.stage);
      const cum = pathLength(path);
      const total = cum[cum.length - 1] || 1;
      const dur = path.length > 2 ? 900 : 500;
      if (f.stage === "build" && prev.stage === "gate")
        timeRoute("wrap", path, dur);
      if (f.stage === "build" && prev.stage === "review")
        timeRoute("loop", path, dur);
      ticketAnim?.cancel();
      current = f.stage;
      rest(f.stage);
      ticketAnim = ticket.animate(
        path.map((p, k) => ({
          offset: cum[k] / total,
          transform: `translate3d(${p.x - 3}px,${p.y - 3}px,0)`,
        })),
        { duration: dur, easing: "linear" }
      );
      if (paused) ticketAnim.pause();
      const small = total < 60;
      if (f.mode === "waiting") flow.hold(path, 3);
      else
        flow.stream(path, {
          count: small ? 2 : 4,
          period: small ? 1500 : 2000,
          live: true,
          iterations: f.id === "rework" ? 1 : Infinity,
          delay: 200,
        });
      flow.setPaused(paused);
    },
    setPaused(p: boolean) {
      paused = p;
      flow.setPaused(p);
      if (ticketAnim && ticketAnim.playState !== "finished") {
        if (p) ticketAnim.pause();
        else ticketAnim.play();
      }
    },
    dispose() {
      ro.disconnect();
      flow.dispose();
      ticketAnim?.cancel();
      ticket.dataset.on = "0";
    },
  };
  return api;
}
