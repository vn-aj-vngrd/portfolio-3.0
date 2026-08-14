import type { GearKind } from "@/content/gear";

export function GearIllustration({ kind }: { kind: GearKind }) {
  const shared = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 320 220" aria-hidden="true">
      {kind === "laptop" ? (
        <>
          <rect x="55" y="25" width="210" height="140" rx="8" {...shared} />
          <rect x="65" y="35" width="190" height="119" rx="2" className="gear-fill" />
          <path d="M34 174h252l-14 16H48l-14-16Z" {...shared} />
          <path d="M137 181h46" {...shared} />
        </>
      ) : null}
      {kind === "ultrawide" ? (
        <>
          <path d="M28 42Q160 20 292 42v112q-132 22-264 0V42Z" {...shared} />
          <path d="M40 51q120-18 240 0v94q-120 18-240 0V51Z" className="gear-fill" />
          <path d="M160 165v25M126 194h68" {...shared} />
        </>
      ) : null}
      {kind === "monitor" ? (
        <>
          <rect x="55" y="27" width="210" height="138" rx="5" {...shared} />
          <rect x="66" y="38" width="188" height="116" className="gear-fill" />
          <path d="M160 165v27M122 196h76" {...shared} />
        </>
      ) : null}
      {kind === "mouse" ? (
        <>
          <path d="M111 187c-25-20-31-61-20-101 9-34 31-53 69-53s60 19 69 53c11 40 5 81-20 101-25 20-73 20-98 0Z" {...shared} />
          <path d="M160 34v58M91 96h138" {...shared} />
          <rect x="153" y="52" width="14" height="28" rx="7" className="gear-fill" />
        </>
      ) : null}
      {kind === "keyboard" ? (
        <>
          <path d="m35 62 250 0 16 112H19L35 62Z" {...shared} />
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map((key) => (
              <rect
                key={`${row}-${key}`}
                x={42 + key * 26 + row * 2}
                y={76 + row * 22}
                width="18"
                height="13"
                rx="2"
                className="gear-key"
              />
            )),
          )}
          <rect x="113" y="145" width="96" height="13" rx="2" className="gear-key" />
        </>
      ) : null}
      {kind === "earbuds" ? (
        <>
          <path d="M112 61c-18 0-31 13-31 31s13 30 29 30c10 0 16-5 20-12v70c0 10 7 17 16 17s16-7 16-17V90c0-17-20-29-50-29Z" {...shared} />
          <path d="M208 61c18 0 31 13 31 31s-13 30-29 30c-10 0-16-5-20-12v70c0 10-7 17-16 17s-16-7-16-17V90c0-17 20-29 50-29Z" {...shared} />
          <circle cx="112" cy="92" r="10" className="gear-fill-light" />
          <circle cx="208" cy="92" r="10" className="gear-fill-light" />
        </>
      ) : null}
      {kind === "phone" ? (
        <>
          <rect x="98" y="15" width="124" height="190" rx="20" {...shared} />
          <rect x="106" y="23" width="108" height="174" rx="14" className="gear-fill" />
          <rect x="140" y="30" width="40" height="10" rx="5" className="gear-cutout" />
          <circle cx="160" cy="186" r="2" className="gear-cutout" />
        </>
      ) : null}
      {kind === "desk" ? (
        <>
          <path d="M22 66h276v18H22zM48 84v112M272 84v112M48 174h224" {...shared} />
          <path d="M38 196h20M262 196h20" {...shared} />
          <rect x="58" y="34" width="100" height="32" rx="2" className="gear-fill" />
          <path d="M170 53h68" {...shared} />
        </>
      ) : null}
      {kind === "charger" ? (
        <>
          <path d="M74 182h172l-25-37H99l-25 37Z" {...shared} />
          <path d="M160 145V56" {...shared} />
          <circle cx="160" cy="62" r="45" {...shared} />
          <circle cx="160" cy="62" r="34" className="gear-fill" />
          <circle cx="112" cy="158" r="13" {...shared} />
          <path d="M147 112h26" {...shared} />
        </>
      ) : null}
    </svg>
  );
}
