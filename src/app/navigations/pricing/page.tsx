"use client";

import Pricing from "@/app/navigations/pricing/pricing-component";
import { useAdmin } from "@/app/hooks/useAdminContext";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const { isLoggedIn } = useAdmin();
  const router = useRouter();

  if (isLoggedIn) {
    router.replace("/");
  }

  return (
    <>
      <div>
        <Pricing />
      </div>
    </>
  );
}
