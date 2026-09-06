# Research: Employer-facing intermediate developer criteria

## Summary
Two independent, live first-party frameworks support assessing delivery scope, technical judgment, quality/security, collaboration, and production responsibility—not years of experience or a fabricated ATS score. GitLab explicitly names an Intermediate Backend role; UK Government calls its comparable non-junior/non-senior role “Developer.” These are useful reference points, not universally equivalent titles; SFIA 9 PROG levels 3/4 describe skills and responsibility, not universal job-title mappings.

## Findings

1. **Claim: Independent delivery should be demonstrated at a bounded scope, with sensible escalation—not presented as needing no help.** **Sources:** [GitLab Intermediate Backend framework](https://handbook.gitlab.com/handbook/engineering/careers/matrix/development/dev/backend/intermediate/), [UK Government Software developer, Developer section](https://ddat-capability-framework.service.gov.uk/role/software-developer#developer). **Support:** direct evidence. **Confidence:** high.
   - GitLab: “Independently plans, estimates and, delivers small and moderate solutions.” Also: “Seeks guidance when blocked and iterates to a solution.”
   - GitLab: “Able to tackle all but large issues independently. Large issues with provided clear requirements and design implementation require little effort, issues that are not clearly defined require team assistance.”
   - Government: “A developer delivers software components that form part of a product.” Its responsibilities include “develop software to meet user needs.”
   - **Researcher inference for resume review:** Look for a shipped feature/component, the applicant’s own scope, and how requirements became implementation. Do not demand independent ownership of an entire product or organisation-wide architecture.

2. **Claim: Judgment includes alternatives, trade-offs and appropriate design—not just a technology inventory.** **Sources:** [GitLab](https://handbook.gitlab.com/handbook/engineering/careers/matrix/development/dev/backend/intermediate/), [Government](https://ddat-capability-framework.service.gov.uk/role/software-developer#developer). **Support:** direct evidence. **Confidence:** high.
   - GitLab expects “ideating options, identifying the consequences of each option, evaluating trade-offs and seeking advice from others when necessary.” It also expects small-scope proposals that define a problem, offer alternatives and propose a solution.
   - Government Developer systems-design skill: “design systems characterised by managed levels of risk, manageable business and technical complexity, and meaningful impact”; “work with well understood technology and identify appropriate patterns.”
   - **Researcher inference:** A strong bullet or supporting interview example explains why an API, data model, integration, migration or UI approach was chosen under real constraints.

3. **Claim: Testing, security and reviews are substantive expectations, not optional polish.** **Sources:** [GitLab](https://handbook.gitlab.com/handbook/engineering/careers/matrix/development/dev/backend/intermediate/), [Government](https://ddat-capability-framework.service.gov.uk/role/software-developer#developer), [SFIA 9 PROG](https://sfia-online.org/en/sfia-9/skills/programming-software-development). **Support:** direct evidence. **Confidence:** high.
   - GitLab: “Considers quality, security, and performance of assigned tasks”; “Performs thorough reviews within their domain and provides helpful feedback to team members”; “Ensures appropriate security mechanisms are implemented using Authentication and Authorization.”
   - Government: “write clean, secure and well-tested code.” Its Developer information-security skill includes “design solutions and services with security controls included, specifically engineered to mitigate security threats.”
   - SFIA PROG 3: “Designs, codes, verifies, tests, documents, amends and refactors moderately complex programs/scripts”; “Applies agreed standards, tools and security measures to achieve a well-engineered result”; “Collaborates in reviews of work with others as appropriate.”
   - SFIA PROG 4: “Designs, codes, verifies, tests, documents, amends and refactors complex programs/scripts and integration software services”; “Contributes to the selection of the software development methods, tools, techniques, and security practices”; “Participates in reviews of own work and leads reviews of colleagues' work.”
   - **Boundary:** These SFIA descriptions offer evidence vocabulary; neither level is a universal synonym for mid-level, nor should every candidate be required to satisfy all of level 4.

4. **Claim: Collaboration and production responsibility distinguish delivered engineering from merely writing code.** **Sources:** [GitLab](https://handbook.gitlab.com/handbook/engineering/careers/matrix/development/dev/backend/intermediate/), [Government](https://ddat-capability-framework.service.gov.uk/role/software-developer#developer). **Support:** direct evidence. **Confidence:** high.
   - GitLab: “Able to monitor the health of API and Database using Monitoring Tools”; “Able to debug issues that occur in the Production Environment.” It also requires clear communication with peers/counterparts and regular domain code reviews.
   - Government: “operate the services you build and identify issues in production”; “coach and mentor more junior colleagues.” Its Developer service-support skill is working-level: “help fix service faults following agreed procedures.”
   - **Employer-specific:** Government explicitly requires mentoring; GitLab has its own communication/value conventions and backend/database requirements. Neither establishes a universal on-call, incident-command or people-management requirement.

5. **Claim: Resume evidence should connect relevant work to factual contributions and results.** **Sources:** [MIT Resumes](https://capd.mit.edu/resources/resumes/), [Harvard Creating a Strong Resume](https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/). **Support:** direct evidence; application to developer assessment is interpretation. **Confidence:** high.
   - MIT: “Use the position description to decide what to include”; “Record accomplishments and contributions, not just responsibilities”; “Quantify if you can.” MIT also advises describing how tasks were performed and including collaboration/communication.
   - Harvard: “Specific rather than general”; “Fact-based (quantify and qualify)”; “Written for people who / systems that scan quickly.” “Not demonstrating results” is listed among its top resume mistakes.
   - **Researcher inference:** Assess bullets as problem → personal contribution → technical approach → verified result. Numbers are helpful when defensible, not mandatory. A released capability, resolved failure, eliminated manual step, or stakeholder acceptance can establish a concrete qualitative outcome. These sources do not justify inventing percentages, ownership or impact.

6. **Claim: Parsing reliability is separate from an assessment of engineering ability or hiring probability.** **Source:** [Greenhouse: Unsuccessful resume parse](https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse). **Support:** direct evidence for parser behavior; distinction is interpretation. **Confidence:** high.
   - Greenhouse defines parsing as scanning a resume and “auto-fills appropriate fields with information it detects.” It states: “Greenhouse Recruiting can't parse resumes larger than 2.5MB.”
   - Listed potential formatting problems include graphics/photos, image uploads rather than documents, tables/headers/footers, contact details in headers/footers/text boxes, columned layouts, and unclear sections.
   - Failed parsing can leave the resume attached and require manual field entry; partial parsing can require correction. **Do not translate these cautions into automatic rejection, a universal ATS ban on PDFs/columns, or a numerical ATS score.** A straightforward text-based document and clear sections are a conservative recommendation, not a hiring guarantee.

## Contradictions
No direct contradiction found. There are important scope differences: GitLab pairs independent small/moderate delivery with “Requires supervision to deliver projects in time,” while Government scopes Developer work to product components and places broader service integration at Senior. Interpret independence as bounded task/feature autonomy, not unsupported project-wide autonomy. SFIA level 4 adds complex integrations and leading reviews; it should not silently inflate the minimum for every intermediate role.

## Missing evidence
- No universal mid-level standard, three-year promotion threshold, hiring probability or ATS score is established by these sources.
- Candidate capability cannot be concluded without actual work examples and a target job description. Missing resume evidence is not proof of missing skill.
- Government page reports last updated 29 August 2025. GitLab/SFIA and guidance pages were fetched live; no unverified publication/update dates are asserted. SFIA source explicitly identifies version 9.
- Automated `source_check` returned “unclear” for the GitLab/SFIA and Greenhouse claims despite relevant passages. Validation therefore relies on direct inspection of the fetched original pages and the exact excerpts above, not automated corroboration.

## Evidence questions for a ~3-year full-stack developer
1. Which feature did you personally take from agreed requirements through frontend/API/data changes to release? What did you own, and where did you seek review or help?
2. Which design choice involved meaningful alternatives? Explain the constraints, rejected option and trade-off, and how you know the chosen approach worked.
3. What tests and security controls did you implement for a real failure/risk? Which regression, access-control issue or edge case did they address?
4. What production issue did you diagnose using logs, monitoring or reproduction? What fix and verification followed, and how was recurrence reduced?
5. How did review or collaboration with another developer, designer, product partner or user change the implementation? What factual user/business/operational result can you safely substantiate?

## Sources
Kept (six original sources):
- [GitLab Dev Career Framework: Intermediate Backend Engineer](https://handbook.gitlab.com/handbook/engineering/careers/matrix/development/dev/backend/intermediate/) — explicit employer level, delivery/judgment/quality/operations expectations.
- [Government Software developer](https://ddat-capability-framework.service.gov.uk/role/software-developer) — independent published role family and level-specific skill requirements.
- [SFIA 9 Programming/software development](https://sfia-online.org/en/sfia-9/skills/programming-software-development) — exact PROG 3/4 skill descriptions, without title equivalence.
- [MIT Resumes](https://capd.mit.edu/resources/resumes/) — targeted, specific accomplishment-based evidence.
- [Harvard Creating a Strong Resume](https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/) — fact-based language and demonstrable results.
- [Greenhouse Unsuccessful resume parse](https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse) — product-specific parsing limitations, not an ATS scoring model.

Rejected/deprioritized: GitLab generic backend job library (redundant with its level-specific matrix); SFIA worked example (unnecessary and risks overgeneralising a career trajectory); ResumeGeni Greenhouse ATS Resume Guide (secondary/SEO source, official documentation available).

## Next steps
Apply these dimensions to the actual resume and target vacancy using “demonstrated / partially evidenced / not evidenced,” with citations to the applicant’s bullets—not arbitrary weighted scores. Request confirmation only for the most important ownership, release and outcome gaps.
