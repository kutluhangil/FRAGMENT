# FRAGMENT — Shader Playground

> The shader playground for 2026. AI co-pilot, 3D viewport, audio-reactive inputs, and multi-layer compositing.

[![Live Demo](https://img.shields.io/badge/demo-fragment.dev-a78bfa?style=flat-square)](https://fragment.dev)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

## Features

- **AI Co-pilot** — "make it more dreamy" → AI modifies your GLSL shader in real-time
- **3D Viewport** — Apply shaders to sphere, torus, knot, cube, and custom meshes
- **Multi-Layer Compositor** — Stack shaders with 12 Photoshop-style blend modes
- **Audio Reactive** — Mic or MP3 → 3 frequency bands as uniforms (`u_audio_low/mid/high`)
- **Webcam Texture** — Live camera feed as `sampler2D u_camera`
- **Inline Docs** — Hover any GLSL function for docs, signature, and examples
- **Video Export** — PNG, 4K, WebM loop, GIF, wallpaper
- **Community Gallery** — Share and discover shaders
- **Premium Dark UI** — Linear-quality aesthetic with violet accent

## Quick Start

```bash
git clone https://github.com/kutluhangil/fragment
cd fragment
pnpm install
cp .env.local.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Self-Host on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kutluhangil/fragment)

1. Click Deploy above
2. Add `ANTHROPIC_API_KEY` environment variable
3. Optionally add Vercel KV for sharing and gallery

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 App Router |
| Language | TypeScript (strict) |
| 3D/WebGL | Three.js + React Three Fiber |
| Editor | Monaco Editor with GLSL support |
| AI | Anthropic Claude (Sonnet) |
| Styling | Tailwind CSS + CSS Variables |
| State | Zustand |
| Storage | IndexedDB (Dexie) + Vercel KV |
| Deploy | Vercel |

## Standard Uniforms

Every shader has access to:

```glsl
uniform float u_time;          // Elapsed seconds
uniform vec2  u_resolution;    // Canvas pixels
uniform vec2  u_mouse;         // Mouse (0-1)
uniform float u_audio_low;     // Bass level (0-1)
uniform float u_audio_mid;     // Mid level (0-1)
uniform float u_audio_high;    // Treble level (0-1)
uniform sampler2D u_camera;    // Webcam feed
uniform sampler2D u_texture_0; // Uploaded texture
```

## License

MIT — fork it, learn from it, build your own.

---

Made with care · [LinkedIn](https://linkedin.com/in/kutluhangil)
