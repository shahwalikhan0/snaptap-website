/**
 * Canonical public URLs. SnapTap moved from snaptap.pk to gosnaptap.com when
 * it went international — keep every user-visible link, SEO tag and support
 * address derived from here so a future move is a one-line change.
 *
 * NEXT_PUBLIC_SITE_URL lets preview/staging deployments advertise themselves
 * correctly instead of claiming to be production.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://gosnaptap.com";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.gosnaptap.com";

export const SUPPORT_EMAIL = "support@gosnaptap.com";

/** Absolute URL for a site-relative path (e.g. canonical tags, OG images). */
export const absoluteUrl = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/**
 * Registered business identity.
 *
 * Payment-gateway onboarding (Safepay) requires the legal business name, the
 * registered address and a customer-service phone number to appear verbatim on
 * the Terms & Conditions page — SnapTap is the *product*, M/S SOLARA is the
 * legal entity that operates it. Kept here so the legal pages, the footer and
 * the contact page can never drift out of sync with one another.
 */
export const LEGAL_BUSINESS_NAME = "M/S SOLARA";

/** Registered office — also the principal place of business. */
export const REGISTERED_ADDRESS = "162, Ali Town, Lahore, 54000, Punjab, Pakistan";

/** Short form for the footer, where the full line doesn't fit. */
export const REGISTERED_ADDRESS_SHORT = "162, Ali Town, Lahore, 54000";

/** Customer-service numbers. Keep the `tel:` form and the display form paired. */
export const SUPPORT_PHONE_PK = { tel: "+923424497829", display: "+92 342 44 97829" };
export const SUPPORT_PHONE_US = { tel: "+13029813030", display: "+1 (302) 981-3030" };

/** Courts named in the governing-law clause of the Terms & Conditions. */
export const JURISDICTION_CITY = "Lahore";
