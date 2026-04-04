/**
 * useVibeStream — Real-time hook for hidden vibe feed data
 *
 * Consumes the vibe-engine to surface synthesised "vibes" —
 * aggregated sentiment from RSS, news, trends, and markets.
 * Currently returns mock data; designed for future live feeds.
 */

import { useState, useCallback } from "react";
import { type VibeResult, getVibeSnapshot } from "../vibe-engine/sentimentProcessor";

export interface UseVibeStreamReturn {
  /** Latest synthesised vibe data */
  vibes: VibeResult | null;
  /** True while fetching / processing feed data */
  isStreaming: boolean;
  /** Manually refresh the vibe feed */
  refresh: () => void;
}

export function useVibeStream(): UseVibeStreamReturn {
  // Initialise with a snapshot immediately (no effect needed).
  const [vibes, setVibes] = useState<VibeResult | null>(() => getVibeSnapshot());
  const [isStreaming, setIsStreaming] = useState(false);

  const refresh = useCallback(() => {
    setIsStreaming(true);
    // Simulate async fetch + processing delay
    const id = setTimeout(() => {
      setVibes(getVibeSnapshot());
      setIsStreaming(false);
    }, 600);
    return () => clearTimeout(id);
  }, []);

  return { vibes, isStreaming, refresh };
}
