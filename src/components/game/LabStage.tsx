"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef, useSyncExternalStore } from "react";

import type { LabGame } from "@/content/lab";
import type { ProductMatchEntry } from "@/types/content";

const sceneLoading = (
  <div className="product-lab-scene-loading" role="status">
    <span />
    Preparing the lab…
  </div>
);

const StackBuilderGame = dynamic(
  () => import("./StackBuilderGame").then((module) => module.StackBuilderGame),
  { ssr: false, loading: () => sceneLoading }
);
const ReleaseRunGame = dynamic(
  () => import("./ReleaseRunGame").then((module) => module.ReleaseRunGame),
  { ssr: false, loading: () => sceneLoading }
);
const ProductMatchGame = dynamic(
  () => import("./ProductMatchGame").then((module) => module.ProductMatchGame),
  { ssr: false, loading: () => sceneLoading }
);

const subscribeFullscreen = (onChange: () => void) => {
  document.addEventListener("fullscreenchange", onChange);
  return () => document.removeEventListener("fullscreenchange", onChange);
};
const subscribeNever = () => () => undefined;

export function LabStage({
  game,
  total,
  next,
  productMatches,
}: {
  game: LabGame;
  total: number;
  next: Pick<LabGame, "slug" | "title">;
  productMatches: readonly ProductMatchEntry[];
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const canFullscreen = useSyncExternalStore(
    subscribeNever,
    () => document.fullscreenEnabled,
    () => false
  );
  const isFullscreen = useSyncExternalStore(
    subscribeFullscreen,
    () => document.fullscreenElement !== null,
    () => false
  );

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void frameRef.current?.requestFullscreen();
  };

  return (
    <div className="lab-play-frame" ref={frameRef}>
      <header className="lab-play-bar">
        <Link className="lab-play-back" href="/lab">
          <span aria-hidden="true">←</span>
          <b>Product Lab</b>
        </Link>
        <div className="lab-play-title">
          <p>
            Experiment {game.index} / {String(total).padStart(2, "0")}
          </p>
          <h1>{game.title}</h1>
        </div>
        <div className="lab-play-actions">
          {canFullscreen ? (
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-pressed={isFullscreen}
            >
              {isFullscreen ? "Exit full screen" : "Full screen"}
            </button>
          ) : null}
          <Link href={`/lab/${next.slug}`} aria-label={`Next: ${next.title}`}>
            <b>Next</b>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </header>

      <div className="lab-play-stage">
        <div className="product-lab-stage" data-game={game.id}>
          {game.id === "stack" ? <StackBuilderGame /> : null}
          {game.id === "ship" ? <ReleaseRunGame /> : null}
          {game.id === "match" ? (
            <ProductMatchGame entries={productMatches} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
