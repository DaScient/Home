"use client";

import { useState, useCallback } from "react";
import type { SearchSectionProps } from "../sectionRegistry";

/**
 * ----section: SearchHistory----
 * Displays recent search queries with localStorage persistence.
 * Falls back to sample data for first-time visitors.
 */

interface HistoryEntry {
  id: string;
  query: string;
  timestamp: string;
}

const STORAGE_KEY = "dascient-search-history";
const MAX_HISTORY = 10;

const SAMPLE_HISTORY: HistoryEntry[] = [
  { id: "1", query: "AI-driven supply chain optimization", timestamp: "2 min ago" },
  { id: "2", query: "Cybersecurity compliance frameworks", timestamp: "15 min ago" },
  { id: "3", query: "Predictive analytics for market trends", timestamp: "1 hour ago" },
];

function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return SAMPLE_HISTORY;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as HistoryEntry[];
      return parsed.length > 0 ? parsed : SAMPLE_HISTORY;
    }
  } catch {
    // Ignore parse errors
  }
  return SAMPLE_HISTORY;
}

function saveHistory(entries: HistoryEntry[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, MAX_HISTORY)));
  } catch {
    // Ignore storage errors
  }
}

function timeAgo(isoString: string): string {
  const now = Date.now();
  const then = new Date(isoString).getTime();
  if (isNaN(then)) return isoString; // fallback for sample data
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) > 1 ? "s" : ""} ago`;
  return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? "s" : ""} ago`;
}

export default function SearchHistory({ onQueryChange }: SearchSectionProps) {
  const [history, setHistory] = useState<HistoryEntry[]>(() => loadHistory());

  /** Add a query to history (called from event handlers, not render). */
  const addToHistory = useCallback((q: string) => {
    if (!q.trim()) return;
    setHistory((prev) => {
      if (prev.length > 0 && prev[0].query === q) return prev;
      const entry: HistoryEntry = {
        id: Date.now().toString(),
        query: q,
        timestamp: new Date().toISOString(),
      };
      const updated = [entry, ...prev.filter((h) => h.query !== q)].slice(0, MAX_HISTORY);
      saveHistory(updated);
      return updated;
    });
  }, []);

  const handleQuerySelect = useCallback(
    (selectedQuery: string) => {
      addToHistory(selectedQuery);
      onQueryChange(selectedQuery);
    },
    [addToHistory, onQueryChange]
  );

  const handleClear = useCallback(() => {
    setHistory([]);
    saveHistory([]);
  }, []);

  if (history.length === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
          Recent Searches
        </h2>
        <button
          onClick={handleClear}
          className="text-xs text-muted hover:text-foreground"
        >
          Clear History
        </button>
      </div>
      <div className="flex flex-col divide-y divide-border rounded-xl border border-border bg-surface">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => handleQuerySelect(item.query)}
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
            <span className="text-xs text-muted">{timeAgo(item.timestamp)}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
