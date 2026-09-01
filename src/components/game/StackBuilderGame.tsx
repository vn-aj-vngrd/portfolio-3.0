"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useRef, useState } from "react";

import type { StackDropSceneHandle } from "./StackDropScene";

const StackDropScene = dynamic(
  () => import("./StackDropScene").then((module) => module.StackDropScene),
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
      { label: "Experience", options: [{ name: "Next.js + React", reason: "One TypeScript surface for product UI and server-rendered routes." }, { name: "React + Vite", reason: "A focused client application with a fast, explicit toolchain." }] },
      { label: "Services", options: [{ name: "ASP.NET Core", reason: "A structured backend for durable APIs and domain-heavy work." }, { name: "NestJS", reason: "A TypeScript service layer with explicit modules and contracts." }, { name: "Hono", reason: "A small, fast API surface when the product does not need a large framework." }] },
      { label: "Data", options: [{ name: "PostgreSQL + Prisma", reason: "Relational data with a readable schema and typed access." }, { name: "PostgreSQL + Drizzle", reason: "SQL-shaped TypeScript access with a lightweight abstraction." }, { name: "Supabase", reason: "Managed Postgres and product services for a lean release path." }] },
      { label: "Delivery", options: [{ name: "Vercel", reason: "A direct release path for a Next.js product." }, { name: "Docker + AWS", reason: "Portable services with more infrastructure control." }] },
      { label: "Quality", options: [{ name: "TypeScript + Vitest + Biome", reason: "Fast feedback across contracts, behavior, and consistency." }, { name: "TypeScript + Jest + Lefthook", reason: "Tests and repository checks before changes leave the machine." }] },
    ],
  },
  {
    id: "mobile",
    label: "Mobile product",
    summary: "A cross-platform product with native interaction, identity, backend state, and release checks.",
    layers: [
      { label: "Experience", options: [{ name: "React Native + Expo", reason: "A TypeScript-first native product with a practical release workflow." }] },
      { label: "Backend", options: [{ name: "Convex", reason: "Reactive product data, functions, and storage behind one contract." }, { name: "Supabase", reason: "Managed Postgres and backend services with a quick product loop." }] },
      { label: "Identity", options: [{ name: "Clerk", reason: "Managed identity while product authorization remains explicit." }, { name: "Better Auth", reason: "TypeScript-native authentication with more application control." }] },
      { label: "Structure", options: [{ name: "Turborepo", reason: "Shared contracts and tooling across mobile, backend, and packages." }, { name: "Expo workspace", reason: "A smaller repository when the product does not need many packages." }] },
      { label: "Quality", options: [{ name: "TypeScript + Maestro", reason: "Typed logic plus repeatable checks across real mobile flows." }, { name: "TypeScript + Vitest", reason: "Fast coverage for domain logic and shared contracts." }] },
    ],
  },
  {
    id: "workflow",
    label: "Agent workflow",
    summary: "A reviewable engineering workflow where agents accelerate delivery without replacing judgment.",
    layers: [
      { label: "Workspace", options: [{ name: "VS Code + cmux", reason: "A familiar editor with parallel terminal work kept visible." }, { name: "Cursor", reason: "Editor-native assistance for focused implementation and review." }] },
      { label: "Agents", options: [{ name: "Claude Code", reason: "Deep repository work, planning, implementation, and verification." }, { name: "Codex CLI", reason: "Focused coding loops with direct command-line execution." }, { name: "Pi", reason: "A lightweight agent harness with reusable workflows and tools." }] },
      { label: "Process", options: [{ name: "Research + prototype", reason: "Reduce uncertainty before committing to production architecture." }, { name: "TDD", reason: "Turn expected behavior into an executable development loop." }] },
      { label: "Review", options: [{ name: "Code review + browser QA", reason: "Check both repository standards and the product people use." }, { name: "Accessibility audit", reason: "Treat semantics, input, contrast, and motion as product requirements." }] },
      { label: "Release", options: [{ name: "GitHub + Vercel", reason: "A traceable change set with an automated production path." }, { name: "Docker + AWS", reason: "A portable release path for services needing infrastructure control." }] },
    ],
  },
] as const;

type StackStatus = "ready" | "playing" | "failed" | "complete";

