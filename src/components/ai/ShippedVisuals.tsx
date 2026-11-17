import { shippedAgentLoop } from "@/content/ai-workflow";

// Visuals for the shipped-agent ledger on /ai, in the factory diagrams' language
// (FactoryVisuals.tsx): one draw-in on entry, solid lines forward, dashed lines
// back, a diamond where a person decides. Every label is real text; only
// markers, connectors and the token are hidden from assistive tech.

type Vars = Record<`--${string}`, string | number>;
const vars = (v: Vars) => v as React.CSSProperties;
const pad = (n: number) => String(n).padStart(2, "0");

// Step text sits above a rail of markers, so connectors and the two routes out
// of the gate run below the text and never cross it. A token rides the rail
// once: Read → Validate → Propose, holds at the gate while the dismissed route
// draws, then continues to Apply. Reduced motion shows the finished diagram.
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
        <ol className="fxl-steps">
          {steps.map((step, i) => (
            <li
              key={step.label}
              data-step={i + 1}
              data-gate={"person" in step ? "" : undefined}
            >
              <span className="fxl-number">
                {pad(i + 1)}
                {"person" in step ? (
                  <span className="fxl-badge">{shippedAgentLoop.gate}</span>
                ) : null}
              </span>
              <strong>{step.label}</strong>
              <p>{step.detail}</p>
            </li>
          ))}
        </ol>
        <div className="fxl-rail" aria-hidden="true">
          {steps.slice(1).map((step, i) => (
            <span
              key={`seg-${step.label}`}
              className="fxl-seg"
              data-seg={i + 1}
              style={vars({ "--x": i })}
            />
          ))}
          {steps.map((step, i) => (
            <span
              key={`marker-${step.label}`}
              className="fxl-marker"
              data-step={i + 1}
              data-gate={"person" in step ? "" : undefined}
              style={vars({ "--x": i })}
            />
          ))}
          <span className="fxl-token">
            <i />
          </span>
        </div>
        <div className="fxl-routes">
          <p className="fxl-return">
            <span>{shippedAgentLoop.dismissed}</span>
          </p>
          <p className="fxl-approved">{shippedAgentLoop.approved}</p>
        </div>
      </div>
      <figcaption>{shippedAgentLoop.caption}</figcaption>
    </figure>
  );
}

type Loop = { reads: string; checks: string; approval: string; proof: string };

/** One agent's place in the loop: four equal stages, the approval stage marked as the gate. */
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
            className="fx-node fx-stage"
            data-kind={row.key}
            style={vars({ "--i": i })}
          >
            <dt>
              <span className="fx-stage-mark" aria-hidden="true" />
              {labels[row.key]}
            </dt>
            <dd>{row.text}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
