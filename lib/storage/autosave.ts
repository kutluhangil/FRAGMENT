import { saveShader } from "./shaders";

interface AutosaveState {
  shaderId: string | null;
  shaderName: string;
  fragmentCode: string;
  vertexCode: string;
  isModified: boolean;
}

interface AutosaveOptions {
  getState: () => AutosaveState;
  onSave: (id: string) => void;
  intervalMs?: number;
}

export function startAutosave({
  getState,
  onSave,
  intervalMs = 30_000,
}: AutosaveOptions): () => void {
  const interval = setInterval(async () => {
    const state = getState();
    if (!state.isModified) return;

    try {
      const id = await saveShader(
        state.shaderName,
        state.fragmentCode,
        state.vertexCode,
        undefined,
        state.shaderId ?? undefined
      );
      onSave(id);
    } catch (err) {
      console.error("Autosave failed:", err);
    }
  }, intervalMs);

  return () => clearInterval(interval);
}
