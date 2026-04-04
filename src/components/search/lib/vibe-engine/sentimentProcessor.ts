/**
 * sentimentProcessor — NLP/LLM logic to synthesise "The Vibes"
 *
 * Takes aggregated feed data and produces a unified vibe result
 * with overall sentiment, top topics, and trending indicators.
 * Currently uses static mock processing; designed for LLM integration.
 */

import { type FeedItem } from "./feedAggregator";
import { VIBE_FEEDS } from "./vibeConfig";

export interface VibeTopic {
  label: string;
  score: number; // 0–1 relevance
  trend: "rising" | "stable" | "falling";
}

export interface VibeResult {
  /** Overall sentiment score (-1 to 1) */
  overallSentiment: number;
  /** Human-readable sentiment label */
  sentimentLabel: string;
  /** Top trending topics */
  topics: VibeTopic[];
  /** Timestamp of this snapshot */
  generatedAt: string;
}

/** Map a numeric sentiment to a human-readable label */
function sentimentToLabel(score: number): string {
  if (score >= 0.6) return "Bullish";
  if (score >= 0.2) return "Cautiously Optimistic";
  if (score >= -0.2) return "Neutral";
  if (score >= -0.6) return "Cautious";
  return "Bearish";
}

/**
 * Process feed items into a unified vibe result.
 * Applies source weights from vibeConfig.
 */
export function processVibes(items: FeedItem[]): VibeResult {
  if (items.length === 0) {
    return {
      overallSentiment: 0,
      sentimentLabel: "No Data",
      topics: [],
      generatedAt: new Date().toISOString(),
    };
  }

  // Weighted sentiment calculation
  let weightedSum = 0;
  let totalWeight = 0;

  for (const item of items) {
    const feedConfig = VIBE_FEEDS.find((f) => f.id === item.sourceId);
    const weight = feedConfig?.weight ?? 0.25;
    weightedSum += item.sentiment * weight;
    totalWeight += weight;
  }

  const overallSentiment = totalWeight > 0 ? weightedSum / totalWeight : 0;

  return {
    overallSentiment: Math.round(overallSentiment * 100) / 100,
    sentimentLabel: sentimentToLabel(overallSentiment),
    topics: [
      { label: "Enterprise AI", score: 0.9, trend: "rising" },
      { label: "Autonomous Systems", score: 0.85, trend: "rising" },
      { label: "Strategic Intelligence", score: 0.78, trend: "stable" },
      { label: "Critical Infrastructure", score: 0.72, trend: "rising" },
      { label: "Defense Tech", score: 0.65, trend: "stable" },
    ],
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Get an instant vibe snapshot (synchronous, for hooks).
 * Uses mock feed items internally.
 */
export function getVibeSnapshot(): VibeResult {
  const mockItems: FeedItem[] = [
    {
      sourceId: "rss-dascient",
      title: "Strategic Enterprise Intelligence",
      summary: "Autonomous verification reshaping infrastructure.",
      sentiment: 0.8,
      timestamp: new Date().toISOString(),
    },
    {
      sourceId: "news-ai",
      title: "AI Governance Models",
      summary: "Regulation frameworks gaining traction.",
      sentiment: 0.4,
      timestamp: new Date().toISOString(),
    },
    {
      sourceId: "trends-tech",
      title: "Agentic AI Production Deployments",
      summary: "Maturation signals across sectors.",
      sentiment: 0.7,
      timestamp: new Date().toISOString(),
    },
  ];

  return processVibes(mockItems);
}
