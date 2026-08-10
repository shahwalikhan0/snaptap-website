"use client";

import { SelectHTMLAttributes, useId } from "react";
import { Icon } from "@iconify/react";
import {
  controlClasses,
  labelClasses,
  hintClasses,
  errorClasses,
} from "./fieldStyles";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "children"> {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
  /** Rendered as a disabled, empty-value first option. */
  placeholder?: string;
}

/**
 * A native <select> rather than a custom listbox — it gets the platform's own
 * picker on mobile (a far better experience than any re-implementation), full
 * keyboard support, and screen-reader semantics for free. The chevron is ours;
 * the browser's default arrow is hidden via appearance-none.
 */
export function Select({
  label,
  error,
  hint,
  options,
  placeholder,
  className,
  required,
  ...rest
}: SelectProps) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div>
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={controlClasses(
            Boolean(error),
            `cursor-pointer appearance-none pr-10 ${className ?? ""}`,
          )}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <Icon
          icon="lucide:chevron-down"
          width={16}
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
      {error ? (
        <p id={`${id}-error`} className={errorClasses}>
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className={hintClasses}>
            {hint}
          </p>
        )
      )}
    </div>
  );
}
