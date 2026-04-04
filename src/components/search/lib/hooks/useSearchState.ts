/**
 * useSearchState — Manages query, activeMode, and loading states
 *
 * Central hook for the search orchestrator. Every search component
 * reads from this state; the page-level orchestrator owns the instance.
 */

import { useState, useCallback, useMemo } from "react";

/** Supported search modes */
export type SearchMode = "standard" | "vibe" | "agentic" | "intro" | "prompt-hub";

export interface SearchState {
  /** Current query string */
  query: string;
  /** Active display / feature mode */
  activeMode: SearchMode;
  /** True while a backend or local search is in-flight */
  isLoading: boolean;
}

export interface SearchStateActions {
  setQuery: (query: string) => void;
  setMode: (mode: SearchMode) => void;
  setLoading: (loading: boolean) => void;
  /** Reset to initial state */
  reset: () => void;
}

const INITIAL_STATE: SearchState = {
  query: "",
  activeMode: "standard",
  isLoading: false,
};

export function useSearchState() {
  const [state, setState] = useState<SearchState>(INITIAL_STATE);

  const setQuery = useCallback((query: string) => {
    setState((prev) => ({ ...prev, query }));
  }, []);

  const setMode = useCallback((activeMode: SearchMode) => {
    setState((prev) => ({ ...prev, activeMode }));
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    setState((prev) => ({ ...prev, isLoading }));
  }, []);

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  const actions: SearchStateActions = useMemo(
    () => ({ setQuery, setMode, setLoading, reset }),
    [setQuery, setMode, setLoading, reset]
  );

  return { ...state, ...actions };
}

export type UseSearchStateReturn = ReturnType<typeof useSearchState>;
