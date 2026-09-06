# Résumé reassessment: intermediate full-stack developer

## Verdict and method

The current résumé supports applying for intermediate full-stack roles. Its strongest evidence is cross-layer professional work plus independent products with explicit security, data, and testing decisions. It still communicates technology breadth more clearly than bounded professional ownership, observable outcomes, and production responsibility.

This is an assessment of the résumé’s evidence, not a certification of the candidate’s level or employment history. Missing evidence does not establish missing capability. The ratings below are editorial judgments against published criteria, not an official employer score or a hiring-probability model.

Method: independent primary-source research and a separate read-only content review, synthesized with parent-run browser/PDF measurements, unauthenticated link checks, and inspection of public repository READMEs. No résumé/application files changed during this reassessment.

Source snapshot:
- `src/content/resume.ts`: SHA-256 `5fddb983d5bf66d5d0e04e7c07a26fea5076a20006c5add06cb776282e9ec00a`
- `src/app/resume/page.tsx`: SHA-256 `fd329a5470ba0c3ddfc639921218c38387e4e08e087a39ffa28bc4de4b0da112`
- Checks performed in the session on 7 September 2026, local time.

## Published criteria

See [the detailed primary-source brief](intermediate-developer-criteria.md).

1. [GitLab Intermediate Backend framework](https://handbook.gitlab.com/handbook/engineering/careers/matrix/development/dev/backend/intermediate/): small/moderate delivery, appropriate escalation, design trade-offs, quality/security/performance, code review, and production diagnosis.
2. [UK Government Developer framework](https://ddat-capability-framework.service.gov.uk/role/software-developer#developer): components meeting user needs, clean/secure/tested code, appropriate system design, service operation and collaboration.
3. [SFIA 9 Programming/software development](https://sfia-online.org/en/sfia-9/skills/programming-software-development): design, code, verification, testing, documentation, refactoring and reviews at responsibility levels 3/4. These are not universal equivalents of intermediate job titles.
4. [MIT résumé guidance](https://capd.mit.edu/resources/resumes/) and [Harvard résumé guidance](https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/): relevance, specific factual contributions, results, readable presentation. MIT’s quantification guidance is conditional: “Quantify if you can.”
5. [Greenhouse parsing documentation](https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse): actual vendor-specific parsing risks and a 2.5 MB size limit, not ATS ranking or automatic rejection rules.

There is no universal intermediate title definition, minimum three-year threshold, optimal résumé score, or interview-rate benchmark established by these sources. Employer-specific mentoring or review-leadership expectations must not become universal requirements for this candidate.

## Measured document checks

| Check | Observed result | Interpretation |
|---|---|---|
| A4/Letter length | 2 pages each | Fixes the previous 4-page export; two pages is an editorial choice, not a universal ATS rule. |
| PDF size | 158,005 bytes A4; 158,016 bytes Letter | Below the documented Greenhouse 2.5 MB parsing limit. |
| Text | Selectable, extracted in a sensible overall section sequence | Basic extraction smoke test passed; not a vendor-certified parsing test. |
| PDF tagging | Tagged: yes | Not proof of complete PDF accessibility or PDF/UA compliance. |
| Main print text | Experience 10pt; summary 10.5pt | Readable base size; no attempt to force one page by shrinking body text. |
| Metadata/link print text | 9pt | Below MIT’s 10pt recommendation; an optional readability improvement, not proof of ATS failure. |
| Margins | CSS declares 14mm, approximately 0.55 inches | At least MIT’s suggested half-inch margin. |
| Layout | No page overflow at 390px or 1440px | Browser reflow checks passed. |
| Content inventory | 2 professional roles, 6 professional bullets, 3 internships, 4 products, 1 labeled capstone | Counts describe coverage; no optimal inventory is claimed. |
| Link inventory | 4 source links, 3 live product links | One source destination is unavailable publicly; see below. |

No score is assigned for word count, number of frameworks, number of products, or GitHub contribution totals. Those are not validated proxies for intermediate engineering ability.

## Intermediate evidence matrix

| Published expectation | Assessment of résumé evidence | Specific evidence / gap |
|---|---|---|
| Deliver useful software across an assigned scope | Demonstrated in stated work | React/API/MSSQL/integrations, Salesforce application, crew-management services. Scope of individual decision authority is not explicit. |
| Plan and independently deliver bounded work; seek help appropriately | Partially evidenced | Independent product ownership is explicit. Professional requirements-to-release ownership, estimation and review boundaries are not described. |
| Make appropriate design decisions and explain trade-offs | Partially evidenced | Service/database boundaries, approval gates, CMS separation and static/incremental rendering show decisions. Alternatives, constraints and why the chosen approach fit are mostly absent. |
| Test and secure software | Demonstrated most clearly in products | Relay permissions/workflow testing and Roleway access control/approval/encryption claims. Public READMEs corroborate documented capabilities; this audit did not execute their tests or certify their security. Professional quality practices are less visible. |
| Collaborate and participate in review | Partially evidenced | Frontend–QA collaboration through Swagger/Postman is explicit. Peer code review and requirements discussion are not explicit in this résumé. Shared content includes WCAG guidance and reviewing AI-assisted changes, which can safely be restored at that same scope. |
| Support software in production | Partially evidenced | Production features, Docker, performance fixes and release review are mentioned. Monitoring, diagnosis method, deployment responsibility and recurrence prevention are not specified. On-call ownership is not assumed necessary. |
| Connect implementation to user/operational results | Partially evidenced | Better stored-data consistency, lower latency, and CMS updates without source edits are useful qualitative outcomes. How the first two were observed is unspecified. Exact metrics are optional, not mandatory. |

The major improvement is not adding a label reading “intermediate.” It is making existing evidence of trusted feature delivery easier to evaluate.

## Priority findings

### 1. Fix the public evidence path before sending applications

**ACSFI:** The source link returned HTTP 404 in public page and API checks; its live website returned 200. The user subsequently confirmed that the repository is private. Its URL is intentionally omitted from this report and has been removed from portfolio content, résumé links, and structured metadata. Retain only the live website link; do not expose private code.

**Viya:** The public repository returned 200, but its default-branch README begins “This project was created with Better-T-Stack” and presents generic framework/setup information rather than the travel-workspace story. That weakens the immediate evidence an employer sees after clicking. It is not evidence that the application is only a template.

Verified README: [Viya default-branch README](https://github.com/vn-aj-vngrd/viya-app/blob/van/viya-mvp-core-foundation/README.md).

Recommendation: in a separately authorized change to that repository, explain what Viya does, personal contribution, prototype status, screenshots/demo, key architecture/security decisions, and how to run checks. Preserve honest stack/template attribution.

**Other destinations:** Relay and Roleway repositories, Viya repository, and all three live product URLs returned 200. This verifies reachability only—not complete application behavior, adoption or quality.

### 2. Add one strong professional ownership example

Locations: `src/content/resume.ts:23–30`.

The current bullets describe delivery, but do not show the boundary between work personally planned/implemented, decisions reviewed by others, and broader team responsibility. GitLab’s intermediate expectations explicitly support bounded independence with appropriate help, not sole ownership of everything.

Ask for one feature: original user problem, personal scope, API/data/UI changes, technical choice, review/QA/release involvement, and an observable outcome. Convert that into one or two concise bullets. Never infer project leadership or production ownership from Docker usage.

### 3. Make outcomes concrete without inventing numbers

Locations: `src/content/resume.ts:24–25`.

“Improved stored-data consistency” and “reduce latency” lack a visible observation. Ask what inconsistency disappeared and how query/integration improvement was verified. A reproducible timeout resolved, removed manual step, successful reconciliation, accepted workflow, or specific query bottleneck can be stronger than an unsupported percentage.

A fill-in structure, not publishable factual copy: “Implemented [capability] across [owned layers], using [technical decision] to address [specific problem]; verified through [test/observation/accepted workflow].”

### 4. Prioritize employer-relevant evidence over historical completeness

Locations: `src/app/resume/page.tsx:77–91`, print `.resume-products` break.

All three internships still precede the strongest independent product evidence. For intermediate full-stack applications, move product evidence ahead of older internships, or put a short, specific product proof in the opening summary. Recheck pagination after any reordering; merely moving Products while retaining the forced page break can produce an unintended third page.

For web roles, Relay/Roleway and the live ACSFI website are generally more directly aligned than the mobile prototype. That ordering recommendation is editorial judgment, not an employer consensus or a reason to remove requested products silently.

### 5. Resolve truthful targeting and timeline ambiguities

- C# is absent from Languages despite prominent ASP.NET Core. Confirm whether C# was used before adding it. Do not list it merely to satisfy keywords.
- Preserve official role titles. A targeted headline such as “Full-Stack Software Developer — React, TypeScript & ASP.NET Core” can clarify the intended market without inventing an employment title.
- Create truthful React/Node and React/.NET selections when actual postings justify them; a single broad résumé is a master version, not an exact match to every full-stack vacancy.
- Keep existing dates. Ask how NextDevs, the Full Scale internship, and university work overlapped before adding “part-time,” “contract,” or another explanation.

## Public corroboration boundaries

- [Relay README](https://github.com/vn-aj-vngrd/relay/blob/master/README.md) documents implemented database-backed workflows, tested permission/domain rules and quality commands. It also describes some continuing work, so do not portray every planned management feature as complete.
- [Roleway README](https://github.com/vn-aj-vngrd/roleway/blob/main/README.md) documents approval-gated internal agent changes, row-level security, ownership constraints, encryption configuration and end-to-end coverage.
- READMEs are first-party documentation, not independently executed proof of all claims. Employer history is consistent with local confirmed content, not independently verified through external records.

## Measures that actually test employer response

Use a simple application log rather than a commercial “ATS score.” Record vacancy/role family, seniority, eligibility constraints, source/referral, résumé version, sent date, and stage reached.

- **Application-to-screen rate:** recruiter screens divided by submitted applications in the same sufficiently aged, eligible cohort.
- **Screen-to-technical-interview rate:** technical interviews divided by completed recruiter screens in that cohort.

Always retain counts and denominators, not just percentages. Separate referred applications from cold applications and materially different role/location requirements. Pending applications are not yet final failures. Small samples are noisy, and these observational rates cannot isolate résumé effects from fit, market conditions, timing, work authorization or interviews. No universal target percentage is asserted.

## Three highest-value confirmation questions

1. What feature did you personally take from requirements through implementation and release, and what review/help did you receive?
2. What production or performance problem did you diagnose, how did you verify the fix, and what can be publicly described?
3. Did your ASP.NET Core work use C#, and should this résumé lead with React/.NET or React/Node?

Resolve ACSFI’s public link separately before distribution. No need to invent additional achievements or advertise a higher level than the evidence supports.
