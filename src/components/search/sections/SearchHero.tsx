"use client";

import { useState, useCallback } from "react";
import type { SearchSectionProps } from "../sectionRegistry";

/**
 * ----section: SearchHero----
 * Primary search input and branding area.
 * This is the main entry point for user queries.
 */
export default function SearchHero({ query, onQueryChange }: SearchSectionProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // Future: trigger AI assistant query
    },
    []
  );

  return (
    <section className="flex flex-col items-center gap-6 py-12 text-center">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Da<span className="text-accent">Scient</span> Search
        </h1>
        <p className="max-w-md text-base text-muted">
          Intelligent search powered by DaScient — your gateway to AI-driven
          insights and analytics.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <div
          className={`flex items-center gap-3 rounded-2xl border-2 bg-background px-5 py-3 shadow-sm transition-all ${
            isFocused
              ? "border-accent shadow-md shadow-accent/10"
              : "border-border"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 shrink-0 text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask DaScient anything..."
            className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted/60"
            aria-label="Search query"
          />
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Search
          </button>
        </div>
      </form>
    </section>
  );
}
