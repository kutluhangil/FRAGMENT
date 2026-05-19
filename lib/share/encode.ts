interface ShaderPayload {
  code: string;
  name?: string;
}

export function encodeShader(code: string, name?: string): string {
  try {
    const payload: ShaderPayload = { code, name: name || "Untitled" };
    const json = JSON.stringify(payload);
    return btoa(encodeURIComponent(json));
  } catch {
    // Last-resort fallback: raw base64
    return btoa(unescape(encodeURIComponent(code)));
  }
}

export function decodeShader(encoded: string): ShaderPayload | null {
  // Try JSON envelope first
  try {
    const json = decodeURIComponent(atob(encoded));
    const parsed = JSON.parse(json) as ShaderPayload;
    if (typeof parsed.code === "string") return parsed;
  } catch {
    // fall through
  }

  // Try raw base64 (legacy / simple)
  try {
    const raw = decodeURIComponent(escape(atob(encoded)));
    return { code: raw };
  } catch {
    return null;
  }
}
