import type { Metadata } from "next";
import "./globals.css";
import { AdminProvider } from "./hooks/useAdminContext";
import { SITE_URL, absoluteUrl } from "./utils/site";
// import "@google/model-viewer";

export const metadata: Metadata = {
  title: "SnapTap - 3D & Augmented Reality Product Experiences",
  description:
    "SnapTap is the leading platform for 3D model generation, web-based Augmented Reality, and immersive E-commerce experiences. Digitize your products with SnapTap AR.",
  keywords: [
    "snaptap",
    "SnapTap",
    "gosnaptap",
    "SnapTap AR",
    "3D model generation",
    "Web AR",
    "Augmented Reality E-commerce",
    "AR product viewer",
    "LiDAR scanning",
    "snap tap",
  ],
  metadataBase: new URL(SITE_URL),
  // Self-referencing canonical on the new domain. Combined with the 301 from
  // snaptap.pk this is what tells Google the site moved rather than duplicated.
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SnapTap - 3D & Augmented Reality Product Experiences",
    description:
      "Transform your physical products to immersive AR in minutes with the SnapTap platform.",
    url: SITE_URL,
    siteName: "SnapTap",
    images: [
      {
        url: absoluteUrl("/assets/hero-bg.jpg"),
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SnapTap - 3D & Augmented Reality Product Experiences",
    description:
      "Transform your physical products to immersive AR in minutes with the SnapTap platform.",
    images: [absoluteUrl("/assets/hero-bg.jpg")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminProvider>
      <html lang="en">
        <body className="antialiased">{children}</body>
      </html>
    </AdminProvider>
  );
}
