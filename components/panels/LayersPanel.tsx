"use client";
import { Plus, Eye, EyeOff, Trash2, Copy } from "lucide-react";
import { useLayersStore, type BlendMode } from "@/store/useLayersStore";
import { Button } from "@/components/ui/Button";
import { Tooltip } from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils/cn";

const BLEND_MODES: BlendMode[] = [
  "normal",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "exclusion",
];

export function LayersPanel() {
  const {
    layers,
    activeLayerId,
    addLayer,
    removeLayer,
    updateLayer,
    setActiveLayer,
    duplicateLayer,
  } = useLayersStore();

  if (layers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-center p-6">
        <div className="w-10 h-10 rounded-lg bg-[var(--bg-active)] flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="text-[var(--text-muted)]"
          >
            <rect
              x="2"
              y="6"
              width="16"
              height="2"
              rx="1"
              fill="currentColor"
              opacity="0.4"
            />
            <rect
              x="2"
              y="10"
              width="16"
              height="2"
              rx="1"
              fill="currentColor"
              opacity="0.6"
            />
            <rect x="2" y="14" width="16" height="2" rx="1" fill="currentColor" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-medium text-[var(--text-secondary)]">
            No layers yet
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Add layers to composite shaders
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => addLayer()}>
          <Plus size={12} /> Add Layer
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-2 gap-1 flex flex-col">
        {[...layers].reverse().map((layer) => (
          <div
            key={layer.id}
            onClick={() => setActiveLayer(layer.id)}
            className={cn(
              "flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors",
              activeLayerId === layer.id
                ? "bg-[var(--bg-active)] border border-[var(--border-focus)]"
                : "hover:bg-[var(--bg-hover)] border border-transparent"
            )}
          >
            {/* Mini thumbnail */}
            <div className="w-9 h-9 rounded-md bg-[var(--bg-base)] border border-[var(--border-subtle)] shrink-0 overflow-hidden flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-br from-[var(--accent-dim)] to-transparent" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-xs font-medium text-[var(--text-primary)] truncate">
                  {layer.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={layer.blendMode}
                  onChange={(e) =>
                    updateLayer(layer.id, {
                      blendMode: e.target.value as BlendMode,
                    })
                  }
                  onClick={(e) => e.stopPropagation()}
                  className="text-[10px] bg-[var(--bg-active)] border border-[var(--border-subtle)] text-[var(--text-muted)] rounded px-1.5 py-0.5 outline-none"
                >
                  {BLEND_MODES.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <div className="flex-1 min-w-0">
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={layer.opacity}
                    onChange={(e) =>
                      updateLayer(layer.id, {
                        opacity: parseFloat(e.target.value),
                      })
                    }
                    onClick={(e) => e.stopPropagation()}
                    className="w-full h-1 accent-[var(--accent)] cursor-pointer"
                    title={`Opacity: ${Math.round(layer.opacity * 100)}%`}
                  />
                </div>
                <span className="text-[10px] font-mono text-[var(--text-muted)] w-6 text-right">
                  {Math.round(layer.opacity * 100)}%
                </span>
              </div>
            </div>

            <div
              className="flex items-center gap-0.5 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <Tooltip content={layer.visible ? "Hide" : "Show"}>
                <button
                  onClick={() =>
                    updateLayer(layer.id, { visible: !layer.visible })
                  }
                  className="p-1 rounded hover:bg-[var(--bg-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  {layer.visible ? <Eye size={11} /> : <EyeOff size={11} />}
                </button>
              </Tooltip>
              <Tooltip content="Duplicate">
                <button
                  onClick={() => duplicateLayer(layer.id)}
                  className="p-1 rounded hover:bg-[var(--bg-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <Copy size={11} />
                </button>
              </Tooltip>
              <Tooltip content="Delete">
                <button
                  onClick={() => removeLayer(layer.id)}
                  className="p-1 rounded hover:bg-red-500/10 text-[var(--text-muted)] hover:text-[var(--error)] transition-colors"
                >
                  <Trash2 size={11} />
                </button>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
      <div className="p-2 border-t border-[var(--border-subtle)] shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => addLayer()}
          className="w-full"
        >
          <Plus size={12} /> Add Layer
        </Button>
      </div>
    </div>
  );
}
