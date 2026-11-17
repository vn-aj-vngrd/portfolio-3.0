import { projectCatalog } from "@/content/projects";
import { caseStudyMarkdown } from "@/lib/profile-markdown";

export const dynamic = "force-static";

export function generateStaticParams() {
  return projectCatalog.list().map((project) => ({ slug: project.slug }));
}

// Served at /work/<slug>.md through a rewrite in next.config.ts.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const markdown = caseStudyMarkdown(slug);
  if (!markdown) return new Response("Not found", { status: 404 });
  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
