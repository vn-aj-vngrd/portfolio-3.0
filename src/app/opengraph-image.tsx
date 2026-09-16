import { ImageResponse } from "next/og";

export const alt = "Van AJ Vanguardia, Full-Stack Software Developer";
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
        <span style={{ color: "#1768E5" }}>Full-stack developer</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        <div
          style={{
            fontSize: 70,
            lineHeight: 0.98,
            letterSpacing: "-0.04em",
            maxWidth: 960,
          }}
        >
          Useful products, from idea to implementation.
        </div>
        <div style={{ fontSize: 30, color: "#5D6673" }}>
          Relay · Roleway · Viya · ACSFI
        </div>
      </div>
    </div>,
    size
  );
}
