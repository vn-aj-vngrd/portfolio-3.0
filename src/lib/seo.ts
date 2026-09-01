import type { Metadata } from "next";

export const SITE_URL = "https://vanajvanguardia.tech";
export const SITE_NAME = "Van AJ Vanguardia";
export const SITE_TITLE = "Van AJ Vanguardia | Full-Stack Software Developer";
export const SITE_DESCRIPTION =
  "Cebu-based full-stack software developer building web, mobile, backend, and AI-enabled products with TypeScript, React, Next.js, and ASP.NET Core.";

export const DEFAULT_SOCIAL_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Van AJ Vanguardia, Full-Stack Software Developer",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const socialTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_PH",
      type: "website",
      images: [DEFAULT_SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [DEFAULT_SOCIAL_IMAGE],
    },
  };
}
