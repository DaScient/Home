"use client";

import type { SearchSectionProps } from "../sectionRegistry";
import { useVibeStream } from "../lib/hooks/useVibeStream";

/**
 * ----section: SearchInsights----
 * AI-generated trending insights and recommendations.
 * In Vibe mode, displays real-time trending topic data from the vibe engine.
 * In Standard mode, shows curated insight cards.
 */

const INSIGHTS = [
  {
    id: "1",
    category: "Trending",
    title: "Geometric Deep Learning in Practice",
    summary:
      "Explore how geometric deep learning is transforming molecular analysis and graph-based predictions.",
  },
  {
    id: "2",
    category: "New",
    title: "Real-Time IoT Analytics Pipeline",
    summary:
      "DaScient's latest approach to processing IoT sensor data with sub-second latency.",
  },
  {
    id: "3",
    category: "Featured",
    title: "OSI™ for Competitive Intelligence",
    summary:
      "How open-source investigations deliver actionable market intelligence for enterprise clients.",
  },
];

export default function SearchInsights({
  activeMode = "standard",
}: SearchSectionProps) {
  const { vibes, isStreaming } = useVibeStream();

  // ── Vibe Mode: Topic visualization ──────────────────────────
  if (activeMode === "vibe" && vibes) {
    return (
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
          Vibe Insights
        </h2>

        {isStreaming ? (
          <p className="text-sm text-muted">Loading vibe data...</p>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Sentiment Bar */}
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Market Sentiment</span>
                <span className="font-semibold text-accent">
                  {vibes.sentimentLabel}
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-accent transition-all"
                  style={{
                    width: `${Math.max(5, ((vibes.overallSentiment + 1) / 2) * 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Topic Cards */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {vibes.topics.slice(0, 3).map((topic) => (
                <div
                  key={topic.label}
                  className="flex flex-col gap-1.5 rounded-xl border border-border bg-surface p-4 transition-all hover:border-accent/30 hover:shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg">
                      {topic.trend === "rising"
                        ? "📈"
                        : topic.trend === "falling"
                          ? "📉"
                          : "➡️"}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        topic.trend === "rising"
                          ? "bg-green-100 text-green-700"
                          : topic.trend === "falling"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {topic.trend}
                    </span>
                  </div>
                  <h3 className="font-semibold leading-snug">{topic.label}</h3>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${topic.score * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted">
                    Relevance: {Math.round(topic.score * 100)}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    );
  }

  // ── Standard Mode: Curated insight cards ────────────────────
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
        Insights &amp; Recommendations
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {INSIGHTS.map((insight) => (
          <div
            key={insight.id}
            className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-5 transition-all hover:border-accent/30 hover:shadow-sm"
          >
            <span className="w-fit rounded-full bg-accent-light px-3 py-0.5 text-xs font-medium text-accent">
              {insight.category}
            </span>
            <h3 className="font-semibold leading-snug">{insight.title}</h3>
            <p className="text-sm leading-relaxed text-muted">
              {insight.summary}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
