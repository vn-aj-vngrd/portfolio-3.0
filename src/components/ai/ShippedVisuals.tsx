import { shippedAgentLoop } from "@/content/ai-workflow";

// Visuals for the shipped-agent ledger on /ai, in the factory diagrams' language
// (FactoryVisuals.tsx): one draw-in on entry, solid lines forward, a diamond
// where a person decides. All text is real; only markers and lines are hidden.

type Vars = Record<`--${string}`, string | number>;
const vars = (v: Vars) => v as React.CSSProperties;

// The loop draws once on entry: a token rides Read → Validate → Propose, holds
// at the person's decision while the dismissed path draws, then continues to
// Apply. Each step is Signal Blue only while the token is on it. Reduced motion
// shows the finished diagram with no token.
export function ShippedAgentLoop() {
  const { steps } = shippedAgentLoop;
  return (
    <figure
      className="fx fxl"
      data-flow="draw"
      aria-labelledby="fx-shipped-loop-title"
    >
      <h3 id="fx-shipped-loop-title" className="fx-shipped-loop-title">
        {shippedAgentLoop.title}
      </h3>
      <div className="fxl-stage">
        <div className="fxl-track" aria-hidden="true">
          {steps.slice(1).map((step, i) => (
            <span
              key={step.label}
              className="fxl-seg"
              data-seg={i + 1}
              style={vars({ "--n": i })}
            />
          ))}
          <span className="fxl-approved">{shippedAgentLoop.approved}</span>
        </div>
        <span className="fxl-token" aria-hidden="true">
          <i />
        </span>
        <ol className="fxl-steps">
          {steps.map((step, i) => (
            <li
              key={step.label}
              data-step={i + 1}
              data-gate={"person" in step ? "" : undefined}
            >
              <span className="fxl-marker" aria-hidden="true" />
              <span className="fxl-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <strong>{step.label}</strong>
              <p>{step.detail}</p>
            </li>
          ))}
        </ol>
        <p className="fxl-return">
          <span aria-hidden="true">↺ </span>
          {shippedAgentLoop.dismissed}
        </p>
      </div>
      <figcaption>{shippedAgentLoop.caption}</figcaption>
    </figure>
  );
}

type Loop = { reads: string; checks: string; approval: string; proof: string };

/** One agent's place in the loop: what it reads, how output is checked, what waits for a person, and the evidence. */
export function AgentStrip({ loop }: { loop: Loop }) {
  const { labels } = shippedAgentLoop;
  const rows = [
    { key: "reads", text: loop.reads },
    { key: "checks", text: loop.checks },
    { key: "approval", text: loop.approval },
    { key: "proof", text: loop.proof },
  ] as const;
  return (
    <div className="fx fx-strip-wrap" data-flow="draw">
      <dl className="fx-strip">
        {rows.map((row, i) => (
          <div
            key={row.key}
            className="fx-node"
            data-kind={row.key}
            style={vars({ "--i": i })}
          >
            <dt>
              {row.key === "approval" ? (
                <span className="fx-diamond" aria-hidden="true" />
              ) : (
                <span className="fx-strip-dot" aria-hidden="true" />
              )}
              {labels[row.key]}
            </dt>
            <dd>{row.text}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
