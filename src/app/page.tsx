"use client";

import { MainScreen } from "./app/home/components/main-screen";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "SnapTap",
            "alternateName": "Snaptap",
            "url": "https://snaptap.pk",
            "logo": "https://snaptap.pk/assets/icon.png",
            "sameAs": ["https://www.instagram.com/snaptappk/"],
            "description": "SnapTap provides immersive 3D and Augmented Reality e-commerce solutions."
          }),
        }}
      />
      {/* WebSite Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "SnapTap",
            "url": "https://snaptap.pk",
            "description": "Create and view 3D Augmented Reality product models for your business using SnapTap.",
            "inLanguage": "en"
          }),
        }}
      />
      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "SnapTap",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "PKR",
            },
          }),
        }}
      />
      <MainScreen />
    </div>
  );
}
