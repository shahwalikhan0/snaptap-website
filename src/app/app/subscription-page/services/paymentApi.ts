import api from "@/app/utils/api";
import { ENDPOINTS } from "@/app/utils/endpoints";

export interface PaymentMethodInfo {
  card_brand: string | null;
  last4: string | null;
  status: string;
  created_at: string;
}

export interface InvoiceRecord {
  id: string;
  month: string;
  base_amount: string;
  usage_amount: string;
  total_views: number;
  total_amount: string;
  status: "pending" | "paid" | "failed" | "delinquent" | "void";
  attempts: number;
  paid_at: string | null;
  created_at: string;
}

/** Start a Safepay hosted card-setup session; caller redirects to checkoutUrl. */
export async function createSetupSession(): Promise<string> {
  const res = await api.post(ENDPOINTS.PAYMENT_SETUP_SESSION);
  return res.data?.data?.checkoutUrl;
}

/**
 * Claim the saved card after the Safepay hosted session. The server reads the
 * Safepay wallet directly, so no redirect params are needed. Idempotent.
 */
export async function completeSetupSession(): Promise<void> {
  await api.post(ENDPOINTS.PAYMENT_SETUP_COMPLETE);
}

/** The brand's saved card, or null when none is on file. */
export async function fetchPaymentMethod(): Promise<PaymentMethodInfo | null> {
  const res = await api.get(ENDPOINTS.PAYMENT_METHOD);
  return res.data?.data ?? null;
}

/** Detach the saved card (server rejects while an invoice is unsettled). */
export async function removePaymentMethod(): Promise<void> {
  await api.delete(ENDPOINTS.PAYMENT_METHOD);
}

/** Invoice history (last 12 months). */
export async function fetchInvoices(brandId: number): Promise<InvoiceRecord[]> {
  const res = await api.get(ENDPOINTS.BILLING_INVOICES(brandId));
  return res.data || [];
}
