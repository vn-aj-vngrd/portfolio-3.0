import { ImageResponse } from "next/og";

export const alt =
  "Van AJ Vanguardia, Full-Stack Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
        <span style={{ color: "#1768E5" }}>Cebu, Philippines</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        <div
          style={{
            fontSize: 78,
            lineHeight: 0.98,
            letterSpacing: "-0.04em",
            maxWidth: 960,
          }}
        >
          Full-Stack Software Developer
        </div>
        <div style={{ fontSize: 30, color: "#5D6673" }}>
          TypeScript · React · Next.js · ASP.NET Core
        </div>
      </div>
    </div>,
    size
  );
}
