"use client";
import { usePreviewStore, MeshType } from "@/store/usePreviewStore";
import { cn } from "@/lib/utils/cn";

const MESH_OPTIONS: { value: MeshType; label: string }[] = [
  { value: "plane", label: "Quad" },
  { value: "sphere", label: "Sphere" },
  { value: "torus", label: "Torus" },
  { value: "knot", label: "Knot" },
  { value: "cube", label: "Cube" },
];

export function ViewportMode() {
  const { mode, setMode, mesh, setMesh } = usePreviewStore();

  return (
    <div className="absolute top-2 left-2 flex items-center gap-1">
      <div className="flex bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-md overflow-hidden">
        <button
          onClick={() => setMode("2d")}
          className={cn(
            "px-2.5 py-1 text-[11px] font-semibold transition-colors",
            mode === "2d"
              ? "bg-[var(--accent)] text-[var(--bg-base)]"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          )}
        >
          2D
        </button>
        <button
          onClick={() => setMode("3d")}
          className={cn(
            "px-2.5 py-1 text-[11px] font-semibold transition-colors",
            mode === "3d"
              ? "bg-[var(--accent)] text-[var(--bg-base)]"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          )}
        >
          3D
        </button>
      </div>
      {mode === "3d" && (
        <select
          value={mesh}
          onChange={(e) => setMesh(e.target.value as MeshType)}
          className="text-[11px] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] rounded px-2 py-1 outline-none cursor-pointer"
        >
          {MESH_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
