"use client";

/**
 * CapabilityShowcase — Animated feature cards for newcomers
 *
 * Displays DaScient search capabilities as interactive cards
 * that expand on click to reveal more detail.
 */

import { useState } from "react";
import type { SearchMode } from "../../lib/hooks/useSearchState";

interface Capability {
  id: string;
  icon: string;
  title: string;
  description: string;
  detail: string;
  relatedMode: SearchMode;
}

const CAPABILITIES: Capability[] = [
  {
    id: "standard-search",
    icon: "🔍",
    title: "Intelligent Search",
    description: "AI-powered search across DaScient's knowledge base",
    detail:
      "Standard mode delivers precise results powered by DaScient's proprietary intelligence engine. Ask natural language questions and receive context-aware responses.",
    relatedMode: "standard",
  },
  {
    id: "vibe-check",
    icon: "🌊",
    title: "Vibe Engine",
    description: "Real-time sentiment from RSS, news, trends & markets",
    detail:
      "The hidden Vibe Engine aggregates feeds from multiple sources to synthesise a real-time sentiment snapshot. Discover what the data says before making decisions.",
    relatedMode: "vibe",
  },
  {
    id: "prompt-engineering",
    icon: "🧪",
    title: "Prompt Hub",
    description: "Interactive prompt engineering workshops & protocols",
    detail:
      "Access curated prompt engineering resources, agentic AI protocols, and open-source tools. Learn to craft effective prompts through hands-on workshops.",
    relatedMode: "prompt-hub",
  },
  {
    id: "agentic-ai",
    icon: "🤖",
    title: "Agentic Mode",
    description: "Autonomous AI-powered research & analysis (Coming Soon)",
    detail:
      "Agentic mode lets DaScient's AI autonomously research, analyse, and synthesise information across multiple domains. Currently in development — sign up for beta access.",
    relatedMode: "agentic",
  },
];

interface CapabilityShowcaseProps {
  onModeSelect?: (mode: SearchMode) => void;
}

export default function CapabilityShowcase({ onModeSelect }: CapabilityShowcaseProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
          Discover DaScient Search
        </h2>
        <p className="text-xs text-muted/70">
          Click a capability to learn more
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {CAPABILITIES.map((cap) => {
          const isExpanded = expandedId === cap.id;
          return (
            <button
              key={cap.id}
              onClick={() =>
                setExpandedId(isExpanded ? null : cap.id)
              }
              className={`flex flex-col gap-2 rounded-xl border p-4 text-left transition-all ${
                isExpanded
                  ? "border-accent/40 bg-accent-light/50 shadow-sm"
                  : "border-border bg-surface hover:border-accent/20 hover:bg-surface-hover"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{cap.icon}</span>
                <div>
                  <h3 className="font-semibold">{cap.title}</h3>
                  <p className="text-xs text-muted">{cap.description}</p>
                </div>
              </div>

              {isExpanded && (
                <div className="flex flex-col gap-3 pt-2">
                  <p className="text-sm leading-relaxed text-muted">
                    {cap.detail}
                  </p>
                  {onModeSelect && (
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        onModeSelect(cap.relatedMode);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.stopPropagation();
                          onModeSelect(cap.relatedMode);
                        }
                      }}
                      className="self-start rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-accent-hover"
                    >
                      Try {cap.title} →
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
