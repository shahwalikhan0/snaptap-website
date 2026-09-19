export const ENDPOINTS = {
  // ── Brand / Auth ──
  BRAND_CREATE: "/brand/create",
  BRAND_LOGIN: "/brand/login",
  BRAND_DETAIL: "/brand/detail",
  BRAND_UPDATE: "/brand/update",
  BRAND_UPDATE_DETAIL: "/brand/update-detail",
  BRAND_DEACTIVATE: "/brand/deactivate",
  BRAND_DELETE: "/brand/delete",
  BRAND_REACTIVATE: "/brand/reactivate",
  BRAND_CANCEL_DELETION: "/brand/cancel-deletion",
  BRAND_FORGOT_PASSWORD: "/brand/forgot-password",
  BRAND_VERIFY_OTP: "/brand/verify-otp",
  BRAND_RESET_PASSWORD: "/brand/reset-password",
  BRAND_REFRESH_TOKEN: "/brand/refresh-token",
  BRAND_VERIFY_EMAIL: (token: string) => `/brand/verify-email/${token}`,
  BRAND_RESEND_VERIFICATION: "/brand/resend-verification",

  BRAND_CANCEL_PLAN: "/brand/cancel-plan",

  // ── Billing ──
  BILLING_STATUS: (brandId: number) => `/billing/brand/${brandId}/status`,
  BILLING_CURRENT: (brandId: number) => `/billing/brand/${brandId}/current`,
  BILLING_INVOICES: (brandId: number) => `/billing/brand/${brandId}/invoices`,

  // ── Subscription (prepaid + trial) ──
  // Every one of these acts on the CALLER's own subscription — the brand id
  // comes from the token, never a param.
  SUBSCRIPTION: "/subscription",
  SUBSCRIPTION_SUBSCRIBE: "/subscription/subscribe",
  SUBSCRIPTION_CHANGE_PLAN: "/subscription/change-plan",
  SUBSCRIPTION_CANCEL: "/subscription/cancel",
  SUBSCRIPTION_RESUME: "/subscription/resume",

  // ── Payment (Safepay) ──
  PAYMENT_SETUP_SESSION: "/payment/setup-session",
  PAYMENT_SETUP_COMPLETE: "/payment/setup-complete",
  PAYMENT_METHOD: "/payment/method",

  // ── Product ──
  PRODUCT_LIST: "/product/brand-id",
  PRODUCT_DETAIL: (id: string) => `/product/detail-for-brand/${id}`,
  PRODUCT_UPDATE: (id: string) => `/product/update/${id}`,
  PRODUCT_DELETE: (id: string) => `/product/${id}`,
  PRODUCT_SHOWCASE: (brandId: string) => `/product/showcase/${brandId}`,
  PRODUCT_TOP_VIEWED: "/product/brand-analytics/top-viewed",
  PRODUCT_VIEW_TREND: "/product/brand-analytics/view-trend",

  // ── Packages ──
  PACKAGE_LIST: "/package",
  // Server-computed custom-plan price (single source of truth for the formula)
  PACKAGE_QUOTE: "/package/quote",
} as const;
