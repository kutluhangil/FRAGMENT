"use client";
import { useEffect, useRef, useState } from "react";
import { AlertCircle, AlertTriangle, Info, Trash2 } from "lucide-react";
import { useEditorStore } from "@/store/useEditorStore";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

interface LogEntry {
  id: number;
  type: "error" | "warning" | "info" | "success";
  message: string;
  timestamp: Date;
}

let logId = 0;

export function ConsolePanel() {
  const { compileErrors, compileStatus } = useEditorStore();
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: logId++,
      type: "info",
      message: "FRAGMENT shader playground ready. Start coding!",
      timestamp: new Date(),
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (compileStatus === "success" && compileErrors.length === 0) {
      setLogs((prev) => [
        ...prev.slice(-50),
        {
          id: logId++,
          type: "success",
          message: "Shader compiled successfully",
          timestamp: new Date(),
        },
      ]);
    } else if (compileStatus === "error" && compileErrors.length > 0) {
      const newLogs = compileErrors.map((err) => ({
        id: logId++,
        type: "error" as const,
        message: `Line ${err.line}: ${err.message}`,
        timestamp: new Date(),
      }));
      setLogs((prev) => [...prev.slice(-50), ...newLogs]);
    }
  }, [compileStatus, compileErrors]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const icons: Record<LogEntry["type"], React.ReactNode> = {
    error: <AlertCircle size={11} className="text-[var(--error)] shrink-0" />,
    warning: (
      <AlertTriangle size={11} className="text-[var(--warning)] shrink-0" />
    ),
    info: <Info size={11} className="text-[var(--info)] shrink-0" />,
    success: (
      <span className="w-[11px] h-[11px] rounded-full bg-[var(--success)] shrink-0 inline-block mt-0.5" />
    ),
  };

  return (
    <div className="flex flex-col h-full font-mono">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-[var(--border-subtle)] shrink-0">
        <span className="text-[10px] text-[var(--text-muted)]">
          {logs.length} entries
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLogs([])}
          aria-label="Clear console"
        >
          <Trash2 size={11} />
          <span className="text-[10px]">Clear</span>
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {logs.map((log) => (
          <div
            key={log.id}
            className={cn(
              "flex items-start gap-2 px-2 py-1 rounded text-[10px]",
              log.type === "error" && "bg-red-500/5",
              log.type === "warning" && "bg-yellow-500/5",
              log.type === "success" && "bg-green-500/5"
            )}
          >
            <span className="mt-0.5 shrink-0">{icons[log.type]}</span>
            <span
              className={cn(
                "flex-1",
                log.type === "error" && "text-[var(--error)]",
                log.type === "warning" && "text-[var(--warning)]",
                log.type === "success" && "text-[var(--success)]",
                log.type === "info" && "text-[var(--text-secondary)]"
              )}
            >
              {log.message}
            </span>
            <span className="text-[var(--text-disabled)] shrink-0">
              {log.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
