"use client";

import { useEffect, useMemo, useState } from "react";
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
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please log in to access your inventory.");
      router.push(`/app/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await api.get("/product/brand-id");
        setProducts(res.data?.data || res.data || []);
      } catch (err: any) {
        console.error("Failed to load products:", err);
        if (err.code === 'ERR_NETWORK') {
          toast.error("Server unreachable. Check your connection.");
        } else {
          toast.error("Failed to load products. Try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [Admin?.id, isLoggedIn, router]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) => {
      const matchesSearch =
        product?.name.toLowerCase().includes(search.toLowerCase()) ||
        product?.category.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "active"
            ? product?.is_active
            : !product?.is_active;

      return matchesSearch && matchesStatus;
    });
  }, [products, search, statusFilter]);

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-white gap-4">
        <Spin size="large" />
        <p className="text-slate-400 font-medium animate-pulse">Loading Inventory...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 sm:pt-28 pb-20 px-3 sm:px-6 md:px-12 lg:px-24">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

      <div className="max-w-7xl mx-auto">
        <InventoryHeader 
          search={search} 
          setSearch={setSearch} 
          statusFilter={statusFilter} 
          setStatusFilter={setStatusFilter} 
        />

        {/* Content Section */}
        {filteredProducts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product?.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
