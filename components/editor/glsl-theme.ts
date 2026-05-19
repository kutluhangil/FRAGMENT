import type { Monaco } from "@monaco-editor/react";

export function registerGLSLTheme(monaco: Monaco) {
  monaco.editor.defineTheme("fragment-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "keyword.glsl", foreground: "c084fc", fontStyle: "bold" },
      { token: "type.glsl", foreground: "c084fc" },
      { token: "builtin.glsl", foreground: "f0abfc" },
      { token: "number.glsl", foreground: "fbbf24" },
      { token: "float.glsl", foreground: "fbbf24" },
      { token: "comment.glsl", foreground: "6b6b80", fontStyle: "italic" },
      { token: "comment.block.glsl", foreground: "6b6b80", fontStyle: "italic" },
      { token: "uniform.glsl", foreground: "fb923c" },
      { token: "attribute.glsl", foreground: "34d399" },
      { token: "varying.glsl", foreground: "34d399" },
      { token: "constant.glsl", foreground: "60a5fa" },
      { token: "string.glsl", foreground: "4ade80" },
    ],
    colors: {
      "editor.background": "#0a0a0f",
      "editor.foreground": "#ededf2",
      "editor.lineHighlightBackground": "#16161f",
      "editor.selectionBackground": "#a78bfa20",
      "editor.selectionHighlightBackground": "#a78bfa10",
      "editorLineNumber.foreground": "#404050",
      "editorLineNumber.activeForeground": "#a0a0b0",
      "editorIndentGuide.background": "#1f1f2e",
      "editorIndentGuide.activeBackground": "#2a2a3d",
      "editorGutter.background": "#0a0a0f",
      "editorWidget.background": "#11111a",
      "editorWidget.border": "#2a2a3d",
      "editorSuggestWidget.background": "#11111a",
      "editorSuggestWidget.border": "#2a2a3d",
      "editorSuggestWidget.selectedBackground": "#1c1c28",
      "editorHoverWidget.background": "#11111a",
      "editorHoverWidget.border": "#2a2a3d",
      "scrollbarSlider.background": "#2a2a3d80",
      "scrollbarSlider.hoverBackground": "#3a3a5080",
      "scrollbarSlider.activeBackground": "#a78bfa40",
    },
  });
}
