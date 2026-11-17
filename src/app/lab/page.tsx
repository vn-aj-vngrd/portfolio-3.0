import Link from "next/link";

import { LabExplorer } from "@/components/game/LabExplorer";
import { labGames } from "@/content/lab";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Product Lab",
  description:
    "Three short 3D experiments that turn how Van AJ Vanguardia chooses a stack, ships a release, and matches products to problems into something playable.",
  path: "/lab",
});

export default function LabPage() {
  return (
    <main id="main-content" className="lab-page">
      <section
        className="lab-hero"
        aria-labelledby="lab-title"
        data-reveal="list"
      >
        <Link className="page-back-link" href="/">
          <span aria-hidden="true">←</span> Back to portfolio
        </Link>
        <div className="lab-hero-grid">
          <div>
            <p className="lab-kicker">Product Lab</p>
            <h1 id="lab-title">Build, release, and explore the work.</h1>
          </div>
          <p>
            Three short 3D experiments. Each one turns a part of how I work into
            something you can play in under a minute. No scoreboards, logins, or
            technical knowledge required.
          </p>
        </div>
      </section>

      <LabExplorer games={labGames} />

      <footer className="lab-footer" data-reveal>
        <p>
          The experiments are a quick read. The case studies hold the evidence.
        </p>
        <Link href="/#my-work">See what I build →</Link>
      </footer>
    </main>
  );
}
