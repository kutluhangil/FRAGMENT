"use client";
import {
  Sparkles,
  Share2,
  Download,
  Settings,
  BookOpen,
  Keyboard,
} from "lucide-react";
import { Logo } from "./Logo";
import { ShaderName } from "./ShaderName";
import { Button } from "@/components/ui/Button";
import { Tooltip } from "@/components/ui/Tooltip";
import { KBD } from "@/components/ui/KBD";
import { useUIStore } from "@/store/useUIStore";
import { useEditorStore } from "@/store/useEditorStore";

export function TopBar() {
  const {
    setAIModalOpen,
    setExportModalOpen,
    setShareModalOpen,
    setSidebarOpen,
    sidebarOpen,
    setCommandPaletteOpen,
  } = useUIStore();
  const { compileStatus } = useEditorStore();

  return (
    <header className="h-12 flex items-center justify-between px-4 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] shrink-0 z-10">
      <div className="flex items-center gap-3">
        <Logo />
        <div className="w-px h-4 bg-[var(--border-subtle)]" aria-hidden />
        <ShaderName />
        {compileStatus === "success" && (
          <span className="text-[11px] text-[var(--success)] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] inline-block" />
            compiled
          </span>
        )}
        {compileStatus === "error" && (
          <span className="text-[11px] text-[var(--error)] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--error)] inline-block" />
            error
          </span>
        )}
      </div>

      <div className="flex items-center gap-1">
        <Tooltip
          content={
            <span className="flex items-center gap-1.5">
              Command Palette <KBD keys={["⌘", "K"]} />
            </span>
          }
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCommandPaletteOpen(true)}
            aria-label="Command palette"
          >
            <Keyboard size={14} />
          </Button>
        </Tooltip>

        <Tooltip
          content={
            <span className="flex items-center gap-1.5">
              Library <KBD keys={["⌘", "B"]} />
            </span>
          }
        >
          <Button
            variant={sidebarOpen ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle library sidebar"
          >
            <BookOpen size={14} />
            <span className="hidden sm:inline">Library</span>
          </Button>
        </Tooltip>

        <Tooltip
          content={
            <span className="flex items-center gap-1.5">
              AI Co-pilot <KBD keys={["⌘", "⇧", "A"]} />
            </span>
          }
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setAIModalOpen(true)}
            aria-label="AI co-pilot"
            className="text-[var(--accent)] hover:bg-[var(--accent-dim)] hover:text-[var(--accent-hover)]"
          >
            <Sparkles size={14} />
            <span className="hidden sm:inline">AI</span>
          </Button>
        </Tooltip>

        <div
          className="w-px h-4 bg-[var(--border-subtle)] mx-1"
          aria-hidden
        />

        <Tooltip content="Share shader">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShareModalOpen(true)}
            aria-label="Share shader"
          >
            <Share2 size={14} />
          </Button>
        </Tooltip>

        <Tooltip
          content={
            <span className="flex items-center gap-1.5">
              Export <KBD keys={["⌘", "E"]} />
            </span>
          }
        >
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setExportModalOpen(true)}
            aria-label="Export"
          >
            <Download size={14} />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </Tooltip>

        <Tooltip content="Settings">
          <Button variant="ghost" size="sm" aria-label="Settings">
            <Settings size={14} />
          </Button>
        </Tooltip>
      </div>
    </header>
  );
}
