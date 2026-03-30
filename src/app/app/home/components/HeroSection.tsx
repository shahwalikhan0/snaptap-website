"use client";

import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

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
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 mb-4 sm:mb-6">
            <span className="text-[#007cae]">SnapTap:</span> The Ultimate AR Product Viewer
          </h1>
          <h2 className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-2xl mx-auto md:mx-0 font-medium">
            SnapTap transforms physical products into realistic, scalable 3D
            Augmented Reality experiences. Let your customers visualize products in their real environment before buying.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={() => router.push("/app/sign-up")}
              className="bg-[#007cae] text-white font-semibold py-3 px-8 rounded-full hover:bg-[#006080] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start as Seller
            </button>
            <button
              onClick={() => router.push("/app/docs")}
              className="bg-white text-slate-700 border border-slate-200 font-semibold py-3 px-8 rounded-full hover:bg-slate-50 transition-all shadow hover:shadow-md flex items-center gap-2"
            >
              Learn More
              <Icon icon="mdi:arrow-right" width={18} />
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 relative">
          <div className="relative rounded-2xl p-2 bg-white/50 backdrop-blur-sm border border-slate-100 shadow-2xl h-[280px] sm:h-[350px] md:h-[500px] w-full items-center justify-center flex">
            {/* Using ModelViewer as the Hero Visual */}
            <div className="w-full h-full rounded-xl overflow-hidden relative bg-gray-50">
              <ModelViewer />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
