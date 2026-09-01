"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";

import type { ProductMatchEntry } from "@/types/content";

const ProductMatchScene = dynamic(
  () => import("./ProductMatchScene").then((module) => module.ProductMatchScene),
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

type MatchState = "choosing" | "wrong" | "matched" | "complete";

export function ProductMatchGame({
  entries,
}: {
  entries: readonly ProductMatchEntry[];
}) {
  const [round, setRound] = useState(0);
  const [selection, setSelection] = useState(0);
  const [state, setState] = useState<MatchState>("choosing");
  const problem = entries[round];

  const selectProduct = useCallback((index: number) => {
    setSelection(index);
    setState(index === round ? "matched" : "wrong");
  }, [round]);

  if (!problem) {
    return (
      <div className="product-lab-panel">
        <div className="product-match-result" role="status">
          <h2>Product Match is unavailable.</h2>
          <p>The case-study catalog did not provide any matches.</p>
        </div>
      </div>
    );
  }

  const next = () => {
    if (round === entries.length - 1) {
      setState("complete");
      return;
    }
    setRound((current) => current + 1);
    setSelection((current) => (current + 1) % entries.length);
    setState("choosing");
  };

  const reset = () => {
    setRound(0);
    setSelection(0);
    setState("choosing");
  };

  return (
    <>
      <div className="product-lab-visual">
        <ProductMatchScene
          key={round}
          correctAnswer={round}
          products={entries}
          onSelect={selectProduct}
        />
        <span className="product-lab-coordinate" aria-hidden="true">CEB · 10.3157° N / 123.8854° E</span>
      </div>
      <div className="product-lab-panel">
        <div className="lab-game lab-product-match-game">
          <div className="product-match-hud">
            <p>3D case-study challenge · {Math.min(round + 1, entries.length)} / {entries.length}</p>
            <h2>{state === "complete" ? "Portfolio unlocked." : problem.prompt}</h2>
            <span>{state === "complete" ? `${entries.length} products matched to the problems they solve.` : "Select the product in the 3D scene that solves this problem."}</span>
          </div>

          <ol className="product-match-progress" aria-label="Product Match progress">
            {entries.map((entry, index) => (
              <li key={entry.slug} data-state={index < round || state === "complete" ? "complete" : index === round ? "active" : "waiting"}>
                <span>{String(index + 1).padStart(2, "0")}</span>{entry.name}
              </li>
            ))}
          </ol>

          {state !== "complete" && state !== "matched" ? (
            <div className="product-match-actions" aria-label="Select a product">
              {entries.map((entry, index) => <button key={entry.slug} type="button" onClick={() => selectProduct(index)}>{entry.name}</button>)}
            </div>
          ) : null}

          {state === "wrong" ? <div className="product-match-hint" role="status"><span>Not this one.</span>{problem.clue}</div> : null}

          {state === "matched" ? (
            <div className="product-match-result" role="status">
              <span>Matched · {entries[selection].name}</span>
              <h3>Problem met product.</h3>
              <p>{problem.result}</p>
              <button type="button" onClick={next}>{round === entries.length - 1 ? "Complete the set" : "Next problem"}</button>
            </div>
          ) : null}

          {state === "complete" ? (
            <div className="product-match-result product-match-complete" role="status">
              <span>{String(entries.length).padStart(2, "0")} / {String(entries.length).padStart(2, "0")} · Portfolio unlocked</span>
              <h3>Explore the evidence.</h3>
              <div>{entries.map((entry) => <a key={entry.slug} href={entry.href}>{entry.name}<span aria-hidden="true">↗</span></a>)}</div>
              <button type="button" onClick={reset}>Play again</button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
