// src/app/app/sign-up/types.ts

export interface SignUpFormValues {
  username: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  /** ISO 3166-1 alpha-2 — drives Safepay billing + regional pricing */
  country?: string;
  location?: string;
  website_url?: string;
  category?: string;
  profileImage?: File[];
}
