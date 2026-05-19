export interface CompileError {
  line: number;
  column?: number;
  message: string;
  severity: "error" | "warning";
}

export interface CompileResult {
  success: boolean;
  errors: CompileError[];
}

export function parseGLSLError(errorLog: string): CompileError[] {
  const errors: CompileError[] = [];
  const lines = errorLog.split("\n");

  for (const line of lines) {
    // Format: ERROR: 0:LINE: message
    const match = line.match(/^(ERROR|WARNING):\s*\d+:(\d+):\s*(.+)$/i);
    if (match) {
      errors.push({
        line: parseInt(match[2], 10),
        message: match[3].trim(),
        severity: match[1].toLowerCase() === "error" ? "error" : "warning",
      });
    }
  }

  return errors;
}

export function injectStandardUniforms(code: string): string {
  if (code.includes("u_time")) return code; // already has uniforms

  const standardUniforms = `precision mediump float;

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

`;

  // Remove existing precision qualifier if present
  const cleaned = code.replace(/^\s*precision\s+\w+\s+float\s*;\s*/m, "");
  return standardUniforms + cleaned;
}
