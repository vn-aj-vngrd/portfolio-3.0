"use client";

import { useEffect, useLayoutEffect, useReducer, useRef } from "react";

import {
  factoryIdleCaption,
  factoryRunFrames,
  factoryStages,
} from "@/content/factory";
import { statusesAt } from "@/lib/ai/factory-run";
import { createFactoryFlow } from "@/lib/ai/flow";

type Run = "static" | "idle" | "playing" | "paused" | "held" | "ended";
type State = {
  run: Run;
  index: number;
  reduced: boolean;
  userDriven: boolean;
  epoch: number;
};
type Action =
  | { type: "mount"; reduced: boolean }
  | { type: "reduce" }
  | { type: "enter" }
  | { type: "resume" }
  | { type: "leave" }
  | { type: "toggle" }
  | { type: "replay" }
  | { type: "tick" };

const frames = factoryRunFrames;
const last = frames.length - 1;
const stageIds = factoryStages.map((stage) => stage.id);
const buildAt = frames.findIndex((f) => f.stage === "build");
const reworkAt = frames.findIndex((f) => f.id === "rework");

const isHalted = (run: Run) => run === "paused" || run === "held";

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "mount":
      return action.reduced
        ? { ...state, reduced: true }
        : { ...state, reduced: false, run: "idle", index: -1 };
    case "reduce":
      return { ...state, reduced: true, run: "static", index: last };
    case "enter":
      if (state.run === "idle")
        return { ...state, run: "playing", index: 0, epoch: state.epoch + 1 };
      return state.run === "held" ? { ...state, run: "playing" } : state;
    case "resume":
      return state.run === "held" ? { ...state, run: "playing" } : state;
    case "leave":
      return state.run === "playing" ? { ...state, run: "held" } : state;
    case "toggle":
      if (state.run === "playing" || state.run === "held")
        return { ...state, run: "paused", userDriven: false };
      if (state.run === "paused")
        return { ...state, run: "playing", userDriven: true };
      return {
        ...state,
        run: "playing",
        index: 0,
        userDriven: true,
        epoch: state.epoch + 1,
      };
    case "replay":
      return {
        ...state,
        run: "playing",
        index: 0,
        userDriven: true,
        epoch: state.epoch + 1,
      };
    case "tick": {
      const next = Math.min(state.index + 1, last);
      return next === last
        ? { ...state, run: "ended", index: next, userDriven: false }
        : { ...state, run: "playing", index: next };
    }
  }
}

function Icon({ kind }: { kind: "play" | "pause" | "replay" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {kind === "play" ? <path d="M5 3.5v9l7-4.5z" /> : null}
      {kind === "pause" ? <path d="M5.5 3.5v9M10.5 3.5v9" /> : null}
      {kind === "replay" ? <path d="M3 8a5 5 0 1 0 1.6-3.7M3 2.5v3h3" /> : null}
    </svg>
  );
}

export function FactoryRun({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, dispatch] = useReducer(reducer, {
    run: "static",
    index: last,
    reduced: false,
    userDriven: false,
    epoch: 0,
  });
  const { run, index, reduced, userDriven, epoch } = state;
  const flowRef = useRef<ReturnType<typeof createFactoryFlow>>(null);
  const runRef = useRef(run);
  useEffect(() => {
    runRef.current = run;
  }, [run]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    dispatch({ type: "mount", reduced: query.matches });
    const onChange = () => {
      if (query.matches) dispatch({ type: "reduce" });
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;
    const observer = new IntersectionObserver(
      ([entry]) => dispatch({ type: entry.isIntersecting ? "enter" : "leave" }),
      { threshold: 0.4 }
    );
    observer.observe(node);
    const onVisibility = () =>
      dispatch({ type: document.hidden ? "leave" : "resume" });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  useEffect(() => {
    if (run !== "playing") return;
    const timer = window.setTimeout(
      () => dispatch({ type: "tick" }),
      frames[index].ms
    );
    return () => window.clearTimeout(timer);
  }, [run, index]);

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;
    flowRef.current = createFactoryFlow(node, stageIds, frames);
    return () => {
      flowRef.current?.dispose();
      flowRef.current = null;
    };
  }, [reduced]);

  const display = run === "static" ? "static" : index;
  useEffect(() => {
    const flow = flowRef.current;
    if (!flow) return;
    if (display === "static" || display < 0) flow.hide();
    else flow.show(display, isHalted(runRef.current));
  }, [display, epoch]);
  useEffect(() => {
    flowRef.current?.setPaused(isHalted(run));
  }, [run]);
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const statuses = statusesAt(stageIds, frames, display);
    for (const li of node.querySelectorAll<HTMLElement>("[data-stage]")) {
      const entry = statuses[li.dataset.stage ?? ""];
      if (!entry) continue;
      li.dataset.status = entry.status;
      const text = li.querySelector(".factory-stage-state");
      if (text) text.textContent = entry.state;
    }
  }, [display]);

  const frame =
    typeof display === "number" && display >= 0 ? frames[display] : null;
  const caption =
    run === "static"
      ? frames[last].caption
      : (frame?.caption ?? factoryIdleCaption);
  const playing = run === "playing" || run === "held";
  const primary = playing
    ? "Pause"
    : run === "ended"
      ? "Play again"
      : run === "static"
        ? "Play run"
        : "Play";
  const step = String(Math.max(index, -1) + 1).padStart(2, "0");
  const progress = run === "static" ? 1 : (index + 1) / frames.length;

  return (
    <div
      ref={ref}
      className="factory-run"
      data-run={run}
      data-frame={run === "static" ? "static" : (frame?.id ?? "idle")}
      data-wrap={typeof display === "number" && display >= buildAt ? "1" : "0"}
      data-loop={typeof display === "number" && display >= reworkAt ? "1" : "0"}
    >
      {children}
      <p
        className="factory-run-caption"
        aria-live={userDriven ? "polite" : "off"}
      >
        <span key={caption}>{caption}</span>
      </p>
      <div
        className="factory-run-controls"
        role="group"
        aria-label="Factory animation"
      >
        <button type="button" onClick={() => dispatch({ type: "toggle" })}>
          <Icon kind={playing ? "pause" : "play"} />
          {primary}
        </button>
        {run !== "idle" && run !== "static" ? (
          <button type="button" onClick={() => dispatch({ type: "replay" })}>
            <Icon kind="replay" />
            Replay
          </button>
        ) : null}
        <span
          className="factory-run-step"
          aria-hidden={run === "playing" ? true : undefined}
        >
          {run === "static" ? "Complete" : `Step ${step} of ${frames.length}`}
        </span>
        <span className="factory-run-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
        </span>
      </div>
    </div>
  );
}
