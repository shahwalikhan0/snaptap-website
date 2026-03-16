import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://snaptap.pk";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/app/inventory",
        "/app/manage-profile",
        "/app/subscription-page",
        "/app/insights",
        "/app/forgot-password",
        "/app/reset-password",
        "/api/",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
