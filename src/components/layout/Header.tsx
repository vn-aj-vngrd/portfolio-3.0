"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { BugHunt } from "@/components/game/BugHunt";
import { InterfaceControls } from "@/components/ui/InterfaceControls";
import { LivePresence } from "@/components/ui/LivePresence";
import { profile } from "@/content/profile";

const links = [
  { href: "/#work", id: "work", label: "Selected work", index: "01" },
  { href: "/#engineering", id: "engineering", label: "How I build", index: "02" },
  { href: "/#experience", id: "experience", label: "Experience", index: "03" },
  { href: "/#certifications", id: "certifications", label: "Credentials", index: "04" },
  { href: "/#about", id: "about", label: "About", index: "05" },
  { href: "/#contact", id: "contact", label: "Contact", index: "06" },
] as const;

const shortcuts = [
  ...links.map((link, index) => ({
    key: String(index + 1),
    label: link.label,
    href: link.href,
    section: link.id,
  })),
  { key: "7", label: "Gear", href: "/gear" },
  { key: "8", label: "Résumé", href: "/resume" },
  { key: "9", label: "Bug hunt", action: "game" },
] as const;

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef<HTMLDetailsElement>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [shortcutMode, setShortcutMode] = useState(false);
  const closeMenu = () => menuRef.current?.removeAttribute("open");

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -62% 0px", threshold: 0 },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.matches("input, textarea, select, [contenteditable='true']");
      if (isTyping) return;

      if (event.key === "Meta" || event.key === "Control") {
        setShortcutMode(true);
        return;
      }

      if (!event.metaKey && !event.ctrlKey) return;
      const shortcut = shortcuts.find((item) => item.key === event.key);
      if (!shortcut) return;

      event.preventDefault();
      if ("action" in shortcut) {
        document.dispatchEvent(new Event("open-bug-hunt"));
        return;
      }

      if ("section" in shortcut) {
        setActiveSection(shortcut.section);
        if (pathname === "/") {
          window.history.replaceState(null, "", `#${shortcut.section}`);
          document.getElementById(shortcut.section)?.scrollIntoView({ behavior: "smooth" });
        } else {
          router.push(shortcut.href);
        }
        return;
      }

      router.push(shortcut.href);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Meta" || event.key === "Control") setShortcutMode(false);
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
  }, [pathname, router]);

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
          <p>Full-stack software engineer</p>
        </div>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => {
            const isActive = pathname === "/" && activeSection === link.id;
            return (
              <Link
                key={link.href}
                href={link.href}
                data-active={isActive}
                aria-current={isActive ? "location" : undefined}
                onClick={() => setActiveSection(link.id)}
              >
                <span>{link.index}</span>
                {link.label}
              </Link>
            );
          })}
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
        </nav>

        <div className="sidebar-game">
          <p className="shortcut-hint">
            Hold <kbd>⌘ / Ctrl</kbd> for shortcuts
          </p>
          <BugHunt />
        </div>

        <div className="sidebar-presence">
          <LivePresence />
        </div>

        <div className="header-utilities">
          <InterfaceControls />
          <details ref={menuRef} className="mobile-menu">
            <summary aria-label="Open navigation">Menu</summary>
            <nav aria-label="Mobile navigation" onClick={closeMenu}>
              {links.map((link) => {
                const isActive = pathname === "/" && activeSection === link.id;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-active={isActive}
                    aria-current={isActive ? "location" : undefined}
                    onClick={() => setActiveSection(link.id)}
                  >
                    <span>{link.index}</span> {link.label}
                  </Link>
                );
              })}
              <button
                className="mobile-game-button"
                type="button"
                onClick={() => document.dispatchEvent(new Event("open-bug-hunt"))}
              >
                Bug hunt <span>⇧ B</span>
              </button>
              <Link
                href="/gear"
                data-active={pathname === "/gear"}
                aria-current={pathname === "/gear" ? "page" : undefined}
              >
                Gear ↗
              </Link>
              <Link
                href="/resume"
                data-active={pathname === "/resume"}
                aria-current={pathname === "/resume" ? "page" : undefined}
              >
                Résumé ↗
              </Link>
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            </nav>
          </details>
        </div>

        <div className="sidebar-bottom">
          <div className="sidebar-contact">
            <p>For work, collaborations, and everything else—reach me at</p>
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

      <aside
        className="shortcut-palette"
        data-visible={shortcutMode}
        aria-hidden={!shortcutMode}
      >
        <header>
          <span>Quick navigation</span>
          <kbd>⌘ / Ctrl</kbd>
        </header>
        <div>
          {shortcuts.map((shortcut) => (
            <span key={shortcut.key}>
              <kbd>{shortcut.key}</kbd>
              {shortcut.label}
            </span>
          ))}
        </div>
        <p>Keep the modifier held, then press a number.</p>
      </aside>
    </header>
  );
}
