"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import api from "@/app/utils/api";
import { Spin } from "antd";
import { useAdmin } from "@/app/hooks/useAdminContext";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { InventoryHeader } from "./components/InventoryHeader";
import { EmptyState } from "./components/EmptyState";
import { ProductCard } from "./components/ProductCard";

export default function InventoryPage() {
  const router = useRouter();
  const { isLoggedIn, Admin } = useAdmin();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchProducts = async (pageNum: number, currentSearch: string, currentStatus: string) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);

      const res = await api.get(`/product/brand-id?page=${pageNum}&limit=12&search=${encodeURIComponent(currentSearch)}&status=${currentStatus}`);
      const newProducts = res.data?.data || res.data || [];
      const hasMoreData = res.data?.hasMore ?? (newProducts.length === 12);
      
      setProducts(prev => pageNum === 1 ? newProducts : [...prev, ...newProducts]);
      setHasMore(hasMoreData);
    } catch (err: any) {
      console.error("Failed to load products:", err);
      if (err.code === 'ERR_NETWORK') {
        toast.error("Server unreachable. Check your connection.");
      } else {
        toast.error("Failed to load products. Try again.");
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const hasMounted = useRef(false);

  useEffect(() => {
    if (!isLoggedIn) {
      if (!hasMounted.current) {
        toast.error("Please log in to access your inventory.");
      }
      router.push(`/app/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    hasMounted.current = true;
    setPage(1);
    fetchProducts(1, debouncedSearch, statusFilter);
  }, [Admin?.id, isLoggedIn, router, debouncedSearch, statusFilter]);

  useEffect(() => {
    if (page > 1) {
      fetchProducts(page, debouncedSearch, statusFilter);
    }
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );
    
    const target = document.querySelector("#inventory-load-more");
    if (target) observer.observe(target);
    
    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasMore, loading, loadingMore]);

  const stats = useMemo(() => {
    return {
      total: products.length,
      active: products.filter(p => p.is_active).length,
      inactive: products.filter(p => !p.is_active).length
    };
  }, [products]);

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-white gap-4">
        <Spin size="large" />
        <p className="text-slate-400 font-medium animate-pulse">Loading Inventory...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 sm:pt-28 pb-20 px-3 sm:px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-snaptap-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-snaptap-blue/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

      <div className="max-w-7xl mx-auto relative z-10">
        <InventoryHeader 
          search={search} 
          setSearch={setSearch} 
          statusFilter={statusFilter} 
          setStatusFilter={setStatusFilter}
          stats={stats}
          Admin={Admin}
        />

        {/* Content Section */}
        {products.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product?.id} product={product} />
              ))}
            </div>
            
            {/* Infinite Scroll Trigger */}
            <div id="inventory-load-more" className="h-10 mt-6 flex items-center justify-center">
              {loadingMore && <Spin size="small" />}
              {!hasMore && products.length > 0 && (
                <p className="text-xs text-slate-400 font-medium">End of inventory.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
