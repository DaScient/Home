/**
 * feedAggregator — Fetches RSS, News, Trends, Markets
 *
 * Collects raw data from configured feed sources.
 * Currently returns mock payloads; designed for real fetch
 * integration when live endpoints are available.
 */

import { getActiveFeeds } from "./vibeConfig";

export interface FeedItem {
  sourceId: string;
  title: string;
  summary: string;
  sentiment: number; // -1 to 1
  timestamp: string;
}

export interface AggregatedFeed {
  items: FeedItem[];
  fetchedAt: string;
}

/** Mock feed items for development */
const MOCK_ITEMS: FeedItem[] = [
  {
    sourceId: "rss-dascient",
    title: "Strategic Enterprise Intelligence in 2026",
    summary: "How autonomous verification protocols are reshaping national security infrastructure.",
    sentiment: 0.8,
    timestamp: new Date().toISOString(),
  },
  {
    sourceId: "news-ai",
    title: "AI Regulation Frameworks Gaining Momentum",
    summary: "New governance models emerge as AI adoption accelerates across industries.",
    sentiment: 0.4,
    timestamp: new Date().toISOString(),
  },
  {
    sourceId: "trends-tech",
    title: "Agentic AI Moves Beyond Hype",
    summary: "Production deployments of agentic systems signal a maturation of the technology.",
    sentiment: 0.7,
    timestamp: new Date().toISOString(),
  },
  {
    sourceId: "markets-overview",
    title: "Defense Tech Sector Shows Strong Growth",
    summary: "Critical infrastructure investments drive expansion in the defense technology sector.",
    sentiment: 0.6,
    timestamp: new Date().toISOString(),
  },
];

/**
 * Aggregate feeds from all active sources.
 * Returns mock data; swap with real fetch calls when endpoints are live.
 */
export async function aggregateFeeds(): Promise<AggregatedFeed> {
  // Acknowledge active feeds for future use
  void getActiveFeeds();

  // Future: parallel fetch from each feed source
  // const results = await Promise.allSettled(activeFeeds.map(fetchFeed));

  return {
    items: MOCK_ITEMS,
    fetchedAt: new Date().toISOString(),
  };
}
