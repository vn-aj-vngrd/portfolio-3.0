"use client";

import type Lenis from "lenis";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export const portfolioSections = [
  { href: "/#my-work", id: "my-work", label: "My work", index: "01" },
  { href: "/#tech-stack", id: "tech-stack", label: "Tech stack", index: "02" },
  { href: "/#experience", id: "experience", label: "Experience", index: "03" },
  { href: "/#credentials", id: "credentials", label: "Credentials", index: "04" },
  { href: "/#about", id: "about", label: "About", index: "05" },
  { href: "/#contact", id: "contact", label: "Contact", index: "06" },
] as const;

type PortfolioSectionId = (typeof portfolioSections)[number]["id"];

type ScrollAdapter = {
  destroy: () => void;
  resize: () => void;
  scrollTo: (target: HTMLElement | number, immediate: boolean) => void;
};

type PortfolioNavigationValue = {
  activeSection: PortfolioSectionId | null;
  navigateToSection: (id: PortfolioSectionId) => void;
};

const PortfolioNavigationContext = createContext<PortfolioNavigationValue | null>(null);

const legacySectionIds: Record<string, PortfolioSectionId> = {
  work: "my-work",
  engineering: "tech-stack",
  certifications: "credentials",
};

function createNativeScrollAdapter(reducedMotion: MediaQueryList): ScrollAdapter {
  return {
    destroy() {},
    resize() {},
    scrollTo(target, immediate) {
      if (typeof target === "number") {
        window.scrollTo({ top: target, left: 0, behavior: "auto" });
        return;
      }
      target.scrollIntoView({
        behavior: immediate || reducedMotion.matches ? "auto" : "smooth",
      });
    },
  };
}

function createLenisScrollAdapter(lenis: Lenis): ScrollAdapter {
  return {
    destroy: () => lenis.destroy(),
    resize: () => lenis.resize(),
    scrollTo(target, immediate) {
      lenis.scrollTo(
        target,
        immediate ? { immediate: true, force: true } : { lerp: 0.08 },
      );
    },
  };
}

function resolveSectionId(id: string) {
  return legacySectionIds[id] ?? id;
}

export function PortfolioNavigation({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<PortfolioSectionId | null>(null);
  const adapterRef = useRef<ScrollAdapter | null>(null);
  const stopAlignmentRef = useRef<(() => void) | null>(null);
  const previousPathname = useRef(pathname);

  const scrollToSection = useCallback((id: string, immediate = false) => {
    const target = document.getElementById(id);
    if (!target) return;
    if (immediate) adapterRef.current?.resize();
    adapterRef.current?.scrollTo(target, immediate);
  }, []);

  const navigateToSection = useCallback(
    (id: PortfolioSectionId) => {
      setActiveSection(id);
      stopAlignmentRef.current?.();
      if (pathname !== "/") {
        router.push(`/#${id}`);
        return;
      }
      window.history.replaceState(null, "", `#${id}`);
      scrollToSection(id);
    },
    [pathname, router, scrollToSection],
  );

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let generation = 0;

    const setupAdapter = async () => {
      const currentGeneration = ++generation;
      adapterRef.current?.destroy();
      adapterRef.current = createNativeScrollAdapter(reducedMotion);
      if (reducedMotion.matches) return;

      const { default: LenisConstructor } = await import("lenis");
      if (currentGeneration !== generation) return;

      adapterRef.current = createLenisScrollAdapter(
        new LenisConstructor({
          autoRaf: true,
          lerp: 0.085,
          smoothWheel: true,
          syncTouch: false,
          wheelMultiplier: 0.88,
          prevent: (node) => Boolean(node.closest("[data-lenis-prevent]")),
        }),
      );
    };

    void setupAdapter();
    const handlePreferenceChange = () => void setupAdapter();
    reducedMotion.addEventListener("change", handlePreferenceChange);

    return () => {
      generation += 1;
      reducedMotion.removeEventListener("change", handlePreferenceChange);
      adapterRef.current?.destroy();
      adapterRef.current = null;
    };
  }, []);

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href*='#']");
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== pathname) return;

      const requestedId = decodeURIComponent(url.hash.slice(1));
      const id = resolveSectionId(requestedId);
      const scrollTarget = id ? document.getElementById(id) : document.documentElement;
      if (!scrollTarget) return;

      event.preventDefault();
      stopAlignmentRef.current?.();
      window.history.replaceState(null, "", id ? `#${id}` : pathname);
      if (portfolioSections.some((section) => section.id === id)) {
        setActiveSection(id as PortfolioSectionId);
      }
      adapterRef.current?.scrollTo(scrollTarget, false);
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const sections = portfolioSections
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id as PortfolioSectionId);
      },
      { rootMargin: "-28% 0px -62% 0px", threshold: 0 },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, [pathname]);

  useLayoutEffect(() => {
    if (pathname !== "/") return;

    const requestedId = decodeURIComponent(window.location.hash.slice(1));
    if (!requestedId) return;

    const id = resolveSectionId(requestedId);
    if (id !== requestedId) window.history.replaceState(null, "", `#${id}`);

    const target = document.getElementById(id);
    const main = document.getElementById("main-content");
    if (!target || !main) return;

    const expectedTop = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    let stopped = false;
    let timeout = 0;

    const alignToSection = () => {
      if (stopped || Math.abs(target.getBoundingClientRect().top - expectedTop) <= 2) return;
      scrollToSection(id, true);
    };
    const observer = new ResizeObserver(alignToSection);
    const stopTracking = () => {
      if (stopped) return;
      stopped = true;
      observer.disconnect();
      window.clearTimeout(timeout);
      window.removeEventListener("click", stopTracking);
      window.removeEventListener("wheel", stopTracking);
      window.removeEventListener("touchstart", stopTracking);
      window.removeEventListener("keydown", stopTracking);
      if (stopAlignmentRef.current === stopTracking) stopAlignmentRef.current = null;
    };

    stopAlignmentRef.current?.();
    stopAlignmentRef.current = stopTracking;
    alignToSection();
    observer.observe(main);
    void document.fonts.ready.then(alignToSection);
    timeout = window.setTimeout(stopTracking, 4_000);
    window.addEventListener("click", stopTracking);
    window.addEventListener("wheel", stopTracking, { passive: true });
    window.addEventListener("touchstart", stopTracking, { passive: true });
    window.addEventListener("keydown", stopTracking);

    return stopTracking;
  }, [pathname, scrollToSection]);

  useLayoutEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    if (window.location.hash || pathname === "/") return;
    adapterRef.current?.scrollTo(0, true);
  }, [pathname]);

  const value = useMemo(
    () => ({ activeSection, navigateToSection }),
    [activeSection, navigateToSection],
  );

  return (
    <PortfolioNavigationContext value={value}>
      {children}
    </PortfolioNavigationContext>
  );
}

export function usePortfolioNavigation() {
  const navigation = useContext(PortfolioNavigationContext);
  if (!navigation) {
    throw new Error("usePortfolioNavigation must be used inside PortfolioNavigation");
  }
  return navigation;
}
