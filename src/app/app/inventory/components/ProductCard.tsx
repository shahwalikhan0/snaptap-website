"use client";

import { motion } from "framer-motion";
import { Button, Tag } from "antd";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

interface ProductCardProps {
  product: any;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="group relative"
    >
      <div className="bg-white rounded-[6px] p-3 sm:px-5 sm:py-3.5 border border-slate-100 shadow-sm group-hover:shadow-[0_8px_25px_rgba(0,0,0,0.04)] transition-all flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        
        {/* Product Visual */}
        <div className="relative w-full sm:w-20 h-32 sm:h-20 rounded-[6px] bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 p-2 overflow-hidden group/img">
          <img
            src={product?.image_url}
            alt={product?.name}
            className="w-full h-full object-contain group-hover/img:scale-105 transition-transform duration-500 ease-out z-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-snaptap-blue/5 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
        </div>

        {/* Product Info */}
        <div className="flex-1 text-center sm:text-left w-full min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div>
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 mb-1">
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-snaptap-blue-dark transition-colors truncate">
                        {product?.name}
                    </h3>
                    <Tag className={`rounded-[4px] border-none px-2 font-bold uppercase text-[9px] tracking-widest ${
                        product?.is_active 
                        ? "bg-green-50 text-green-600" 
                        : "bg-red-50 text-red-600"
                    }`}>
                        {product?.is_active ? "Live" : "Inactive"}
                    </Tag>
                </div>
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3">
                   <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                      <Icon icon="solar:tag-bold-duotone" className="text-snaptap-blue" width={14} />
                      {product?.category}
                   </div>
                   <div className="w-1 h-1 rounded-full bg-slate-200 hidden sm:block" />
                   <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                      <Icon icon="solar:calendar-bold-duotone" className="text-snaptap-blue" width={14} />
                      {new Date(product?.created_at).toLocaleDateString()}
                   </div>
                </div>
            </div>

            <div className="text-xl font-black text-slate-900 sm:text-right">
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-tighter sm:leading-none">Price</span>
                Rs. {Number(product?.price).toLocaleString()}
            </div>
          </div>
          
          <p className="text-slate-400 text-xs line-clamp-1 mb-0 font-medium italic">
            {product?.description || "No description provided."}
          </p>
        </div>

        {/* Actions */}
        <div className="w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-none border-slate-50">
          <Button
            type="primary"
            onClick={() => router.push(`/app/inventory/${product?.id}`)}
            className="w-full sm:w-auto h-10 rounded-[6px] !bg-snaptap-blue-dark hover:!bg-snaptap-blue-deep border-none font-bold px-6 shadow-md shadow-snaptap-blue-dark/10 !text-white flex items-center justify-center gap-2 group/btn text-sm"
          >
            Manage
            <Icon icon="solar:arrow-right-up-bold" width={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
