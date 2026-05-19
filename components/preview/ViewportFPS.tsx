"use client";
import { usePreviewStore } from "@/store/usePreviewStore";
import { cn } from "@/lib/utils/cn";

export function ViewportFPS() {
  const { fps, showFPS } = usePreviewStore();
  if (!showFPS) return null;

  const color =
    fps >= 50
      ? "text-[var(--success)]"
      : fps >= 30
      ? "text-[var(--warning)]"
      : "text-[var(--error)]";

  return (
    <div className="absolute top-2 right-2 pointer-events-none select-none">
      <span
        className={cn(
          "font-mono text-[11px] tabular-nums opacity-70",
          color
        )}
      >
        {fps} fps
      </span>
    </div>
  );
}
