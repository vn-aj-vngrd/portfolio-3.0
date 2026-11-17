import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LabStage } from "@/components/game/LabStage";
import { findLabGame, labGames } from "@/content/lab";
import { projectCatalog } from "@/content/projects";
import { createPageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return labGames.map((game) => ({ game: game.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ game: string }>;
}): Promise<Metadata> {
  const { game: slug } = await params;
  const game = findLabGame(slug);
  if (!game) return {};

  return createPageMetadata({
    title: `${game.title} · Product Lab`,
    description: `${game.description} ${game.shows}`,
    path: `/lab/${game.slug}`,
  });
}

export default async function LabGamePage({
  params,
}: {
  params: Promise<{ game: string }>;
}) {
  const { game: slug } = await params;
  const game = findLabGame(slug);
  if (!game) notFound();

  const position = labGames.indexOf(game);
  const next = labGames[(position + 1) % labGames.length];
  const others = labGames.filter((entry) => entry.id !== game.id);

  return (
    <main id="main-content" className="lab-play">
      <LabStage
        game={game}
        total={labGames.length}
        next={{ slug: next.slug, title: next.title }}
        productMatches={
          game.id === "match" ? projectCatalog.productMatches() : []
        }
      />

      <section className="lab-notes" aria-label={`About ${game.title}`}>
        <div>
          <h2>What it shows</h2>
          <p>{game.shows}</p>
        </div>
        <div>
          <h2>How to play</h2>
          <p>{game.howTo}</p>
          <dl>
            {game.controls.map((control) => (
              <div key={control.keys}>
                <dt>
                  <kbd>{control.keys}</kbd>
                </dt>
                <dd>{control.action}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2>More experiments</h2>
          <nav aria-label="More experiments">
            {others.map((entry) => (
              <Link key={entry.id} href={`/lab/${entry.slug}`}>
                <span>{entry.index}</span>
                <strong>{entry.title}</strong>
                <i aria-hidden="true">→</i>
              </Link>
            ))}
            <Link href="/lab">
              <span aria-hidden="true">←</span>
              <strong>All experiments</strong>
            </Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
