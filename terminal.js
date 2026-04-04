/**
 * DaScient Terminal — Command Parser & State Machine
 */

(function () {
  'use strict';

  // ── DOM references ──────────────────────────────────────────────────────────
  const terminal   = document.getElementById('terminal');
  const output     = document.getElementById('output');
  const inputLine  = document.getElementById('input-line');
  const promptEl   = document.getElementById('prompt');
  const typedText  = document.getElementById('typed-text');
  const cursor     = document.getElementById('cursor');
  const hiddenInput = document.getElementById('hidden-input');

  // ── Terminal state ──────────────────────────────────────────────────────────
  let currentPath = [];          // [] = root, ['home'] = /home, etc.
  let history     = [];          // command history
  let historyIdx  = -1;
  let typewriterActive = false;  // lock input during typewriter animation

  // ── Helpers ─────────────────────────────────────────────────────────────────

  /** Return the FS node for the current path (or a given path array). */
  function getNode(pathArr) {
    if (!pathArr || pathArr.length === 0) return null; // root handled separately
    let node = FS[pathArr[0]];
    for (let i = 1; i < pathArr.length; i++) {
      if (!node || node.type !== 'dir') return null;
      node = node.children[pathArr[i]];
    }
    return node;
  }

  /** Return the children object of the current directory. */
  function getCurrentChildren() {
    if (currentPath.length === 0) return FS;           // root
    const node = getNode(currentPath);
    return node && node.type === 'dir' ? node.children : null;
  }

  /** Build the prompt string reflecting the current path. */
  function buildPrompt() {
    const loc = currentPath.length === 0 ? '~' : '/' + currentPath.join('/');
    return `$dascient:${loc} >> `;
  }

  /** Append a single line (or pre-formatted block) to the output area. */
  function println(text, className) {
    const div = document.createElement('div');
    div.className = 'output-line' + (className ? ' ' + className : '');
    div.textContent = text;
    output.appendChild(div);
    scrollBottom();
  }

  /** Append a clickable link line. */
  function printLink(text, url) {
    const div = document.createElement('div');
    div.className = 'output-line link';
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = text;
    div.appendChild(a);
    output.appendChild(div);
    scrollBottom();
  }

  /** Print a blank separator line. */
  function printBlank() {
    println('');
  }

  /** Scroll to the bottom of the terminal. */
  function scrollBottom() {
    terminal.scrollTop = terminal.scrollHeight;
  }

  /** Typewriter effect for long content. Returns a Promise. */
  function typewrite(text, speed = 12) {
    return new Promise(function (resolve) {
      typewriterActive = true;
      const div = document.createElement('div');
      div.className = 'output-line content';
      output.appendChild(div);

      let i = 0;
      function tick() {
        if (i < text.length) {
          div.textContent += text[i];
          i++;
          // Chunk newlines instantly to avoid excessive scroll jank
          if (text[i - 1] === '\n') {
            scrollBottom();
          }
          setTimeout(tick, speed);
        } else {
          scrollBottom();
          typewriterActive = false;
          resolve();
        }
      }
      tick();
    });
  }

  /** Open a URL in a new tab (safe). */
  function openLink(url) {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // ── Commands ─────────────────────────────────────────────────────────────────

  const COMMANDS = {

    help: function () {
      println('');
      println('AVAILABLE COMMANDS', 'header');
      println('──────────────────────────────────────────────', 'dim');
      println('  help                  Show this help message');
      println('  ls                    List files and directories');
      println('  cd [dir]              Change directory  (cd .. to go up)');
      println('  cat [file]            Read a file');
      println('  clear                 Clear the terminal');
      println('  whoami                Display session info');
      println('  decrypt [file] [key]  Decrypt an encrypted file');
      println('──────────────────────────────────────────────', 'dim');
      println('');
    },

    ls: function () {
      const children = getCurrentChildren();
      if (!children) {
        println('ls: cannot access directory', 'error');
        return;
      }
      const entries = Object.keys(children);
      if (entries.length === 0) {
        println('(empty)', 'dim');
        return;
      }
      println('');
      entries.forEach(function (name) {
        const node = children[name];
        if (node.type === 'dir') {
          println('  drwxr-xr-x  ' + name + '/', 'dir');
        } else {
          println('  -rw-r--r--  ' + name, node.restricted || node.encrypted ? 'locked' : 'file');
        }
      });
      println('');
    },

    cd: function (args) {
      const target = args[0];
      if (!target || target === '~') {
        currentPath = [];
        promptEl.textContent = buildPrompt();
        return;
      }
      if (target === '..') {
        if (currentPath.length > 0) currentPath.pop();
        promptEl.textContent = buildPrompt();
        return;
      }
      if (target === '/') {
        currentPath = [];
        promptEl.textContent = buildPrompt();
        return;
      }

      const children = getCurrentChildren();
      if (!children || !(target in children)) {
        println('cd: ' + target + ': No such directory', 'error');
        return;
      }
      const node = children[target];
      if (node.type !== 'dir') {
        println('cd: ' + target + ': Not a directory', 'error');
        return;
      }
      currentPath.push(target);
      promptEl.textContent = buildPrompt();
    },

    cat: function (args) {
      const filename = args[0];
      if (!filename) {
        println('cat: missing file operand', 'error');
        println('Usage: cat [file]', 'dim');
        return;
      }

      const children = getCurrentChildren();
      if (!children || !(filename in children)) {
        println('cat: ' + filename + ': No such file', 'error');
        return;
      }
      const node = children[filename];
      if (node.type === 'dir') {
        println('cat: ' + filename + ': Is a directory (use ls or cd)', 'error');
        return;
      }
      if (node.restricted) {
        typewrite(node.content, 8);
        return;
      }
      if (node.encrypted) {
        typewrite(node.content, 8);
        return;
      }

      // If file has an external link, open it
      if (node.link) {
        typewrite(node.content, 8).then(function () {
          openLink(node.link);
        });
        return;
      }

      // Regular file — typewriter for long content, instant for short
      if (node.content && node.content.length > 200) {
        typewrite(node.content, 6);
      } else {
        println(node.content, 'content');
      }
    },

    clear: function () {
      output.innerHTML = '';
    },

    whoami: function () {
      println('');
      println('  user     : visitor');
      println('  host     : dascient-terminal');
      println('  session  : anonymous');
      println('  access   : public');
      println('  terminal : DaScient Terminal v1.0');
      println('  time     : ' + new Date().toUTCString());
      println('');
    },

    decrypt: function (args) {
      const filename = args[0];
      const key      = args[1];

      if (!filename || !key) {
        println('Usage: decrypt [file] [key]', 'error');
        return;
      }

      const children = getCurrentChildren();
      if (!children || !(filename in children)) {
        println('decrypt: ' + filename + ': No such file', 'error');
        return;
      }
      const node = children[filename];
      if (!node.encrypted) {
        println('decrypt: ' + filename + ': File is not encrypted', 'error');
        return;
      }

      const VALID_KEY = 'DASCIENT';
      if (key.toUpperCase() !== VALID_KEY) {
        println('');
        println('  ╔══════════════════════════════════════╗', 'error');
        println('  ║         DECRYPTION FAILED            ║', 'error');
        println('  ╚══════════════════════════════════════╝', 'error');
        println('  Invalid key. Access denied.', 'error');
        println('  Hint: The key is hidden in /about/about.txt', 'dim');
        println('');
        return;
      }

      try {
        const decoded = atob(node.encodedContent);
        println('');
        println('  Decrypting...', 'dim');
        setTimeout(function () {
          typewrite(decoded, 25);
        }, 600);
      } catch (e) {
        println('decrypt: decoding error', 'error');
      }
    }
  };

  // ── Command execution ────────────────────────────────────────────────────────

  function execute(rawInput) {
    const trimmed = rawInput.trim();

    // Echo the command
    println(buildPrompt() + trimmed, 'command');

    if (!trimmed) return;

    // Save to history
    history.unshift(trimmed);
    if (history.length > 100) history.pop();
    historyIdx = -1;

    const parts   = trimmed.split(/\s+/);
    const cmd     = parts[0].toLowerCase();
    const args    = parts.slice(1);

    if (COMMANDS[cmd]) {
      COMMANDS[cmd](args);
    } else {
      println('');
      println('  command not found: ' + cmd + '  (type \'help\' for available commands)', 'error');
      println('');
    }
  }

  // ── Input handling ───────────────────────────────────────────────────────────

  hiddenInput.addEventListener('input', function () {
    typedText.textContent = this.value;
  });

  hiddenInput.addEventListener('keydown', function (e) {
    if (typewriterActive) {
      e.preventDefault();
      return;
    }

    if (e.key === 'Enter') {
      const val = hiddenInput.value;
      hiddenInput.value = '';
      typedText.textContent = '';
      execute(val);

    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIdx < history.length - 1) {
        historyIdx++;
        hiddenInput.value = history[historyIdx];
        typedText.textContent = hiddenInput.value;
      }

    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        historyIdx--;
        hiddenInput.value = history[historyIdx];
        typedText.textContent = hiddenInput.value;
      } else {
        historyIdx = -1;
        hiddenInput.value = '';
        typedText.textContent = '';
      }

    } else if (e.key === 'Tab') {
      e.preventDefault();
      tabComplete();
    }
  });

  // ── Tab completion ───────────────────────────────────────────────────────────

  function tabComplete() {
    const val    = hiddenInput.value;
    const parts  = val.split(/\s+/);
    const cmd    = parts[0].toLowerCase();
    const partial = parts[parts.length - 1];

    // Complete commands if only one word typed
    if (parts.length === 1) {
      const matches = Object.keys(COMMANDS).filter(function (c) {
        return c.startsWith(partial);
      });
      if (matches.length === 1) {
        hiddenInput.value = matches[0] + ' ';
        typedText.textContent = hiddenInput.value;
      } else if (matches.length > 1) {
        println(buildPrompt() + val, 'command');
        println('  ' + matches.join('   '), 'dim');
      }
      return;
    }

    // Complete filenames / dirnames
    if (cmd === 'cd' || cmd === 'cat' || cmd === 'decrypt') {
      const children = getCurrentChildren() || {};
      const matches  = Object.keys(children).filter(function (n) {
        return n.startsWith(partial);
      });
      if (matches.length === 1) {
        parts[parts.length - 1] = matches[0];
        hiddenInput.value = parts.join(' ');
        typedText.textContent = hiddenInput.value;
      } else if (matches.length > 1) {
        println(buildPrompt() + val, 'command');
        println('  ' + matches.join('   '), 'dim');
      }
    }
  }

  // ── Focus management ─────────────────────────────────────────────────────────

  function focusInput() {
    hiddenInput.focus();
  }

  terminal.addEventListener('click', focusInput);
  document.addEventListener('keydown', function (e) {
    // If user starts typing anywhere and input isn't focused, focus it
    if (document.activeElement !== hiddenInput && !e.metaKey && !e.ctrlKey) {
      hiddenInput.focus();
    }
  });

  // ── Boot sequence ────────────────────────────────────────────────────────────

  function boot() {
    promptEl.textContent = buildPrompt();
    focusInput();

    // Auto-display welcome.txt without mutating currentPath
    println('$dascient:/home >> cat welcome.txt', 'command');
    const welcome = FS.home.children['welcome.txt'];
    typewrite(welcome.content, 4).then(function () {
      promptEl.textContent = buildPrompt();
      focusInput();
    });
  }

  boot();

})();
