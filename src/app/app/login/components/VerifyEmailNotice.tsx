"use client";

import React from "react";
import { Icon } from "@iconify/react";

export interface VerifyEmailNoticeProps {
  /** The username the user typed — sent as the resend `identifier`. */
  identifier: string;
  /** Generic message from the resend response, once one has come back. */
  sentMessage: string | null;
  /** Server note explaining why a resend was refused (429 cooldown). */
  cooldownMessage: string | null;
  resending: boolean;
  isCoolingDown: boolean;
  secondsLeft: number;
  onResend: () => void;
  onDismiss: () => void;
}

/**
 * Persistent inline panel shown when `POST /brand/login` answers
 * `401 { requiresVerification: true }` — the account exists but its email was
 * never confirmed. The backend does not return the email address, so we can
 * only refer to "the email on the account".
 */
export const VerifyEmailNotice = ({
  identifier,
  sentMessage,
  cooldownMessage,
  resending,
  isCoolingDown,
  secondsLeft,
  onResend,
  onDismiss,
}: VerifyEmailNoticeProps) => (
  <div
    role="alert"
    className="mb-6 rounded-brand border border-amber-200 bg-amber-50 p-5"
  >
    <div className="flex items-start gap-3">
      <Icon
        icon="mdi:email-alert-outline"
        className="text-amber-600 shrink-0 mt-0.5"
        width={22}
      />
      <div className="flex-1">
        <p className="font-black text-[#2e2e2e] text-sm mb-1">
          Verify your email to sign in
        </p>
        <p className="text-[#555555] text-sm leading-relaxed">
          The account <span className="font-semibold">{identifier}</span> hasn
          &apos;t confirmed its email address yet. Open the verification link we
          emailed you, then sign in again.
        </p>

        {sentMessage && (
          <p className="mt-3 text-sm text-emerald-700 font-medium">
            {sentMessage}
          </p>
        )}
        {cooldownMessage && !sentMessage && (
          <p className="mt-3 text-sm text-amber-700 font-medium">
            {cooldownMessage}
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onResend}
            disabled={resending || isCoolingDown}
            className="rounded-brand bg-snaptap-blue-dark px-4 py-2 text-xs font-black uppercase tracking-wider text-white transition-all active:scale-[0.98] disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            {isCoolingDown
              ? `Resend in ${secondsLeft}s`
              : resending
                ? "Sending…"
                : "Resend verification link"}
          </button>
          <button
            type="button"
            onClick={onDismiss}
            className="text-xs font-bold uppercase tracking-wider text-[#888888] hover:text-[#555555] transition-colors"
          >
            Dismiss
          </button>
        </div>

        <p className="mt-3 text-xs text-[#888888]">
          Nothing in your inbox? Check the spam folder — the link may take a
          minute to arrive.
        </p>
      </div>
    </div>
  </div>
);
