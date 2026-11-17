import { resumeMarkdown } from "@/lib/profile-markdown";

export const revalidate = 86400;

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
