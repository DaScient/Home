"use client";

import { useState, useMemo } from "react";
import { getEnabledSections } from "@/components/search/sectionRegistry";
import { useSearchState } from "@/components/search/lib/hooks/useSearchState";
import GuidedTourOverlay from "@/components/search/modes/intro/GuidedTourOverlay";
import CapabilityShowcase from "@/components/search/modes/intro/CapabilityShowcase";
import WorkshopLoader from "@/components/search/modes/prompt-hub/WorkshopLoader";
import ProtocolLibrary from "@/components/search/modes/prompt-hub/ProtocolLibrary";
import OSResourceGrid from "@/components/search/modes/prompt-hub/OSResourceGrid";
import AgenticPlaceholder from "@/components/search/modes/agentic/AgenticPlaceholder";

/**
 * /search — DaScient Search Page (Main Orchestrator)
 *
 * Manages state and mode switching for the entire search experience.
 * Renders registry-based sections filtered by active mode, plus
 * mode-specific feature components (intro, prompt-hub, agentic).
 */
export default function SearchPage() {
  const { query, activeMode, setQuery, setMode } = useSearchState();
  const [showTour, setShowTour] = useState(false);

  const sections = useMemo(
    () => getEnabledSections(activeMode),
    [activeMode]
  );

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-8">
      {/* ── Registry-driven sections ───────────────────────────── */}
      {sections.map((section) => {
        const SectionComponent = section.component;
        return (
          <SectionComponent
            key={section.id}
            query={query}
            onQueryChange={setQuery}
            activeMode={activeMode}
            onModeChange={setMode}
          />
        );
      })}

      {/* ── Mode-specific feature panels ───────────────────────── */}

      {/* Intro Mode */}
      {activeMode === "intro" && (
        <>
          <CapabilityShowcase onModeSelect={setMode} />
          <button
            onClick={() => setShowTour(true)}
            className="self-center rounded-xl border border-border px-5 py-2 text-sm font-medium text-muted transition-colors hover:border-accent/30 hover:text-foreground"
          >
            🎯 Take the Guided Tour
          </button>
        </>
      )}

      {/* Prompt Hub Mode */}
      {activeMode === "prompt-hub" && (
        <>
          <WorkshopLoader />
          <ProtocolLibrary />
          <OSResourceGrid />
        </>
      )}

      {/* Agentic Mode */}
      {activeMode === "agentic" && <AgenticPlaceholder />}

      {/* ── Overlays ───────────────────────────────────────────── */}
      <GuidedTourOverlay
        isOpen={showTour}
        onClose={() => setShowTour(false)}
      />
    </div>
  );
}
