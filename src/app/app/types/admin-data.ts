export type AdminDataType = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string | null;
  description?: string | null;
  image_url?: string | null;
  created_at: string;
  account_status: string;
};
