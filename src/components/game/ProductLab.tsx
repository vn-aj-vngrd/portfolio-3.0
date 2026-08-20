"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  isPlatformModifierPressed,
  usePlatformModifier,
} from "@/hooks/usePlatformModifier";

import type { LabGame } from "./ProductLabScene";

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

const ReleaseRunScene = dynamic(
  () => import("./ReleaseRunScene").then((module) => module.ReleaseRunScene),
  { ssr: false, loading: () => sceneLoading },
);

const StackDropScene = dynamic(
  () => import("./StackDropScene").then((module) => module.StackDropScene),
  { ssr: false, loading: () => sceneLoading },
);

const ProductMatchScene = dynamic(
  () => import("./ProductMatchScene").then((module) => module.ProductMatchScene),
  { ssr: false, loading: () => sceneLoading },
);

type StackOption = { name: string; reason: string };
type StackLayer = { label: string; options: readonly StackOption[] };
type StackBrief = {
  id: "web" | "mobile" | "workflow";
  label: string;
  summary: string;
  layers: readonly StackLayer[];
};

const stackBriefs: readonly StackBrief[] = [
  {
    id: "web",
    label: "Web product",
    summary: "A typed product with a responsive interface, server operations, and durable data.",
    layers: [
      {
        label: "Experience",
        options: [
          { name: "Next.js + React", reason: "One TypeScript surface for product UI and server-rendered routes." },
          { name: "React + Vite", reason: "A focused client application with a fast, explicit toolchain." },
        ],
      },
      {
        label: "Services",
        options: [
          { name: "ASP.NET Core", reason: "A structured backend for durable APIs and domain-heavy work." },
          { name: "NestJS", reason: "A TypeScript service layer with explicit modules and contracts." },
          { name: "Hono", reason: "A small, fast API surface when the product does not need a large framework." },
        ],
      },
      {
        label: "Data",
        options: [
          { name: "PostgreSQL + Prisma", reason: "Relational data with a readable schema and typed access." },
          { name: "PostgreSQL + Drizzle", reason: "SQL-shaped TypeScript access with a lightweight abstraction." },
          { name: "Supabase", reason: "Managed Postgres and product services for a lean release path." },
        ],
      },
      {
        label: "Delivery",
        options: [
          { name: "Vercel", reason: "A direct release path for a Next.js product." },
          { name: "Docker + AWS", reason: "Portable services with more infrastructure control." },
        ],
      },
      {
        label: "Quality",
        options: [
          { name: "TypeScript + Vitest + Biome", reason: "Fast feedback across contracts, behavior, and consistency." },
          { name: "TypeScript + Jest + Lefthook", reason: "Tests and repository checks before changes leave the machine." },
        ],
      },
    ],
  },
  {
    id: "mobile",
    label: "Mobile product",
    summary: "A cross-platform product with native interaction, identity, backend state, and release checks.",
    layers: [
      {
        label: "Experience",
        options: [
          { name: "React Native + Expo", reason: "A TypeScript-first native product with a practical release workflow." },
        ],
      },
      {
        label: "Backend",
        options: [
          { name: "Convex", reason: "Reactive product data, functions, and storage behind one contract." },
          { name: "Supabase", reason: "Managed Postgres and backend services with a quick product loop." },
        ],
      },
      {
        label: "Identity",
        options: [
          { name: "Clerk", reason: "Managed identity while product authorization remains explicit." },
          { name: "Better Auth", reason: "TypeScript-native authentication with more application control." },
        ],
      },
      {
        label: "Structure",
        options: [
          { name: "Turborepo", reason: "Shared contracts and tooling across mobile, backend, and packages." },
          { name: "Expo workspace", reason: "A smaller repository when the product does not need many packages." },
        ],
      },
      {
        label: "Quality",
        options: [
          { name: "TypeScript + Maestro", reason: "Typed logic plus repeatable checks across real mobile flows." },
          { name: "TypeScript + Vitest", reason: "Fast coverage for domain logic and shared contracts." },
        ],
      },
    ],
  },
  {
    id: "workflow",
    label: "Agent workflow",
    summary: "A reviewable engineering workflow where agents accelerate delivery without replacing judgment.",
    layers: [
      {
        label: "Workspace",
        options: [
          { name: "VS Code + cmux", reason: "A familiar editor with parallel terminal work kept visible." },
          { name: "Cursor", reason: "Editor-native assistance for focused implementation and review." },
        ],
      },
      {
        label: "Agents",
        options: [
          { name: "Claude Code", reason: "Deep repository work, planning, implementation, and verification." },
          { name: "Codex CLI", reason: "Focused coding loops with direct command-line execution." },
          { name: "Pi", reason: "A lightweight agent harness with reusable workflows and tools." },
        ],
      },
      {
        label: "Process",
        options: [
          { name: "Research + prototype", reason: "Reduce uncertainty before committing to production architecture." },
          { name: "TDD", reason: "Turn expected behavior into an executable development loop." },
        ],
      },
      {
        label: "Review",
        options: [
          { name: "Code review + browser QA", reason: "Check both repository standards and the product people use." },
          { name: "Accessibility audit", reason: "Treat semantics, input, contrast, and motion as product requirements." },
        ],
      },
      {
        label: "Release",
        options: [
          { name: "GitHub + Vercel", reason: "A traceable change set with an automated production path." },
          { name: "Docker + AWS", reason: "A portable release path for services needing infrastructure control." },
        ],
      },
    ],
  },
] as const;

