"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  ProductLab,
  type ProductLabHandle,
} from "@/components/game/ProductLab";
import {
  AiWorkflowIcon,
  DesignSystemIcon,
  GearIcon,
  GitHubStatsIcon,
  ProductLabIcon,
  QuickNavIcon,
  ResumeIcon,
} from "@/components/layout/NavIcons";
import {
  portfolioSections,
  usePortfolioNavigation,
} from "@/components/providers/PortfolioNavigation";
import { TourEntry } from "@/components/tour/TourEntry";
import { InterfaceControls } from "@/components/ui/InterfaceControls";
import { LivePresence } from "@/components/ui/LivePresence";
import { profile } from "@/content/profile";
import {
  isPlatformModifierPressed,
  usePlatformModifier,
} from "@/hooks/usePlatformModifier";
import type { ProductMatchEntry } from "@/types/content";

function setMobileMenuIsolation(open: boolean) {
  for (const element of document.querySelectorAll<HTMLElement>(
    ".skip-link, .site-identity, main, .site-footer"
  )) {
    element.inert = open;
  }
}

const QUICK_NAV_HINT_KEY = "portfolio-quick-nav-hint";

const shortcuts = [
  ...portfolioSections.map((link, index) => ({
    key: String(index + 1),
    label: link.label,
    href: link.href,
    section: link.id,
  })),
  { key: "7", label: "AI workflow", href: "/ai" },
  { key: "8", label: "GitHub stats", href: "/github" },
  { key: "9", label: "Gear", href: "/gear" },
  { key: "0", label: "Résumé", href: "/resume" },
] as const;

