"use client";
import { useState } from "react";
import { Download, Image, Film, FileImage, Loader2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useUIStore } from "@/store/useUIStore";
import { cn } from "@/lib/utils/cn";

type ExportFormat = "png" | "png-4k" | "webm" | "gif";

const FORMATS: {
  id: ExportFormat;
  label: string;
  desc: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "png",
    label: "PNG",
    desc: "High quality screenshot",
    icon: <Image size={16} />,
  },
  {
    id: "png-4k",
    label: "4K PNG",
    desc: "3840×2160 upscaled",
    icon: <Image size={16} />,
  },
  {
    id: "webm",
    label: "WebM Video",
    desc: "Looping animation",
    icon: <Film size={16} />,
  },
  {
    id: "gif",
    label: "Animated GIF",
    desc: "Shareable loop (coming soon)",
    icon: <FileImage size={16} />,
  },
];

const DURATIONS = [3, 5, 10, 15] as const;

export function ExportModal() {
  const { exportModalOpen, setExportModalOpen } = useUIStore();
  const [format, setFormat] = useState<ExportFormat>("png");
  const [duration, setDuration] = useState(5);
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleExport = async () => {
    if (format === "gif") {
      alert("GIF export is coming soon. Try WebM for now!");
      return;
    }

    setIsExporting(true);
    setProgress(0);

    try {
      const canvas = document.querySelector("canvas") as HTMLCanvasElement | null;
      if (!canvas) {
        throw new Error("No canvas found. Make sure the shader preview is visible.");
      }

      if (format === "png" || format === "png-4k") {
        const { exportPNG } = await import("@/lib/export/png");
        await exportPNG(
          canvas,
          "fragment-shader",
          format === "png-4k" ? 2 : 1
        );
      } else if (format === "webm") {
        const { exportVideo } = await import("@/lib/export/video");
        await exportVideo({
          canvas,
          duration,
          fps: 60,
          filename: "fragment-shader",
          format: "webm",
          onProgress: setProgress,
        });
      }

      setExportModalOpen(false);
    } catch (err) {
      console.error("Export failed:", err);
      alert(
        "Export failed: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
    } finally {
      setIsExporting(false);
      setProgress(0);
    }
  };

  return (
    <Modal
      open={exportModalOpen}
      onClose={() => !isExporting && setExportModalOpen(false)}
      title="Export Shader"
      size="md"
    >
      <div className="space-y-4">
        {/* Format grid */}
        <div className="grid grid-cols-2 gap-2">
          {FORMATS.map((fmt) => (
            <button
              key={fmt.id}
              onClick={() => setFormat(fmt.id)}
              disabled={fmt.id === "gif"}
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg border text-left transition-colors",
                "disabled:opacity-40 disabled:cursor-not-allowed",
                format === fmt.id
                  ? "border-[var(--accent)] bg-[var(--accent-dim)]"
                  : "border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-hover)]"
              )}
            >
              <span
                className={cn(
                  "mt-0.5 shrink-0",
                  format === fmt.id
                    ? "text-[var(--accent)]"
                    : "text-[var(--text-muted)]"
                )}
              >
                {fmt.icon}
              </span>
              <div>
                <div className="text-sm font-medium text-[var(--text-primary)]">
                  {fmt.label}
                </div>
                <div className="text-[11px] text-[var(--text-muted)]">
                  {fmt.desc}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Duration picker — only for video formats */}
        {format === "webm" && (
          <div>
            <p className="text-xs text-[var(--text-muted)] mb-2">Duration</p>
            <div className="flex gap-2">
              {DURATIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={cn(
                    "flex-1 py-1.5 text-xs rounded-md border transition-colors",
                    duration === d
                      ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-dim)]"
                      : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--border-strong)]"
                  )}
                >
                  {d}s
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recording progress */}
        {isExporting && format === "webm" && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[var(--text-muted)]">
                Recording...
              </span>
              <span className="text-xs font-mono text-[var(--accent)]">
                {Math.round(progress * 100)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-[var(--bg-active)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--accent)] rounded-full transition-all duration-100"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="md"
            onClick={() => setExportModalOpen(false)}
            disabled={isExporting}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                {format === "webm" ? "Recording..." : "Exporting..."}
              </>
            ) : (
              <>
                <Download size={14} />
                Export {FORMATS.find((f) => f.id === format)?.label}
              </>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
