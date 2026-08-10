import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/app/utils/cn";

type Tone = "neutral" | "info" | "success" | "warning" | "danger";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  /** Pill shape, for promo/marketing labels. Default is the brand 6px radius. */
  pill?: boolean;
  children: ReactNode;
}

const TONE_CLASSES: Record<Tone, string> = {
  neutral: "bg-slate-100 text-slate-600 border-slate-200",
  info: "bg-snaptap-blue/10 text-snaptap-blue-dark border-snaptap-blue/20",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  danger: "bg-red-50 text-red-600 border-red-200",
};

/**
 * Status/label chip. Tones map to the four kinds of feedback the app needs to
 * express (status, success, warning, error) so a billing state or plan label
 * always uses the same color language.
 */
export function Badge({
  tone = "neutral",
  pill = false,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 border px-2.5 py-0.5 text-xs font-bold",
        pill ? "rounded-full" : "rounded-brand",
        TONE_CLASSES[tone],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
