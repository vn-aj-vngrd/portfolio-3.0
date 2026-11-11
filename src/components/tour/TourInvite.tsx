"use client";

import { useEffect, useRef } from "react";

import {
  formatClock,
  TOUR_TIMELINE_ESTIMATE,
  withoutTourLink,
} from "@/lib/tour";

import {
  closeTourInvite,
  loadTourPrefs,
  preloadTour,
  primeAudio,
  setTourPreference,
  startTour,
  useTour,
} from "./store";
import { MusicIcon, VoiceIcon } from "./TourIcons";

function clockLabel(seconds: number) {
  const whole = Math.round(seconds);
  return `${Math.floor(whole / 60)} min ${String(whole % 60).padStart(2, "0")} s`;
}

/** Start card for an external `/?tour` link: the browser needs one click before it plays sound. */
export function TourInvite({ chapter }: { chapter: string | null }) {
  const { voice, music } = useTour();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const timeline = TOUR_TIMELINE_ESTIMATE;
  const chapterIndex = chapter
    ? timeline.chapters.findIndex((item) => item.key === chapter)
    : -1;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    loadTourPrefs();
    preloadTour();
    if (!dialog.open) dialog.showModal();
    dialog.querySelector<HTMLElement>(".tour-invite-play")?.focus();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  const dismiss = () => {
    window.history.replaceState(
      null,
      "",
      withoutTourLink(window.location.href)
    );
    closeTourInvite();
  };

  const play = () => {
    primeAudio();
    window.history.replaceState(
      null,
      "",
      withoutTourLink(window.location.href)
    );
    closeTourInvite();
    startTour({
      chapterKey: chapterIndex >= 0 ? chapter : null,
      invoker: null,
    });
  };

  return (
    <dialog
      ref={dialogRef}
      className="tour-invite"
      aria-labelledby="tour-invite-title"
      aria-describedby="tour-invite-body"
      data-lenis-prevent
      onCancel={(event) => {
        event.preventDefault();
        dismiss();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) dismiss();
      }}
    >
      <p className="tour-invite-kicker">
        Guided tour · {clockLabel(timeline.duration)}
        {chapterIndex > 0
          ? ` · starts at ${timeline.chapters[chapterIndex].title}`
          : ""}
      </p>
      <h2 id="tour-invite-title">A narrated walk through Van’s work.</h2>
      <p id="tour-invite-body" className="tour-invite-body">
        Products, engineering approach, experience, and how to reach him.
        Captions are always on; sound is recommended.
      </p>

      <ol className="tour-ledger">
        {timeline.chapters.map((item, i) => (
          <li
            key={item.key}
            aria-current={i === chapterIndex ? "step" : undefined}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            <strong>{item.title}</strong>
            <time>{formatClock(item.end - item.start)}</time>
          </li>
        ))}
      </ol>

      <div className="tour-invite-toggles" role="group" aria-label="Sound">
        <button
          type="button"
          aria-pressed={voice}
          onClick={() => setTourPreference("voice", !voice)}
        >
          <VoiceIcon on={voice} />
          Narration
        </button>
        <button
          type="button"
          aria-pressed={music}
          onClick={() => setTourPreference("music", !music)}
        >
          <MusicIcon on={music} />
          Music
        </button>
      </div>

      <button type="button" className="tour-invite-play" onClick={play}>
        Play tour
      </button>
      <button type="button" className="tour-invite-skip" onClick={dismiss}>
        Explore on my own
      </button>
      <p className="tour-invite-hint">
        Space pauses · ← → change chapter · Esc ends
      </p>
    </dialog>
  );
}
