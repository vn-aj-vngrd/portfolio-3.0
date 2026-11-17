"use client";

import { useState } from "react";

type Filter = { id: string; label: string; count: number };

// Holds the active filter only. The cards are server-rendered children, hidden by CSS.
export function ProjectFilterList({
  filters,
  children,
}: {
  filters: readonly Filter[];
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(filters[0].id);
  const current = filters.find((filter) => filter.id === active) ?? filters[0];

  return (
    <>
      <div className="work-filter" role="group" aria-label="Filter products">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            aria-pressed={filter.id === active}
            onClick={() => setActive(filter.id)}
          >
            {filter.label}
            <span>{filter.count}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        Showing {current.count} of {filters[0].count} products
      </p>
      <div className="project-list" data-reveal="list" data-filter={active}>
        {children}
      </div>
    </>
  );
}
