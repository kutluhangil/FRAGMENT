"use client";
import { cn } from "@/lib/utils/cn";
import { ChangeEvent } from "react";

interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function Slider({
  value,
  min = 0,
  max = 1,
  step = 0.01,
  onChange,
  label,
  showValue = true,
  className,
}: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {label && (
        <span className="text-xs text-[var(--text-muted)] min-w-[4rem] truncate">
          {label}
        </span>
      )}
      <div className="relative flex-1 h-4 flex items-center">
        <div className="w-full h-1 rounded-full bg-[var(--bg-active)]">
          <div
            className="h-1 rounded-full bg-[var(--accent)]"
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(parseFloat(e.target.value))
          }
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
          aria-label={label}
        />
      </div>
      {showValue && (
        <span className="text-xs font-mono text-[var(--text-muted)] min-w-[2rem] text-right">
          {value.toFixed(2)}
        </span>
      )}
    </div>
  );
}
