"use client";
import { useRef, useEffect, useCallback } from "react";
import Editor, { type Monaco, type OnMount } from "@monaco-editor/react";
import { useEditorStore } from "@/store/useEditorStore";
import { useUIStore } from "@/store/useUIStore";
import { EditorTabs } from "./EditorTabs";
import { registerGLSLLanguage } from "./glsl-language";
import { registerGLSLTheme } from "./glsl-theme";
import { registerGLSLCompletions } from "./glsl-completions";
import { registerGLSLHover } from "./glsl-hover";
import type * as MonacoTypes from "monaco-editor";

export function MonacoEditor() {
  const {
    fragmentCode,
    vertexCode,
    activeTab,
    setFragmentCode,
    setVertexCode,
    compileErrors,
  } = useEditorStore();
  const { setAIModalOpen } = useUIStore();

  const editorRef = useRef<MonacoTypes.editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);

  const handleBeforeMount = useCallback((monaco: Monaco) => {
    registerGLSLLanguage(monaco);
    registerGLSLTheme(monaco);
    registerGLSLCompletions(monaco);
    registerGLSLHover(monaco);
  }, []);

  const handleMount: OnMount = useCallback(
    (editor, monaco) => {
      editorRef.current = editor;
      monacoRef.current = monaco;

      // Keybinding: Cmd/Ctrl+Shift+A → open AI modal
      editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyA,
        () => {
          setAIModalOpen(true);
        }
      );

      editor.focus();
    },
    [setAIModalOpen]
  );

  const handleChange = useCallback(
    (value: string | undefined) => {
      if (value === undefined) return;
      if (activeTab === "fragment") setFragmentCode(value);
      else setVertexCode(value);
    },
    [activeTab, setFragmentCode, setVertexCode]
  );

  // Sync error markers into Monaco
  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return;
    const model = editorRef.current.getModel();
    if (!model) return;

    const markers: MonacoTypes.editor.IMarkerData[] = compileErrors.map(
      (err) => ({
        severity:
          err.severity === "error"
            ? monacoRef.current!.MarkerSeverity.Error
            : monacoRef.current!.MarkerSeverity.Warning,
        message: err.message,
        startLineNumber: err.line,
        endLineNumber: err.line,
        startColumn: err.column ?? 1,
        endColumn: 200,
      })
    );

    monacoRef.current.editor.setModelMarkers(model, "glsl-compiler", markers);
  }, [compileErrors]);

  const currentCode = activeTab === "fragment" ? fragmentCode : vertexCode;

  return (
    <div className="flex flex-col h-full bg-[var(--bg-base)]">
      <EditorTabs />
      <div className="flex-1 overflow-hidden">
        <Editor
          key={activeTab}
          value={currentCode}
          language="glsl"
          theme="fragment-dark"
          onChange={handleChange}
          beforeMount={handleBeforeMount}
          onMount={handleMount}
          options={{
            fontSize: 13,
            fontFamily:
              "var(--font-jetbrains), 'JetBrains Mono', 'Fira Code', monospace",
            fontLigatures: true,
            lineNumbers: "on",
            minimap: { enabled: false },
            wordWrap: "on",
            tabSize: 2,
            insertSpaces: true,
            bracketPairColorization: { enabled: true },
            renderLineHighlight: "line",
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            padding: { top: 12, bottom: 12 },
            scrollbar: { verticalScrollbarSize: 6, horizontalScrollbarSize: 6 },
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            guides: { indentation: true },
            folding: true,
            foldingStrategy: "indentation",
            suggest: { showKeywords: true, showSnippets: true },
            quickSuggestions: { other: true, comments: false, strings: false },
            parameterHints: { enabled: true },
            formatOnType: false,
            formatOnPaste: false,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}
