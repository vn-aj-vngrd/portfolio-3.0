"use client";

import Link from "next/link";
import { useRef } from "react";

import { InterfaceControls } from "@/components/ui/InterfaceControls";
import { profile } from "@/content/profile";

const links = [
  { href: "/#work", label: "Selected work", index: "01" },
  { href: "/#engineering", label: "How I build", index: "02" },
  { href: "/#experience", label: "Experience", index: "03" },
  { href: "/#certifications", label: "Credentials", index: "04" },
  { href: "/#about", label: "About", index: "05" },
  { href: "/#contact", label: "Contact", index: "06" },
];

export function Header() {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => menuRef.current?.removeAttribute("open");

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
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <span>{link.index}</span>
              {link.label}
            </Link>
          ))}
          <Link href="/resume">
            <span>↗</span>
            Résumé
          </Link>
        </nav>

        <div className="header-utilities">
          <InterfaceControls />
          <details ref={menuRef} className="mobile-menu">
            <summary aria-label="Open navigation">Menu</summary>
            <nav aria-label="Mobile navigation" onClick={closeMenu}>
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span>{link.index}</span> {link.label}
                </Link>
              ))}
              <Link href="/resume">Résumé ↗</Link>
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
