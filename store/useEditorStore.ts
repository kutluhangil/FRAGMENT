import { create } from "zustand";
import { devtools } from "zustand/middleware";

const DEFAULT_FRAGMENT = `precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  // Smooth gradient with time animation
  vec3 col = 0.5 + 0.5 * cos(u_time + uv.xyx + vec3(0.0, 2.0, 4.0));

  // Subtle vignette
  float vignette = smoothstep(1.4, 0.6, length(uv - 0.5) * 2.0);
  col *= vignette;

  gl_FragColor = vec4(col, 1.0);
}`;

const DEFAULT_VERTEX = `attribute vec4 position;

void main() {
  gl_Position = position;
}`;

export type TabType = "fragment" | "vertex";

export interface CompileError {
  line: number;
  column?: number;
  message: string;
  severity: "error" | "warning";
}

interface EditorState {
  fragmentCode: string;
  vertexCode: string;
  activeTab: TabType;
  compileErrors: CompileError[];
  compileStatus: "idle" | "compiling" | "success" | "error";
  isModified: boolean;
  shaderName: string;
  shaderId: string | null;
  setFragmentCode: (code: string) => void;
  setVertexCode: (code: string) => void;
  setActiveTab: (tab: TabType) => void;
  setCompileErrors: (errors: CompileError[]) => void;
  setCompileStatus: (status: EditorState["compileStatus"]) => void;
  setShaderName: (name: string) => void;
  setShaderId: (id: string | null) => void;
  setIsModified: (modified: boolean) => void;
  getActiveCode: () => string;
  setActiveCode: (code: string) => void;
}

export const useEditorStore = create<EditorState>()(
  devtools(
    (set, get) => ({
      fragmentCode: DEFAULT_FRAGMENT,
      vertexCode: DEFAULT_VERTEX,
      activeTab: "fragment",
      compileErrors: [],
      compileStatus: "idle",
      isModified: false,
      shaderName: "Untitled Shader",
      shaderId: null,
      setFragmentCode: (code) => set({ fragmentCode: code, isModified: true }),
      setVertexCode: (code) => set({ vertexCode: code, isModified: true }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      setCompileErrors: (errors) => set({ compileErrors: errors }),
      setCompileStatus: (status) => set({ compileStatus: status }),
      setShaderName: (name) => set({ shaderName: name }),
      setShaderId: (id) => set({ shaderId: id }),
      setIsModified: (modified) => set({ isModified: modified }),
      getActiveCode: () => {
        const { activeTab, fragmentCode, vertexCode } = get();
        return activeTab === "fragment" ? fragmentCode : vertexCode;
      },
      setActiveCode: (code) => {
        const { activeTab } = get();
        if (activeTab === "fragment") {
          set({ fragmentCode: code, isModified: true });
        } else {
          set({ vertexCode: code, isModified: true });
        }
      },
    }),
    { name: "editor-store" }
  )
);
