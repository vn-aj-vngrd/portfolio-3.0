import { ToolMark } from "@/components/ai/ToolMark";
import type { AiToolId } from "@/content/ai-workflow";
import {
  factoryArtifacts,
  factoryImprovement,
  factoryImprovementSteps,
  factoryLanes,
  factoryPair,
  factoryReviewLoop,
  factoryStages,
  factorySwimlane,
} from "@/content/factory";

// Factory diagrams on /ai. Each figure opts into the page's one draw-in
// (data-flow="draw", run by AiMotion): connectors draw in reading order and
// each node arrives as the line reaches it. The diagrams are aria-hidden
// layouts; each figure carries the same facts as real text for assistive tech.

type Vars = Record<`--${string}`, string | number>;
const vars = (v: Vars) => v as React.CSSProperties;

const pad = (n: number) => String(n).padStart(2, "0");
const stageIndex = Object.fromEntries(
  factoryStages.map((stage, i) => [stage.id, i])
) as Record<(typeof factoryStages)[number]["id"], number>;

type Lane = (typeof factoryLanes)[number];
const laneTool: Partial<Record<Lane, AiToolId>> = {
  "Claude Code": "claudeCode",
  Opus: "opus",
  Sonnet: "sonnet",
};

function laneOf(name: string) {
  const index = factoryLanes.indexOf(name as Lane);
  if (index < 0) throw new Error(`No swimlane for actor: ${name}`);
  return index;
}

const lanes = factoryStages.map((stage, i) => {
  const [primary, when] = stage.actor.split(" · ");
  const models: readonly string[] = stage.models;
  return {
    stage,
    i,
    lane: laneOf(primary),
    also: models.filter((m) => m !== primary).map(laneOf),
    when,
  };
});

function Decision() {
  return <span className="fx-diamond" aria-hidden="true" />;
}

