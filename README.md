<div align="center">

<br />

<img src="https://img.shields.io/badge/FRAGMENT-v1.0.0-a78bfa?style=for-the-badge&logoColor=white" alt="version" />
<img src="https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="nextjs" />
<img src="https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript" />
<img src="https://img.shields.io/badge/Three.js-WebGL-000000?style=for-the-badge&logo=threedotjs&logoColor=white" alt="threejs" />
<img src="https://img.shields.io/badge/Claude-Sonnet-d97706?style=for-the-badge&logoColor=white" alt="claude" />
<img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="vercel" />

<br /><br />

```
  ███████╗██████╗  █████╗  ██████╗ ███╗   ███╗███████╗███╗   ██╗████████╗
  ██╔════╝██╔══██╗██╔══██╗██╔════╝ ████╗ ████║██╔════╝████╗  ██║╚══██╔══╝
  █████╗  ██████╔╝███████║██║  ███╗██╔████╔██║█████╗  ██╔██╗ ██║   ██║
  ██╔══╝  ██╔══██╗██╔══██║██║   ██║██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║
  ██║     ██║  ██║██║  ██║╚██████╔╝██║ ╚═╝ ██║███████╗██║ ╚████║   ██║
  ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝

  v1.0.0  —  GLSL shader playground for 2026
  AI co-pilot · 3D viewport · audio-reactive · multi-layer compositor
```

### **FRAGMENT** — ShaderToy değil. Shader playground'u 2026'ya taşıyan araç. / Not ShaderToy. The shader playground for 2026.

