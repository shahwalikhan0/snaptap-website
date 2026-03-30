"use client";

import { Icon } from "@iconify/react";
import { SectionHeading, SubHeading, InfoBox, CheckList } from "../shared";

export function ModelProcessing() {
  return (
    <section id="processing" className="mb-16 scroll-mt-28">
      <SectionHeading>Model Processing</SectionHeading>
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
        After you submit a product, SnapTap's backend handles everything
        automatically. Here's exactly what happens behind the scenes.
      </p>

      <SubHeading id="proc-pipeline">
        The Processing Pipeline
      </SubHeading>
      <div className="space-y-0 mb-6">
        {[
          {
            icon: "mdi:upload",
            label: "Upload Received",
            desc: 'The server receives your model file and product image. A product record is created in the database immediately — the model URL is set to "processing" while work continues in the background.',
          },
          {
            icon: "mdi:image-plus",
            label: "Product Image Stored",
            desc: "Your product thumbnail is uploaded to SnapTap's cloud storage (DigitalOcean Spaces) and linked to the product.",
          },
          {
            icon: "mdi:swap-horizontal",
            label: "Model Conversion",
            desc: "The model file is converted to web-standard format by SnapTap's conversion service. GLB works on all devices and web browsers; the original model file is retained for iOS Quick Look AR. This is the longest step and typically takes 1–5 minutes.",
          },
          {
            icon: "mdi:qrcode-plus",
            label: "QR Code Generated",
            desc: "A unique QR code is generated and uploaded. It links directly to the SnapTap AR viewer page for this product (e.g. api.snaptap.pk/model/name/{productId}).",
          },
          {
            icon: "mdi:database-check",
            label: "Product Finalized",
            desc: "The product record is updated with the final model URL and QR code URL. Your scan quota is decremented by 1 and your active product count is updated.",
          },
          {
            icon: "mdi:bell-check",
            label: "You're Notified",
            desc: 'A notification appears in your dashboard: "Your product has been successfully processed and is now live!"',
          },
        ].map((step, i, arr) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-[#007cae] text-white flex items-center justify-center shrink-0 z-10">
                <Icon icon={step.icon} width={17} />
              </div>
              {i < arr.length - 1 && (
                <div className="w-px flex-1 bg-[#007cae]/20 my-1" />
              )}
            </div>
            <div className="pb-6">
              <p className="font-bold text-slate-800 text-sm mb-1">
                {step.label}
              </p>
              <p className="text-slate-500 text-xs leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      <InfoBox type="warning">
        If conversion fails for any reason (rare network issue,
        unsupported model), the product is automatically{" "}
        <strong>rolled back and deleted</strong> from your catalog. You
        will receive a failure notification with guidance to retry.
      </InfoBox>

      <SubHeading id="proc-notifications">Notifications</SubHeading>
      <p className="text-slate-600 text-sm leading-relaxed mb-3">
        SnapTap sends in-app notifications to your dashboard for key
        events. You'll see them in the notification bell in the top bar.
      </p>
      <CheckList
        items={[
          "🎉 Product Ready — when your product finishes processing successfully",
          "❌ Model Processing Failed — with the reason and a prompt to retry",
          "⭐ New Customer Rating — when a customer rates one of your products",
          "💬 New Customer Feedback — when a customer leaves a written review",
        ]}
      />

      <SubHeading id="proc-qr">QR Code Generation</SubHeading>
      <p className="text-slate-600 text-sm leading-relaxed mb-3">
        Each product gets a unique QR code that links to its AR viewer
        page. The QR code is created automatically as part of the
        processing pipeline — you don't need to do anything.
      </p>
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 my-4 font-mono text-xs text-slate-600 break-all">
        QR Code URL format:{" "}
        <span className="text-[#007cae] font-bold">
          https://api.snaptap.pk/model/name/&#123;productId&#125;
        </span>
      </div>
      <CheckList
        items={[
          "Download the QR code PNG from your product dashboard",
          "Print it on menus, price tags, in-store display cards, packaging inserts, or flyers",
          "Share it digitally via WhatsApp, Instagram, email, or embed it in your website",
          "The QR code never changes — it always points to the current version of the model",
        ]}
      />
    </section>
  );
}
