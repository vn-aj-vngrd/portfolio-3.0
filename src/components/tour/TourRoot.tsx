"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { usePortfolioNavigation } from "@/components/providers/PortfolioNavigation";
import { parseTourLink } from "@/lib/tour";

import {
  attachTourScroller,
  isTourActive,
  openTourInvite,
  startTour,
  takePendingTour,
  tourControl,
  useTour,
} from "./store";
import { TourInvite } from "./TourInvite";

const TourPlayer = dynamic(() => import("./TourPlayer"), { ssr: false });

const nextFrame = () =>
  new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()));

export function TourRoot() {
  const pathname = usePathname();
  const { scrollPageTo } = usePortfolioNavigation();
  const { status, invite } = useTour();
  const previousPathname = useRef(pathname);

  useEffect(() => attachTourScroller({ scrollPageTo }), [scrollPageTo]);

  // Leaving the home page ends the tour.
  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    if (isTourActive()) tourControl((director) => director.stop());
  }, [pathname]);

  // A share link opens the start card; a start requested from another route begins here.
  useEffect(() => {
    if (pathname !== "/") return;
    let cancelled = false;

    const pending = takePendingTour();
    if (pending) {
      void (async () => {
        await document.fonts.ready;
        await nextFrame();
        await nextFrame();
        if (cancelled) return;
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        startTour({ chapterKey: pending.chapterKey, invoker: pending.invoker });
      })();
      return () => {
        cancelled = true;
      };
    }

    const link = parseTourLink(window.location.search);
    if (link && !isTourActive()) openTourInvite(link.chapter);
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return (
    <>
      {invite ? <TourInvite chapter={invite.chapter} /> : null}
      {status === "idle" ? null : <TourPlayer />}
    </>
  );
}
