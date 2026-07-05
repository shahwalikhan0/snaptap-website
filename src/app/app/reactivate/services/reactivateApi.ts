import { publicApi } from "@/app/utils/api";
import { ENDPOINTS } from "@/app/utils/endpoints";

export async function reactivateAccount(token: string) {
  const response = await publicApi.put(
    ENDPOINTS.BRAND_REACTIVATE,
    {},
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return response.data;
}

export async function cancelDeletion(token: string) {
  const response = await publicApi.put(
    ENDPOINTS.BRAND_CANCEL_DELETION,
    {},
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return response.data;
}
