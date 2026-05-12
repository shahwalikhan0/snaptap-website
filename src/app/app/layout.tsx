"use client";

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { usePathname, useRouter } from "next/navigation";
import { useAdmin } from "@/app/hooks/useAdminContext";
import { useEffect } from "react";

// Pages that should render normally even when deactivated
const DEACTIVATED_ALLOWED_PATHS = [
  "/app/login",
  "/app/sign-up",
  "/app/reactivate",
  "/app/forgot-password",
  "/app/reset-password",
];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const { Admin, isLoggedIn, isInitialized } = useAdmin();
  const isShowcase = pathname?.startsWith("/app/showcase");

  // Determine if account is deactivated or pending deletion
  const accountStatus = Admin?.account_status;
  const isDeactivated =
    isLoggedIn &&
    (accountStatus === "deactivated" || accountStatus === "pending_deletion");

  // Check if current path is allowed when deactivated
  const isAllowedPath =
    isShowcase ||
    DEACTIVATED_ALLOWED_PATHS.some((p) => pathname?.startsWith(p));

  // Redirect deactivated users to the reactivate page
  useEffect(() => {
    if (isInitialized && isDeactivated && !isAllowedPath) {
      router.replace("/app/reactivate");
    }
  }, [isInitialized, isDeactivated, isAllowedPath, router]);

  // Showcase pages render without navbar/footer
  if (isShowcase) {
    return <>{children}</>;
  }

  // If deactivated and not on an allowed path, show nothing while redirect happens
  if (isDeactivated && !isAllowedPath) {
    return null;
  }

  // If deactivated but on reactivate page, render without navbar/footer
  if (isDeactivated && pathname?.startsWith("/app/reactivate")) {
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
