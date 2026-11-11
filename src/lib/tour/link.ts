// Share-link parsing for `/?tour` and `/?tour=<chapterKey>`. Pure.
const OFF = new Set(["0", "false", "off", "no"]);
const ON = new Set(["", "1", "true", "on", "yes"]);

export function parseTourLink(
  search: string
): { chapter: string | null } | null {
  const params = new URLSearchParams(search);
  if (!params.has("tour")) return null;
  const value = (params.get("tour") ?? "").trim().toLowerCase();
  if (OFF.has(value)) return null;
  return { chapter: ON.has(value) ? null : value };
}

export function withoutTourLink(href: string) {
  const url = new URL(href, "http://tour.invalid");
  url.searchParams.delete("tour");
  return `${url.pathname}${url.search}${url.hash}`;
}
