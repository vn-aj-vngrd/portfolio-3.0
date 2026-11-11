import Link from "next/link";

import { ContributionGraph } from "@/components/github/ContributionGraph";
import { Rule } from "@/components/ui/Rule";
import { getGitHubStats } from "@/lib/github-stats";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "GitHub Activity",
  description:
    "Van AJ Vanguardia’s GitHub contributions, owned repositories, detected languages, and recent public work, with private activity included only in aggregate.",
  path: "/github",
});

export const revalidate = 3600;

const stackContext = [
  {
    title: "Web and mobile interfaces",
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
      <section
        className="github-hero"
        aria-labelledby="github-title"
        data-reveal="list"
      >
        <Link className="page-back-link" href="/">
          <span aria-hidden="true">←</span> Back to portfolio
        </Link>
        <div className="github-hero-grid">
          <div>
            <p className="github-kicker">GitHub activity</p>
            <h1 id="github-title">
              A year of public and private repository work.
            </h1>
          </div>
          <div>
            <p>
              This page reports contributions, owned repositories, detected
              languages, and recent public work. Private activity appears only
              in aggregate counts. Repository names and source remain private.
            </p>
            <a
              href="https://github.com/vn-aj-vngrd"
              target="_blank"
              rel="noreferrer"
            >
              @vn-aj-vngrd ↗
            </a>
          </div>
        </div>
      </section>

      {stats ? (
        <>
          <section
            className="github-overview"
            aria-label="GitHub activity overview"
          >
            <dl>
              <Rule />
              <Rule at="calc(100% - 1px)" />
              <Rule axis="x" at="50%" only="narrow" />
              <Rule axis="y" at="25%" only="wide" />
              <Rule axis="y" at="50%" />
              <Rule axis="y" at="75%" only="wide" />
              <div>
                <dt data-count>{formatNumber(stats.contributions.total)}</dt>
                <dd>Contributions · last 12 months</dd>
              </div>
              <div>
                <dt data-count>{formatNumber(stats.contributions.private)}</dt>
                <dd>Private contributions included</dd>
              </div>
              <div>
                <dt data-count>{stats.repositories.total}</dt>
                <dd>Owned repositories</dd>
              </div>
              <div>
                <dt data-count>{stats.repositories.private}</dt>
                <dd>Private repositories</dd>
              </div>
            </dl>
            <ContributionGraph calendar={stats.contributions.calendar} />
            <div className="github-period" data-reveal>
              <span>
                {formatDate(stats.period.from)} – {formatDate(stats.period.to)}
              </span>
              <span>Updated hourly</span>
            </div>
          </section>

          <section className="github-section" aria-labelledby="rhythm-title">
            <Rule />
            <header className="github-section-heading" data-reveal>
              <p>01 · Rhythm</p>
              <div>
                <h2 id="rhythm-title">
                  Contribution activity over the last twelve months.
                </h2>
                <p>
                  The calendar combines public and private contribution counts.
                  Private repository names, organizations, and source code are
                  not requested or displayed.
                </p>
              </div>
            </header>
            <dl className="github-rhythm" data-reveal="list">
              <Rule />
              <Rule at="calc(100% - 1px)" />
              <Rule at="50%" only="wide" />
              <Rule at="33.333%" only="narrow" />
              <Rule at="66.666%" only="narrow" />
              <Rule axis="y" />
              <Rule axis="y" at="calc(100% - 1px)" />
              <Rule axis="y" at="33.333%" only="wide" />
              <Rule axis="y" at="66.666%" only="wide" />
              <Rule axis="y" at="50%" only="narrow" />
              <div>
                <dt data-count>{stats.contributions.activeDays}</dt>
                <dd>Active days</dd>
              </div>
              <div>
                <dt data-count>{stats.contributions.currentStreak}</dt>
                <dd>Current streak</dd>
              </div>
              <div>
                <dt data-count>{stats.contributions.longestStreak}</dt>
                <dd>Longest streak</dd>
              </div>
              <div>
                <dt data-count>{stats.contributions.busiestDay?.count ?? 0}</dt>
                <dd>
                  Busiest day
                  {stats.contributions.busiestDay
                    ? ` · ${formatDate(stats.contributions.busiestDay.date)}`
                    : ""}
                </dd>
              </div>
              <div>
                <dt data-count>{stats.contributions.public}</dt>
                <dd>Public contributions</dd>
              </div>
              <div>
                <dt data-count>{stats.repositories.recentlyActive}</dt>
                <dd>Repositories active in 90 days</dd>
              </div>
            </dl>
          </section>

          <section className="github-section" aria-labelledby="languages-title">
            <Rule />
            <header className="github-section-heading" data-reveal>
              <p>02 · Languages</p>
              <div>
                <h2 id="languages-title">
                  Languages detected across owned repositories.
                </h2>
                <p>
                  Percentages use GitHub Linguist byte counts from repositories
                  available to this portfolio. Forks are excluded; public and
                  private repositories are included.
                </p>
              </div>
            </header>
            <div className="language-layout">
              <ol className="language-chart" data-reveal="list">
                {stats.languages.slice(0, 10).map((language, index) => (
                  <li key={language.name}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{language.name}</strong>
                      <i
                        data-fill
                        style={
                          {
                            width: `${Math.max(language.percentage, 1)}%`,
                            "--i": index,
                          } as React.CSSProperties
                        }
                      />
                    </div>
                    <em data-count>{language.percentage.toFixed(1)}%</em>
                  </li>
                ))}
              </ol>
              <div className="all-languages" data-reveal>
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
            <p className="github-method-note" data-reveal>
              This measures repository language bytes, not lines written.
              Generated, vendored, educational, and historical code can
              influence the distribution.
            </p>
          </section>

          <section
            className="github-section"
            aria-labelledby="repositories-title"
          >
            <Rule />
            <header className="github-section-heading" data-reveal>
              <p>03 · Repositories</p>
              <div>
                <h2 id="repositories-title">
                  Recently updated public repositories.
                </h2>
                <p>
                  Public repositories are listed with their primary language and
                  most recent push date. Private repositories contribute only to
                  the summary counts.
                </p>
              </div>
            </header>
            <div className="repository-summary" data-reveal="list">
              <p>
                <strong data-count>{stats.repositories.public}</strong>
                Public
              </p>
              <p>
                <strong data-count>{stats.repositories.private}</strong>
                Private
              </p>
              <p>
                <strong data-count>{stats.repositories.stars}</strong>
                Stars
              </p>
              <p>
                <strong data-count>{stats.repositories.forks}</strong>
                Forks
              </p>
            </div>
            <ol className="recent-repositories" data-reveal="list">
              {stats.recentRepositories.map((repository, index) => (
                <li key={repository.name}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{repository.name}</h3>
                    <p>{repository.description || "Public repository"}</p>
                  </div>
                  <div>
                    {repository.language ? (
                      <span>
                        <i
                          style={{ backgroundColor: repository.language.color }}
                        />
                        {repository.language.name}
                      </span>
                    ) : null}
                    <time dateTime={repository.pushedAt}>
                      {formatDate(repository.pushedAt)}
                    </time>
                  </div>
                  <a href={repository.url} target="_blank" rel="noreferrer">
                    Source ↗
                  </a>
                </li>
              ))}
            </ol>
          </section>

          <section
            className="github-section"
            aria-labelledby="stack-context-title"
          >
            <Rule />
            <header className="github-section-heading" data-reveal>
              <p>04 · Stack context</p>
              <div>
                <h2 id="stack-context-title">
                  Framework and infrastructure context.
                </h2>
                <p>
                  Language statistics do not identify frameworks, hosting,
                  databases, or delivery tools. Those details come from the
                  documented projects and experience on this site.
                </p>
              </div>
            </header>
            <div className="github-stack-context" data-reveal="list">
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
          <p>
            The portfolio remains available while the private stats connection
            recovers.
          </p>
        </section>
      )}

      <footer className="github-footer" data-reveal>
        <p>
          For implementation details, architecture, and tests, continue to the
          selected projects.
        </p>
        <Link href="/#my-work">See selected work →</Link>
      </footer>
    </main>
  );
}
