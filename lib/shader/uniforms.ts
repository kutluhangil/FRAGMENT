export interface UniformDef {
  name: string;
  type: "float" | "vec2" | "vec3" | "vec4" | "sampler2D" | "int" | "bool";
  min?: number;
  max?: number;
  step?: number;
  default?: number | number[];
  description?: string;
}

export const STANDARD_UNIFORMS: UniformDef[] = [
  { name: "u_time", type: "float", description: "Elapsed time in seconds" },
  { name: "u_resolution", type: "vec2", description: "Canvas size in pixels" },
  { name: "u_mouse", type: "vec2", description: "Mouse position (0-1)" },
  { name: "u_mouse_delta", type: "vec2", description: "Smoothed mouse delta" },
  { name: "u_frame", type: "int", description: "Frame counter" },
  { name: "u_dpr", type: "float", description: "Device pixel ratio" },
  { name: "u_audio_low", type: "float", description: "Audio low band (0-1)" },
  { name: "u_audio_mid", type: "float", description: "Audio mid band (0-1)" },
  { name: "u_audio_high", type: "float", description: "Audio high band (0-1)" },
  { name: "u_audio_tex", type: "sampler2D", description: "FFT spectrum texture 256x1" },
  { name: "u_camera", type: "sampler2D", description: "Webcam feed texture" },
  { name: "u_texture_0", type: "sampler2D", description: "User texture slot 0" },
  { name: "u_texture_1", type: "sampler2D", description: "User texture slot 1" },
  { name: "u_texture_2", type: "sampler2D", description: "User texture slot 2" },
  { name: "u_texture_3", type: "sampler2D", description: "User texture slot 3" },
];

export const STANDARD_UNIFORMS_GLSL = `
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec2 u_mouse_delta;
uniform int u_frame;
uniform float u_dpr;
uniform float u_audio_low;
uniform float u_audio_mid;
uniform float u_audio_high;
uniform sampler2D u_audio_tex;
uniform sampler2D u_camera;
uniform sampler2D u_texture_0;
uniform sampler2D u_texture_1;
uniform sampler2D u_texture_2;
uniform sampler2D u_texture_3;
`.trim();

export interface CustomUniform {
  name: string;
  type: "float" | "int" | "vec2" | "vec3" | "vec4" | "bool";
  value: number | number[] | boolean;
  min: number;
  max: number;
  step: number;
}

export function parseCustomUniforms(code: string): CustomUniform[] {
  const results: CustomUniform[] = [];
  const uniformRegex =
    /uniform\s+(float|int|vec2|vec3|vec4|bool)\s+(\w+)\s*;(?:\s*\/\/\s*@min:\s*([\d.-]+))?(?:.*?@max:\s*([\d.-]+))?(?:.*?@step:\s*([\d.-]+))?/gm;

  const standardNames = new Set(STANDARD_UNIFORMS.map((u) => u.name));

  let match;
  while ((match = uniformRegex.exec(code)) !== null) {
    const [, type, name, minStr, maxStr, stepStr] = match;
    if (standardNames.has(name)) continue;
    if (type === "sampler2D") continue;

    const min = parseFloat(minStr || "0");
    const max = parseFloat(maxStr || "1");
    const step = parseFloat(stepStr || "0.01");

    let value: number | number[] | boolean;
    if (type === "bool") value = false;
    else if (type === "float" || type === "int") value = min;
    else if (type === "vec2") value = [0, 0];
    else if (type === "vec3") value = [0, 0, 0];
    else value = [0, 0, 0, 1];

    results.push({
      name,
      type: type as CustomUniform["type"],
      value,
      min,
      max,
      step,
    });
  }
  return results;
}
