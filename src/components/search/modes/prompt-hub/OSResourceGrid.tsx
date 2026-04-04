"use client";

/**
 * OSResourceGrid — Curated Open Source tools
 *
 * A browsable grid of recommended open-source tools
 * for prompt engineering, AI development, and analytics.
 */

interface OSResource {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  stars?: string;
}

const RESOURCES: OSResource[] = [
  {
    id: "langchain",
    name: "LangChain",
    description: "Framework for building LLM-powered applications with composable chains and agents.",
    category: "Agent Frameworks",
    url: "https://github.com/langchain-ai/langchain",
    stars: "95k+",
  },
  {
    id: "llamaindex",
    name: "LlamaIndex",
    description: "Data framework for connecting LLMs to external data sources with RAG pipelines.",
    category: "Data & RAG",
    url: "https://github.com/run-llama/llama_index",
    stars: "35k+",
  },
  {
    id: "dspy",
    name: "DSPy",
    description: "Programming framework for optimising LLM prompts and weights algorithmically.",
    category: "Prompt Optimisation",
    url: "https://github.com/stanfordnlp/dspy",
    stars: "18k+",
  },
  {
    id: "openai-cookbook",
    name: "OpenAI Cookbook",
    description: "Example code and guides for common tasks using the OpenAI API.",
    category: "Learning",
    url: "https://github.com/openai/openai-cookbook",
    stars: "60k+",
  },
  {
    id: "promptfoo",
    name: "Promptfoo",
    description: "Test and evaluate LLM outputs with automated prompt testing and red-teaming.",
    category: "Testing",
    url: "https://github.com/promptfoo/promptfoo",
    stars: "5k+",
  },
  {
    id: "crewai",
    name: "CrewAI",
    description: "Framework for orchestrating role-playing autonomous AI agents collaborating on tasks.",
    category: "Agent Frameworks",
    url: "https://github.com/crewAIInc/crewAI",
    stars: "20k+",
  },
];

export default function OSResourceGrid() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
        Open Source Tools
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {RESOURCES.map((resource) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-2 rounded-xl border border-border bg-surface p-4 transition-all hover:border-accent/30 hover:bg-surface-hover hover:shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold transition-colors group-hover:text-accent">
                {resource.name}
              </h3>
              {resource.stars && (
                <span className="text-xs text-muted">⭐ {resource.stars}</span>
              )}
            </div>
            <p className="text-sm leading-relaxed text-muted">
              {resource.description}
            </p>
            <span className="mt-auto w-fit rounded-full bg-accent-light px-2.5 py-0.5 text-xs font-medium text-accent">
              {resource.category}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
