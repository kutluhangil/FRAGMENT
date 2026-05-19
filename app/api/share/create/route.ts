import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fragmentCode, shaderName, vertexCode } = body as {
      fragmentCode?: string;
      shaderName?: string;
      vertexCode?: string;
    };

    if (!fragmentCode) {
      return NextResponse.json(
        { error: "Missing shader code" },
        { status: 400 }
      );
    }

    const id = nanoid(10);
    const data = JSON.stringify({
      fragmentCode,
      shaderName: shaderName || "Untitled",
      vertexCode,
      createdAt: Date.now(),
    });

    // Try Vercel KV if available, fall back to URL encoding
    try {
      const { kv } = await import("@vercel/kv");
      await kv.set(`share:${id}`, data, { ex: 60 * 60 * 24 * 365 }); // 1 year TTL
      return NextResponse.json({ id, url: `/s/${id}` });
    } catch {
      // KV not configured — encode payload in URL (base64url)
      const encoded = Buffer.from(data).toString("base64url");
      return NextResponse.json({
        id: encoded,
        url: `/?code=${encoded}`,
        fallback: true,
      });
    }
  } catch (err) {
    console.error("Share create error:", err);
    return NextResponse.json(
      { error: "Failed to create share" },
      { status: 500 }
    );
  }
}
