"use client";
import { useState } from "react";
import { Search } from "lucide-react";

const GLSL_REFS = [
  { fn: "sin(x)", ret: "float", desc: "Sine of angle in radians" },
  { fn: "cos(x)", ret: "float", desc: "Cosine of angle in radians" },
  { fn: "tan(x)", ret: "float", desc: "Tangent of angle in radians" },
  { fn: "asin(x)", ret: "float", desc: "Arc sine" },
  { fn: "acos(x)", ret: "float", desc: "Arc cosine" },
  { fn: "atan(y,x)", ret: "float", desc: "Arc tangent of y/x" },
  { fn: "pow(x,y)", ret: "genType", desc: "x raised to power y" },
  { fn: "sqrt(x)", ret: "genType", desc: "Square root" },
  { fn: "abs(x)", ret: "genType", desc: "Absolute value" },
  { fn: "floor(x)", ret: "genType", desc: "Floor (round down)" },
  { fn: "ceil(x)", ret: "genType", desc: "Ceiling (round up)" },
  { fn: "fract(x)", ret: "genType", desc: "Fractional part" },
  { fn: "mod(x,y)", ret: "genType", desc: "Modulo x minus y*floor(x/y)" },
  { fn: "min(x,y)", ret: "genType", desc: "Minimum of x and y" },
  { fn: "max(x,y)", ret: "genType", desc: "Maximum of x and y" },
  { fn: "clamp(x,m,n)", ret: "genType", desc: "Clamp x between m and n" },
  { fn: "mix(x,y,a)", ret: "genType", desc: "Linear interpolation" },
  { fn: "step(e,x)", ret: "genType", desc: "0 if x<e, else 1" },
  {
    fn: "smoothstep(e0,e1,x)",
    ret: "genType",
    desc: "Smooth Hermite interpolation",
  },
  { fn: "length(v)", ret: "float", desc: "Vector length" },
  { fn: "distance(p0,p1)", ret: "float", desc: "Distance between points" },
  { fn: "dot(x,y)", ret: "float", desc: "Dot product" },
  { fn: "cross(x,y)", ret: "vec3", desc: "Cross product" },
  { fn: "normalize(v)", ret: "genType", desc: "Normalize to unit length" },
  { fn: "reflect(I,N)", ret: "genType", desc: "Reflection direction" },
  { fn: "refract(I,N,η)", ret: "genType", desc: "Refraction direction" },
  { fn: "texture(s,uv)", ret: "vec4", desc: "Sample 2D texture" },
  { fn: "dFdx(p)", ret: "genType", desc: "Partial derivative x" },
  { fn: "dFdy(p)", ret: "genType", desc: "Partial derivative y" },
  { fn: "fwidth(p)", ret: "genType", desc: "Sum of abs derivatives" },
];

export function DocsPanel() {
  const [search, setSearch] = useState("");

  const filtered = GLSL_REFS.filter(
    (r) =>
      r.fn.toLowerCase().includes(search.toLowerCase()) ||
      r.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 shrink-0">
        <div className="relative">
          <Search
            size={12}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search GLSL..."
            className="w-full pl-7 pr-3 h-7 text-xs bg-[var(--bg-panel)] border border-[var(--border-subtle)] rounded-md text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--border-focus)]"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filtered.map((ref) => (
          <div
            key={ref.fn}
            className="flex items-start gap-2 px-3 py-2 hover:bg-[var(--bg-hover)] transition-colors"
          >
            <code className="text-[10px] font-mono text-[var(--syntax-builtin)] shrink-0 min-w-[7rem]">
              {ref.fn}
            </code>
            <span className="text-[10px] text-[var(--text-muted)] font-mono text-right shrink-0 w-14">
              → {ref.ret}
            </span>
            <span className="text-[10px] text-[var(--text-secondary)] flex-1">
              {ref.desc}
            </span>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-xs text-[var(--text-muted)] text-center py-8">
            No results for &ldquo;{search}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
}
