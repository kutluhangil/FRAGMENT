"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useEditorStore } from "@/store/useEditorStore";
import { cn } from "@/lib/utils/cn";

export function ShaderName() {
  const { shaderName, setShaderName, isModified } = useEditorStore();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(shaderName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(shaderName);
  }, [shaderName]);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const commit = () => {
    const trimmed = value.trim() || "Untitled Shader";
    setShaderName(trimmed);
    setValue(trimmed);
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") {
            setValue(shaderName);
            setEditing(false);
          }
        }}
        className="h-7 px-2 text-sm font-medium bg-[var(--bg-active)] border border-[var(--border-focus)] rounded text-[var(--text-primary)] outline-none min-w-32 max-w-48"
      />
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className="flex items-center gap-1 h-7 px-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded transition-colors"
    >
      <span className={cn("max-w-48 truncate", isModified && "italic")}>
        {shaderName}
        {isModified ? " •" : ""}
      </span>
      <ChevronDown size={12} className="text-[var(--text-muted)]" />
    </button>
  );
}
