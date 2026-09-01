"use client";

import dynamic from "next/dynamic";
import { useCallback, useRef, useState } from "react";

import type {
  ReleaseControl,
  ReleaseRunSceneHandle,
} from "./ReleaseRunScene";

const ReleaseRunScene = dynamic(
  () => import("./ReleaseRunScene").then((module) => module.ReleaseRunScene),
  {
    ssr: false,
    loading: () => (
      <div className="product-lab-scene-loading" role="status">
        <span />
        Preparing the lab…
      </div>
    ),
  },
);

const stages = ["Plan", "Build", "Test", "Ship"] as const;

export function ReleaseRunGame() {
  const sceneRef = useRef<ReleaseRunSceneHandle>(null);
  const [progress, setProgress] = useState(0);
  const [runKey, setRunKey] = useState(0);
  const [ready, setReady] = useState(false);

  const reset = () => {
    setProgress(0);
    setReady(false);
    setRunKey((current) => current + 1);
  };
  const setControl = (action: ReleaseControl, pressed: boolean) => {
    sceneRef.current?.setControl(action, pressed);
  };
  const handleProgress = useCallback((nextProgress: number) => {
    setProgress(nextProgress);
  }, []);
  const handleReady = useCallback(() => setReady(true), []);

  return (
    <>
      <div className="product-lab-visual">
        <ReleaseRunScene
          ref={sceneRef}
          key={runKey}
          onProgress={handleProgress}
          onReady={handleReady}
        />
        <span className="product-lab-coordinate" aria-hidden="true">CEB · 10.3157° N / 123.8854° E</span>
      </div>
      <div className="product-lab-panel">
        <div className="lab-game lab-ship-game" data-ready={ready}>
          <div className="release-run-hud">
            <p>First-person product run</p>
            <h2>Release Run</h2>
            <span>Move through the corridor. Aim at each active signal and activate it in order.</span>
          </div>

          <ol className="release-run-progress" aria-label="Release Run progress" aria-live="polite">
            {stages.map((label, index) => (
              <li key={label} data-state={index < progress ? "complete" : index === progress ? "active" : "waiting"}>
                <span>{String(index + 1).padStart(2, "0")}</span>{label}
              </li>
            ))}
          </ol>

          <div className="release-run-help">
            <span><kbd>W A S D</kbd> Move</span>
            <span><kbd>Mouse</kbd> Aim</span>
            <span><kbd>Click / Space</kbd> Activate</span>
            <span><kbd>Esc</kbd> Release cursor</span>
          </div>

          <div className="release-run-mobile-controls" aria-label="Release Run touch controls">
            <div className="release-run-move-pad">
              <button type="button" aria-label="Move forward" onPointerDown={() => setControl("forward", true)} onPointerUp={() => setControl("forward", false)} onPointerCancel={() => setControl("forward", false)}>↑</button>
              <button type="button" aria-label="Move left" onPointerDown={() => setControl("left", true)} onPointerUp={() => setControl("left", false)} onPointerCancel={() => setControl("left", false)}>←</button>
              <button type="button" aria-label="Move backward" onPointerDown={() => setControl("back", true)} onPointerUp={() => setControl("back", false)} onPointerCancel={() => setControl("back", false)}>↓</button>
              <button type="button" aria-label="Move right" onPointerDown={() => setControl("right", true)} onPointerUp={() => setControl("right", false)} onPointerCancel={() => setControl("right", false)}>→</button>
            </div>
            <div className="release-run-action-pad">
              <div>
                <button type="button" aria-label="Turn left" onPointerDown={() => setControl("turnLeft", true)} onPointerUp={() => setControl("turnLeft", false)} onPointerCancel={() => setControl("turnLeft", false)}>↶</button>
                <button type="button" aria-label="Turn right" onPointerDown={() => setControl("turnRight", true)} onPointerUp={() => setControl("turnRight", false)} onPointerCancel={() => setControl("turnRight", false)}>↷</button>
              </div>
              <button className="release-run-fire" type="button" onClick={() => sceneRef.current?.activate()}>Activate</button>
            </div>
          </div>

          <button className="release-run-reset" type="button" onClick={reset}>Restart run</button>

          {progress === stages.length ? (
            <div className="release-run-complete" role="status">
              <span>04 / 04 · Release complete</span>
              <h3>Shipped.</h3>
              <p>You carried one idea through planning, implementation, testing, and release.</p>
              <button type="button" onClick={reset}>Run it again</button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
