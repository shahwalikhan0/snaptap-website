export type BrandDataType = {
  id: number;
  created_at: string;
  brand_id: number;
  package_name: string;
  total_scans: number;
  scans_remaining: number;
  total_models_generated: number;
  active_products: number;
  in_active_products: number;
  phone: string | null;
  location: string | null;
  website_url: string | null;
  category: string | null;
  subscribed_package_id: number;
  month: number;
  year: number;
  status: string;
  due_date: string | null;
  date_paid: string | null;
  totalBilling: number;
};

export type BrandContextType = {
  Brand: BrandDataType | null;
  setBrand: (brand: BrandDataType | null) => void;
};
