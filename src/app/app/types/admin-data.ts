// types/admin-data.ts

export type AdminDataType = {
  id: number;
  name: string; // from brand.name
  username: string;
  email: string;
  phone: string | null; // from brand_detail.phone
  description?: string | null;
  image_url?: string | null;
  created_at: string;
  password?: string; // only if used in frontend logic, else remove for security
};

export type AdminContextType = {
  Admin: AdminDataType | null;
  setAdmin: (admin: AdminDataType | null) => void;
};
