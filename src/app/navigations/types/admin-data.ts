export type AdminDataType = {
  id: number;
  username: string;
  email: string;
  phone: string;
  image_url?: string;
};

export type AdminContextType = {
  Admin: AdminDataType | null;
  setAdmin: (admin: AdminDataType | null) => void;
};
