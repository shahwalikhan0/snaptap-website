import { publicApi } from "@/app/utils/api";
import { ENDPOINTS } from "@/app/utils/endpoints";

export interface VerifyEmailResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export async function verifyEmailToken(
  token: string,
): Promise<VerifyEmailResponse> {
  const res = await publicApi.get<VerifyEmailResponse>(
    ENDPOINTS.BRAND_VERIFY_EMAIL(token),
  );
  return res.data;
}
