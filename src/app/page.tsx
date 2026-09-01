import { About } from "@/components/sections/About";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Engineering } from "@/components/sections/Engineering";
import { Experience } from "@/components/sections/Experience";
import { GitHubSnapshot } from "@/components/sections/GitHubSnapshot";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { profile } from "@/content/profile";
import { projectCatalog } from "@/content/projects";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: SITE_NAME,
        url: SITE_URL,
        image: absoluteUrl("/images/profile.jpg"),
        jobTitle: "Full-Stack Software Developer",
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
        sameAs: [profile.github, profile.linkedin],
        knowsAbout: [
          "TypeScript",
          "React",
          "Next.js",
          "React Native",
          "Node.js",
          "ASP.NET Core",
          "PostgreSQL",
          "Software product engineering",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en-PH",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile-page`,
        url: SITE_URL,
        name: `${SITE_NAME} — Full-Stack Software Developer`,
        description: SITE_DESCRIPTION,
        inLanguage: "en-PH",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${SITE_URL}/#person` },
        hasPart: projectCatalog.list().map((project) => ({
          "@type": "CreativeWork",
          name: project.name,
          url: absoluteUrl(`/work/${project.slug}`),
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <main id="main-content">
        <Hero />
        <SelectedWork />
        <Engineering />
        <GitHubSnapshot />
        <Experience />
        <Certifications />
        <About />
        <Contact />
      </main>
    </>
  );
}
