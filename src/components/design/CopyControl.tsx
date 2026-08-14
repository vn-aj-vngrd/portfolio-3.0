"use client";

import { useEffect, useRef, useState } from "react";

export function CopyControl({
  value,
  label = "Copy",
  className = "design-copy",
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number | null>(null);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }

    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus("idle"), 1800);
  }

  const visibleLabel = status === "copied" ? "Copied" : status === "failed" ? "Copy failed" : label;

  return (
    <button className={className} type="button" onClick={copy}>
      <span>{visibleLabel}</span>
      <span aria-hidden="true">{status === "copied" ? "✓" : "⌘C"}</span>
      <span className="sr-only" aria-live="polite">
        {status === "copied" ? `${label} copied to clipboard` : status === "failed" ? "Clipboard access failed" : ""}
      </span>
    </button>
  );
}
