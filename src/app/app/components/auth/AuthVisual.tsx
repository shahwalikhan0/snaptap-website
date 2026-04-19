import React from "react";

export interface AuthVisualProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  isLogin?: boolean;
}

export function AuthVisual({
  children,
  title,
  subtitle,
  isLogin = false,
}: AuthVisualProps) {
  return (
    <div
      className={`hidden md:flex ${
        isLogin ? "flex-1" : "md:w-[45%]"
      } bg-[#F8FAFC] flex-col items-center justify-start p-8 md:p-12 pt-16 md:pt-20 relative overflow-hidden transition-all duration-700`}
    >
      {/* Premium Mesh Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00A8DE]/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#007cae]/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-[#006080]/10 rounded-full blur-[100px]" />
      </div>

      <div
        className={`w-full ${
          isLogin ? "max-w-xl" : "max-w-md"
        } aspect-square relative z-10 mb-8 drop-shadow-2xl transition-transform duration-500 hover:scale-[1.02]`}
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-[6px] border border-white/20 shadow-inner" />
        {children}
      </div>

      <div className="text-center z-10 max-w-md">
        <h1 className="text-4xl md:text-5xl font-black text-[#2e2e2e] mb-6 tracking-tight leading-tight">
          {title}
        </h1>
        <p className="text-[#555555] text-lg md:text-xl font-medium leading-relaxed opacity-90">
          {subtitle}
        </p>
      </div>

      {/* Decorative Accent */}
      <div className="absolute bottom-8 left-8 flex items-center gap-2 opacity-30">
        <div className="w-12 h-1 bg-[#007cae] rounded-full" />
        <div className="w-4 h-1 bg-[#007cae] rounded-full" />
      </div>
    </div>
  );
}
