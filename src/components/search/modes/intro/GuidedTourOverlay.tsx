"use client";

/**
 * GuidedTourOverlay — Joyride/Walkthrough implementation
 *
 * Provides a step-by-step guided tour of the search interface
 * for first-time visitors. Shows tooltips highlighting key
 * features and capabilities.
 */

import { useState, useCallback } from "react";

interface TourStep {
  id: string;
  title: string;
  description: string;
  targetLabel: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    id: "search-input",
    title: "Search Anything",
    description:
      "Type your query here to search across DaScient's intelligence platform. Try natural language questions!",
    targetLabel: "Search Input",
  },
  {
    id: "mode-switcher",
    title: "Switch Modes",
    description:
      "Toggle between Standard search, Vibe mode for sentiment analysis, and Agentic mode for AI-powered responses.",
    targetLabel: "Mode Switcher",
  },
  {
    id: "quick-actions",
    title: "Quick Actions",
    description:
      "Jump to pre-configured queries across analytics, AI/ML, security, and more. Look for the hidden .vibe trigger!",
    targetLabel: "Quick Actions",
  },
  {
    id: "insights",
    title: "Live Insights",
    description:
      "Trending topics and recommendations powered by DaScient's intelligence engine.",
    targetLabel: "Insights Panel",
  },
];

interface GuidedTourOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GuidedTourOverlay({ isOpen, onClose }: GuidedTourOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = useCallback(() => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onClose();
      setCurrentStep(0);
    }
  }, [currentStep, onClose]);

  const handleSkip = useCallback(() => {
    onClose();
    setCurrentStep(0);
  }, [onClose]);

  if (!isOpen) return null;

  const step = TOUR_STEPS[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="mx-4 flex max-w-md flex-col gap-4 rounded-2xl border border-border bg-background p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent">
            Step {currentStep + 1} of {TOUR_STEPS.length}
          </span>
          <button
            onClick={handleSkip}
            className="text-sm text-muted hover:text-foreground"
          >
            Skip Tour
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">{step.title}</h3>
          <p className="text-sm leading-relaxed text-muted">
            {step.description}
          </p>
          <p className="text-xs text-muted/60">
            Target: {step.targetLabel}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-1.5">
            {TOUR_STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-6 rounded-full transition-colors ${
                  i === currentStep ? "bg-accent" : "bg-border"
                }`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="rounded-xl bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            {currentStep < TOUR_STEPS.length - 1 ? "Next" : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
}
