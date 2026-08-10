import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Conditional classes (clsx) + Tailwind conflict resolution (tailwind-merge).
 *
 * `clsx` alone is not enough for a component that accepts a `className`
 * override: two utilities targeting the same CSS property have identical
 * specificity, so which one wins depends on their order in the generated
 * stylesheet — not on the order you passed them. That makes
 * `<Button variant="secondary" className="text-red-600" />` silently
 * unreliable. `twMerge` drops the losing class instead, so the caller's
 * `className` always wins.
 *
 * Use this in every `ui/` primitive that takes a `className`.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
