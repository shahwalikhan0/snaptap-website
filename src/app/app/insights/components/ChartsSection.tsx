import { easeOut, motion } from "framer-motion";
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

interface ChartsSectionProps {
  modelData: any[];
  productData: any[];
  colors: string[];
  topProducts?: any[];
}

export function ChartsSection({
  modelData,
  productData,
  colors,
  topProducts = [],
}: ChartsSectionProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-100">
          <p className="text-sm font-bold text-slate-800 mb-1">{label}</p>
          <p
            className="text-sm font-semibold"
            style={{ color: payload[0].stroke || payload[0].fill }}
          >
            {payload[0].name}: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5, ease: easeOut }}
    >
      {/* Model Generation Trend */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 lg:col-span-2 relative overflow-hidden group">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 opacity-50 rounded-bl-full pointer-events-none group-hover:scale-105 transition-transform duration-700" />

        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00A8DE]/10 flex items-center justify-center text-[#00A8DE]">
              <Icon icon="solar:graph-up-bold-duotone" width={22} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-lg">
                Product Views Trend
              </h4>
              <p className="text-xs font-semibold text-slate-400">
                Monthly Engagement History
              </p>
            </div>
          </div>
          <div className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-widest hidden sm:block">
            Activity Log
          </div>
        </div>

        <div className="h-[300px] w-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={modelData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorModels" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00A8DE" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00A8DE" stopOpacity={0} />
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
                tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
                dy={10}
              />
              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
              />
              <RechartsTooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="views"
                name="Total Views"
                stroke="#00A8DE"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorModels)"
                activeDot={{ r: 6, strokeWidth: 0, fill: "#00A8DE" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product Distribution Pie Chart */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 lg:col-span-1 border-t-4 border-t-emerald-400 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
            <Icon icon="solar:pie-chart-2-bold-duotone" width={22} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-lg">Product Status</h4>
            <p className="text-xs font-semibold text-slate-400">
              Distribution Overview
            </p>
          </div>
        </div>

        <div className="flex-1 min-h-[250px] w-full flex items-center justify-center">
          {productData.every((d) => d.value === 0) ? (
            <div className="text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon
                  icon="solar:box-minimalistic-line-duotone"
                  className="text-slate-300 text-3xl"
                />
              </div>
              <p className="font-bold text-slate-400">No products found</p>
              <p className="text-xs text-slate-400 mt-1">
                Start by adding inventory
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
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  stroke="none"
                >
                  {productData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                      className="hover:opacity-80 transition-opacity duration-300 outline-none"
                    />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Top 10 Products Ranking */}
      {topProducts && topProducts.length > 0 && (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 lg:col-span-3 border-t-4 border-t-purple-400 relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500">
              <Icon icon="solar:fire-bold-duotone" width={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-lg">
                Most Viewed (Hot) Products
              </h4>
              <p className="text-xs font-semibold text-slate-400">
                Top performers by total lifetime views
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {topProducts.slice(0, 10).map((prod, index) => {
              const maxViews = Math.max(
                ...topProducts.map((p) => p._count?.model_views || 1),
              );
              const currViews = prod._count?.model_views || 0;
              const percent = maxViews > 0 ? (currViews / maxViews) * 100 : 0;
              return (
                <div key={prod.id} className="flex items-center gap-4">
                  <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center bg-slate-100 rounded-md text-xs font-bold text-slate-500">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-end mb-1">
                      <p className="text-sm font-bold text-slate-700 truncate pr-2">
                        {prod.name}
                      </p>
                      <span className="text-xs font-black text-purple-600">
                        {currViews}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}
