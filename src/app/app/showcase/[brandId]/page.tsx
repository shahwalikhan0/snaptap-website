"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Icon } from "@iconify/react";
import { Modal } from "antd";
import { Badge, Button, Input } from "@/app/app/components/ui";
import { publicApi } from "@/app/utils/api";
import { ENDPOINTS } from "@/app/utils/endpoints";

const SITE_URL = (process.env.NEXT_PUBLIC_BASE_URL ?? "").replace(/\/$/, "");

type ShowcaseProduct = {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  qr_code_url: string | null;
  model_url: string | null;
  category: string | null;
  rating: number | null;
  rating_count: number | null;
};

export default function ShowcasePage() {
  const params = useParams();
  const brandId = params?.brandId;
  const [brandName, setBrandName] = useState<string>("");
  const [products, setProducts] = useState<ShowcaseProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedQR, setSelectedQR] = useState<string | null>(null);
  const [isGeneratingBrandQR, setIsGeneratingBrandQR] = useState(false);
  const [brandQRDataUrl, setBrandQRDataUrl] = useState<string | null>(null);

  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  const handleGenerateBrandQR = async () => {
    try {
      setIsGeneratingBrandQR(true);
      const base =
        SITE_URL ||
        (typeof window !== "undefined" ? window.location.origin : "");
      const url = `${base}/app/showcase/${brandId}`;
      const { generateBrandQRCode } =
        await import("@/app/utils/generateQRCode");
      const dataUrl = await generateBrandQRCode(url);
      setBrandQRDataUrl(dataUrl);
    } catch (error) {
      console.error("Failed to generate brand QR:", error);
    } finally {
      setIsGeneratingBrandQR(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const fetchProducts = (pageNum: number, search: string) => {
    if (!brandId) return;
    if (pageNum === 1) setLoading(true);
    else setLoadingMore(true);

    publicApi
      .get(ENDPOINTS.PRODUCT_SHOWCASE(brandId as string), {
        params: { page: pageNum, limit: 10, search },
      })
      .then((res) => {
        const data = res.data;
        setBrandName(data.brand_name || "");
        const newProducts: ShowcaseProduct[] = data.products || [];
        setProducts((prev) =>
          pageNum === 1 ? newProducts : [...prev, ...newProducts],
        );
        setHasMore(data.hasMore ?? newProducts.length === 10);
      })
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : "Failed to load products";
        setError(message);
      })
      .finally(() => {
        setLoading(false);
        setLoadingMore(false);
      });
  };

  useEffect(() => {
    setPage(1);
    fetchProducts(1, debouncedSearch);
  }, [brandId, debouncedSearch]);

  useEffect(() => {
    if (page > 1) {
      fetchProducts(page, debouncedSearch);
    }
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 },
    );

    const target = document.querySelector("#showcase-load-more");
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasMore, loading, loadingMore]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-page flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-snaptap-blue-dark border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">Loading showcase…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface-page flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
            <Icon
              icon="mdi:alert-circle-outline"
              className="text-red-400"
              width={40}
            />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-slate-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-page flex flex-col">
      {/* Header */}
      <header className="bg-surface-card border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 shrink-0 bg-snaptap-blue-dark rounded-brand flex items-center justify-center text-white">
              <Icon icon="mdi:store" width={20} />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-slate-900 truncate">
                {brandName}
              </h1>
              <p className="text-sm text-slate-500">Product showcase</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <div className="w-full sm:w-72">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products…"
                leading={<Icon icon="solar:magnifer-linear" width={17} />}
                trailing={
                  searchQuery ? (
                    <button
                      onClick={() => setSearchQuery("")}
                      aria-label="Clear search"
                      className="pointer-events-auto hover:text-slate-600 transition-colors"
                    >
                      <Icon icon="lucide:x" width={14} />
                    </button>
                  ) : undefined
                }
              />
            </div>
            <Button
              size="md"
              onClick={handleGenerateBrandQR}
              loading={isGeneratingBrandQR}
              className="w-full sm:w-auto"
            >
              {!isGeneratingBrandQR && (
                <Icon icon="mdi:qrcode-scan" width={18} />
              )}
              <span className="whitespace-nowrap">
                {isGeneratingBrandQR ? "Generating…" : "Share Showcase"}
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-14 h-14 mx-auto mb-5 rounded-brand bg-surface-inset border border-slate-100 flex items-center justify-center text-slate-300">
              <Icon icon="solar:box-minimalistic-linear" width={30} />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              No products found
            </h2>
            <p className="text-sm text-slate-500">
              {searchQuery
                ? `No matches for "${searchQuery}"`
                : "This brand hasn't published any products yet."}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group bg-surface-card rounded-brand border border-slate-200 hover:border-slate-300 hover:shadow-card transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative aspect-square bg-surface-inset overflow-hidden">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-slate-300">
                        <Icon icon="mdi:image-outline" width={36} />
                      </div>
                    )}
                    {product.category && (
                      <div className="absolute top-2 left-2">
                        <Badge tone="neutral" className="bg-white/90 backdrop-blur-sm">
                          {product.category}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-3 sm:p-4 flex flex-col flex-1">
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="flex-1">
                      {product.description && (
                        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mt-1">
                          {product.description}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-3 mt-3 border-t border-slate-100">
                      {product.model_url ? (
                        <a
                          href={product.model_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 h-10 bg-snaptap-blue-dark hover:bg-snaptap-blue-deep text-white font-semibold text-sm rounded-brand transition-colors"
                        >
                          <Icon icon="mdi:cube-scan" width={16} />
                          View in AR
                        </a>
                      ) : (
                        <div className="flex-1 h-10 flex items-center justify-center bg-surface-inset border border-slate-200 text-slate-400 font-semibold text-sm rounded-brand">
                          Processing
                        </div>
                      )}

                      {product.qr_code_url && (
                        <button
                          onClick={() => setSelectedQR(product.qr_code_url)}
                          aria-label={`Show QR code for ${product.name}`}
                          title="Show QR code"
                          className="w-10 h-10 shrink-0 rounded-brand border border-slate-200 text-slate-500 hover:border-snaptap-blue-dark hover:text-snaptap-blue-dark flex items-center justify-center transition-colors"
                        >
                          <Icon icon="mdi:qrcode-scan" width={18} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Infinite Scroll Trigger */}
            <div
              id="showcase-load-more"
              className="h-16 mt-8 flex items-center justify-center"
            >
              {loadingMore && (
                <div className="flex items-center gap-2 text-slate-400">
                  <div className="w-4 h-4 border-2 border-snaptap-blue-dark border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-semibold">Loading more…</span>
                </div>
              )}
              {!hasMore && products.length > 0 && searchQuery === "" && (
                <div className="flex items-center gap-2 text-slate-300">
                  <div className="h-px w-8 bg-slate-200" />
                  <p className="text-xs font-semibold uppercase tracking-wider">
                    End of showcase
                  </p>
                  <div className="h-px w-8 bg-slate-200" />
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* Minimal Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 mt-auto border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 relative">
              <img
                src="/assets/icon.png"
                alt="SnapTap"
                className="w-full h-full object-contain brightness-0 invert opacity-90"
              />
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight">
                SnapTap
              </span>
              <p className="text-xs text-slate-500">Experience before you buy</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/gosnaptap/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors p-2"
            >
              <Icon icon="mdi:instagram" width={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/gosnaptap"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors p-2"
            >
              <Icon icon="mdi:linkedin" width={20} />
            </a>
            <a
              href="https://gosnaptap.com"
              className="ml-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-brand transition-colors flex items-center gap-2"
            >
              Visit Website <Icon icon="mdi:arrow-right" />
            </a>
          </div>
        </div>
      </footer>

      {/* QR Code Modal */}
      <Modal
        open={!!selectedQR}
        onCancel={() => setSelectedQR(null)}
        footer={null}
        centered
        width={300}
        className="[&_.ant-modal-content]:!rounded-brand [&_.ant-modal-content]:!p-8"
      >
        <div className="flex flex-col items-center text-center mt-4">
          <div className="bg-slate-50 p-4 rounded-brand shadow-sm border border-slate-100 mb-6">
            <img
              src={selectedQR || ""}
              alt="Scan to View AR"
              className="w-48 h-48 object-contain mix-blend-multiply"
            />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">Scan to view in AR</h3>
          <p className="text-sm text-slate-500">
            Point your phone&apos;s camera at the code
          </p>
        </div>
      </Modal>

      {/* Brand QR Modal */}
      <Modal
        open={!!brandQRDataUrl}
        onCancel={() => setBrandQRDataUrl(null)}
        footer={null}
        centered
        width={340}
        className="[&_.ant-modal-content]:!rounded-brand [&_.ant-modal-content]:!p-6 sm:[&_.ant-modal-content]:!p-8"
      >
        <div className="flex flex-col items-center text-center mt-2">
          <div className="bg-white p-2 rounded-brand shadow-sm border border-slate-100 mb-6 w-full max-w-[240px] aspect-square flex items-center justify-center">
            {brandQRDataUrl && (
              <img
                src={brandQRDataUrl}
                alt={`${brandName} QR Code`}
                className="w-full h-full object-contain"
              />
            )}
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">Share showcase</h3>
          <p className="text-sm text-slate-500 mb-6">
            Scan to browse every product in this showcase
          </p>
          <a
            href={brandQRDataUrl || "#"}
            download={`${brandName || "Brand"}_Showcase_QR.png`}
            className="w-full flex items-center justify-center gap-2 py-3 bg-snaptap-blue-dark hover:bg-snaptap-blue-deep text-white font-semibold text-sm rounded-brand transition-colors"
          >
            <Icon icon="mdi:download" width={20} />
            Download QR Code
          </a>
        </div>
      </Modal>
    </div>
  );
}
