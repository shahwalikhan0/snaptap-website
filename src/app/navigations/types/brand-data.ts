//     "id": 1,
//     "created_at": "2025-05-08T20:55:15.128219+00:00",
//     "brand_id": 2,
//     "package_id": 1,
//     "package_name": "Basic",
//     "total_scans": 3,
//     "scans_used": 1,
//     "active_products": 4,
//     "in_active_products": 3,
//     "month": 4,
//     "year": 2025,
//     "status": "unpaid",
//     "due_date": "2025-05-17",
//     "date_paid": null,
//     "totalBilling": 990
export type BrandDataType = {
  id: number;
  created_at: string;
  brand_id: number;
  package_id: number;
  package_name: string;
  total_scans: number;
  scans_used: number;
  active_products: number;
  in_active_products: number;
  month: number;
  year: number;
  status: string;
  due_date: string;
  date_paid: string | null;
  totalBilling: number;
};

export type BrandContextType = {
  Brand: BrandDataType | null;
  setBrand: (brand: BrandDataType | null) => void;
};
