import type { Metadata } from "next";
import { BookOpen, ChevronRight, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Learn GLSL — FRAGMENT",
  description: "Learn GLSL shader programming step by step with interactive examples.",
};

const LESSONS = [
  { id: 1, title: "Introduction to GLSL", desc: "What are shaders and how do they work?", duration: "5 min", tags: ["basics"] },
  { id: 2, title: "Colors & UV Coordinates", desc: "Understanding the coordinate system", duration: "8 min", tags: ["basics", "color"] },
  { id: 3, title: "Shapes with SDF", desc: "Drawing circles, rectangles using signed distance", duration: "10 min", tags: ["sdf", "shapes"] },
  { id: 4, title: "Time & Animation", desc: "Using u_time to animate your shaders", duration: "8 min", tags: ["animation"] },
  { id: 5, title: "Math Functions", desc: "sin, cos, mix, smoothstep — your best friends", duration: "12 min", tags: ["math"] },
  { id: 6, title: "Noise & Randomness", desc: "Value noise and hash functions", duration: "15 min", tags: ["noise", "procedural"] },
  { id: 7, title: "Fractal Brownian Motion", desc: "Layering noise for organic patterns", duration: "12 min", tags: ["noise", "fbm"] },
  { id: 8, title: "Raymarching Basics", desc: "Walking rays through signed distance fields", duration: "20 min", tags: ["raymarching", "3d"] },
  { id: 9, title: "Lighting Models", desc: "Diffuse, specular, ambient lighting in GLSL", duration: "15 min", tags: ["lighting", "3d"] },
  { id: 10, title: "Audio Reactive Shaders", desc: "Using FFT data to animate with music", duration: "10 min", tags: ["audio", "reactive"] },
];

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#ededf2]">
      <header className="h-14 flex items-center px-6 border-b border-[#1f1f2e]">
        <a href="/" className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
            <polygon points="11,2 20,19 2,19" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
          <span className="text-sm font-semibold tracking-wider">FRAGMENT</span>
        </a>
        <span className="ml-3 text-[#6b6b80] text-sm">/ Learn</span>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-xs text-[#a78bfa] bg-[#a78bfa20] px-3 py-1.5 rounded-full mb-4">
            <BookOpen size={12} />
            Learning Path
          </div>
          <h1 className="text-3xl font-semibold mb-3">Learn GLSL Shaders</h1>
          <p className="text-[#a0a0b0] leading-relaxed">
            10 interactive lessons to take you from zero to writing stunning shaders.
            Each lesson has examples you can edit live in the editor.
          </p>
        </div>

        <div className="space-y-2">
          {LESSONS.map((lesson, i) => (
            <div
              key={lesson.id}
              className="flex items-center gap-4 p-4 bg-[#11111a] border border-[#1f1f2e] rounded-xl hover:border-[#2a2a3d] hover:bg-[#16161f] transition-colors cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#16161f] border border-[#2a2a3d] flex items-center justify-center shrink-0 text-xs font-mono text-[#6b6b80] group-hover:border-[#a78bfa] group-hover:text-[#a78bfa] transition-colors">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-[#ededf2] mb-0.5">{lesson.title}</div>
                <div className="text-xs text-[#6b6b80]">{lesson.desc}</div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-[#6b6b80]">{lesson.duration}</span>
                <ChevronRight size={14} className="text-[#404050] group-hover:text-[#a78bfa] transition-colors" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-5 bg-[#11111a] border border-[#a78bfa30] rounded-xl text-center">
          <Zap size={20} className="text-[#a78bfa] mx-auto mb-2" />
          <p className="text-sm font-medium text-[#ededf2] mb-1">Ready to start?</p>
          <p className="text-xs text-[#6b6b80] mb-4">Or jump straight into the editor with example shaders.</p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#a78bfa] text-[#0a0a0f] text-sm font-medium rounded-lg hover:bg-[#b9a3fb] transition-colors"
          >
            Open Editor
          </a>
        </div>
      </main>
    </div>
  );
}
