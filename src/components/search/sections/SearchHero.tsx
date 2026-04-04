"use client";

import { useState, useCallback } from "react";
import type { SearchSectionProps } from "../sectionRegistry";
import type { SearchMode } from "../lib/hooks/useSearchState";

/**
 * ----section: SearchHero----
 * Primary search input, branding area, and mode switcher.
 * This is the main entry point for user queries and mode navigation.
 */

const MODES: { id: SearchMode; label: string; icon: string }[] = [
  { id: "standard", label: "Search", icon: "🔍" },
  { id: "vibe", label: "Vibes", icon: "🌊" },
  { id: "prompt-hub", label: "Prompts", icon: "🧪" },
  { id: "agentic", label: "Agentic", icon: "🤖" },
  { id: "intro", label: "Intro", icon: "🎯" },
];

export default function SearchHero({
  query,
  onQueryChange,
  activeMode = "standard",
  onModeChange,
}: SearchSectionProps) {
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

      {/* ── Mode Switcher ──────────────────────────────────────── */}
      {onModeChange && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {MODES.map((mode) => (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeMode === mode.id
                  ? "bg-accent text-white shadow-sm"
                  : "border border-border bg-surface text-muted hover:border-accent/30 hover:text-foreground"
              }`}
            >
              <span>{mode.icon}</span>
              {mode.label}
            </button>
          ))}
        </div>
      )}

      {/* ── Search Input ───────────────────────────────────────── */}
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
            placeholder={
              activeMode === "vibe"
                ? "Check the vibes on..."
                : activeMode === "agentic"
                  ? "Deploy agent to research..."
                  : "Ask DaScient anything..."
            }
            className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted/60"
            aria-label="Search query"
          />
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            {activeMode === "agentic" ? "Deploy" : "Search"}
          </button>
        </div>
      </form>
    </section>
  );
}
