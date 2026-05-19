export interface ExampleShader {
  id: string;
  name: string;
  description: string;
  category: "beginner" | "intermediate" | "advanced";
  tags: string[];
  code: string;
}

export const EXAMPLE_SHADERS: ExampleShader[] = [
  // BEGINNER
  {
    id: "gradient",
    name: "Gradient",
    description: "Simple UV-based color gradient",
    category: "beginner",
    tags: ["color", "uv", "gradient"],
    code: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  gl_FragColor = vec4(uv.x, uv.y, 0.5 + 0.5 * sin(u_time), 1.0);
}`,
  },
  {
    id: "mouse-circle",
    name: "Mouse Circle",
    description: "Circle that follows the mouse cursor",
    category: "beginner",
    tags: ["mouse", "circle", "interactive"],
    code: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float dist = length(uv - u_mouse);
  float circle = smoothstep(0.1, 0.08, dist);
  vec3 col = mix(vec3(0.05, 0.05, 0.1), vec3(0.66, 0.55, 0.98), circle);
  gl_FragColor = vec4(col, 1.0);
}`,
  },
  {
    id: "time-color",
    name: "Time Color Cycle",
    description: "Colors that animate with time using sin()",
    category: "beginner",
    tags: ["time", "color", "animation"],
    code: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec3 col = 0.5 + 0.5 * cos(u_time + uv.xyx + vec3(0.0, 2.094, 4.189));
  gl_FragColor = vec4(col, 1.0);
}`,
  },
  {
    id: "uv-debug",
    name: "UV Coordinates",
    description: "Visualize normalized UV coordinates",
    category: "beginner",
    tags: ["uv", "debug", "coordinates"],
    code: `precision mediump float;
uniform vec2 u_resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  gl_FragColor = vec4(uv.x, uv.y, 0.0, 1.0);
}`,
  },
  {
    id: "smoothstep-edge",
    name: "Smoothstep Edge",
    description: "Smooth gradient edges using smoothstep()",
    category: "beginner",
    tags: ["smoothstep", "edge", "gradient"],
    code: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float edge = 0.5 + 0.4 * sin(u_time);
  float smooth_edge = smoothstep(edge - 0.02, edge + 0.02, uv.x);
  vec3 colA = vec3(0.66, 0.55, 0.98);
  vec3 colB = vec3(0.1, 0.05, 0.2);
  gl_FragColor = vec4(mix(colB, colA, smooth_edge), 1.0);
}`,
  },
  {
    id: "stripes",
    name: "Stripes",
    description: "Animated stripes using fract()",
    category: "beginner",
    tags: ["stripes", "fract", "pattern"],
    code: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float stripes = step(0.5, fract(uv.x * 10.0 + u_time * 0.5));
  vec3 col = mix(vec3(0.1, 0.05, 0.2), vec3(0.66, 0.55, 0.98), stripes);
  gl_FragColor = vec4(col, 1.0);
}`,
  },
  {
    id: "checkerboard",
    name: "Checkerboard",
    description: "Classic checkerboard using mod()",
    category: "beginner",
    tags: ["checkerboard", "pattern", "mod"],
    code: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float scale = 8.0;
  vec2 grid = floor(uv * scale);
  float checker = mod(grid.x + grid.y, 2.0);
  vec3 col = mix(vec3(0.05, 0.05, 0.1), vec3(0.66, 0.55, 0.98), checker);
  gl_FragColor = vec4(col, 1.0);
}`,
  },
  {
    id: "polar",
    name: "Polar Coordinates",
    description: "Using atan2 for polar patterns",
    category: "beginner",
    tags: ["polar", "atan", "pattern"],
    code: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
  vec2 uv = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;
  float angle = atan(uv.y, uv.x);
  float radius = length(uv);
  float pattern = 0.5 + 0.5 * sin(angle * 6.0 + u_time * 2.0);
  pattern *= smoothstep(0.8, 0.3, radius);
  gl_FragColor = vec4(vec3(0.66, 0.55, 0.98) * pattern, 1.0);
}`,
  },
  {
    id: "mix-colors",
    name: "Mix Two Colors",
    description: "Smooth blending using mix()",
    category: "beginner",
    tags: ["mix", "color", "interpolation"],
    code: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec3 colA = vec3(0.66, 0.55, 0.98);
  vec3 colB = vec3(0.2, 0.8, 0.6);
  float t = 0.5 + 0.5 * sin(u_time + uv.x * 3.14159);
  vec3 col = mix(colA, colB, t);
  gl_FragColor = vec4(col, 1.0);
}`,
  },
  {
    id: "step-function",
    name: "Step Function",
    description: "Sharp cutoffs with step()",
    category: "beginner",
    tags: ["step", "cutoff", "pattern"],
    code: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float threshold = 0.5 + 0.4 * sin(u_time);
  float s = step(threshold, uv.x) * step(threshold, uv.y);
  gl_FragColor = vec4(mix(vec3(0.05), vec3(0.66, 0.55, 0.98), s), 1.0);
}`,
  },

  // INTERMEDIATE
  {
    id: "perlin-noise",
    name: "Perlin Noise",
    description: "Classic value noise implementation",
    category: "intermediate",
    tags: ["noise", "procedural", "perlin"],
    code: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float n = noise(uv * 5.0 + u_time * 0.3);
  n = n * 0.5 + noise(uv * 10.0 - u_time * 0.2) * 0.25;
  n = n * 0.75 + noise(uv * 20.0 + u_time * 0.1) * 0.125;
  vec3 col = mix(vec3(0.05, 0.02, 0.15), vec3(0.66, 0.55, 0.98), n);
  gl_FragColor = vec4(col, 1.0);
}`,
  },
  {
    id: "voronoi",
    name: "Voronoi Cells",
    description: "Animated Voronoi tessellation",
    category: "intermediate",
    tags: ["voronoi", "cells", "procedural"],
    code: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}

