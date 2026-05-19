"use client";
import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useEditorStore } from "@/store/useEditorStore";

interface SavedShader {
  id: string;
  name: string;
  fragmentCode: string;
  updatedAt: string;
}

export function MyShadersPanel() {
  const [shaders, setShaders] = useState<SavedShader[]>([]);
  const { setFragmentCode, setShaderName, fragmentCode, shaderName } =
    useEditorStore();

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("fragment_shaders") || "[]"
      ) as SavedShader[];
      setShaders(saved);
    } catch {
      // ignore parse errors
    }
  }, []);

  const save = () => {
    const id = Date.now().toString();
    const shader: SavedShader = {
      id,
      name: shaderName,
      fragmentCode,
      updatedAt: new Date().toISOString(),
    };
    const updated = [
      shader,
      ...shaders.filter((s) => s.name !== shaderName).slice(0, 49),
    ];
    setShaders(updated);
    localStorage.setItem("fragment_shaders", JSON.stringify(updated));
  };

  const remove = (id: string) => {
    const updated = shaders.filter((s) => s.id !== id);
    setShaders(updated);
    localStorage.setItem("fragment_shaders", JSON.stringify(updated));
  };

  if (shaders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center gap-3">
        <p className="text-xs text-[var(--text-muted)]">No saved shaders yet.</p>
        <Button variant="secondary" size="sm" onClick={save}>
          <Plus size={12} /> Save Current
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 border-b border-[var(--border-subtle)]">
        <Button
          variant="secondary"
          size="sm"
          onClick={save}
          className="w-full"
        >
          <Plus size={12} /> Save Current Shader
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {shaders.map((shader) => (
          <button
            key={shader.id}
            onClick={() => {
              setFragmentCode(shader.fragmentCode);
              setShaderName(shader.name);
            }}
            className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--bg-hover)] transition-colors text-left group"
          >
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[var(--accent-dim)] to-[var(--bg-active)] border border-[var(--border-subtle)] shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-[var(--text-primary)] truncate">
                {shader.name}
              </div>
              <div className="text-[10px] text-[var(--text-muted)]">
                {new Date(shader.updatedAt).toLocaleDateString()}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                remove(shader.id);
              }}
              className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/10 text-[var(--text-muted)] hover:text-[var(--error)] transition-all"
            >
              <Trash2 size={11} />
            </button>
          </button>
        ))}
      </div>
    </div>
  );
}
