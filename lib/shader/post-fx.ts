export interface PostFXConfig {
  bloom: { enabled: boolean; intensity: number; threshold: number };
  chromaticAberration: { enabled: boolean; offset: number };
  vignette: { enabled: boolean; radius: number; smoothness: number };
  filmGrain: { enabled: boolean; intensity: number };
  pixelation: { enabled: boolean; granularity: number };
  scanlines: { enabled: boolean; count: number; opacity: number };
}

export const DEFAULT_POST_FX: PostFXConfig = {
  bloom: { enabled: false, intensity: 0.5, threshold: 0.8 },
  chromaticAberration: { enabled: false, offset: 0.003 },
  vignette: { enabled: false, radius: 0.75, smoothness: 0.45 },
  filmGrain: { enabled: false, intensity: 0.1 },
  pixelation: { enabled: false, granularity: 10 },
  scanlines: { enabled: false, count: 400, opacity: 0.1 },
};
