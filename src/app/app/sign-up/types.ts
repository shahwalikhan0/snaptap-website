// src/app/app/sign-up/types.ts

export interface SignUpFormValues {
  username: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  location?: string;
  website_url?: string;
  category?: string;
  profileImage?: File[];
}
