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
  location?: string;
  subscribed_package_id?: number;
}
export interface BrandFormValues {
  brandName?: string;
  brandDescription?: string;
}
