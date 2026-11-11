import {
  factoryFigureDescription,
  factoryReviewLoopText,
  factoryStages,
} from "@/content/factory";

const staticState: Partial<Record<string, string>> = {
  gate: "Approved",
  review: "PASS",
  pr: "Open",
  merge: "Yours to merge",
};

function Route({ kind }: { kind: "wrap" | "loop" }) {
  return (
    <span className={`factory-route factory-${kind}`} aria-hidden="true">
      <i className="factory-route-a" />
      <i className="factory-route-b" />
      <i className="factory-route-c" />
      <i className="factory-route-head" />
      {kind === "loop" ? (
        <span className="factory-loop-label">
          Changes go back to the builder · two rounds at most
        </span>
      ) : null}
    </span>
  );
}

export function FactoryPipeline() {
  return (
    <figure
      className="factory"
      aria-labelledby="factory-figure-title"
      aria-describedby="factory-figure-desc"
    >
      <h3 id="factory-figure-title" className="sr-only">
        The factory, stage by stage
      </h3>
      <p id="factory-figure-desc" className="sr-only">
        {factoryFigureDescription}
      </p>
      <ol className="factory-stages">
        {factoryStages.map((stage, index) => (
          <li
            key={stage.id}
            className="factory-stage"
            data-stage={stage.id}
            data-status={stage.id === "merge" ? "waiting" : "done"}
          >
            {"phase" in stage ? (
              <span className="factory-phase">{stage.phase}</span>
            ) : null}
            <div className="factory-node">
              <span className="factory-stage-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <strong>{stage.label}</strong>
              <span className="factory-stage-actor">{stage.actor}</span>
              <p>{stage.summary}</p>
              {stage.id === "review" ? (
                <span className="factory-stage-loop">
                  <span aria-hidden="true">↺ </span>
                  {factoryReviewLoopText}
                </span>
              ) : null}
              <span className="factory-stage-state">
                {staticState[stage.id] ?? ""}
              </span>
            </div>
            {stage.id === "build" ||
            stage.id === "prove" ||
            stage.id === "review" ? (
              <span
                className="factory-bracket"
                data-part={stage.id}
                aria-hidden="true"
              />
            ) : null}
          </li>
        ))}
        <li className="factory-route-slot factory-wrap-slot" aria-hidden="true">
          <Route kind="wrap" />
        </li>
        <li className="factory-route-slot factory-loop-slot" aria-hidden="true">
          <Route kind="loop" />
        </li>
      </ol>
      <span className="factory-ticket" aria-hidden="true" data-on="0" />
    </figure>
  );
}
