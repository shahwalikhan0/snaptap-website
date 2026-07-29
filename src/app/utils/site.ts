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
