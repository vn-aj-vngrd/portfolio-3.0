import type { MetadataRoute } from "next";

import { projectCatalog } from "@/content/projects";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/ai`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/github`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/design`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/gear`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/resume`, changeFrequency: "monthly", priority: 0.7 },
    ...projectCatalog.list().map((project) => ({
      url: `${SITE_URL}/work/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
