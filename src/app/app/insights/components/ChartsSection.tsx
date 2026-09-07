"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  ViewTrendItem,
  TopProduct,
  ProductDistribution,
  TooltipPayloadEntry,
} from "../types";
import { BRAND } from "@/app/utils/tokens";
import { Card } from "@/app/app/components/ui";

interface ChartsSectionProps {
  modelData: ViewTrendItem[];
  productData: ProductDistribution[];
  colors: string[];
  topProducts?: TopProduct[];
}

/** Consistent card header: title + one muted line. No colored icon chip —
 *  the three cards used blue/emerald/purple ones, which read as three
 *  unrelated widgets rather than one dashboard. */
function CardHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="font-semibold text-slate-900">{title}</h2>
      <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
    </div>
  );
}

export function ChartsSection({
  modelData,
  productData,
  colors,
  topProducts = [],
}: ChartsSectionProps) {
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: TooltipPayloadEntry[];
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-3 py-2 rounded-brand shadow-popover border border-slate-200">
          <p className="text-xs text-slate-500 mb-0.5">{label}</p>
          <p className="text-sm font-semibold text-slate-900">
            {payload[0].name}: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  const maxViews = topProducts.length
    ? Math.max(...topProducts.map((p) => p._count?.model_views || 0), 1)
    : 1;

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.4 }}
    >
      {/* ── Views trend ───────────────────────────────────────────────── */}
      <Card variant="elevated" className="lg:col-span-2">
        <CardHeading
          title="Product Views Trend"
          subtitle="Monthly views across all your products"
        />

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={modelData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorModels" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={BRAND.blueDark}
                    stopOpacity={0.25}
                  />
                  <stop
                    offset="95%"
                    stopColor={BRAND.blueDark}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f1f5f9"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <RechartsTooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="views"
                name="Views"
                stroke={BRAND.blueDark}
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorModels)"
                activeDot={{ r: 5, strokeWidth: 0, fill: BRAND.blueDark }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* ── Product status ────────────────────────────────────────────── */}
      <Card variant="elevated" className="flex flex-col">
        <CardHeading title="Product Status" subtitle="Active vs inactive" />

        <div className="flex-1 min-h-[250px] w-full flex items-center justify-center">
          {productData.every((d) => d.value === 0) ? (
            <div className="text-center">
              <div className="w-14 h-14 bg-surface-inset border border-slate-100 rounded-brand flex items-center justify-center mx-auto mb-3 text-slate-300">
                <Icon icon="solar:box-minimalistic-linear" width={28} />
              </div>
              <p className="text-sm font-semibold text-slate-500">
                No products yet
              </p>
              <p className="text-sm text-slate-400 mt-0.5">
                Add inventory to see this
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Pie
                  data={productData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={62}
                  outerRadius={88}
                  paddingAngle={3}
                  stroke="none"
                >
                  {productData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                      className="outline-none"
                    />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-sm text-slate-600">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>

      {/* ── Most viewed ───────────────────────────────────────────────── */}
      {topProducts.length > 0 && (
        <Card variant="elevated" className="lg:col-span-3">
          <CardHeading
            title="Most Viewed Products"
            subtitle="Top performers by total lifetime views"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            {topProducts.slice(0, 10).map((prod, index) => {
              const currViews = prod._count?.model_views || 0;
              const percent = (currViews / maxViews) * 100;
              return (
                <div key={prod.id} className="flex items-center gap-3">
                  <span className="w-5 shrink-0 text-sm font-semibold text-slate-400 tabular-nums text-right">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline gap-3 mb-1.5">
                      <p className="text-sm font-medium text-slate-700 truncate">
                        {prod.name}
                      </p>
                      <span className="text-sm font-semibold text-slate-900 tabular-nums shrink-0">
                        {currViews.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-line rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-snaptap-blue-dark rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ delay: index * 0.04, duration: 0.6 }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </motion.div>
  );
}
