"use client";
import { useState } from "react";
import { Search, Zap, ChevronRight } from "lucide-react";
import { useEditorStore } from "@/store/useEditorStore";
import { cn } from "@/lib/utils/cn";
import { EXAMPLE_SHADERS } from "@/content/examples";

const CATEGORIES = ["All", "Beginner", "Intermediate", "Advanced"] as const;

export function LibraryPanel() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const { setFragmentCode, setShaderName } = useEditorStore();

  const filtered = EXAMPLE_SHADERS.filter((s) => {
    const matchSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some((t) => t.includes(search.toLowerCase()));
    const matchCategory =
      category === "All" || s.category === category.toLowerCase();
    return matchSearch && matchCategory;
  });

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 space-y-2 shrink-0">
        <div className="relative">
          <Search
            size={12}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search shaders..."
            className="w-full pl-7 pr-3 h-7 text-xs bg-[var(--bg-panel)] border border-[var(--border-subtle)] rounded-md text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--border-focus)]"
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "text-[10px] px-2 py-1 rounded-md transition-colors",
                category === cat
                  ? "bg-[var(--accent-dim)] text-[var(--accent)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-1">
        {filtered.length === 0 ? (
          <p className="text-xs text-[var(--text-muted)] text-center py-8">
            No shaders found
          </p>
        ) : (
          filtered.map((shader) => (
            <button
              key={shader.id}
              onClick={() => {
                setFragmentCode(shader.code);
                setShaderName(shader.name);
              }}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--bg-hover)] transition-colors text-left group"
            >
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-[var(--accent-dim)] to-[var(--bg-active)] border border-[var(--border-subtle)] shrink-0 flex items-center justify-center">
                <Zap size={12} className="text-[var(--accent)]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-[var(--text-primary)] truncate">
                  {shader.name}
                </div>
                <div className="text-[10px] text-[var(--text-muted)] truncate">
                  {shader.description}
                </div>
                <div className="flex gap-1 mt-1">
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded-sm",
                      shader.category === "beginner" &&
                        "bg-green-500/10 text-green-400",
                      shader.category === "intermediate" &&
                        "bg-blue-500/10 text-blue-400",
                      shader.category === "advanced" &&
                        "bg-purple-500/10 text-purple-400"
                    )}
                  >
                    {shader.category}
                  </span>
                </div>
              </div>
              <ChevronRight
                size={12}
                className="text-[var(--text-disabled)] group-hover:text-[var(--text-muted)] shrink-0 transition-colors"
              />
            </button>
          ))
        )}
      </div>
    </div>
  );
}
