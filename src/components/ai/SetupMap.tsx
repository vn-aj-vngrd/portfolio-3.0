import { setupMap } from "@/content/ai-workflow";

export function SetupMap() {
  const { voice, me, out } = setupMap;
  return (
    <figure
      className="setup-map"
      aria-labelledby="setup-map-caption"
      data-flow="setup"
    >
      <ol className="setup-map-flow">
        <li className="setup-node" data-node="voice">
          <span className="ai-kicker">{voice.kicker}</span>
          <strong>{voice.title}</strong>
          <p>{voice.line}</p>
        </li>
        <li className="setup-node setup-node-me" data-node="me">
          <span className="ai-kicker">{me.kicker}</span>
          <strong>{me.title}</strong>
          <p>{me.line}</p>
        </li>
        <li className="setup-frame" data-node="herdr">
          <span className="setup-frame-label">{setupMap.herdr}</span>
          <div className="setup-harness">
            <span className="setup-harness-label">{setupMap.harness}</span>
            <ul className="setup-models">
              {setupMap.models.map((model) => (
                <li key={model.name}>
                  <strong>{model.name}</strong>
                  <span>{model.role}</span>
                </li>
              ))}
            </ul>
            <p className="setup-harness-parts">{setupMap.parts}</p>
          </div>
        </li>
        <li className="setup-node" data-node="out">
          <span className="ai-kicker">{out.kicker}</span>
          <strong>{out.title}</strong>
          <p>{out.line}</p>
        </li>
      </ol>
      <div className="setup-return" aria-hidden="true">
        <span>
          <span className="setup-return-arrow">↩ </span>
          {setupMap.returnLabel}
        </span>
      </div>
      <figcaption id="setup-map-caption">{setupMap.caption}</figcaption>
    </figure>
  );
}
