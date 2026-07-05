import { publicApi } from "@/app/utils/api";
import { ENDPOINTS } from "@/app/utils/endpoints";

export async function createBrandAccount(formData: FormData) {
  const response = await publicApi.post(ENDPOINTS.BRAND_CREATE, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}