export function FactorySwimlane() {
  const me = laneOf("Me");
  const hops = lanes.slice(0, -1).map((cell, k) => [cell, lanes[k + 1]]);
  const wide = hops
    .map(
      ([a, b]) =>
        `M${a.i + 0.5} ${a.lane + 0.5}H${a.i + 1}V${b.lane + 0.5}H${b.i + 0.5}`
    )
    .join("");
  const narrow = hops
    .map(
      ([a, b]) =>
        `M${a.lane + 0.5} ${a.i + 0.5}V${a.i + 1}H${b.lane + 0.5}V${b.i + 0.5}`
    )
    .join("");
  const build = lanes[stageIndex.build];
  const review = lanes[stageIndex.review];
  const loopWide = `M${review.i + 0.5} ${review.lane + 0.5}V${review.lane + 0.86}H${build.i + 0.5}V${build.lane + 0.5}`;
  const loopNarrow = `M${review.lane + 0.5} ${review.i + 0.5}H${review.lane + 0.86}V${build.i + 0.5}H${build.lane + 0.5}`;
  const alsoWide = lanes
    .flatMap((c) =>
      c.also.map((l) => `M${c.i + 0.5} ${l + 0.5}V${c.lane + 0.5}`)
    )
    .join("");
  const alsoNarrow = lanes
    .flatMap((c) =>
      c.also.map((l) => `M${l + 0.5} ${c.i + 0.5}H${c.lane + 0.5}`)
    )
    .join("");

  return (
    <figure
      className="fx fx-block"
      data-flow="draw"
      aria-labelledby="fx-lanes-title"
    >
      <header className="fx-heading">
        <h3 id="fx-lanes-title">{factorySwimlane.title}</h3>
        <p>{factorySwimlane.lead}</p>
      </header>
      <div className="fx-lanes" aria-hidden="true">
        {factoryLanes.map((name, l) => (
          <span
            key={`track-${name}`}
            className="fx-lane-track"
            data-mine={l === me ? "" : undefined}
            style={vars({ "--y": l + 2 })}
          />
        ))}
        {(
          [
            ["wide", wide, loopWide, alsoWide, "0 0 10 5"],
            ["narrow", narrow, loopNarrow, alsoNarrow, "0 0 5 10"],
          ] as const
        ).map(([kind, path, loop, also, box]) => (
          <svg
            key={kind}
            className="fx-lane-svg"
            data-layout={kind}
            viewBox={box}
            preserveAspectRatio="none"
            focusable="false"
          >
            <path d={also} className="fx-lane-also" />
            <path d={path} />
            <path d={loop} className="fx-lane-loop" />
          </svg>
        ))}
        {factoryLanes.map((name, l) => {
          const tool = laneTool[name];
          return (
            <span
              key={name}
              className="fx-lane-name"
              style={vars({ "--y": l + 2 })}
            >
              {tool ? <ToolMark tool={tool} size="sm" /> : null}
              {name}
            </span>
          );
        })}
        {lanes.map(({ stage, i }) => (
          <span
            key={`stage-${stage.id}`}
            className="fx-lane-stage"
            style={vars({ "--x": i + 2 })}
          >
            <span>{pad(i + 1)}</span> {stage.label}
          </span>
        ))}
        {lanes.flatMap(({ stage, i, lane, also }) => [
          <span
            key={`dot-${stage.id}`}
            className="fx-node fx-lane-dot"
            data-kind={lane === me ? "mine" : "holds"}
            style={vars({ "--x": i + 2, "--y": lane + 2, "--i": i })}
          />,
          ...also.map((l) => (
            <span
              key={`${stage.id}-${l}`}
              className="fx-node fx-lane-dot"
              data-kind="also"
              style={vars({ "--x": i + 2, "--y": l + 2, "--i": i })}
            />
          )),
        ])}
      </div>
      <ul className="fx-legend" aria-hidden="true">
        <li>
          <span className="fx-lane-dot" data-kind="holds" />
          {factorySwimlane.legend.holds}
        </li>
        <li>
          <span className="fx-lane-dot" data-kind="also" />
          {factorySwimlane.legend.stepsIn}
        </li>
        <li>
          <span className="fx-lane-dot" data-kind="mine" />
          {factorySwimlane.legend.mine}
        </li>
      </ul>
      <div className="sr-only">
        <table>
          <caption>{factorySwimlane.title}</caption>
          <thead>
            <tr>
              <th scope="col">Stage</th>
              <th scope="col">Runs it</th>
              <th scope="col">Steps in</th>
            </tr>
          </thead>
          <tbody>
            {lanes.map(({ stage, i, lane, when }) => (
              <tr key={stage.id}>
                <th scope="row">
                  {pad(i + 1)} {stage.label}
                </th>
                <td>{factoryLanes[lane]}</td>
                <td>{when ?? "None"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

export function FactoryReviewLoop() {
  const { steps, reviewers } = factoryReviewLoop;
  const order = ["build", "prove", "review", "approve"] as const;
  return (
    <figure
      className="fx fx-block"
      data-flow="draw"
      aria-labelledby="fx-review-title"
    >
      <header className="fx-heading">
        <h3 id="fx-review-title">{factoryReviewLoop.title}</h3>
        <p>{factoryReviewLoop.lead}</p>
      </header>
      <ol className="fx-chain" style={vars({ "--k": 3 })}>
        {order.map((id, i) => (
          <li key={id} className="fx-node" style={vars({ "--i": i })}>
            <span className="fx-node-number">{pad(stageIndex[id] + 1)}</span>
            <strong>{steps[id].label}</strong>
            <p>{steps[id].detail}</p>
            {id === "review" ? (
              <ul className="fx-reviewers">
                {reviewers.map((r) => (
                  <li key={r.name}>
                    <span>{r.name}</span>
                    <span>
                      {r.model} · {r.when}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>
      <div className="fx-return fx-node" style={vars({ "--i": 4, "--k": 3 })}>
        <p>
          <span aria-hidden="true">↺ </span>
          {factoryReviewLoop.changes}
        </p>
        <ol className="fx-rounds">
          {factoryReviewLoop.rounds.map((round) => (
            <li key={round}>{round}</li>
          ))}
          <li data-mine="">
            <Decision />
            {factoryReviewLoop.stop}
          </li>
        </ol>
      </div>
    </figure>
  );
}

export function FactoryArtifacts() {
  return (
    <figure
      className="fx fx-block"
      data-flow="draw"
      aria-labelledby="fx-artifacts-title"
    >
      <header className="fx-heading">
        <h3 id="fx-artifacts-title">{factoryArtifacts.title}</h3>
        <p>{factoryArtifacts.lead}</p>
      </header>
      <div className="fx-artifacts">
        <div className="fx-axis" aria-hidden="true">
          <span />
          {factoryStages.map((stage, i) => (
            <span key={stage.id}>
              <span>{pad(i + 1)}</span>
              <span className="fx-axis-label">{stage.label}</span>
            </span>
          ))}
        </div>
        <ol>
          {factoryArtifacts.items.map((item, k) => {
            const a = stageIndex[item.from];
            const b = stageIndex[item.to];
            return (
              <li key={item.label}>
                <div className="fx-artifact-text">
                  <strong>{item.label}</strong>
                  <span>{item.detail}</span>
                </div>
                <span
                  className="fx-bar"
                  aria-hidden="true"
                  style={vars({
                    "--a": a + 2,
                    "--b": b + 3,
                    "--na": a + 1,
                    "--nb": b + 2,
                    "--i": k,
                  })}
                />
                <span className="sr-only">
                  Made at {factoryStages[a].label}, carried to{" "}
                  {factoryStages[b].label}.
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </figure>
  );
}

export function FactoryRoute() {
  const { route, columns } = factoryPair;
  const sides = [
    { key: "personal", name: columns.personal.name, stops: route.personal },
    { key: "work", name: columns.work.name, stops: route.work },
  ] as const;
  return (
    <figure
      className="fx fx-route-figure"
      data-flow="draw"
      aria-labelledby="fx-route-title"
    >
      <h4 id="fx-route-title">{route.title}</h4>
      <div className="fx-route" aria-hidden="true">
        {sides.map((side, f) => (
          <span
            key={`track-${side.key}`}
            className="fx-route-track fx-line"
            style={vars({ "--f": f + 2, "--fn": f + 1, "--i": f })}
          />
        ))}
        {sides.map((side, f) => (
          <span
            key={side.key}
            className="fx-route-name"
            style={vars({ "--f": f + 2, "--fn": f + 1 })}
          >
            {side.name}
          </span>
        ))}
        {route.stops.map((stop, k) => (
          <span
            key={`stop-${stop}`}
            className="fx-route-stop"
            style={vars({ "--s": k + 2 })}
          >
            {stop}
          </span>
        ))}
        {sides.flatMap((side, f) =>
          side.stops.map((stop, k) => (
            <span
              key={`${side.key}-${k}`}
              className="fx-node fx-route-cell"
              data-mine={"mine" in stop ? "" : undefined}
              style={vars({
                "--f": f + 2,
                "--fn": f + 1,
                "--s": k + 2,
                "--i": k,
              })}
            >
              {"mine" in stop ? (
                <Decision />
              ) : (
                <span className="fx-route-dot" />
              )}
              <span>
                <span className="fx-route-cell-stop">{route.stops[k]}</span>
                {stop.text}
              </span>
            </span>
          ))
        )}
      </div>
      <div className="sr-only">
        <table aria-labelledby="fx-route-title">
          <thead>
            <tr>
              <td />
              {sides.map((side) => (
                <th key={side.key} scope="col">
                  {side.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {route.stops.map((stop, k) => (
              <tr key={stop}>
                <th scope="row">{stop}</th>
                {sides.map((side) => (
                  <td key={side.key}>
                    {side.stops[k].text}
                    {"mine" in side.stops[k] ? " (I step in)" : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

export function FactoryImprovement() {
  return (
    <figure
      className="fx"
      data-flow="draw"
      aria-labelledby="factory-improve-title"
    >
      <ol
        className="fx-chain"
        aria-label="The improvement loop"
        style={vars({ "--k": 4 })}
      >
        {factoryImprovementSteps.map((step, i) => (
          <li
            key={step.label}
            className="fx-node"
            data-mine={"mine" in step ? "" : undefined}
            style={vars({ "--i": i })}
          >
            <strong>{step.label}</strong>
            <p>{step.detail}</p>
          </li>
        ))}
      </ol>
      <div
        className="fx-return fx-return-bare fx-node"
        aria-hidden="true"
        style={vars({ "--i": 4, "--k": 4 })}
      />
      <figcaption>{factoryImprovement}</figcaption>
    </figure>
  );
}
