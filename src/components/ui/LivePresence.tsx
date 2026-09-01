"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-presence-id";

function visitorId() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return stored;

  const id = crypto.randomUUID();
  localStorage.setItem(STORAGE_KEY, id);
  return id;
}

export function LivePresence() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const ping = async () => {
      if (document.hidden) return;

      try {
        const response = await fetch("/api/presence", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: visitorId() }),
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) return;

        const data = (await response.json()) as { count?: number };
        if (typeof data.count === "number") setCount(data.count);
      } catch {
        // Presence is ambient UI; network failure should not interrupt the page.
      }
    };

    void ping();
    const interval = window.setInterval(ping, 30_000);
    const handleVisibility = () => {
      if (!document.hidden) void ping();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      controller.abort();
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  if (count === null) {
    return (
      <section
        className="live-presence live-presence-loading"
        aria-label="Loading live portfolio visitors"
        aria-busy="true"
      >
        <div className="presence-status">
          <span className="presence-live-mark" aria-hidden="true" />
          <span>Live presence</span>
        </div>
        <p className="presence-primary">Checking who&apos;s here</p>
        <span className="presence-detail">Connecting…</span>
      </section>
    );
  }

  return (
    <section className="live-presence" aria-label="Live portfolio visitors" aria-live="polite">
      <div className="presence-status">
        <span className="presence-live-mark" aria-hidden="true" />
        <span>Live presence</span>
      </div>
      <p className="presence-primary">
        <strong>{count}</strong> {count === 1 ? "person" : "people"} viewing now
      </p>
      <span className="presence-detail">Anonymous · active in last 75s</span>
    </section>
  );
}
