import { ImageResponse } from "next/og";

import { projectCatalog } from "@/content/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Case study by Van AJ Vanguardia";

export function generateStaticParams() {
  return projectCatalog.list().map((project) => ({ slug: project.slug }));
}

// A PNG share card per case study: link previews that skip WebP still show one.
export default async function CaseStudyImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectCatalog.find(slug);
  const name = project?.name ?? "Case study";
  const category = project?.category ?? "";
  const stack = project?.stack.slice(0, 5).join(" · ") ?? "";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#FCFCFD",
        color: "#111214",
        padding: "72px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
        }}
      >
        <span>Van AJ Vanguardia</span>
        <span style={{ color: "#1768E5" }}>Case study</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ fontSize: 30, color: "#5D6673" }}>{category}</div>
        <div
          style={{ fontSize: 132, lineHeight: 0.95, letterSpacing: "-0.04em" }}
        >
          {name}
        </div>
        <div style={{ fontSize: 28, color: "#5D6673" }}>{stack}</div>
      </div>
    </div>,
    size
  );
}
