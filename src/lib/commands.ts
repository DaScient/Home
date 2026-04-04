/**
 * DaScient Terminal — Command Library (TypeScript)
 *
 * Pure functions that return output lines. No DOM manipulation.
 * The Terminal component is responsible for rendering.
 */

import { getChildren } from "./filesystem";

// ── Output line types ───────────────────────────────────────────────────────

export type LineStyle =
  | "default"
  | "command"
  | "content"
  | "dim"
  | "header"
  | "error"
  | "dir"
  | "file"
  | "locked"
  | "link";

export interface OutputLine {
  text: string;
  style: LineStyle;
  link?: string;
}

// ── Command result ──────────────────────────────────────────────────────────

export interface CommandResult {
  lines: OutputLine[];
  /** New path after command execution (for cd). */
  newPath?: string[];
  /** URL to open in new tab. */
  openLink?: string;
  /** If true, caller should clear output before rendering lines. */
  clear?: boolean;
  /** If true, content should be typewriter-animated. */
  typewriter?: boolean;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function line(text: string, style: LineStyle = "default"): OutputLine {
  return { text, style };
}



// ── Commands ────────────────────────────────────────────────────────────────

function help(): CommandResult {
  return {
    lines: [
      line(""),
      line("AVAILABLE COMMANDS", "header"),
      line("──────────────────────────────────────────────", "dim"),
      line("  help                  Show this help message"),
      line("  ls                    List files and directories"),
      line("  cd [dir]              Change directory  (cd .. to go up)"),
      line("  cat [file]            Read a file"),
      line("  clear                 Clear the terminal"),
      line("  whoami                Display session info"),
      line("  decrypt [file] [key]  Decrypt an encrypted file"),
      line("──────────────────────────────────────────────", "dim"),
      line(""),
    ],
  };
}

function ls(currentPath: string[]): CommandResult {
  const children = getChildren(currentPath);
  if (!children) {
    return { lines: [line("ls: cannot access directory", "error")] };
  }
  const entries = Object.keys(children);
  if (entries.length === 0) {
    return { lines: [line("(empty)", "dim")] };
  }
  const lines: OutputLine[] = [line("")];
  for (const name of entries) {
    const node = children[name];
    if (node.type === "dir") {
      lines.push(line("  drwxr-xr-x  " + name + "/", "dir"));
    } else {
      lines.push(
        line(
          "  -rw-r--r--  " + name,
          node.restricted || node.encrypted ? "locked" : "file"
        )
      );
    }
  }
  lines.push(line(""));
  return { lines };
}

function cd(
  args: string[],
  currentPath: string[]
): CommandResult {
  const target = args[0];
  if (!target || target === "~") {
    return { lines: [], newPath: [] };
  }
  if (target === "..") {
    const newPath = [...currentPath];
    if (newPath.length > 0) newPath.pop();
    return { lines: [], newPath };
  }
  if (target === "/") {
    return { lines: [], newPath: [] };
  }

  const children = getChildren(currentPath);
  if (!children || !(target in children)) {
    return {
      lines: [line("cd: " + target + ": No such directory", "error")],
    };
  }
  const node = children[target];
  if (node.type !== "dir") {
    return {
      lines: [line("cd: " + target + ": Not a directory", "error")],
    };
  }
  return { lines: [], newPath: [...currentPath, target] };
}

function cat(
  args: string[],
  currentPath: string[]
): CommandResult {
  const filename = args[0];
  if (!filename) {
    return {
      lines: [
        line("cat: missing file operand", "error"),
        line("Usage: cat [file]", "dim"),
      ],
    };
  }

  const children = getChildren(currentPath);
  if (!children || !(filename in children)) {
    return {
      lines: [line("cat: " + filename + ": No such file", "error")],
    };
  }
  const node = children[filename];
  if (node.type === "dir") {
    return {
      lines: [
        line("cat: " + filename + ": Is a directory (use ls or cd)", "error"),
      ],
    };
  }

  if (node.restricted) {
    return {
      lines: [line(node.content, "content")],
      typewriter: true,
    };
  }
  if (node.encrypted) {
    return {
      lines: [line(node.content, "content")],
      typewriter: true,
    };
  }

  if (node.link) {
    return {
      lines: [line(node.content, "content")],
      typewriter: true,
      openLink: node.link,
    };
  }

  return {
    lines: [line(node.content, "content")],
    typewriter: node.content.length > 200,
  };
}

function whoami(): CommandResult {
  return {
    lines: [
      line(""),
      line("  user     : visitor"),
      line("  host     : dascient-terminal"),
      line("  session  : anonymous"),
      line("  access   : public"),
      line("  terminal : DaScient Terminal v1.0"),
      line("  time     : " + new Date().toUTCString()),
      line(""),
    ],
  };
}

function decrypt(
  args: string[],
  currentPath: string[]
): CommandResult {
  const filename = args[0];
  const key = args[1];

  if (!filename || !key) {
    return {
      lines: [line("Usage: decrypt [file] [key]", "error")],
    };
  }

  const children = getChildren(currentPath);
  if (!children || !(filename in children)) {
    return {
      lines: [line("decrypt: " + filename + ": No such file", "error")],
    };
  }
  const node = children[filename];
  if (node.type === "dir" || !node.encrypted) {
    return {
      lines: [
        line("decrypt: " + filename + ": File is not encrypted", "error"),
      ],
    };
  }

  const VALID_KEY = "DASCIENT";
  if (key.toUpperCase() !== VALID_KEY) {
    return {
      lines: [
        line(""),
        line(
          "  ╔══════════════════════════════════════╗",
          "error"
        ),
        line(
          "  ║         DECRYPTION FAILED            ║",
          "error"
        ),
        line(
          "  ╚══════════════════════════════════════╝",
          "error"
        ),
        line("  Invalid key. Access denied.", "error"),
        line("  Hint: The key is hidden in /about/about.txt", "dim"),
        line(""),
      ],
    };
  }

  try {
    const decoded = atob(node.encodedContent ?? "");
    return {
      lines: [line(""), line("  Decrypting...", "dim"), line(decoded, "content")],
      typewriter: true,
    };
  } catch {
    return {
      lines: [line("decrypt: decoding error", "error")],
    };
  }
}

function clear(): CommandResult {
  return { lines: [], clear: true };
}

// ── Command dispatch ────────────────────────────────────────────────────────

export const COMMAND_NAMES = [
  "help",
  "ls",
  "cd",
  "cat",
  "clear",
  "whoami",
  "decrypt",
] as const;

export type CommandName = (typeof COMMAND_NAMES)[number];

export function executeCommand(
  rawInput: string,
  currentPath: string[]
): CommandResult {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return { lines: [] };
  }

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (cmd) {
    case "help":
      return help();
    case "ls":
      return ls(currentPath);
    case "cd":
      return cd(args, currentPath);
    case "cat":
      return cat(args, currentPath);
    case "clear":
      return clear();
    case "whoami":
      return whoami();
    case "decrypt":
      return decrypt(args, currentPath);
    default:
      return {
        lines: [
          line(""),
          line(
            "  command not found: " +
              cmd +
              "  (type 'help' for available commands)",
            "error"
          ),
          line(""),
        ],
      };
  }
}

/** Tab-complete helper: returns matching entries for a partial input. */
export function getCompletions(
  rawInput: string,
  currentPath: string[]
): { completions: string[]; replaceFrom: number } {
  const parts = rawInput.split(/\s+/);
  const partial = parts[parts.length - 1] ?? "";

  // Complete command names
  if (parts.length <= 1) {
    const matches = COMMAND_NAMES.filter((c) => c.startsWith(partial));
    return { completions: matches as unknown as string[], replaceFrom: 0 };
  }

  // Complete filenames for cd, cat, decrypt
  const cmd = parts[0].toLowerCase();
  if (cmd === "cd" || cmd === "cat" || cmd === "decrypt") {
    const children = getChildren(currentPath) ?? {};
    const matches = Object.keys(children).filter((n) =>
      n.startsWith(partial)
    );
    return {
      completions: matches,
      replaceFrom: rawInput.length - partial.length,
    };
  }

  return { completions: [], replaceFrom: 0 };
}
