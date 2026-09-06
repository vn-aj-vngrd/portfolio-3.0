# Research: Portfolio AI-tool terminology

## Verification addendum

The initial model-name limitation below is superseded. After the user supplied `https://openai.com/index/gpt-6-astra/`, the directly fetched official [GPT-6 Astra model documentation](https://developers.openai.com/api/docs/models/gpt-6-astra) confirmed the name **GPT-6 Astra** and model ID `gpt-6-astra`. The announcement fetch returned 403; it was not the verification source. Personal daily-driver usage remains user-confirmed, not independently measured. Historical findings below describe the earlier bounded research pass.

## Initial summary
The candidate setup is **user-reported, not independently verified**: cmux + HERDR orchestration; Claude Code CLI for work; Pi using OpenAI/Codex models for personal projects; desktop agents for complex tasks; ChatGPT/Claude research; Wispr Flow dictation; Termius and native remote features. Preserve the distinction between a model, its agent harness, and an app/interface; **“GPT Astra 6” remains unverified as an official OpenAI model name** in the sources inspected.

## Findings
1. **Claim:** Describe personal coding as **“Pi agent running OpenAI/Codex models,” not “Codex CLI.”** A model identifies the underlying intelligence; the harness supplies the agent loop, tools, permissions, and session behavior; the terminal/desktop/mobile app is the interaction surface. Running an OpenAI model does not establish use of OpenAI’s CLI. **Sources:** [OpenAI model catalog](https://developers.openai.com/api/docs/models/all), [Anthropic product architectures](https://www.anthropic.com/engineering/how-we-contain-claude). **Support:** interpretation; the Pi-specific setup is user testimony, not documentation verification. **Confidence:** high for the distinction. Do not infer Pi’s exact provider adapter, authentication, model ID, or Codex CLI installation.

2. **Claim:** **“Claude Code CLI for work”** is appropriate user-reported wording. Claude Code is a coding-agent product, not the name of the underlying Claude model; official documentation explicitly describes terminal commands and local execution. Cowork is designed for general knowledge work with a selected local workspace, rather than being another name for the coding CLI. **Sources:** [Claude Code Remote Control](https://code.claude.com/docs/en/remote-control), [Anthropic product architectures](https://www.anthropic.com/engineering/how-we-contain-claude). **Support:** direct evidence. **Confidence:** high. Keep “Claude desktop/Cowork for complex cross-app work” as the user’s workflow description; do not imply every Claude chat has unrestricted computer access.

3. **Claim:** Native remote-agent access is distinct from remote terminal access. Claude Code **Remote Control** connects a locally running session to claude.ai/code or the Claude mobile app; execution and filesystem access stay on the host. Eligibility depends on subscription, authentication, organization settings, and supported configuration; the docs explicitly exclude API-key authentication. **Sources:** [Claude Code Remote Control](https://code.claude.com/docs/en/remote-control). **Support:** direct evidence. **Confidence:** high. Safe copy: **“Continue supported agent sessions remotely.”** Avoid “control my whole Mac from Claude” or universal availability promises.

4. **Claim:** OpenAI documents remote continuation and steering of Codex/ChatGPT work on a connected computer, including approvals and output review; computer/browser tools depend on the host’s configuration. Its current remote guide requires supported apps/devices, matching account/workspace, a running and available host, and applicable administrator approval; rollout may vary. It says mobile setup cannot be performed from Codex CLI or the IDE extension. **Sources:** [Remote connections](https://learn.chatgpt.com/docs/remote-connections), [desktop app documentation URL](https://developers.openai.com/codex/app/). **Support:** direct evidence. **Confidence:** high for documented conditions. Important naming caveat: the fetched `/codex/app/` source returned a page titled **“ChatGPT desktop app,”** not “Codex app.” Preserve “Codex app” as user-reported usage rather than silently rewriting the setup or asserting a historical rebrand. Verify the installed app’s displayed name before final public copy.

5. **Claim:** **Wispr Flow is voice dictation** that transcribes speech into text in the active application. It is an input layer, not the coding agent or research model. Features and interaction patterns differ across platforms. **Sources:** [What is Flow?](https://docs.wisprflow.ai/articles/2772472373-what-is-flow). **Support:** direct evidence. **Confidence:** high. Safe copy: **“Wispr Flow for dictating prompts and notes.”** Do not repeat its speed marketing as a measured personal productivity gain.

6. **Claim:** **Termius is an SSH client**, with terminal, SFTP, and port-forwarding capabilities. **Sources:** [Termius](https://termius.com/). **Support:** direct evidence. **Confidence:** high. “Termius for remote access to my Mac” is user-reported; “remote terminal access” is the more precise product-category wording. Do not imply screen sharing, arbitrary GUI control, or that the user’s Mac networking/SSH configuration was inspected.

7. **Claim:** The exact string **“GPT Astra 6” is unverified as an official model name**. No “Astra” or “GPT Astra 6” match appeared in the fetched official model catalog. A focused exact-name search surfaced an OpenAI Community user post, which is not an official product announcement, and third-party reporting using a different spelling. **Sources:** [OpenAI model catalog](https://developers.openai.com/api/docs/models/all). **Support:** direct evidence of the bounded catalog check; absence is not proof of nonexistence. **Confidence:** high that this run did not verify the requested name, not a global nonexistence claim. Do not substitute “GPT-6 Astra,” retain “GPT-5.6 Sol” as supposedly verified, or invent dates/specifications. Planning label: **“GPT Astra 6 — user-requested label; official name pending verification.”** For public copy, prefer model-agnostic wording until confirmed.

## Contradictions
- Search synthesis asserted that no Anthropic Remote Control documentation existed; the directly fetched official Remote Control page disproved that discovery summary.
- Search synthesis asserted an official “GPT-6 Astra” catalog entry, but the fetched catalog contained no Astra match. Reject the summary as verification; exact naming remains unresolved.
- The requested “Codex app” wording and current fetched desktop-page title differ. The evidence does not establish the reason or the user’s installed version.
- Automated `source_check` returned **unclear** for the bundled remote/model-name claim. Final findings rely on direct inspection of original pages; the automated check supplied no independent confirmation.

## Missing evidence
No independent verification of installed apps, exact models, subscriptions, enabled remote/computer-use features, or personal productivity outcomes. cmux/HERDR orchestration and ChatGPT/Claude research usage are user-confirmed statements; HERDR internals were intentionally not researched. No private repositories, credentials, or employer details were inspected. Cowork-specific GUI/remote feature eligibility was not resolved within this bounded pass, so no universal claim is warranted.

## Sources
Kept seven original sources:
- [Claude Code Remote Control](https://code.claude.com/docs/en/remote-control) — local execution, CLI entry points, prerequisites.
- [How we contain Claude across products](https://www.anthropic.com/engineering/how-we-contain-claude) — differentiates Claude chat, Code, and Cowork environments.
- [OpenAI desktop app documentation](https://developers.openai.com/codex/app/) — desktop scope and observed naming mismatch.
- [OpenAI Remote connections](https://learn.chatgpt.com/docs/remote-connections) — native remote capabilities and availability caveats.
- [OpenAI All models](https://developers.openai.com/api/docs/models/all) — bounded official model-name check.
- [What is Flow?](https://docs.wisprflow.ai/articles/2772472373-what-is-flow) — dictation definition and platform differences.
- [Termius](https://termius.com/) — SSH-client definition.

Rejected/deprioritized:
- Search-provider synthesized answers — contradicted by inspected originals on material points.
- OpenAI Community posts and third-party Astra reporting — not official model-name verification.
- [Introducing the Codex app](https://openai.com/index/introducing-the-codex-app/) — original fetch returned HTTP 403; not used as evidence.
- Generic connector tutorials and marketing performance figures — unnecessary for portfolio terminology.

## Next steps
Before publishing exact model/app names, obtain the user’s non-sensitive displayed label or an official model link. Otherwise publish the workflow with model-agnostic wording and qualify remote/computer features as supported and enabled in the user’s setup. No application edits were made.
