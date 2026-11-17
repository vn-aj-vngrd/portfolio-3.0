// Years of professional experience, counted from the first paid engineering role
// (NextDevs, Apr 2023). Internships before it are listed on their own and not counted,
// so the number always agrees with the dates on the résumé.
// No runtime imports: the Node tests load this file directly.
export const CAREER_START = { year: 2023, month: 4 } as const;

export function yearsOfExperience(now: Date = new Date()) {
  const months =
    (now.getUTCFullYear() - CAREER_START.year) * 12 +
    (now.getUTCMonth() + 1 - CAREER_START.month);
  return Math.max(0, Math.floor(months / 12));
}

// "3+" today; becomes "4+" by itself in Apr 2027.
export function experienceYears(now: Date = new Date()) {
  return `${yearsOfExperience(now)}+`;
}
