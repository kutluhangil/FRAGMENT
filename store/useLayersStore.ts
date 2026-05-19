import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { nanoid } from "nanoid";

export type BlendMode =
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "darken"
  | "lighten"
  | "color-dodge"
  | "color-burn"
  | "hard-light"
  | "soft-light"
  | "difference"
  | "exclusion";

export interface Layer {
  id: string;
  name: string;
  fragmentCode: string;
  opacity: number;
  blendMode: BlendMode;
  visible: boolean;
  locked: boolean;
}

interface LayersState {
  layers: Layer[];
  activeLayerId: string | null;
  addLayer: (code?: string) => void;
  removeLayer: (id: string) => void;
  updateLayer: (id: string, updates: Partial<Layer>) => void;
  reorderLayers: (fromIndex: number, toIndex: number) => void;
  setActiveLayer: (id: string | null) => void;
  duplicateLayer: (id: string) => void;
}

const DEFAULT_LAYER_CODE = `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  gl_FragColor = vec4(uv, 0.5 + 0.5 * sin(u_time), 1.0);
}`;

export const useLayersStore = create<LayersState>()(
  devtools(
    (set, get) => ({
      layers: [],
      activeLayerId: null,
      addLayer: (code) => {
        const id = nanoid();
        const layer: Layer = {
          id,
          name: `Layer ${get().layers.length + 1}`,
          fragmentCode: code ?? DEFAULT_LAYER_CODE,
          opacity: 1,
          blendMode: "normal",
          visible: true,
          locked: false,
        };
        set((s) => ({ layers: [...s.layers, layer], activeLayerId: id }));
      },
      removeLayer: (id) =>
        set((s) => ({
          layers: s.layers.filter((l) => l.id !== id),
          activeLayerId: s.activeLayerId === id ? null : s.activeLayerId,
        })),
      updateLayer: (id, updates) =>
        set((s) => ({
          layers: s.layers.map((l) => (l.id === id ? { ...l, ...updates } : l)),
        })),
      reorderLayers: (from, to) =>
        set((s) => {
          const arr = [...s.layers];
          const [item] = arr.splice(from, 1);
          arr.splice(to, 0, item);
          return { layers: arr };
        }),
      setActiveLayer: (id) => set({ activeLayerId: id }),
      duplicateLayer: (id) => {
        const layer = get().layers.find((l) => l.id === id);
        if (!layer) return;
        const newId = nanoid();
        const dup: Layer = { ...layer, id: newId, name: `${layer.name} Copy` };
        set((s) => {
          const idx = s.layers.findIndex((l) => l.id === id);
          const arr = [...s.layers];
          arr.splice(idx + 1, 0, dup);
          return { layers: arr, activeLayerId: newId };
        });
      },
    }),
    { name: "layers-store" }
  )
);
