import { Col, Slider, InputNumber } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { FaCogs } from "react-icons/fa";
import { motion } from "framer-motion";
import { featuresMap } from "../constants/data";
import { BrandDataType } from "@/app/app/types/brand-data";
import { PlanType } from "../../types/plan";
import { formatPrice } from "@/app/utils/currency";
import { Badge, Button } from "@/app/app/components/ui";
import { BRAND } from "@/app/utils/tokens";

interface CustomPlanCardProps {
  customScans: number;
  customPrice: number;
  loadingPlanId: number | null;
  isLoggedIn: boolean;
  Brand: BrandDataType | null;
  onScansChange: (val: number | null) => void;
  onSelectPlan: (plan: PlanType) => void;
}

export function CustomPlanCard({
  customScans,
  customPrice,
  loadingPlanId,
  isLoggedIn,
  Brand,
  onScansChange,
  onSelectPlan,
}: CustomPlanCardProps) {
  return (
    <Col xs={24} sm={12} lg={6}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative flex flex-col bg-white text-slate-800 rounded-brand shadow-md px-5 sm:px-7 py-6 sm:py-8 border border-slate-200 hover:border-snaptap-blue-dark/40 hover:shadow-lg transition-all h-full"
      >
        {/* Icon + Name */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-brand bg-slate-100 flex items-center justify-center">
            <FaCogs size={22} className="text-snaptap-blue-dark" />
          </div>
          <h3 className="text-xl font-black text-slate-900">Custom</h3>
        </div>

        {/* Price */}
        <div className="mb-2 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-400 line-through">
              {formatPrice(customPrice * 2)}
            </span>
            <Badge tone="success" pill className="text-[10px] uppercase tracking-wider">
              50% Off
            </Badge>
          </div>
          <div className="flex items-end gap-1">
            <span className="text-3xl sm:text-4xl font-black text-slate-900">
              {formatPrice(customPrice)}
            </span>
            <span className="text-slate-400 font-medium pb-1">/mo</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Based on {customScans} products
          </p>
        </div>

        {/* Slider */}
        <div className="my-5 bg-slate-50 p-4 rounded-brand border border-slate-100">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-slate-600">
              Inventory Size
            </span>
            <InputNumber
              min={81}
              max={1000}
              value={customScans}
              onChange={onScansChange}
              className="w-20 font-bold"
            />
          </div>
          <Slider
            min={81}
            max={500}
            value={customScans}
            onChange={(val) => onScansChange(val)}
            trackStyle={{ backgroundColor: BRAND.blueDark }}
            handleStyle={{
              borderColor: BRAND.blueDark,
              backgroundColor: BRAND.blueDark,
            }}
          />
          <p className="text-[11px] text-slate-400 text-center mt-1">
            Drag to adjust inventory capacity
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 mb-5" />

        {/* Features (uses Enterprise features) */}
        <ul className="space-y-3 mb-8 flex-grow text-left">
          {featuresMap[3].map((feature: string, i: number) => (
            <li key={i} className="flex items-start gap-2.5">
              <div className="mt-0.5 shrink-0 w-5 h-5 rounded-brand bg-green-100 flex items-center justify-center">
                <CheckOutlined className="text-green-600 text-[10px]" />
              </div>
              <span className="text-slate-600 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          fullWidth
          loading={loadingPlanId === 4}
          onClick={() =>
            onSelectPlan({
              id: 4,
              name: "Custom",
              monthly_price: customPrice,
              yearly_price: customPrice * 12,
              description: "Custom plan",
              scans: customScans,
            })
          }
          className="h-12 font-bold"
        >
          {isLoggedIn && Brand?.subscribed_package_id === 4
            ? "✓ Current Plan"
            : "Get Started"}
        </Button>
      </motion.div>
    </Col>
  );
}
