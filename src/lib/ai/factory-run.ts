export type StageStatus = "pending" | "active" | "done" | "waiting" | "changes";

export type Frame = {
  readonly stage: string;
  readonly mode: string;
};

type StageState = { status: StageStatus; state: string };

function complete(stageIds: readonly string[]) {
  const out: Record<string, StageState> = {};
  for (const id of stageIds) {
    out[id] = {
      status: id === "merge" ? "waiting" : "done",
      state:
        id === "gate"
          ? "Approved"
          : id === "review"
            ? "PASS"
            : id === "pr"
              ? "Open"
              : id === "merge"
                ? "Yours to merge"
                : "",
    };
  }
  return out;
}

export function statusesAt(
  stageIds: readonly string[],
  frames: readonly Frame[],
  index: number | "static"
): Record<string, StageState> {
  if (index === "static" || index >= frames.length) return complete(stageIds);
  const out: Record<string, StageState> = {};
  if (index < 0) {
    for (const id of stageIds) out[id] = { status: "pending", state: "" };
    return out;
  }
  const f = frames[index];
  const cur = stageIds.indexOf(f.stage);
  const done = complete(stageIds);
  stageIds.forEach((id, i) => {
    if (i < cur) out[id] = { status: "done", state: done[id].state };
    else out[id] = { status: "pending", state: "" };
  });
  const c = out[f.stage];
  if (f.mode === "waiting") {
    c.status = "waiting";
    c.state = f.stage === "gate" ? "Waiting for me" : "Yours to merge";
  } else if (f.mode === "approved") {
    c.status = "done";
    c.state = "Approved";
  } else if (f.mode === "changes") {
    c.status = "changes";
    c.state = "Changes";
  } else if (f.mode === "return") {
    c.status = "active";
    c.state = "Fixing findings";
    if (out.review) out.review.state = "Changes";
  } else {
    c.status = "active";
    if (f.stage === "review") c.state = "PASS";
    if (f.stage === "pr") c.state = "";
  }
  return out;
}
