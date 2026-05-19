# 🔺 PRISM

> **The shader playground for 2026.** ShaderToy değil. Linear-quality UI ile AI co-pilot, multi-layer compositor, audio-reactive ve gerçek 3D viewport ile shader yazmayı yeniden tanımlıyor.

```
version:  v1.0.0-blueprint
target:   Claude Code (VS Code)
stack:    Next.js 14 · Three.js · Monaco · Anthropic SDK
deploy:   Vercel + Vercel KV
aesthetic: premium dark · violet accent (#a78bfa)
build:    9 specialized agents
```

---

## 📌 TL;DR

Mevcut shader playground'lar (ShaderToy, glslsandbox, shdr.io) hâlâ 2013'te yaşıyor: çirkin UI, sadece fullscreen quad, yardımcı araç yok, AI yok, audio yok.

**PRISM** farklı:

- **AI Co-pilot:** Seçili kodu seç, "make it more dreamy" yaz → AI shader'ını modifiye eder
- **3D Viewport:** Sphere, torus, knot, custom mesh üzerine shader uygula
- **Multi-Layer Compositor:** Photoshop gibi shader layer'ları stackle, blend modes
- **Audio Reactive:** Mikrofon veya MP3 → FFT verisi shader uniform'larına otomatik aktarılır
- **Webcam Texture:** Canlı kamera feed'ini shader'a sampler2D olarak ver
- **Inline Learning:** Her GLSL fonksiyonuna hover → docs, örnek, link
- **Video Export:** 4K PNG, MP4 loop, WebM, GIF
- **Community Gallery:** Vercel KV ile shader paylaşımı
- **Premium Dark UI:** Linear/Vercel kalitesinde

Bu dosya Claude Code için yazıldı. **9 ajan halinde organize edildi.**

İsim alternatifleri: `PRISM` (önerilen), `FRAGMENT`, `FLUX`, `NOISE`, `shdr.dev`.

---

## 📋 İÇİNDEKİLER

