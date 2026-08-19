import Link from "next/link";

import { ContributionGraph } from "@/components/github/ContributionGraph";
import { getGitHubStats } from "@/lib/github-stats";

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export async function GitHubSnapshot() {
  const stats = await getGitHubStats();
  if (!stats) return null;

  return (
    <section className="section github-snapshot" aria-labelledby="github-snapshot-title" data-reveal>
      <div className="github-snapshot-copy">
        <p>GitHub activity · private included</p>
        <h2 id="github-snapshot-title">GitHub activity from the last twelve months.</h2>
        <p>
          The summary includes private contribution and repository counts. It does
          not request or display private repository names, organizations, or source code.
        </p>
        <Link href="/github">Explore GitHub activity →</Link>
      </div>
      <div className="github-snapshot-data">
        <dl>
          <div>
            <dt>{formatNumber(stats.contributions.total)}</dt>
            <dd>Contributions</dd>
          </div>
          <div>
            <dt>{formatNumber(stats.contributions.private)}</dt>
            <dd>Private</dd>
          </div>
          <div>
            <dt>{stats.repositories.total}</dt>
            <dd>Repositories</dd>
          </div>
          <div>
            <dt>{stats.languages[0]?.name ?? "N/A"}</dt>
            <dd>Top language</dd>
          </div>
        </dl>
        <ContributionGraph calendar={stats.contributions.calendar} compact />
      </div>
    </section>
  );
}
