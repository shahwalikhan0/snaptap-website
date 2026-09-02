import axios from "axios";

/**
 * Shape of a 429 "a link was sent recently" body. The backend returns this on
 * `POST /brand/resend-verification` and `POST /brand/forgot-password`, along
 * with a `Retry-After` header.
 */
export interface CooldownInfo {
  /** `true` when the response was a 429 carrying `cooldown: true`. */
  isCooldown: boolean;
  /** Server-supplied wait, in seconds. `null` when the server didn't say. */
  retryAfterSeconds: number | null;
  /** The server's error string, when present. */
  message: string | null;
}

const NO_COOLDOWN: CooldownInfo = {
  isCooldown: false,
  retryAfterSeconds: null,
  message: null,
};

function toSeconds(value: unknown): number | null {
  const n = typeof value === "string" ? Number(value) : value;
  return typeof n === "number" && Number.isFinite(n) && n > 0
    ? Math.ceil(n)
    : null;
}

/**
 * Narrow an unknown error into cooldown info. Reads `retryAfterSeconds` from
 * the body first and falls back to the `Retry-After` header.
 */
export function readCooldown(err: unknown): CooldownInfo {
  if (!axios.isAxiosError(err) || err.response?.status !== 429) {
    return NO_COOLDOWN;
  }

  const data = err.response.data as
    | { error?: string; cooldown?: boolean; retryAfterSeconds?: number }
    | undefined;

  return {
    isCooldown: true,
    retryAfterSeconds:
      toSeconds(data?.retryAfterSeconds) ??
      toSeconds(err.response.headers?.["retry-after"]),
    message: typeof data?.error === "string" ? data.error : null,
  };
}
