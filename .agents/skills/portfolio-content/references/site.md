# Gear, engineering, AI workflow, design system, SEO

## Gear (`gear.ts`)

`name`, `detail`, `use`, `kind` (a `GearKind`), optional `color`, `featured`. A new `kind` also needs a drawing in `src/components/gear/GearIllustration.tsx`. View `/gear`.

## Engineering (`engineering.ts`)

`engineeringPillars` (title, description, evidence line) and `stackGroups` (title, description, technologies, one `primary`). Every technology listed appears in a project or experience stack. View the homepage Tech section.

## AI workflow (`ai-workflow.ts`)

`aiTools`, `aiWorkflow`, `workflowStages`, `executionContexts`, model preferences. Tool names are used by the résumé, the engineering section, and `profile.introduction` through `aiWorkflow.profileSummary`. View `/ai`, `/resume`, and the homepage Hero.

## Design system (`design-system.ts`)

Tokens and snippets documented at `/design` and `/design.md`. Keep in step with `src/app/globals.css` and `DESIGN.md`.

## SEO and metadata (`src/lib/seo.ts`)

`SITE_TITLE`, `SITE_DESCRIPTION`, `createPageMetadata`. Page titles read `<Topic> | Van AJ Vanguardia`; case studies read `<Name> Case Study`. Descriptions are one concrete sentence with the full name. View the `<title>` of each changed route.
