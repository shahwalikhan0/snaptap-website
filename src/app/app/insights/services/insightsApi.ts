import api from "@/app/utils/api";
import { ENDPOINTS } from "@/app/utils/endpoints";
import { BrandData, BillingRecord, ViewTrendRawItem, TopProduct } from "../types";

export async function fetchBrandDetail(): Promise<BrandData> {
  const res = await api.get(ENDPOINTS.BRAND_DETAIL);
  return res.data;
}

export async function fetchBillingCurrent(brandId: number): Promise<BillingRecord> {
  const res = await api.get(ENDPOINTS.BILLING_CURRENT(brandId));
  return res.data;
}

export async function fetchTopViewedProducts(): Promise<TopProduct[]> {
  const res = await api.get(ENDPOINTS.PRODUCT_TOP_VIEWED);
  return res.data;
}

export async function fetchViewTrend(): Promise<ViewTrendRawItem[]> {
  const res = await api.get(ENDPOINTS.PRODUCT_VIEW_TREND);
  return res.data;
}
