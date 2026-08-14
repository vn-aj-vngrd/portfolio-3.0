import type { Metadata } from "next";
import Link from "next/link";

import { ContributionGraph } from "@/components/github/ContributionGraph";
import { getGitHubStats } from "@/lib/github-stats";

export const metadata: Metadata = {
  title: "GitHub Activity",
  description:
    "A private-inclusive view of Van AJ Vanguardia’s GitHub contributions, repositories, language footprint, and recent public work.",
  alternates: { canonical: "/github" },
};

export const revalidate = 3600;

const stackContext = [
  {
    title: "Product surfaces",
    tools: "TypeScript · React · Next.js · React Native · Expo · Tailwind CSS",
  },
  {
    title: "Services and architecture",
    tools: "ASP.NET Core · Node.js · NestJS · Fastify · REST · tRPC",
  },
  {
    title: "Data",
    tools: "PostgreSQL · MSSQL · MySQL · MongoDB · Redis · Convex · Supabase",
  },
  {
    title: "Delivery",
    tools: "Docker · AWS · Vercel · Git · GitHub · CI/CD",
  },
] as const;

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatBytes(bytes: number) {
  if (bytes < 1_000_000) return `${Math.round(bytes / 1_000)} KB`;
  return `${(bytes / 1_000_000).toFixed(1)} MB`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default async function GitHubPage() {
  const stats = await getGitHubStats();

  return (
    <main id="main-content" className="github-page">
      <section className="github-hero" aria-labelledby="github-title" data-reveal>
        <Link className="page-back-link" href="/">
          <span aria-hidden="true">←</span> Back to portfolio
        </Link>
        <div className="github-hero-grid">
          <div>
            <p className="github-kicker">Engineering activity</p>
            <h1 id="github-title">GitHub, with the private work counted.</h1>
          </div>
          <div>
            <p>
              A one-year view of consistent repository work—not a score for code
              volume. Private activity is included as aggregate contribution and
              repository counts; private names and source remain private.
            </p>
            <a href="https://github.com/vn-aj-vngrd" target="_blank" rel="noreferrer">
              @vn-aj-vngrd ↗
            </a>
          </div>
        </div>
      </section>

      {stats ? (
        <>
          <section className="github-overview" aria-label="GitHub activity overview" data-reveal>
            <dl>
              <div>
                <dt>{formatNumber(stats.contributions.total)}</dt>
                <dd>Contributions · last 12 months</dd>
              </div>
              <div>
                <dt>{formatNumber(stats.contributions.private)}</dt>
                <dd>Private contributions included</dd>
              </div>
              <div>
                <dt>{stats.repositories.total}</dt>
                <dd>Owned repositories</dd>
              </div>
              <div>
                <dt>{stats.repositories.private}</dt>
                <dd>Private repositories</dd>
              </div>
            </dl>
            <ContributionGraph calendar={stats.contributions.calendar} />
            <div className="github-period">
              <span>{formatDate(stats.period.from)} — {formatDate(stats.period.to)}</span>
              <span>Updated hourly</span>
            </div>
          </section>

          <section className="github-section" aria-labelledby="rhythm-title" data-reveal>
            <header className="github-section-heading">
              <p>01 · Rhythm</p>
              <div>
                <h2 id="rhythm-title">Consistency across public and private work.</h2>
                <p>
                  Private contributions affect totals and rhythm without exposing
                  employers, clients, repository names, or source code.
                </p>
              </div>
            </header>
            <dl className="github-rhythm">
              <div>
                <dt>{stats.contributions.activeDays}</dt>
                <dd>Active days</dd>
              </div>
              <div>
                <dt>{stats.contributions.currentStreak}</dt>
                <dd>Current streak</dd>
              </div>
              <div>
                <dt>{stats.contributions.longestStreak}</dt>
                <dd>Longest streak</dd>
              </div>
              <div>
                <dt>{stats.contributions.busiestDay?.count ?? 0}</dt>
                <dd>
                  Busiest day
                  {stats.contributions.busiestDay
                    ? ` · ${formatDate(stats.contributions.busiestDay.date)}`
                    : ""}
                </dd>
              </div>
              <div>
                <dt>{stats.contributions.public}</dt>
                <dd>Public contributions</dd>
              </div>
              <div>
                <dt>{stats.repositories.recentlyActive}</dt>
                <dd>Repositories active in 90 days</dd>
              </div>
            </dl>
          </section>

          <section className="github-section" aria-labelledby="languages-title" data-reveal>
            <header className="github-section-heading">
              <p>02 · Languages</p>
              <div>
                <h2 id="languages-title">The repository language footprint.</h2>
                <p>
                  GitHub Linguist bytes across owned repositories available to this
                  portfolio, including private repositories and excluding forks.
                </p>
              </div>
            </header>
            <div className="language-layout">
              <ol className="language-chart">
                {stats.languages.slice(0, 10).map((language, index) => (
                  <li key={language.name}>
                    <span>0{index + 1}</span>
                    <div>
                      <strong>{language.name}</strong>
                      <i style={{ width: `${Math.max(language.percentage, 1)}%` }} />
                    </div>
                    <em>{language.percentage.toFixed(1)}%</em>
                  </li>
                ))}
              </ol>
              <div className="all-languages">
                <p>All detected languages</p>
                <ul>
                  {stats.languages.map((language) => (
                    <li key={language.name}>
                      <span
                        aria-hidden="true"
                        style={{ backgroundColor: language.color || "#8b929a" }}
                      />
                      <strong>{language.name}</strong>
                      <em>{formatBytes(language.bytes)}</em>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="github-method-note">
              This measures repository language bytes, not lines written. Generated,
              vendored, educational, and historical code can influence the distribution.
            </p>
          </section>

          <section className="github-section" aria-labelledby="repositories-title" data-reveal>
            <header className="github-section-heading">
              <p>03 · Repositories</p>
              <div>
                <h2 id="repositories-title">Recent public work, with private boundaries intact.</h2>
                <p>
                  Only public repository names appear here. Private work contributes to
                  aggregate counts and nothing more.
                </p>
              </div>
            </header>
            <div className="repository-summary">
              <p>
                <strong>{stats.repositories.public}</strong>
                Public
              </p>
              <p>
                <strong>{stats.repositories.private}</strong>
                Private
              </p>
              <p>
                <strong>{stats.repositories.stars}</strong>
                Stars
              </p>
              <p>
                <strong>{stats.repositories.forks}</strong>
                Forks
              </p>
            </div>
            <ol className="recent-repositories">
              {stats.recentRepositories.map((repository, index) => (
                <li key={repository.name}>
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{repository.name}</h3>
                    <p>{repository.description || "Public repository"}</p>
                  </div>
                  <div>
                    {repository.language ? (
                      <span>
                        <i style={{ backgroundColor: repository.language.color }} />
                        {repository.language.name}
                      </span>
                    ) : null}
                    <time dateTime={repository.pushedAt}>{formatDate(repository.pushedAt)}</time>
                  </div>
                  <a href={repository.url} target="_blank" rel="noreferrer">
                    Source ↗
                  </a>
                </li>
              ))}
            </ol>
          </section>

          <section className="github-section" aria-labelledby="stack-context-title" data-reveal>
            <header className="github-section-heading">
              <p>04 · Stack context</p>
              <div>
                <h2 id="stack-context-title">Languages are only one layer of the system.</h2>
                <p>
                  Framework and infrastructure context comes from documented project and
                  professional work—not unreliable filename guesses.
                </p>
              </div>
            </header>
            <div className="github-stack-context">
              {stackContext.map((group) => (
                <article key={group.title}>
                  <h3>{group.title}</h3>
                  <p>{group.tools}</p>
                </article>
              ))}
            </div>
          </section>
        </>
      ) : (
        <section className="github-unavailable" data-reveal>
          <h2>GitHub activity is temporarily unavailable.</h2>
          <p>The portfolio remains available while the private stats connection recovers.</p>
        </section>
      )}

      <footer className="github-footer" data-reveal>
        <p>Activity adds context. The product and engineering decisions still matter more.</p>
        <Link href="/#work">See selected work →</Link>
      </footer>
    </main>
  );
}