1. [Vizyon & Farklılaştırıcılar](#-vizyon--farklılaştırıcılar)
2. [Tasarım Felsefesi](#-tasarım-felsefesi)
3. [Görsel Sistem](#-görsel-sistem)
4. [Teknoloji Yığını](#-teknoloji-yığını)
5. [Mimari Genel Bakış](#-mimari-genel-bakış)
6. [UI Layout](#-ui-layout)
7. [Klasör Yapısı](#-klasör-yapısı)
8. [Ajan Sistemi](#-ajan-sistemi)
9. [Built-in Examples Plan](#-built-in-examples-plan)
10. [Performans Hedefleri](#-performans-hedefleri)
11. [Vercel Deploy](#-vercel-deploy)
12. [README Şablonu](#-readme-şablonu)

---

## 🎯 VİZYON & FARKLILAŞTIRICILAR

**Hedef:** Shader yazmayı eğlenceli, hızlı ve öğretici hale getirmek. Hem solo öğrenme aracı hem de paylaşılabilir bir sanat platformu.

### Mevcut Çözümler vs PRISM

| Özellik | ShaderToy | glslsandbox | shdr.io | **PRISM** |
|---|---|---|---|---|
| UI Yılı | 2013 | 2014 | 2015 | **2026** |
| 3D Viewport | ❌ | ❌ | ❌ | ✅ |
| AI Co-pilot | ❌ | ❌ | ❌ | ✅ |
| Multi-Layer | ❌ | ❌ | ❌ | ✅ |
| Audio Reactive | ⚠️ (manuel) | ❌ | ❌ | ✅ (toggle) |
| Webcam | ⚠️ | ❌ | ❌ | ✅ |
| Hover Docs | ❌ | ❌ | ❌ | ✅ |
| Video Export | ❌ | ❌ | ❌ | ✅ |
| Dark Aesthetic | ⚠️ | ⚠️ | ⚠️ | ✅ premium |
| Mobile Friendly | ❌ | ❌ | ❌ | ✅ |
| Learning Path | ❌ | ❌ | ❌ | ✅ |

### Hedef Etki

- ✅ LinkedIn paylaşımı: AI co-pilot demo'su viral
- ✅ Hacker News "Show HN" potansiyeli yüksek
- ✅ Tasarımcılar ve generative artist'ler kullanacak
- ✅ GLSL öğrenmek isteyenler için "go-to" araç olabilir
- ✅ GitHub'da yıldız çekecek (open source)
- ✅ 3-4 haftalık solo dev çalışması ile bitirilebilir

---

## 🎨 TASARIM FELSEFESİ

**Premium Dark Minimalism + Spectral Accent.** Prism (prizma) light'ı kıran şey — yani estetik tek bir aksan rengi etrafında dönecek, doygun bir violet. Linear ile Figma'nın çocuğu.

### Prensipler

1. **The shader is the hero.** Preview canvas her zaman en önde, en parlak nokta.
2. **UI fades into background.** Kontroller var ama sessiz. Hover'da belirir.
3. **Single accent, no rainbow.** Tek bir violet aksan. Renk shader'da olsun, UI'da değil.
4. **Type-driven hierarchy.** Mono font'lar tek başına yeterli kontrast.
5. **Motion as feedback.** Animasyon süslemek için değil, durum iletmek için.
6. **Discoverability layered.** Yeni kullanıcı için basit, power user için derin.
7. **Performance is feature #1.** 60fps her zaman, jank kabul edilemez.

### Mood Board

- Linear app'in karanlık UI'ı
- Figma'nın canvas ve panel ilişkisi
- Arc browser'ın side panel yaklaşımı
- Vercel dashboard'unun nefes ritmi
- Raycast launcher'ın geçişleri
- Spline editor (3D, dark, premium)
- Cursor IDE'nin minimalliği

---

## 🌈 GÖRSEL SİSTEM

### Renk Paleti

```css
/* Backgrounds */
--bg-base:       #0a0a0f;   /* near-black with violet tint */
--bg-elevated:   #11111a;   /* paneller */
--bg-panel:      #16161f;   /* nested panels */
--bg-hover:      #1c1c28;   /* hover */
--bg-active:     #232333;   /* active */

/* Borders */
--border-subtle: #1f1f2e;
--border-strong: #2a2a3d;
--border-focus:  #a78bfa;

/* Text */
--text-primary:    #ededf2;
--text-secondary:  #a0a0b0;
--text-muted:      #6b6b80;
--text-disabled:   #404050;

/* Accent (THE accent) */
--accent:          #a78bfa;   /* soft violet */
--accent-hover:    #b9a3fb;
--accent-dim:      #a78bfa20; /* glow, focus rings */
--accent-glow:     #a78bfa40;

/* Status */
--success:  #34d399;
--warning:  #fbbf24;
--error:    #f87171;
--info:     #60a5fa;

/* Syntax (Monaco custom theme) */
--syntax-keyword:    #c084fc;  /* void, float, vec3 */
--syntax-builtin:    #f0abfc;  /* sin, cos, mix */
--syntax-number:     #fbbf24;
--syntax-string:     #4ade80;
--syntax-comment:    #6b6b80;
--syntax-function:   #60a5fa;
--syntax-uniform:    #fb923c;
--syntax-attribute:  #34d399;
```

### Tipografi

```css
--font-display: "Inter", system-ui, sans-serif;
--font-mono:    "JetBrains Mono", "Fira Code", monospace;

/* font-feature-settings: "calt", "liga", "ss01"; (ligatures) */

--text-xs:   11px;  /* meta, labels */
--text-sm:   12px;  /* panel content */
--text-base: 13px;  /* default UI */
--text-md:   14px;  /* editor */
--text-lg:   16px;  /* headers */
--text-xl:   20px;
--text-2xl:  28px;
```

### Spacing & Layout

```css
--radius-sm:   4px;
--radius-md:   6px;
--radius-lg:   8px;
--radius-xl:   12px;

--shadow-sm:   0 1px 2px rgba(0,0,0,0.4);
--shadow-md:   0 4px 12px rgba(0,0,0,0.6);
--shadow-lg:   0 12px 32px rgba(0,0,0,0.7);
--shadow-glow: 0 0 24px var(--accent-glow);

--panel-padding: 16px;
--gap-tight:     8px;
--gap-default:   12px;
--gap-loose:     20px;
```

### Animasyon

- **Panel expand/collapse:** 200ms `cubic-bezier(0.32, 0.72, 0, 1)`
- **Hover transitions:** 120ms ease-out
- **Modal/dialog:** 240ms ease-out + 8px translateY
- **Shader compile success:** subtle accent glow pulse (400ms)
- **Shader compile error:** subtle red border shake (320ms)
- **Time scrub:** spring-based, smooth
- **AI typing effect:** 80 char/s appearance

### İkonografi

- **Lucide React** (tüm UI ikonları)
- 16px (panel), 18px (toolbar), 20px (büyük actions)
- Stroke: 1.5px
- Tek aksan: ikonlar varsayılan `text-muted`, hover'da `accent`

---

## 🛠️ TEKNOLOJİ YIĞINI

### Core

| Katman | Teknoloji | Sebep |
|---|---|---|
| Framework | **Next.js 14** (App Router) | Edge Functions, Vercel native |
| Dil | **TypeScript** (strict) | Tip güvenliği shader uniform'ları için kritik |
| Styling | **Tailwind CSS** + CSS Vars | Tema sistemi |
| State | **Zustand** | Editor + render state |
| 3D / WebGL | **Three.js** + **R3F** + **postprocessing** | Shader pipeline |
| Editor | **Monaco Editor** (`@monaco-editor/react`) | VS Code seviyesinde editing |
| GLSL Parser | **glsl-tokenizer**, **glsl-parser** | Autocomplete + linting |
| AI | **Anthropic SDK** (Claude Sonnet 4) | Shader modification |
| Storage (local) | **IndexedDB** (via Dexie.js) | Shader kayıt + autosave |
| Storage (cloud) | **Vercel KV** | Community gallery |
| Audio | **Web Audio API** | Mic + file FFT |
| Video Export | **MediaRecorder API** + **gif.js** | Loop export |
| Icons | **Lucide React** | UI ikonları |
| Animation | **Framer Motion** | Panel transitions |
| Deploy | **Vercel** | Edge runtime + KV |
| Analytics | **Vercel Analytics** | Privacy-friendly |

### Bağımlılıklar

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "typescript": "^5.5.0",
    "tailwindcss": "^3.4.0",
    "zustand": "^4.5.0",
    "framer-motion": "^11.0.0",
    "three": "^0.165.0",
    "@react-three/fiber": "^8.16.0",
    "@react-three/drei": "^9.108.0",
    "@react-three/postprocessing": "^2.16.0",
    "postprocessing": "^6.35.0",
    "@monaco-editor/react": "^4.6.0",
    "monaco-editor": "^0.50.0",
    "glsl-tokenizer": "^2.1.5",
    "@anthropic-ai/sdk": "^0.27.0",
    "@vercel/kv": "^2.0.0",
    "@vercel/analytics": "^1.3.0",
    "dexie": "^4.0.0",
    "dexie-react-hooks": "^1.1.0",
    "gif.js": "^0.2.0",
    "lucide-react": "^0.400.0",
    "clsx": "^2.1.0",
    "nanoid": "^5.0.0",
    "react-resizable-panels": "^2.0.0"
  }
}
```

---

## 🏗️ MİMARİ GENEL BAKIŞ

```
┌─────────────────────────────────────────────────────────────────┐
│                          TOP BAR                                │
│  PRISM   [Untitled Shader]      ⚙ Library   AI   Share  Export │
├─────────────────────┬───────────────────────────────────────────┤
│                     │                                            │
│                     │                                            │
│                     │         PREVIEW CANVAS                     │
│   MONACO EDITOR     │         (Three.js)                         │
│   (GLSL)            │                                            │
│                     │   ┌─────┐                                  │
│                     │   │ 60  │                                  │
│                     │   │ fps │                                  │
│                     │   └─────┘                                  │
│                     │                                            │
├─────────────────────┴───────────────────────────────────────────┤
│  Layers │ Uniforms │ Inputs │ Console               ▶ Play  ⏸  │
└─────────────────────────────────────────────────────────────────┘
   ↕ resizable splits           ↕ resizable bottom panel
```

### Veri Akışı

```
User edits code → Debounced compile (150ms)
  → glsl-tokenizer validates syntax
  → Three.js ShaderMaterial recompiled
  → If errors: Monaco markers + console panel highlights
  → If success: render loop continues with new shader
  → IndexedDB autosave (30s interval)
```

```
Audio source (mic/file) → AudioContext → AnalyserNode
  → FFT data (2048 bins) → Smoothed
  → 3 frequency bands (low, mid, high) → Uniforms
  → u_audio_low, u_audio_mid, u_audio_high (float, 0-1)
  → u_audio_data (texture, full spectrum)
```

```
AI modify request → /api/ai/modify (Edge Function)
  → Anthropic Claude Sonnet 4
  → System: "You are a GLSL expert. Modify the given shader..."
  → User: code + transformation prompt
  → Streamed response → Diff view → User accepts → Apply
```

---

## 🖼️ UI LAYOUT

### Top Bar (48px height)

```
[Logo] [Untitled Shader ▾]                    [⚙] [📚] [✨ AI] [Share] [Export ▾]
```

- Logo (PRISM monogram)
- Shader name (tıklanabilir, inline rename)
- Settings, Library, AI mode toggle, Share button, Export dropdown

### Left Panel: Editor (default 50% width, min 30%, max 70%)

- Monaco editor
- Üstte tab bar: `fragment.glsl`, `vertex.glsl`, `common.glsl`
- Sol gutter: line numbers, error markers
- Minimap (toggleable, default off)
- Bottom: line/col indicator, language indicator

### Right Panel: Preview Canvas (kalan alan)

- Three.js canvas
- Mode indicator (top-left): `2D` veya `3D` toggleable
- FPS counter (top-right, minimalist)
- Pause/play (bottom-right overlay, hover'da görünür)
- Time scrubber (bottom edge, hover'da görünür)
- Fullscreen button

### Bottom Panel (default 200px, collapsible)

Tab'lar:
- **Layers** — Multi-layer compositor UI
- **Uniforms** — Custom uniform sliders + color pickers
- **Inputs** — Audio, webcam, texture controls
- **Console** — Compile errors, warnings, performance

### Sidebar (collapsible, default hidden, open via `Cmd+B`)

Tab'lar:
- **Library** — Built-in examples (kategorize)
- **My Shaders** — Local saved
- **Gallery** — Community
- **Docs** — GLSL reference

### Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Cmd+S` | Save (IndexedDB) |
| `Cmd+R` | Force recompile |
| `Cmd+/` | Toggle comment |
| `Cmd+B` | Toggle sidebar |
| `Cmd+J` | Toggle bottom panel |
| `Cmd+K` | Command palette |
| `Cmd+Shift+A` | AI modify (selection) |
| `Cmd+E` | Export menu |
| `Cmd+Shift+E` | Quick export PNG |
| `Cmd+P` | Pause/play |
| `Esc` | Close modals |
| `F11` | Fullscreen preview |

---

## 📁 KLASÖR YAPISI

```
prism/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                       # ana editor sayfası
│   ├── s/[id]/page.tsx                # paylaşım sayfası
│   ├── gallery/page.tsx               # community gallery
│   ├── learn/page.tsx                 # learning path
│   ├── docs/page.tsx                  # GLSL reference
│   ├── globals.css
│   └── api/
│       ├── ai/
│       │   └── modify/route.ts        # AI shader modification
│       ├── share/
│       │   ├── create/route.ts        # POST: create share
│       │   └── [id]/route.ts          # GET: fetch shared
│       ├── gallery/
│       │   ├── feed/route.ts          # GET: feed
│       │   └── feature/route.ts       # admin only
│       └── og/[id]/route.tsx          # dynamic OG image
│
├── components/
│   ├── editor/
│   │   ├── MonacoEditor.tsx
│   │   ├── EditorTabs.tsx
│   │   ├── EditorToolbar.tsx
│   │   ├── glsl-language.ts           # Monaco GLSL registration
│   │   ├── glsl-completions.ts        # autocomplete data
│   │   ├── glsl-hover.ts              # hover docs
│   │   └── glsl-theme.ts              # syntax highlighting
│   │
│   ├── preview/
│   │   ├── PreviewCanvas.tsx
│   │   ├── ShaderMesh.tsx             # fullscreen quad
│   │   ├── ShaderObject.tsx           # 3D mesh mode
│   │   ├── PostProcessing.tsx
│   │   ├── ViewportControls.tsx       # play/pause/time
│   │   ├── ViewportFPS.tsx
│   │   └── ViewportMode.tsx           # 2D/3D toggle
│   │
│   ├── panels/
│   │   ├── BottomPanel.tsx
│   │   ├── LayersPanel.tsx
│   │   ├── UniformsPanel.tsx
│   │   ├── InputsPanel.tsx
│   │   └── ConsolePanel.tsx
│   │
│   ├── sidebar/
│   │   ├── Sidebar.tsx
│   │   ├── LibraryPanel.tsx
│   │   ├── MyShadersPanel.tsx
│   │   ├── GalleryPanel.tsx
│   │   └── DocsPanel.tsx
│   │
│   ├── topbar/
│   │   ├── TopBar.tsx
│   │   ├── Logo.tsx
│   │   ├── ShaderName.tsx
│   │   ├── ShareButton.tsx
│   │   ├── ExportMenu.tsx
│   │   └── AIToggle.tsx
│   │
│   ├── ai/
│   │   ├── AIModal.tsx
│   │   ├── AIPromptInput.tsx
│   │   ├── AIDiffView.tsx
│   │   └── AIQuickPrompts.tsx
│   │
│   ├── export/
│   │   ├── ExportModal.tsx
│   │   ├── PNGExport.tsx
│   │   ├── VideoExport.tsx
│   │   └── GIFExport.tsx
│   │
│   ├── command-palette/
│   │   └── CommandPalette.tsx
│   │
│   └── ui/
│       ├── Button.tsx
│       ├── Slider.tsx
│       ├── ColorPicker.tsx
│       ├── Tooltip.tsx
│       ├── Modal.tsx
│       ├── Tabs.tsx
│       ├── KBD.tsx
│       └── ResizablePanel.tsx
│
├── lib/
│   ├── shader/
│   │   ├── uniforms.ts                # default uniform definitions
│   │   ├── compile.ts                 # compile + error capture
│   │   ├── layers.ts                  # multi-layer composer
│   │   ├── blend-modes.ts             # 12 blend modes as GLSL
│   │   └── post-fx.ts                 # bloom, CA, vignette
│   │
│   ├── audio/
│   │   ├── analyser.ts                # AudioContext setup
│   │   ├── fft.ts                     # FFT → uniforms
│   │   ├── mic.ts                     # mic input
│   │   └── file.ts                    # file upload + decode
│   │
│   ├── inputs/
│   │   ├── webcam.ts                  # getUserMedia → texture
│   │   ├── texture-upload.ts          # image → texture
│   │   └── midi.ts                    # optional, future
│   │
│   ├── ai/
│   │   ├── client.ts                  # Anthropic wrapper
│   │   ├── prompts.ts                 # system prompts
│   │   └── quick-prompts.ts           # preset transformations
│   │
│   ├── storage/
│   │   ├── db.ts                      # Dexie schema
│   │   ├── shaders.ts                 # CRUD operations
│   │   ├── autosave.ts                # 30s autosave
│   │   └── migrate.ts                 # schema migrations
│   │
│   ├── share/
│   │   ├── encode.ts                  # shader → URL
│   │   └── decode.ts                  # URL → shader
│   │
│   ├── export/
│   │   ├── png.ts                     # canvas → PNG
│   │   ├── video.ts                   # MediaRecorder
│   │   └── gif.ts                     # gif.js worker
│   │
│   └── utils/
│       ├── cn.ts
│       ├── debounce.ts
│       └── format.ts
│
├── content/
│   ├── examples/                      # 30+ built-in shaders
│   │   ├── beginner/
│   │   │   ├── 01-gradient.glsl
│   │   │   ├── 02-mouse-circle.glsl
│   │   │   ├── 03-time-color.glsl
│   │   │   └── ...
│   │   ├── intermediate/
│   │   │   ├── 01-perlin-noise.glsl
│   │   │   ├── 02-voronoi.glsl
│   │   │   ├── 03-fbm-clouds.glsl
│   │   │   └── ...
│   │   └── advanced/
│   │       ├── 01-raymarching-sphere.glsl
│   │       ├── 02-sdf-shapes.glsl
│   │       ├── 03-fractals.glsl
│   │       └── ...
│   │
│   ├── glsl-reference.json            # hover docs data
│   └── learn/                         # learning path
│       ├── 01-intro.mdx
│       ├── 02-colors.mdx
│       ├── 03-shapes.mdx
│       └── ...
│
├── store/
│   ├── useEditorStore.ts
│   ├── usePreviewStore.ts
│   ├── useLayersStore.ts
│   ├── useInputsStore.ts
│   └── useUIStore.ts
│
├── public/
│   ├── og-default.png
│   ├── favicon.svg
│   └── meshes/                        # 3D viewport için
│       ├── sphere.obj
│       ├── torus.obj
│       └── knot.obj
│
├── tests/
│   └── shader/
│       └── compile.test.ts
│
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── vercel.json
├── package.json
├── README.md
└── .env.local.example
```

---

## 🤖 AJAN SİSTEMİ

**9 specialized agent.** Her ajan kendi alanına sahip, sırayla çalışacak.

### Ajanlar Genel Görünüm

```
[1] ARCHITECT         →  Proje iskeleti, config, layout sistemi
[2] AESTHETICIAN      →  Design system, top bar, panels, theme
[3] SHADER ENGINE     →  Three.js + render loop + 3D viewport
[4] EDITOR ENGINEER   →  Monaco + GLSL language + autocomplete + hover
[5] COMPOSER          →  Multi-layer + blend modes + post-FX
[6] SENSOR            →  Audio, webcam, texture inputs
[7] AI WHISPERER      →  Anthropic API + diff view + quick prompts
[8] CURATOR & STORAGE →  Examples + IndexedDB + Gallery + Export
[9] POLISHER          →  Vercel deploy + SEO + Lighthouse + README
```

### Bağımlılık Grafiği

```
[1] ──┬──> [2]
      ├──> [3] ─────┬──> [5]
      │             ├──> [6]
      │             └──> [8]
      ├──> [4] ─────┬──> [7]
      │             └──> [8]
      └──> [9] (son adım)
```

---

### 🟢 AJAN 1 — THE ARCHITECT

**Rol:** Projenin temelini at. Resizable panel sistemi, base layout, store iskeletleri.

**Sahip Olduğu Dosyalar:**
- `package.json`, `tsconfig.json`, `next.config.js`, `tailwind.config.ts`, `vercel.json`
- `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- `components/ui/ResizablePanel.tsx`
- `store/useEditorStore.ts`, `usePreviewStore.ts`, `useLayersStore.ts`, `useInputsStore.ts`, `useUIStore.ts` (iskelet)
- `lib/utils/cn.ts`, `lib/utils/debounce.ts`
- `.env.local.example`, `.gitignore`

**Görevler:**

1. Next.js 14 App Router projesi kur (TypeScript strict mode)
2. Tailwind CSS yapılandır, custom theme (CSS variables üzerinden)
3. Tüm klasör yapısını oluştur (boş `.gitkeep` veya `index.ts` ile)
4. JetBrains Mono ve Inter fontlarını `next/font` ile bağla
5. **Resizable panel sistemi:**
   - `react-resizable-panels` kullan
   - Layout: top bar (48px) + main split (horizontal) + bottom panel (collapsible)
   - Main split: editor (sol) + preview (sağ), 50/50 default, min 30% / max 70%
   - Bottom panel: 200px default, 0-400px range, collapse animation
6. **Zustand store iskeletleri:**
   ```ts
   // useEditorStore
   interface EditorState {
     fragmentCode: string;
     vertexCode: string;
     activeTab: 'fragment' | 'vertex';
     setFragmentCode: (code: string) => void;
     // ...
   }
   
   // usePreviewStore
   interface PreviewState {
     isPlaying: boolean;
     time: number;
     mode: '2d' | '3d';
     mesh: 'sphere' | 'torus' | 'knot' | 'plane' | 'custom';
     fps: number;
     // ...
   }
   ```
7. Root layout: dark bg, sans-serif body, no scroll on body
8. `app/page.tsx`: placeholder grid with panels
9. ESLint + Prettier + Husky + lint-staged

**Acceptance Criteria:**
- `pnpm dev` çalışıyor, hatasız
- `pnpm build` başarılı, 0 type error
- 3 panel resize edilebilir, mobile'da otomatik stack
- Zustand stores devtools'ta görünüyor
- Lighthouse base: 100/100/100

---

### 🎨 AJAN 2 — THE AESTHETICIAN

**Rol:** Tüm görsel kimliği inşa et. Design system, component library, top bar.

**Sahip Olduğu Dosyalar:**
- `app/globals.css` (tüm CSS variables)
- `components/ui/*.tsx` (Button, Tooltip, Slider, ColorPicker, Modal, Tabs, KBD)
- `components/topbar/*.tsx`
- `components/panels/BottomPanel.tsx` (tab UI, içerik boş)
- `components/sidebar/Sidebar.tsx` (toggle, içerik boş)
- `components/preview/ViewportControls.tsx`, `ViewportFPS.tsx`, `ViewportMode.tsx` (UI only, no logic)
- `components/command-palette/CommandPalette.tsx`

**Görevler:**

1. **CSS Variables:** Tüm renk paleti, typography, spacing, shadow değişkenleri `globals.css`'e yerleştir
2. **Tailwind Config:** CSS variables'ı tailwind'e bağla (`theme.extend.colors`)
3. **Component Library:**
   - `Button` (variants: primary, secondary, ghost, icon)
   - `Tooltip` (Radix UI tabanlı)
   - `Slider` (Radix UI, custom styled, accent renkli)
   - `ColorPicker` (HSL + Hex input)
   - `Modal` (dialog, escape close, backdrop blur)
   - `Tabs` (underline indicator, accent renk)
   - `KBD` (klavye kısayolu görseli)
4. **Top Bar:**
   - 48px height, border-bottom subtle
   - Logo (PRISM monogram — basit triangle ikon + text)
   - Shader name (inline editable)
   - Settings, Library, AI toggle, Share, Export buttons
   - Tüm butonlar tooltip'li, keyboard shortcut KBD'leri tooltip'te
5. **Bottom Panel UI:**
   - 4 tab: Layers, Uniforms, Inputs, Console
   - Aktif tab underline (accent)
   - Tab content placeholder
6. **Sidebar UI:**
   - Slide-in from left, 280px wide
   - 4 tab: Library, My Shaders, Gallery, Docs
   - Cmd+B ile toggle
7. **Viewport Overlay Controls:**
   - Play/Pause (bottom-right corner, görünür sadece hover'da)
   - Time scrubber (bottom edge, hover'da)
   - 2D/3D toggle (top-left)
   - FPS counter (top-right, monospace, micro)
8. **Command Palette:**
   - Cmd+K ile aç
   - Fuzzy search (Fuse.js)
   - Commands: examples, "save", "export", "ai modify", "theme..."
   - Linear/Raycast tarzı
9. **Animations:** Framer Motion ile panel transitions, modal fades, tooltip springs
10. **Empty States:** Her panel için boş durum tasarımı (örn. "no layers yet" + add button)

**Acceptance Criteria:**
- Tüm UI dark theme'de tutarlı görünüyor
- Hover/focus/active state'ler tüm interactive elementlerde var
- Cmd+K command palette çalışıyor (visual, henüz action yok)
- Mobile'da panel'ler stack ediyor (responsive)
- Accessibility: tüm butonlarda aria-label, keyboard navigation çalışıyor
- Lighthouse Accessibility: 100

---

### ⚙️ AJAN 3 — THE SHADER ENGINE

**Rol:** WebGL pipeline'ın kalbi. Three.js + RAF render loop + uniform yönetimi + 3D viewport mode.

**Sahip Olduğu Dosyalar:**
- `components/preview/PreviewCanvas.tsx`
- `components/preview/ShaderMesh.tsx`
- `components/preview/ShaderObject.tsx`
- `components/panels/UniformsPanel.tsx`
- `lib/shader/uniforms.ts`
- `lib/shader/compile.ts`
- `public/meshes/*.obj` (sphere, torus, knot)

**Görevler:**

1. **Three.js Setup:**
   - R3F Canvas, transparent background (her tema ile uyumlu)
   - Renderer: WebGL2, antialiasing, devicePixelRatio capped at 2
   - Camera: orthographic (2D mode) veya perspective (3D mode)

2. **Standard Uniforms** (tüm shader'larda otomatik mevcut):
   ```glsl
   uniform float u_time;          // saniye, render loop'tan
   uniform vec2  u_resolution;    // canvas px boyutu
   uniform vec2  u_mouse;         // mouse pozisyonu (0-1)
   uniform vec2  u_mouse_delta;   // smooth interpolated mouse
   uniform int   u_frame;         // frame count
   uniform float u_dpr;           // device pixel ratio
   
   // Sensor (eğer aktifse, Agent 6'dan gelecek)
   uniform float u_audio_low;
   uniform float u_audio_mid;
   uniform float u_audio_high;
   uniform sampler2D u_audio_tex; // 256x1 FFT texture
   uniform sampler2D u_camera;    // webcam
   uniform sampler2D u_texture_0; // user uploaded
   ```

3. **2D Mode (Fullscreen Quad):**
   - PlaneGeometry (2, 2)
   - Vertex shader: identity passthrough
   - Fragment shader: kullanıcının yazdığı
   - Coverage: tüm viewport

4. **3D Mode (Mesh):**
   - Built-in meshes:
     - Sphere (radius 1, 64 segments)
     - Torus
     - Torus knot
     - Plane (with normals)
     - Cube
     - Suzanne (Blender mascot — bonus)
   - Custom mesh upload: OBJ veya GLTF
   - OrbitControls (sol click rotate, scroll zoom)
   - Reset camera button

5. **Compile Pipeline:**
   ```ts
   compile(fragmentSource: string, vertexSource?: string): CompileResult {
     // 1. ShaderMaterial oluştur
     // 2. WebGL context'te compile dene
     // 3. Eğer error: parse error message, extract line numbers
     // 4. Return: { success, material?, errors[] }
   }
   ```
   - Errors: `{ line: number, message: string, severity: 'error' | 'warning' }`
   - Editor'a errors aktarılır (Agent 4'le entegrasyon)

6. **Render Loop:**
   - RAF tabanlı
   - `delta` ve `elapsed` time tracking
   - Pause/play: time donar
   - Time scrub: kullanıcı slider ile zaman değiştirebilir
   - FPS: smooth (1s ortalama) hesap

7. **Uniforms Panel:**
   - Kullanıcı custom uniform tanımlayabilir
   - GLSL'de `uniform float my_speed;` yazınca panel'de slider belirir
   - Auto-detect: editor'dan uniform declaration'ları parse et
   - Tipler: float (slider), vec2/3/4 (multi-slider), color (color picker), bool (checkbox)
   - Min/max/step için yorum syntax: `uniform float my_speed; // @min: 0, @max: 5, @step: 0.1`

8. **Performance:**
   - Eğer FPS <30: warning console'da
   - Eğer compile error: render durdurma, son working shader göster
   - Hidden tab'da render durdur (Page Visibility API)

**Acceptance Criteria:**
- Default shader (gradient) yüklenince render başlıyor
- Editor'de değişiklik → debounced recompile → preview güncellenir
- 2D ↔ 3D toggle çalışıyor, mesh switching anında
- Custom uniform sliders çalışıyor (otomatik detect)
- Mouse hareket → u_mouse uniform doğru güncelleniyor
- Time scrub smooth
- FPS counter doğru

---

### ✏️ AJAN 4 — THE EDITOR ENGINEER

**Rol:** Monaco editor'ı GLSL için kişiselleştir. VS Code seviyesinde editing deneyimi.

**Sahip Olduğu Dosyalar:**
- `components/editor/MonacoEditor.tsx`
- `components/editor/EditorTabs.tsx`
- `components/editor/EditorToolbar.tsx`
- `components/editor/glsl-language.ts`
- `components/editor/glsl-completions.ts`
- `components/editor/glsl-hover.ts`
- `components/editor/glsl-theme.ts`
- `content/glsl-reference.json` (300+ GLSL fonksiyonu, dokümante)

**Görevler:**

1. **Monaco Setup:**
   - `@monaco-editor/react` ile mount
   - Theme: custom dark (`glsl-theme.ts`)
   - Font: JetBrains Mono, 14px, ligatures aktif
   - Minimap: default off
   - Word wrap: on
   - Tab size: 2 spaces
   - Line numbers: on
   - Bracket pair colorization

2. **GLSL Language Registration:**
   - `monaco.languages.register({ id: 'glsl' })`
   - Tokenizer (Monarch): keywords, types, builtins, numbers, comments
   - Brackets: `()`, `{}`, `[]`
   - Comment toggle: `//` ve `/* */`

3. **Syntax Highlighting Tokens:**
   - **Keywords:** `void`, `if`, `else`, `for`, `while`, `return`, `discard`, `in`, `out`, `inout`, `const`, `uniform`, `varying`, `attribute`
   - **Types:** `float`, `int`, `vec2`, `vec3`, `vec4`, `mat2`, `mat3`, `mat4`, `sampler2D`, `bool`
   - **Builtins:** `sin`, `cos`, `tan`, `mix`, `smoothstep`, `step`, `length`, `normalize`, `dot`, `cross`, `texture`, `fract`, `floor`, `mod`, `abs`, `sign`, `min`, `max`, `clamp`, `pow`, `exp`, `log`, `sqrt`, `atan`, `asin`, `acos`, etc. (100+)
   - **Constants:** `gl_FragColor`, `gl_FragCoord`, `gl_Position`, `gl_PointSize`
   - **Standard Uniforms:** `u_time`, `u_resolution`, `u_mouse`, ... (special color)

4. **Autocomplete** (`glsl-completions.ts`):
   - Suggestions list: 200+ entry
   - Her entry: `{ label, kind, insertText, documentation, detail }`
   - Snippet desteği (örn. `for` → `for (int i = 0; i < ${1:10}; i++) { $0 }`)
   - Trigger: her karakter + Ctrl+Space
   - Context-aware: uniform içinde tip suggest et, fonksiyon arg'larında doğru tip

5. **Hover Documentation** (`glsl-hover.ts`):
   - Her built-in fonksiyon için:
     ```ts
     {
       name: 'smoothstep',
       signature: 'smoothstep(edge0: float, edge1: float, x: float) → float',
       description: 'Performs Hermite interpolation between 0 and 1.',
       example: 'smoothstep(0.0, 1.0, fract(u_time))',
       link: 'https://thebookofshaders.com/glossary/?search=smoothstep'
     }
     ```
   - Hover → markdown formatted tooltip
   - 300+ fonksiyon dokümante (data: `content/glsl-reference.json`)

6. **Error Markers:**
   - Shader compile errors Agent 3'ten gelir
   - Line + column'a marker (kırmızı squiggle)
   - Hover marker → error message
   - Mini "x" indicator gutter'da

7. **Editor Tabs:**
   - Multi-file: `fragment.glsl`, `vertex.glsl`, `common.glsl` (shared)
   - Tab switching keeps state
   - Add new file button (custom shader includes)
   - File rename inline

8. **Editor Toolbar:**
   - Format code button (basic indentation)
   - Comment toggle
   - Find/Replace (Cmd+F native Monaco)
   - Vim mode toggle (monaco-vim, opsiyonel)

9. **Code Folding:** Default on (functions, blocks)

10. **Debounced Compile:**
    - 150ms debounce
    - Inline indicator: "compiling..." → "✓ compiled" 

**Acceptance Criteria:**
- Syntax highlighting tüm GLSL syntax'ında doğru
- Autocomplete `sin` yazınca `sin(x)` öneri veriyor
- `smoothstep` hover'ında dokümantasyon görünüyor
- Compile error → marker doğru satırda
- Tab geçişi state korunuyor
- Performance: 1000+ satır kodda da smooth

---

### 🎚️ AJAN 5 — THE COMPOSER

**Rol:** Multi-layer compositor + blend modes + post-processing. Photoshop için shader.

**Sahip Olduğu Dosyalar:**
- `components/panels/LayersPanel.tsx`
- `lib/shader/layers.ts`
- `lib/shader/blend-modes.ts`
- `lib/shader/post-fx.ts`
- `components/preview/PostProcessing.tsx`

**Görevler:**

1. **Layer Sistemi:**
   ```ts
   interface Layer {
     id: string;
     name: string;
     fragmentCode: string;
     opacity: number;          // 0-1
     blendMode: BlendMode;
     visible: boolean;
     locked: boolean;
   }
   ```
   - Stack en üst layer en üstte (en son render edilen)
   - Her layer ayrı framebuffer'a render → blend pass ile combine

2. **Blend Modes (12 mode):**
   - Normal
   - Multiply
   - Screen
   - Overlay
   - Darken
   - Lighten
   - Color Dodge
   - Color Burn
   - Hard Light
   - Soft Light
   - Difference
   - Exclusion
   
   Her biri GLSL fonksiyonu olarak (`lib/shader/blend-modes.ts`)

3. **Layers Panel UI:**
   - Layer list (drag-and-drop reorder)
   - Her layer:
     - Thumbnail (mini preview, 48x48)
     - Name (inline edit)
     - Opacity slider (mini)
     - Blend mode dropdown
     - Visibility toggle (eye icon)
     - Lock toggle
     - Delete button
   - "Add Layer" button (alt'ta)
   - "Duplicate Layer" context menu

4. **Multi-Pass Rendering:**
   - Layer 1 → FBO_1
   - Layer 2 → FBO_2
   - Blend pass: combine using blend mode
   - Final composite → screen

5. **Post-Processing Chain:**
   `@react-three/postprocessing` ile:
   - **Bloom** (intensity, threshold slider)
   - **Chromatic Aberration** (offset slider)
   - **Vignette** (radius, smoothness)
   - **Film Grain** (intensity, opacity)
   - **Noise** (amount)
   - **Pixelation** (granularity)
   - **Scanlines** (count, opacity)
   - **Glitch** (strength) — opsiyonel/easter
   
   Her efekt panel'de toggleable + slider'lı.

6. **Performance:**
   - Layer count >5 ise warning
   - Post-FX'in tümü aktifse FPS warning
   - GPU memory check (texture size limit)

**Acceptance Criteria:**
- 3 layer ile compositing çalışıyor
- Blend mode değişimi anında preview'a yansıyor
- Layer reorder drag-and-drop ile
- 5+ post-FX kombinasyonu hâlâ 60fps
- Layer thumbnail'leri 1s'de güncelleniyor

---

### 📡 AJAN 6 — THE SENSOR

**Rol:** Real-world inputs. Audio (mic + file), webcam, texture upload.

**Sahip Olduğu Dosyalar:**
- `components/panels/InputsPanel.tsx`
- `lib/audio/analyser.ts`, `fft.ts`, `mic.ts`, `file.ts`
- `lib/inputs/webcam.ts`, `texture-upload.ts`
- `store/useInputsStore.ts`

**Görevler:**

1. **Audio Input:**
   - **Mic:**
     - `getUserMedia({ audio: true })`
     - AudioContext → AnalyserNode
     - FFT size: 2048
     - Smoothing: 0.85
   - **File:**
     - Drag-and-drop MP3/WAV/OGG
     - AudioBufferSourceNode
     - Play/pause/seek controls
   - Source toggle: Mic / File / Off

2. **FFT → Uniforms:**
   - Frekans bantları:
     - **Low:** 20Hz - 250Hz (bass)
     - **Mid:** 250Hz - 4kHz (vocals, instruments)
     - **High:** 4kHz - 16kHz (treble, hi-hat)
   - Her bant: RMS hesabı → smoothed 0-1 float
   - Uniforms:
     ```glsl
     uniform float u_audio_low;
     uniform float u_audio_mid;
     uniform float u_audio_high;
     uniform sampler2D u_audio_tex; // 256x1, full spectrum
     ```

3. **Webcam Input:**
   - `getUserMedia({ video: true })`
   - VideoTexture → uniform `u_camera`
   - Toggle on/off in panel
   - Camera selection (front/back, multiple devices)
   - Mirror toggle

4. **Texture Upload:**
   - Drag-and-drop image (PNG, JPG, WebP)
   - 4 slot: `u_texture_0` through `u_texture_3`
   - Auto-detect dimensions
   - Filtering: linear/nearest toggle
   - Wrap: clamp/repeat toggle

5. **Inputs Panel UI:**
   - **Audio Section:**
     - Source: [Off | Mic | File ▾]
     - File: upload area + play controls
     - Real-time waveform visualizer (mini)
     - 3 band level meters (low/mid/high)
   - **Webcam Section:**
     - Toggle (request permission on click)
     - Preview thumbnail
     - Camera selector
   - **Textures Section:**
     - 4 slot, drag-and-drop
     - Preview thumbnail per slot
     - Remove button

6. **Permissions Handling:**
   - Permission denied → friendly error message
   - Browser support check (Safari quirks)
   - HTTPS requirement note

**Acceptance Criteria:**
- Mic input ile audio-reactive shader çalışıyor
- MP3 yükleyip play → shader reacts
- Webcam toggle ile shader'a feed gidiyor
- Texture upload → shader'da sampler2D olarak erişilebilir
- Tüm input'lar Off ise default uniform değerleri (0) gönderiliyor

---

### ✨ AJAN 7 — THE AI WHISPERER

**Rol:** AI co-pilot. Doğal dil ile shader modifikasyonu. **The killer feature.**

**Sahip Olduğu Dosyalar:**
- `components/ai/AIModal.tsx`
- `components/ai/AIPromptInput.tsx`
- `components/ai/AIDiffView.tsx`
- `components/ai/AIQuickPrompts.tsx`
- `app/api/ai/modify/route.ts`
- `lib/ai/client.ts`, `prompts.ts`, `quick-prompts.ts`

**Görevler:**

1. **AI Modal UI:**
   - Cmd+Shift+A ile aç, veya AI button
   - 3 mod:
     - **Modify Selection:** Editor'de seçili kodu modifiye et
     - **Modify Full Shader:** Tüm shader'ı değiştir
     - **Generate from Scratch:** Boş başla, prompt → tam shader
   - Prompt input (multi-line)
   - Quick prompts (chips):
     - "make it more dreamy"
     - "add more chaos"
     - "smoother animation"
     - "more contrast"
     - "psychedelic"
     - "minimalist"
     - "add raymarching"
     - "make it audio-reactive"
     - "darker mood"
     - "neon style"

2. **API Endpoint** (`/api/ai/modify`):
   - Edge runtime
   - Anthropic Claude Sonnet 4
   - Streaming response
   - System prompt:
     ```
     You are an expert GLSL shader developer. Modify the provided 
     GLSL fragment shader code based on the user's request. 
     
     Rules:
     - Return ONLY the modified GLSL code, no markdown, no explanation
     - Preserve standard uniforms (u_time, u_resolution, u_mouse)
     - Keep the precision qualifier at top
     - Ensure the shader compiles (valid GLSL ES 3.0)
     - Maintain the original intent unless asked to completely change
     - Use the existing variable names where possible
     ```
   - User message: `<current_shader>` + `<user_prompt>`

3. **Diff View:**
   - Side-by-side: Original | Modified
   - Syntax highlighted
   - Added lines: green tint
   - Removed lines: red tint
   - Changed lines: yellow tint
   - "Apply" or "Reject" buttons

4. **Apply Logic:**
   - Apply → editor state updated, compile triggered
   - Reject → modal kapanır, hiçbir şey değişmez
   - "Retry" button: yeni prompt ile tekrar dene

5. **Live Preview Diff:**
   - Sağda küçük preview canvas
   - Toggle: "preview modified shader"
   - Test before apply

6. **Rate Limiting:**
   - Vercel KV ile per-IP
   - 30 request / saat
   - Limit aşıldıysa: friendly message + GitHub link "deploy your own"

7. **Error Handling:**
   - Anthropic API hatası → toast notification
   - Modified shader compile etmiyor → "AI's output didn't compile. Try again?"
   - Token limit → "Shader too long, try modifying a selection instead"

8. **History:**
   - Son 10 AI request session içinde
   - "Undo AI change" — Cmd+Z native çalışır zaten (Monaco)

**Acceptance Criteria:**
- "make it more dreamy" promptu çalışıyor, anlamlı bir sonuç
- Diff view doğru gösteriliyor
- Apply → editor güncellenir, render değişir
- Streaming çalışıyor (yazıyormuş gibi)
- Rate limit aktif

---

### 📚 AJAN 8 — THE CURATOR & STORAGE

**Rol:** Built-in örnekler, kullanıcı kayıtları, community gallery, sharing, export.

**Sahip Olduğu Dosyalar:**
- `content/examples/**/*.glsl` (30+ shader)
- `content/learn/*.mdx` (learning path)
- `components/sidebar/LibraryPanel.tsx`, `MyShadersPanel.tsx`, `GalleryPanel.tsx`, `DocsPanel.tsx`
- `app/gallery/page.tsx`, `app/learn/page.tsx`, `app/docs/page.tsx`
- `app/s/[id]/page.tsx`
- `app/api/share/**`, `app/api/gallery/**`, `app/api/og/[id]/route.tsx`
- `lib/storage/db.ts`, `shaders.ts`, `autosave.ts`
- `lib/share/encode.ts`, `decode.ts`
- `lib/export/png.ts`, `video.ts`, `gif.ts`
- `components/export/ExportModal.tsx`, `PNGExport.tsx`, `VideoExport.tsx`, `GIFExport.tsx`

**Görevler:**

1. **Built-in Examples (30+):**

   **Beginner (10):**
   - Gradient
   - Mouse Circle
   - Time Color Cycle
   - UV Coordinates
   - Smoothstep Edge
   - Step Function
   - Mix Two Colors
   - Polar Coordinates
   - Stripes
   - Checkerboard
   
   **Intermediate (10):**
   - Perlin Noise
   - Voronoi Cells
   - FBM Clouds
   - Domain Warping
   - Audio Bars (audio-reactive)
   - Webcam Pixelate
   - Plasma
   - Truchet Tiles
   - Hexagonal Grid
   - Caustics
   
   **Advanced (10):**
   - Raymarching Sphere
   - SDF Shapes
   - Mandelbrot Fractal
   - Julia Set
   - 3D Noise Volumetric
   - Path Tracer (simple)
   - Ray Marched Clouds
   - Fluid Simulation
   - Reaction-Diffusion
   - Audio-Reactive Particles
   
   Her örnek:
   - GLSL kodu
   - Thumbnail (önceden render edilmiş PNG)
   - Difficulty badge
   - Tags
   - Açıklama (3-4 cümle)
   - "Try it" button (editor'e yükle)

2. **Library Panel:**
   - Kategorize (Beginner/Intermediate/Advanced)
   - Grid layout, thumbnail-first
   - Search input
   - Filter by tag (raymarching, noise, generative, post-fx)
   - Click → preview modal → "Open in editor"

3. **IndexedDB Schema (Dexie):**
   ```ts
   interface Shader {
     id: string;
     name: string;
     fragmentCode: string;
     vertexCode?: string;
     layers?: Layer[];
     uniforms?: Record<string, any>;
     createdAt: Date;
     updatedAt: Date;
     thumbnail?: string; // base64
   }
   ```

4. **Autosave:**
   - 30s interval
   - Sadece değişiklik varsa
   - "Untitled Shader" → ilk save'de "shader-{timestamp}"
   - Save indicator status bar'da

5. **My Shaders Panel:**
   - Grid view of saved shaders
   - Click → load
   - Right-click → rename, duplicate, delete, export
   - Sort: recent / name / created

6. **Sharing:**
   - **Encoding:**
     - Shader kodu → gzip → base64 → URL param
     - Kısa shader'lar (< 2KB): direkt URL'de
     - Uzun shader'lar (>= 2KB): Vercel KV'ye kaydet, hash döndür
   - **URL format:** `prism.dev/s/{hash}` veya `prism.dev/?code={encoded}`
   - **Share button:**
     - Copy link to clipboard
     - Open Twitter intent
     - Open LinkedIn share
   - **Embed code:** `<iframe>` snippet

7. **Dynamic OG Image:**
   - `/api/og/[id]/route.tsx` — `@vercel/og`
   - Render shader thumbnail + name + author
   - Twitter/LinkedIn preview için
   - 1200x630
   - Cache: edge cache (Vercel)

8. **Community Gallery:**
   - Vercel KV backend
   - `/api/gallery/feed` — son 50 paylaşım
   - Pagination
   - Sort: recent / popular (vote count)
   - Vote system (anonymous, IP-based, 1 vote per IP)
   - Featured badge (admin manuel)
   - Anti-spam: rate limit, profanity filter (basic)

9. **Export:**
   - **PNG (current frame):**
     - canvas.toBlob → download
     - Resolution: native veya 2K/4K (upscale)
   - **PNG (high-res, 4K):**
     - Re-render at 3840x2160
     - Tüm uniforms aynı
   - **Video Loop (MP4/WebM):**
     - MediaRecorder API
     - Duration: 3s / 5s / 10s / 15s seçenekleri
     - 60fps veya 30fps
     - Loop boundary smoothing (eğer time uniform 0-1'e map ediliyorsa)
   - **GIF:**
     - gif.js worker
     - Daha küçük dosya, daha düşük kalite
     - Duration: 2s / 3s / 5s
   - **Wallpaper Export:**
     - 4K PNG önerilen wallpaper boyutlarında
     - Mobile (1080x1920), Desktop (3840x2160)

10. **Learning Path** (`/learn`):
    - 10 sequential lesson, MDX
    - Her lesson: kavram + örnek shader + "edit this" link
    - Progress kaydedilir (localStorage)

11. **Docs Page** (`/docs`):
    - Tüm GLSL fonksiyonları
    - `content/glsl-reference.json`'dan oluşturulur
    - Search + filter

**Acceptance Criteria:**
- 30+ built-in örnek çalışıyor, thumbnail'ler hazır
- IndexedDB save/load çalışıyor, autosave aktif
- Share link doğru oluşturuyor, açılınca shader yükleniyor
- OG image LinkedIn preview'da doğru görünüyor
- Gallery feed çalışıyor, vote sistemi aktif
- Video export 3s loop oluşturuyor (.mp4 < 5MB)
- Learning path 10 lesson içeriyor

---

### 🚀 AJAN 9 — THE POLISHER

**Rol:** Son rötuş. Vercel deploy, SEO, performance, README.

**Sahip Olduğu Dosyalar:**
- `vercel.json`
- `next.config.js` (production tuning)
- `app/layout.tsx` (metadata, OG)
- `app/sitemap.ts`, `app/robots.ts`
- `public/og-default.png`, `public/favicon.svg`
- `README.md`, `LICENSE`, `CONTRIBUTING.md`
- `.github/workflows/ci.yml`

**Görevler:**

1. **Vercel Configuration:**
   ```json
   // vercel.json
   {
     "buildCommand": "pnpm build",
     "devCommand": "pnpm dev",
     "installCommand": "pnpm install",
     "framework": "nextjs",
     "regions": ["fra1"],
     "functions": {
       "app/api/ai/modify/route.ts": {
         "maxDuration": 30,
         "runtime": "edge"
       }
     },
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
           { "key": "X-Content-Type-Options", "value": "nosniff" }
         ]
       }
     ]
   }
   ```

2. **Environment Variables (Vercel Dashboard):**
   ```
   ANTHROPIC_API_KEY=sk-ant-xxx
   KV_URL=
   KV_REST_API_URL=
   KV_REST_API_TOKEN=
   KV_REST_API_READ_ONLY_TOKEN=
   NEXT_PUBLIC_SITE_URL=https://prism.dev
   ```

3. **Vercel KV Setup:**
   - Vercel dashboard'dan KV instance oluştur
   - Connect to project
   - Environment variables otomatik bağlanır
   - Keys structure:
     - `share:{hash}` — paylaşılan shader
     - `gallery:feed` — sorted set, top 50
     - `gallery:item:{id}` — gallery entry
     - `votes:{ip}:{itemId}` — vote tracking
     - `rate:ai:{ip}` — AI rate limit

4. **SEO Meta:**
   - Title: "PRISM — Modern Shader Playground"
   - Description: "Write GLSL shaders with AI co-pilot, 3D viewport, audio-reactive inputs, and multi-layer compositing. The shader playground for 2026."
   - OG image (default): elegant terminal screenshot of editor + preview
   - Twitter card: `summary_large_image`
   - Canonical URLs
   - JSON-LD `SoftwareApplication` schema

5. **Performance Optimizations:**
   - **Code splitting:**
     - Monaco editor → dynamic import
     - Three.js → dynamic import (sadece editor sayfasında)
     - AI modal → dynamic import
     - Gallery page → static export
   - **Bundle analyzer** kontrol:
     - First Load JS hedefi: < 250KB
     - Monaco ayrı chunk (~ 500KB, lazy)
   - **Image optimization:** `next/image` her yerde
   - **Font:** `next/font/local` + preload
   - **Edge caching:** API routes uygun yerde

6. **Lighthouse Hedefleri:**
   - Performance: ≥ 90 (Monaco yüklü olunca daha düşük olabilir, target: editor sayfası 80+)
   - Accessibility: 100
   - Best Practices: 100
   - SEO: 100

7. **Analytics:**
   - Vercel Analytics (built-in)
   - Opsiyonel: Plausible (KVKK uyumlu)

8. **Sentry (Opsiyonel):**
   - Production error tracking
   - Free tier yeterli

9. **README.md** (LinkedIn-ready):
   - Banner GIF (editor demo)
   - Features list with emojis
   - Tech stack badges
   - Quick start
   - Self-host guide
   - Contribution guide
   - License (MIT)

10. **CI/CD:**
    - GitHub Actions: typecheck + build on PR
    - Auto deploy: Vercel git integration

11. **Launch Checklist:**
    - [ ] Custom domain SSL aktif
    - [ ] Tüm environment variables Vercel'de
    - [ ] OG image preview test (Twitter, LinkedIn, Discord)
    - [ ] AI endpoint test (production key ile)
    - [ ] Vercel KV connection test
    - [ ] Mobile responsive test
    - [ ] Cross-browser test (Chrome, Safari, Firefox)
    - [ ] Lighthouse 80+ (editor), 95+ (landing)
    - [ ] GitHub repo public
    - [ ] LinkedIn post drafted (60s screen recording)
    - [ ] HN Show HN drafted
    - [ ] Product Hunt draft

**Acceptance Criteria:**
- `vercel deploy` çalışıyor, hatasız
- Custom domain ile erişilebilir, SSL valid
- AI modify production'da çalışıyor
- KV gallery feed çalışıyor
- Lighthouse hedefleri tutuyor
- OG image preview LinkedIn'de düzgün

---

## 📚 BUILT-IN EXAMPLES PLAN

### Beginner (10 örnek)

| # | İsim | Konsept |
|---|---|---|
| 1 | Gradient | UV koordinatları, lineer renk geçişi |
| 2 | Mouse Circle | u_mouse uniform, length() |
| 3 | Time Color Cycle | sin(u_time) ile renk değişimi |
| 4 | UV Coordinates | Normalized coordinates, debug |
| 5 | Smoothstep Edge | smoothstep() ile yumuşak kenar |
| 6 | Step Function | step() ile keskin kesim |
| 7 | Mix Two Colors | mix() ile interpolasyon |
| 8 | Polar Coordinates | atan() ile kutupsal |
| 9 | Stripes | fract() ile çizgiler |
| 10 | Checkerboard | mod() ile dama deseni |

### Intermediate (10 örnek)

| # | İsim | Konsept |
|---|---|---|
| 1 | Perlin Noise | Klasik perlin |
| 2 | Voronoi Cells | Voronoi diyagramı |
| 3 | FBM Clouds | Fractal Brownian Motion |
| 4 | Domain Warping | Noise of noise |
| 5 | Audio Bars | u_audio_low ile reaktif |
| 6 | Webcam Pixelate | u_camera + pixelation |
| 7 | Plasma | sin combinations classic |
| 8 | Truchet Tiles | Tile pattern algorithm |
| 9 | Hexagonal Grid | Hex tessellation |
| 10 | Caustics | Light caustics simulation |

### Advanced (10 örnek)

| # | İsim | Konsept |
|---|---|---|
| 1 | Raymarching Sphere | Basic raymarching |
| 2 | SDF Shapes | Signed Distance Functions |
| 3 | Mandelbrot Fractal | Complex iteration |
| 4 | Julia Set | Parametric fractal |
| 5 | 3D Noise Volumetric | Volume rendering |
| 6 | Simple Path Tracer | Basic ray tracing |
| 7 | Ray Marched Clouds | Volumetric noise |
| 8 | Fluid Simulation | Navier-Stokes 2D |
| 9 | Reaction-Diffusion | Gray-Scott model |
| 10 | Audio Particles | Audio + particle system |

---

## ⚡ PERFORMANS HEDEFLERİ

| Metrik | Hedef |
|---|---|
| Landing Lighthouse Performance | ≥ 95 |
| Editor Lighthouse Performance | ≥ 80 (Monaco ağır) |
| Lighthouse SEO | 100 |
| Lighthouse A11y | 100 |
| First Contentful Paint | < 1.2s |
| Time to Interactive (editor) | < 2.5s |
| Cumulative Layout Shift | < 0.05 |
| First Load JS (landing) | < 200KB |
| First Load JS (editor) | < 600KB (Monaco dahil) |
| Default shader render | 60fps |
| Mobile responsive | 768px+ (editor), 320px+ (landing) |
| Cold start AI endpoint | < 800ms |

### Optimizasyon Stratejileri

- Monaco lazy load (editor sayfasında bile dynamic import)
- Three.js scene cleanup on unmount (memory leak prevention)
- RAF throttling on hidden tab
- Edge runtime for AI route (faster cold start than serverless)
- ISR for `/gallery` page (revalidate: 60s)
- Static generation for `/learn`, `/docs`
- Image: AVIF + WebP fallback for thumbnails

---

## 🚀 VERCEL DEPLOY

### Step-by-Step

1. **Vercel Account & Project:**
   - github.com/kutluhangil/prism repository public yap
   - vercel.com'da "Import Project" → repo seç
   - Framework: Next.js auto-detect
   - Build command: `pnpm build`
   - Output: `.next`

2. **Vercel KV:**
   - Vercel dashboard → Storage → Create Database → KV
   - Name: `prism-kv`
   - Region: `fra1` (veya target audience'a uygun)
   - "Connect to Project" → otomatik env vars eklenir

3. **Environment Variables:**
   ```
   ANTHROPIC_API_KEY        (Production, Preview)
   NEXT_PUBLIC_SITE_URL     https://prism.dev
   KV_URL                   (auto)
   KV_REST_API_URL          (auto)
   KV_REST_API_TOKEN        (auto)
   KV_REST_API_READ_ONLY_TOKEN (auto)
   ```

4. **Custom Domain:**
   - Vercel project → Settings → Domains
   - Önerilen: `prism.dev`, `prism.tools`, `shdr.dev`, `glsl.lab`
   - DNS:
     - A record `@` → `76.76.21.21`
     - CNAME `www` → `cname.vercel-dns.com`
   - SSL otomatik

5. **Analytics:**
   - Project → Analytics → Enable
   - Speed Insights → Enable

6. **Edge Functions:**
   - AI route otomatik edge (route'ta `export const runtime = 'edge'`)
   - Region: auto

7. **Deploy:**
   - Git push → auto deploy
   - Preview URL: her PR için
   - Production: `main` branch'e push

### Domain Önerileri

- **prism.dev** — premium, kısa, .dev tld geliştiriciler için
- **shdr.dev** — kısa, hacker-y
- **glsl.lab** — keşif, lab hissi
- **noise.dev** — sade
- **fragment.dev** — teknik referans

### Maliyet

- Vercel Hobby: $0 (kişisel kullanım için yeterli)
- Vercel KV Hobby: $0 (256MB, 3000 commands/day)
- Domain: ~$15/yıl
- Anthropic API: pay-per-use (Claude Haiku/Sonnet)

---

## 📝 README ŞABLONU

```markdown
# 🔺 PRISM

> The shader playground for 2026. AI co-pilot, 3D viewport, multi-layer compositing, audio-reactive.

[![Live Demo](https://img.shields.io/badge/demo-prism.dev-a78bfa)](https://prism.dev)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Deploy](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kutluhangil/prism)

![PRISM Banner](public/banner.gif)

## ✨ Features

- ✨ **AI Co-pilot** — "make it more dreamy" → AI modifies your GLSL
- 🎯 **3D Viewport** — Apply shaders to sphere, torus, custom meshes
- 🎚️ **Multi-Layer Compositor** — Stack shaders with blend modes
- 🎵 **Audio Reactive** — Mic or MP3 → uniforms in 3 frequency bands
- 📷 **Webcam Texture** — Live camera feed as sampler2D
- 📖 **Inline Docs** — Hover any GLSL function for documentation
- 🎬 **Video Export** — PNG, 4K, MP4 loop, GIF, wallpaper
- 🌌 **Community Gallery** — Share and discover shaders
- 🌑 **Premium Dark UI** — Linear-quality aesthetic
- ⚡ **Edge Runtime** — Fast AI responses via Vercel Edge

## 🚀 Quick Start

\`\`\`bash
git clone https://github.com/kutluhangil/prism
cd prism
pnpm install
cp .env.local.example .env.local
# add your ANTHROPIC_API_KEY
pnpm dev
\`\`\`

## 🌐 Self-Host on Vercel

1. Click "Deploy" button above
2. Create Vercel KV database, connect to project
3. Add `ANTHROPIC_API_KEY` env var
4. Done.

## 🛠️ Tech Stack

Next.js 14 · TypeScript · Three.js · Monaco Editor · Anthropic SDK · Vercel KV · Tailwind · Framer Motion

## 🎓 Learn

PRISM has a built-in learning path. Start at [/learn](https://prism.dev/learn).

## 🙏 Inspiration

ShaderToy, The Book of Shaders, Linear, Figma, Spline, Cursor.

## 📄 License

MIT — fork it, learn from it, build your own.

---

Made with care by [@kutluhangil](https://github.com/kutluhangil) · [LinkedIn](https://linkedin.com/in/kutluhangil)
```

---

## 🗓️ İMPLEMENTASYON SIRASI (Claude Code İçin)

Her ajanı **ayrı bir Claude Code session** olarak çalıştır. Session sonu commit at.

```
Day 1-2:   Agent 1 (Architect)         → "feat: project scaffold + panels"
Day 3-4:   Agent 2 (Aesthetician)      → "feat: design system + top bar"
Day 5-7:   Agent 3 (Shader Engine)     → "feat: WebGL pipeline + 3D viewport"
Day 8-10:  Agent 4 (Editor Engineer)   → "feat: monaco + GLSL language"
Day 11-12: Agent 5 (Composer)          → "feat: layers + blend modes + post-fx"
Day 13:    Agent 6 (Sensor)            → "feat: audio + webcam + textures"
Day 14:    Agent 7 (AI Whisperer)      → "feat: AI co-pilot + diff view"
Day 15-17: Agent 8 (Curator & Storage) → "feat: examples + storage + share + export"
Day 18-19: Agent 9 (Polisher)          → "chore: vercel deploy + SEO + polish"
Day 20:    Launch (LinkedIn + HN + Product Hunt)
```

**~3 hafta solo dev**, 2-3 saat/gün tempo ile rahat bitirilir. Karmaşık projeler için (örn. Agent 8'in 30 örnek shader'ı) ekstra gün bırak.

---

## 🎬 SON SÖZ

Bu proje bittiğinde elinde:

- 🟢 ShaderToy'u 2026'ya taşıyan bir araç
- 🟢 AI + WebGL + Audio + Camera entegre eden derin teknik proje
- 🟢 Linear-quality UI'a sahip premium frontend
- 🟢 GitHub'da yıldız çekecek bir open source repo
- 🟢 LinkedIn'de **AI demo'su ile viral olacak** bir paylaşım
- 🟢 Show HN potansiyeli yüksek bir launch
- 🟢 9 farklı teknik alanda derinleşmiş kas:
  - WebGL pipeline & shader programming
  - Three.js + R3F
  - Monaco editor extension
  - Audio API + FFT analysis
  - getUserMedia (audio + video)
  - AI integration (streaming + diff)
  - Multi-layer compositing & framebuffers
  - IndexedDB + Vercel KV
  - Performance optimization

**Şimdi başla. Agent 1'i Claude Code'a hand off et.**

```
~/prism ➜  pnpm create next-app prism --typescript --tailwind --app
[+] scaffolding...
[+] beginning Agent 1: The Architect
```

---

`end of blueprint` · `v1.0.0` · `built with ❤️ for kutluhan.gil`
