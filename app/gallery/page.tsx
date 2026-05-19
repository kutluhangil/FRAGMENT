import type { Metadata } from "next";
import { Globe, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Gallery — FRAGMENT",
  description: "Community shader gallery. Discover and share GLSL shaders.",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#ededf2]">
      <header className="h-14 flex items-center px-6 border-b border-[#1f1f2e]">
        <a href="/" className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
            <polygon points="11,2 20,19 2,19" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinejoin="round"/>
            <polygon points="11,7 16.5,17 5.5,17" fill="#a78bfa" opacity="0.15"/>
          </svg>
          <span className="text-sm font-semibold tracking-wider">FRAGMENT</span>
        </a>
        <span className="ml-3 text-[#6b6b80] text-sm">/ Gallery</span>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#16161f] border border-[#2a2a3d] mb-4">
            <Globe size={24} className="text-[#a78bfa]" />
          </div>
          <h1 className="text-2xl font-semibold mb-2">Community Gallery</h1>
          <p className="text-[#a0a0b0] max-w-md mx-auto">
            Discover shaders created by the community. Share your own from the editor.
          </p>
        </div>

        <div className="text-center py-20 border border-dashed border-[#2a2a3d] rounded-2xl">
          <Sparkles size={32} className="text-[#a78bfa] mx-auto mb-4" />
          <p className="text-[#a0a0b0] text-sm">Gallery coming soon.</p>
          <p className="text-[#6b6b80] text-xs mt-1">Create shaders in the editor and share them!</p>
          <a
            href="/"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#a78bfa] text-[#0a0a0f] text-sm font-medium rounded-lg hover:bg-[#b9a3fb] transition-colors"
          >
            Open Editor
          </a>
        </div>
      </main>
    </div>
  );
}
