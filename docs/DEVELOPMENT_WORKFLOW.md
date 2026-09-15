# Development workflow

This is the authority for human and agent contribution, review, and release behavior. Portfolio uses Relay and Roleway's PR workflow with `main` as the integration branch.

## Start and implement

1. Inspect the working tree and open PRs. Preserve inherited changes.
2. Fetch `origin/main`. Start independent work from that ref on `van/<short-kebab-case-description>`, such as `van/project-search`. Put ticket references in commit and PR bodies. Existing Dependabot, Renovate, and ImgBot branches retain their generated names.
3. Continue review fixes on their existing PR branch. Keep independent changes in separate PRs. Update a published branch by merging `origin/main`; preserve published history unless rewriting is explicitly authorized.
4. Use the dev-first loop in `AGENTS.md`. Exercise affected behavior and record actual results.

## Commit and open a PR

1. Use the Node version in `.nvmrc` and the package manager pinned in `package.json`. Dependency installation installs Lefthook in a local Git checkout; run `yarn setup:hooks` when hooks need reinstalling.
2. Stage a coherent change and commit with hooks enabled. The hooks check staged formatting, branch names, lint, types, tests, and the commit subject. Fix failures and restage before retrying. They validate the message rather than inventing a summary or silently changing staged content. The push hook blocks any destination named `main`, including deletion and `feature:main` refspecs; GitHub protection is the server-side enforcement.
3. Use `<type>(optional-scope): Summary` for commits, PR titles, and squash subjects. Supported types are defined in `scripts/workflow-rules.mjs`. Use an imperative, sentence-case summary, at most 72 characters, without a trailing period. Example: `feat(work): Add project search`. Scope is optional. Ticket references belong in the body. Generated merge/revert messages are accepted only for branch maintenance.
4. For incompatible changes, add `!` before the colon and a `BREAKING CHANGE: <impact and migration>` footer in the PR body. The squash message preserves that body.
5. Push the named feature branch and open a PR against `main`. Requested implementation work may be prepared as a commit and PR; merging and production deployment need explicit user authorization. Use `.github/pull_request_template.md` and describe final behavior, concrete test evidence, risks, and dependencies. Keep every section in order; use `None` where appropriate and label unrun checks.

**Ready for review:** the PR has valid metadata, all changed files are intentional, local checks passed, and the handoff links the PR with any failing or pending hosted checks.

## Review and merge

1. Inspect checks and every review finding on the current PR head. Fix valid findings, explain the change with evidence, and resolve the addressed conversation. Explain why an inapplicable finding does not apply before resolving it. Read general PR comments as well as inline threads; a resolved thread alone does not prove the fix is correct.
2. After each push, inspect new findings and rerun failed checks. Obtain reviewer approval or an explained dismissal for a blocking changes-requested review. Treat new commits as invalidating earlier approval evidence.
3. Merge only after explicit user authorization, passing required checks for the current head, an up-to-date base, and resolved review conversations. Use **Squash and merge**, with the validated PR title unchanged as the subject and PR body as the message. Check the generated message before confirming.
4. Verify main CI, the GitHub release, and Vercel production independently. Report each result separately. Begin the next task from freshly fetched `origin/main`.

GitHub settings require PRs, up-to-date checks, resolved conversations, and linear history for `main`, including administrators. Force pushes and branch deletion are disabled. Only squash merging is enabled, with PR title/body defaults. Required checks are `PR conventions`, `Lint, types, tests, and build`, `Analyze JavaScript and TypeScript`, `CodeQL`, and `Vercel`. The solo-maintainer setup has no additional required reviewer count; review findings and agent merge authorization still apply. GitHub's conversation gate covers resolvable review threads; agents must also handle findings in general comments.

The intended GitHub settings are recorded in `.github/repository-settings.json`. That file is a reviewable configuration record; apply changes through the authenticated GitHub API or settings UI and read back the live settings to verify them.

## CI and releases

CI validates PR names, branch names, descriptions, and human-authored commits, including after title/body edits. It checks formatting on files changed by the PR or push, runs full lint/type checks and workflow regression tests, and builds without production credentials. Existing unrelated formatting is outside this migration. CodeQL scans JavaScript/TypeScript on PRs, main pushes, and weekly. Both scan completion and the separate CodeQL findings result are required; review findings alongside ordinary comments.

`.releaserc.json` owns version rules: breaking changes are major, `feat` is minor, and other supported types are patch releases. Semantic-release creates version tags and GitHub release notes after successful main push CI, using the tested SHA. It checks main before setup and again immediately before invoking semantic-release, skipping superseded heads. Main can still advance during publication; a release tag continues to identify its tested SHA. PR CI cannot invoke the privileged release job. The job uses the scoped GitHub Actions token and never commits version bumps to `main`.

Like Relay and Roleway, **Git tags are the release version source of truth**; `package.json` remains development metadata. With no prior release tag, the first release is `v1.0.0`. Future releases derive their bump from the squash commit. Preserve published tags; versions and release notes are automated. Local branch commits validate intent, but only the final squash message determines the released version.

Vercel's Git integration runs independently of Actions and may deploy a merge while main CI runs. Release creation does not prove production readiness. Manual deployments use the deployment skill, after release authorization, from the reviewed main revision. A failed release is repaired by inspecting its Actions logs and rerunning after correction; preserve any existing published tag and verify its SHA before recovery.

**Release complete:** the authorized merge is recorded, main CI and release succeeded for the expected SHA, and the canonical site serves the matching Ready Vercel deployment with affected journeys verified. Until the workflow PR merges and executes, release automation is configured but unproven.
