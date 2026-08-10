"use client";

import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui";

const ModelViewer = dynamic(
  () => import("../../components/ModelViewerWrapper"),
  {
    ssr: false,
  },
);

export function HeroSection() {
  const router = useRouter();

  return (
    <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 md:px-12 lg:px-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 text-center md:text-left z-10">
          <h1 className="text-display font-bold text-slate-900 mb-4 sm:mb-6">
            <span className="text-snaptap-blue-dark">SnapTap</span>
            <br /> The Ultimate AR Product Viewer
          </h1>
          <h2 className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-2xl mx-auto md:mx-0 font-medium">
            SnapTap transforms physical products into realistic, scalable 3D
            Augmented Reality experiences. Let your customers visualize products
            in their real environment before buying.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button variant="primary" onClick={() => router.push("/app/sign-up")}>
              Start as Seller
            </Button>
            <Button variant="secondary" onClick={() => router.push("/app/docs")}>
              Learn More
              <Icon icon="mdi:arrow-right" width={18} />
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/2 relative">
          <div className="relative rounded-brand p-2 bg-white/50 backdrop-blur-sm border border-slate-100 shadow-2xl h-[280px] sm:h-[350px] md:h-[500px] w-full items-center justify-center flex">
            {/* Using ModelViewer as the Hero Visual */}
            <div className="w-full h-full rounded-brand overflow-hidden relative bg-gray-50">
              <ModelViewer />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
