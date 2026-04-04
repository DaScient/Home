"use client";

/**
 * ProtocolLibrary — Agentic AI Engineering Protocols
 *
 * Displays curated protocol documents for building
 * and orchestrating agentic AI systems.
 */

interface Protocol {
  id: string;
  title: string;
  category: string;
  summary: string;
  tags: string[];
}

const PROTOCOLS: Protocol[] = [
  {
    id: "agent-loop",
    title: "Agent Loop Architecture",
    category: "Core Patterns",
    summary:
      "Define the observe-think-act loop for autonomous agents. Covers state management, tool selection, and termination conditions.",
    tags: ["architecture", "agents", "loops"],
  },
  {
    id: "tool-orchestration",
    title: "Tool Orchestration Protocol",
    category: "Core Patterns",
    summary:
      "Standards for how agents select, invoke, and validate tool outputs. Includes error handling and fallback strategies.",
    tags: ["tools", "orchestration", "validation"],
  },
  {
    id: "memory-management",
    title: "Agent Memory & Context Protocol",
    category: "State Management",
    summary:
      "Patterns for short-term and long-term memory in agentic systems. Covers context windows, summarisation, and retrieval.",
    tags: ["memory", "context", "RAG"],
  },
  {
    id: "safety-guardrails",
    title: "Safety & Guardrail Framework",
    category: "Governance",
    summary:
      "Implement safety boundaries for autonomous operations. Input/output validation, scope limiting, and human-in-the-loop triggers.",
    tags: ["safety", "guardrails", "governance"],
  },
  {
    id: "multi-agent",
    title: "Multi-Agent Coordination",
    category: "Advanced Patterns",
    summary:
      "Protocols for orchestrating multiple agents working together. Covers delegation, consensus, and conflict resolution.",
    tags: ["multi-agent", "coordination", "delegation"],
  },
];

export default function ProtocolLibrary() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
        Agentic AI Protocols
      </h2>
      <div className="flex flex-col gap-3">
        {PROTOCOLS.map((protocol) => (
          <div
            key={protocol.id}
            className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-4 transition-all hover:border-accent/30 hover:shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{protocol.title}</h3>
              <span className="rounded-full bg-accent-light px-2.5 py-0.5 text-xs font-medium text-accent">
                {protocol.category}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted">
              {protocol.summary}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {protocol.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-background px-2 py-0.5 text-xs text-muted"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
