"use client";

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { usePathname } from "next/navigation";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isShowcase = pathname?.startsWith("/app/showcase");

  if (isShowcase) {
    return <>{children}</>;
  }

  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
