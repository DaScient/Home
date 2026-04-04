"use client";

import { useState } from "react";
import { getEnabledSections } from "@/components/search/sectionRegistry";

/**
 * /search — DaScient Search Page
 *
 * Renders all enabled sections from the section registry.
 * State (query) is lifted here and passed down to every section
 * so they can both read and update the shared search context.
 */
export default function SearchPage() {
  const [query, setQuery] = useState("");
  const sections = getEnabledSections();

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-8">
      {sections.map((section) => {
        const SectionComponent = section.component;
        return (
          <SectionComponent
            key={section.id}
            query={query}
            onQueryChange={setQuery}
          />
        );
      })}
    </div>
  );
}
