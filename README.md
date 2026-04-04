# DaScient Home

Next.js 16 application showcasing DaScient Search and the in-browser DaScient Terminal. Built with TypeScript and Tailwind CSS v4.

## Overview

- **Homepage**: Brand landing page with entry points into search and terminal experiences.
- **DaScient Search** (`/search`): Mode-based search surface with registry-driven sections for hero, results, quick actions, history, and insights. Modes include standard, vibe, prompt hub, agentic, and intro.
- **DaScient Terminal** (`/terminal`): Interactive terminal emulator with a pseudo filesystem, typewriter output, tab completion, and link-aware files.

## Terminal Commands (behavioral reference)

All commands are pure functions in `src/lib/commands.ts`. Output uses styled lines and optional side effects (path changes, link opening, clearing output, typewriter animation).

| Command | Usage | Result |
|---------|-------|--------|
| `help` | `help` | Lists every available command with brief descriptions. |
| `ls` | `ls` | Lists child entries in the current virtual directory, styled as `dir` or `file` (locked style for restricted/encrypted). |
| `cd` | `cd [dir]`, `cd ..`, `cd /`, `cd ~` | Moves within the pseudo filesystem; errors when target is missing or not a directory. |
| `cat` | `cat [file]` | Reads file content. Restricted/encrypted files render gated content; files with `link` trigger `openLink` to new tab after typewriter output. |
| `clear` | `clear` | Clears existing output. |
| `whoami` | `whoami` | Prints session metadata (user, host, session, access, terminal version, UTC time). |
| `decrypt` | `decrypt [file] [key]` | Base64-decodes encrypted files when the key matches `DASCIENT`; on failure shows an access-denied block and hints at `/about/about.txt`. |

Tab completion (`Tab`) suggests command names, directories, and files for `cd`, `cat`, and `decrypt`. Command history is navigable with ArrowUp/ArrowDown.

## Terminal Filesystem (content map)

Defined in `src/lib/filesystem.ts`. Root directories include:

- `home/welcome.txt`: Intro banner and quick start tips.
- `about/about.txt`: Company overview and mission (contains the decryption hint).
- `podcast/podcast.txt`: Opens the DaScient podcast feed in a new tab.
- `services/services.txt`: Service catalog with inquiries directed to contact@dascient.com.
- `news/news.txt`, `blogs/blogs.txt`, `shop/shop.txt`, `robovet/robovet.txt`, `univerzine/univerzine.txt`, `ares-e/ares-e.txt`, `donation/donation.txt`: Each opens an external resource.
- `member/membership.txt`: Restricted notice for membership inquiries.
- `secret/encrypted.txt`: Encrypted file readable via `decrypt encrypted.txt DASCIENT`.

## Search Experience

- **Registry pattern**: `src/components/search/sectionRegistry.ts` enumerates sections; toggle visibility, modes, and ordering by editing the registry.
- **Shared props**: Sections consume `query`, `onQueryChange`, `activeMode`, and optional `onModeChange` for coordinated state.
- **Modes**: Standard and vibe show results, quick actions, history, and insights. Prompt hub shows workshop loader, protocol library, and OS resource grid. Agentic renders an agentic placeholder. Intro includes a guided tour overlay trigger.
- **Hero**: Mode switcher and search input are defined in `sections/SearchHero.tsx`.

## Running the Project

```bash
npm install
npm run dev
# Visit http://localhost:3000, /search, or /terminal
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production server |
| `npm run lint` | Run ESLint (flat config) |

## Development Notes

- Tech stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4.
- Terminal output rendering and typewriter timing live in `src/components/terminal/Terminal.tsx`; commands and filesystem are pure functions under `src/lib/`.
- Search state and modes originate from `src/components/search/lib/hooks/useSearchState`.

## Future Additions

- Placeholder for upcoming features, integrations, and release notes.

## Contact

For questions or engagements, reach out at contact@dascient.com.
