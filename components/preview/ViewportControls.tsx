"use client";
import { useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { usePreviewStore } from "@/store/usePreviewStore";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

export function ViewportControls() {
  const [hovered, setHovered] = useState(false);
  const { isPlaying, togglePlay, setTime } = usePreviewStore();

  return (
    <div
      className={cn(
        "absolute bottom-2 right-2 flex items-center gap-1 transition-opacity duration-200",
        hovered ? "opacity-100" : "opacity-0 hover:opacity-100"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Button
        variant="icon"
        size="sm"
        onClick={() => setTime(0)}
        className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] !rounded-md w-7 h-7"
        aria-label="Reset time"
      >
        <RotateCcw size={12} />
      </Button>
      <Button
        variant="icon"
        size="sm"
        onClick={togglePlay}
        className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] !rounded-md w-7 h-7"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause size={12} /> : <Play size={12} />}
      </Button>
    </div>
  );
}
