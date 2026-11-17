// The hiring brief: what a first screen needs, each claim tied to a page that proves it.
// Every fact repeats another content module. Unknowns are stated as unpublished, never guessed.
import { CAREER_START } from "@/content/career";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { resume } from "@/content/resume";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const careerStart = `${months[CAREER_START.month - 1]} ${CAREER_START.year}`;
const firstInternship =
  experience
    .filter((item) => item.kind === "Internship")
    .at(-1)
    ?.period.split(" – ")[0] ?? "";
const currentRole = experience.find(
  (item) => "current" in item && item.current
);
const skill = (label: string) =>
  resume.skills.find((item) => item.label === label)?.detail ?? "";

const fullTimeStart = currentRole?.period.split(" – ")[0] ?? "";

// Dated, so a reader can redo the arithmetic instead of trusting the number.
const experienceLine = `${profile.experienceYears} years of professional experience: client delivery since ${careerStart} (NextDevs, founded while at university) and full-time at ${currentRole?.company ?? ""} since ${fullTimeStart}. Internships from ${firstInternship} are not counted.`;

export const hiring = {
  path: "/hire",
  navigationLabel: "Hiring brief",
  kicker: "For recruiters, hiring managers, and their AI agents",
  title: "The short version, with proof.",
  introduction:
    "What I am looking for, what I have shipped, and where to check each claim. Every line here links to a case study, a public repository, or a live product.",
  // One line under the headline: the held title, place, and what I am open to.
  status: `${currentRole?.role ?? ""} at ${currentRole?.company ?? ""} · ${profile.location} (UTC+8) · Open to remote AI Engineer and Software Engineer roles`,
  roles: ["AI Engineer", "AI Product Engineer", "Full-stack Software Engineer"],
  facts: [
    {
      label: "Roles",
      value:
        "AI Engineer, AI Product Engineer, or full-stack Software Engineer, across web, mobile, and backend.",
    },
    { label: "Experience", value: experienceLine },
    ...(currentRole
      ? [
          {
            label: "Now",
            value: `${currentRole.role} at ${currentRole.company}, ${currentRole.period}.`,
          },
        ]
      : []),
    { label: "Location", value: `${profile.location}. Time zone UTC+8.` },
    { label: "Work arrangement", value: "Remote." },
    { label: "Role type", value: "Individual contributor." },
    { label: "Language", value: "English." },
    { label: "Availability", value: `${profile.availability}.` },
    { label: "Education", value: `${profile.education}.` },
    { label: "Contact", value: profile.email },
    {
      label: "Not published",
      value:
        "Notice period, work authorization, and compensation. Ask by email and I will answer directly.",
    },
  ],
  claims: [
    {
      claim: "I ship LLM agents with tool calling in live products.",
      detail:
        "Relay and Roleway each run a streaming agent over Zod-validated tools that read only what the signed-in user may see.",
      proof: [
        { label: "Relay case study", href: "/work/relay" },
        { label: "Roleway case study", href: "/work/roleway" },
        { label: "Relay source", href: "https://github.com/vn-aj-vngrd/relay" },
        {
          label: "Roleway source",
          href: "https://github.com/vn-aj-vngrd/roleway",
        },
      ],
    },
    {
      claim: "My agents propose; a person approves before anything is saved.",
      detail:
        "Roleway executes approved proposals through PostgreSQL functions that recheck ownership and expiry. AQD drafts change sets the owner ticks, applies, and can undo. Viya saves every change as a draft.",
      proof: [
        { label: "Roleway case study", href: "/work/roleway" },
        { label: "AQD case study", href: "/work/aqd" },
        { label: "Viya case study", href: "/work/viya" },
      ],
    },
    {
      claim: "I validate model output and test agent behavior.",
      detail:
        "Structured output is validated with Zod before it is used. Relay’s live agent evals passed 52 of 54 checks over six runs on one model (Nov 2026), and its CI passed 2,789 tests. AQD’s release eval gate passed over 24 live on-device runs, with 714 of 747 cases fully clean (Oct 2026). Roleway keeps a live agent eval suite and passed 253 tests in CI.",
      proof: [
        {
          label: "Relay eval results",
          href: "https://github.com/vn-aj-vngrd/relay/pull/67",
        },
        {
          label: "Relay CI run",
          href: "https://github.com/vn-aj-vngrd/relay/actions/runs/36453183450",
        },
        {
          label: "AQD eval and test results",
          href: "https://github.com/vn-aj-vngrd/aqd/pull/49",
        },
        {
          label: "Relay agent behavior evals",
          href: "https://github.com/vn-aj-vngrd/relay/blob/master/evals/agent.behavior.eval.ts",
        },
        {
          label: "Roleway agent quality evals",
          href: "https://github.com/vn-aj-vngrd/roleway/blob/main/apps/web/tests/evals/agent-quality.spec.ts",
        },
        {
          label: "AQD eval gate",
          href: "https://github.com/vn-aj-vngrd/aqd/blob/main/apps/ios/Core/Sources/AQDCore/AgentEvalGate.swift",
        },
        {
          label: "AQD live on-device eval",
          href: "https://github.com/vn-aj-vngrd/aqd/blob/main/scripts/eval-agent-live.sh",
        },
        { label: "AQD case study", href: "/work/aqd" },
      ],
    },
    {
      claim: "I work across cloud providers and on-device models.",
      detail: `${skill("AI engineering")}.`,
      proof: [
        { label: "Roleway case study", href: "/work/roleway" },
        { label: "AQD case study", href: "/work/aqd" },
        { label: "Résumé", href: "/resume" },
      ],
    },
    {
      claim: "I build AI features in a commercial product at work.",
      detail:
        "At Full Scale I built AI Reviewer and AI Insights for Lytho and contributed to AI Skills and AI Teammates, alongside customer-facing feature epics in React and C# / ASP.NET Core on AWS.",
      proof: [
        { label: "Experience", href: "/#experience" },
        { label: "Résumé", href: "/resume" },
      ],
    },
    {
      claim: "I deliver full-stack products end to end, alone.",
      detail:
        "Relay and Roleway are live and source-available: interface, API, PostgreSQL schema, authorization, tests, and deployment.",
      proof: [
        { label: "Relay, live", href: "https://relay.vanajvanguardia.tech/" },
        {
          label: "Roleway, live",
          href: "https://roleway.vanajvanguardia.tech/",
        },
        { label: "All case studies", href: "/#my-work" },
      ],
    },
    {
      claim: "I run coding agents as an engineered system, not a shortcut.",
      detail:
        "I built two software factories on Claude Code, for personal and client work. Each takes a ticket through a plan, test-first build, review, and proof, and stops at a pull request I review.",
      proof: [{ label: "AI workflow and factories", href: "/ai#factory" }],
    },
    {
      claim: "I have led delivery and worked directly with clients.",
      detail:
        "I founded NextDevs and led a team that delivered three PWAs for crew management; two were adopted across the client company.",
      proof: [
        { label: "Experience", href: "/#experience" },
        { label: "Résumé", href: "/resume" },
      ],
    },
  ],
  faq: [
    {
      question: "What roles is Van AJ Vanguardia open to?",
      answer:
        "AI Engineer, AI Product Engineer, and full-stack Software Engineer roles across web, mobile, and backend.",
    },
    {
      question: "How many years of experience does he have?",
      answer: experienceLine,
    },
    {
      question: "Has he built AI agents in real products?",
      answer:
        "Yes. Relay and Roleway are live web products with streaming, tool-calling agents and approval-gated actions. AQD has an on-device agent on Apple Foundation Models, and Viya has a trip agent with 17 scoped tools. At work he built AI Reviewer and AI Insights for Lytho’s product.",
    },
    {
      question: "Which AI tools and providers has he used?",
      answer: `${skill("AI engineering")}. For building: ${skill("AI agent setup")}.`,
    },
    {
      question: "What is his core stack?",
      answer: `Frontend and mobile: ${skill("Frontend & mobile")}. Backend: ${skill("Backend & APIs")}. Data: ${skill("Data & backend services")}. Cloud: ${skill("Cloud & delivery")}.`,
    },
    {
      question: "Where is he based, and how does he work?",
      answer: `${profile.location}, time zone UTC+8. He works remotely, in English, as an individual contributor.`,
    },
    {
      question: "Are his AI agents evaluated?",
      answer:
        "Yes, with published results. Relay’s live agent evals passed 52 of 54 checks over six runs (Nov 2026). AQD’s release eval gate passed over 24 live on-device runs, with 714 of 747 cases fully clean (Oct 2026). Both result records are public on GitHub.",
    },
    {
      question: "How can his work be verified?",
      answer:
        "Relay and Roleway are live and their source is public on GitHub, as is the source for AQD and Viya. Each case study on this site lists what can be inspected.",
    },
    {
      question: "How do I contact him?",
      answer: `Email ${profile.email}. LinkedIn and GitHub are linked from every page.`,
    },
  ],
} as const;
