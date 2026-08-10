import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/app/utils/cn";

type Variant = "flat" | "raised" | "elevated" | "interactive";
type Padding = "none" | "sm" | "md" | "lg";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  padding?: Padding;
  children: ReactNode;
}

/**
 * Variants deliberately mirror the three surface treatments already in the
 * codebase, so adopting Card in an existing view is a visually neutral
 * refactor rather than a silent restyle:
 *   flat        → solara, SellerWorkflow, billing-history  (shadow-sm)
 *   raised      → OverviewSection, contact form shell      (shadow-lg)
 *   elevated    → insights StatsCards / ChartsSection      (layered shadow-card token)
 *   interactive → raised + the hover lift used on clickable feature cards
 */
const VARIANT_CLASSES: Record<Variant, string> = {
  flat: "border-slate-100 shadow-sm",
  raised: "border-slate-100 shadow-lg",
  elevated: "border-slate-200 shadow-card",
  interactive:
    "border-slate-100 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl",
};

const PADDING_CLASSES: Record<Padding, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

/**
 * No "use client" directive: Card and Badge are pure and hook-free, so they
 * can be rendered from server components as well as client ones.
 */
export function Card({
  variant = "flat",
  padding = "md",
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-brand border bg-white",
        VARIANT_CLASSES[variant],
        PADDING_CLASSES[padding],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mb-4 border-b border-slate-100 pb-4", className)}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-title font-bold text-slate-900", className)}
      {...rest}
    >
      {children}
    </h3>
  );
}

export function CardFooter({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-4 flex items-center gap-3 border-t border-slate-100 pt-4",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
