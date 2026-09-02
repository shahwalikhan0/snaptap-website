import axios from "axios";
import { publicApi } from "@/app/utils/api";
import { ENDPOINTS } from "@/app/utils/endpoints";

export async function createBrandAccount(formData: FormData) {
  const response = await publicApi.post(ENDPOINTS.BRAND_CREATE, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export interface ResendVerificationResponse {
  success: boolean;
  message: string;
}

/**
 * Re-send the account's email-verification link.
 *
 * `identifier` is a username **or** an email. The 200 body is deliberately
 * identical whether the account was mailed, does not exist, or is already
 * verified (anti-enumeration) — just show `message`, never infer more.
 */
export async function resendVerificationLink(identifier: string) {
  const response = await publicApi.post<ResendVerificationResponse>(
    ENDPOINTS.BRAND_RESEND_VERIFICATION,
    { identifier },
  );
  return response.data;
}

/**
 * The `409` body from `POST /brand/create`. Which flags are present tells us
 * what collided and, for an unverified email, whether the server already
 * mailed a fresh verification link on our behalf.
 */
export interface SignupConflictBody {
  error?: string;
  emailInUse?: boolean;
  accountVerified?: boolean;
  requiresVerification?: boolean;
  /** `true` when the server just mailed a new link; `false` when on cooldown. */
  resent?: boolean;
  /** Present when `resent` is `false` — seconds until a resend is allowed. */
  retryAfterSeconds?: number;
  usernameInUse?: boolean;
  nameInUse?: boolean;
}

/** Narrow an unknown error into the `409` collision body, if that's what it is. */
export function readSignupConflict(err: unknown): SignupConflictBody | null {
  if (!axios.isAxiosError<SignupConflictBody>(err)) return null;
  if (err.response?.status !== 409) return null;
  return err.response.data ?? {};
}
