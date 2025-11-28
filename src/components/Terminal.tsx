'use client';

import { useEffect, useRef, useState } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import 'xterm/css/xterm.css';
import { executeCommand } from '@/lib/terminal/commands';
import { WPMTracker } from '@/lib/wpm/tracker';

interface TerminalProps {
  onWPMUpdate?: (wpm: number) => void;
  onMetricsUpdate?: (metrics: any) => void;
}

export default function Terminal({ onWPMUpdate, onMetricsUpdate }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const wpmTrackerRef = useRef<WPMTracker | null>(null);
  const [currentLine, setCurrentLine] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    if (!terminalRef.current || xtermRef.current) return;

    // Initialize terminal
    const term = new XTerm({
      cursorBlink: true,
      cursorStyle: 'block',
      fontFamily: '"Fira Code", "JetBrains Mono", Consolas, Monaco, monospace',
      fontSize: 14,
      theme: {
        background: '#0a0a0f',
        foreground: '#ffffff',
        cursor: '#00ff9d',
        cursorAccent: '#00ff9d',
        black: '#000000',
        red: '#ff006e',
        green: '#00ff9d',
        yellow: '#ffbe0b',
        blue: '#00d4ff',
        magenta: '#a770ef',
        cyan: '#00d4ff',
        white: '#ffffff',
        brightBlack: '#666666',
        brightRed: '#ff006e',
        brightGreen: '#00ff9d',
        brightYellow: '#ffbe0b',
        brightBlue: '#00d4ff',
        brightMagenta: '#a770ef',
        brightCyan: '#00d4ff',
        brightWhite: '#ffffff',
      },
      allowProposedApi: true,
    });

    const fitAddon = new FitAddon();
    const webLinksAddon = new WebLinksAddon();

    term.loadAddon(fitAddon);
    term.loadAddon(webLinksAddon);
    term.open(terminalRef.current);
    fitAddon.fit();

    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    // Initialize WPM tracker
    const wpmTracker = new WPMTracker((wpm) => {
      if (onWPMUpdate) onWPMUpdate(wpm);
    });
    wpmTrackerRef.current = wpmTracker;

    // Welcome message
    term.writeln('\x1b[1;32m╔════════════════════════════════════════════════════════════════╗\x1b[0m');
    term.writeln('\x1b[1;32m║\x1b[0m                  \x1b[1;36mANDRI.IS - TERMINAL v2.0\x1b[0m                      \x1b[1;32m║\x1b[0m');
    term.writeln('\x1b[1;32m╚════════════════════════════════════════════════════════════════╝\x1b[0m');
    term.writeln('');
    term.writeln('\x1b[32m[SYSTEM]\x1b[0m Connection established...');
    term.writeln('\x1b[32m[SYSTEM]\x1b[0m WPM tracker initialized...');
    term.writeln('\x1b[32m[SYSTEM]\x1b[0m Security protocols active...');
    term.writeln('');
    term.writeln('\x1b[33mType "help" for available commands or "about" to learn more.\x1b[0m');
    term.writeln('');
    writePrompt(term);

    let currentInput = '';

    // Handle input
    term.onData((data) => {
      const code = data.charCodeAt(0);

      // Track typing for WPM
      wpmTracker.trackKeystroke();

      if (code === 13) {
        // Enter
        term.write('\r\n');
        const command = currentInput.trim();

        if (command) {
          setCommandHistory((prev) => [...prev, command]);
          executeTerminalCommand(term, command);
        }

        currentInput = '';
        setCurrentLine('');
        setHistoryIndex(-1);
      } else if (code === 127) {
        // Backspace
        if (currentInput.length > 0) {
          currentInput = currentInput.slice(0, -1);
          setCurrentLine(currentInput);
          term.write('\b \b');
          wpmTracker.trackBackspace();
        }
      } else if (code === 27) {
        // Escape sequences (arrow keys)
        const sequence = data.slice(1);
        if (sequence === '[A') {
          // Up arrow - previous command
          if (commandHistory.length > 0) {
            const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
            setHistoryIndex(newIndex);
            const cmd = commandHistory[commandHistory.length - 1 - newIndex];
            clearCurrentLine(term, currentInput);
            currentInput = cmd;
            setCurrentLine(cmd);
            term.write(cmd);
          }
        } else if (sequence === '[B') {
          // Down arrow - next command
          if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            const cmd = commandHistory[commandHistory.length - 1 - newIndex];
            clearCurrentLine(term, currentInput);
            currentInput = cmd;
            setCurrentLine(cmd);
            term.write(cmd);
          } else if (historyIndex === 0) {
            setHistoryIndex(-1);
            clearCurrentLine(term, currentInput);
            currentInput = '';
            setCurrentLine('');
          }
        }
      } else if (code >= 32) {
        // Printable characters
        currentInput += data;
        setCurrentLine(currentInput);
        term.write(data);
      }
    });

    // Handle resize
    const handleResize = () => {
      fitAddon.fit();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      term.dispose();
    };
  }, []);

  const writePrompt = (term: XTerm) => {
    term.write('\x1b[1;32m>\x1b[0m ');
  };

  const clearCurrentLine = (term: XTerm, current: string) => {
    for (let i = 0; i < current.length; i++) {
      term.write('\b \b');
    }
  };

  const executeTerminalCommand = async (term: XTerm, command: string) => {
    const result = await executeCommand(command);

    if (result.type === 'error') {
      term.writeln(`\x1b[31m${result.text}\x1b[0m`);
    } else if (result.type === 'success') {
      term.writeln(`\x1b[32m${result.text}\x1b[0m`);
    } else if (result.type === 'warning') {
      term.writeln(`\x1b[33m${result.text}\x1b[0m`);
    } else {
      term.writeln(result.text);
    }

    writePrompt(term);
  };

  return (
    <div className="terminal-container">
      <div ref={terminalRef} className="w-full h-full" />
    </div>
  );
}
