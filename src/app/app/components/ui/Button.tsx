"use client";

import { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/app/utils/cn";
import { SPRING_DEFAULT, TAP_SCALE, HOVER_SCALE } from "@/app/utils/motion";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: Variant;
  size?: Size;
  /** Shows a spinner and blocks interaction. Keeps the button's width stable. */
  loading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-snaptap-blue-dark text-white shadow-lg shadow-snaptap-blue-dark/20 hover:bg-snaptap-blue-deep",
  secondary:
    "bg-white text-slate-700 border border-slate-200 shadow-sm hover:bg-slate-50 hover:shadow",
  ghost:
    "bg-transparent text-snaptap-blue-dark hover:bg-snaptap-blue-dark/5",
  danger:
    "bg-red-500 text-white shadow-lg shadow-red-500/20 hover:bg-red-600",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-2.5 text-[15px] gap-2",
  lg: "px-8 py-3 text-base gap-2",
};

/**
 * Feedback fires on the press (whileTap), not on release, and settles with a
 * critically damped spring rather than a fixed-duration CSS transition — so
 * it stays interruptible if the user presses again mid-settle.
 */
export function Button({
  variant = "primary",
  size = "lg",
  loading = false,
  fullWidth = false,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  const isInert = disabled || loading;

  return (
    <motion.button
      whileHover={isInert ? undefined : HOVER_SCALE}
      whileTap={isInert ? undefined : TAP_SCALE}
      transition={SPRING_DEFAULT}
      disabled={isInert}
      aria-busy={loading || undefined}
      className={cn(
        "relative inline-flex items-center justify-center rounded-brand font-semibold transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snaptap-blue-dark/50 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-60",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        fullWidth && "w-full",
        className,
      )}
      {...rest}
    >
      {loading && (
        <svg
          className="size-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            className="opacity-25"
          />
          <path
            d="M4 12a8 8 0 0 1 8-8"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      )}
      {children}
    </motion.button>
  );
}
