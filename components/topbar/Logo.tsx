import { cn } from "@/lib/utils/cn";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden="true"
      >
        <polygon
          points="11,2 20,19 2,19"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <polygon
          points="11,7 16.5,17 5.5,17"
          fill="var(--accent)"
          opacity="0.15"
        />
      </svg>
      <span className="text-sm font-semibold tracking-wider text-[var(--text-primary)]">
        FRAGMENT
      </span>
    </div>
  );
}