[🌐 Live Demo](https://fragment.dev) · [✨ AI Demo](#-ai-co-pilot) · [💼 LinkedIn](https://www.linkedin.com/in/kutluhangil) · [🐙 GitHub](https://github.com/kutluhangil)

</div>

---

<div align="center">

🇹🇷 **Türkçe** · 🇬🇧 [English](#-overview)

</div>

---

## ✦ Genel Bakış

FRAGMENT, klasik bir shader playground değil — 2026 standartlarında inşa edilmiş, AI co-pilot'u, gerçek 3D viewport'u, audio-reactive uniform'ları ve multi-layer compositor'ü olan premium bir GLSL editörü.

ShaderToy hâlâ 2013'te yaşıyor: çirkin UI, sadece fullscreen quad, yardımcı araç yok, AI yok.  
**FRAGMENT** farklı.

9 agent sistemiyle sıfırdan inşa edildi. Vercel'de yaşıyor, tarayıcında 60fps koşuyor.

## ⚡ Özellikler

| Özellik | Açıklama |
|---------|----------|
| ✨ **AI Co-pilot** | `Cmd+Shift+A` → "make it more dreamy" → AI shader'ını modifiye eder, diff görünümü ile onaylarsın |
| 🎯 **3D Viewport** | Sphere, Torus, Knot, Cube üzerine shader uygula — OrbitControls dahil |
| 🎚️ **Multi-Layer** | Photoshop gibi shader layer'ları stackle, 12 blend mode |
| 🎵 **Audio Reactive** | Mikrofon veya MP3 → 3 frekans bandı otomatik uniform (`u_audio_low/mid/high`) |
| 📷 **Webcam Texture** | Canlı kamera feed'i `sampler2D u_camera` olarak shader'a gönderilir |
| 📖 **Inline Docs** | Her GLSL fonksiyonuna hover → imza, açıklama, örnek kod |
| 🎬 **Video Export** | PNG, 4K PNG, WebM loop — tarayıcıdan direkt indir |
| 🌌 **Community Gallery** | Shader'larını paylaş, başkalarının shader'larını keşfet |
| 🌑 **Premium Dark UI** | Linear/Vercel kalitesinde tasarım, violet accent `#a78bfa` |
| ⚡ **Edge Runtime** | AI endpoint Vercel Edge'de, soğuk başlangıç < 800ms |

## 🆚 ShaderToy vs FRAGMENT

| Özellik | ShaderToy | glslsandbox | **FRAGMENT** |
|---------|-----------|-------------|--------------|
| UI Yılı | 2013 | 2014 | **2026** |
| AI Co-pilot | ❌ | ❌ | ✅ |
| 3D Viewport | ❌ | ❌ | ✅ |
| Multi-Layer | ❌ | ❌ | ✅ |
| Audio Reactive | ⚠️ manuel | ❌ | ✅ toggle |
| Webcam | ⚠️ | ❌ | ✅ |
| Hover Docs | ❌ | ❌ | ✅ |
| Video Export | ❌ | ❌ | ✅ |

---

## ✦ Overview

FRAGMENT is not just another shader playground — it's a full IDE for GLSL built to 2026 standards. AI co-pilot, real 3D viewport, audio-reactive inputs, and a multi-layer compositor, all in the browser.

ShaderToy still lives in 2013: ugly UI, fullscreen quad only, no tooling, no AI.  
**FRAGMENT** is different.

Built from scratch using a 9-agent system. Deployed on Vercel, runs at 60fps in your browser.

## ⚡ Key Features

| Feature | Description |
|---------|-------------|
| ✨ **AI Co-pilot** | `Cmd+Shift+A` → "make it more dreamy" → AI rewrites your shader, review in diff view |
| 🎯 **3D Viewport** | Apply shaders to Sphere, Torus, Knot, Cube — OrbitControls included |
| 🎚️ **Multi-Layer** | Stack shaders like Photoshop layers, 12 blend modes |
| 🎵 **Audio Reactive** | Mic or MP3 → 3 frequency bands as uniforms (`u_audio_low/mid/high`) |
| 📷 **Webcam Texture** | Live camera feed as `sampler2D u_camera` uniform |
| 📖 **Inline Docs** | Hover any GLSL function → signature, description, live example |
| 🎬 **Video Export** | PNG, 4K PNG, WebM loop — download straight from the browser |
| 🌌 **Community Gallery** | Share shaders, discover the community's work |
| 🌑 **Premium Dark UI** | Linear/Vercel quality design, violet accent `#a78bfa` |
| ⚡ **Edge Runtime** | AI endpoint on Vercel Edge, cold start < 800ms |

---

## 🎮 Klavye Kısayolları / Keyboard Shortcuts

```
Cmd+Shift+A   →  AI Co-pilot aç / Open AI co-pilot
Cmd+K         →  Komut paleti / Command palette
Cmd+B         →  Sidebar aç/kapat / Toggle sidebar
Cmd+J         →  Alt panel aç/kapat / Toggle bottom panel
Cmd+S         →  Kaydet / Save (IndexedDB)
Cmd+R         →  Shader'ı yeniden derle / Force recompile
Cmd+E         →  Export menüsü / Export menu
Cmd+P         →  Play / Pause
F11           →  Tam ekran önizleme / Fullscreen preview
Esc           →  Modal kapat / Close modals
```

---

## ✦ Standard Uniforms

Her shader'da otomatik olarak mevcut. / Available in every shader automatically.

```glsl
uniform float     u_time;        // Elapsed time in seconds
uniform vec2      u_resolution;  // Canvas size in pixels
uniform vec2      u_mouse;       // Mouse position (0–1)
uniform vec2      u_mouse_delta; // Smooth mouse delta
uniform int       u_frame;       // Frame counter
uniform float     u_dpr;         // Device pixel ratio

// Sensor inputs (when enabled)
uniform float     u_audio_low;   // Bass level (0–1)
uniform float     u_audio_mid;   // Mid level (0–1)
uniform float     u_audio_high;  // Treble level (0–1)
uniform sampler2D u_audio_tex;   // Full FFT spectrum (256×1)
uniform sampler2D u_camera;      // Live webcam feed
uniform sampler2D u_texture_0;   // Uploaded texture slot 0
uniform sampler2D u_texture_1;   // Uploaded texture slot 1
uniform sampler2D u_texture_2;   // Uploaded texture slot 2
uniform sampler2D u_texture_3;   // Uploaded texture slot 3
```

**Custom uniform sliders — otomatik algılanır / auto-detected:**

```glsl
uniform float my_speed; // @min: 0, @max: 5, @step: 0.1
uniform vec3  my_color; // @min: 0, @max: 1
```

---

## 🛠️ Teknoloji Yığını / Tech Stack

```
Çerçeve / Framework   →  Next.js 14 App Router
Dil / Language        →  TypeScript (strict)
3D / WebGL            →  Three.js + React Three Fiber
Editör / Editor       →  Monaco Editor (GLSL dil desteği / language support)
AI                    →  Anthropic Claude Sonnet (streaming, edge runtime)
Stil / Styling        →  Tailwind CSS v3 + CSS Custom Properties
Durum / State         →  Zustand (5 store, devtools)
Yerel Depo / Storage  →  IndexedDB via Dexie + 30s autosave
Bulut / Cloud         →  Vercel KV (sharing + gallery)
Animasyon             →  Framer Motion
Ses / Audio           →  Web Audio API (FFT analysis)
Deploy                →  Vercel (fra1 region)
```

---

## 🚀 Kurulum / Getting Started

### Önkoşullar / Prerequisites

- Node.js `>= 20`
- pnpm

### Yerel Geliştirme / Local Development

```bash
# Repoyu klonla / Clone the repo
git clone https://github.com/kutluhangil/fragment
cd fragment

# Bağımlılıkları yükle / Install dependencies
pnpm install

# Ortam değişkenlerini ayarla / Set up environment variables
cp .env.local.example .env.local
# .env.local içine ANTHROPIC_API_KEY ekle / Add your ANTHROPIC_API_KEY

# Geliştirme sunucusunu başlat / Start dev server
pnpm dev
```

`http://localhost:3000` aç ve shader yazmaya başla. / Open and start writing shaders.

---

## ☁️ Vercel'e Deploy / Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kutluhangil/fragment)

```bash
# CLI ile / Via CLI
npx vercel --prod
```

**Vercel dashboard'unda gerekli env değişkenleri / Required environment variables:**

| Değişken / Variable | Açıklama / Description |
|---------------------|------------------------|
| `ANTHROPIC_API_KEY` | AI co-pilot için zorunlu / Required for AI co-pilot |
| `NEXT_PUBLIC_SITE_URL` | Custom domain (örn. `https://fragment.dev`) |
| `KV_URL` | Vercel KV — opsiyonel, sharing için / Optional, for sharing |
| `KV_REST_API_URL` | Vercel KV (otomatik / auto-filled) |
| `KV_REST_API_TOKEN` | Vercel KV (otomatik / auto-filled) |

> KV olmadan da çalışır — paylaşım URL kodlamasına düşer. / Works without KV — sharing falls back to URL encoding.

---

## 📐 Proje Yapısı / Project Structure

```
fragment/
├── app/
│   ├── api/
│   │   ├── ai/modify/route.ts       # Claude Sonnet streaming endpoint (edge)
│   │   └── share/                   # Create + fetch shared shaders
│   ├── gallery/page.tsx             # Community gallery
│   ├── learn/page.tsx               # 10-lesson GLSL learning path
│   ├── s/[id]/page.tsx              # Shared shader deep-link
│   ├── globals.css                  # CSS variables — tüm design token'lar
│   ├── layout.tsx                   # Root layout (Inter + JetBrains Mono)
│   └── page.tsx                     # Ana editor sayfası / Main editor page
│
├── components/
│   ├── ai/AIModal.tsx               # AI co-pilot — streaming, quick prompts, accept/reject
│   ├── command-palette/             # Cmd+K — fuzzy search (Fuse.js)
│   ├── editor/
│   │   ├── MonacoEditor.tsx         # Monaco + GLSL dil kaydı / language registration
│   │   ├── glsl-language.ts         # Monarch tokenizer
│   │   ├── glsl-completions.ts      # 50+ GLSL autocomplete
│   │   ├── glsl-hover.ts            # Hover docs
│   │   └── glsl-theme.ts            # fragment-dark Monaco teması / theme
│   ├── export/ExportModal.tsx       # PNG / 4K / WebM export
│   ├── panels/                      # Layers · Uniforms · Inputs · Console
│   ├── preview/
│   │   ├── PreviewCanvas.tsx        # R3F Canvas container
│   │   ├── ShaderMesh.tsx           # Render loop + uniform updates + recompile
│   │   └── Viewport*.tsx            # FPS · Mode toggle · Controls overlay
│   ├── sidebar/                     # Library · My Shaders · Gallery · Docs
│   ├── topbar/                      # Logo · ShaderName · AI · Export · Share
│   └── ui/                          # Button · Tooltip · Modal · Slider · Tabs · KBD
│
├── content/
│   └── examples/index.ts            # 17 built-in shaders (beginner / intermediate / advanced)
│
├── lib/
│   ├── audio/analyser.ts            # AudioContext + FFT → 3-band levels
│   ├── export/                      # PNG · Video (MediaRecorder)
│   ├── inputs/webcam.ts             # getUserMedia → VideoTexture
│   ├── shader/                      # uniforms · compile · blend-modes · post-fx
│   ├── share/encode.ts              # Base64 URL encoding / decoding
│   └── storage/                     # Dexie schema + CRUD + 30s autosave
│
├── store/
│   ├── useEditorStore.ts            # GLSL code + compile state
│   ├── usePreviewStore.ts           # isPlaying · time · mode · mesh · FPS
│   ├── useLayersStore.ts            # Multi-layer compositor state
│   ├── useInputsStore.ts            # Audio · webcam · textures
│   └── useUIStore.ts                # Panel visibility · active tabs · modals
│
├── vercel.json                      # Edge functions + security headers
└── .env.local.example               # Örnek env dosyası / Example env file
```

---

## ✦ AI Co-pilot

FRAGMENT'in killer feature'ı. Hiçbir shader playground'da yok.

The killer feature of FRAGMENT. Available nowhere else in any shader playground.

```bash
# Örnek prompts / Example prompts:
"make it more dreamy"
"add audio reactivity"
"psychedelic colors"
"add raymarching"
"darker mood"
"smoother animation"
```

Shader'ını seç → `Cmd+Shift+A` → prompt yaz → AI modifiye eder → diff görünümünde onayla.  
Select your shader → `Cmd+Shift+A` → write a prompt → AI modifies it → approve in diff view.

---

## 🥚 Built-in Shaders

**17 örnek shader, 3 kategori. / 17 example shaders, 3 categories.**

```
BEGINNER (10)
  gradient · mouse-circle · time-color · uv-debug
  smoothstep-edge · stripes · checkerboard · polar · mix-colors · step-function

INTERMEDIATE (4)
  perlin-noise · voronoi · fbm-clouds · plasma

ADVANCED (3)
  raymarching-sphere · mandelbrot · sdf-shapes
```

Library sidebar'dan (Cmd+B) erişilebilir veya Command Palette'ten (Cmd+K) aranabilir.  
Accessible from the Library sidebar (Cmd+B) or searchable via Command Palette (Cmd+K).

---

## 🤝 İletişim / Contact

- Email: [kutluhangil@windowslive.com](mailto:kutluhangil@windowslive.com)
- LinkedIn: [Kutluhan Gil](https://www.linkedin.com/in/kutluhangil)
- GitHub: [kutluhangil](https://github.com/kutluhangil)

---

## 📄 Lisans / License

[MIT](LICENSE) — fork it, learn from it, build your own.

---

<div align="center">

_"ShaderToy'u 2026'ya taşıdım"_

<br />

Built with obsession by [kutluhangil](https://github.com/kutluhangil)

<br />

_Beğendiysen ⭐ vermeyi unutma / If you like it, don't forget to ⭐_

</div>
