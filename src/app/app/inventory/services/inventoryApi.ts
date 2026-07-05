import api from "@/app/utils/api";
import { ENDPOINTS } from "@/app/utils/endpoints";

export async function fetchProducts(
  page: number,
  limit: number,
  search: string,
  status: string,
) {
  return api.get(
    `${ENDPOINTS.PRODUCT_LIST}?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}&status=${status}`,
  );
}

export async function fetchProductDetail(productId: string) {
  return api.get(ENDPOINTS.PRODUCT_DETAIL(productId));
}

export async function updateProduct(productId: string, formData: FormData) {
  return api.put(ENDPOINTS.PRODUCT_UPDATE(productId), formData);
}

export async function deleteProduct(productId: string) {
  return api.delete(ENDPOINTS.PRODUCT_DELETE(productId));
}
