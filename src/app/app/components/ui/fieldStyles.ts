import { cn } from "@/app/utils/cn";

/**
 * The single source of truth for text-entry control appearance. Input,
 * Textarea and Select all render through this so they stay pixel-identical —
 * previously this exact class string was duplicated inline per control, which
 * is how they drift apart.
 */
export function controlClasses(hasError: boolean, className?: string) {
  return cn(
    "w-full rounded-brand border bg-white px-4 py-3 text-sm text-slate-800 outline-none transition",
    "placeholder:text-slate-400",
    "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400",
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
      : "border-slate-200 focus:border-snaptap-blue-dark focus:ring-2 focus:ring-snaptap-blue-dark/20",
    className,
  );
}

export const labelClasses =
  "mb-1.5 block text-sm font-semibold text-snaptap-gray-dark";

export const hintClasses = "mt-1.5 text-xs text-slate-500";

export const errorClasses = "mt-1.5 text-xs font-medium text-red-600";
