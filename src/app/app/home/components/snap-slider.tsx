"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const slides = [
  {
    word: "Snap.",
    tagline: "Scan Any Product in Seconds",
    description:
      "Point your smartphone camera at any physical product. SnapTap's scanning engine captures depth, texture, and geometry — turning real objects into precise 3D models in minutes.",
    image: "/assets/snap_slide.png",
    alt: "Phone scanning a chair with blue holographic rays",
    badge: "Step 01",
  },
  {
    word: "Tap.",
    tagline: "Preview Before You Place an Order",
    description:
      "Customers tap a QR code and instantly see the product rendered true-to-scale inside their camera view. No app download. No guessing. Just tap — and it's there.",
    image: "/assets/tap_slide.png",
    alt: "Smartphone showing AR chair in camera viewfinder",
    badge: "Step 02",
  },
  {
    word: "Experience.",
    tagline: "See It in Your Space Before You Buy",
    description:
      "Walk around it, resize it, reposition it. SnapTap AR is so accurate, customers can decide with full confidence — reducing returns and boosting conversion.",
    image: "/assets/experience_slide.png",
    alt: "Person experiencing AR chair in a beautiful living room",
    badge: "Step 03",
  },
];

/**
 * Scroll-driven slider.
 *
 * The outer wrapper is tall enough to accommodate one "virtual scroll page"
 * per slide (100vh each). The inner sticky container is pinned to the top of
 * the viewport for the entire height of the wrapper, so the section never
 * leaves the screen while the user scrolls through the slides.
 *
 * We watch the scroll position relative to the wrapper and map it to an
 * active slide index.
 */
export const SnapSlider = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"down" | "up">("down");
  const prevActive = useRef(0);

  // Derive active slide index from scroll position
  useEffect(() => {
    const onScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const { top, height } = wrapper.getBoundingClientRect();
      // How far we've scrolled inside the wrapper, clamped to [0, height-1vh]
      const scrolled = Math.max(0, -top);
      const scrollable = height - window.innerHeight;
      const progress = Math.min(scrolled / scrollable, 1);

      // Map progress to slide index
      const raw = progress * slides.length;
      const idx = Math.min(Math.floor(raw), slides.length - 1);

      if (idx !== prevActive.current) {
        setDirection(idx > prevActive.current ? "down" : "up");
        setAnimating(true);
        setTimeout(() => {
          setActive(idx);
          setAnimating(false);
        }, 350);
        prevActive.current = idx;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const slide = slides[active];

  return (
    /**
     * Outer wrapper — its height = slides.length * 180vh so the user has to
     * scroll enough to feel deliberate (≈540vh total, 180vh per slide).
     */
    <div
      ref={wrapperRef}
      style={{ height: `${slides.length * 180}vh`, width: '100vw' }}
      className="relative"
    >
      {/* Sticky inner — stays pinned while the wrapper is in view */}
      <div className="sticky top-0 h-screen overflow-hidden bg-[#020d14]">
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,124,174,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px)",
          }}
        />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-block text-[#007cae] text-sm font-bold uppercase tracking-widest mb-3">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Stop Guessing.{" "}
              <span className="text-[#007cae]">Start Experiencing.</span>
            </h2>
            <p className="mt-4 text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
              Three simple steps that turn any product into an immersive
              augmented reality experience your customers will love.
            </p>
          </div>

          {/* Slide Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left: Text */}
            <div
              style={{
                transition: "opacity 0.35s ease, transform 0.35s ease",
                opacity: animating ? 0 : 1,
                transform: animating
                  ? direction === "down"
                    ? "translateY(24px)"
                    : "translateY(-24px)"
                  : "translateY(0)",
              }}
            >
              <span className="inline-block bg-[#007cae]/20 text-[#007cae] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 border border-[#007cae]/30">
                {slide.badge}
              </span>
              <h3 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-3 leading-none">
                {slide.word}
              </h3>
              <p className="text-[#007cae] text-lg sm:text-xl font-semibold mb-4">
                {slide.tagline}
              </p>
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-lg">
                {slide.description}
              </p>

              {/* Progress dots — visual only, no click */}
              <div className="flex items-center gap-3 mt-10">
                {slides.map((_, idx) => (
                  <div
                    key={idx}
                    className={`rounded-full transition-all duration-300 ${
                      idx === active
                        ? "w-8 h-3 bg-[#007cae] shadow-lg shadow-[#007cae]/40"
                        : "w-3 h-3 bg-white/20"
                    }`}
                  />
                ))}
              </div>

              {/* Scroll hint — only visible on first slide */}
              <p
                className="mt-5 text-white/30 text-sm flex items-center gap-2"
                style={{
                  transition: "opacity 0.4s ease",
                  opacity: active === 0 ? 1 : 0,
                }}
              >
                <svg
                  className="w-4 h-4 animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                Scroll to explore
              </p>
            </div>

            {/* Right: Image */}
            <div
              style={{
                transition: "opacity 0.35s ease, transform 0.35s ease",
                opacity: animating ? 0 : 1,
                transform: animating
                  ? direction === "down"
                    ? "translateY(-24px)"
                    : "translateY(24px)"
                  : "translateY(0)",
              }}
              className="relative"
            >
              {/* Glow ring */}
              <div
                className="absolute inset-4 rounded-2xl blur-3xl opacity-30"
                style={{ background: "#007cae" }}
              />
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3]">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#020d14]/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
