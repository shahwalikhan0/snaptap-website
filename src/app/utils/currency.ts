/**
 * SnapTap bills in USD worldwide. Regional discounts are applied server-side
 * (see region_pricing_factor), so amounts arriving from the API are already
 * the brand's final price — the UI never converts, only formats.
 */
export const CURRENCY_CODE = "USD";

type Amount = number | string | null | undefined;

const toNumber = (amount: Amount): number => {
  const n = typeof amount === "string" ? parseFloat(amount) : amount ?? 0;
  return Number.isFinite(n) ? (n as number) : 0;
};

/** "$1,234.56" — the default for invoices, totals and billed amounts. */
export const formatCurrency = (amount: Amount): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: CURRENCY_CODE,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(toNumber(amount));

/**
 * "$19" / "$19.50" — drops trailing ".00" so plan headline prices read
 * cleanly on the pricing cards.
 */
export const formatPrice = (amount: Amount): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: CURRENCY_CODE,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(toNumber(amount));

/**
 * Sub-cent friendly, for per-model-view rates (e.g. "$0.015").
 */
export const formatRate = (amount: Amount): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: CURRENCY_CODE,
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(toNumber(amount));
