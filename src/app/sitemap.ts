import type { MetadataRoute } from "next";

import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://vanajvanguardia.vercel.app";
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/ai`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/gear`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/resume`, changeFrequency: "monthly", priority: 0.7 },
    ...projects.map((project) => ({
      url: `${base}/work/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
