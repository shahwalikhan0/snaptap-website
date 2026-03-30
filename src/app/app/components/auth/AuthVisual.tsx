import React from "react";

export interface AuthVisualProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  isLogin?: boolean;
}

export function AuthVisual({ children, title, subtitle, isLogin = false }: AuthVisualProps) {
  return (
    <div
      className={`hidden md:flex ${
        isLogin ? "flex-1" : "md:w-[40%]"
      } bg-gradient-to-br from-[#007cae]/10 via-[#007cae]/5 to-white flex-col items-center justify-center p-8 md:p-12 pt-28 md:pt-28 relative overflow-hidden`}
    >
      {/* Decorative background shape */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#007cae]/5 rounded-full blur-3xl" />

      <div
        className={`w-full ${
          isLogin ? "max-w-lg" : "max-w-sm"
        } aspect-square relative z-10 mb-8`}
      >
        {children}
      </div>

      <div className="text-center z-10 max-w-sm">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
          {title}
        </h1>
        <p className="text-slate-600 text-lg">{subtitle}</p>
      </div>
    </div>
  );
}
