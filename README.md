<div align="center">

<img src="docs/media/hero.svg" alt="FRAGMENT — a GLSL shader playground with an AI co-pilot" width="100%">

<p>
  <a href="https://fragment-ashy.vercel.app"><img alt="Live demo" src="https://img.shields.io/badge/live%20demo-open%20the%20editor-a78bfa?style=for-the-badge&labelColor=07050f"></a>
  <img alt="GLSL" src="https://img.shields.io/badge/GLSL-Monaco%20editor-5eead4?style=for-the-badge&labelColor=07050f">
  <img alt="React Three Fiber" src="https://img.shields.io/badge/R3F-3D%20viewport-f472b6?style=for-the-badge&labelColor=07050f">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-a78bfa?style=for-the-badge&labelColor=07050f">
</p>

<p><em>A premium GLSL editor with an AI co-pilot, a real 3D viewport,<br>
audio- and camera-reactive uniforms and a multi-layer compositor.</em></p>

</div>

<img src="docs/media/divider.svg" width="100%" alt="">

## What it is

Classic shader playgrounds stop at a fullscreen quad with no helpers. FRAGMENT puts shaders on real geometry, stacks them like image layers and gives you a co-pilot that edits your code and shows you the diff before you accept it. It runs at 60 fps in the browser.

<img src="docs/media/divider.svg" width="100%" alt="">

## Features

| | |
|---|---|
| **AI co-pilot** | <kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>A</kbd>, type *"make it more dreamy"*, review the diff, accept. |
| **3D viewport** | Apply the shader to a sphere, torus, knot or cube, with orbit controls. |
| **Multi-layer** | Stack shader layers like an image editor, with 12 blend modes. |
| **Audio reactive** | Microphone or MP3 into three automatic bands: `u_audio_low`, `u_audio_mid`, `u_audio_high`. |
| **Webcam texture** | The live camera feed arrives as `sampler2D u_camera`. |
| **Inline docs** | Hover any GLSL function for its signature, description and an example. |
| **Export** | PNG, 4K PNG and looping WebM, straight from the browser. |
| **Gallery** | Share shaders and explore other people's. |
| **Local first** | Projects saved in IndexedDB (Dexie); the AI endpoint runs on the edge. |

<img src="docs/media/divider.svg" width="100%" alt="">

## How it fits together

```mermaid
flowchart LR
  ED[Monaco editor] --> COMP[Shader compiler<br/>errors inline]
  COMP --> L[Layer stack · blend modes]
  IN[Audio bands · webcam · time · mouse] --> U[Uniforms]
  U --> L
  L --> V[Preview<br/>quad or 3D mesh]
  ED <--> AI[AI co-pilot · edge route<br/>diff review]
  L --> DB[(IndexedDB · Dexie)]
  V --> EX[PNG · 4K · WebM]
```

<img src="docs/media/divider.svg" width="100%" alt="">

## Türkçe özet

**FRAGMENT**, 2026 için yeniden düşünülmüş bir GLSL shader editörü. Shader'ı yalnızca düz bir ekranda değil küre, torus ya da küp üzerinde görebiliyor, katmanları 12 karışım moduyla üst üste koyabiliyorsun. Mikrofon ve kamera doğrudan uniform olarak shader'a geliyor. Yapay zekâ yardımcısı koduna istediğin değişikliği yapıyor ve onaylamadan önce farkı gösteriyor. Sonucu PNG, 4K ya da WebM döngü olarak indirebilirsin.

<img src="docs/media/divider.svg" width="100%" alt="">

## Development

```sh
pnpm install
cp .env.local.example .env.local   # AI key and optional KV for the gallery
pnpm dev                           # http://localhost:3000
pnpm build
```

```
components/editor/    Monaco setup, GLSL language, inline docs
components/preview/   canvas, 3D viewport, layer compositor
components/panels/    uniforms, inputs, layers, export
lib/shader/           compiler, uniforms, templates
lib/storage/          Dexie projects and gallery client
app/api/              AI co-pilot, gallery and OG image routes
```

<div align="center">
<br>
<a href="https://github.com/kutluhangil"><img src="docs/media/signature.svg" width="100%" alt="Built by kutluhangil"></a>
<sub>Write a fragment. Ship a world.</sub>
</div>
