"use client";

import { useRef, useState } from "react";

const highlights = [
  {
    label: "Plan",
    title: "Plan it before the chat gets noisy.",
    description: "Venue search, date and time, courts, capacity, booking, and readiness.",
  },
  {
    label: "Invite",
    title: "One link answers every question.",
    description: "Guest RSVP, host approval, capacity, and an automatic waitlist—no account required.",
  },
  {
    label: "Organize",
    title: "Keep the crew, not the admin.",
    description: "Roster controls, recurring groups, calendar, global search, and Play Again.",
  },
  {
    label: "Play",
    title: "Run every court from one phone.",
    description: "Five play formats, paddle stack, fixed pairs, multi-court scoring, and standings.",
  },
  {
    label: "Repay",
    title: "Split what the host already covered.",
    description: "GCash, Maya, bank or cash, proof review, exclusions, and adjusted shares.",
  },
  {
    label: "Stay in sync",
    title: "The conversation stays with the game.",
    description: "Realtime chat, photos, reactions, system updates, and useful notifications.",
  },
  {
    label: "Remember",
    title: "Turn the night into a story.",
    description: "Seven portrait recaps, chosen backgrounds, standings, photos, and shared memories.",
  },
] as const;

function Avatar({ children, tone }: { children: string; tone: "violet" | "blue" | "red" }) {
  return <span className="relay-avatar" data-tone={tone} aria-hidden="true">{children}</span>;
}

function PersonRow({ initial, name, detail, value, tone }: { initial: string; name: string; detail: string; value: string; tone: "violet" | "blue" | "red" }) {
  return (
    <li className="relay-person-row">
      <Avatar tone={tone}>{initial}</Avatar>
      <span><strong>{name}</strong><small>{detail}</small></span>
      <em>{value}</em>
    </li>
  );
}

function HighlightVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="relay-highlight-ui relay-plan-ui">
        <h4>Create a game</h4><p>Set the plan. Share the link.</p>
        <label>Game name<span>Saturday Night Pickle</span></label>
        <label>Venue<span>Central Pickle · BGC</span></label>
        <div className="relay-field-row">
          <label>Date<span>Aug 22</span></label><label>Start<span>7:00 PM</span></label><label>End<span>10:00 PM</span></label>
        </div>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="relay-highlight-ui relay-invite-ui">
        <div className="relay-invite-banner"><small>Saturday, August 22</small><h4>Saturday Night Pickle</h4><p>Central Pickle · 7:00–10:00 PM</p></div>
        <dl><div><dt>Players</dt><dd>8 of 10 going</dd></div><div><dt>Estimated</dt><dd>₱300 / player</dd></div></dl>
        <strong>Join this game</strong><span className="relay-faux-input">Your name</span>
        <div className="relay-rsvp"><span>Going</span><span>Maybe</span><span>Can’t go</span></div>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="relay-highlight-ui relay-organize-ui">
        <div className="relay-readiness"><span><small>Game readiness</small><strong>Almost ready</strong></span><b>75%</b></div>
        <i><span /></i><p className="relay-roster-label">Roster · 8 going · 1 waitlisted <b>Add player</b></p>
        <ul><PersonRow initial="V" name="Van" detail="Host" value="Going" tone="violet" /><PersonRow initial="A" name="AJ" detail="Regular" value="Going" tone="blue" /><PersonRow initial="M" name="Mika" detail="Casual" value="Going" tone="red" /></ul>
      </div>
    );
  }

  if (index === 3) {
    return (
      <div className="relay-highlight-ui relay-play-ui">
        <header><span><small>Court 1</small><strong>Balanced Mix</strong></span><em>● Live</em></header>
        <div className="relay-score"><span><small>Van + AJ</small><strong>8</strong></span><i>VS</i><span><small>Mika + Bea</small><strong>6</strong></span></div>
        <div className="relay-score-controls"><span>− &nbsp; +</span><span>− &nbsp; +</span></div>
      </div>
    );
  }

  if (index === 4) {
    return (
      <div className="relay-highlight-ui relay-repay-ui">
        <small>Court repayment</small><div className="relay-payment-total"><span><strong>₱2,400</strong><small>7 paying players · ₱300 each</small></span><em>2 confirmed</em></div>
        <ul><PersonRow initial="V" name="Van" detail="Paid upfront" value="₱2,400" tone="violet" /><PersonRow initial="A" name="AJ" detail="Confirmed" value="₱300" tone="blue" /><PersonRow initial="M" name="Mika" detail="Proof sent" value="₱300" tone="red" /></ul>
      </div>
    );
  }

  if (index === 5) {
    return (
      <div className="relay-highlight-ui relay-sync-ui">
        <header><span className="relay-avatar-stack"><Avatar tone="violet">V</Avatar><Avatar tone="blue">A</Avatar><Avatar tone="red">M</Avatar></span><span><strong>Saturday Night Pickle</strong><small>8 players in sync</small></span></header>
        <div className="relay-chat"><small>AJ joined the game</small><p><Avatar tone="red">M</Avatar><span>Parking is open beside Court 2.</span></p><p data-own="true"><span>Perfect. I’ll bring the extra balls.</span></p><small>Court 1 match started</small></div>
        <div className="relay-message">Message the group <b>Send</b></div>
      </div>
    );
  }

  return (
    <div className="relay-highlight-ui relay-remember-ui">
      <header><span><small>Session recap</small><strong>Choose your story</strong></span><em>3 of 7</em></header>
      <div className="relay-story-row">
        <article><small>My game</small><strong>3–1</strong><b>Van</b><p>#2 · +12</p></article>
        <article><small>Winning team</small><b>Van + AJ</b><strong>3</strong><p>wins together</p></article>
        <article><small>Standings</small><p>1 Van <b>3–1</b></p><p>2 AJ <b>2–2</b></p><p>3 Mika</p></article>
      </div>
    </div>
  );
}

