"use client";

import type { SearchSectionProps } from "../sectionRegistry";
import { useVibeStream } from "../lib/hooks/useVibeStream";

/**
 * ----section: SearchResults----
 * Polymorphic display: renders differently based on active mode.
 *   - Standard: AI-powered search results (placeholder)
 *   - Vibe: Sentiment analysis snapshot from the vibe engine
 *   - Agentic: Autonomous agent response (placeholder)
 */
export default function SearchResults({
  query,
  activeMode = "standard",
}: SearchSectionProps) {
  const { vibes, isStreaming } = useVibeStream();

  if (!query.trim()) return null;

  // ── Vibe Mode Display ────────────────────────────────────────
  if (activeMode === "vibe") {
    return (
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
          Vibe Check
        </h2>
        <div className="rounded-xl border border-border bg-surface p-6">
          {isStreaming ? (
            <p className="text-sm text-muted">🌊 Reading the vibes...</p>
          ) : vibes ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🌊</span>
                <div>
                  <p className="text-lg font-bold">{vibes.sentimentLabel}</p>
                  <p className="text-sm text-muted">
                    Overall sentiment: {vibes.overallSentiment > 0 ? "+" : ""}
                    {vibes.overallSentiment}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Trending Topics
                </p>
                <div className="flex flex-wrap gap-2">
                  {vibes.topics.map((topic) => (
                    <span
                      key={topic.label}
                      className="flex items-center gap-1.5 rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent"
                    >
                      {topic.trend === "rising"
                        ? "📈"
                        : topic.trend === "falling"
                          ? "📉"
                          : "➡️"}
                      {topic.label}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-sm leading-relaxed text-muted">
                Searching vibes for:{" "}
                <strong className="text-foreground">&ldquo;{query}&rdquo;</strong>
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted">No vibe data available.</p>
          )}
        </div>
      </section>
    );
  }

  // ── Agentic Mode Display ─────────────────────────────────────
  if (activeMode === "agentic") {
    return (
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
          Agent Response
        </h2>
        <div className="rounded-xl border border-border bg-surface p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-light text-xl">
              🤖
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium">DaScient Agent</p>
              <div className="text-sm leading-relaxed text-muted">
                <p>
                  Deploying agent for:{" "}
                  <strong className="text-foreground">&ldquo;{query}&rdquo;</strong>
                </p>
                <p className="mt-2">
                  🚧 Agentic mode is currently in development. When active, an
                  autonomous agent will research, analyse, and synthesise a
                  comprehensive response.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Standard Mode Display (default) ──────────────────────────
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
                Searching for:{" "}
                <strong className="text-foreground">&ldquo;{query}&rdquo;</strong>
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
