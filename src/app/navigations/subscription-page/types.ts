// src/app/navigations/subscription-page/types.ts

import { Dayjs } from "dayjs";

export type BillingFormValues = {
  name: string; // package name from "package"
  total_amount: number; // from brand_billing.total_amount
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
