"use client";
import { X, BookOpen, FolderOpen, Globe, FileText } from "lucide-react";
import { useUIStore, type SidebarTab } from "@/store/useUIStore";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { LibraryPanel } from "./LibraryPanel";
import { MyShadersPanel } from "./MyShadersPanel";
import { GalleryPanel } from "./GalleryPanel";
import { DocsPanel } from "./DocsPanel";

const TABS: Array<{ id: SidebarTab; label: string; icon: React.ReactNode }> = [
  { id: "library", label: "Library", icon: <BookOpen size={12} /> },
  { id: "my-shaders", label: "Mine", icon: <FolderOpen size={12} /> },
  { id: "gallery", label: "Gallery", icon: <Globe size={12} /> },
  { id: "docs", label: "Docs", icon: <FileText size={12} /> },
];

export function Sidebar() {
  const { activeSidebarTab, setActiveSidebarTab, setSidebarOpen } =
    useUIStore();

  return (
    <aside className="w-72 flex flex-col border-r border-[var(--border-subtle)] bg-[var(--bg-elevated)] shrink-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between h-12 px-3 border-b border-[var(--border-subtle)] shrink-0">
        <Tabs
          tabs={TABS}
          activeTab={activeSidebarTab}
          onChange={(id) => setActiveSidebarTab(id as SidebarTab)}
          size="sm"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          <X size={14} />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeSidebarTab === "library" && <LibraryPanel />}
        {activeSidebarTab === "my-shaders" && <MyShadersPanel />}
        {activeSidebarTab === "gallery" && <GalleryPanel />}
        {activeSidebarTab === "docs" && <DocsPanel />}
      </div>
    </aside>
  );
}
