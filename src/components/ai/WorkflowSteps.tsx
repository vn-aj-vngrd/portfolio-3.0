import { workflowStages } from "@/content/ai-workflow";

export function WorkflowSteps({ compact = false }: { compact?: boolean }) {
  return (
    <ol className={`workflow-steps${compact ? " workflow-steps-compact" : ""}`} aria-label="Agent-assisted development stages">
      {workflowStages.map((stage, index) => (
        <li key={stage.id}>
          <span className="workflow-number" aria-hidden="true">0{index + 1}</span>
          <strong>{stage.title}</strong>
          {!compact && <p>{stage.description}</p>}
          <span className="workflow-output">{stage.output}</span>
        </li>
      ))}
    </ol>
  );
}
