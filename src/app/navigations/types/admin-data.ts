// types/admin-data.ts

export type AdminDataType = {
  id: number;
  name: string; // from brand.name
  username: string;
  email: string;
  description?: string | null;
  image_url?: string | null;
};

export type AdminContextType = {
  Admin: AdminDataType | null;
  setAdmin: (admin: AdminDataType | null) => void;
};
