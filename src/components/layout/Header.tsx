"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ProductLab } from "@/components/game/ProductLab";
import {
  portfolioSections,
  usePortfolioNavigation,
} from "@/components/providers/PortfolioNavigation";
import { InterfaceControls } from "@/components/ui/InterfaceControls";
import { LivePresence } from "@/components/ui/LivePresence";
import { profile } from "@/content/profile";
import {
  isPlatformModifierPressed,
  usePlatformModifier,
} from "@/hooks/usePlatformModifier";

function setMobileMenuIsolation(open: boolean) {
  for (const element of document.querySelectorAll<HTMLElement>(
    ".skip-link, .site-identity, main, .site-footer",
  )) {
    element.inert = open;
  }
}

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

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef<HTMLDetailsElement>(null);
  const menuCloseTimer = useRef<number | null>(null);
  const [shortcutMode, setShortcutMode] = useState(false);
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

  const handleMenuToggle = () => {
    const open = Boolean(menuRef.current?.open);
    if (open) {
      delete menuRef.current?.dataset.closing;
      window.requestAnimationFrame(() => {
        menuRef.current?.querySelector<HTMLElement>(".mobile-menu-panel header button")?.focus();
      });
    }
    document.documentElement.classList.toggle("mobile-menu-open", open);
    setMobileMenuIsolation(open);
  };

  useEffect(() => () => {
    if (menuCloseTimer.current) window.clearTimeout(menuCloseTimer.current);
    document.documentElement.classList.remove("mobile-menu-open");
    setMobileMenuIsolation(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.matches("input, textarea, select, [contenteditable='true']");
      if (isTyping) return;

      const isModifierKey =
        (platformModifier === "⌘" && event.key === "Meta") ||
        (platformModifier === "Ctrl" && event.key === "Control") ||
        (platformModifier === null && (event.key === "Meta" || event.key === "Control"));
      if (isModifierKey) {
        setShortcutMode(true);
        return;
      }

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
        (platformModifier === null && (event.key === "Meta" || event.key === "Control"));
      if (isModifierKey) setShortcutMode(false);
    };
    const handleBlur = () => setShortcutMode(false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, [navigateToSection, platformModifier, router]);

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
          <p>Full-stack software developer</p>
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
            <span>↗</span>
            AI workflow
          </Link>
          <Link
            href="/github"
            data-active={pathname === "/github"}
            aria-current={pathname === "/github" ? "page" : undefined}
          >
            <span>↗</span>
            GitHub stats
          </Link>
          <Link
            href="/design"
            data-active={pathname === "/design"}
            aria-current={pathname === "/design" ? "page" : undefined}
          >
            <span>↗</span>
            Design system
          </Link>
          <Link
            href="/gear"
            data-active={pathname === "/gear"}
            aria-current={pathname === "/gear" ? "page" : undefined}
          >
            <span>↗</span>
            Gear
          </Link>
          <Link
            href="/resume"
            data-active={pathname === "/resume"}
            aria-current={pathname === "/resume" ? "page" : undefined}
          >
            <span>↗</span>
            Résumé
          </Link>
          <span className="nav-divider" aria-hidden="true" />
        </nav>

        <ProductLab />

        <div className="sidebar-dock">
          <div className="sidebar-presence">
            <LivePresence />
          </div>

          <div className="header-utilities">
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
                  <Link href="/" onClick={closeMenu}>Van AJ Vanguardia</Link>
                  <button type="button" onClick={closeMenu} aria-label="Close navigation menu">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="m6 6 12 12M18 6 6 18" />
                    </svg>
                  </button>
                </header>

                <div className="mobile-menu-content">
                  <p className="mobile-menu-label">Portfolio index</p>
                  <nav className="mobile-primary-nav" aria-label="Mobile navigation">
                    {portfolioSections.map((link) => {
                      const isActive = pathname === "/" && activeSection === link.id;
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
                        document.dispatchEvent(new Event("open-product-lab"));
                      }}
                    >
                      <span>Open Product Lab</span>
                      <kbd>{platformModifier ? `${platformModifier} K` : "K"}</kbd>
                    </button>
                  </div>

                  <div className="mobile-menu-explore">
                    <p className="mobile-menu-label">Explore</p>
                    <nav aria-label="Additional pages">
                      <Link href="/ai" onClick={closeMenu} data-active={pathname === "/ai"} aria-current={pathname === "/ai" ? "page" : undefined}>AI workflow <span>↗</span></Link>
                      <Link href="/github" onClick={closeMenu} data-active={pathname === "/github"} aria-current={pathname === "/github" ? "page" : undefined}>GitHub stats <span>↗</span></Link>
                      <Link href="/design" onClick={closeMenu} data-active={pathname === "/design"} aria-current={pathname === "/design" ? "page" : undefined}>Design system <span>↗</span></Link>
                      <Link href="/gear" onClick={closeMenu} data-active={pathname === "/gear"} aria-current={pathname === "/gear" ? "page" : undefined}>Gear <span>↗</span></Link>
                      <Link href="/resume" onClick={closeMenu} data-active={pathname === "/resume"} aria-current={pathname === "/resume" ? "page" : undefined}>Résumé <span>↗</span></Link>
                      <a href={profile.github} target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
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

          <div className="sidebar-bottom">
            <div className="sidebar-contact">
              <p>Contact</p>
              <a className="sidebar-email" href={`mailto:${profile.email}`}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
                <span>{profile.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <aside
        className="shortcut-palette"
        data-visible={shortcutMode}
        aria-hidden={!shortcutMode}
      >
        <header>
          <span>Quick navigation</span>
          <kbd>{platformModifier ?? "Modifier"}</kbd>
        </header>
        <div>
          {shortcuts.map((shortcut) => (
            <span key={shortcut.key}>
              <kbd>{shortcut.key}</kbd>
              {shortcut.label}
            </span>
          ))}
        </div>
        <p>Keep {platformModifier ?? "the modifier"} held, then press a number.</p>
      </aside>
    </header>
  );
}
