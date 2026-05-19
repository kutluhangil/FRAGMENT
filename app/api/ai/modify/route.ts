import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

export const runtime = "edge";
export const maxDuration = 30;

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are an expert GLSL shader developer. Your task is to modify GLSL fragment shader code based on user instructions.

CRITICAL RULES:
- Return ONLY the modified GLSL code, no markdown fences, no explanations
- Preserve all standard uniforms: u_time, u_resolution, u_mouse, u_audio_low, u_audio_mid, u_audio_high
- Keep precision qualifier at the top: precision mediump float;
- Ensure valid GLSL ES 1.0 or 3.0 syntax that compiles
- Maintain void main() as the entry point with gl_FragColor assignment
- If the user asks to make it "dreamy", add smooth blur-like effects, soft colors, gentle animations
- If "audio-reactive", use u_audio_low, u_audio_mid, u_audio_high uniforms
- Keep the spirit of the original unless explicitly asked to completely change it`;

export async function POST(req: NextRequest) {
  try {
    const { code, prompt, mode } = await req.json();

    if (!code || !prompt) {
      return new Response(JSON.stringify({ error: "Missing code or prompt" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const userMessage =
      mode === "generate"
        ? `Generate a GLSL fragment shader that: ${prompt}\n\nInclude standard uniforms (u_time, u_resolution, u_mouse). Return only the GLSL code.`
        : `Here is the current GLSL fragment shader:\n\n\`\`\`glsl\n${code}\n\`\`\`\n\nModify it to: ${prompt}\n\nReturn only the modified GLSL code, no explanations.`;

    const stream = await client.messages.stream({
      model: "claude-sonnet-4-5",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (
              chunk.type === "content_block_delta" &&
              chunk.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(chunk.delta.text));
            }
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("AI modify error:", err);
    return new Response(
      JSON.stringify({ error: "AI request failed. Check your API key." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
