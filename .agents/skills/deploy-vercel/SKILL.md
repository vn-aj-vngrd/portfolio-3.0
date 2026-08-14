---
name: deploy-vercel
description: Deploy Portfolio 3.0 to its production Vercel project and verify the canonical domain. Use only when the user explicitly asks to deploy or release to Vercel.
compatibility: Agent Skills-compatible harness with shell access, an authenticated Vercel CLI session, and the repository's existing .vercel link.
---

# Deploy Portfolio 3.0

Run this workflow only after an explicit user request to deploy or release to Vercel. In harnesses with skill commands, the user may invoke `deploy-vercel` directly. Routine development, visual review, commits, and pushes stop before deployment.

## 1. Preflight

From the repository root:

1. Read `.vercel/project.json` and confirm it links to the `portfolio` project.
2. Run `git status --short` and `git diff --check`.
3. Run `corepack yarn lint`.
4. Confirm required server environment variables by name only. Never print secret values.

Do not run a local production build. Vercel performs the production build once during deployment.

If lint or diff checks fail, stop. Fix the cause and rerun the failed check before continuing.

## 2. Deploy once

```bash
npx vercel@latest --prod --yes --scope van-aj-vanguardias-projects
```

Treat the Vercel build as the production build. If it fails, diagnose the reported failure and make a concrete code or configuration change before retrying.

## 3. Verify production

Verify all of the following:

- The deployment reaches `READY`.
- Vercel aliases it to `https://vanajvanguardia.vercel.app`.
- The canonical homepage returns HTTP 200.
- Every route changed in the current work returns its expected status and identifying content.
- Browser QA on the changed interface shows no page-level horizontal overflow at 390px and 1280px widths.

Do not expose deployment tokens, environment values, private URLs, or GitHub credentials in output.

## 4. Report

Return:

- canonical production URL
- deployed commit hash, or state clearly that the working tree was deployed
- verified routes
- validation result
- Vercel inspector URL only when useful for a failure

The workflow is complete only when the canonical domain serves the new deployment and every changed route passes verification.
