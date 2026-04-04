"use client";

import type { SearchSectionProps } from "../sectionRegistry";

/**
 * ----section: SearchInsights----
 * AI-generated trending insights and recommendations.
 * Future: dynamically populated by the agentic AI backend.
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

export default function SearchInsights(props: SearchSectionProps) {
  // Accept props for registry contract; future use when insights react to queries.
  void props;
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
