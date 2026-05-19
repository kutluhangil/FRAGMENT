"use client";
import { useEditorStore, TabType } from "@/store/useEditorStore";
import { cn } from "@/lib/utils/cn";

const TABS: { id: TabType; label: string }[] = [
  { id: "fragment", label: "fragment.glsl" },
  { id: "vertex", label: "vertex.glsl" },
];

export function EditorTabs() {
  const { activeTab, setActiveTab, compileStatus } = useEditorStore();

  return (
    <div className="flex items-center border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] shrink-0">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            "flex items-center gap-1.5 px-4 h-9 text-xs font-mono transition-colors border-b-2 relative",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-inset",
            activeTab === tab.id
              ? "text-[var(--text-primary)] border-[var(--accent)]"
              : "text-[var(--text-muted)] border-transparent hover:text-[var(--text-secondary)] hover:border-[var(--border-strong)]"
          )}
        >
          {tab.label}
          {tab.id === "fragment" && compileStatus === "error" && (
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--error)] inline-block" />
          )}
          {tab.id === "fragment" && compileStatus === "success" && (
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] inline-block" />
          )}
        </button>
      ))}
      <div className="ml-auto flex items-center px-3 gap-2">
        <span className="text-[11px] font-mono text-[var(--text-disabled)]">
          GLSL ES 3.0
        </span>
      </div>
    </div>
  );
}
