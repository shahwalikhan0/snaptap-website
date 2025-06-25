// const handleSave = async (values: any) => {
//   if (!Brand) return;

// src/app/navigations/subscription-page/types.ts

import { Dayjs } from "dayjs";

export type BillingFormValues = {
  package_name: string;
  totalBilling: number;
  status: string;
  due_date: Dayjs | null;
  active_products: number;
  in_active_products: number;
  scans_used: number;
  total_scans: number;
};

export type SubscriptionComponentProps = {
  selectedPage: string;
  onSelect: (page: string) => void;
};
