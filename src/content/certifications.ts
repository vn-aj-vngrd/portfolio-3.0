type Certification = {
  title: string;
  issuer: string;
  kind: string;
  featured?: boolean;
  href?: string;
};

export const certifications: readonly Certification[] = [
  {
    title: "Hackfest 2024: Fusion Finalist",
    issuer: "Google Developer Student Club",
    kind: "Recognition",
    featured: true,
  },
  {
    title: "Bachelor of Science in Information Technology",
    issuer: "University of San Carlos, Talamban Campus",
    kind: "Degree · Graduated 2024",
  },
  {
    title: "Full Scale Internship - Certificate of Completion",
    issuer: "GigaBook Inc.",
    kind: "Professional training",
    href: "/certificates/fs-coc.pdf",
  },
  {
    title: "GDSC San Carlos - Certificate of Membership",
    issuer: "GDSC San Carlos",
    kind: "Community",
    href: "/certificates/gdsc-san-carlos.pdf",
  },
  {
    title: "Software Testing in a Nutshell",
    issuer: "University of San Carlos",
    kind: "Quality engineering",
    href: "/certificates/software-testing-in-a-nutshell.jpg",
  },
  {
    title: "Startup Summit 2022",
    issuer: "BYTE: Building Young Tech Entrepreneurs",
    kind: "Entrepreneurship",
    href: "/certificates/startup-summit.jpg",
  },
  {
    title: "Sumo-mBot Robotics",
    issuer: "DEVCON Kids Code Camp, Cebu Chapter",
    kind: "Robotics",
    href: "/certificates/sumo-mBot-robotics.jpg",
  },
  {
    title: "MYT Internship - Certificate of Completion",
    issuer: "MYT SoftDev Solutions Inc.",
    kind: "Internship",
    href: "/certificates/myt-certificate-of-completion.jpg",
  },
  {
    title: "MYT Internship - Outstanding Intern Award",
    issuer: "MYT SoftDev Solutions Inc.",
    kind: "Award",
    href: "/certificates/myt-outstanding-intern-award.jpg",
  },
  {
    title: "Getting Grounded on Analytics",
    issuer: "Development Academy of the Philippines",
    kind: "Analytics",
  },
] as const;
