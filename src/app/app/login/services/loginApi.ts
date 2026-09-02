import axios from "axios";
import { publicApi } from "@/app/utils/api";
import { ENDPOINTS } from "@/app/utils/endpoints";
import type { AdminDataType } from "../../types/admin-data";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  brand: AdminDataType;
  accessToken: string;
  error?: string;
}

export interface BillingGateStatus {
  requires_action: boolean;
  reason: string | null;
  message: string | null;
}

export async function loginBrand(payload: LoginPayload) {
  const response = await publicApi.post<LoginResponse>(
    ENDPOINTS.BRAND_LOGIN,
    payload,
    { withCredentials: true },
  );
  return response.data;
}

export async function fetchBrandDetail(token: string) {
  const response = await publicApi.get(ENDPOINTS.BRAND_DETAIL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function fetchBillingGateStatus(
  brandId: number,
  token: string,
): Promise<BillingGateStatus> {
  try {
    const response = await publicApi.get(
      ENDPOINTS.BILLING_STATUS(brandId),
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      },
    );

    const payload = response.data?.data;
    return {
      requires_action: Boolean(payload?.requires_action),
      reason: payload?.reason ?? null,
      message: payload?.message ?? null,
    };
  } catch {
    return { requires_action: false, reason: null, message: null };
  }
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
 *
 * Rejects with `429 { error, cooldown: true, retryAfterSeconds }` when a link
 * was sent recently, or `400 { error }` when the identifier is missing.
 */
export async function resendVerificationLink(identifier: string) {
  const response = await publicApi.post<ResendVerificationResponse>(
    ENDPOINTS.BRAND_RESEND_VERIFICATION,
    { identifier },
  );
  return response.data;
}

/**
 * The `401` body from `POST /brand/login` may carry `requiresVerification: true`
 * when the account exists but its email was never verified. The email address
 * is deliberately NOT returned, so the resend call has to use the username the
 * user typed as its `identifier`.
 */
export interface LoginErrorBody {
  error?: string;
  requiresVerification?: boolean;
}

/** `true` when a login failure was specifically "verify your email first". */
export function isVerificationRequiredError(err: unknown): boolean {
  if (!axios.isAxiosError<LoginErrorBody>(err)) return false;
  return (
    err.response?.status === 401 &&
    err.response?.data?.requiresVerification === true
  );
}
