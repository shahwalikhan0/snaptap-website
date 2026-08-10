"use client";

import { InputHTMLAttributes, ReactNode, useId } from "react";
import {
  controlClasses,
  labelClasses,
  hintClasses,
  errorClasses,
} from "./fieldStyles";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  label?: string;
  /** Validation message. Presence switches the control to its error styling. */
  error?: string;
  /** Helper text under the field. Hidden while an error is showing. */
  hint?: string;
  /** Small icon rendered inside the field, on the right (e.g. a search glyph). */
  trailing?: ReactNode;
}

export function Input({
  label,
  error,
  hint,
  trailing,
  className,
  required,
  ...rest
}: InputProps) {
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
        <input
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={controlClasses(
            Boolean(error),
            trailing ? `pr-10 ${className ?? ""}` : className,
          )}
          {...rest}
        />
        {trailing && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {trailing}
          </span>
        )}
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
