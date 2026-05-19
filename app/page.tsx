"use client";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { TopBar } from "@/components/topbar/TopBar";
import { useUIStore } from "@/store/useUIStore";

const MonacoEditor = dynamic(
  () =>
    import("@/components/editor/MonacoEditor").then((m) => ({
      default: m.MonacoEditor,
    })),
  { ssr: false, loading: () => <EditorSkeleton /> }
);

const PreviewCanvas = dynamic(
  () =>
    import("@/components/preview/PreviewCanvas").then((m) => ({
      default: m.PreviewCanvas,
    })),
  { ssr: false, loading: () => <CanvasSkeleton /> }
);

const BottomPanel = dynamic(
  () =>
    import("@/components/panels/BottomPanel").then((m) => ({
      default: m.BottomPanel,
    })),
  { ssr: false }
);

const Sidebar = dynamic(
  () =>
    import("@/components/sidebar/Sidebar").then((m) => ({
      default: m.Sidebar,
    })),
  { ssr: false }
);

const CommandPalette = dynamic(
  () =>
    import("@/components/command-palette/CommandPalette").then((m) => ({
      default: m.CommandPalette,
    })),
  { ssr: false }
);

const AIModal = dynamic(
  () =>
    import("@/components/ai/AIModal").then((m) => ({ default: m.AIModal })),
  { ssr: false }
);

const ExportModal = dynamic(
  () =>
    import("@/components/export/ExportModal").then((m) => ({
      default: m.ExportModal,
    })),
  { ssr: false }
);

function EditorSkeleton() {
  return (
    <div className="flex-1 h-full bg-[var(--bg-base)] animate-pulse" />
  );
}

function CanvasSkeleton() {
  return (
    <div className="flex-1 h-full bg-[var(--bg-base)]" />
  );
}

export default function Home() {
  const {
    sidebarOpen,
    bottomPanelOpen,
    bottomPanelHeight,
    setCommandPaletteOpen,
    toggleSidebar,
    toggleBottomPanel,
    setAIModalOpen,
    setExportModalOpen,
  } = useUIStore();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
      if (meta && e.key === "b") {
        e.preventDefault();
        toggleSidebar();
      }
      if (meta && e.key === "j") {
        e.preventDefault();
        toggleBottomPanel();
      }
      if (meta && e.shiftKey && e.key === "A") {
        e.preventDefault();
        setAIModalOpen(true);
      }
      if (meta && e.key === "e") {
        e.preventDefault();
        setExportModalOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    setCommandPaletteOpen,
    toggleSidebar,
    toggleBottomPanel,
    setAIModalOpen,
    setExportModalOpen,
  ]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[var(--bg-base)]">
      <TopBar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && <Sidebar />}

        {/* Main workspace */}
        <div className="flex flex-col flex-1 overflow-hidden min-w-0">
          {/* Editor + Preview split */}
          <div className="flex flex-1 overflow-hidden min-h-0">
            {/* Editor pane — resizable via flex basis, min/max constrained */}
            <div
              className="flex flex-col min-w-0 border-r border-[var(--border-subtle)]"
              style={{ flex: "1 1 50%", maxWidth: "70%", minWidth: "30%" }}
            >
              <MonacoEditor />
            </div>

            {/* Preview pane */}
            <div
              className="flex flex-col min-w-0"
              style={{ flex: "1 1 50%", maxWidth: "70%", minWidth: "30%" }}
            >
              <PreviewCanvas />
            </div>
          </div>

          {/* Bottom panel */}
          {bottomPanelOpen && (
            <div
              className="border-t border-[var(--border-subtle)] shrink-0 overflow-hidden"
              style={{ height: bottomPanelHeight }}
            >
              <BottomPanel />
            </div>
          )}
        </div>
      </div>

      {/* Modals & overlays */}
      <CommandPalette />
      <AIModal />
      <ExportModal />
    </div>
  );
}
