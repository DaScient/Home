/**
 * analytics — Open-source privacy-first tracking
 *
 * Lightweight analytics helpers that respect user privacy.
 * No PII is collected. Events are queued locally and can be
 * flushed to a privacy-respecting analytics endpoint.
 */

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, string | number | boolean>;
  timestamp: string;
}

/** In-memory event queue (flushed on page unload or manually) */
const eventQueue: AnalyticsEvent[] = [];

/** Track a named event with optional properties */
export function trackEvent(
  name: string,
  properties?: Record<string, string | number | boolean>
): void {
  eventQueue.push({
    name,
    properties,
    timestamp: new Date().toISOString(),
  });
}

/** Track a search query (sanitised — no PII) */
export function trackSearch(query: string, mode: string): void {
  trackEvent("search", {
    queryLength: query.length,
    mode,
    hasQuery: query.trim().length > 0,
  });
}

/** Track a mode switch */
export function trackModeSwitch(from: string, to: string): void {
  trackEvent("mode_switch", { from, to });
}

/** Get queued events (for debugging or manual flush) */
export function getEventQueue(): readonly AnalyticsEvent[] {
  return eventQueue;
}

/** Clear the event queue */
export function flushEvents(): AnalyticsEvent[] {
  return eventQueue.splice(0, eventQueue.length);
}
