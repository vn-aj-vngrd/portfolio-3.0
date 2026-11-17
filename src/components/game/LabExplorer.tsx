"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import type { LabGame, LabGameId } from "@/content/lab";

const ProductLabScene = dynamic(
  () => import("./ProductLabScene").then((module) => module.ProductLabScene),
  {
    ssr: false,
    loading: () => (
      <div className="product-lab-scene-loading" role="status">
        <span />
        Preparing the lab…
      </div>
    ),
  }
);

export function LabExplorer({ games }: { games: readonly LabGame[] }) {
  const router = useRouter();
  const [focus, setFocus] = useState<LabGameId | null>(null);
  const active = games.find((game) => game.id === focus);

  const handleSelect = useCallback(
    (id: LabGameId) => {
      const game = games.find((entry) => entry.id === id);
      if (game) router.push(`/lab/${game.slug}`);
    },
    [games, router]
  );

  return (
    <section
      className="lab-explorer"
      aria-labelledby="lab-index-title"
      data-reveal
    >
      <div className="product-lab-visual lab-explorer-visual">
        <ProductLabScene
          focus={focus}
          onFocus={setFocus}
          onSelect={handleSelect}
        />
        <p className="lab-explorer-readout" aria-hidden="true">
          <span>{active ? active.index : "00"}</span>
          {active ? active.title : "Point at a station"}
        </p>
        <span className="product-lab-coordinate" aria-hidden="true">
          CEB · 10.3157° N / 123.8854° E
        </span>
      </div>

      <div className="lab-explorer-list">
        <header>
          <p>Experiments</p>
          <h2 id="lab-index-title">Choose an experiment.</h2>
        </header>
        <ol onPointerLeave={() => setFocus(null)}>
          {games.map((game) => (
            <li
              className="lab-entry"
              key={game.id}
              data-active={focus === game.id}
              onPointerEnter={() => setFocus(game.id)}
              onFocus={() => setFocus(game.id)}
              onBlur={() => setFocus(null)}
            >
              <span className="lab-entry-index">{game.index}</span>
              <div className="lab-entry-copy">
                <p>{game.kind}</p>
                <h3>
                  <Link href={`/lab/${game.slug}`}>{game.title}</Link>
                </h3>
                <span>{game.shows}</span>
              </div>
              <p className="lab-entry-go">
                <span>{game.duration}</span>
                <b>
                  Play <i aria-hidden="true">→</i>
                </b>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
