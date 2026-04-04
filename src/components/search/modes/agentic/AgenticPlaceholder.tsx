"use client";

/**
 * AgenticPlaceholder — "Coming Soon" + Beta Signup logic
 *
 * Displayed when a user activates Agentic mode.
 * Provides information about the upcoming feature and
 * collects beta signup interest.
 */

import { useState, useCallback } from "react";

export default function AgenticPlaceholder() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (email.trim()) {
        // Future: send to beta signup endpoint
        setSubmitted(true);
      }
    },
    [email]
  );

  return (
    <section className="flex flex-col items-center gap-6 py-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-light text-3xl">
        🤖
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Agentic Mode</h2>
        <p className="text-lg text-accent">Coming Soon</p>
      </div>

      <p className="max-w-md text-sm leading-relaxed text-muted">
        DaScient&apos;s Agentic AI will autonomously research, analyse, and
        synthesise intelligence across domains. Powered by advanced
        reasoning protocols and tool orchestration.
      </p>

      <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 text-left">
        <h3 className="text-sm font-semibold">What to expect:</h3>
        <ul className="flex flex-col gap-1.5 text-sm text-muted">
          <li>🔬 Autonomous multi-source research</li>
          <li>📊 Real-time data synthesis & analysis</li>
          <li>🛡️ Built-in safety guardrails & governance</li>
          <li>🔗 Tool orchestration with verification protocols</li>
          <li>📋 Structured intelligence briefings</li>
        </ul>
      </div>

      {submitted ? (
        <div className="rounded-xl border border-accent/30 bg-accent-light p-4">
          <p className="text-sm font-medium text-accent">
            ✓ You&apos;re on the list! We&apos;ll notify you when Agentic mode launches.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-sm flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email for beta access"
            required
            className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
            aria-label="Email for beta signup"
          />
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Join Beta
          </button>
        </form>
      )}
    </section>
  );
}
