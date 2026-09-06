# Résumé employer audit

## Scope and evidence

Audited the current local `/resume` after the Products/link and print skip-link changes. This is a content and employer-readability audit, not a prediction of interview rates or a certified ATS test. No résumé content was changed during this audit.

Evidence: `src/app/resume/page.tsx`, `src/content/profile.ts`, `src/content/experience.ts`, `src/content/projects.ts`, résumé CSS, desktop/mobile browser captures, and a Chromium PDF generated with `preferCSSPageSize: true`.

- A4 PDF: **4 pages**, 594.96 × 841.92 points. The default Letter export also produced 4 pages.
- Products first appear on page 3. Core stack and Education alone occupy page 4.
- Browser text count: approximately 762 words; Experience accounts for 484.
- PDF text is selectable/extractable. Layout-preserving extraction interleaves the adjacent Skills/Education columns. This demonstrates a reading-order risk, not proof that a particular ATS will reject it.
- Existing desktop and 390px browser checks found no horizontal overflow. Product links are visible in the PDF; skip link is absent.
- Scoped UI detector: no findings for `src/app/resume/page.tsx`. This does not validate hiring effectiveness or PDF parsing.

## Verdict

The underlying experience and public product evidence are stronger than the current résumé communicates. The document is an exhaustive portfolio export rather than a targeted application résumé. Prioritize evidence selection and print hierarchy, not decorative redesign.

## Priority findings

### P1 — Four pages dilute the strongest evidence

Locations: `src/app/resume/page.tsx:50`, `src/app/resume/page.tsx:59`, `src/app/globals.css:1213`, `src/app/globals.css:1216`, print rules.

All six experience records receive a summary and up to three bullets, regardless of relevance or seniority. Large screen-oriented section and entry spacing also persists into print. The 2022 internship receives space ahead of independently built products.

Recommendation: target two readable pages for the general application version; create a one-page variant only when appropriate to the vacancy. Cut repetition and older-role detail before reducing type. Keep current/recent professional roles prominent; compress internships to short entries. Avoid an isolated final section/page. Preserve the complete history on the portfolio.

### P1 — Employment classification and overlapping dates need clarification

Locations: `src/app/resume/page.tsx:50–56`, `src/content/experience.ts`.

The content already identifies NextGig as `kind: "Capstone"`, but the résumé omits `kind`, placing “Full-Stack Developer, NextGig — University of San Carlos” among professional roles. NextDevs (Apr 2023–Apr 2024), the Full Scale internship (Sep 2023–Jan 2024), and NextGig (Aug–Nov 2023) overlap.

Recommendation: explicitly label NextGig “University capstone” or move it under education/projects. Keep the dates intact. Ask whether the overlapping professional work was part-time, contract, or another arrangement before adding any such label. Confirm whether “Full Scale” and “Full Scale Teams PH” should use a consistent employer name; do not merge them by inference.

### P1 — Bullets repeat responsibilities rather than isolate contributions

Locations: `src/content/experience.ts`, résumé highlight selection at `src/app/resume/page.tsx:59`.

The current-role summary and first bullet both describe React/API/MSSQL/integration coverage. “Worked across implementation and QA” describes participation, while the detail contains the more useful evidence. “Improved performance” is plausible but vague without a concrete bottleneck or supported outcome.

Recommendation: use action + specific system/problem + implementation + confirmed result. Prefer 3–4 differentiated bullets for the current role, 2–3 for the prior professional role, and compact earlier experience. Do not simply select the first three shared portfolio highlights. Numbers are useful only when known and permitted to disclose; observable nonnumeric outcomes are valid.

Safe editing example using existing content (not a new metric): “Built NestJS APIs with Fastify and Prisma for crew-management workflows, connecting service logic to typed database access.”

For a stronger performance bullet, ask what was slow, what changed, and how improvement was established. Do not invent a percentage, user count, revenue, or sole ownership.

### P2 — Product descriptions omit existing ownership and engineering evidence

Locations: `src/app/resume/page.tsx:71–75`, `src/content/projects.ts`.

The résumé uses product-marketing summaries and complete stack lists but omits `role`. The catalog explicitly records independent design/build ownership for Relay, Roleway, and Viya. It also contains concrete authorization, testing, approval, and CMS evidence that communicates engineering judgment more strongly than a long technology list.

