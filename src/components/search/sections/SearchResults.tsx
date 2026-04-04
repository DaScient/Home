"use client";

import type { SearchSectionProps } from "../sectionRegistry";

/**
 * ----section: SearchResults----
 * Displays AI-powered search results.
 * This section will be enhanced with actual AI response rendering
 * once the agentic assistant backend is connected.
 */
export default function SearchResults({ query }: SearchSectionProps) {
  if (!query.trim()) return null;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
        Results
      </h2>
      <div className="rounded-xl border border-border bg-surface p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-light text-accent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium">DaScient AI Assistant</p>
            <div className="text-sm leading-relaxed text-muted">
              <p>
                Searching for: <strong className="text-foreground">&ldquo;{query}&rdquo;</strong>
              </p>
              <p className="mt-2">
                🚧 The agentic AI assistant is being configured. When active,
                this area will display intelligent, context-aware responses
                powered by DaScient&apos;s proprietary AI engine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
