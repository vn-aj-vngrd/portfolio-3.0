import { resumeMarkdown } from "@/lib/profile-markdown";

export const dynamic = "force-static";

export function GET() {
  return new Response(resumeMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="Van-AJ-Vanguardia-Resume-Template.md"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