float voronoi(vec2 p) {
  vec2 n = floor(p);
  vec2 f = fract(p);
  float md = 5.0;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 o = hash2(n + g);
      o = 0.5 + 0.5 * sin(u_time + 6.2831 * o);
      float d = length(g + o - f);
      md = min(md, d);
    }
  }
  return md;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy * vec2(u_resolution.x / u_resolution.y, 1.0);
  float v = voronoi(uv * 5.0);
  vec3 col = mix(vec3(0.05, 0.02, 0.15), vec3(0.66, 0.55, 0.98), v);
  col += 0.2 * vec3(0.0, 0.6, 1.0) * (1.0 - smoothstep(0.0, 0.05, v));
  gl_FragColor = vec4(col, 1.0);
}`,
  },
  {
    id: "fbm-clouds",
    name: "FBM Clouds",
    description: "Fractal Brownian Motion for cloud-like noise",
    category: "intermediate",
    tags: ["fbm", "clouds", "fractal", "noise"],
    code: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), u.x),
             mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
}

float fbm(vec2 p) {
  float value = 0.0, amplitude = 0.5, frequency = 2.0;
  for (int i = 0; i < 6; i++) {
    value += amplitude * noise(p * frequency);
    amplitude *= 0.5; frequency *= 2.0;
  }
  return value;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 q = uv + u_time * 0.05;
  float n = fbm(q * 3.0 + fbm(q * 2.0 + u_time * 0.03));
  vec3 sky = vec3(0.1, 0.05, 0.25);
  vec3 cloud = vec3(0.66, 0.55, 0.98);
  gl_FragColor = vec4(mix(sky, cloud, smoothstep(0.3, 0.8, n)), 1.0);
}`,
  },
  {
    id: "plasma",
    name: "Plasma",
    description: "Classic plasma effect with sin combinations",
    category: "intermediate",
    tags: ["plasma", "sin", "color"],
    code: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float v = 0.0;
  v += sin(uv.x * 10.0 + u_time);
  v += sin(uv.y * 10.0 + u_time);
  v += sin((uv.x + uv.y) * 10.0 + u_time);
  v += sin(sqrt(uv.x * uv.x + uv.y * uv.y) * 20.0 + u_time * 2.0);
  vec3 col = vec3(
    sin(v * 3.14159) * 0.5 + 0.5,
    sin(v * 3.14159 + 2.094) * 0.5 + 0.5,
    sin(v * 3.14159 + 4.189) * 0.5 + 0.5
  );
  gl_FragColor = vec4(col, 1.0);
}`,
  },
  {
    id: "audio-bars",
    name: "Audio Bars",
    description: "Equalizer bars reacting to audio input",
    category: "intermediate",
    tags: ["audio", "reactive", "bars", "equalizer"],
    code: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_audio_low;
uniform float u_audio_mid;
uniform float u_audio_high;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float bar_width = 0.33;
  vec3 col = vec3(0.0);

  // Bass bar (left)
  if (uv.x < bar_width) {
    float h = u_audio_low;
    float bar = step(uv.y, h) * smoothstep(0.0, 0.05, bar_width - uv.x) * smoothstep(0.0, 0.05, uv.x);
    col += bar * vec3(0.66, 0.2, 0.9);
  }
  // Mid bar (center)
  else if (uv.x < bar_width * 2.0) {
    float h = u_audio_mid;
    float bar = step(uv.y, h) * smoothstep(0.0, 0.05, bar_width * 2.0 - uv.x) * smoothstep(0.0, 0.05, uv.x - bar_width);
    col += bar * vec3(0.2, 0.6, 1.0);
  }
  // Treble bar (right)
  else {
    float h = u_audio_high;
    float bar = step(uv.y, h) * smoothstep(0.0, 0.05, 1.0 - uv.x) * smoothstep(0.0, 0.05, uv.x - bar_width * 2.0);
    col += bar * vec3(0.2, 1.0, 0.6);
  }

  col += 0.03 * vec3(0.66, 0.55, 0.98);
  gl_FragColor = vec4(col, 1.0);
}`,
  },
  {
    id: "hexagonal-grid",
    name: "Hexagonal Grid",
    description: "Hexagonal tessellation pattern",
    category: "intermediate",
    tags: ["hexagon", "grid", "pattern"],
    code: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

float hexDist(vec2 p) {
  p = abs(p);
  return max(dot(p, normalize(vec2(1.0, 1.73))), p.x);
}

vec4 hexCoords(vec2 uv) {
  vec2 r = vec2(1.0, 1.73);
  vec2 h = r * 0.5;
  vec2 a = mod(uv, r) - h;
  vec2 b = mod(uv - h, r) - h;
  vec2 gv = dot(a, a) < dot(b, b) ? a : b;
  float x = hexDist(gv);
  vec2 id = uv - gv;
  return vec4(gv, id);
}

void main() {
  vec2 uv = (gl_FragCoord.xy / u_resolution.xy) * 10.0;
  uv.x *= u_resolution.x / u_resolution.y;
  vec4 hc = hexCoords(uv);
  float d = hc.x;
  float t = sin(u_time + hc.z * 0.7 + hc.w * 0.5) * 0.5 + 0.5;
  vec3 col = mix(vec3(0.05, 0.02, 0.15), vec3(0.66, 0.55, 0.98), t);
  col *= smoothstep(0.5, 0.45, d);
  col += 0.3 * vec3(0.66, 0.55, 0.98) * smoothstep(0.48, 0.45, d);
  gl_FragColor = vec4(col, 1.0);
}`,
  },

  // ADVANCED
  {
    id: "raymarching-sphere",
    name: "Raymarching Sphere",
    description: "Basic raymarching with SDF sphere and lighting",
    category: "advanced",
    tags: ["raymarching", "sdf", "3d", "lighting"],
    code: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

float sdSphere(vec3 p, float r) { return length(p) - r; }

float map(vec3 p) {
  p.y += 0.3 * sin(u_time + p.x * 2.0);
  return sdSphere(p, 1.0);
}

vec3 calcNormal(vec3 p) {
  const float h = 0.001;
  return normalize(vec3(
    map(p + vec3(h, 0, 0)) - map(p - vec3(h, 0, 0)),
    map(p + vec3(0, h, 0)) - map(p - vec3(0, h, 0)),
    map(p + vec3(0, 0, h)) - map(p - vec3(0, 0, h))
  ));
}

void main() {
  vec2 uv = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;
  vec3 ro = vec3(0.0, 0.0, 3.0);
  vec3 rd = normalize(vec3(uv, -1.5));

  float t = 0.0;
  bool hit = false;
  for (int i = 0; i < 80; i++) {
    float d = map(ro + rd * t);
    if (d < 0.001) { hit = true; break; }
    if (t > 20.0) break;
    t += d;
  }

  vec3 col = vec3(0.0);
  if (hit) {
    vec3 p = ro + rd * t;
    vec3 n = calcNormal(p);
    vec3 light = normalize(vec3(1.0, 2.0, 2.0));
    float diff = max(0.0, dot(n, light));
    float spec = pow(max(0.0, dot(reflect(-light, n), -rd)), 32.0);
    col = vec3(0.66, 0.55, 0.98) * diff + vec3(1.0) * spec * 0.5;
    col += 0.05 * vec3(0.66, 0.55, 0.98);
  }

  col = pow(col, vec3(0.4545));
  gl_FragColor = vec4(col, 1.0);
}`,
  },
  {
    id: "mandelbrot",
    name: "Mandelbrot Fractal",
    description: "Classic Mandelbrot set with smooth coloring",
    category: "advanced",
    tags: ["fractal", "mandelbrot", "complex", "math"],
    code: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {
  vec2 uv = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;
  float zoom = 2.5 + sin(u_time * 0.1) * 0.5;
  vec2 c = uv * zoom - vec2(0.5 + u_mouse.x * 0.5, 0.0);

  vec2 z = vec2(0.0);
  float n = 0.0;
  const int MAX_ITER = 128;
  for (int i = 0; i < MAX_ITER; i++) {
    z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
    if (dot(z, z) > 4.0) break;
    n++;
  }

  float smooth_n = float(n) - log2(log2(dot(z, z))) + 4.0;
  if (n >= float(MAX_ITER)) smooth_n = 0.0;

  float t = smooth_n / float(MAX_ITER);
  vec3 col = 0.5 + 0.5 * cos(6.28318 * (vec3(0.0, 0.1, 0.2) + t));
  col *= step(0.001, t);
  gl_FragColor = vec4(col, 1.0);
}`,
  },
  {
    id: "sdf-shapes",
    name: "SDF Shapes",
    description: "Signed Distance Functions for 2D shapes",
    category: "advanced",
    tags: ["sdf", "shapes", "2d", "distance"],
    code: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

float sdCircle(vec2 p, float r) { return length(p) - r; }
float sdBox(vec2 p, vec2 b) { vec2 q = abs(p) - b; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0); }
float sdTriangle(vec2 p, float r) {
  const float k = sqrt(3.0);
  p.x = abs(p.x) - r;
  p.y = p.y + r / k;
  if (p.x + k * p.y > 0.0) p = vec2(p.x - k * p.y, -k * p.x - p.y) / 2.0;
  p.x -= clamp(p.x, -2.0 * r, 0.0);
  return -length(p) * sign(p.y);
}

void main() {
  vec2 uv = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;
  float t = u_time * 0.5;

  float d1 = sdCircle(uv + vec2(cos(t) * 0.6, sin(t) * 0.3), 0.25);
  float d2 = sdBox(uv - vec2(cos(t + 2.094) * 0.6, sin(t + 2.094) * 0.3), vec2(0.2));
  float d3 = sdTriangle(uv + vec2(cos(t + 4.189) * 0.6, sin(t + 4.189) * 0.3), 0.25);

  float d = min(min(d1, d2), d3);

  vec3 col = d > 0.0 ? vec3(0.9, 0.6, 1.0) * (0.5 + 0.5 * cos(u_time + d * 20.0)) : vec3(0.66, 0.55, 0.98);
  col *= 1.0 - exp(-4.0 * abs(d));
  col *= 0.8 + 0.2 * cos(120.0 * d);
  col = mix(col, vec3(1.0), 1.0 - smoothstep(0.0, 0.01, abs(d)));

  gl_FragColor = vec4(col, 1.0);
}`,
  },
  {
    id: "julia-set",
    name: "Julia Set",
    description: "Animated Julia set fractal",
    category: "advanced",
    tags: ["fractal", "julia", "complex", "math"],
    code: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
  vec2 uv = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y * 1.5;
  vec2 c = vec2(0.7885 * cos(u_time * 0.2), 0.7885 * sin(u_time * 0.2));

  vec2 z = uv;
  float n = 0.0;
  const int MAX_ITER = 100;
  for (int i = 0; i < MAX_ITER; i++) {
    z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
    if (dot(z, z) > 4.0) break;
    n++;
  }

  float t = n / float(MAX_ITER);
  vec3 col = 0.5 + 0.5 * cos(6.28318 * (t + vec3(0.66, 0.55, 0.98) * 0.3));
  col *= smoothstep(0.0, 0.02, t);
  gl_FragColor = vec4(col, 1.0);
}`,
  },
  {
    id: "domain-warping",
    name: "Domain Warping",
    description: "Noise of noise for fluid-like patterns",
    category: "advanced",
    tags: ["domain-warping", "noise", "procedural", "fbm"],
    code: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 q = vec2(fbm(uv + u_time * 0.1), fbm(uv + vec2(1.0, 0.0)));
  vec2 r = vec2(fbm(uv + 4.0 * q + vec2(1.7, 9.2) + u_time * 0.15),
                fbm(uv + 4.0 * q + vec2(8.3, 2.8) + u_time * 0.126));
  float f = fbm(uv + 4.0 * r);
  vec3 col = mix(vec3(0.1, 0.05, 0.2), vec3(0.66, 0.55, 0.98),
             mix(vec3(0.0, 0.0, 0.0), vec3(0.5, 0.0, 0.5), clamp(f * 2.0, 0.0, 1.0)).r);
  gl_FragColor = vec4(col, 1.0);
}`,
  },
];
