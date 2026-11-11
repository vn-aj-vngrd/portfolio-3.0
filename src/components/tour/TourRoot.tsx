"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { usePortfolioNavigation } from "@/components/providers/PortfolioNavigation";

import {
  attachTourScroller,
  isTourActive,
  tourControl,
  useTour,
} from "./store";

const TourPlayer = dynamic(() => import("./TourPlayer"), { ssr: false });

export function TourRoot() {
  const pathname = usePathname();
  const { scrollPageTo } = usePortfolioNavigation();
  const { status } = useTour();
  const previousPathname = useRef(pathname);

  useEffect(() => attachTourScroller({ scrollPageTo }), [scrollPageTo]);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    if (isTourActive()) tourControl((director) => director.stop());
  }, [pathname]);

  return status === "idle" ? null : <TourPlayer />;
}
