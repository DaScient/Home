import type { ComponentType } from "react";

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
 * read the current query and update it.
 * ============================================================ */

// ---- Section Props (shared across all sections) ----
export interface SearchSectionProps {
  /** Current search query string */
  query: string;
  /** Callback to update the search query */
  onQueryChange: (query: string) => void;
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
  },
  {
    id: "search-results",
    label: "Search Results",
    component: SearchResults,
    enabled: true,
  },
  {
    id: "quick-actions",
    label: "Quick Actions",
    component: QuickActions,
    enabled: true,
  },
  {
    id: "search-history",
    label: "Recent Searches",
    component: SearchHistory,
    enabled: true,
  },
  {
    id: "search-insights",
    label: "Insights & Recommendations",
    component: SearchInsights,
    enabled: true,
  },

  /* ----section: Add new sections above this line----
   * Example:
   * {
   *   id: "my-new-section",
   *   label: "My New Section",
   *   component: MyNewSection,
   *   enabled: true,
   * },
   */
];

/** Returns only the sections that are currently enabled. */
export function getEnabledSections(): SearchSectionEntry[] {
  return SEARCH_SECTIONS.filter((s) => s.enabled);
}

export default SEARCH_SECTIONS;
