"use client";
import { Globe, ExternalLink } from "lucide-react";

export function GalleryPanel() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center gap-3">
      <div className="w-12 h-12 rounded-xl bg-[var(--bg-active)] flex items-center justify-center">
        <Globe size={20} className="text-[var(--accent)]" />
      </div>
      <div>
        <p className="text-sm font-medium text-[var(--text-primary)]">
          Community Gallery
        </p>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          Share and discover shaders from the community.
        </p>
      </div>
      <a
        href="/gallery"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs text-[var(--accent)] hover:underline"
      >
        Open Gallery <ExternalLink size={11} />
      </a>
    </div>
  );
}
