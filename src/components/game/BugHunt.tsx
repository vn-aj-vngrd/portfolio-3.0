"use client";

import { useEffect, useRef, useState } from "react";

type Challenge = {
  title: string;
  code: readonly string[];
  bugLine: number;
  explanation: string;
};

const challenges: readonly Challenge[] = [
  {
    title: "The early return",
    code: [
      "async function saveAll(items) {",
      "  items.forEach(async (item) => {",
      "    await database.save(item);",
      "  });",
      '  return "saved";',
      "}",
    ],
    bugLine: 2,
    explanation:
      "forEach does not await async callbacks. Use Promise.all(items.map(...)) or a for...of loop before returning.",
  },
  {
    title: "The stale result",
    code: [
      "function Results({ query }) {",
      "  const [data, setData] = useState([]);",
      "  useEffect(() => {",
      "    search(query).then(setData);",
      "  }, []);",
      "  return <List items={data} />;",
      "}",
    ],
    bugLine: 5,
    explanation:
      "query is used inside the effect but omitted from its dependencies, so later searches can show stale results.",
  },
  {
    title: "The quiet mutation",
    code: [
      "function RankedList({ items }) {",
      "  const ranked = items.sort(",
      "    (a, b) => b.score - a.score,",
      "  );",
      "  return <List items={ranked} />;",
      "}",
    ],
    bugLine: 2,
    explanation:
      "Array.sort mutates the items prop. Use items.toSorted(...) or copy the array before sorting.",
  },
  {
    title: "The accidental admin",
    code: [
      "function canManage(user) {",
      '  if (user.role = "admin") {',
      "    return true;",
      "  }",
      "  return false;",
      "}",
    ],
    bugLine: 2,
    explanation:
      "The condition assigns admin instead of comparing the role. Use === to keep authorization checks explicit.",
  },
  {
    title: "The eager handler",
    code: [
      "function DeleteButton({ id }) {",
      "  return (",
      "    <button",
      "      onClick={removeItem(id)}",
      "    >Delete</button>",
      "  );",
      "}",
    ],
    bugLine: 4,
    explanation:
      "removeItem runs during render. Wrap it in a function so deletion only happens after the click.",
  },
] as const;

export function BugHunt() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const startedAt = useRef(0);
  const [phase, setPhase] = useState<"intro" | "playing" | "complete">("intro");
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);

  const open = () => {
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  const reset = () => {
    setPhase("intro");
    setRound(0);
    setScore(0);
    setSelectedLine(null);
    setElapsed(0);
  };

  const start = () => {
    startedAt.current = performance.now();
    setPhase("playing");
    setRound(0);
    setScore(0);
    setSelectedLine(null);
  };

  const selectLine = (line: number) => {
    if (phase !== "playing" || selectedLine !== null) return;
    setSelectedLine(line);
    if (line === challenges[round].bugLine) setScore((current) => current + 1);
  };

  const next = () => {
    if (round === challenges.length - 1) {
      setElapsed(Math.max(1, Math.round((performance.now() - startedAt.current) / 1000)));
      setPhase("complete");
      return;
    }
    setRound((current) => current + 1);
    setSelectedLine(null);
  };

  useEffect(() => {
    const selectFromKeyboard = (event: KeyboardEvent) => {
      if (!dialogRef.current?.open || phase !== "playing" || selectedLine !== null) return;
      const line = Number(event.key);
      if (line < 1 || line > challenges[round].code.length) return;

      event.preventDefault();
      setSelectedLine(line);
      if (line === challenges[round].bugLine) setScore((current) => current + 1);
    };

    document.addEventListener("keydown", selectFromKeyboard);
    return () => document.removeEventListener("keydown", selectFromKeyboard);
  }, [phase, round, selectedLine]);

  useEffect(() => {
    const openFromShortcut = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.matches("input, textarea, select, [contenteditable='true']");
      if (!isTyping && event.shiftKey && event.key.toLowerCase() === "b") {
        event.preventDefault();
        open();
      }
    };
    const openFromEvent = () => open();

    document.addEventListener("keydown", openFromShortcut);
    document.addEventListener("open-bug-hunt", openFromEvent);
    return () => {
      document.removeEventListener("keydown", openFromShortcut);
      document.removeEventListener("open-bug-hunt", openFromEvent);
    };
  }, []);

  const challenge = challenges[round];
  const correct = selectedLine === challenge.bugLine;
  const resultMessage =
    score === challenges.length
      ? "Clean sweep. Production-ready instincts."
      : score >= 3
        ? "Strong review pass."
        : "One more pass through the diff.";

  return (
    <div className="bug-hunt">
      <button className="bug-hunt-trigger" type="button" onClick={open}>
        <span>Bug hunt</span>
        <kbd>⇧ B</kbd>
      </button>

      <dialog
        className="bug-hunt-dialog"
        ref={dialogRef}
        onClose={reset}
        data-lenis-prevent
      >
        <div className="bug-hunt-shell">
          <header>
            <div>
              <p>Developer mini game</p>
              <strong>Bug Hunt</strong>
            </div>
            <button type="button" onClick={close} aria-label="Close Bug Hunt">
              ×
            </button>
          </header>

          {phase === "intro" ? (
            <div className="bug-hunt-intro">
              <p className="bug-hunt-index">Five diffs. One suspicious line each.</p>
              <h2>Review the code before it ships.</h2>
              <p>
                Pick the line that needs attention. No framework trivia—just the
                small mistakes that become real product bugs.
              </p>
              <button className="bug-hunt-primary" type="button" onClick={start}>
                Start the review <span aria-hidden="true">→</span>
              </button>
              <small>Keyboard: press a line number · Escape closes</small>
            </div>
          ) : null}

          {phase === "playing" ? (
            <div className="bug-hunt-round">
              <div className="bug-hunt-progress">
                <span>
                  Diff {round + 1} / {challenges.length}
                </span>
                <span>Score {score}</span>
              </div>
              <h2>{challenge.title}</h2>
              <p>Which line needs review?</p>

              <ol className="bug-hunt-code">
                {challenge.code.map((code, index) => {
                  const line = index + 1;
                  const isSelected = selectedLine === line;
                  const isAnswer = selectedLine !== null && challenge.bugLine === line;
                  return (
                    <li key={`${challenge.title}-${line}`}>
                      <button
                        type="button"
                        onClick={() => selectLine(line)}
                        disabled={selectedLine !== null}
                        data-selected={isSelected}
                        data-answer={isAnswer}
                        aria-label={`Line ${line}: ${code.trim() || "blank line"}`}
                      >
                        <span>{line}</span>
                        <code>{code || " "}</code>
                      </button>
                    </li>
                  );
                })}
              </ol>

              {selectedLine !== null ? (
                <div className="bug-hunt-feedback" role="status">
                  <strong>{correct ? "Good catch." : `The issue is on line ${challenge.bugLine}.`}</strong>
                  <p>{challenge.explanation}</p>
                  <button className="bug-hunt-primary" type="button" onClick={next}>
                    {round === challenges.length - 1 ? "See result" : "Next diff"} →
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}

          {phase === "complete" ? (
            <div className="bug-hunt-complete">
              <p>Review complete</p>
              <strong>
                {score}<span>/{challenges.length}</span>
              </strong>
              <h2>{resultMessage}</h2>
              <p>You reviewed five TypeScript and React diffs in {elapsed} seconds.</p>
              <div>
                <button className="bug-hunt-primary" type="button" onClick={start}>
                  Review again
                </button>
                <button type="button" onClick={close}>
                  Back to portfolio
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </dialog>
    </div>
  );
}
