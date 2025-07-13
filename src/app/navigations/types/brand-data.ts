// "id": 11,
//   "brand_id": 1,
//   "location": "5th Charles, Brooklyn, 54000, New York, USA",
//   "website_url": "https://acme.com",
//   "category": "Aerospace",
//   "subscribed_package_id": 1,
//   "total_scans": 3,
//   "scans_remaining": 0,
//   "total_models_generated": 6,
//   "created_at": "2025-06-25T13:00:53.336Z",
//   "phone": "012345678",
//   "active_products": 1,
//   "in_active_products": 0,
//   "package_name": "Free",
//   "month": 0,
//   "year": 0,
//   "status": "Active",
//   "due_date": null,
//   "date_paid": null,
//   "totalBilling": 0
export type BrandDataType = {
  id: number;
  created_at: string;
  brand_id: number;
  package_name: string;
  total_scans: number;
  scans_remaining: number;
  total_models_generated: number;
  active_products: number;
  in_active_products: number;
  phone: string | null;
  location: string | null;
  website_url: string | null;
  category: string | null;
  subscribed_package_id: number;
  month: number;
  year: number;
  status: string;
  due_date: string | null;
  date_paid: string | null;
  totalBilling: number;
};

export type BrandContextType = {
  Brand: BrandDataType | null;
  setBrand: (brand: BrandDataType | null) => void;
};
