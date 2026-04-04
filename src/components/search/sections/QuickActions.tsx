"use client";

import type { SearchSectionProps } from "../sectionRegistry";

/**
 * ----section: QuickActions----
 * Shortcut cards for common query categories.
 * Add or remove actions by editing the ACTIONS array below.
 */

const ACTIONS = [
  {
    id: "analytics",
    icon: "📊",
    title: "Analytics",
    description: "Explore data analytics and business intelligence insights",
    prompt: "Show me analytics insights",
  },
  {
    id: "ai-ml",
    icon: "🤖",
    title: "AI & Machine Learning",
    description: "Discover AI/ML solutions and capabilities",
    prompt: "What AI and ML services are available?",
  },
  {
    id: "security",
    icon: "🔒",
    title: "Cyber Security",
    description: "Learn about security assessments and compliance",
    prompt: "Tell me about cyber security services",
  },
  {
    id: "data-science",
    icon: "🔬",
    title: "Data Science",
    description: "Deep dive into data science methodologies",
    prompt: "Explain data science capabilities",
  },
  {
    id: "engineering",
    icon: "⚙️",
    title: "Systems Engineering",
    description: "Custom software and platform development",
    prompt: "What engineering solutions do you offer?",
  },
  {
    id: "osi",
    icon: "🌐",
    title: "Open-Source Intel",
    description: "Open-source investigations and market research",
    prompt: "Describe open-source intelligence services",
  },
];

export default function QuickActions({ onQueryChange }: SearchSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ACTIONS.map((action) => (
          <button
            key={action.id}
            onClick={() => onQueryChange(action.prompt)}
            className="group flex flex-col gap-2 rounded-xl border border-border bg-surface p-4 text-left transition-all hover:border-accent/30 hover:bg-surface-hover hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl" role="img" aria-label={action.title}>
                {action.icon}
              </span>
              <h3 className="font-semibold transition-colors group-hover:text-accent">
                {action.title}
              </h3>
            </div>
            <p className="text-sm text-muted">{action.description}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
