import { Col, Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { Plan, getIcon, featuresMap } from "../constants/data";

interface BrandPartial {
  subscribed_package_id?: number | null;
}

interface PlanCardProps {
  plan: Plan;
  index: number;
  loadingPlanId: number | null;
  isLoggedIn: boolean;
  Brand: BrandPartial | null;
  onSelectPlan: (plan: Plan) => void;
}

export function PlanCard({
  plan,
  index,
  loadingPlanId,
  isLoggedIn,
  Brand,
  onSelectPlan,
}: PlanCardProps) {
  return (
    <Col xs={24} sm={12} lg={6}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`relative flex flex-col bg-white text-slate-800 rounded-2xl shadow-md px-5 sm:px-7 py-6 sm:py-8 border transition-all h-full ${
          plan.id === 2
            ? "border-[#007cae] shadow-[0_8px_30px_rgba(0,124,174,0.18)]"
            : "border-slate-200 hover:border-[#007cae]/40 hover:shadow-lg"
        }`}
      >
        {/* Most Popular badge */}
        {plan.id === 2 && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#007cae] text-white text-xs font-bold px-5 py-1 rounded-full shadow uppercase tracking-widest whitespace-nowrap">
            Most Popular
          </div>
        )}

        {/* Icon + Name */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center ${
              plan.id === 2 ? "bg-[#007cae]/15" : "bg-slate-100"
            }`}
          >
            {getIcon(plan.id)}
          </div>
          <h3 className="text-xl font-black text-slate-900">{plan.name}</h3>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-end gap-1">
            <span className="text-3xl sm:text-4xl font-black text-slate-900">
              Rs. {plan.monthly_price}
            </span>
            <span className="text-slate-400 font-medium pb-1">/mo</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 mb-6" />

        {/* Features */}
        <ul className="space-y-3 mb-8 flex-grow text-left">
          {featuresMap[plan.id]?.map((feature: string, i: number) => (
            <li key={i} className="flex items-start gap-2.5">
              <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <CheckOutlined className="text-green-600 text-[10px]" />
              </div>
              <span className="text-slate-600 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          block
          size="large"
          loading={loadingPlanId === plan.id}
          onClick={() => onSelectPlan(plan)}
          className="h-12 font-bold rounded-xl !bg-[#007cae] hover:!bg-[#006080] !text-white !border-none shadow-md transition duration-300"
        >
          {isLoggedIn && Brand?.subscribed_package_id === plan.id
            ? "✓ Current Plan"
            : "Get Started"}
        </Button>
      </motion.div>
    </Col>
  );
}
