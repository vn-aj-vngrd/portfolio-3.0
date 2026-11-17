import { llmsIndex } from "@/lib/profile-markdown";

// The years of experience are computed from today's date, so re-render daily.
export const revalidate = 86400;

export function GET() {
  return new Response(llmsIndex(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
