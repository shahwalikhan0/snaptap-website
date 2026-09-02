"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Default cooldown window, in seconds, between two resend requests. */
export const DEFAULT_RESEND_COOLDOWN_SECONDS = 60;

export interface UseResendCooldownResult {
  /** Seconds remaining before another resend is allowed. `0` when idle. */
  secondsLeft: number;
  /** `true` while a cooldown is running — use it to disable the resend button. */
  isCoolingDown: boolean;
  /**
   * Start (or restart) the countdown. Pass the server's `retryAfterSeconds`
   * when a 429 comes back, otherwise the default 60s window is used.
   */
  start: (seconds?: number) => void;
  /** Cancel a running cooldown immediately. */
  reset: () => void;
}

/**
 * Shared 60-second "resend" cooldown used by the OTP, login-verification and
 * signup-collision panels. Ticks once a second and cleans its interval up on
 * unmount, so no state is written after the component goes away.
 */
export function useResendCooldown(
  defaultSeconds: number = DEFAULT_RESEND_COOLDOWN_SECONDS,
): UseResendCooldownResult {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(
    (seconds?: number) => {
      const total = Math.max(0, Math.ceil(seconds ?? defaultSeconds));
      clear();
      setSecondsLeft(total);
      if (total === 0) return;

      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clear();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
    [clear, defaultSeconds],
  );

  const reset = useCallback(() => {
    clear();
    setSecondsLeft(0);
  }, [clear]);

  // Clean up on unmount — prevents setState after the component is gone.
  useEffect(() => clear, [clear]);

  return { secondsLeft, isCoolingDown: secondsLeft > 0, start, reset };
}
