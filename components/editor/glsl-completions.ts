import type { Monaco } from "@monaco-editor/react";
import type * as MonacoEditor from "monaco-editor";

interface GLSLCompletion {
  label: string;
  kind: "keyword" | "function" | "type" | "constant" | "snippet" | "variable";
  insertText: string;
  documentation?: string;
  detail?: string;
  isSnippet?: boolean;
}

const COMPLETIONS: GLSLCompletion[] = [
  // Types
  { label: "float", kind: "type", insertText: "float", detail: "32-bit floating point" },
  { label: "int", kind: "type", insertText: "int", detail: "32-bit integer" },
  { label: "uint", kind: "type", insertText: "uint", detail: "32-bit unsigned integer" },
  { label: "bool", kind: "type", insertText: "bool", detail: "Boolean" },
  { label: "vec2", kind: "type", insertText: "vec2", detail: "2-component float vector" },
  { label: "vec3", kind: "type", insertText: "vec3", detail: "3-component float vector" },
  { label: "vec4", kind: "type", insertText: "vec4", detail: "4-component float vector" },
  { label: "mat2", kind: "type", insertText: "mat2", detail: "2x2 float matrix" },
  { label: "mat3", kind: "type", insertText: "mat3", detail: "3x3 float matrix" },
  { label: "mat4", kind: "type", insertText: "mat4", detail: "4x4 float matrix" },
  { label: "sampler2D", kind: "type", insertText: "sampler2D", detail: "2D texture sampler" },
  { label: "samplerCube", kind: "type", insertText: "samplerCube", detail: "Cube texture sampler" },

  // Standard uniforms
  { label: "u_time", kind: "variable", insertText: "u_time", detail: "float — elapsed time in seconds", documentation: "Elapsed time in seconds since the shader started" },
  { label: "u_resolution", kind: "variable", insertText: "u_resolution", detail: "vec2 — canvas size in pixels", documentation: "Canvas dimensions in pixels (width, height)" },
  { label: "u_mouse", kind: "variable", insertText: "u_mouse", detail: "vec2 — mouse position 0-1", documentation: "Mouse position normalized to 0-1 range" },
  { label: "u_audio_low", kind: "variable", insertText: "u_audio_low", detail: "float — bass audio level 0-1" },
  { label: "u_audio_mid", kind: "variable", insertText: "u_audio_mid", detail: "float — mid audio level 0-1" },
  { label: "u_audio_high", kind: "variable", insertText: "u_audio_high", detail: "float — treble audio level 0-1" },

  // Math functions
  { label: "sin", kind: "function", insertText: "sin(${1:x})", detail: "sin(x: float) → float", documentation: "Sine function", isSnippet: true },
  { label: "cos", kind: "function", insertText: "cos(${1:x})", detail: "cos(x: float) → float", documentation: "Cosine function", isSnippet: true },
  { label: "tan", kind: "function", insertText: "tan(${1:x})", detail: "tan(x: float) → float", isSnippet: true },
  { label: "asin", kind: "function", insertText: "asin(${1:x})", detail: "asin(x: float) → float", isSnippet: true },
  { label: "acos", kind: "function", insertText: "acos(${1:x})", detail: "acos(x: float) → float", isSnippet: true },
  { label: "atan", kind: "function", insertText: "atan(${1:y}, ${2:x})", detail: "atan(y,x: float) → float", isSnippet: true },
  { label: "pow", kind: "function", insertText: "pow(${1:base}, ${2:exp})", detail: "pow(base,exp: float) → float", isSnippet: true },
  { label: "exp", kind: "function", insertText: "exp(${1:x})", detail: "exp(x: float) → float", isSnippet: true },
  { label: "log", kind: "function", insertText: "log(${1:x})", detail: "log(x: float) → float", isSnippet: true },
  { label: "sqrt", kind: "function", insertText: "sqrt(${1:x})", detail: "sqrt(x: float) → float", isSnippet: true },
  { label: "abs", kind: "function", insertText: "abs(${1:x})", detail: "abs(x: genType) → genType", documentation: "Returns absolute value", isSnippet: true },
  { label: "sign", kind: "function", insertText: "sign(${1:x})", detail: "sign(x: genType) → genType", isSnippet: true },
  { label: "floor", kind: "function", insertText: "floor(${1:x})", detail: "floor(x: genType) → genType", documentation: "Floor — rounds down", isSnippet: true },
  { label: "ceil", kind: "function", insertText: "ceil(${1:x})", detail: "ceil(x: genType) → genType", isSnippet: true },
  { label: "fract", kind: "function", insertText: "fract(${1:x})", detail: "fract(x: genType) → genType", documentation: "Returns fractional part of x", isSnippet: true },
  { label: "mod", kind: "function", insertText: "mod(${1:x}, ${2:y})", detail: "mod(x,y: genType) → genType", documentation: "Modulo operation", isSnippet: true },
  { label: "min", kind: "function", insertText: "min(${1:x}, ${2:y})", detail: "min(x,y: genType) → genType", isSnippet: true },
  { label: "max", kind: "function", insertText: "max(${1:x}, ${2:y})", detail: "max(x,y: genType) → genType", isSnippet: true },
  { label: "clamp", kind: "function", insertText: "clamp(${1:x}, ${2:0.0}, ${3:1.0})", detail: "clamp(x,min,max: genType) → genType", documentation: "Clamps value between min and max", isSnippet: true },
  { label: "mix", kind: "function", insertText: "mix(${1:x}, ${2:y}, ${3:t})", detail: "mix(x,y,t: genType) → genType", documentation: "Linear interpolation: x*(1-t) + y*t", isSnippet: true },
  { label: "step", kind: "function", insertText: "step(${1:edge}, ${2:x})", detail: "step(edge,x: genType) → genType", documentation: "Step function: 0 if x < edge, else 1", isSnippet: true },
  { label: "smoothstep", kind: "function", insertText: "smoothstep(${1:edge0}, ${2:edge1}, ${3:x})", detail: "smoothstep(edge0,edge1,x: genType) → genType", documentation: "Smooth Hermite interpolation between 0 and 1", isSnippet: true },
  { label: "length", kind: "function", insertText: "length(${1:v})", detail: "length(v: vecN) → float", documentation: "Returns length of vector", isSnippet: true },
  { label: "distance", kind: "function", insertText: "distance(${1:p1}, ${2:p2})", detail: "distance(p1,p2: vecN) → float", isSnippet: true },
  { label: "dot", kind: "function", insertText: "dot(${1:a}, ${2:b})", detail: "dot(a,b: vecN) → float", documentation: "Dot product", isSnippet: true },
  { label: "cross", kind: "function", insertText: "cross(${1:a}, ${2:b})", detail: "cross(a,b: vec3) → vec3", documentation: "Cross product", isSnippet: true },
  { label: "normalize", kind: "function", insertText: "normalize(${1:v})", detail: "normalize(v: vecN) → vecN", documentation: "Normalizes vector to unit length", isSnippet: true },
  { label: "reflect", kind: "function", insertText: "reflect(${1:I}, ${2:N})", detail: "reflect(I,N: vecN) → vecN", isSnippet: true },
  { label: "refract", kind: "function", insertText: "refract(${1:I}, ${2:N}, ${3:eta})", detail: "refract(I,N: vecN, eta: float) → vecN", isSnippet: true },
  { label: "texture", kind: "function", insertText: "texture(${1:sampler}, ${2:uv})", detail: "texture(sampler: sampler2D, uv: vec2) → vec4", documentation: "Sample a texture", isSnippet: true },
  { label: "texture2D", kind: "function", insertText: "texture2D(${1:sampler}, ${2:uv})", detail: "texture2D(sampler: sampler2D, uv: vec2) → vec4", isSnippet: true },
  { label: "dFdx", kind: "function", insertText: "dFdx(${1:p})", detail: "dFdx(p: genType) → genType", documentation: "Partial derivative with respect to x", isSnippet: true },
  { label: "dFdy", kind: "function", insertText: "dFdy(${1:p})", detail: "dFdy(p: genType) → genType", isSnippet: true },

  // Snippets
  { label: "void main", kind: "snippet", insertText: "void main() {\n\t$0\n}", detail: "Main function", isSnippet: true },
  { label: "for", kind: "snippet", insertText: "for (int ${1:i} = 0; ${1:i} < ${2:10}; ${1:i}++) {\n\t$0\n}", detail: "For loop", isSnippet: true },
  { label: "uv", kind: "snippet", insertText: "vec2 uv = gl_FragCoord.xy / u_resolution.xy;", detail: "Normalized UV coordinates" },
  { label: "suv", kind: "snippet", insertText: "vec2 uv = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;", detail: "Centered UV coordinates" },
  { label: "precision mediump", kind: "snippet", insertText: "precision mediump float;", detail: "Medium precision qualifier" },
  { label: "fragcoord", kind: "snippet", insertText: "gl_FragCoord.xy / u_resolution.xy", detail: "Fragment coordinate UV" },
];

export function registerGLSLCompletions(monaco: Monaco) {
  monaco.languages.registerCompletionItemProvider("glsl", {
    triggerCharacters: [".", "("],
    provideCompletionItems: (
      model: MonacoEditor.editor.ITextModel,
      position: MonacoEditor.Position
    ) => {
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: model.getWordUntilPosition(position).startColumn,
        endColumn: position.column,
      };

      const suggestions = COMPLETIONS.map((c) => ({
        label: c.label,
        kind:
          c.kind === "function"
            ? monaco.languages.CompletionItemKind.Function
            : c.kind === "type"
            ? monaco.languages.CompletionItemKind.Class
            : c.kind === "variable"
            ? monaco.languages.CompletionItemKind.Variable
            : c.kind === "constant"
            ? monaco.languages.CompletionItemKind.Constant
            : c.kind === "snippet"
            ? monaco.languages.CompletionItemKind.Snippet
            : monaco.languages.CompletionItemKind.Keyword,
        insertText: c.insertText,
        insertTextRules: c.isSnippet
          ? monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
          : undefined,
        documentation: c.documentation ? { value: c.documentation } : undefined,
        detail: c.detail,
        range,
      }));

      return { suggestions };
    },
  });
}
