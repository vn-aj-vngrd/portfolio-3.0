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
  image?: { src: string; alt: string; width: number; height: number };
};

export const gear: readonly GearItem[] = [
  {
    name: "MacBook Pro",
    detail: "M1 Pro · 16GB unified memory",
    use: "Primary machine for web and mobile development, coding-agent sessions, database tools, and local containers.",
    kind: "laptop",
    image: {
      src: "/images/gear/macbook-pro.webp",
      alt: "MacBook Pro in Space Gray, open and seen from the front",
      width: 1036,
      height: 1000,
    },
    featured: true,
  },
  {
    name: "Xiaomi 34-inch curved monitor",
    detail: "Ultrawide primary display",
    color: "Black",
    use: "Main canvas for editor, browser, terminal, and product references without constant window switching.",
    kind: "ultrawide",
    image: {
      src: "/images/gear/xiaomi-34-curved.webp",
      alt: "Xiaomi 34-inch curved ultrawide monitor on its stand",
      width: 1297,
      height: 814,
    },
  },
  {
    name: "Xiaomi 27-inch monitor",
    detail: "Secondary display",
    color: "Black",
    use: "Dedicated space for documentation, logs, communication, and live product validation.",
    kind: "monitor",
    image: {
      src: "/images/gear/xiaomi-27.webp",
      alt: "Xiaomi 27-inch monitor on its stand",
      width: 1278,
      height: 1000,
    },
  },
  {
    name: "Logitech MX Master 3",
    detail: "Wireless productivity mouse",
    color: "Black",
    use: "Precise navigation and horizontal scrolling across code, timelines, design files, and wide data views.",
    kind: "mouse",
    image: {
      src: "/images/gear/mx-master-3.webp",
      alt: "Logitech MX Master wireless mouse in graphite",
      width: 1400,
      height: 794,
    },
  },
  {
    name: "AJAZZ AK870T",
    detail: "Mechanical keyboard",
    color: "Black",
    use: "Compact daily input for long coding sessions while keeping the desk uncluttered.",
    kind: "keyboard",
    image: {
      src: "/images/gear/ajazz-ak870t.webp",
      alt: "AJAZZ tenkeyless mechanical keyboard with backlit keys",
      width: 1400,
      height: 604,
    },
  },
  {
    name: "AirPods Pro 2",
    detail: "Wireless earbuds",
    color: "White",
    use: "Focus audio, calls, and quick transitions between the MacBook and iPhone.",
    kind: "earbuds",
    image: {
      src: "/images/gear/airpods-pro-2.webp",
      alt: "AirPods Pro 2 earbuds above their white charging case",
      width: 812,
      height: 1000,
    },
  },
  {
    name: "iPhone 17 Pro Max",
    detail: "Mobile device",
    color: "Silver",
    use: "Real-device QA for responsive interfaces, PWAs, authentication, and mobile product flows.",
    kind: "phone",
    image: {
      src: "/images/gear/iphone-17-pro-max.webp",
      alt: "iPhone 17 Pro Max in Silver, back and front",
      width: 803,
      height: 1000,
    },
  },
  {
    name: "Sit-stand desk",
    detail: "Height-adjustable workspace",
    color: "Black",
    use: "Supports posture changes during long implementation, debugging, and review sessions.",
    kind: "desk",
    image: {
      src: "/images/gear/sit-stand-desk.webp",
      alt: "Black height-adjustable sit-stand desk",
      width: 1199,
      height: 1000,
    },
  },
  {
    name: "UGREEN wireless charging dock",
    detail: "iPhone and AirPods charging",
    color: "Black",
    use: "Keeps everyday devices powered with fewer cables across the working surface.",
    kind: "charger",
    image: {
      src: "/images/gear/ugreen-charger.webp",
      alt: "UGREEN foldable wireless charging dock with a phone pad, a watch pad, and a power adapter",
      width: 964,
      height: 710,
    },
  },
] as const;
