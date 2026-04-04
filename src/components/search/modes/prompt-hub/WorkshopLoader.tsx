"use client";

/**
 * WorkshopLoader — Interactive lesson wrapper for Prompt Hub
 *
 * Loads and displays interactive prompt engineering lessons.
 * Each workshop is a structured walkthrough with steps.
 */

import { useState, useCallback } from "react";

interface WorkshopStep {
  title: string;
  instruction: string;
  examplePrompt: string;
  tip: string;
}

interface Workshop {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  steps: WorkshopStep[];
}

const WORKSHOPS: Workshop[] = [
  {
    id: "basics",
    title: "Prompt Engineering Fundamentals",
    description: "Learn the core principles of writing effective prompts",
    difficulty: "beginner",
    steps: [
      {
        title: "Be Specific",
        instruction: "Start with a clear, specific request instead of vague queries.",
        examplePrompt: "Analyse the top 3 cybersecurity threats to critical infrastructure in 2026",
        tip: "Include context about your domain and the depth of analysis you need.",
      },
      {
        title: "Set the Role",
        instruction: "Tell the AI what role or persona to adopt for better responses.",
        examplePrompt: "As a strategic intelligence analyst, brief me on emerging AI regulations",
        tip: "Role-setting helps the model calibrate its tone, depth, and expertise level.",
      },
      {
        title: "Define the Format",
        instruction: "Specify the output format you want.",
        examplePrompt: "List 5 key metrics for measuring autonomous system reliability in bullet points",
        tip: "Structured outputs (bullets, tables, JSON) are easier to act on than prose.",
      },
    ],
  },
  {
    id: "agentic-protocols",
    title: "Agentic AI Protocols",
    description: "Master the protocols for orchestrating autonomous AI agents",
    difficulty: "advanced",
    steps: [
      {
        title: "Define the Objective",
        instruction: "Clearly state the end goal for the agent to achieve.",
        examplePrompt: "Research and compile a threat assessment report on supply chain vulnerabilities",
        tip: "Agents work best with well-defined success criteria.",
      },
      {
        title: "Set Constraints",
        instruction: "Specify boundaries, sources, and limitations.",
        examplePrompt: "Use only public OSINT sources. Limit analysis to the last 90 days. Flag confidence levels.",
        tip: "Constraints prevent scope creep and improve output reliability.",
      },
    ],
  },
];

export default function WorkshopLoader() {
  const [activeWorkshop, setActiveWorkshop] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const workshop = WORKSHOPS.find((w) => w.id === activeWorkshop);

  const handleClose = useCallback(() => {
    setActiveWorkshop(null);
    setActiveStep(0);
  }, []);

  if (!workshop) {
    return (
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
          Prompt Workshops
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {WORKSHOPS.map((w) => (
            <button
              key={w.id}
              onClick={() => setActiveWorkshop(w.id)}
              className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-4 text-left transition-all hover:border-accent/30 hover:bg-surface-hover"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{w.title}</h3>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    w.difficulty === "beginner"
                      ? "bg-green-100 text-green-700"
                      : w.difficulty === "intermediate"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {w.difficulty}
                </span>
              </div>
              <p className="text-sm text-muted">{w.description}</p>
              <p className="text-xs text-muted/60">{w.steps.length} steps</p>
            </button>
          ))}
        </div>
      </section>
    );
  }

  const step = workshop.steps[activeStep];

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
          {workshop.title}
        </h2>
        <button
          onClick={handleClose}
          className="text-xs text-muted hover:text-foreground"
        >
          ← Back to Workshops
        </button>
      </div>

      <div className="rounded-xl border border-border bg-surface p-5">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-accent-light px-3 py-0.5 text-xs font-medium text-accent">
              Step {activeStep + 1} / {workshop.steps.length}
            </span>
            <h3 className="font-semibold">{step.title}</h3>
          </div>

          <p className="text-sm leading-relaxed text-muted">
            {step.instruction}
          </p>

          <div className="rounded-lg bg-background p-3 font-mono text-sm">
            <span className="text-muted/60">Example: </span>
            <span className="text-accent">{step.examplePrompt}</span>
          </div>

          <p className="text-xs text-muted/70">💡 {step.tip}</p>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setActiveStep((p) => Math.max(0, p - 1))}
              disabled={activeStep === 0}
              className="rounded-lg px-4 py-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (activeStep < workshop.steps.length - 1) {
                  setActiveStep((p) => p + 1);
                } else {
                  handleClose();
                }
              }}
              className="rounded-lg bg-accent px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              {activeStep < workshop.steps.length - 1 ? "Next" : "Complete"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
