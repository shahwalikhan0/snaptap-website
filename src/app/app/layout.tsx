import type { Metadata } from "next";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: "SnapTap | Immersive AR Product Experiences",
  description:
    "SnapTap AR turns any physical product into a web-based augmented reality experience. Scan with iPhone LiDAR, view it life-size in your real environment.",
  openGraph: {
    title: "SnapTap | Immersive AR Product Experiences",
    description:
      "Convert your physical products to AR in minutes with LiDAR scanning.",
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
    title: "SnapTap | Immersive AR Product Experiences",
    description:
      "Convert your physical products to AR in minutes with LiDAR scanning.",
    images: ["https://snaptap.pk/assets/hero-bg.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