const games: readonly {
  id: LabGame;
  index: string;
  title: string;
  duration: string;
  description: string;
}[] = [
  {
    id: "stack",
    index: "01",
    title: "Stack Builder",
    duration: "45 sec",
    description: "Time five moving 3D layers and build a stable product stack.",
  },
  {
    id: "ship",
    index: "02",
    title: "Release Run",
    duration: "45 sec",
    description: "Navigate a first-person build corridor and activate every release stage.",
  },
  {
    id: "match",
    index: "03",
    title: "Product Match",
    duration: "40 sec",
    description: "Match real products to the problems they were designed to solve.",
  },
] as const;

const products = [
  { name: "Roleway", href: "/work/roleway" },
  { name: "Relay", href: "/work/relay" },
  { name: "Viya", href: "/work/viya" },
] as const;

const productProblems = [
  {
    answer: 0,
    title: "A job seeker is losing next actions, interview notes, and follow-ups across spreadsheets, documents, and browser tabs.",
    clue: "Look for the product organized around opportunities and their next action.",
    result: "Roleway keeps each application, task, interview, document, and follow-up in one private workspace, with optional AI drafts that require user review.",
  },
  {
    answer: 1,
    title: "A pickleball group coordinates the plan, roster, costs, courts, and scores across disconnected tools.",
    clue: "Look for the product built around one shared game link.",
    result: "Relay carries one pickleball session from invitation and RSVP through repayment, rotations, scoring, and the shared memory afterward.",
  },
  {
    answer: 2,
    title: "Travel plans are fragmented across bookings, budgets, documents, and messages.",
    clue: "Look for the mobile workspace built around one trip.",
    result: "Viya keeps the itinerary, budget, documents, bookings, readiness, and reviewable AI updates in one trip workspace.",
  },
] as const;

type ReleaseControl = "forward" | "back" | "left" | "right" | "turnLeft" | "turnRight";

function setReleaseControl(action: ReleaseControl, pressed: boolean) {
  document.dispatchEvent(
    new CustomEvent("release-run-control", { detail: { action, pressed } }),
  );
}

