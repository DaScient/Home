"use client";

import type { SearchSectionProps } from "../sectionRegistry";

/**
 * ----section: SearchHistory----
 * Displays recent search queries for quick re-access.
 * Future: persist to localStorage or user account.
 */

const SAMPLE_HISTORY = [
  { id: "1", query: "AI-driven supply chain optimization", timestamp: "2 min ago" },
  { id: "2", query: "Cybersecurity compliance frameworks", timestamp: "15 min ago" },
  { id: "3", query: "Predictive analytics for market trends", timestamp: "1 hour ago" },
];

export default function SearchHistory({ onQueryChange }: SearchSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
        Recent Searches
      </h2>
      <div className="flex flex-col divide-y divide-border rounded-xl border border-border bg-surface">
        {SAMPLE_HISTORY.map((item) => (
          <button
            key={item.id}
            onClick={() => onQueryChange(item.query)}
            className="flex items-center justify-between px-5 py-3 text-left transition-colors hover:bg-surface-hover"
          >
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm">{item.query}</span>
            </div>
            <span className="text-xs text-muted">{item.timestamp}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
