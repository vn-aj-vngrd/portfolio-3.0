"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

import {
  isPlatformModifierPressed,
  usePlatformModifier,
} from "@/hooks/usePlatformModifier";

const sceneLoading = (
  <div className="product-lab-scene-loading" role="status">
    <span />
    Preparing the lab…
  </div>
);

const ProductLabScene = dynamic(
  () => import("./ProductLabScene").then((module) => module.ProductLabScene),
  { ssr: false, loading: () => sceneLoading },
);
const StackBuilderGame = dynamic(
  () => import("./StackBuilderGame").then((module) => module.StackBuilderGame),
  { ssr: false, loading: () => sceneLoading },
);
const ReleaseRunGame = dynamic(
  () => import("./ReleaseRunGame").then((module) => module.ReleaseRunGame),
  { ssr: false, loading: () => sceneLoading },
);
const ProductMatchGame = dynamic(
  () => import("./ProductMatchGame").then((module) => module.ProductMatchGame),
  { ssr: false, loading: () => sceneLoading },
);

type LabGame = "stack" | "ship" | "match";

export type ProductLabHandle = {
  open: () => void;
};

type ProductLabProps = {
  ref?: React.Ref<ProductLabHandle>;
};

const games: readonly {
  id: LabGame;
  index: string;
  title: string;
  duration: string;
  description: string;
}[] = [
  { id: "stack", index: "01", title: "Stack Builder", duration: "45 sec", description: "Time five moving 3D layers and build a stable product stack." },
  { id: "ship", index: "02", title: "Release Run", duration: "45 sec", description: "Navigate a first-person build corridor and activate every release stage." },
  { id: "match", index: "03", title: "Product Match", duration: "55 sec", description: "Match real products to the problems they were designed to solve." },
];

export function ProductLab({ ref }: ProductLabProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [game, setGame] = useState<LabGame | null>(null);
  const platformModifier = usePlatformModifier();

  const open = useCallback(() => {
    if (dialogRef.current?.open) return;
    setIsOpen(true);
    dialogRef.current?.showModal();
    document.documentElement.classList.add("product-lab-open");
  }, []);
  const close = () => dialogRef.current?.close();

  useImperativeHandle(ref, () => ({ open }), [open]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, [contenteditable='true']")) return;
      if (isPlatformModifierPressed(event, platformModifier) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        open();
      }
    };
    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, [open, platformModifier]);

  useEffect(() => () => {
    document.documentElement.classList.remove("product-lab-open");
  }, []);

  return (
    <div className="product-lab-entry">
      <button className="product-lab-trigger" type="button" onClick={open}>
        <i aria-hidden="true">↗</i>
        <span>Product Lab</span>
        <kbd>{platformModifier ? `${platformModifier} K` : "K"}</kbd>
      </button>

      <dialog
        className="product-lab-dialog"
        ref={dialogRef}
        aria-label="Product Lab interactive portfolio games"
        onClose={() => {
          setIsOpen(false);
          setGame(null);
          document.documentElement.classList.remove("product-lab-open");
        }}
        data-lenis-prevent
      >
        <div className="product-lab-shell">
          <header className="product-lab-header">
            <button
              className="product-lab-back"
              type="button"
              onClick={game ? () => setGame(null) : close}
              aria-label={game ? "Return to Product Lab games" : "Return to portfolio"}
            >
              <span aria-hidden="true">←</span>
              {game ? "All games" : "Portfolio"}
            </button>
            <div>
              <span>Interactive portfolio</span>
              <strong>{game ? games.find((entry) => entry.id === game)?.title : "Three ways Van builds"}</strong>
            </div>
            <span className="product-lab-header-spacer" aria-hidden="true" />
          </header>

          <div className="product-lab-stage" data-game={game ?? "home"}>
            {isOpen && game === "stack" ? <StackBuilderGame /> : null}
            {isOpen && game === "ship" ? <ReleaseRunGame /> : null}
            {isOpen && game === "match" ? <ProductMatchGame /> : null}
            {isOpen && game === null ? (
              <>
                <div className="product-lab-visual">
                  <ProductLabScene />
                  <span className="product-lab-coordinate" aria-hidden="true">CEB · 10.3157° N / 123.8854° E</span>
                </div>
                <div className="product-lab-panel">
                  <div className="product-lab-home">
                    <p className="product-lab-eyebrow">Choose an experiment</p>
                    <h2>Build, release, and explore the work.</h2>
                    <p>Three short interactions. No scoreboards, logins, or technical knowledge required.</p>
                    <div className="product-lab-games">
                      {games.map((entry) => (
                        <button key={entry.id} type="button" onClick={() => setGame(entry.id)}>
                          <span>{entry.index}</span>
                          <strong>{entry.title}</strong>
                          <p>{entry.description}</p>
                          <small>{entry.duration} <i aria-hidden="true">→</i></small>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </dialog>
    </div>
  );
}