Recommendation: keep the requested “Products” heading. Describe ownership, user problem, and one distinctive implementation decision in 1–2 lines per product. Retain source and available live URLs. For a generic web role, lead with Relay/Roleway and the live CMS-backed ACSFI website; emphasize Viya for mobile roles. This ordering is a recommendation, not a reason to remove products without approval.

Candidate wording based on existing catalog facts: “Independently designed and built Relay, a pickleball session app covering RSVPs, court rotations, scoring, and shared expenses; implemented server-side authorization and automated workflow tests.” Reconfirm against the public repository before final publication.

### P2 — Role fit and core skills are too far apart

Locations: `src/content/profile.ts`, `src/app/resume/page.tsx:41–45`, `src/app/resume/page.tsx:94–104`.

The profile is broad, repeats location from the header, and spends prominent space on coding-agent process. Skills are on page 4. The document does not distinguish a React/Node application from an ASP.NET Core application.

Recommendation: a 2–3-line summary, followed by a compact “Technical Skills” section. Tailor emphasis using truthful experience, not keyword stuffing. For general full-stack vacancies, lead with shipped software, APIs, data, and verified delivery; reserve extended AI-workflow explanation for the portfolio. For AI-product roles, Roleway’s approval/permission model is more concrete evidence than merely listing coding tools.

### P2 — Print contact details and extraction order can be improved

Locations: `src/app/resume/page.tsx:31–37`, `src/app/resume/page.tsx:94`.

The header shows “GitHub” and “LinkedIn” without visible URLs and omits the portfolio URL. Hyperlinks may remain clickable electronically but labels alone are less useful on paper. The final two-column block interleaves in layout-preserving text extraction.

Recommendation: show a compact portfolio URL and GitHub handle/URL in the header, preserving actual destinations. Use a verified shorter LinkedIn vanity URL only if one exists. Keep Skills and Education in a straightforward sequential layout for the application PDF. Follow each employer’s accepted file-format instructions; do not claim that all ATS systems behave alike.

## Research cross-check

See [the primary-source research note](resume-employer-guidance.md).

- [MIT CAPD](https://capd.mit.edu/resources/resumes/) recommends one page by default with exceptions, relevant experience selection, personal projects, and quantification “if you can.” My two-page proposal is specific to preserving this candidate’s requested product coverage, not a universal rule for three years of experience. A more selective one-page application version is also reasonable.
- [Harvard MCS](https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/) supports factual, tailored, result-oriented writing and checking PDF conversion.
- [Greenhouse](https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse) documents parsing risks from complex formatting and columns. Local text extraction is only a smoke test, not an ATS certification.
- [Harvard’s AI guidance](https://careerservices.fas.harvard.edu/ai-resumes-and-cover-letters/) emphasizes verification, authenticity, and privacy. My recommendation to reduce AI-tool prominence for ordinary full-stack roles is editorial judgment, not a claim of employer consensus.

## Proposed two-page hierarchy

1. Name, truthful target-role headline, location, email, portfolio, GitHub, LinkedIn.
2. Brief role-specific professional summary.
3. Technical Skills, grouped into languages, application stack, data, and delivery/testing; only relevant supported skills.
4. Professional Experience: recent roles with distinct contribution bullets.
5. Products: concise ownership + problem + engineering evidence, source/live links.
6. Earlier Experience: compressed internships; adjust position if vacancy makes one especially relevant.
7. Education; capstone explicitly labeled if retained.

Page 1 should establish role fit and strongest professional evidence. Page 2 should substantiate product engineering, then close with concise earlier experience and education. Final pagination must be tested rather than assumed from this outline.

## Preserve

- Real public source and deployed product links.
- Straightforward typography and mostly single-column reading flow.
- Semantic headings and selectable PDF text.
- Removal of GitHub activity counts from the résumé; counts are not a substitute for contribution evidence.
- Confidentiality boundaries and existing confirmed facts.

## Questions before rewriting

1. Which application should lead: React/Next.js/Node full-stack, React/ASP.NET Core full-stack, or React Native/mobile?
2. What explains the 2023 overlap—part-time, contract, or another arrangement? Keep the existing dates unless corrected by the user.
3. Which outcomes can be publicly described for Salesforce, database/integration performance, or release work? Concrete examples are enough; metrics are optional.

## Implementation boundary

Use a dedicated typed résumé content module under `src/content/` to curate role/product bullets, instead of changing shared homepage copy or silently trimming the global catalogs. Print CSS should be scoped and verified at A4 and Letter. No commit, deployment, or résumé rewrite is part of this audit.
