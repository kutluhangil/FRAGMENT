import { cn } from "@/lib/utils/cn";

interface KBDProps {
  keys: string[];
  className?: string;
}

export function KBD({ keys, className }: KBDProps) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)}>
      {keys.map((key, i) => (
        <kbd
          key={i}
          className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-active)] border border-[var(--border-strong)] rounded"
        >
          {key}
        </kbd>
      ))}
    </span>
  );
}
