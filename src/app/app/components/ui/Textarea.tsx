"use client";

import { TextareaHTMLAttributes, useId } from "react";
import { cn } from "@/app/utils/cn";
import {
  controlClasses,
  labelClasses,
  hintClasses,
  errorClasses,
} from "./fieldStyles";

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {
  label?: string;
  error?: string;
  hint?: string;
  /** Allow the user to drag-resize. Off by default so it can't break layout. */
  resizable?: boolean;
}

export function Textarea({
  label,
  error,
  hint,
  resizable = false,
  className,
  required,
  rows = 5,
  ...rest
}: TextareaProps) {
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
      <textarea
        id={id}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={controlClasses(
          Boolean(error),
          cn(resizable ? "resize-y" : "resize-none", className),
        )}
        {...rest}
      />
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
