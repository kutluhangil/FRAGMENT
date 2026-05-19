"use client";
import { useRef, useCallback, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ShaderMesh } from "./ShaderMesh";
import { ViewportControls } from "./ViewportControls";
import { ViewportFPS } from "./ViewportFPS";
import { ViewportMode } from "./ViewportMode";
import { usePreviewStore } from "@/store/usePreviewStore";

function CanvasContent() {
  return <ShaderMesh />;
}

export function PreviewCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setMouse } = usePreviewStore();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      setMouse(x, y);
    },
    [setMouse]
  );

  const dpr =
    typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-[var(--bg-base)] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        gl={{
          antialias: true,
          preserveDrawingBuffer: true,
          powerPreference: "high-performance",
        }}
        dpr={dpr}
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 0, 1], near: 0.01, far: 1000 }}
      >
        <Suspense fallback={null}>
          <CanvasContent />
        </Suspense>
      </Canvas>
      <ViewportMode />
      <ViewportFPS />
      <ViewportControls />
    </div>
  );
}
