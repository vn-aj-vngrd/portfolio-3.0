import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectCaseStudy } from "@/components/project/ProjectCaseStudy";
import { projectCatalog } from "@/content/projects";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";
import {
  breadcrumbSchema,
  JsonLd,
  PERSON_ID,
  WEBSITE_ID,
} from "@/lib/structured-data";

export function generateStaticParams() {
  return projectCatalog.list().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectCatalog.find(slug);
  if (!project) return {};

  const title = `${project.name} Case Study | ${SITE_NAME}`;

  return {
    title: `${project.name} Case Study`,
    description: project.summary,
    keywords: [project.name, project.category, ...project.stack],
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title,
      description: project.summary,
      url: `/work/${project.slug}`,
      siteName: SITE_NAME,
      locale: "en_PH",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectCatalog.find(slug);
  if (!project) notFound();

  const projectUrl = absoluteUrl(`/work/${project.slug}`);
  const socialImage = project.coverImage ?? project.images[0];
  const graph = [
    {
      "@type": "CreativeWork",
      "@id": `${projectUrl}#case-study`,
      name: `${project.name} case study`,
      headline: project.summary,
      description: `${project.problem} ${project.solution}`,
      abstract: project.summary,
      genre: project.category,
      creativeWorkStatus: project.status,
      url: projectUrl,
      image: absoluteUrl(socialImage.src),
      inLanguage: "en-PH",
      author: { "@id": PERSON_ID },
      creator: { "@id": PERSON_ID },
      isPartOf: { "@id": WEBSITE_ID },
      mainEntityOfPage: projectUrl,
      keywords: project.stack.join(", "),
      sameAs: [
        ...(project.repository ? [project.repository] : []),
        ...(project.liveUrl ? [project.liveUrl] : []),
      ],
    },
    breadcrumbSchema(project.name, `/work/${project.slug}`),
  ];

  return (
    <>
      <JsonLd graph={graph} />
      <ProjectCaseStudy project={project} />
    </>
  );
}
