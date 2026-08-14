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
    title: "Outstanding Intern Award",
    issuer: "MYT SoftDev Solutions Inc.",
    kind: "Award",
    href: "/certificates/myt-outstanding-intern-award.jpg",
  },
  {
    title: "Full Scale Internship — Certificate of Completion",
    issuer: "GigaBook Inc.",
    kind: "Professional training",
    href: "/certificates/fs-coc.pdf",
  },
  {
    title: "Software Testing in a Nutshell",
    issuer: "University of San Carlos",
    kind: "Quality engineering",
    href: "/certificates/software-testing-in-a-nutshell.jpg",
  },
  {
    title: "GDSC San Carlos — Certificate of Membership",
    issuer: "Google Developer Student Clubs San Carlos",
    kind: "Community",
    href: "/certificates/gdsc-san-carlos.pdf",
  },
] as const;
