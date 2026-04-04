/**
 * vibeConfig — Feed URLs and weightings for the Vibe Engine
 *
 * Central configuration for all data sources the vibe engine
 * aggregates. Each feed has a weight that influences final
 * sentiment scoring.
 */

export interface FeedSource {
  id: string;
  label: string;
  type: "rss" | "news" | "trends" | "markets";
  url: string;
  /** Weight for sentiment aggregation (0–1) */
  weight: number;
  enabled: boolean;
}

/**
 * Default feed sources.
 * URLs are placeholders — wire up to real endpoints when live.
 */
export const VIBE_FEEDS: FeedSource[] = [
  {
    id: "rss-dascient",
    label: "DaScient Blog",
    type: "rss",
    url: "https://dascient.medium.com/feed",
    weight: 0.3,
    enabled: true,
  },
  {
    id: "news-ai",
    label: "AI Industry News",
    type: "news",
    url: "https://api.example.com/news/ai",
    weight: 0.25,
    enabled: true,
  },
  {
    id: "trends-tech",
    label: "Tech Trends",
    type: "trends",
    url: "https://api.example.com/trends/tech",
    weight: 0.25,
    enabled: true,
  },
  {
    id: "markets-overview",
    label: "Markets Overview",
    type: "markets",
    url: "https://api.example.com/markets",
    weight: 0.2,
    enabled: true,
  },
];

/** Return only the enabled feed sources */
export function getActiveFeeds(): FeedSource[] {
  return VIBE_FEEDS.filter((f) => f.enabled);
}
