import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

interface ShareData {
  fragmentCode: string;
  shaderName: string;
  vertexCode?: string;
  createdAt: number;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Try Vercel KV first
    try {
      const { kv } = await import("@vercel/kv");
      const data = await kv.get<string>(`share:${id}`);
      if (!data) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      const parsed: ShareData =
        typeof data === "string" ? JSON.parse(data) : (data as ShareData);
      return NextResponse.json(parsed);
    } catch {
      // KV not configured — try base64url decode
      try {
        const decoded = Buffer.from(id, "base64url").toString("utf-8");
        const parsed: ShareData = JSON.parse(decoded);
        return NextResponse.json(parsed);
      } catch {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
    }
  } catch (err) {
    console.error("Share fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch share" },
      { status: 500 }
    );
  }
}
