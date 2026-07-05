import api from "@/app/utils/api";
import { ENDPOINTS } from "@/app/utils/endpoints";
import { AxiosError } from "axios";

// ---- request / response shapes ----

export interface ProfileUpdatePayload {
  name: string | undefined;
  username: string | undefined;
  description: string | undefined;
  image_url: string | null;
  password: string | null;
  oldPassword: string | null;
}

export interface BrandUpdatePayload {
  website_url: string;
  category: string;
  phone: string;
  location: string;
  subscribed_package_id: number | null;
}

export interface DeleteAccountPayload {
  password: string;
}

// ---- API calls ----

export async function fetchBrandDetail() {
  const res = await api.get(ENDPOINTS.BRAND_DETAIL);
  return res.data;
}

export async function updateProfile(payload: ProfileUpdatePayload) {
  const response = await api.put(ENDPOINTS.BRAND_UPDATE, payload);
  return response.data;
}

export async function updateBrandDetail(payload: BrandUpdatePayload) {
  const response = await api.put(ENDPOINTS.BRAND_UPDATE_DETAIL, payload);
  return response.data;
}

export async function deactivateAccount() {
  const response = await api.put(ENDPOINTS.BRAND_DEACTIVATE);
  return response.data;
}

export async function deleteAccount(payload: DeleteAccountPayload) {
  const response = await api.delete(ENDPOINTS.BRAND_DELETE, {
    data: payload,
  });
  return response.data;
}

// ---- error helper ----

export function getApiErrorMessage(
  err: unknown,
  fallback: string,
): string {
  if (err instanceof AxiosError) {
    return err.response?.data?.error ?? fallback;
  }
  return fallback;
}
