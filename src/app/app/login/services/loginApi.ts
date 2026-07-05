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
      message: payload?.message ?? null,
    };
  } catch {
    return { requires_action: false, message: null };
  }
}
