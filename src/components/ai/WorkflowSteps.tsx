import { workflowStages } from "@/content/ai-workflow";

const stageSymbols = {
  grill: (
    <>
      <path d="M10 13h34v24H25l-9 8v-8h-6z" />
      <path d="M44 24h10v25h-7v6l-8-6H28v-7" />
      <path d="M20 23h14M20 29h9" />
    </>
  ),
  spec: (
    <>
      <path d="M17 8h21l10 10v38H17z" />
      <path d="M38 8v11h10M25 29h15M25 37h15M25 45h9" />
    </>
  ),
  tickets: (
    <>
      <rect x="9" y="10" width="46" height="12" rx="2" />
      <rect x="9" y="26" width="46" height="12" rx="2" />
      <rect x="9" y="42" width="46" height="12" rx="2" />
      <path d="M17 16h2M26 16h20M17 32h2M26 32h14M17 48h2M26 48h18" />
    </>
  ),
  implement: (
    <>
      <rect x="7" y="11" width="50" height="42" rx="3" />
      <path d="M7 21h50M14 16h2M21 16h2M24 30l-7 7 7 7M40 30l7 7-7 7M35 29l-6 16" />
    </>
  ),
  review: (
    <>
      <circle cx="28" cy="28" r="18" />
      <path d="m41 41 13 13M20 28l6 6 11-12" />
    </>
  ),
} satisfies Record<(typeof workflowStages)[number]["id"], React.ReactNode>;

export function WorkflowSteps({ compact = false }: { compact?: boolean }) {
  return (
    <ol
      className={`workflow-steps${compact ? " workflow-steps-compact" : ""}`}
      aria-label="Agent-assisted development stages"
    >
      {workflowStages.map((stage, index) => (
        <li key={stage.id}>
          <div className="workflow-symbol" aria-hidden="true">
            <svg
              viewBox="0 0 64 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {stageSymbols[stage.id]}
            </svg>
          </div>
          <span className="workflow-number" aria-hidden="true">
            0{index + 1}
          </span>
          <strong>{stage.title}</strong>
          {!compact && <p>{stage.description}</p>}
          <span className="workflow-output">{stage.output}</span>
        </li>
      ))}
    </ol>
  );
}
