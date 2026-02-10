"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Button, Card, Input, Tag, Spin, Segmented } from "antd";
import { useAdmin } from "@/app/hooks/useAdminContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function InventoryPage() {
  const router = useRouter();
  const { isLoggedIn, token, Admin } = useAdmin();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please log in to access the Inventory Dashboard.");
      router.push("/app/login");
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/product/brand-id`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(res.data?.data || res.data || []);
      } catch (err: any) {
        console.error("Failed to load products:", err);
        
        // Check for network/server errors
        if (err.code === 'ERR_NETWORK' || err.message?.includes('Network Error')) {
          toast.error("Server is not accessible. Please check your connection and try again.");
        } else if (!err.response) {
          toast.error("Cannot reach the server. Please try again later.");
        } else {
          toast.error("Failed to load products. Please try logging in again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [Admin?.id]);

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
      <div className="w-full h-[60vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="w-full px-6 sm:px-10 md:px-20 py-16 bg-gradient-to-br from-[#F0F9FF] via-white to-[#ECFEFF]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
          style={{ marginTop: "7vh" }}
        >
          <h1 className="text-3xl font-bold text-[#00A8DE]">
            Product Inventory
          </h1>

          <div className="flex gap-3 w-full md:w-auto">
            <Search
              placeholder="Search products..."
              allowClear
              onChange={(e) => setSearch(e.target.value)}
              className="md:w-64"
            />

            <Segmented
              options={[
                { label: "All", value: "all" },
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
              value={statusFilter}
              onChange={(val) => setStatusFilter(val as any)}
            />
          </div>
        </div>

        {/* List */}
        {filteredProducts.length === 0 ? (
          <p className="text-gray-500 text-lg">
            No products match your filters. Login to SnapTap Admin app to add new products
          </p>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <motion.div
                key={product?.id}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.15 }}
              >
                <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Image */}
                    <div className="relative w-full sm:w-[100px] h-[100px] bg-gray-100 rounded-lg">
                      <img
                        src={product?.image_url}
                        alt={product?.name}
                        // fill
                        style={{ objectFit: "contain" }}
                        className="p-3"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="text-lg font-semibold text-[#007cae]">
                          {product?.name}
                        </h3>
                      </div>

                      <p className="text-sm text-gray-600 line-clamp-2">
                        {product?.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-lg font-bold text-[#00A8DE]">
                          Rs. {product?.price}
                        </span>
                        <Tag color="blue">{product?.category}</Tag>
                        <Tag color={product?.is_active ? "green" : "red"}>
                          {product?.is_active ? "Active" : "Inactive"}
                        </Tag>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex sm:flex-col gap-2 sm:justify-center">
                      <Button
                        type="primary"
                        onClick={() =>
                          router.push(`/app/inventory/${product?.id}`)
                        }
                      >
                        View
                      </Button>
                      {/* <Button>Delete</Button> */}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
