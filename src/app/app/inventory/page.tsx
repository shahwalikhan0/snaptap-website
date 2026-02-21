"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/app/utils/api";
import { motion } from "framer-motion";
import { Button, Card, Input, Tag, Spin, Segmented } from "antd";
import { useAdmin } from "@/app/hooks/useAdminContext";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@iconify/react";

type ProductType = {
  id: number;
  brand_id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  model_url: string;
  qr_code_url: string;
  image_url: string;
  is_active: boolean;
  created_at: string;
  rating_count: number;
  rating: number | null;
};
const { Search } = Input;

export default function InventoryPage() {
  const router = useRouter();
  const { isLoggedIn, Admin } = useAdmin();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please log in to access your inventory.");
      router.push("/app/login");
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
  }, [Admin?.id, isLoggedIn, router, token]);

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
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-2 text-[#007cae] mb-2">
              <Icon icon="mdi:package-variant-closed" width={24} />
              <span className="font-bold uppercase tracking-wider text-sm">Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-900">Your Inventory</h1>
            <p className="text-slate-500 mt-1 sm:mt-2 text-sm sm:text-base">Manage and monitor your 3D product catalog</p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <div className="relative w-full sm:w-64">
              <Search
                placeholder="Search by name or category..."
                allowClear
                onChange={(e) => setSearch(e.target.value)}
                className="[&_.ant-input]:!rounded-xl [&_.ant-input-group-addon]:!bg-white [&_.ant-input-search-button]:!border-none [&_.ant-input:focus]:!border-[#007cae] [&_.ant-input:hover]:!border-[#007cae]/50"
                size="large"
              />
            </div>
            <Segmented
              options={[
                { label: "All Items", value: "all" },
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
              value={statusFilter}
              onChange={(val) => setStatusFilter(val as any)}
              className="p-1 rounded-xl bg-slate-200/50"
              size="large"
            />
          </div>
        </div>

        {/* Content Section */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-100 shadow-sm">
            <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-6 text-slate-300">
              <Icon icon="mdi:package-variant-remove" width={40} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">No Products Found</h2>
            <p className="text-slate-500 max-w-sm mx-auto">
              Use the SnapTap Admin mobile app to scan and add new products to your inventory.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredProducts.map((product) => (
              <motion.div
                key={product?.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-3 sm:p-4 md:p-6 border border-slate-100 shadow-sm group-hover:shadow-md transition-all flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  {/* Product Visual */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 p-2 overflow-hidden">
                    <img
                      src={product?.image_url}
                      alt={product?.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 text-center sm:text-left min-w-0">
                    <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-3 mb-2">
                      <h3 className="text-lg font-bold text-slate-900">{product?.name}</h3>
                      <Tag color="cyan" className="rounded-full border-none px-3 font-medium bg-cyan-50 text-cyan-600">
                        {product?.category}
                      </Tag>
                      <Tag
                        className={`rounded-full border-none px-3 font-medium ${product?.is_active
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                          }`}
                      >
                        {product?.is_active ? "Live" : "Inactive"}
                      </Tag>
                    </div>
                    <p className="text-slate-500 text-sm line-clamp-1 mb-3">
                      {product?.description}
                    </p>
                    <div className="flex items-center justify-center sm:justify-start gap-4">
                      <span className="text-lg sm:text-xl font-black text-[#007cae]">
                        Rs. {Number(product?.price).toLocaleString()}
                      </span>
                      <div className="h-4 w-[1px] bg-slate-200" />
                      <span className="text-xs text-slate-400 font-medium uppercase tracking-tight">
                        Added {new Date(product?.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 shrink-0">
                    <Button
                      type="primary"
                      onClick={() => router.push(`/app/inventory/${product?.id}`)}
                      className="h-11 rounded-xl !bg-[#007cae] hover:!bg-[#006080] border-none font-bold px-8 shadow-sm !text-white"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
