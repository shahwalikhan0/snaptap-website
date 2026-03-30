"use client";

import { useRouter } from "next/navigation";

const DARK_BG = "#020d14";

export function CallToAction() {
  const router = useRouter();

  return (
    <section
      className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden"
      style={{ background: DARK_BG }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,124,174,0.15) 0%, transparent 70%)",
        }}
      />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#007cae]/40 to-transparent" />

      <div className="relative max-w-3xl mx-auto text-center text-white">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 leading-tight">
          Ready to Bring Your Products Into the Real World?
        </h2>
        <p className="text-base sm:text-xl text-slate-400 mb-8 sm:mb-10 max-w-2xl mx-auto">
          Join businesses using SnapTap to deliver immersive AR product
          experiences that customers trust — and keep coming back for.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push("/app/sign-up")}
            className="bg-[#007cae] text-white font-bold py-4 px-10 rounded-full hover:bg-[#006080] transition-all shadow-xl shadow-[#007cae]/20 hover:shadow-[#007cae]/40 transform hover:-translate-y-1"
          >
            Become a Seller
          </button>
          <button
            onClick={() => router.push("/navigations/contact")}
            className="bg-white/10 border border-white/20 text-white font-bold py-4 px-10 rounded-full hover:bg-white/15 transition-all"
          >
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
}
