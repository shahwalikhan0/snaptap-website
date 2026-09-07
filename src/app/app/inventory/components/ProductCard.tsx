"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Icon } from "@iconify/react";

import { Badge } from "@/app/app/components/ui";
import type { Product } from "../types";
import { formatPrice } from "@/app/utils/currency";

interface ProductCardProps {
  product: Product;
}

/**
 * List row, styled the way Uber/Airbnb do theirs:
 *   • the whole row is one tap target (a Link) rather than a small button
 *     tucked on the right — far easier to hit, especially on mobile
 *   • a chevron carries the "drills in" affordance
 *   • restrained type: one semibold title, muted single-line meta with `·`
 *     separators, no uppercase micro-labels
 *   • hover tints the row instead of lifting/scaling it
 *
 * "Manage" is kept as a visual label (not a nested <button>, which would be
 * an invalid interactive-inside-interactive) so the existing affordance is
 * still obvious.
 */
export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Link
        href={`/app/inventory/${product?.id}`}
        className="group flex items-center gap-4 sm:gap-5 p-3 sm:p-4 bg-surface-card rounded-brand border border-slate-200 hover:border-slate-300 hover:bg-surface-card-hover transition-colors"
      >
        {/* Thumbnail */}
        <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] shrink-0 rounded-brand bg-surface-inset border border-slate-100 overflow-hidden">
          <img
            src={product?.image_url ?? undefined}
            alt={product?.name}
            className="w-full h-full object-contain p-1.5"
          />
        </div>

        {/* Primary content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 min-w-0">
            <h3 className="font-semibold text-slate-900 truncate">
              {product?.name}
            </h3>
            <Badge
              tone={product?.is_active ? "success" : "neutral"}
              className="shrink-0"
            >
              {product?.is_active ? "Live" : "Inactive"}
            </Badge>
          </div>

          <p className="text-sm text-slate-500 mt-0.5 truncate">
            {product?.category}
            {product?.created_at && (
              <> · Added {new Date(product.created_at).toLocaleDateString()}</>
            )}
          </p>

          {product?.description && (
            <p className="hidden sm:block text-sm text-slate-400 truncate mt-0.5">
              {product.description}
            </p>
          )}
        </div>

        {/* Price + drill-in */}
        <div className="shrink-0 flex items-center gap-3 sm:gap-5">
          <span className="font-semibold text-slate-900">
            {formatPrice(product?.price)}
          </span>
          <span className="hidden md:inline text-sm font-semibold text-slate-400 group-hover:text-snaptap-blue-dark transition-colors">
            Manage
          </span>
          <Icon
            icon="solar:alt-arrow-right-linear"
            width={18}
            className="text-slate-300 group-hover:text-snaptap-blue-dark group-hover:translate-x-0.5 transition-all"
          />
        </div>
      </Link>
    </motion.div>
  );
}
