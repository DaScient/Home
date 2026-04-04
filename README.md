# DaScient Home

A modern web application built with [Next.js](https://nextjs.org), TypeScript, and Tailwind CSS — serving as the digital front-door for **DaScient**.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the homepage, or navigate to [/search](http://localhost:3000/search) to access DaScient Search.

## Architecture

### `/search` — Modular Section-Based Search Page

The search page uses a **section registry** pattern that makes it trivial to add, remove, or reorder UI sections:

```
src/components/search/
├── sectionRegistry.ts          # Central registry — add/remove sections here
└── sections/
    ├── SearchHero.tsx           # Main search input + branding
    ├── SearchResults.tsx        # AI-powered results display
    ├── QuickActions.tsx         # Shortcut cards for common queries
    ├── SearchHistory.tsx        # Recent searches
    └── SearchInsights.tsx       # AI-generated insights & recommendations
```

#### Adding a New Section

1. Create a component in `src/components/search/sections/YourSection.tsx`
2. Import it in `src/components/search/sectionRegistry.ts`
3. Add an entry to the `SEARCH_SECTIONS` array

Each section receives `SearchSectionProps` (`query` + `onQueryChange`) so it can read and update the shared search state.

### `/api/search` — API Route Stub

A stub endpoint at `/api/search` is ready for future agentic AI assistant integration. It supports `GET` (status) and `POST` (query submission).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
