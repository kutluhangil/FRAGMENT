import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type AudioSource = "off" | "mic" | "file";

export interface TextureSlot {
  id: number;
  url: string | null;
  name: string | null;
  wrap: "clamp" | "repeat";
  filter: "linear" | "nearest";
}

interface InputsState {
  audioSource: AudioSource;
  audioLow: number;
  audioMid: number;
  audioHigh: number;
  audioFile: File | null;
  isAudioPlaying: boolean;
  webcamEnabled: boolean;
  webcamMirrored: boolean;
  textures: TextureSlot[];
  setAudioSource: (source: AudioSource) => void;
  setAudioLevels: (low: number, mid: number, high: number) => void;
  setAudioFile: (file: File | null) => void;
  setAudioPlaying: (playing: boolean) => void;
  setWebcamEnabled: (enabled: boolean) => void;
  setWebcamMirrored: (mirrored: boolean) => void;
  setTexture: (id: number, url: string | null, name: string | null) => void;
  updateTexture: (id: number, updates: Partial<TextureSlot>) => void;
}

export const useInputsStore = create<InputsState>()(
  devtools(
    (set) => ({
      audioSource: "off",
      audioLow: 0,
      audioMid: 0,
      audioHigh: 0,
      audioFile: null,
      isAudioPlaying: false,
      webcamEnabled: false,
      webcamMirrored: false,
      textures: [
        { id: 0, url: null, name: null, wrap: "clamp", filter: "linear" },
        { id: 1, url: null, name: null, wrap: "clamp", filter: "linear" },
        { id: 2, url: null, name: null, wrap: "clamp", filter: "linear" },
        { id: 3, url: null, name: null, wrap: "clamp", filter: "linear" },
      ],
      setAudioSource: (source) => set({ audioSource: source }),
      setAudioLevels: (low, mid, high) =>
        set({ audioLow: low, audioMid: mid, audioHigh: high }),
      setAudioFile: (file) => set({ audioFile: file }),
      setAudioPlaying: (playing) => set({ isAudioPlaying: playing }),
      setWebcamEnabled: (enabled) => set({ webcamEnabled: enabled }),
      setWebcamMirrored: (mirrored) => set({ webcamMirrored: mirrored }),
      setTexture: (id, url, name) =>
        set((s) => ({
          textures: s.textures.map((t) =>
            t.id === id ? { ...t, url, name } : t
          ),
        })),
      updateTexture: (id, updates) =>
        set((s) => ({
          textures: s.textures.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),
    }),
    { name: "inputs-store" }
  )
);
