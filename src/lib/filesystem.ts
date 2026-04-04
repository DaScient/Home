/**
 * DaScient Terminal — Pseudo File System (TypeScript)
 *
 * Each node is either a 'dir' (with children) or a 'file' (with content).
 * Special flags:
 *   link       : string  — auto-open this URL when the file is cat'd
 *   restricted : true    — require membership to read
 *   encrypted  : true    — Base64-encoded content, require decrypt command
 */

export interface FSFile {
  type: "file";
  content: string;
  link?: string;
  restricted?: boolean;
  encrypted?: boolean;
  encodedContent?: string;
}

export interface FSDir {
  type: "dir";
  children: Record<string, FSNode>;
}

export type FSNode = FSFile | FSDir;

export type FileSystem = Record<string, FSNode>;

export const FS: FileSystem = {
  home: {
    type: "dir",
    children: {
      "welcome.txt": {
        type: "file",
        content: `
██████╗  █████╗ ███████╗ ██████╗██╗███████╗███╗   ██╗████████╗
██╔══██╗██╔══██╗██╔════╝██╔════╝██║██╔════╝████╗  ██║╚══██╔══╝
██║  ██║███████║███████╗██║     ██║█████╗  ██╔██╗ ██║   ██║   
██║  ██║██╔══██║╚════██║██║     ██║██╔══╝  ██║╚██╗██║   ██║   
██████╔╝██║  ██║███████║╚██████╗██║███████╗██║ ╚████║   ██║   
╚═════╝ ╚═╝  ╚═╝╚══════╝ ╚═════╝╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝   
                          T E R M I N A L  v 1 . 0

  "Intelligence is the future of infrastructure."

  Welcome, Visitor.

  DaScient is a strategic technology firm specializing in
  enterprise intelligence and autonomous systems for critical
  infrastructure and national security.

  ─────────────────────────────────────────────────────────
  QUICK START
  ─────────────────────────────────────────────────────────
  Type  help        to list all commands
  Type  ls          to explore this directory
  Type  cd [dir]    to navigate
  Type  cat [file]  to read a file
  Type  clear       to clear the screen
  ─────────────────────────────────────────────────────────
`,
      },
    },
  },

  about: {
    type: "dir",
    children: {
      "about.txt": {
        type: "file",
        content: `
ABOUT DASCIENT
══════════════════════════════════════════════════════════════

DaScient specializes in the deployment of Strategic Enterprise
Intelligence and the verification of autonomous manufacturing
systems for critical infrastructure and national security assets.

Our capabilities span across:
  · Advanced AI/ML systems design and deployment
  · Strategic intelligence platform architecture
  · Autonomous manufacturing verification protocols
  · Critical infrastructure cyber-resilience
  · National security technology integration

MISSION
───────
Empowering the next generation of intelligent systems through
disciplined engineering, data sovereignty, and strategic foresight.

VISION
──────
A world where autonomous systems and human judgment operate
in verified, trustworthy harmony.

──────────────────────────────────────────────────────────────
Dedicated. Autonomous. Scientific. Curious. Intelligent. Evolving.
Navigating Tomorrow.

Protocol Clearance Code: DASCIENT
──────────────────────────────────────────────────────────────
`,
      },
    },
  },

  podcast: {
    type: "dir",
    children: {
      "podcast.txt": {
        type: "file",
        link: "https://rss.com/podcasts/dascient/",
        content: `
DASCIENT PODCAST
════════════════

Tune in to the DaScient Podcast for insights on strategic
enterprise intelligence, autonomous systems, and the future
of critical infrastructure.

  >> https://rss.com/podcasts/dascient/

Opening link in new tab...
`,
      },
    },
  },

  services: {
    type: "dir",
    children: {
      "services.txt": {
        type: "file",
        content: `
DASCIENT SERVICES
═════════════════════════════════════════════════════════════

  PROJECT ENGINEERING
  ───────────────────
  End-to-end engineering for complex autonomous and
  intelligence-driven systems. From concept to deployment.

  CONSULTING
  ──────────
  Strategic advisory for organizations navigating the
  intersection of AI, national security, and critical
  infrastructure.

  AI / ML / ANALYTICS DEVELOPMENT
  ────────────────────────────────
  Custom model development, data pipeline architecture,
  and intelligent analytics platforms.

  AUTONOMOUS SYSTEMS VERIFICATION
  ────────────────────────────────
  Rigorous testing and verification protocols for autonomous
  manufacturing and operational systems.

  ENTERPRISE INTELLIGENCE PLATFORMS
  ───────────────────────────────────
  Design and deployment of Strategic Enterprise Intelligence
  frameworks tailored to your operational environment.

  ─────────────────────────────────────────────────────────
  For inquiries: contact@dascient.com
  ─────────────────────────────────────────────────────────
`,
      },
    },
  },

  news: {
    type: "dir",
    children: {
      "news.txt": {
        type: "file",
        link: "https://gozaddy.ai",
        content: `
DASCIENT NEWS
═════════════

Stay current with the latest in strategic intelligence,
AI innovation, and autonomous systems.

  >> https://gozaddy.ai

Opening link in new tab...
`,
      },
    },
  },

  blogs: {
    type: "dir",
    children: {
      "blogs.txt": {
        type: "file",
        link: "https://dascient.medium.com/",
        content: `
DASCIENT BLOG
═════════════

In-depth articles on strategic enterprise intelligence,
autonomous systems, AI/ML, and the future of critical
infrastructure security.

  >> https://dascient.medium.com/

Opening link in new tab...
`,
      },
    },
  },

  shop: {
    type: "dir",
    children: {
      "shop.txt": {
        type: "file",
        link: "https://www.amazon.com/stores/Don-Tadaya/author/B0FVTPKFZK",
        content: `
DASCIENT SHOP
═════════════

Explore DaScient publications and resources available
through our storefront.

  Amazon Author Store (Don Tadaya):
  >> https://www.amazon.com/stores/Don-Tadaya/author/B0FVTPKFZK

Opening link in new tab...
`,
      },
    },
  },

  robovet: {
    type: "dir",
    children: {
      "robovet.txt": {
        type: "file",
        link: "https://apps.apple.com/us/app/robovet/id6753560467",
        content: `
ROBOVET
═══════

RoboVet — AI-powered veterinary intelligence application.
Available now on the Apple App Store.

  >> https://apps.apple.com/us/app/robovet/id6753560467

Opening link in new tab...
`,
      },
    },
  },

  univerzine: {
    type: "dir",
    children: {
      "univerzine.txt": {
        type: "file",
        link: "https://github.com/DaScient/Univerzine2.0",
        content: `
UNIVERZINE 2.0
══════════════

Univerzine — an open-source DaScient project.
Explore the repository on GitHub.

  >> https://github.com/DaScient/Univerzine2.0

Opening link in new tab...
`,
      },
    },
  },

  "ares-e": {
    type: "dir",
    children: {
      "ares-e.txt": {
        type: "file",
        link: "https://dascient-protocol.aristocles24.workers.dev/",
        content: `
ARES-E PROTOCOL
═══════════════

The ARES-E system — DaScient's advanced enterprise
reasoning and execution environment.

  >> https://dascient-protocol.aristocles24.workers.dev/

Opening link in new tab...
`,
      },
    },
  },

  donation: {
    type: "dir",
    children: {
      "donation.txt": {
        type: "file",
        link: "https://cash.app/$dascient",
        content: `
SUPPORT DASCIENT
════════════════

Your support helps advance strategic intelligence research
and autonomous systems development.

  >> https://cash.app/$dascient

Opening link in new tab...
`,
      },
    },
  },

  member: {
    type: "dir",
    children: {
      "membership.txt": {
        type: "file",
        restricted: true,
        content: `
  ╔══════════════════════════════════════════════════════════╗
  ║               ACCESS RESTRICTED                          ║
  ╚══════════════════════════════════════════════════════════╝

  This directory requires DaScient membership clearance.

  To inquire about DaScient membership:

    >> mailto: membership@dascient.com

  Reference this terminal session in your inquiry.
`,
      },
    },
  },

  secret: {
    type: "dir",
    children: {
      "encrypted.txt": {
        type: "file",
        encrypted: true,
        encodedContent:
          "QUNDRVNTIEdSQU5URUQuCgpXZWxjb21lIHRvIHRoZSBEYVNjaWVudCBJbm5lciBDaXJjbGUuCllvdSBoYXZlIGRlbW9uc3RyYXRlZCB0aGUgY3VyaW9zaXR5IGFuZCB0ZW5hY2l0eQpyZXF1aXJlZCB0byBuYXZpZ2F0ZSBvdXIgZW5jcnlwdGVkIHByb3RvY29scy4KClRoZSBmdXR1cmUgb2Ygc3RyYXRlZ2ljIGVudGVycHJpc2UgaW50ZWxsaWdlbmNlCmF3YWl0cyB0aG9zZSB3aG8gc2VlayBpdC4KCj4+IENvbnRhY3Q6IGludGVsQGRhc2NpZW50LmNvbQo+PiBOZXh0IGRpcmVjdGl2ZTogL2FyZXMtZQ==",
        content: `
  ╔══════════════════════════════════════════════════════════╗
  ║               ENCRYPTED FILE                             ║
  ╚══════════════════════════════════════════════════════════╝

  This file is encrypted.
  Use:  decrypt encrypted.txt [key]

  Hint: The key may be hidden somewhere in /about...
`,
      },
    },
  },
};

/** Navigate to a node given a path array. Returns null if path is invalid. */
export function getNode(pathArr: string[]): FSNode | null {
  if (!pathArr || pathArr.length === 0) return null;
  let node: FSNode | undefined = FS[pathArr[0]];
  for (let i = 1; i < pathArr.length; i++) {
    if (!node || node.type !== "dir") return null;
    node = node.children[pathArr[i]];
  }
  return node ?? null;
}

/** Return the children of the directory at the given path. Root = []. */
export function getChildren(
  pathArr: string[]
): Record<string, FSNode> | null {
  if (pathArr.length === 0) return FS;
  const node = getNode(pathArr);
  return node && node.type === "dir" ? node.children : null;
}

/** Build the prompt string for a given path. */
export function buildPrompt(pathArr: string[]): string {
  const loc = pathArr.length === 0 ? "~" : "/" + pathArr.join("/");
  return `$dascient:${loc} >> `;
}
