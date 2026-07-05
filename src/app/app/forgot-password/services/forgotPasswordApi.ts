import { publicApi } from "@/app/utils/api";
import { ENDPOINTS } from "@/app/utils/endpoints";

export async function sendForgotPasswordEmail(email: string) {
  const response = await publicApi.post(ENDPOINTS.BRAND_FORGOT_PASSWORD, {
    email,
  });
  return response.data;
}
