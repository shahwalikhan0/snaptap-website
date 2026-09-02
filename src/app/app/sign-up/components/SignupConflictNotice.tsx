"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

export type SignupConflictVariant =
  /** A usable, verified account already owns this email. */
  | "existing-verified"
  /** Unverified account existed — the server just mailed a fresh link. */
  | "unverified-resent"
  /** Unverified account existed — a link went out very recently (cooldown). */
  | "unverified-cooldown";

export interface SignupConflictNoticeProps {
  variant: SignupConflictVariant;
  /** The email the user typed — the address the link was sent to. */
  email: string;
  /** The backend's own error string, shown as supporting detail. */
  serverMessage: string | null;
  resending: boolean;
  isCoolingDown: boolean;
  secondsLeft: number;
  onResend: () => void;
  onDismiss: () => void;
}

const linkClass =
  "font-black text-snaptap-blue-dark hover:text-snaptap-blue-deep underline underline-offset-4 transition-colors";

/**
 * Panel shown when `POST /brand/create` returns 409 for an email that is
 * already taken. Which flags came back decides which of the three stories we
 * tell. In every unverified case **no account was created by this request**,
 * so the details the user just typed were not saved.
 */
export const SignupConflictNotice = ({
  variant,
  email,
  serverMessage,
  resending,
  isCoolingDown,
  secondsLeft,
  onResend,
  onDismiss,
}: SignupConflictNoticeProps) => {
  const verified = variant === "existing-verified";

  return (
    <div
      role="alert"
      className={`mb-8 rounded-brand border p-5 ${
        verified
          ? "border-slate-200 bg-slate-50"
          : "border-amber-200 bg-amber-50"
      }`}
    >
      <div className="flex items-start gap-3">
        <Icon
          icon={verified ? "mdi:account-check-outline" : "mdi:email-alert-outline"}
          className={`shrink-0 mt-0.5 ${
            verified ? "text-snaptap-blue-dark" : "text-amber-600"
          }`}
          width={22}
        />
        <div className="flex-1">
          {verified ? (
            <>
              <p className="font-black text-[#2e2e2e] text-sm mb-1">
                You already have an account
              </p>
              <p className="text-[#555555] text-sm leading-relaxed">
                <span className="font-semibold">{email}</span> is already
                registered and verified. Sign in with it instead — no new
                account was created.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-5">
                <Link href="/app/login" className={linkClass}>
                  Sign in
                </Link>
                <Link href="/app/forgot-password" className={linkClass}>
                  Reset your password
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="font-black text-[#2e2e2e] text-sm mb-1">
                {variant === "unverified-resent"
                  ? "We've sent a new verification link"
                  : "A verification link is already on its way"}
              </p>
              <p className="text-[#555555] text-sm leading-relaxed">
                {variant === "unverified-resent" ? (
                  <>
                    You started signing up with{" "}
                    <span className="font-semibold">{email}</span> before but
                    never confirmed it. We&apos;ve sent a new verification link
                    to that address — check your inbox.
                  </>
                ) : (
                  <>
                    You started signing up with{" "}
                    <span className="font-semibold">{email}</span> before but
                    never confirmed it. A link was sent very recently, so we
                    didn&apos;t send another — check your inbox and spam folder.
                  </>
                )}
              </p>
              <p className="text-[#555555] text-sm leading-relaxed mt-2">
                <span className="font-semibold">
                  No new account was created
                </span>{" "}
                and the details you just entered were not saved — your original
                signup is the one waiting to be verified. If you don&apos;t
                remember the password from that first attempt, you can{" "}
                <Link href="/app/forgot-password" className={linkClass}>
                  reset it
                </Link>{" "}
                once your email is verified.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-5">
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
                <Link href="/app/login" className={linkClass}>
                  Go to sign in
                </Link>
              </div>
            </>
          )}

          {serverMessage && (
            <p className="mt-3 text-xs text-[#888888]">{serverMessage}</p>
          )}

          <button
            type="button"
            onClick={onDismiss}
            className="mt-4 block text-xs font-bold uppercase tracking-wider text-[#888888] hover:text-[#555555] transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
