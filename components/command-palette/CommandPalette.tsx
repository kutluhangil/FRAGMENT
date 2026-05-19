"use client";
import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import {
  Search,
  Sparkles,
  Download,
  Share2,
  BookOpen,
  Play,
  Pause,
  RotateCcw,
  FileCode,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Fuse from "fuse.js";
import { useUIStore } from "@/store/useUIStore";
import { useEditorStore } from "@/store/useEditorStore";
import { usePreviewStore } from "@/store/usePreviewStore";
import { EXAMPLE_SHADERS } from "@/content/examples";
import { cn } from "@/lib/utils/cn";

interface Command {
  id: string;
  label: string;
  description?: string;
  icon: ReactNode;
  action: () => void;
  group: string;
  keywords?: string[];
}

export function CommandPalette() {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    setAIModalOpen,
    setExportModalOpen,
    setShareModalOpen,
    setSidebarOpen,
    setActiveSidebarTab,
    toggleBottomPanel,
    toggleSidebar,
  } = useUIStore();
  const { setFragmentCode, setShaderName } = useEditorStore();
  const { togglePlay, isPlaying, setTime } = usePreviewStore();

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const buildCommands = useCallback((): Command[] => [
    {
      id: "ai",
      label: "AI Co-pilot",
      description: "Modify shader with AI",
      icon: <Sparkles size={14} className="text-[var(--accent)]" />,
      action: () => {
        setAIModalOpen(true);
        setCommandPaletteOpen(false);
      },
      group: "Actions",
      keywords: ["generate", "ai", "copilot", "write"],
    },
    {
      id: "export",
      label: "Export",
      description: "Export as PNG, MP4, GIF",
      icon: <Download size={14} />,
      action: () => {
        setExportModalOpen(true);
        setCommandPaletteOpen(false);
      },
      group: "Actions",
      keywords: ["export", "save", "download", "png", "video", "gif"],
    },
    {
      id: "share",
      label: "Share Shader",
      description: "Copy share link",
      icon: <Share2 size={14} />,
      action: () => {
        setShareModalOpen(true);
        setCommandPaletteOpen(false);
      },
      group: "Actions",
      keywords: ["share", "link", "publish", "url"],
    },
    {
      id: "library",
      label: "Open Library",
      description: "Browse example shaders",
      icon: <BookOpen size={14} />,
      action: () => {
        setSidebarOpen(true);
        setActiveSidebarTab("library");
        setCommandPaletteOpen(false);
      },
      group: "Navigation",
      keywords: ["library", "sidebar", "examples", "browse"],
    },
    {
      id: "sidebar",
      label: "Toggle Sidebar",
      description: "Open or close the sidebar",
      icon: <FileCode size={14} />,
      action: () => {
        toggleSidebar();
        setCommandPaletteOpen(false);
      },
      group: "Navigation",
      keywords: ["sidebar", "toggle", "panel"],
    },
    {
      id: "bottom-panel",
      label: "Toggle Bottom Panel",
      description: "Show or hide console/uniforms",
      icon: <FileCode size={14} />,
      action: () => {
        toggleBottomPanel();
        setCommandPaletteOpen(false);
      },
      group: "Navigation",
      keywords: ["console", "bottom", "panel", "uniforms", "layers"],
    },
    {
      id: "playpause",
      label: isPlaying ? "Pause" : "Play",
      description: isPlaying ? "Pause shader animation" : "Resume shader animation",
      icon: isPlaying ? <Pause size={14} /> : <Play size={14} />,
      action: () => {
        togglePlay();
        setCommandPaletteOpen(false);
      },
      group: "Preview",
      keywords: ["play", "pause", "toggle", "run", "animation"],
    },
    {
      id: "reset",
      label: "Reset Time",
      description: "Set time back to 0",
      icon: <RotateCcw size={14} />,
      action: () => {
        setTime(0);
        setCommandPaletteOpen(false);
      },
      group: "Preview",
      keywords: ["reset", "time", "restart", "rewind"],
    },
    ...EXAMPLE_SHADERS.map((s) => ({
      id: `example-${s.id}`,
      label: s.name,
      description: s.description,
      icon: <Sparkles size={14} className="text-[var(--accent-hover)]" />,
      action: () => {
        setFragmentCode(s.code);
        setShaderName(s.name);
        setCommandPaletteOpen(false);
      },
      group: "Examples",
      keywords: s.tags,
    })),
  ], [
    isPlaying,
    setAIModalOpen,
    setExportModalOpen,
    setShareModalOpen,
    setSidebarOpen,
    setActiveSidebarTab,
    toggleSidebar,
    toggleBottomPanel,
    togglePlay,
    setTime,
    setFragmentCode,
    setShaderName,
    setCommandPaletteOpen,
  ]);

  const [commands, setCommands] = useState<Command[]>([]);

  useEffect(() => {
    setCommands(buildCommands());
  }, [buildCommands]);

  const fuse = new Fuse(commands, {
    keys: ["label", "description", "keywords"],
    threshold: 0.4,
    includeScore: true,
  });

  const results = query.trim()
    ? fuse.search(query).map((r) => r.item)
    : commands;

  const close = useCallback(() => {
    setCommandPaletteOpen(false);
    setQuery("");
    setSelected(0);
  }, [setCommandPaletteOpen]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [commandPaletteOpen]);

  useEffect(() => {
    if (!commandPaletteOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, results.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        results[selected]?.action();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [commandPaletteOpen, results, selected, close]);

  // Group results for display
  const grouped = results.reduce<Record<string, Command[]>>((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = [];
    acc[cmd.group].push(cmd);
    return acc;
  }, {});

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
            className="relative z-10 w-full max-w-lg bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded-xl shadow-lg overflow-hidden"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-subtle)]">
              <Search size={16} className="text-[var(--text-muted)] shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commands, examples..."
                className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
              />
              <kbd className="text-[10px] bg-[var(--bg-active)] text-[var(--text-muted)] px-1.5 py-0.5 rounded border border-[var(--border-subtle)]">
                Esc
              </kbd>
            </div>

            {/* Commands */}
            <div className="max-h-80 overflow-y-auto py-1">
              {results.length === 0 ? (
                <div className="px-4 py-6 text-center text-sm text-[var(--text-muted)]">
                  No results for &ldquo;{query}&rdquo;
                </div>
              ) : (
                Object.entries(grouped).map(([group, cmds]) => (
                  <div key={group}>
                    <div className="px-3 py-1.5 text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                      {group}
                    </div>
                    {cmds.map((cmd) => {
                      const globalIdx = results.indexOf(cmd);
                      return (
                        <button
                          key={cmd.id}
                          onClick={cmd.action}
                          onMouseEnter={() => setSelected(globalIdx)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2 text-left transition-colors",
                            selected === globalIdx
                              ? "bg-[var(--accent-dim)] text-[var(--text-primary)]"
                              : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
                          )}
                        >
                          <span
                            className={cn(
                              "shrink-0",
                              selected === globalIdx
                                ? "text-[var(--accent)]"
                                : "text-[var(--text-muted)]"
                            )}
                          >
                            {cmd.icon}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              {cmd.label}
                            </div>
                            {cmd.description && (
                              <div className="text-xs text-[var(--text-muted)] truncate">
                                {cmd.description}
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer hint */}
            <div className="flex items-center gap-3 px-4 py-2 border-t border-[var(--border-subtle)] text-[10px] text-[var(--text-muted)]">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>esc close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
