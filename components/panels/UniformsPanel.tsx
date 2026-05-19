"use client";
import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { useEditorStore } from "@/store/useEditorStore";
import { parseCustomUniforms, type CustomUniform } from "@/lib/shader/uniforms";
import { Slider } from "@/components/ui/Slider";
import { Tooltip } from "@/components/ui/Tooltip";

const STANDARD_UNIFORMS_DISPLAY = [
  { name: "u_time", type: "float", description: "Elapsed time (seconds)" },
  { name: "u_resolution", type: "vec2", description: "Canvas size (pixels)" },
  { name: "u_mouse", type: "vec2", description: "Mouse position (0-1)" },
  { name: "u_audio_low", type: "float", description: "Bass level (0-1)" },
  { name: "u_audio_mid", type: "float", description: "Mid level (0-1)" },
  { name: "u_audio_high", type: "float", description: "Treble level (0-1)" },
];

export function UniformsPanel() {
  const { fragmentCode } = useEditorStore();
  const [customUniforms, setCustomUniforms] = useState<CustomUniform[]>([]);
  const [values, setValues] = useState<Record<string, number | number[]>>({});

  useEffect(() => {
    const parsed = parseCustomUniforms(fragmentCode);
    setCustomUniforms(parsed);
    const newVals: Record<string, number | number[]> = {};
    parsed.forEach((u) => {
      if (!(u.name in values)) {
        newVals[u.name] = u.value as number | number[];
      }
    });
    if (Object.keys(newVals).length > 0) {
      setValues((v) => ({ ...v, ...newVals }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fragmentCode]);

  return (
    <div className="p-3 space-y-4">
      {customUniforms.length > 0 && (
        <section>
          <h3 className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
            Custom Uniforms
          </h3>
          <div className="space-y-3">
            {customUniforms.map((u) => (
              <div key={u.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-[var(--accent)]">
                    {u.name}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">
                    {u.type}
                  </span>
                </div>
                {(u.type === "float" || u.type === "int") && (
                  <Slider
                    value={
                      typeof values[u.name] === "number"
                        ? (values[u.name] as number)
                        : u.min
                    }
                    min={u.min}
                    max={u.max}
                    step={u.step}
                    onChange={(v) =>
                      setValues((prev) => ({ ...prev, [u.name]: v }))
                    }
                  />
                )}
                {(u.type === "vec2" ||
                  u.type === "vec3" ||
                  u.type === "vec4") && (
                  <div className="space-y-1">
                    {["x", "y", "z", "w"]
                      .slice(0, parseInt(u.type.replace("vec", "")))
                      .map((comp, i) => (
                        <Slider
                          key={comp}
                          label={comp}
                          value={(values[u.name] as number[])?.[i] ?? 0}
                          min={u.min}
                          max={u.max}
                          step={u.step}
                          onChange={(v) =>
                            setValues((prev) => {
                              const arr = [
                                ...((prev[u.name] as number[]) || [0, 0, 0, 0]),
                              ];
                              arr[i] = v;
                              return { ...prev, [u.name]: arr };
                            })
                          }
                        />
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center gap-1 mb-2">
          <h3 className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
            Built-in Uniforms
          </h3>
          <Tooltip content="These are always available in your shaders">
            <Info size={10} className="text-[var(--text-disabled)]" />
          </Tooltip>
        </div>
        <div className="space-y-1">
          {STANDARD_UNIFORMS_DISPLAY.map((u) => (
            <div
              key={u.name}
              className="flex items-center justify-between py-1 px-2 rounded hover:bg-[var(--bg-hover)]"
            >
              <span className="text-xs font-mono text-[var(--syntax-uniform)]">
                {u.name}
              </span>
              <span className="text-[10px] text-[var(--text-muted)]">
                {u.description}
              </span>
            </div>
          ))}
        </div>
      </section>

      {customUniforms.length === 0 && (
        <div className="rounded-lg bg-[var(--bg-panel)] border border-[var(--border-subtle)] p-3">
          <p className="text-xs text-[var(--text-muted)] mb-1.5">
            Add custom uniforms to your shader:
          </p>
          <code className="text-[10px] font-mono text-[var(--syntax-uniform)] bg-[var(--bg-active)] px-2 py-1 rounded block">
            uniform float my_speed; // @min: 0, @max: 5
          </code>
          <p className="text-[10px] text-[var(--text-muted)] mt-1.5">
            Sliders will appear automatically.
          </p>
        </div>
      )}
    </div>
  );
}
