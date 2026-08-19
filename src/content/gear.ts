export type GearKind =
  | "laptop"
  | "ultrawide"
  | "monitor"
  | "mouse"
  | "keyboard"
  | "earbuds"
  | "phone"
  | "desk"
  | "charger";

export type GearItem = {
  name: string;
  detail: string;
  color?: string;
  use: string;
  kind: GearKind;
  featured?: boolean;
};

export const gear: readonly GearItem[] = [
  {
    name: "MacBook Pro",
    detail: "M1 Pro · 16GB unified memory",
    use: "Primary machine for web and mobile development, coding-agent sessions, database tools, and local containers.",
    kind: "laptop",
    featured: true,
  },
  {
    name: "Xiaomi 34-inch curved monitor",
    detail: "Ultrawide primary display",
    color: "Black",
    use: "Main canvas for editor, browser, terminal, and product references without constant window switching.",
    kind: "ultrawide",
  },
  {
    name: "Xiaomi 27-inch monitor",
    detail: "Secondary display",
    color: "Black",
    use: "Dedicated space for documentation, logs, communication, and live product validation.",
    kind: "monitor",
  },
  {
    name: "Logitech MX Master 3",
    detail: "Wireless productivity mouse",
    color: "Black",
    use: "Precise navigation and horizontal scrolling across code, timelines, design files, and wide data views.",
    kind: "mouse",
  },
  {
    name: "AJAZZ AK870T",
    detail: "Mechanical keyboard",
    color: "Black",
    use: "Compact daily input for long coding sessions while keeping the desk uncluttered.",
    kind: "keyboard",
  },
  {
    name: "AirPods Pro 2",
    detail: "Wireless earbuds",
    color: "White",
    use: "Focus audio, calls, and quick transitions between the MacBook and iPhone.",
    kind: "earbuds",
  },
  {
    name: "iPhone 15",
    detail: "Mobile device",
    color: "Black",
    use: "Real-device QA for responsive interfaces, PWAs, authentication, and mobile product flows.",
    kind: "phone",
  },
  {
    name: "Sit-stand desk",
    detail: "Height-adjustable workspace",
    color: "Black",
    use: "Supports posture changes during long implementation, debugging, and review sessions.",
    kind: "desk",
  },
  {
    name: "UGREEN wireless charging dock",
    detail: "iPhone and AirPods charging",
    color: "Black",
    use: "Keeps everyday devices powered with fewer cables across the working surface.",
    kind: "charger",
  },
] as const;
