import { NextRequest, NextResponse } from "next/server";

/**
 * Legacy-domain redirect (snaptap.pk -> gosnaptap.com).
 *
 * The primary redirect should live at the DNS/hosting layer, which is cheaper
 * and covers non-Next traffic. This is the fallback for setups where both
 * domains resolve to the same deployment: it fires before any page renders, so
 * a visitor landing on the old domain never sees old-domain content.
 *
 * 308 (permanent + preserves method) so crawlers transfer ranking signals and
 * non-GET requests aren't silently downgraded.
 */
const LEGACY_HOSTS = new Set([
  "snaptap.pk",
  "www.snaptap.pk",
]);

const NEW_HOST = "gosnaptap.com";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();

  if (host && LEGACY_HOSTS.has(host)) {
    const url = request.nextUrl.clone();
    url.host = NEW_HOST;
    url.protocol = "https";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Skip Next internals and static assets — nothing to redirect there.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
