import { About } from "@/components/sections/About";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Engineering } from "@/components/sections/Engineering";
import { Experience } from "@/components/sections/Experience";
import { GitHubSnapshot } from "@/components/sections/GitHubSnapshot";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { projectCatalog } from "@/content/projects";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";
import {
  JsonLd,
  PERSON_ID,
  personSchema,
  WEBSITE_ID,
} from "@/lib/structured-data";

// The years of experience are computed from today's date, so re-render daily.
export const revalidate = 86400;

export default function Home() {
  const graph = [
    personSchema(),
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en-PH",
      publisher: { "@id": PERSON_ID },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profile-page`,
      url: SITE_URL,
      name: `${SITE_NAME} — AI Product Engineer / Software Engineer`,
      description: SITE_DESCRIPTION,
      inLanguage: "en-PH",
      isPartOf: { "@id": WEBSITE_ID },
      mainEntity: { "@id": PERSON_ID },
      hasPart: projectCatalog.list().map((project) => ({
        "@type": "CreativeWork",
        name: project.name,
        description: project.summary,
        url: absoluteUrl(`/work/${project.slug}`),
      })),
    },
  ];

  return (
    <>
      <JsonLd graph={graph} />
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
