"use client";
import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useEditorStore } from "@/store/useEditorStore";
import { usePreviewStore } from "@/store/usePreviewStore";
import { useInputsStore } from "@/store/useInputsStore";
import { debounce } from "@/lib/utils/debounce";

// Full-screen triangle vertex shader — works in 2D and 3D modes
const VERTEX_SHADER = `
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
  vUv = uv;
  vPosition = position;
  vNormal = normal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export function ShaderMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const { size, gl } = useThree();

  const { fragmentCode, setCompileErrors, setCompileStatus } = useEditorStore();
  const {
    isPlaying,
    time,
    setTime,
    setFPS,
    mode,
    mesh: meshType,
    mouseX,
    mouseY,
  } = usePreviewStore();
  const { audioLow, audioMid, audioHigh } = useInputsStore();

  const frameCountRef = useRef(0);
  const fpsFramesRef = useRef(0);
  const fpsTimerRef = useRef(0);

  // Stable uniforms object — values are mutated in place each frame
  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(size.width, size.height) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_mouse_delta: { value: new THREE.Vector2(0, 0) },
      u_frame: { value: 0 },
      u_dpr: { value: Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2) },
      u_audio_low: { value: 0 },
      u_audio_mid: { value: 0 },
      u_audio_high: { value: 0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Keep resolution in sync with canvas size
  useEffect(() => {
    uniforms.u_resolution.value.set(size.width, size.height);
  }, [size, uniforms]);

  // Build (or rebuild) the ShaderMaterial from fragment source
  const buildMaterial = useMemo(
    () =>
      debounce((fragCode: string) => {
        setCompileStatus("compiling");

        // Dispose previous material
        if (materialRef.current) {
          materialRef.current.dispose();
        }

        const mat = new THREE.ShaderMaterial({
          vertexShader: VERTEX_SHADER,
          fragmentShader: fragCode,
          uniforms,
          glslVersion: THREE.GLSL1,
        });

        // Trigger WebGL compile by rendering a dummy scene
        try {
          const tmpScene = new THREE.Scene();
          const tmpGeo = new THREE.PlaneGeometry(2, 2);
          const tmpMesh = new THREE.Mesh(tmpGeo, mat);
          tmpScene.add(tmpMesh);
          // One-shot render to force compilation
          gl.compile(tmpScene, new THREE.Camera());
          tmpGeo.dispose();

          materialRef.current = mat;
          if (meshRef.current) {
            meshRef.current.material = mat;
          }

          setCompileErrors([]);
          setCompileStatus("success");
        } catch (err) {
          const errMsg = err instanceof Error ? err.message : String(err);
          const lineMatch = errMsg.match(/line\s+(\d+)/i);
          const line = lineMatch ? parseInt(lineMatch[1]) : 1;
          setCompileErrors([{ line, message: errMsg, severity: "error" }]);
          setCompileStatus("error");
          mat.dispose();
        }
      }, 200),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gl, uniforms, setCompileErrors, setCompileStatus]
  );

  // Re-compile whenever fragment code changes
  useEffect(() => {
    buildMaterial(fragmentCode);
  }, [fragmentCode, buildMaterial]);

  // Create initial material on mount
  useEffect(() => {
    const mat = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: fragmentCode,
      uniforms,
      glslVersion: THREE.GLSL1,
    });
    materialRef.current = mat;
    if (meshRef.current) {
      meshRef.current.material = mat;
    }
    setCompileStatus("success");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((_state, delta) => {
    if (!materialRef.current) return;

    // Time
    if (isPlaying) {
      const newTime = time + delta;
      setTime(newTime);
      uniforms.u_time.value = newTime;
    } else {
      uniforms.u_time.value = time;
    }

    // Frame counter
    frameCountRef.current++;
    uniforms.u_frame.value = frameCountRef.current;

    // Mouse
    uniforms.u_mouse.value.set(mouseX, mouseY);

    // Audio
    uniforms.u_audio_low.value = audioLow;
    uniforms.u_audio_mid.value = audioMid;
    uniforms.u_audio_high.value = audioHigh;

    // FPS
    fpsFramesRef.current++;
    fpsTimerRef.current += delta;
    if (fpsTimerRef.current >= 1) {
      setFPS(Math.round(fpsFramesRef.current / fpsTimerRef.current));
      fpsFramesRef.current = 0;
      fpsTimerRef.current = 0;
    }

    materialRef.current.uniformsNeedUpdate = true;
  });

  const geometry = useMemo(() => {
    if (mode === "2d" || meshType === "plane")
      return new THREE.PlaneGeometry(2, 2);
    if (meshType === "sphere") return new THREE.SphereGeometry(1, 64, 64);
    if (meshType === "torus") return new THREE.TorusGeometry(0.7, 0.3, 32, 100);
    if (meshType === "knot")
      return new THREE.TorusKnotGeometry(0.6, 0.2, 128, 32);
    if (meshType === "cube") return new THREE.BoxGeometry(1.5, 1.5, 1.5);
    return new THREE.PlaneGeometry(2, 2);
  }, [mode, meshType]);

  return (
    <>
      <mesh ref={meshRef} geometry={geometry}>
        {/* placeholder material replaced on mount */}
        <meshBasicMaterial />
      </mesh>
      {mode === "3d" && <OrbitControls enablePan={false} makeDefault />}
    </>
  );
}
