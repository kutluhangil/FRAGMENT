"use client";
import { useState, useRef, useCallback } from "react";
import {
  Sparkles,
  Send,
  Check,
  X,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useUIStore } from "@/store/useUIStore";
import { useEditorStore } from "@/store/useEditorStore";
import { cn } from "@/lib/utils/cn";

type AIMode = "modify" | "generate";

const QUICK_PROMPTS = [
  "make it more dreamy",
  "add more chaos",
  "smoother animation",
  "more contrast",
  "psychedelic colors",
  "minimalist",
  "darker mood",
  "neon style",
  "make it audio-reactive",
  "add raymarching",
];

export function AIModal() {
  const { aiModalOpen, setAIModalOpen } = useUIStore();
  const { fragmentCode, setFragmentCode } = useEditorStore();

  const [mode, setMode] = useState<AIMode>("modify");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [streamingCode, setStreamingCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  const generate = useCallback(
    async (p: string) => {
      if (!p.trim() || isGenerating) return;

      setIsGenerating(true);
      setError(null);
      setGeneratedCode(null);
      setStreamingCode("");

      abortRef.current = new AbortController();

      try {
        const res = await fetch("/api/ai/modify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: fragmentCode, prompt: p, mode }),
          signal: abortRef.current.signal,
        });

        if (!res.ok || !res.body) {
          const errData = await res
            .json()
            .catch(() => ({ error: "Unknown error" })) as { error?: string };
          throw new Error(errData.error ?? "AI request failed");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let full = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          full += decoder.decode(value, { stream: true });
          setStreamingCode(full);
        }

        // Strip any markdown fences the model may have added
        const cleaned = full
          .replace(/^```(?:glsl)?\n?/m, "")
          .replace(/\n?```\s*$/m, "")
          .trim();

        setGeneratedCode(cleaned);
        setStreamingCode("");
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "AI request failed");
      } finally {
        setIsGenerating(false);
      }
    },
    [fragmentCode, mode, isGenerating]
  );

  const handleApply = () => {
    if (generatedCode) {
      setFragmentCode(generatedCode);
      setAIModalOpen(false);
      setGeneratedCode(null);
      setPrompt("");
    }
  };

  const handleReject = () => {
    setGeneratedCode(null);
    setStreamingCode("");
  };

  const handleClose = () => {
    if (isGenerating) abortRef.current?.abort();
    setAIModalOpen(false);
    setGeneratedCode(null);
    setStreamingCode("");
    setError(null);
  };

  return (
    <Modal open={aiModalOpen} onClose={handleClose} size="lg">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent-dim)] flex items-center justify-center">
            <Sparkles size={16} className="text-[var(--accent)]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[var(--text-primary)]">
              AI Co-pilot
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Modify your shader with natural language
            </p>
          </div>
          <div className="ml-auto flex gap-1">
            {(["modify", "generate"] as AIMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  "text-xs px-3 py-1.5 rounded-md transition-colors capitalize",
                  mode === m
                    ? "bg-[var(--accent-dim)] text-[var(--accent)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Quick prompts */}
        <div>
          <p className="text-[11px] text-[var(--text-muted)] mb-1.5">
            Quick prompts:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_PROMPTS.map((qp) => (
              <button
                key={qp}
                onClick={() => setPrompt(qp)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-[var(--bg-panel)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-focus)] hover:bg-[var(--accent-dim)] transition-colors"
              >
                {qp}
              </button>
            ))}
          </div>
        </div>

        {/* Prompt input */}
        <div className="flex gap-2">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                generate(prompt);
              }
            }}
            placeholder={
              mode === "modify"
                ? "Describe how to modify the shader..."
                : "Describe the shader to generate..."
            }
            rows={2}
            className="flex-1 bg-[var(--bg-panel)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--border-focus)] resize-none"
          />
          <Button
            variant="primary"
            size="md"
            onClick={() => generate(prompt)}
            disabled={!prompt.trim() || isGenerating}
            className="self-end h-9"
            aria-label="Generate"
          >
            {isGenerating ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Send size={14} />
            )}
          </Button>
        </div>

        {/* Error state */}
        {error && (
          <div className="p-3 bg-[var(--error)]/10 border border-[var(--error)]/20 rounded-lg">
            <p className="text-xs text-[var(--error)]">{error}</p>
          </div>
        )}

        {/* Streaming / Generated code */}
        <AnimatePresence mode="wait">
          {(streamingCode || generatedCode) && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-[var(--text-muted)]">
                  {streamingCode && !generatedCode
                    ? "Generating..."
                    : "Generated shader — review before applying"}
                </p>
                {generatedCode && (
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={handleReject}>
                      <X size={12} />
                      Reject
                    </Button>
                    <Button variant="primary" size="sm" onClick={handleApply}>
                      <Check size={12} />
                      Apply
                    </Button>
                  </div>
                )}
              </div>

              <div className="relative">
                <pre className="bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-lg p-3 text-xs font-mono text-[var(--text-secondary)] overflow-x-auto max-h-52 overflow-y-auto leading-relaxed">
                  {generatedCode || streamingCode}
                  {streamingCode && !generatedCode && (
                    <span className="inline-block w-1.5 h-3 bg-[var(--accent)] ml-0.5 animate-pulse align-middle" />
                  )}
                </pre>
              </div>

              {isGenerating && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => abortRef.current?.abort()}
                  className="text-[var(--error)]"
                >
                  <X size={12} />
                  Stop generating
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state hint */}
        {!streamingCode && !generatedCode && !error && !isGenerating && (
          <div className="text-center py-2">
            <p className="text-xs text-[var(--text-muted)]">
              {mode === "modify"
                ? "Pick a quick prompt or describe your modification — the current shader is used as context"
                : "Describe the shader you want to create from scratch"}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
