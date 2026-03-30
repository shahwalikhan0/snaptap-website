"use client";

import { useRouter } from "next/navigation";
import { FAQItem, SectionHeading } from "../shared";

export function FAQSection() {
  const router = useRouter();

  return (
    <section id="faq" className="mb-4 scroll-mt-28">
      <SectionHeading>Frequently Asked Questions</SectionHeading>
      <div className="space-y-4">
        {[
          {
            q: "Can I use any iPhone to scan products?",
            a: "No. Scanning requires an iPhone Pro or iPhone Pro Max (12 Pro or later) running iOS 18+. These are the only models with the LiDAR depth sensor required for accurate 3D scanning. Standard iPhone models (without Pro) cannot scan. However, any iPhone 6s or newer can view AR products.",
          },
          {
            q: "How long does processing take after I upload a product?",
            a: "Most products are fully processed within 2–10 minutes. The main variable is the model conversion step. Once complete, you receive an in-app notification confirming the product is live.",
          },
          {
            q: "What happens if the processing pipeline fails?",
            a: "If any step fails (conversion, QR generation, etc.), the product is automatically deleted from your catalog and your scan quota is NOT decremented. You'll receive a notification explaining what went wrong. Simply retry the upload.",
          },
          {
            q: "Can I replace the 3D model for an existing product?",
            a: "Not directly. The 3D model is permanent once uploaded. To update a model, delete the existing product and re-upload a new scan. Product details (name, description, price) can be edited without affecting the model.",
          },
          {
            q: "Do customers need to download an app?",
            a: "No. Customers scan the QR code with their native camera app and the AR experience opens in the browser — no app download, no account creation required.",
          },
          {
            q: "What devices support AR viewing?",
            a: "iOS: iPhone 6s+ in Safari using Apple Quick Look. Android: ARCore-supported devices in Chrome using Google Scene Viewer. Desktop: Interactive 3D viewer (no AR). Most modern smartphones are supported.",
          },
          {
            q: "Can I downgrade my plan?",
            a: "Yes, but only if your current product count is less than or equal to the new plan's scan quota. If you have more products than the new plan allows, you must delete products first.",
          },
          {
            q: "Is the QR code permanent?",
            a: "Yes. Each QR code is permanently tied to its product. The link never changes. However, if you delete the product, the QR code link will no longer work.",
          },
          {
            q: "Can I use SnapTap for a restaurant menu?",
            a: "Absolutely. Scan each dish, upload it, and print the generated QR codes on your physical menus or table cards. Customers scan the code and see the dish life-size before ordering.",
          },
          {
            q: "How are AR views counted for billing?",
            a: "Each time a customer opens the AR viewer page for your product (via QR scan or direct link), it counts as one view. Views are tracked per product, per month, and contribute to the usage portion of your monthly bill.",
          },
        ].map((item, i) => (
          <FAQItem key={i} q={item.q} a={item.a} />
        ))}
      </div>

      <div className="mt-10 p-6 bg-[#007cae]/5 border border-[#007cae]/20 rounded-2xl text-center">
        <p className="text-slate-600 text-sm mb-4">
          Still have questions? We're happy to help.
        </p>
        <button
          onClick={() => router.push("/navigations/contact")}
          className="bg-[#007cae] text-white font-bold px-8 py-3 rounded-full hover:bg-[#006080] transition-all text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Contact Support
        </button>
      </div>
    </section>
  );
}