export function StackBuilderGame() {
  const sceneRef = useRef<StackDropSceneHandle>(null);
  const [briefId, setBriefId] = useState<StackBrief["id"]>("web");
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [accuracies, setAccuracies] = useState<number[]>([]);
  const [status, setStatus] = useState<StackStatus>("ready");
  const [runKey, setRunKey] = useState(0);
  const [copied, setCopied] = useState(false);

  const brief = stackBriefs.find((entry) => entry.id === briefId) ?? stackBriefs[0];
  const stackModules = useMemo(() => brief.layers.map((layer) => layer.options[0].name), [brief]);
  const accuracy = accuracies.length
    ? Math.round((accuracies.reduce((total, value) => total + value, 0) / accuracies.length) * 100)
    : 100;

  const reset = (nextBrief = briefId) => {
    setBriefId(nextBrief);
    setStarted(false);
    setProgress(0);
    setAccuracies([]);
    setStatus("ready");
    setRunKey((current) => current + 1);
    setCopied(false);
  };

  const handleDrop = useCallback((nextProgress: number, nextAccuracy: number) => {
    setProgress(nextProgress);
    setAccuracies((current) => [...current, nextAccuracy]);
  }, []);

  const copyStack = async () => {
    const summary = [
      `${brief.label}, assembled in Van's Product Lab`,
      ...stackModules.map((module, index) => `${brief.layers[index].label}: ${module}`),
    ].join("\n");
    await navigator.clipboard.writeText(summary);
    setCopied(true);
  };

  return (
    <>
      <div className="product-lab-visual">
        <StackDropScene
          ref={sceneRef}
          key={runKey}
          running={started}
          layers={stackModules}
          onDrop={handleDrop}
          onFail={() => setStatus("failed")}
          onComplete={() => setStatus("complete")}
        />
        <span className="product-lab-coordinate" aria-hidden="true">CEB · 10.3157° N / 123.8854° E</span>
      </div>
      <div className="product-lab-panel">
        <div className="lab-game lab-stack-drop-game">
          <div className="stack-game-hud">
            <p>3D timing game</p>
            <h2>Stack Builder</h2>
            <span>{status === "playing" ? `Drop ${brief.layers[progress]?.label ?? "the final layer"}: ${stackModules[progress] ?? "Complete"}` : brief.summary}</span>
          </div>

          <ol className="stack-game-progress" aria-label="Stack Builder progress" aria-live="polite">
            {brief.layers.map((layer, index) => (
              <li key={layer.label} data-state={index < progress ? "complete" : index === progress ? "active" : "waiting"}>
                <span>{String(index + 1).padStart(2, "0")}</span>{layer.label}
              </li>
            ))}
          </ol>

          {status === "ready" ? (
            <div className="stack-game-intro">
              <span>Build a stable product</span>
              <h3>Time every drop.</h3>
              <p>Each moving block is one layer of Van&apos;s stack. Align all five as the tower gets faster and narrower.</p>
              <div className="stack-game-briefs" role="group" aria-label="Choose product stack">
                {stackBriefs.map((entry) => (
                  <button key={entry.id} type="button" data-active={briefId === entry.id} onClick={() => reset(entry.id)}>{entry.label}</button>
                ))}
              </div>
              <button className="stack-game-primary" type="button" onClick={() => { setStarted(true); setStatus("playing"); }}>Start stacking</button>
            </div>
          ) : null}

          {status === "playing" ? (
            <>
              <div className="stack-game-help"><kbd>Click / Tap / Space</kbd><span>Drop the moving block</span></div>
              <button className="stack-game-drop" type="button" onClick={() => sceneRef.current?.drop()}>Drop</button>
            </>
          ) : null}

          {status === "failed" ? (
            <div className="stack-game-result" role="status">
              <span>Build interrupted · {progress} / 5 layers</span>
              <h3>The stack missed.</h3>
              <p>Alignment gets tighter as delivery moves upward. Reset the build and time the next drop.</p>
              <button type="button" onClick={() => reset()}>Try again</button>
            </div>
          ) : null}

          {status === "complete" ? (
            <div className="stack-game-result" role="status">
              <span>05 / 05 · {accuracy}% alignment</span>
              <h3>Stack shipped.</h3>
              <ul>{brief.layers.map((layer, index) => <li key={layer.label}><span>{layer.label}</span><strong>{stackModules[index]}</strong></li>)}</ul>
              <div>
                <button type="button" onClick={copyStack}>{copied ? "Copied" : "Copy stack"}</button>
                <button type="button" onClick={() => reset()}>Play again</button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