export function ProductLab() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [game, setGame] = useState<LabGame | null>(null);
  const [briefId, setBriefId] = useState<StackBrief["id"]>("web");
  const [stackSelections, setStackSelections] = useState<StackOption[]>([]);
  const [stackStarted, setStackStarted] = useState(false);
  const [stackProgress, setStackProgress] = useState(0);
  const [stackAccuracies, setStackAccuracies] = useState<number[]>([]);
  const [stackStatus, setStackStatus] = useState<"ready" | "playing" | "failed" | "complete">("ready");
  const [stackRunKey, setStackRunKey] = useState(0);
  const [shipProgress, setShipProgress] = useState(0);
  const [shipRunKey, setShipRunKey] = useState(0);
  const [shipReady, setShipReady] = useState(false);
  const [matchRound, setMatchRound] = useState(0);
  const [matchSelection, setMatchSelection] = useState(1);
  const [matchState, setMatchState] = useState<"choosing" | "wrong" | "matched" | "complete">("choosing");
  const [copied, setCopied] = useState(false);
  const platformModifier = usePlatformModifier();

  const brief = stackBriefs.find((entry) => entry.id === briefId) ?? stackBriefs[0];
  const currentLayer = brief.layers[stackSelections.length];
  const stackComplete = stackStatus === "complete";
  const stackModules = useMemo(
    () => brief.layers.map((layer) => layer.options[0].name),
    [brief],
  );
  const stackAccuracy = stackAccuracies.length
    ? Math.round((stackAccuracies.reduce((total, value) => total + value, 0) / stackAccuracies.length) * 100)
    : 100;
  const shipSolved = shipProgress === 4;

  const open = useCallback(() => {
    if (dialogRef.current?.open) return;
    setIsOpen(true);
    dialogRef.current?.showModal();
    document.documentElement.classList.add("product-lab-open");
  }, []);

  const close = () => dialogRef.current?.close();

  const returnToLab = () => {
    setGame(null);
    setCopied(false);
  };

  const resetStack = (nextBrief = briefId) => {
    setBriefId(nextBrief);
    setStackSelections([]);
    setStackStarted(false);
    setStackProgress(0);
    setStackAccuracies([]);
    setStackStatus("ready");
    setStackRunKey((current) => current + 1);
    setCopied(false);
  };

  const resetShip = () => {
    setShipProgress(0);
    setShipReady(false);
    setShipRunKey((current) => current + 1);
  };

  const resetMatch = () => {
    setMatchRound(0);
    setMatchSelection(1);
    setMatchState("choosing");
  };

  const selectStackOption = useCallback((index: number) => {
    setStackSelections((current) => {
      const activeBrief = stackBriefs.find((entry) => entry.id === briefId) ?? stackBriefs[0];
      const option = activeBrief.layers[current.length]?.options[index];
      return option ? [...current, option] : current;
    });
  }, [briefId]);

  const selectMatchProduct = useCallback((index: number) => {
    setMatchSelection(index);
    setMatchState("choosing");
  }, []);

  const handleStackDrop = useCallback((progress: number, accuracy: number) => {
    setStackProgress(progress);
    setStackAccuracies((current) => [...current, accuracy]);
  }, []);

  const handleShipProgress = useCallback((progress: number) => {
    setShipProgress(progress);
  }, []);

  const handleShipReady = useCallback(() => {
    setShipReady(true);
  }, []);

  const nextMatch = () => {
    if (matchRound === productProblems.length - 1) {
      setMatchState("complete");
      return;
    }
    setMatchRound((current) => current + 1);
    setMatchSelection((current) => (current + 1) % products.length);
    setMatchState("choosing");
  };

  const copyStack = async () => {
    const summary = [
      `${brief.label}, assembled in Van's Product Lab`,
      ...stackModules.map((module, index) => `${brief.layers[index].label}: ${module}`),
    ].join("\n");
    await navigator.clipboard.writeText(summary);
    setCopied(true);
  };

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, [contenteditable='true']")) return;
      if (
        isPlatformModifierPressed(event, platformModifier) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        open();
      }
    };
    const handleOpen = () => open();
    document.addEventListener("keydown", handleShortcut);
    document.addEventListener("open-product-lab", handleOpen);
    return () => {
      document.removeEventListener("keydown", handleShortcut);
      document.removeEventListener("open-product-lab", handleOpen);
    };
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
              onClick={game ? returnToLab : close}
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
            <div className="product-lab-visual">
              {isOpen ? (
                game === "ship" ? (
                  <ReleaseRunScene
                    key={shipRunKey}
                    onProgress={handleShipProgress}
                    onReady={handleShipReady}
                  />
                ) : game === "stack" ? (
                  <StackDropScene
                    key={stackRunKey}
                    running={stackStarted}
                    layers={stackModules}
                    onDrop={handleStackDrop}
                    onFail={() => setStackStatus("failed")}
                    onComplete={() => setStackStatus("complete")}
                  />
                ) : game === "match" ? (
                  <ProductMatchScene
                    key={matchRound}
                    correctAnswer={productProblems[matchRound].answer}
                    onSelect={(index) => {
                      setMatchSelection(index);
                      setMatchState(index === productProblems[matchRound].answer ? "matched" : "wrong");
                    }}
                  />
                ) : (
                  <ProductLabScene
                    game={game}
                    stackCount={stackSelections.length}
                    stackComplete={stackComplete}
                    stackOptionCount={currentLayer?.options.length ?? 0}
                    matchSelection={matchSelection}
                    matchRound={matchRound}
                    matchComplete={matchState === "complete"}
                    onSelectStackOption={selectStackOption}
                    onSelectMatch={selectMatchProduct}
                  />
                )
              ) : null}
              <span className="product-lab-coordinate" aria-hidden="true">CEB · 10.3157° N / 123.8854° E</span>
            </div>

            <div className="product-lab-panel">
              {game === null ? (
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
              ) : null}

              {game === "stack" ? (
                <div className="lab-game lab-stack-drop-game">
                  <div className="stack-game-hud">
                    <p>3D timing game</p>
                    <h2>Stack Builder</h2>
                    <span>{stackStatus === "playing" ? `Drop ${brief.layers[stackProgress]?.label ?? "the final layer"}: ${stackModules[stackProgress] ?? "Complete"}` : brief.summary}</span>
                  </div>

                  <ol className="stack-game-progress" aria-label="Stack Builder progress" aria-live="polite">
                    {brief.layers.map((layer, index) => (
                      <li key={layer.label} data-state={index < stackProgress ? "complete" : index === stackProgress ? "active" : "waiting"}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        {layer.label}
                      </li>
                    ))}
                  </ol>

                  {stackStatus === "ready" ? (
                    <div className="stack-game-intro">
                      <span>Build a stable product</span>
                      <h3>Time every drop.</h3>
                      <p>Each moving block is one layer of Van&apos;s stack. Align all five as the tower gets faster and narrower.</p>
                      <div className="stack-game-briefs" role="group" aria-label="Choose product stack">
                        {stackBriefs.map((entry) => (
                          <button key={entry.id} type="button" data-active={briefId === entry.id} onClick={() => resetStack(entry.id)}>{entry.label}</button>
                        ))}
                      </div>
                      <button className="stack-game-primary" type="button" onClick={() => { setStackStarted(true); setStackStatus("playing"); }}>Start stacking</button>
                    </div>
                  ) : null}

                  {stackStatus === "playing" ? (
                    <>
                      <div className="stack-game-help"><kbd>Click / Tap / Space</kbd><span>Drop the moving block</span></div>
                      <button className="stack-game-drop" type="button" onClick={() => document.dispatchEvent(new Event("stack-drop"))}>Drop</button>
                    </>
                  ) : null}

                  {stackStatus === "failed" ? (
                    <div className="stack-game-result" role="status">
                      <span>Build interrupted · {stackProgress} / 5 layers</span>
                      <h3>The stack missed.</h3>
                      <p>Alignment gets tighter as delivery moves upward. Reset the build and time the next drop.</p>
                      <button type="button" onClick={() => resetStack()}>Try again</button>
                    </div>
                  ) : null}

                  {stackComplete ? (
                    <div className="stack-game-result" role="status">
                      <span>05 / 05 · {stackAccuracy}% alignment</span>
                      <h3>Stack shipped.</h3>
                      <ul>{brief.layers.map((layer, index) => <li key={layer.label}><span>{layer.label}</span><strong>{stackModules[index]}</strong></li>)}</ul>
                      <div>
                        <button type="button" onClick={copyStack}>{copied ? "Copied" : "Copy stack"}</button>
                        <button type="button" onClick={() => resetStack()}>Play again</button>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {game === "ship" ? (
                <div className="lab-game lab-ship-game" data-ready={shipReady}>
                  <div className="release-run-hud">
                    <p>First-person product run</p>
                    <h2>Release Run</h2>
                    <span>Move through the corridor. Aim at each active signal and activate it in order.</span>
                  </div>

                  <ol className="release-run-progress" aria-label="Release Run progress" aria-live="polite">
                    {["Plan", "Build", "Test", "Ship"].map((label, index) => (
                      <li key={label} data-state={index < shipProgress ? "complete" : index === shipProgress ? "active" : "waiting"}>
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
                      <button type="button" aria-label="Move forward" onPointerDown={() => setReleaseControl("forward", true)} onPointerUp={() => setReleaseControl("forward", false)} onPointerCancel={() => setReleaseControl("forward", false)}>↑</button>
                      <button type="button" aria-label="Move left" onPointerDown={() => setReleaseControl("left", true)} onPointerUp={() => setReleaseControl("left", false)} onPointerCancel={() => setReleaseControl("left", false)}>←</button>
                      <button type="button" aria-label="Move backward" onPointerDown={() => setReleaseControl("back", true)} onPointerUp={() => setReleaseControl("back", false)} onPointerCancel={() => setReleaseControl("back", false)}>↓</button>
                      <button type="button" aria-label="Move right" onPointerDown={() => setReleaseControl("right", true)} onPointerUp={() => setReleaseControl("right", false)} onPointerCancel={() => setReleaseControl("right", false)}>→</button>
                    </div>
                    <div className="release-run-action-pad">
                      <div>
                        <button type="button" aria-label="Turn left" onPointerDown={() => setReleaseControl("turnLeft", true)} onPointerUp={() => setReleaseControl("turnLeft", false)} onPointerCancel={() => setReleaseControl("turnLeft", false)}>↶</button>
                        <button type="button" aria-label="Turn right" onPointerDown={() => setReleaseControl("turnRight", true)} onPointerUp={() => setReleaseControl("turnRight", false)} onPointerCancel={() => setReleaseControl("turnRight", false)}>↷</button>
                      </div>
                      <button className="release-run-fire" type="button" onClick={() => document.dispatchEvent(new Event("release-run-fire"))}>Activate</button>
                    </div>
                  </div>

                  <button className="release-run-reset" type="button" onClick={resetShip}>Restart run</button>

                  {shipSolved ? (
                    <div className="release-run-complete" role="status">
                      <span>04 / 04 · Release complete</span>
                      <h3>Shipped.</h3>
                      <p>You carried one idea through planning, implementation, testing, and release.</p>
                      <button type="button" onClick={resetShip}>Run it again</button>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {game === "match" ? (
                <div className="lab-game lab-product-match-game">
                  <div className="product-match-hud">
                    <p>3D case-study challenge · {Math.min(matchRound + 1, productProblems.length)} / {productProblems.length}</p>
                    <h2>{matchState === "complete" ? "Portfolio unlocked." : productProblems[matchRound].title}</h2>
                    <span>{matchState === "complete" ? "Three products matched to the problems they solve." : "Select the product in the 3D scene that solves this problem."}</span>
                  </div>

                  <ol className="product-match-progress" aria-label="Product Match progress">
                    {products.map((product, index) => <li key={product.name} data-state={index < matchRound || matchState === "complete" ? "complete" : index === matchRound ? "active" : "waiting"}><span>{String(index + 1).padStart(2, "0")}</span>{product.name}</li>)}
                  </ol>

                  {matchState !== "complete" && matchState !== "matched" ? (
                    <div className="product-match-actions" aria-label="Select a product">
                      {products.map((product, index) => <button key={product.name} type="button" onClick={() => { setMatchSelection(index); setMatchState(index === productProblems[matchRound].answer ? "matched" : "wrong"); }}>{product.name}</button>)}
                    </div>
                  ) : null}

                  {matchState === "wrong" ? <div className="product-match-hint" role="status"><span>Not this one.</span>{productProblems[matchRound].clue}</div> : null}

                  {matchState === "matched" ? (
                    <div className="product-match-result" role="status">
                      <span>Matched · {products[matchSelection].name}</span>
                      <h3>Problem met product.</h3>
                      <p>{productProblems[matchRound].result}</p>
                      <button type="button" onClick={nextMatch}>{matchRound === productProblems.length - 1 ? "Complete the set" : "Next problem"}</button>
                    </div>
                  ) : null}

                  {matchState === "complete" ? (
                    <div className="product-match-result product-match-complete" role="status">
                      <span>{String(products.length).padStart(2, "0")} / {String(products.length).padStart(2, "0")} · Portfolio unlocked</span>
                      <h3>Explore the evidence.</h3>
                      <div>{products.map((product) => <a key={product.name} href={product.href}>{product.name}<span aria-hidden="true">↗</span></a>)}</div>
                      <button type="button" onClick={resetMatch}>Play again</button>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
