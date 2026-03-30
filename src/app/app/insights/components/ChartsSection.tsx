import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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
}

export function ChartsSection({
  modelData,
  productData,
  colors,
}: ChartsSectionProps) {
  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-14"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl">
        <h4 className="text-xl font-semibold mb-4 text-[#007cae]">
          Model Generation (Last 6 Months)
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={modelData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", borderRadius: "10px" }}
            />
            <Line
              type="monotone"
              dataKey="models"
              stroke="#00A8DE"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl">
        <h4 className="text-xl font-semibold mb-4 text-[#007cae]">
          Product Distribution
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={productData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {productData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", borderRadius: "10px" }}
            />
            <Legend iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
