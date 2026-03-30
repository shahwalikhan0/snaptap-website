import type { Metadata } from "next";
import "./globals.css";
import { AdminProvider } from "./hooks/useAdminContext";
// import "@google/model-viewer";

export const metadata: Metadata = {
  title: "SnapTap - 3D & Augmented Reality Product Experiences",
  description:
    "SnapTap is the leading platform for 3D model generation, web-based Augmented Reality, and immersive E-commerce experiences. Digitize your products with SnapTap AR.",
  keywords: [
    "snaptap",
    "SnapTap",
    "snaptap.pk",
    "SnapTap AR",
    "3D model generation",
    "Web AR",
    "Augmented Reality E-commerce",
    "AR product viewer",
    "LiDAR scanning",
    "snap tap",
  ],
  metadataBase: new URL("https://snaptap.pk"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SnapTap - 3D & Augmented Reality Product Experiences",
    description:
      "Transform your physical products to immersive AR in minutes with the SnapTap platform.",
    url: "https://snaptap.pk",
    siteName: "SnapTap",
    images: [
      {
        url: "https://snaptap.pk/assets/hero-bg.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SnapTap - 3D & Augmented Reality Product Experiences",
    description:
      "Transform your physical products to immersive AR in minutes with the SnapTap platform.",
    images: ["https://snaptap.pk/assets/hero-bg.jpg"],
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
