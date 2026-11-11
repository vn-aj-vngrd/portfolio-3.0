"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { profile } from "@/content/profile";
import { SITE_URL } from "@/lib/seo";
import { formatClock } from "@/lib/tour";

import { onTourFrame, TOUR_SPEEDS, tourControl, useTour } from "./store";
import {
  CloseIcon,
  MusicIcon,
  NextIcon,
  PauseIcon,
  PlayIcon,
  PrevIcon,
  VoiceIcon,
} from "./TourIcons";

const pad = (value: number) => String(value).padStart(2, "0");

export default function TourPlayer() {
  const tour = useTour();
  const { timeline, status } = tour;
  const rootRef = useRef<HTMLElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const replayRef = useRef<HTMLButtonElement>(null);
  const ended = status === "ended";
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${SITE_URL}/?tour`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the link is also the page address plus ?tour.
    }
  };

  // Publish the player height so the page can leave room for it, then re-align.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const html = document.documentElement;
    const publish = () => {
      html.style.setProperty(
        "--tour-player-h",
        `${Math.ceil(root.getBoundingClientRect().height + 24)}px`
      );
    };
    publish();
    tourControl((director) => director.realign());
    const observer = new ResizeObserver(publish);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  // Clock and scrubber fill are written straight to the DOM every frame.
  useEffect(() => {
    return onTourFrame((time) => {
      if (clockRef.current) {
        clockRef.current.textContent = `${formatClock(time)} / ${formatClock(timeline.duration)}`;
      }
      timeline.chapters.forEach((chapter, i) => {
        const fill = fillRefs.current[i];
        if (!fill) return;
        const span = chapter.end - chapter.start;
        const progress = Math.min(
          Math.max((time - chapter.start) / span, 0),
          1
        );
        fill.style.transform = `scaleX(${progress})`;
      });
    });
  }, [timeline]);

  useEffect(() => {
    if (ended) replayRef.current?.focus();
  }, [ended]);

  const chapter = timeline.chapters[tour.chapter];
  const total = timeline.chapters.length;
  const paused = status === "paused";
  const loading = status === "loading";
  const speedLabel = `${tour.speed}×`;
  const nextSpeed =
    TOUR_SPEEDS[(TOUR_SPEEDS.indexOf(tour.speed) + 1) % TOUR_SPEEDS.length];
  const captionsLive = !tour.voice || tour.narration !== "ready";

  const announcement = loading
    ? "Preparing the tour"
    : status === "ended"
      ? "Tour ended"
      : paused
        ? "Paused"
        : `Chapter ${tour.chapter + 1} of ${total}: ${chapter.title}`;

  const metaLeft = `${pad(tour.chapter + 1)} / ${pad(total)} · ${chapter.title}`;
  let metaState = "";
  if (loading) {
    metaState = "Preparing the tour…";
  } else if (paused) {
    metaState =
      tour.pauseReason === "scroll"
        ? `Paused · Resume returns to ${chapter.title}`
        : "Paused";
  } else if (tour.narration === "unavailable") {
    metaState = "Captions only";
  }

  return (
    <div className="tour-player-wrap">
      <section
        ref={rootRef}
        className="tour-player"
        aria-label="Guided tour"
        data-status={status}
        tabIndex={-1}
      >
        <div className="tour-meta">
          <span>
            {ended ? "Tour complete" : metaLeft}
            {!ended && metaState ? ` · ${metaState}` : ""}
            {tour.soundBlocked && !ended ? (
              <>
                {" · "}
                <button
                  type="button"
                  className="tour-meta-action"
                  onClick={() =>
                    tourControl((director) => director.enableSound())
                  }
                >
                  Turn on sound
                </button>
              </>
            ) : null}
          </span>
          <span ref={clockRef}>
            {formatClock(0)} / {formatClock(timeline.duration)}
          </span>
        </div>

        <p className="tour-caption" aria-live={captionsLive ? "polite" : "off"}>
          {ended ? (
            <span className="tour-caption-text">That’s the tour.</span>
          ) : tour.cue ? (
            <span key={tour.cue} className="tour-caption-text">
              {tour.cue}
            </span>
          ) : null}
        </p>

        <div className="tour-scrubber">
          {timeline.chapters.map((item, i) => {
            const current = i === tour.chapter && !ended;
            return (
              <button
                key={item.key}
                type="button"
                className="tour-seg"
                style={{ flexGrow: item.end - item.start }}
                aria-label={`Chapter ${i + 1} of ${total}: ${item.title}`}
                aria-current={current ? "step" : undefined}
                onClick={() =>
                  tourControl((director) => director.goToChapter(i))
                }
              >
                <span className="tour-seg-track">
                  <span
                    className="tour-seg-fill"
                    ref={(node) => {
                      fillRefs.current[i] = node;
                    }}
                  />
                </span>
              </button>
            );
          })}
        </div>

        {ended ? (
          <div className="tour-end" role="group" aria-label="After the tour">
            <button
              ref={replayRef}
              type="button"
              onClick={() => tourControl((director) => director.replay())}
            >
              Replay
            </button>
            <Link href="/resume">Résumé ↗</Link>
            <a href={`mailto:${profile.email}`}>Email Van</a>
            <button type="button" onClick={copyLink}>
              {copied ? "Copied" : "Copy tour link"}
            </button>
            <button
              type="button"
              className="tour-icon-button"
              aria-label="Close the tour"
              onClick={() => tourControl((director) => director.stop())}
            >
              <CloseIcon />
            </button>
          </div>
        ) : (
          <div
            className="tour-controls"
            role="group"
            aria-label="Tour controls"
          >
            <div className="tour-group">
              <button
                type="button"
                className="tour-icon-button"
                aria-label="Previous chapter"
                onClick={() => tourControl((director) => director.prev())}
              >
                <PrevIcon />
              </button>
              <button
                type="button"
                className="tour-icon-button tour-primary"
                aria-label={paused ? "Resume" : "Pause"}
                aria-busy={loading || undefined}
                data-busy={loading || undefined}
                onClick={() => tourControl((director) => director.toggle())}
              >
                {paused ? <PlayIcon /> : <PauseIcon />}
              </button>
              <button
                type="button"
                className="tour-icon-button"
                aria-label="Next chapter"
                onClick={() => tourControl((director) => director.next())}
              >
                <NextIcon />
              </button>
            </div>
            <span className="tour-chapter-title">{chapter.title}</span>
            <div className="tour-group">
              <button
                type="button"
                className="tour-icon-button tour-speed"
                aria-label={`Playback speed ${speedLabel}. Change to ${nextSpeed}×`}
                title="Playback speed"
                onClick={() =>
                  tourControl((director) => director.setSpeed(nextSpeed))
                }
              >
                {speedLabel}
              </button>
              <button
                type="button"
                className="tour-icon-button"
                aria-label="Narration"
                aria-pressed={tour.voice}
                onClick={() =>
                  tourControl((director) => director.setVoice(!tour.voice))
                }
              >
                <VoiceIcon on={tour.voice} />
              </button>
              <button
                type="button"
                className="tour-icon-button"
                aria-label="Music"
                aria-pressed={tour.music}
                onClick={() =>
                  tourControl((director) => director.setMusic(!tour.music))
                }
              >
                <MusicIcon on={tour.music} />
              </button>
              <button
                type="button"
                className="tour-icon-button"
                aria-label="End tour"
                onClick={() => tourControl((director) => director.stop())}
              >
                <CloseIcon />
              </button>
            </div>
          </div>
        )}

        <p className="sr-only" role="status">
          {copied ? "Tour link copied" : announcement}
        </p>
      </section>
    </div>
  );
}
