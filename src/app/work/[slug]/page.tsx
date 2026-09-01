import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectCaseStudy } from "@/components/project/ProjectCaseStudy";
import { getProject, projects } from "@/content/projects";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const socialImage = project.coverImage ?? project.images[0];
  const title = `${project.name} Case Study | ${SITE_NAME}`;

  return {
    title: `${project.name} Case Study`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title,
      description: project.summary,
      url: `/work/${project.slug}`,
      siteName: SITE_NAME,
      locale: "en_PH",
      type: "article",
      images: [
        {
          url: socialImage.src,
          width: socialImage.width,
          height: socialImage.height,
          alt: socialImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
      images: [{ url: socialImage.src, alt: socialImage.alt }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const projectUrl = absoluteUrl(`/work/${project.slug}`);
  const socialImage = project.coverImage ?? project.images[0];
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${projectUrl}#case-study`,
        name: `${project.name} case study`,
        headline: project.summary,
        description: `${project.problem} ${project.solution}`,
        url: projectUrl,
        image: absoluteUrl(socialImage.src),
        inLanguage: "en-PH",
        author: { "@id": `${SITE_URL}/#person` },
        creator: { "@id": `${SITE_URL}/#person` },
        mainEntityOfPage: projectUrl,
        keywords: project.stack.join(", "),
        sameAs: [
          project.repository,
          ...(project.liveUrl ? [project.liveUrl] : []),
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${projectUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Portfolio",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: project.name,
            item: projectUrl,
          },
        ],
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
      <ProjectCaseStudy project={project} />
    </>
  );
}