export function Header({
  productMatches,
}: {
  productMatches: readonly ProductMatchEntry[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef<HTMLDetailsElement>(null);
  const productLabRef = useRef<ProductLabHandle>(null);
  const menuCloseTimer = useRef<number | null>(null);
  const [shortcutMode, setShortcutMode] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const paletteRef = useRef<HTMLElement>(null);
  const paletteInvoker = useRef<HTMLElement | null>(null);
  const platformModifier = usePlatformModifier();
  const { activeSection, navigateToSection } = usePortfolioNavigation();

  const closeMenu = () => {
    const menu = menuRef.current;
    if (!menu?.open) return;

    menu.dataset.closing = "true";
    if (menuCloseTimer.current) window.clearTimeout(menuCloseTimer.current);
    menuCloseTimer.current = window.setTimeout(() => {
      menu.open = false;
      delete menu.dataset.closing;
      document.documentElement.classList.remove("mobile-menu-open");
      setMobileMenuIsolation(false);
      menu.querySelector<HTMLElement>("summary")?.focus();
    }, 280);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuRef.current?.open) closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const handleMenuToggle = () => {
    const open = Boolean(menuRef.current?.open);
    if (open) {
      delete menuRef.current?.dataset.closing;
      window.requestAnimationFrame(() => {
        menuRef.current
          ?.querySelector<HTMLElement>(".mobile-menu-panel header button")
          ?.focus();
      });
    }
    document.documentElement.classList.toggle("mobile-menu-open", open);
    setMobileMenuIsolation(open);
  };

  useEffect(
    () => () => {
      if (menuCloseTimer.current) window.clearTimeout(menuCloseTimer.current);
      document.documentElement.classList.remove("mobile-menu-open");
      setMobileMenuIsolation(false);
    },
    []
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.matches(
        "input, textarea, select, [contenteditable='true']"
      );
      if (isTyping) return;

      const isModifierKey =
        (platformModifier === "⌘" && event.key === "Meta") ||
        (platformModifier === "Ctrl" && event.key === "Control") ||
        (platformModifier === null &&
          (event.key === "Meta" || event.key === "Control"));
      if (isModifierKey) {
        setShortcutMode(true);
        return;
      }
      // A key event without the modifier means it was released unseen (devtools, OS shortcuts).
      if (!event.metaKey && !event.ctrlKey) setShortcutMode(false);

      if (!isPlatformModifierPressed(event, platformModifier)) return;
      const shortcut = shortcuts.find((item) => item.key === event.key);
      if (!shortcut) return;

      event.preventDefault();
      if ("section" in shortcut) {
        navigateToSection(shortcut.section);
        return;
      }

      router.push(shortcut.href);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const isModifierKey =
        (platformModifier === "⌘" && event.key === "Meta") ||
        (platformModifier === "Ctrl" && event.key === "Control") ||
        (platformModifier === null &&
          (event.key === "Meta" || event.key === "Control"));
      if (isModifierKey) setShortcutMode(false);
    };
    const handleBlur = () => setShortcutMode(false);
    const handlePointer = (event: PointerEvent) => {
      if (!event.metaKey && !event.ctrlKey) setShortcutMode(false);
    };

    window.addEventListener("pointerdown", handlePointer);
    document.addEventListener("visibilitychange", handleBlur);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("pointerdown", handlePointer);
      document.removeEventListener("visibilitychange", handleBlur);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, [navigateToSection, platformModifier, router]);

  const dismissHint = useCallback(() => {
    setHintVisible(false);
    try {
      window.localStorage.setItem(QUICK_NAV_HINT_KEY, "seen");
    } catch {
      // Storage can be blocked; the hint then simply shows again next visit.
    }
  }, []);

  const closePalette = useCallback((restoreFocus = true) => {
    setPaletteOpen(false);
    if (restoreFocus) paletteInvoker.current?.focus();
    paletteInvoker.current = null;
  }, []);

  const openPalette = useCallback(
    (invoker: HTMLElement | null) => {
      paletteInvoker.current = invoker;
      setPaletteOpen(true);
      dismissHint();
    },
    [dismissHint]
  );

  // Pinned panel: Esc and a press outside close it; focus moves in.
  useEffect(() => {
    if (!paletteOpen) return;
    paletteRef.current
      ?.querySelector<HTMLButtonElement>("[data-palette-close]")
      ?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePalette();
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (target && paletteRef.current?.contains(target)) return;
      if (
        target instanceof Element &&
        target.closest("[data-quick-nav-trigger]")
      )
        return;
      closePalette(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [closePalette, paletteOpen]);

  // One-time hint for visitors with a keyboard: shown once, never during the tour.
  useEffect(() => {
    let seen = false;
    try {
      seen = window.localStorage.getItem(QUICK_NAV_HINT_KEY) === "seen";
    } catch {
      seen = false;
    }
    if (seen) return;
    if (!window.matchMedia("(min-width: 981px) and (hover: hover)").matches)
      return;
    const show = window.setTimeout(() => {
      if (document.documentElement.hasAttribute("data-tour")) return;
      setHintVisible(true);
    }, 7000);
    return () => window.clearTimeout(show);
  }, []);

  useEffect(() => {
    if (!hintVisible) return;
    const hide = window.setTimeout(dismissHint, 11000);
    return () => window.clearTimeout(hide);
  }, [dismissHint, hintVisible]);

  useEffect(() => {
    if (shortcutMode && hintVisible) dismissHint();
  }, [dismissHint, hintVisible, shortcutMode]);

  const goTo = (shortcut: (typeof shortcuts)[number]) => {
    closePalette(false);
    if ("section" in shortcut) navigateToSection(shortcut.section);
    else router.push(shortcut.href);
  };

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="site-identity">
          <Link
            className="site-name"
            href="/"
            aria-label="Van AJ Vanguardia, home"
          >
            {profile.name}
          </Link>
          <p>AI Product Engineer / Software Engineer</p>
        </div>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {portfolioSections.map((link) => {
            const isActive = pathname === "/" && activeSection === link.id;
            return (
              <Link
                key={link.href}
                href={link.href}
                data-active={isActive}
                aria-current={isActive ? "location" : undefined}
              >
                <span>{link.index}</span>
                {link.label}
              </Link>
            );
          })}
          <span className="nav-divider" aria-hidden="true" />
          <Link
            href="/ai"
            data-active={pathname === "/ai"}
            aria-current={pathname === "/ai" ? "page" : undefined}
          >
            <span aria-hidden="true">
              <AiWorkflowIcon />
            </span>
            AI workflow
          </Link>
          <Link
            href="/github"
            data-active={pathname === "/github"}
            aria-current={pathname === "/github" ? "page" : undefined}
          >
            <span aria-hidden="true">
              <GitHubStatsIcon />
            </span>
            GitHub stats
          </Link>
          <Link
            href="/design"
            data-active={pathname === "/design"}
            aria-current={pathname === "/design" ? "page" : undefined}
          >
            <span aria-hidden="true">
              <DesignSystemIcon />
            </span>
            Design system
          </Link>
          <Link
            href="/gear"
            data-active={pathname === "/gear"}
            aria-current={pathname === "/gear" ? "page" : undefined}
          >
            <span aria-hidden="true">
              <GearIcon />
            </span>
            Gear
          </Link>
          <Link
            href="/resume"
            data-active={pathname === "/resume"}
            aria-current={pathname === "/resume" ? "page" : undefined}
          >
            <span aria-hidden="true">
              <ResumeIcon />
            </span>
            Résumé
          </Link>
          <span className="nav-divider" aria-hidden="true" />
        </nav>

        <TourEntry variant="rail" />

        <ProductLab ref={productLabRef} productMatches={productMatches} />

        <div className="quick-nav-entry">
          <button
            type="button"
            className="quick-nav-trigger"
            data-quick-nav-trigger
            aria-haspopup="dialog"
            aria-expanded={paletteOpen}
            aria-keyshortcuts={
              platformModifier ? `${platformModifier} 1` : undefined
            }
            onClick={(event) =>
              paletteOpen ? closePalette() : openPalette(event.currentTarget)
            }
          >
            <i aria-hidden="true">
              <QuickNavIcon />
            </i>
            <span>Quick navigation</span>
            <kbd aria-hidden="true">
              {platformModifier ? `${platformModifier} 0–9` : "0–9"}
            </kbd>
          </button>
        </div>

        <div className="sidebar-dock">
          <div className="sidebar-presence">
            <LivePresence />
          </div>

          <div className="header-utilities">
            <TourEntry variant="header" />
            <details
              ref={menuRef}
              className="mobile-menu"
              onToggle={handleMenuToggle}
            >
              <summary aria-label="Open navigation menu">
                <span>Menu</span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 8h14M5 16h14" />
                </svg>
              </summary>

              <div className="mobile-menu-panel" data-lenis-prevent>
                <header>
                  <Link href="/" onClick={closeMenu}>
                    Van AJ Vanguardia
                  </Link>
                  <button
                    type="button"
                    onClick={closeMenu}
                    aria-label="Close navigation menu"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="m6 6 12 12M18 6 6 18" />
                    </svg>
                  </button>
                </header>

                <div className="mobile-menu-content">
                  <p className="mobile-menu-label">Portfolio index</p>
                  <nav
                    className="mobile-primary-nav"
                    aria-label="Mobile navigation"
                  >
                    {portfolioSections.map((link) => {
                      const isActive =
                        pathname === "/" && activeSection === link.id;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          data-active={isActive}
                          aria-current={isActive ? "location" : undefined}
                          onClick={closeMenu}
                        >
                          <span>{link.index}</span>
                          <strong>{link.label}</strong>
                          <i aria-hidden="true">→</i>
                        </Link>
                      );
                    })}
                  </nav>

                  <div className="mobile-menu-play">
                    <button
                      className="mobile-game-button"
                      type="button"
                      onClick={() => {
                        closeMenu();
                        productLabRef.current?.open();
                      }}
                    >
                      <span>Open Product Lab</span>
                      <kbd>
                        {platformModifier ? `${platformModifier} K` : "K"}
                      </kbd>
                      <i aria-hidden="true">
                        <ProductLabIcon />
                      </i>
                    </button>
                  </div>

                  <div className="mobile-menu-explore">
                    <p className="mobile-menu-label">Explore</p>
                    <nav aria-label="Additional pages">
                      <Link
                        href="/ai"
                        onClick={closeMenu}
                        data-active={pathname === "/ai"}
                        aria-current={pathname === "/ai" ? "page" : undefined}
                      >
                        AI workflow{" "}
                        <span aria-hidden="true">
                          <AiWorkflowIcon />
                        </span>
                      </Link>
                      <Link
                        href="/github"
                        onClick={closeMenu}
                        data-active={pathname === "/github"}
                        aria-current={
                          pathname === "/github" ? "page" : undefined
                        }
                      >
                        GitHub stats{" "}
                        <span aria-hidden="true">
                          <GitHubStatsIcon />
                        </span>
                      </Link>
                      <Link
                        href="/design"
                        onClick={closeMenu}
                        data-active={pathname === "/design"}
                        aria-current={
                          pathname === "/design" ? "page" : undefined
                        }
                      >
                        Design system{" "}
                        <span aria-hidden="true">
                          <DesignSystemIcon />
                        </span>
                      </Link>
                      <Link
                        href="/gear"
                        onClick={closeMenu}
                        data-active={pathname === "/gear"}
                        aria-current={pathname === "/gear" ? "page" : undefined}
                      >
                        Gear{" "}
                        <span aria-hidden="true">
                          <GearIcon />
                        </span>
                      </Link>
                      <Link
                        href="/resume"
                        onClick={closeMenu}
                        data-active={pathname === "/resume"}
                        aria-current={
                          pathname === "/resume" ? "page" : undefined
                        }
                      >
                        Résumé{" "}
                        <span aria-hidden="true">
                          <ResumeIcon />
                        </span>
                      </Link>
                      <a href={profile.github} target="_blank" rel="noreferrer">
                        GitHub <span>↗</span>
                      </a>
                    </nav>
                  </div>

                  <div className="mobile-menu-contact">
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  </div>
                </div>
              </div>
            </details>

            <div className="interface-controls-shell">
              <span>Interface</span>
              <InterfaceControls />
            </div>
          </div>
        </div>
      </div>

      <aside
        ref={paletteRef}
        className="shortcut-palette"
        data-visible={shortcutMode || paletteOpen}
        data-pinned={paletteOpen}
        aria-hidden={!(shortcutMode || paletteOpen)}
        aria-label="Quick navigation"
        role={paletteOpen ? "dialog" : undefined}
        inert={!paletteOpen}
      >
        <header>
          <span>Quick navigation</span>
          {paletteOpen ? (
            <button
              type="button"
              data-palette-close
              aria-label="Close quick navigation"
              onClick={() => closePalette()}
            >
              ×
            </button>
          ) : (
            <kbd>{platformModifier ?? "Modifier"}</kbd>
          )}
        </header>
        <div>
          {shortcuts.map((shortcut) =>
            paletteOpen ? (
              <button
                type="button"
                key={shortcut.key}
                onClick={() => goTo(shortcut)}
              >
                <kbd>{shortcut.key}</kbd>
                {shortcut.label}
              </button>
            ) : (
              <span key={shortcut.key}>
                <kbd>{shortcut.key}</kbd>
                {shortcut.label}
              </span>
            )
          )}
        </div>
        <p>
          {paletteOpen
            ? `Or keep ${platformModifier ?? "the modifier"} held and press a number.`
            : `Keep ${platformModifier ?? "the modifier"} held, then press a number.`}
        </p>
      </aside>

      <div
        className="shortcut-hint"
        data-visible={hintVisible}
        role="status"
        aria-hidden={!hintVisible}
        inert={!hintVisible}
      >
        <p>
          Hold <kbd>{platformModifier ?? "Ctrl"}</kbd> and press a number to
          jump between sections.
        </p>
        <button
          type="button"
          onClick={(event) => openPalette(event.currentTarget)}
        >
          Show
        </button>
        <button type="button" aria-label="Dismiss tip" onClick={dismissHint}>
          ×
        </button>
      </div>
    </header>
  );
}
