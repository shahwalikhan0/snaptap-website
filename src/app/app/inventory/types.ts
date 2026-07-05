export interface Product {
  id: number;
  name: string;
  price: number | string;
  description: string | null;
  category: string;
  brand_id: number;
  model_url: string | null;
  qr_code_url: string | null;
  image_url: string | null;
  glb_file_url: string | null;
  is_active: boolean;
  created_at: string;
  views?: number;
  status?: string;
}
