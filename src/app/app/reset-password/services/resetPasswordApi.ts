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
