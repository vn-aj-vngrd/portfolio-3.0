const GITHUB_LOGIN = "vn-aj-vngrd";
const GITHUB_GRAPHQL = "https://api.github.com/graphql";

export type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type LanguageStat = {
  name: string;
  color: string;
  bytes: number;
  percentage: number;
};

export type RecentRepository = {
  name: string;
  url: string;
  description: string | null;
  pushedAt: string;
  stars: number;
  language: { name: string; color: string } | null;
};

export type GitHubStats = {
  login: string;
  generatedAt: string;
  period: { from: string; to: string };
  contributions: {
    total: number;
    private: number;
    public: number;
    activeDays: number;
    currentStreak: number;
    longestStreak: number;
    busiestDay: ContributionDay | null;
    calendar: ContributionDay[][];
  };
  repositories: {
    total: number;
    public: number;
    private: number;
    recentlyActive: number;
    stars: number;
    forks: number;
  };
  languages: LanguageStat[];
  recentRepositories: RecentRepository[];
};

type GraphQLResponse = {
  data?: {
    user?: {
      login: string;
      publicRepositories: { totalCount: number };
      privateRepositories: { totalCount: number };
      repositories: {
        totalCount: number;
        nodes: Array<{
          name: string;
          url: string;
          description: string | null;
          isPrivate: boolean;
          isFork: boolean;
          pushedAt: string | null;
          stargazerCount: number;
          forkCount: number;
          primaryLanguage: { name: string; color: string } | null;
          languages: {
            edges: Array<{ size: number; node: { name: string; color: string } }>;
          };
        }>;
      };
      contributionsCollection: {
        restrictedContributionsCount: number;
        contributionCalendar: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: Array<{
              date: string;
              contributionCount: number;
              contributionLevel: "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";
            }>;
          }>;
        };
      };
    };
  };
  errors?: Array<{ message: string }>;
};

const query = `
  query PortfolioGitHubStats($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      login
      publicRepositories: repositories(privacy: PUBLIC, ownerAffiliations: OWNER) { totalCount }
      privateRepositories: repositories(privacy: PRIVATE, ownerAffiliations: OWNER) { totalCount }
      repositories(first: 100, ownerAffiliations: OWNER, orderBy: { field: PUSHED_AT, direction: DESC }) {
        totalCount
        nodes {
          name
          url
          description
          isPrivate
          isFork
          pushedAt
          stargazerCount
          forkCount
          primaryLanguage { name color }
          languages(first: 20, orderBy: { field: SIZE, direction: DESC }) {
            edges { size node { name color } }
          }
        }
      }
      contributionsCollection(from: $from, to: $to) {
        restrictedContributionsCount
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays { date contributionCount contributionLevel }
          }
        }
      }
    }
  }
`;

const levelMap = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
} as const;

function calculateStreaks(days: ContributionDay[]) {
  let longest = 0;
  let running = 0;
  for (const day of days) {
    running = day.count > 0 ? running + 1 : 0;
    longest = Math.max(longest, running);
  }

  let endIndex = days.length - 1;
  const today = new Date().toISOString().slice(0, 10);
  if (days[endIndex]?.date === today && days[endIndex]?.count === 0) endIndex -= 1;

  let current = 0;
  for (let index = endIndex; index >= 0 && days[index]?.count > 0; index -= 1) current += 1;
  return { current, longest };
}

export async function getGitHubStats(): Promise<GitHubStats | null> {
  const token = process.env.GITHUB_STATS_TOKEN;
  if (!token) return null;

  const to = new Date();
  const from = new Date(to);
  from.setUTCFullYear(from.getUTCFullYear() - 1);

  try {
    const response = await fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "vanajvanguardia-portfolio",
      },
      body: JSON.stringify({
        query,
        variables: { login: GITHUB_LOGIN, from: from.toISOString(), to: to.toISOString() },
      }),
      signal: AbortSignal.timeout(10_000),
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;
    const payload = (await response.json()) as GraphQLResponse;
    const user = payload.data?.user;
    if (!user || payload.errors?.length) return null;

    const calendar = user.contributionsCollection.contributionCalendar.weeks.map((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: levelMap[day.contributionLevel],
      })),
    );
    const days = calendar.flat().sort((a, b) => a.date.localeCompare(b.date));
    const streaks = calculateStreaks(days);
    const busiestDay = days.reduce<ContributionDay | null>(
      (busiest, day) => (!busiest || day.count > busiest.count ? day : busiest),
      null,
    );

    const repositories = user.repositories.nodes;
    const activeThreshold = new Date(to);
    activeThreshold.setUTCDate(activeThreshold.getUTCDate() - 90);

    const languageTotals = new Map<string, { bytes: number; color: string }>();
    for (const repository of repositories) {
      if (repository.isFork) continue;
      for (const edge of repository.languages.edges) {
        const existing = languageTotals.get(edge.node.name);
        languageTotals.set(edge.node.name, {
          bytes: (existing?.bytes ?? 0) + edge.size,
          color: edge.node.color || existing?.color || "#8b929a",
        });
      }
    }
    const totalLanguageBytes = [...languageTotals.values()].reduce(
      (sum, language) => sum + language.bytes,
      0,
    );
    const languages = [...languageTotals.entries()]
      .map(([name, language]) => ({
        name,
        color: language.color,
        bytes: language.bytes,
        percentage: totalLanguageBytes ? (language.bytes / totalLanguageBytes) * 100 : 0,
      }))
      .sort((a, b) => b.bytes - a.bytes);

    const totalContributions = user.contributionsCollection.contributionCalendar.totalContributions;
    const privateContributions = user.contributionsCollection.restrictedContributionsCount;

    return {
      login: user.login,
      generatedAt: to.toISOString(),
      period: { from: from.toISOString(), to: to.toISOString() },
      contributions: {
        total: totalContributions,
        private: privateContributions,
        public: Math.max(0, totalContributions - privateContributions),
        activeDays: days.filter((day) => day.count > 0).length,
        currentStreak: streaks.current,
        longestStreak: streaks.longest,
        busiestDay,
        calendar,
      },
      repositories: {
        total: user.repositories.totalCount,
        public: user.publicRepositories.totalCount,
        private: user.privateRepositories.totalCount,
        recentlyActive: repositories.filter(
          (repository) => repository.pushedAt && new Date(repository.pushedAt) >= activeThreshold,
        ).length,
        stars: repositories.reduce((sum, repository) => sum + repository.stargazerCount, 0),
        forks: repositories.reduce((sum, repository) => sum + repository.forkCount, 0),
      },
      languages,
      recentRepositories: repositories
        .filter((repository) => !repository.isPrivate && !repository.isFork && repository.pushedAt)
        .slice(0, 6)
        .map((repository) => ({
          name: repository.name,
          url: repository.url,
          description: repository.description,
          pushedAt: repository.pushedAt as string,
          stars: repository.stargazerCount,
          language: repository.primaryLanguage,
        })),
    };
  } catch {
    return null;
  }
}
