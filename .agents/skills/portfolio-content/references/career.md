# Career, résumé, profile, credentials

## Experience (`experience.ts`)

Read by the homepage Experience section and, through `experienceEntry("<exact company>")`, by `resume.ts`.

- Fields: `company` (exact string, unique), `role`, `period`, `kind` (`Professional`, `Internship`, `Capstone`), `current` (true only for the one open role), `summary`, `highlights` (`action` sentence plus `detail`), `resumeBullets`, `stack`.
- `resumeBullets` is the compact résumé wording of the same facts. Edit `highlights` and `resumeBullets` together so they agree on dates, tools, and outcomes.
- A new role goes in reverse-chronological order, and the previous current role loses `current` and gets an end date.
- Touchpoints: `experience.ts`, the matching `experienceEntry(...)` list in `resume.ts` (`professional`, `internships`, `capstone`), `engagementLabels` when an engagement is added, `experienceIntroduction` when the span of work changes, `profile.statement` when years or stack change.

## Résumé (`resume.ts`)

Compiles from other modules; it holds only selection and compact wording.

- `summary`, `skills` (label and detail), `engagementLabels`, and the `professional` / `internships` / `capstone` lists.
- `productSelections`: a few strong products by `slug`, each with a short `description` and `stack`.

## Profile and intro (`profile.ts`)

`name`, `title`, `statement`, `introduction`, `location`, `availability`, `email`, `github`, `linkedin`, `philosophy`, `education`.

- Read by: Hero (`title`, `statement`, `introduction`), About (`philosophy`, `location`, `education`), Contact (`email`, links), the résumé page, and the Person JSON-LD in `src/app/page.tsx`.
- `introduction` includes `aiWorkflow.profileSummary`; change AI wording in `ai-workflow.ts`.
- A change of title, location, or education also reaches `src/lib/seo.ts` (site title and description) and the résumé `summary`.

## Certifications (`certifications.ts`)

`title`, `issuer`, `kind`, optional `href` and `featured` (one featured item). Files live in `public/certificates/` and the `href` matches the file name. Degree dates stay consistent with `profile.education` and the experience periods.

## Pages to view

`/` (Hero, Experience, Credentials, About, Contact), `/resume`, and print preview of `/resume` after résumé edits.
