"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type KeyboardEvent,
} from "react";
import {
  type OutputLine,
  type LineStyle,
  executeCommand,
  getCompletions,
} from "@/lib/commands";
import { FS, buildPrompt } from "@/lib/filesystem";

/** A rendered line in the terminal output. */
interface RenderedLine {
  id: number;
  text: string;
  style: LineStyle;
  link?: string;
}

let lineIdCounter = 0;

export default function Terminal() {
  const [outputLines, setOutputLines] = useState<RenderedLine[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [, setHistoryIdx] = useState(-1);
  const [typewriterActive, setTypewriterActive] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [typewriterDone, setTypewriterDone] = useState(0);

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentPathRef = useRef(currentPath);
  const pendingLinkRef = useRef<string | undefined>(undefined);

  // Keep ref in sync
  currentPathRef.current = currentPath;

  const scrollBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  // Scroll when output changes
  useEffect(() => {
    scrollBottom();
  }, [outputLines, typewriterDone, scrollBottom]);

  const appendLines = useCallback((lines: OutputLine[]) => {
    const rendered = lines.map((l) => ({
      id: ++lineIdCounter,
      text: l.text,
      style: l.style,
      link: l.link,
    }));
    setOutputLines((prev) => [...prev, ...rendered]);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!typewriterActive || !typewriterText) return;

    let i = 0;
    const fullText = typewriterText;
    let cancelled = false;

    function tick() {
      if (cancelled) return;
      if (i < fullText.length) {
        // Batch characters for performance
        const batchSize = fullText[i] === "\n" ? 1 : 3;
        const end = Math.min(i + batchSize, fullText.length);
        i = end;
        setTypewriterDone(i);
        setTimeout(tick, 8);
      } else {
        setTypewriterActive(false);
        setTypewriterText("");
        setTypewriterDone(0);

        // Open pending link after typewriter finishes
        if (pendingLinkRef.current) {
          const url = pendingLinkRef.current;
          pendingLinkRef.current = undefined;
          window.open(url, "_blank", "noopener,noreferrer");
        }
      }
    }

    tick();
    return () => {
      cancelled = true;
    };
  }, [typewriterActive, typewriterText]);

  const execute = useCallback(
    (rawInput: string) => {
      const trimmed = rawInput.trim();
      const path = currentPathRef.current;

      // Echo the command
      appendLines([
        { text: buildPrompt(path) + trimmed, style: "command" },
      ]);

      if (!trimmed) return;

      // Save to history
      setHistory((prev) => {
        const next = [trimmed, ...prev];
        if (next.length > 100) next.pop();
        return next;
      });
      setHistoryIdx(-1);

      const result = executeCommand(trimmed, path);

      if (result.clear) {
        setOutputLines([]);
        return;
      }

      if (result.newPath !== undefined) {
        setCurrentPath(result.newPath);
      }

      if (result.openLink) {
        pendingLinkRef.current = result.openLink;
      }

      if (result.typewriter && result.lines.length > 0) {
        // Collect all text for typewriter, render non-content lines normally
        const contentLines: OutputLine[] = [];
        const normalLines: OutputLine[] = [];
        for (const l of result.lines) {
          if (l.style === "content") {
            contentLines.push(l);
          } else {
            normalLines.push(l);
          }
        }
        if (normalLines.length > 0) {
          appendLines(normalLines);
        }
        if (contentLines.length > 0) {
          const text = contentLines.map((l) => l.text).join("\n");
          setTypewriterText(text);
          setTypewriterActive(true);
        }
      } else {
        appendLines(result.lines);
      }
    },
    [appendLines]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (typewriterActive) {
        e.preventDefault();
        return;
      }

      if (e.key === "Enter") {
        const val = inputValue;
        setInputValue("");
        execute(val);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHistoryIdx((prev) => {
          const next = prev < history.length - 1 ? prev + 1 : prev;
          if (next >= 0 && next < history.length) {
            setInputValue(history[next]);
          }
          return next;
        });
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setHistoryIdx((prev) => {
          if (prev > 0) {
            const next = prev - 1;
            setInputValue(history[next]);
            return next;
          } else {
            setInputValue("");
            return -1;
          }
        });
      } else if (e.key === "Tab") {
        e.preventDefault();
        const { completions, replaceFrom } = getCompletions(
          inputValue,
          currentPathRef.current
        );
        if (completions.length === 1) {
          const parts = inputValue.split(/\s+/);
          if (parts.length <= 1) {
            setInputValue(completions[0] + " ");
          } else {
            const before = inputValue.substring(0, replaceFrom);
            setInputValue(before + completions[0]);
          }
        } else if (completions.length > 1) {
          appendLines([
            {
              text:
                buildPrompt(currentPathRef.current) + inputValue,
              style: "command",
            },
            { text: "  " + completions.join("   "), style: "dim" },
          ]);
        }
      }
    },
    [typewriterActive, inputValue, history, execute, appendLines]
  );

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  // Boot sequence
  useEffect(() => {
    const welcome = (FS.home as { type: "dir"; children: Record<string, { type: "file"; content: string }> }).children["welcome.txt"];
    appendLines([
      { text: "$dascient:/home >> cat welcome.txt", style: "command" },
    ]);
    setTypewriterText(welcome.content);
    setTypewriterActive(true);
    focusInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Global key handler for focus
  useEffect(() => {
    function handleGlobalKey(e: globalThis.KeyboardEvent) {
      if (
        inputRef.current &&
        document.activeElement !== inputRef.current &&
        !e.metaKey &&
        !e.ctrlKey
      ) {
        inputRef.current.focus();
      }
    }
    document.addEventListener("keydown", handleGlobalKey);
    return () => document.removeEventListener("keydown", handleGlobalKey);
  }, []);

  const prompt = buildPrompt(currentPath);

  return (
    <div
      ref={terminalRef}
      className="terminal-container"
      onClick={focusInput}
      role="main"
      aria-label="DaScient Terminal"
    >
      <div className="terminal-output" aria-live="polite" aria-atomic="false">
        {outputLines.map((line) => (
          <div key={line.id} className={`terminal-line terminal-${line.style}`}>
            {line.link ? (
              <a
                href={line.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {line.text}
              </a>
            ) : (
              line.text
            )}
          </div>
        ))}

        {/* Typewriter output */}
        {typewriterActive && typewriterText && (
          <div className="terminal-line terminal-content">
            {typewriterText.substring(0, typewriterDone)}
          </div>
        )}
      </div>

      <div className="terminal-input-line">
        <span className="terminal-prompt" aria-hidden="true">
          {prompt}
        </span>
        <span className="terminal-typed" aria-hidden="true">
          {inputValue}
        </span>
        <span className="terminal-cursor" aria-hidden="true" />
        <input
          ref={inputRef}
          className="terminal-hidden-input"
          type="text"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          aria-label="Terminal input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
