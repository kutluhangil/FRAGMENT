import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type ViewMode = "2d" | "3d";
export type MeshType = "plane" | "sphere" | "torus" | "knot" | "cube";

interface PreviewState {
  isPlaying: boolean;
  time: number;
  mode: ViewMode;
  mesh: MeshType;
  fps: number;
  isFullscreen: boolean;
  showFPS: boolean;
  mouseX: number;
  mouseY: number;
  setIsPlaying: (playing: boolean) => void;
  setTime: (time: number) => void;
  setMode: (mode: ViewMode) => void;
  setMesh: (mesh: MeshType) => void;
  setFPS: (fps: number) => void;
  setIsFullscreen: (fullscreen: boolean) => void;
  togglePlay: () => void;
  setMouse: (x: number, y: number) => void;
}

export const usePreviewStore = create<PreviewState>()(
  devtools(
    (set, get) => ({
      isPlaying: true,
      time: 0,
      mode: "2d",
      mesh: "plane",
      fps: 0,
      isFullscreen: false,
      showFPS: true,
      mouseX: 0.5,
      mouseY: 0.5,
      setIsPlaying: (playing) => set({ isPlaying: playing }),
      setTime: (time) => set({ time }),
      setMode: (mode) => set({ mode }),
      setMesh: (mesh) => set({ mesh }),
      setFPS: (fps) => set({ fps }),
      setIsFullscreen: (fullscreen) => set({ isFullscreen: fullscreen }),
      togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
      setMouse: (x, y) => set({ mouseX: x, mouseY: y }),
    }),
    { name: "preview-store" }
  )
);
