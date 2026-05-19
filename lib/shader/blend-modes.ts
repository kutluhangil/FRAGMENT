export type BlendMode =
  | "normal" | "multiply" | "screen" | "overlay"
  | "darken" | "lighten" | "color-dodge" | "color-burn"
  | "hard-light" | "soft-light" | "difference" | "exclusion";

export const BLEND_MODE_GLSL: Record<BlendMode, string> = {
  normal: "src",
  multiply: "src * dst",
  screen: "src + dst - src * dst",
  overlay: "dst < 0.5 ? 2.0 * src * dst : 1.0 - 2.0 * (1.0 - src) * (1.0 - dst)",
  darken: "min(src, dst)",
  lighten: "max(src, dst)",
  "color-dodge": "clamp(dst / (1.0 - src + 0.001), 0.0, 1.0)",
  "color-burn": "1.0 - clamp((1.0 - dst) / (src + 0.001), 0.0, 1.0)",
  "hard-light": "src < 0.5 ? 2.0 * src * dst : 1.0 - 2.0 * (1.0 - src) * (1.0 - dst)",
  "soft-light": "dst < 0.5 ? 2.0 * src * dst + src * src * (1.0 - 2.0 * dst) : sqrt(dst) * (2.0 * src - 1.0) + 2.0 * dst * (1.0 - src)",
  difference: "abs(src - dst)",
  exclusion: "src + dst - 2.0 * src * dst",
};

export function buildBlendShader(): string {
  let glsl = `precision mediump float;
uniform sampler2D u_base;
uniform sampler2D u_layer;
uniform float u_opacity;
uniform int u_blend_mode;
varying vec2 vUv;

vec3 blend(int mode, vec3 src, vec3 dst) {
`;

  let index = 0;
  for (const [, formula] of Object.entries(BLEND_MODE_GLSL)) {
    const isFirst = index === 0;
    const prefix = isFirst ? "  if" : "  else if";
    glsl += `${prefix} (mode == ${index}) { return ${formula}; }\n`;
    index++;
  }

  glsl += `  return src;\n}\n\nvoid main() {\n  vec4 base = texture2D(u_base, vUv);\n  vec4 layer = texture2D(u_layer, vUv);\n  vec3 blended = blend(u_blend_mode, layer.rgb, base.rgb);\n  gl_FragColor = vec4(mix(base.rgb, blended, layer.a * u_opacity), 1.0);\n}\n`;

  return glsl;
}
