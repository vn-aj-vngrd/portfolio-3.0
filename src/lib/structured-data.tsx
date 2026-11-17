// schema.org nodes shared by the homepage, résumé, AI page, and case studies.
import { certifications } from "@/content/certifications";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { resume } from "@/content/resume";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/seo";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const currentRole = experience.find(
  (item) => "current" in item && item.current
);

// Every skill named on the résumé, split into single terms.
const skills = [
  ...new Set(
    resume.skills.flatMap((skill) =>
      skill.detail.split(/[,;] /u).map((item) => item.trim())
    )
  ),
];

export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE_NAME,
    url: SITE_URL,
    image: absoluteUrl("/images/profile.jpg"),
    email: `mailto:${profile.email}`,
    // The headline used on every page; the held title is in hasOccupation.
    jobTitle: profile.title.replace(/\.$/u, ""),
    description: profile.statement,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cebu",
      addressCountry: "PH",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of San Carlos",
    },
    ...(currentRole
      ? {
          worksFor: { "@type": "Organization", name: currentRole.company },
          hasOccupation: {
            "@type": "Occupation",
            name: currentRole.role,
            occupationLocation: { "@type": "Country", name: "Philippines" },
            skills: skills.join(", "),
          },
        }
      : {}),
    hasCredential: certifications
      .filter((item) => item.kind.startsWith("Degree"))
      .map((item) => ({
        "@type": "EducationalOccupationalCredential",
        name: item.title,
        credentialCategory: "degree",
        recognizedBy: { "@type": "CollegeOrUniversity", name: item.issuer },
      })),
    seeks: {
      "@type": "Demand",
      name: "AI Engineer, AI Product Engineer, or full-stack Software Engineer role",
    },
    subjectOf: { "@id": `${SITE_URL}/hire#profile-page` },
    sameAs: [profile.github, profile.linkedin],
    knowsAbout: [
      "AI engineering",
      "Large language model applications",
      "AI agents",
      "Software product engineering",
      ...skills,
    ],
  };
}

export function breadcrumbSchema(name: string, path: string) {
  const url = absoluteUrl(path);
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Portfolio", item: SITE_URL },
      { "@type": "ListItem", position: 2, name, item: url },
    ],
  };
}

export function JsonLd({ graph }: { graph: readonly object[] }) {
  const data = { "@context": "https://schema.org", "@graph": graph };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
