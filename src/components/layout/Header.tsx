"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { InterfaceControls } from "@/components/ui/InterfaceControls";
import { profile } from "@/content/profile";

const links = [
  { href: "/#work", id: "work", label: "Selected work", index: "01" },
  { href: "/#engineering", id: "engineering", label: "How I build", index: "02" },
  { href: "/#experience", id: "experience", label: "Experience", index: "03" },
  { href: "/#certifications", id: "certifications", label: "Credentials", index: "04" },
  { href: "/#about", id: "about", label: "About", index: "05" },
  { href: "/#contact", id: "contact", label: "Contact", index: "06" },
] as const;

export function Header() {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDetailsElement>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
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
    </header>
  );
}
