// types.ts

export interface AdminData {
  username: string;
  name: string; // Full name
}

export interface BrandData {
  id: number;
  created_at: string; // Brand creation timestamp

  package_name: string; // Plan name
  total_scans: number; // Total scans in the plan
  scans_remaining: number;

  total_models_generated: number;

  active_products: number;
  in_active_products: number;

  category: string | null;

  month: number; // Month of brand creation
  year: number; // Year of brand creation

  status: string; // Brand status

  due_date: string | null; // Billing due date
  date_paid: string | null; // Last paid date

  totalBilling: number; // Total bill amount
}
