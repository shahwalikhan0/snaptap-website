export type SectionKey = "profile" | "brand";

export interface ProfileFormValues {
  username?: string;
  email?: string;
  fullName?: string;
  description?: string;
}

export interface BrandDetailFormValues {
  website_url?: string;
  category?: string;
  phone?: string;
  /** ISO 3166-1 alpha-2 — drives Safepay billing + regional pricing */
  country?: string;
  location?: string;
  subscribed_package_id: number | null;
}
export interface BrandFormValues {
  brandName?: string;
  brandDescription?: string;
}
