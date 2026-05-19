"use client";
import { cn } from "@/lib/utils/cn";
import { forwardRef, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "icon" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "secondary", size = "md", children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-1.5 font-medium transition-all duration-[120ms] rounded-md select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--bg-base)]",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          variant === "primary" &&
            "bg-[var(--accent)] text-[var(--bg-base)] hover:bg-[var(--accent-hover)] shadow-sm",
          variant === "secondary" &&
            "bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]",
          variant === "ghost" &&
            "text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]",
          variant === "icon" &&
            "text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] p-0",
          variant === "danger" &&
            "bg-[var(--error)]/10 text-[var(--error)] border border-[var(--error)]/30 hover:bg-[var(--error)]/20",
          size === "sm" && "text-xs h-6 px-2",
          size === "md" && "text-sm h-8 px-3",
          size === "lg" && "text-base h-10 px-4",
          variant === "icon" && size === "sm" && "h-6 w-6",
          variant === "icon" && size === "md" && "h-8 w-8",
          variant === "icon" && size === "lg" && "h-10 w-10",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
export type { ButtonProps };
