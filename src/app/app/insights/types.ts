// types.ts

export interface AdminData {
  id: number;
  username: string;
  name: string;
  email: string;
  image_url?: string | null;
  account_status: string;
  created_at: string;
}

export interface BrandData {
  id: number;
  created_at: string;

  package_name: string;
  total_scans: number;
  scans_remaining: number;

  total_models_generated: number;

  active_products: number;
  in_active_products: number;

  category: string | null;

  month: number;
  year: number;

  status: string;

  due_date: string | null;
  date_paid: string | null;

  totalBilling: number;

  subscribed_package_id: number | null;
  brand_name?: string;
  brand_email?: string;
}

export interface BillingRecord {
  id: string;
  month: string;
  total_views: number;
  hits_amount: number;
  subscribed_package_amount: number;
  total_amount: number;
  is_paid: boolean;
  paid_at: string | null;
  due_date: string;
}
