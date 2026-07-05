import { publicApi } from "@/app/utils/api";
import api from "@/app/utils/api";
import { ENDPOINTS } from "@/app/utils/endpoints";
import { PlanType } from "../../types/plan";

export async function fetchAllPlans(): Promise<PlanType[]> {
  const res = await publicApi.get(ENDPOINTS.PACKAGE_LIST);
  return Array.isArray(res.data) ? res.data : [];
}

export async function fetchPlans(): Promise<PlanType[]> {
  const all = await fetchAllPlans();
  return all.filter((p) => [1, 2, 3].includes(p.id));
}

interface UpdatePlanPayload {
  subscribed_package_id: number;
  total_scans?: number;
}

export async function updatePlanDetail(payload: UpdatePlanPayload) {
  return api.put(ENDPOINTS.BRAND_UPDATE_DETAIL, payload);
}
