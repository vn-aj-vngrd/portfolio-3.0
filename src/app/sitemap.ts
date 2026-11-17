import type { MetadataRoute } from "next";

import { labGames } from "@/content/lab";
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
    { url: `${SITE_URL}/hire`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/lab`, changeFrequency: "monthly", priority: 0.5 },
    // Plain-text copies for AI assistants and recruiters' tools.
    ...["llms.txt", "llms-full.txt", "hire.md", "resume.md", "ai.md"].map(
      (file) => ({
        url: `${SITE_URL}/${file}`,
        changeFrequency: "monthly" as const,
        priority: 0.5,
      })
    ),
    ...labGames.map((game) => ({
      url: `${SITE_URL}/lab/${game.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
    ...projectCatalog.list().map((project) => ({
      url: `${SITE_URL}/work/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
