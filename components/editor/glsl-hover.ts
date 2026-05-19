import type { Monaco } from "@monaco-editor/react";
import type * as MonacoEditor from "monaco-editor";

interface HoverDoc {
  signature: string;
  description: string;
  example?: string;
}

const HOVER_DOCS: Record<string, HoverDoc> = {
  sin: { signature: "sin(angle: float) → float", description: "Returns the sine of an angle in radians.", example: "sin(u_time) * 0.5 + 0.5" },
  cos: { signature: "cos(angle: float) → float", description: "Returns the cosine of an angle in radians.", example: "cos(u_time) * 0.5 + 0.5" },
  tan: { signature: "tan(angle: float) → float", description: "Returns the tangent of an angle in radians." },
  smoothstep: { signature: "smoothstep(edge0: float, edge1: float, x: float) → float", description: "Performs smooth Hermite interpolation between 0 and 1 when edge0 < x < edge1.", example: "smoothstep(0.0, 1.0, fract(u_time))" },
  step: { signature: "step(edge: float, x: float) → float", description: "Returns 0.0 if x < edge, otherwise 1.0.", example: "step(0.5, uv.x)" },
  mix: { signature: "mix(x: genType, y: genType, a: genType) → genType", description: "Returns a linear blend of x and y: x*(1-a) + y*a.", example: "mix(vec3(1.0,0.0,0.0), vec3(0.0,0.0,1.0), uv.x)" },
  fract: { signature: "fract(x: genType) → genType", description: "Returns the fractional part of x: x - floor(x).", example: "fract(uv * 10.0)" },
  floor: { signature: "floor(x: genType) → genType", description: "Returns the largest integer value less than or equal to x." },
  ceil: { signature: "ceil(x: genType) → genType", description: "Returns the smallest integer value greater than or equal to x." },
  abs: { signature: "abs(x: genType) → genType", description: "Returns the absolute value of x." },
  clamp: { signature: "clamp(x: genType, minVal: genType, maxVal: genType) → genType", description: "Constrains x to lie between minVal and maxVal.", example: "clamp(uv.x, 0.0, 1.0)" },
  mod: { signature: "mod(x: genType, y: genType) → genType", description: "Returns x modulo y: x - y*floor(x/y).", example: "mod(u_time, 1.0)" },
  length: { signature: "length(x: vecN) → float", description: "Returns the length (Euclidean norm) of a vector.", example: "length(uv - 0.5)" },
  distance: { signature: "distance(p0: vecN, p1: vecN) → float", description: "Returns the distance between two points." },
  dot: { signature: "dot(x: vecN, y: vecN) → float", description: "Returns the dot product of two vectors." },
  cross: { signature: "cross(x: vec3, y: vec3) → vec3", description: "Returns the cross product of two vectors." },
  normalize: { signature: "normalize(x: vecN) → vecN", description: "Returns a vector with the same direction as x but with length 1." },
  reflect: { signature: "reflect(I: vecN, N: vecN) → vecN", description: "Returns the reflection direction for an incident vector I and surface normal N." },
  pow: { signature: "pow(x: genType, y: genType) → genType", description: "Returns x raised to the power of y.", example: "pow(uv.x, 2.0)" },
  sqrt: { signature: "sqrt(x: genType) → genType", description: "Returns the square root of x." },
  texture: { signature: "texture(sampler: sampler2D, P: vec2) → vec4", description: "Samples a texture at the given UV coordinates.", example: "texture(u_texture_0, uv)" },
  texture2D: { signature: "texture2D(sampler: sampler2D, coord: vec2) → vec4", description: "Samples a 2D texture at the given UV coordinates." },
  u_time: { signature: "uniform float u_time", description: "Elapsed time in seconds since the shader started." },
  u_resolution: { signature: "uniform vec2 u_resolution", description: "Canvas dimensions in pixels (width, height).", example: "vec2 uv = gl_FragCoord.xy / u_resolution.xy;" },
  u_mouse: { signature: "uniform vec2 u_mouse", description: "Mouse position normalized to [0,1] range.", example: "float d = length(uv - u_mouse);" },
  u_audio_low: { signature: "uniform float u_audio_low", description: "Bass audio frequency band level, 0-1." },
  u_audio_mid: { signature: "uniform float u_audio_mid", description: "Mid audio frequency band level, 0-1." },
  u_audio_high: { signature: "uniform float u_audio_high", description: "Treble audio frequency band level, 0-1." },
  gl_FragColor: { signature: "vec4 gl_FragColor", description: "Output color of the fragment. Must be assigned in main().", example: "gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);" },
  gl_FragCoord: { signature: "vec4 gl_FragCoord", description: "Window-relative coordinates of the fragment.", example: "vec2 uv = gl_FragCoord.xy / u_resolution.xy;" },
};

export function registerGLSLHover(monaco: Monaco) {
  monaco.languages.registerHoverProvider("glsl", {
    provideHover: (
      model: MonacoEditor.editor.ITextModel,
      position: MonacoEditor.Position
    ) => {
      const word = model.getWordAtPosition(position);
      if (!word) return null;

      const docs = HOVER_DOCS[word.word];
      if (!docs) return null;

      let content = `\`\`\`glsl\n${docs.signature}\n\`\`\`\n\n${docs.description}`;
      if (docs.example) {
        content += `\n\n**Example:**\n\`\`\`glsl\n${docs.example}\n\`\`\``;
      }

      return {
        range: new monaco.Range(
          position.lineNumber,
          word.startColumn,
          position.lineNumber,
          word.endColumn
        ),
        contents: [{ value: content }],
      };
    },
  });
}
