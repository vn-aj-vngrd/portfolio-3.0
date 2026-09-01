"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";

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

const products = [
  { name: "Relay", href: "/work/relay" },
  { name: "Roleway", href: "/work/roleway" },
  { name: "Viya", href: "/work/viya" },
  { name: "ACSFI", href: "/work/acsfi" },
] as const;

const productProblems = [
  {
    answer: 0,
    title: "A pickleball group coordinates the plan, roster, costs, courts, and scores across disconnected tools.",
    clue: "Look for the product built around one shared game link.",
    result: "Relay carries one pickleball session from invitation and RSVP through repayment, rotations, scoring, and the shared memory afterward.",
  },
  {
    answer: 1,
    title: "A job seeker is mixing career targets, next actions, interview notes, and follow-ups across spreadsheets, documents, and browser tabs.",
    clue: "Look for the product organized around focused Workspaces, Opportunities, and one clear Next Action.",
    result: "Roleway gives each focused search its own Workspace, keeps complete Opportunity context together, and lets an optional Agent prepare changes that the user must approve.",
  },
  {
    answer: 2,
    title: "Travel plans are fragmented across bookings, budgets, documents, and messages.",
    clue: "Look for the mobile workspace built around one trip.",
    result: "Viya keeps the itinerary, budget, documents, bookings, readiness, and reviewable AI updates in one trip workspace.",
  },
  {
    answer: 3,
    title: "A nonprofit needs to publish its programs, activity reports, events, and media without changing website code for every update.",
    clue: "Look for the public organization website backed by a headless CMS.",
    result: "ACSFI presents the foundation's work through a Next.js website while Strapi manages programs, stories, statistics, events, and media behind it.",
  },
] as const;

type MatchState = "choosing" | "wrong" | "matched" | "complete";

export function ProductMatchGame() {
  const [round, setRound] = useState(0);
  const [selection, setSelection] = useState(0);
  const [state, setState] = useState<MatchState>("choosing");
  const problem = productProblems[round];

  const selectProduct = useCallback((index: number) => {
    setSelection(index);
    setState(index === productProblems[round].answer ? "matched" : "wrong");
  }, [round]);

  const next = () => {
    if (round === productProblems.length - 1) {
      setState("complete");
      return;
    }
    setRound((current) => current + 1);
    setSelection((current) => (current + 1) % products.length);
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
          correctAnswer={problem.answer}
          onSelect={selectProduct}
        />
        <span className="product-lab-coordinate" aria-hidden="true">CEB · 10.3157° N / 123.8854° E</span>
      </div>
      <div className="product-lab-panel">
        <div className="lab-game lab-product-match-game">
          <div className="product-match-hud">
            <p>3D case-study challenge · {Math.min(round + 1, productProblems.length)} / {productProblems.length}</p>
            <h2>{state === "complete" ? "Portfolio unlocked." : problem.title}</h2>
            <span>{state === "complete" ? "Four products matched to the problems they solve." : "Select the product in the 3D scene that solves this problem."}</span>
          </div>

          <ol className="product-match-progress" aria-label="Product Match progress">
            {products.map((product, index) => (
              <li key={product.name} data-state={index < round || state === "complete" ? "complete" : index === round ? "active" : "waiting"}>
                <span>{String(index + 1).padStart(2, "0")}</span>{product.name}
              </li>
            ))}
          </ol>

          {state !== "complete" && state !== "matched" ? (
            <div className="product-match-actions" aria-label="Select a product">
              {products.map((product, index) => <button key={product.name} type="button" onClick={() => selectProduct(index)}>{product.name}</button>)}
            </div>
          ) : null}

          {state === "wrong" ? <div className="product-match-hint" role="status"><span>Not this one.</span>{problem.clue}</div> : null}

          {state === "matched" ? (
            <div className="product-match-result" role="status">
              <span>Matched · {products[selection].name}</span>
              <h3>Problem met product.</h3>
              <p>{problem.result}</p>
              <button type="button" onClick={next}>{round === productProblems.length - 1 ? "Complete the set" : "Next problem"}</button>
            </div>
          ) : null}

          {state === "complete" ? (
            <div className="product-match-result product-match-complete" role="status">
              <span>{String(products.length).padStart(2, "0")} / {String(products.length).padStart(2, "0")} · Portfolio unlocked</span>
              <h3>Explore the evidence.</h3>
              <div>{products.map((product) => <a key={product.name} href={product.href}>{product.name}<span aria-hidden="true">↗</span></a>)}</div>
              <button type="button" onClick={reset}>Play again</button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
