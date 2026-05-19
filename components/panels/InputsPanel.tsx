"use client";
import { useState, useRef } from "react";
import { Mic, Play, Pause, Upload, X } from "lucide-react";
import { useInputsStore, type AudioSource } from "@/store/useInputsStore";
import { cn } from "@/lib/utils/cn";

export function InputsPanel() {
  const {
    audioSource,
    setAudioSource,
    audioLow,
    audioMid,
    audioHigh,
    webcamEnabled,
    setWebcamEnabled,
    webcamMirrored,
    setWebcamMirrored,
    textures,
    setTexture,
    audioFile,
    setAudioFile,
    isAudioPlaying,
    setAudioPlaying,
  } = useInputsStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textureInputRef = useRef<HTMLInputElement>(null);
  const [textureSlot, setTextureSlot] = useState(0);

  const handleAudioFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
      setAudioSource("file");
    }
  };

  const handleTextureFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    slot: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setTexture(slot, url, file.name);
  };

  return (
    <div className="p-3 space-y-5">
      {/* Audio Section */}
      <section>
        <h3 className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
          Audio
        </h3>

        <div className="flex items-center gap-1 mb-3">
          {(["off", "mic", "file"] as AudioSource[]).map((src) => (
            <button
              key={src}
              onClick={() => setAudioSource(src)}
              className={cn(
                "px-3 py-1.5 text-xs rounded-md transition-colors capitalize border",
                audioSource === src
                  ? "bg-[var(--accent)] text-[var(--bg-base)] border-[var(--accent)]"
                  : "text-[var(--text-muted)] border-[var(--border-subtle)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]"
              )}
            >
              {src === "mic" ? (
                <span className="flex items-center gap-1">
                  <Mic size={10} />
                  {src}
                </span>
              ) : (
                src
              )}
            </button>
          ))}
        </div>

        {audioSource === "file" && (
          <div className="mb-3">
            {audioFile ? (
              <div className="flex items-center gap-2 p-2 bg-[var(--bg-panel)] border border-[var(--border-subtle)] rounded-lg">
                <button
                  onClick={() => setAudioPlaying(!isAudioPlaying)}
                  className="w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center shrink-0"
                >
                  {isAudioPlaying ? (
                    <Pause size={10} className="text-[var(--bg-base)]" />
                  ) : (
                    <Play size={10} className="text-[var(--bg-base)]" />
                  )}
                </button>
                <span className="text-xs text-[var(--text-secondary)] truncate flex-1">
                  {audioFile.name}
                </span>
                <button
                  onClick={() => {
                    setAudioFile(null);
                    setAudioSource("off");
                  }}
                  className="text-[var(--text-muted)] hover:text-[var(--error)]"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 border border-dashed border-[var(--border-subtle)] rounded-lg text-xs text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                Drop MP3/WAV or click to upload
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleAudioFile}
            />
          </div>
        )}

        {audioSource !== "off" && (
          <div className="space-y-2">
            {[
              { label: "Bass", value: audioLow, color: "#a78bfa" },
              { label: "Mid", value: audioMid, color: "#60a5fa" },
              { label: "Treble", value: audioHigh, color: "#34d399" },
            ].map((band) => (
              <div key={band.label} className="flex items-center gap-2">
                <span className="text-[10px] text-[var(--text-muted)] w-10">
                  {band.label}
                </span>
                <div className="flex-1 h-1.5 bg-[var(--bg-active)] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-75"
                    style={{
                      width: `${band.value * 100}%`,
                      background: band.color,
                    }}
                  />
                </div>
                <span className="text-[10px] font-mono text-[var(--text-muted)] w-6 text-right">
                  {Math.round(band.value * 100)}
                </span>
              </div>
            ))}
          </div>
        )}

        {audioSource === "off" && (
          <p className="text-xs text-[var(--text-muted)]">
            Enable mic or upload audio to use{" "}
            <code className="text-[var(--syntax-uniform)]">
              u_audio_low/mid/high
            </code>{" "}
            uniforms.
          </p>
        )}
      </section>

      {/* Webcam Section */}
      <section>
        <h3 className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
          Webcam
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-[var(--text-secondary)]">
              Live camera feed
            </p>
            <p className="text-[10px] text-[var(--text-muted)]">
              Available as{" "}
              <code className="text-[var(--syntax-uniform)]">u_camera</code>
            </p>
          </div>
          <button
            onClick={() => setWebcamEnabled(!webcamEnabled)}
            className={cn(
              "relative w-9 h-5 rounded-full transition-colors",
              webcamEnabled ? "bg-[var(--accent)]" : "bg-[var(--bg-active)]"
            )}
            aria-label={webcamEnabled ? "Disable webcam" : "Enable webcam"}
          >
            <div
              className={cn(
                "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform",
                webcamEnabled ? "translate-x-4" : "translate-x-0.5"
              )}
            />
          </button>
        </div>
        {webcamEnabled && (
          <div className="mt-2 flex items-center gap-2">
            <button
              onClick={() => setWebcamMirrored(!webcamMirrored)}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              {webcamMirrored ? "Mirror: ON" : "Mirror: OFF"}
            </button>
          </div>
        )}
      </section>

      {/* Textures Section */}
      <section>
        <h3 className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
          Textures
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {textures.map((slot) => (
            <div key={slot.id} className="aspect-square relative group">
              {slot.url ? (
                <div className="w-full h-full rounded-lg overflow-hidden border border-[var(--border-strong)] bg-[var(--bg-base)] relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slot.url}
                    alt={slot.name ?? `Texture ${slot.id}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setTexture(slot.id, null, null)}
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 w-4 h-4 rounded bg-black/60 flex items-center justify-center text-white transition-opacity"
                  >
                    <X size={8} />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-[10px] text-white px-1 py-0.5 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    u_tex_{slot.id}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setTextureSlot(slot.id);
                    textureInputRef.current?.click();
                  }}
                  className="w-full h-full rounded-lg border border-dashed border-[var(--border-subtle)] hover:border-[var(--accent)] flex flex-col items-center justify-center gap-1 transition-colors hover:bg-[var(--bg-hover)]"
                >
                  <Upload size={12} className="text-[var(--text-disabled)]" />
                  <span className="text-[10px] text-[var(--text-disabled)]">
                    _{slot.id}
                  </span>
                </button>
              )}
            </div>
          ))}
        </div>
        <input
          ref={textureInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleTextureFile(e, textureSlot)}
        />
        <p className="text-[10px] text-[var(--text-muted)] mt-2">
          Access as{" "}
          <code className="text-[var(--syntax-uniform)]">u_texture_0</code>{" "}
          through{" "}
          <code className="text-[var(--syntax-uniform)]">u_texture_3</code>
        </p>
      </section>
    </div>
  );
}
