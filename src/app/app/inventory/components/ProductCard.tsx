"use client";

import { motion } from "framer-motion";
import { Button, Tag } from "antd";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: any;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  return (
    <motion.div
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
  );
}
