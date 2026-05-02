"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Icon } from "@iconify/react";
import { Modal } from "antd";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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

  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

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

    fetch(`${BASE_URL}/product/showcase/${brandId}?page=${pageNum}&limit=12&search=${encodeURIComponent(search)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load products");
        return res.json();
      })
      .then((data) => {
        setBrandName(data.brand_name || "");
        const newProducts = data.products || [];
        setProducts((prev) =>
          pageNum === 1 ? newProducts : [...prev, ...newProducts],
        );
        setHasMore(data.hasMore ?? newProducts.length === 12);
      })
      .catch((err) => setError(err.message))
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
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !loading &&
          !loadingMore
        ) {
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
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-snaptap-blue border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">Loading showcase…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Minimal Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#006080] to-snaptap-blue rounded-xl flex items-center justify-center text-white shadow-sm">
              <Icon icon="mdi:store" width={20} />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">
                {brandName}
              </h1>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                Product Showcase
              </p>
            </div>
          </div>
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon icon="mdi:magnify" className="text-slate-400" width={20} />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-snaptap-blue/20 focus:border-snaptap-blue sm:text-sm transition-all"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
              <Icon
                icon="mdi:package-variant"
                className="text-slate-300"
                width={48}
              />
            </div>
            <h2 className="text-xl font-bold text-slate-700 mb-2">
              No products found
            </h2>
            <p className="text-slate-500">
              {searchQuery
                ? `No matches for "${searchQuery}"`
                : "This brand hasn't published any products."}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Image Section */}
                  <div className="relative aspect-square bg-slate-100 overflow-hidden">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Icon
                          icon="mdi:image-outline"
                          className="text-slate-300"
                          width={40}
                        />
                      </div>
                    )}
                    {product.category && (
                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-0.5 text-[10px] font-bold text-slate-700 uppercase tracking-wider shadow-sm">
                        {product.category}
                      </div>
                    )}
                  </div>

                  {/* Details Section */}
                  <div className="p-3 sm:p-4 flex flex-col flex-1">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="flex-1">
                      {product.description && (
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                          {product.description}
                        </p>
                      )}
                    </div>

                    {/* Action Area */}
                    <div className="pt-3 border-t border-slate-100 mt-auto space-y-3">
                      <div className="flex items-center gap-3">
                        {product.qr_code_url ? (
                          <button
                            onClick={() => setSelectedQR(product.qr_code_url)}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg border border-slate-200 bg-white hover:border-snaptap-blue hover:text-snaptap-blue flex items-center justify-center shrink-0 transition-colors group/qr relative"
                          >
                            <Icon icon="mdi:qrcode-scan" width={20} className="text-slate-500 group-hover/qr:text-snaptap-blue transition-colors" />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-slate-800 text-white text-[10px] font-medium rounded opacity-0 group-hover/qr:opacity-100 transition-opacity pointer-events-none">
                              View QR
                            </div>
                          </button>
                        ) : (
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0">
                            <Icon
                              icon="mdi:qrcode-remove"
                              className="text-slate-300"
                            />
                          </div>
                        )}

                        {product.model_url ? (
                          <a
                            href={product.model_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 sm:py-2.5 bg-snaptap-blue-dark hover:bg-snaptap-blue text-white font-bold text-xs sm:text-sm rounded-lg transition-colors"
                          >
                            <Icon icon="mdi:cube-scan" width={16} />
                            <span className="hidden sm:inline">View AR</span>
                            <span className="sm:hidden">AR</span>
                          </a>
                        ) : (
                          <div className="flex-1 py-2 sm:py-2.5 bg-slate-100 text-slate-400 font-bold text-xs sm:text-sm rounded-lg text-center cursor-not-allowed">
                            No Model
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Infinite Scroll Trigger */}
            <div
              id="showcase-load-more"
              className="h-10 mt-8 flex items-center justify-center"
            >
              {loadingMore && (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-snaptap-blue border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs text-slate-500 font-medium">
                    Loading more...
                  </span>
                </div>
              )}
              {!hasMore && products.length > 0 && searchQuery === "" && (
                <p className="text-xs text-slate-400 font-medium">
                  You&apos;ve reached the end.
                </p>
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
              <span className="text-lg font-black text-white tracking-tight">
                SnapTap
              </span>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
                Experience before you buy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/snaptappk/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors p-2"
            >
              <Icon icon="mdi:instagram" width={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/snaptappk"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors p-2"
            >
              <Icon icon="mdi:linkedin" width={20} />
            </a>
            <a
              href="https://snaptap.pk"
              className="ml-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2"
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
        className="[&_.ant-modal-content]:!rounded-[12px] [&_.ant-modal-content]:!p-8"
      >
        <div className="flex flex-col items-center text-center mt-4">
          <div className="bg-slate-50 p-4 rounded-[12px] shadow-sm border border-slate-100 mb-6">
            <img
              src={selectedQR || ""}
              alt="Scan to View AR"
              className="w-48 h-48 object-contain mix-blend-multiply"
            />
          </div>
          <h3 className="text-lg font-black text-slate-900 mb-2">Scan to View AR</h3>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.1em]">
            Use your phone's camera
          </p>
        </div>
      </Modal>
    </div>
  );
}