export function RelayHighlights() {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function moveTo(index: number) {
    const nextIndex = Math.max(0, Math.min(highlights.length - 1, index));
    const card = railRef.current?.querySelector<HTMLElement>(`[data-highlight-index="${nextIndex}"]`);
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setActiveIndex(nextIndex);
  }

  function updateActive() {
    const rail = railRef.current;
    if (!rail) return;
    const cards = Array.from(rail.querySelectorAll<HTMLElement>("[data-highlight-index]"));
    const railLeft = rail.getBoundingClientRect().left;
    const nearest = cards.reduce((best, card, index) => {
      const distance = Math.abs(card.getBoundingClientRect().left - railLeft);
      return distance < best.distance ? { index, distance } : best;
    }, { index: 0, distance: Number.POSITIVE_INFINITY });
    setActiveIndex(nearest.index);
  }

  return (
    <section className="relay-highlights" aria-labelledby="relay-highlights-title" data-reveal>
      <header className="relay-highlights-heading">
        <div><p>Product journey · 7 connected features</p><h2 id="relay-highlights-title">One session, from first plan to shared memory.</h2></div>
        <p>Relay replaces the scattered chat, spreadsheet, scorekeeper, and payment follow-up with one continuous product flow.</p>
      </header>

      <div ref={railRef} className="relay-highlight-rail" role="list" tabIndex={0} aria-label="Relay product highlights" onScroll={updateActive} data-lenis-prevent>
        {highlights.map((highlight, index) => (
          <article key={highlight.label} className="relay-highlight-card" data-highlight-index={index} data-feature={highlight.label.toLowerCase().replaceAll(" ", "-")} role="listitem">
            <p><span>{String(index + 1).padStart(2, "0")}</span> · {highlight.label}</p>
            <h3>{highlight.title}</h3>
            <p>{highlight.description}</p>
            <HighlightVisual index={index} />
          </article>
        ))}
      </div>

      <div className="relay-highlight-controls">
        <p><span>{String(activeIndex + 1).padStart(2, "0")}</span> / {String(highlights.length).padStart(2, "0")}</p>
        <div><button type="button" onClick={() => moveTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Previous Relay feature">←</button><button type="button" onClick={() => moveTo(activeIndex + 1)} disabled={activeIndex === highlights.length - 1} aria-label="Next Relay feature">→</button></div>
      </div>
    </section>
  );
}
