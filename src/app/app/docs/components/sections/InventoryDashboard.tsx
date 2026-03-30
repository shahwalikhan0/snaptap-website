"use client";

import { Icon } from "@iconify/react";
import { SectionHeading, SubHeading, InfoBox, CheckList } from "../shared";

export function InventoryDashboard() {
  return (
    <section id="inventory" className="mb-16 scroll-mt-28">
      <SectionHeading>Inventory & Dashboard</SectionHeading>
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
        The SnapTap web dashboard is your control center for managing
        your AR product catalog.
      </p>

      <SubHeading id="inv-manage">Managing Products</SubHeading>
      <p className="text-slate-600 text-sm leading-relaxed mb-3">
        Your inventory page lists all your products with their status,
        thumbnail, QR code, and model link.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {[
          {
            icon: "mdi:eye",
            title: "Active Products",
            desc: "Visible to customers on the SnapTap marketplace. AR views are tracked and counted toward billing.",
          },
          {
            icon: "mdi:eye-off",
            title: "Inactive Products",
            desc: "Hidden from the marketplace. AR views are not tracked. Use this for drafts or seasonal items.",
          },
          {
            icon: "mdi:pencil",
            title: "Edit Product",
            desc: "Update the product name, description, price, category, or thumbnail image at any time. The 3D model itself cannot be replaced — re-upload as a new product.",
          },
          {
            icon: "mdi:delete",
            title: "Delete Product",
            desc: "Permanently removes the product, its 3D model, image, and QR code from SnapTap. This action cannot be undone.",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="flex gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50"
          >
            <Icon
              icon={card.icon}
              className="text-[#007cae] shrink-0 mt-0.5"
              width={18}
            />
            <div>
              <p className="font-bold text-slate-800 text-sm mb-1">
                {card.title}
              </p>
              <p className="text-slate-500 text-xs leading-relaxed">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      <InfoBox type="warning">
        Your plan has a <strong>maximum product limit</strong> equal to
        your scan quota. If you hit the limit, you cannot add new
        products until you delete existing ones or upgrade your plan.
      </InfoBox>

      <SubHeading id="inv-embed">
        Embedding the AR Viewer on Your Website
      </SubHeading>
      <p className="text-slate-600 text-sm leading-relaxed mb-3">
        Every product has a shareable model viewer URL. You can embed it
        directly on your e-commerce website using an{" "}
        <code className="bg-slate-100 px-1 rounded text-xs">
          &lt;iframe&gt;
        </code>{" "}
        tag.
      </p>
      <div className="bg-slate-900 rounded-xl p-5 font-mono text-xs text-slate-300 overflow-x-auto mb-4">
        <span className="text-slate-500">{`<!-- Copy this into your product page -->`}</span>
        {"\n"}
        <span className="text-[#007cae]">&lt;iframe</span>
        {"\n  "}
        <span className="text-green-400">src</span>
        <span className="text-slate-300">=</span>
        <span className="text-amber-300">
          "https://api.snaptap.pk/model/name/YOUR_PRODUCT_ID"
        </span>
        {"\n  "}
        <span className="text-green-400">width</span>
        <span className="text-slate-300">=</span>
        <span className="text-amber-300">"100%"</span>
        {"\n  "}
        <span className="text-green-400">height</span>
        <span className="text-slate-300">=</span>
        <span className="text-amber-300">"500"</span>
        {"\n  "}
        <span className="text-green-400">allow</span>
        <span className="text-slate-300">=</span>
        <span className="text-amber-300">"xr-spatial-tracking"</span>
        {"\n  "}
        <span className="text-green-400">frameborder</span>
        <span className="text-slate-300">=</span>
        <span className="text-amber-300">"0"</span>
        {"\n"}
        <span className="text-[#007cae]">&gt;&lt;/iframe&gt;</span>
      </div>
      <InfoBox type="tip">
        Replace <strong>YOUR_PRODUCT_ID</strong> with the numeric ID
        shown on your product detail page in the dashboard.
      </InfoBox>

      <SubHeading id="inv-qr">
        Using QR Codes In The Real World
      </SubHeading>
      <CheckList
        items={[
          "Download the QR code PNG from the product detail page in your dashboard",
          "Print at 300 DPI minimum — at least 3×3 cm on physical materials for reliable scanning",
          'Add a short label like "Scan to View in 3D" or "See it in Your Space" next to the code',
          "Test by scanning with both an iPhone and Android before mass printing",
          "Use in-store shelf labels, printed menus, product tags, packaging boxes, or marketing flyers",
        ]}
      />
    </section>
  );
}
