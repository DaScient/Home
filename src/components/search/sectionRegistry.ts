import type { ComponentType } from "react";
import type { SearchMode } from "./lib/hooks/useSearchState";

/* ============================================================
 * SEARCH SECTION REGISTRY
 * ============================================================
 * This registry defines every section rendered on the /search page.
 *
 * ➕ TO ADD A NEW SECTION:
 *    1. Create a component in ./sections/YourSection.tsx
 *    2. Import it below
 *    3. Add an entry to the SEARCH_SECTIONS array
 *
 * ❌ TO REMOVE A SECTION:
 *    1. Remove (or comment out) its entry from SEARCH_SECTIONS
 *
 * 🔀 TO REORDER SECTIONS:
 *    1. Move entries up or down in the SEARCH_SECTIONS array
 *
 * Each section receives the shared SearchSectionProps so it can
 * read the current query and update it. Sections can be scoped
 * to specific modes using the `modes` field.
 * ============================================================ */

// ---- Section Props (shared across all sections) ----
export interface SearchSectionProps {
  /** Current search query string */
  query: string;
  /** Callback to update the search query */
  onQueryChange: (query: string) => void;
  /** Currently active search mode */
  activeMode?: SearchMode;
  /** Callback to switch modes */
  onModeChange?: (mode: SearchMode) => void;
}

// ---- Section Registration Entry ----
export interface SearchSectionEntry {
  /** Unique key used for React reconciliation */
  id: string;
  /** Display-friendly label (used in dev tools / future admin UI) */
  label: string;
  /** The React component to render for this section */
  component: ComponentType<SearchSectionProps>;
  /** When false the section is skipped during rendering */
  enabled: boolean;
  /**
   * Modes where this section is visible.
   * If omitted or empty, the section appears in ALL modes.
   */
  modes?: SearchMode[];
}

// ---- Section Imports ----
import SearchHero from "./sections/SearchHero";
import SearchResults from "./sections/SearchResults";
import QuickActions from "./sections/QuickActions";
import SearchHistory from "./sections/SearchHistory";
import SearchInsights from "./sections/SearchInsights";

// ---- Section Definitions ----
// Order here = render order on the page.
const SEARCH_SECTIONS: SearchSectionEntry[] = [
  {
    id: "search-hero",
    label: "Search Hero",
    component: SearchHero,
    enabled: true,
    // Visible in all modes (hero always shown)
  },
  {
    id: "search-results",
    label: "Search Results",
    component: SearchResults,
    enabled: true,
    modes: ["standard", "vibe", "agentic"],
  },
  {
    id: "quick-actions",
    label: "Quick Actions",
    component: QuickActions,
    enabled: true,
    modes: ["standard", "vibe", "intro"],
  },
  {
    id: "search-history",
    label: "Recent Searches",
    component: SearchHistory,
    enabled: true,
    modes: ["standard", "vibe"],
  },
  {
    id: "search-insights",
    label: "Insights & Recommendations",
    component: SearchInsights,
    enabled: true,
    modes: ["standard", "vibe"],
  },

  /* ----section: Add new sections above this line----
   * Example:
   * {
   *   id: "my-new-section",
   *   label: "My New Section",
   *   component: MyNewSection,
   *   enabled: true,
   *   modes: ["standard"],
   * },
   */
];

/**
 * Returns only the sections that are currently enabled.
 * If a mode is specified, also filters by mode visibility.
 */
export function getEnabledSections(mode?: SearchMode): SearchSectionEntry[] {
  return SEARCH_SECTIONS.filter((s) => {
    if (!s.enabled) return false;
    if (mode && s.modes && s.modes.length > 0) {
      return s.modes.includes(mode);
    }
    return true;
  });
}

export default SEARCH_SECTIONS;
