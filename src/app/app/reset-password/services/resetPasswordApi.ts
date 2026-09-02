import { publicApi } from "@/app/utils/api";
import { ENDPOINTS } from "@/app/utils/endpoints";

export async function verifyOtp(email: string, otp: string) {
  const response = await publicApi.post(ENDPOINTS.BRAND_VERIFY_OTP, {
    email,
    otp,
  });
  return response.data;
}

export async function resetPassword(
  email: string,
  otp: string,
  newPassword: string,
) {
  const response = await publicApi.post(ENDPOINTS.BRAND_RESET_PASSWORD, {
    email,
    otp,
    newPassword,
  });
  return response.data;
}

/**
 * Re-request the 6-digit reset code for an email that is already known (the
 * OTP screen has it in its query string, so the user never retypes it).
 *
 * May reject with a `429 { error, cooldown: true, retryAfterSeconds }` —
 * see `readCooldown()` in `@/app/utils/resend`.
 */
export async function sendForgotPasswordEmail(email: string) {
  const response = await publicApi.post(ENDPOINTS.BRAND_FORGOT_PASSWORD, {
    email,
  });
  return response.data;
}
