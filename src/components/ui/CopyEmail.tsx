"use client";

import { useRef, useState } from "react";

// How long the copied state holds; the selection sweep in globals.css fits inside it.
const COPIED_MS = 2000;

// Copying shows what a copy is: a selection sweeps across the address, then lets go.
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      window.clearTimeout(timer.current);
      setCopied(true);
      timer.current = window.setTimeout(() => setCopied(false), COPIED_MS);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <div className="contact-email" data-copied={copied ? "" : undefined}>
      <a href={`mailto:${email}`} data-text={email}>
        {email}
      </a>
      <button className="text-button copy-email" type="button" onClick={copy}>
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="m3.5 8.5 3 3 6-7" />
        </svg>
        {copied ? "Copied" : "Copy email"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied" : ""}
      </span>
    </div>
  );
}
