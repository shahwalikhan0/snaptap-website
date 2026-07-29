import { MetadataRoute } from "next";
import { SITE_URL } from "./utils/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_URL;

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
