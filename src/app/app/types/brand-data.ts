export type BrandDataType = {
  id: number;
  created_at: string;
  brand_id: number;
  brand_name: string;
  brand_email: string;
  package_name: string;
  total_scans: number;
  scans_remaining: number;
  total_models_generated: number;
  active_products: number;
  in_active_products: number;
  phone: string | null;
  /** ISO 3166-1 alpha-2 — drives Safepay billing + regional pricing */
  country?: string | null;
  location: string | null;
  website_url: string | null;
  category: string | null;
  subscribed_package_id: number | null;
  month: number;
  year: number;
  status: string;
  due_date: string | null;
  date_paid: string | null;
  totalBilling: number;
  is_estimate?: boolean;

  // ── Prepaid billing / trial ──
  /** trialing | trial_expired | active | past_due | delinquent | no_payment_method | pending_activation | trial */
  billing_status?: string;
  /** End of the 7-day free trial. Null once subscribed. */
  trial_ends_at?: string | null;
  /** The paid period already charged for. Null while trialing. */
  period_start?: string | null;
  period_end?: string | null;
  billing_interval?: "monthly" | "annual";
  /** A downgrade queued for the next renewal; upgrades apply immediately. */
  pending_package_id?: number | null;
  cancel_at_period_end?: boolean;
};

