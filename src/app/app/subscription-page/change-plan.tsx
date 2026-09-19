"use client";

import React, { useState } from "react";
import dayjs from "dayjs";
import { Card, Button, Slider, InputNumber, Tag, Modal } from "antd";
import { useAdmin } from "@/app/hooks/useAdminContext";
import { PlanType } from "../types/plan";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import { featuresMap } from "../pricing/constants/data";
import { fetchPaymentMethod } from "./services/paymentApi";
import { changePlan, cancelSubscription } from "./services/subscriptionApi";
import { fetchCustomPlanQuote } from "../pricing/services/pricingApi";
import { formatPrice, formatRate } from "@/app/utils/currency";
import { BRAND } from "@/app/utils/tokens";

// Per-view rates come from each plan's live `per_view_rate` (see below), never
// from a hardcoded string, so displayed pricing can't drift from billing.
const features: Record<number, string[]> = {
  ...featuresMap,
  4: [
    "Over 80+ products inventory",
    "3D model generation",
    "QR code for each product",
    "Direct share links for each product",
    "Web-embeddable AR viewer",
    "Inventory management",
    "Product Analytics",
    "Email support",
  ],
};

export default function ChangePlan({ plan }: { plan: PlanType[] | null }) {
  const { Brand, setBrand } = useAdmin();
  const [loadingPlanId, setLoadingPlanId] = useState<number | null>(null);
  const [hasCard, setHasCard] = useState<boolean | null>(null);

  React.useEffect(() => {
    fetchPaymentMethod()
      .then((method) => setHasCard(method?.status === "active"))
      .catch(() => setHasCard(null)); // unknown — don't block plan changes
  }, []);

  /* Custom Plan State */
  const [customScans, setCustomScans] = useState(() => {
    const totalProducts = (Brand?.active_products || 0) + (Brand?.in_active_products || 0);
    const minScans = Math.max(81, totalProducts);
    return Brand?.subscribed_package_id === 4 && Brand?.total_scans ? Math.max(minScans, Brand.total_scans) : minScans;
  });

  React.useEffect(() => {
    const totalProducts = (Brand?.active_products || 0) + (Brand?.in_active_products || 0);
    const minScans = Math.max(81, totalProducts);
    if (Brand?.subscribed_package_id === 4 && Brand?.total_scans) {
      setCustomScans(Math.max(minScans, Brand.total_scans));
    } else {
      setCustomScans(minScans);
    }
  }, [Brand?.subscribed_package_id, Brand?.total_scans, Brand?.active_products, Brand?.in_active_products]);
  // Quoted by the server (single source of truth for the formula + the
  // brand's regional rate), debounced while the slider is dragged.
  const [customPrice, setCustomPrice] = useState(0);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      fetchCustomPlanQuote(customScans)
        .then((quote) => setCustomPrice(quote.amount))
        .catch((err: unknown) =>
          console.error("Failed to fetch custom plan quote", err),
        );
    }, 250);
    return () => clearTimeout(timer);
  }, [customScans]);

  /* Cancel Plan State */
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const handleUpdatePlan = async (
    planId: number,
    planName: string,
    customLimit?: number,
  ) => {
    if (hasCard === false) {
      toast.warn(
        "Add a payment method first (Billing & Payments tab) so the change can be charged.",
        { autoClose: 6000 },
      );
      return;
    }
    setLoadingPlanId(planId);

    // Plan changes go through /subscription/change-plan, not update-detail.
    // The server decides upgrade vs downgrade from the price and treats them
    // asymmetrically: an upgrade is charged prorated and applies now, a
    // downgrade is queued for the next renewal. That asymmetry is what keeps
    // SnapTap off refunds entirely — nothing here can ever owe money back.
    const { data, error } = await changePlan({
      packageId: planId,
      totalScans: planId === 4 && customLimit ? customLimit : undefined,
    });
    setLoadingPlanId(null);

    if (error) {
      // Over the smaller plan's cap: refused outright rather than queued, so
      // the brand finds out now instead of at renewal.
      toast.error(error.message, { autoClose: error.overCap ? 8000 : 5000 });
      return;
    }

    if (data?.scheduled) {
      toast.success(data.message || `Switching to ${planName} at your next renewal.`);
      if (Brand) setBrand({ ...Brand, pending_package_id: planId });
      return;
    }

    toast.success(
      data?.prorated_charge
        ? `You're on ${planName}. Charged ${formatPrice(data.prorated_charge)} for the rest of this period.`
        : `You're on ${planName}.`,
    );
    if (Brand) {
      setBrand({ ...Brand, subscribed_package_id: planId, pending_package_id: null });
    }
  };

  const handleCancelPlan = async () => {
    setCancelling(true);
    const { data, error } = await cancelSubscription();
    setCancelling(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    // Cancelling is no longer destructive: prepaid means the period is already
    // paid for, so access continues to its end and nothing is deleted. The old
    // flow wiped every product immediately, which also erased that month's
    // unbilled usage on the way out.
    toast.success(data?.message || "Your subscription will not renew.");
    if (Brand) setBrand({ ...Brand, cancel_at_period_end: true });
    setIsCancelModalVisible(false);
  };

  if (!plan || !Brand) return null;

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Change Your Plan</h1>
        <p className="text-slate-500">Pick the best plan for your growing business needs.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {plan?.map((p: PlanType) => (
          <Card
            key={p.id}
            className={`
              rounded-brand shadow-sm hover:shadow-md transition-all border-slate-100 overflow-hidden
              ${Brand.subscribed_package_id === p.id ? "ring-2 ring-snaptap-blue-dark border-transparent" : ""}
            `}
          >
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-800">{p.name}</h3>
                {Brand.subscribed_package_id === p.id && (
                  <Tag color="blue" className="rounded-brand px-3 py-0.5 font-bold uppercase text-[10px] tracking-widest border-none bg-cyan-50 text-cyan-600">Current</Tag>
                )}
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-bold text-slate-900">{formatPrice(p.monthly_price)}</span>
                <span className="text-slate-400 font-medium whitespace-nowrap">/ month</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed min-h-[40px]">
                {p.description || "The perfect starting point for your AR journey."}
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {p.per_view_rate != null && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Icon icon="mdi:check-circle" className="text-green-500" width={18} />
                  {formatRate(p.per_view_rate)} per model view
                </div>
              )}
              {(features[p.id as keyof typeof features] || []).map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                  <Icon icon="mdi:check-circle" className="text-green-500" width={18} />
                  {feature}
                </div>
              ))}
            </div>

            {Brand.subscribed_package_id !== p.id ? (() => {
              const totalProducts = (Brand.active_products || 0) + (Brand.in_active_products || 0);
              const planLimit = p.id === 1 ? 20 : p.id === 2 ? 50 : p.id === 3 ? 80 : 0;
              const isDowngradeBlocked = totalProducts > planLimit;
              const isDowngrade = (Brand.subscribed_package_id || 0) > p.id || Brand.subscribed_package_id === 4;
              
              return (
                <Button
                  type="primary"
                  block
                  size="large"
                  disabled={isDowngradeBlocked}
                  loading={loadingPlanId === p.id}
                  className={`h-12 rounded-brand font-bold border-none !text-white ${isDowngradeBlocked ? "!bg-slate-300" : ""}`}
                  onClick={() => handleUpdatePlan(p.id, p.name)}
                >
                  {isDowngradeBlocked ? `Delete ${totalProducts - planLimit} product(s) to downgrade` : isDowngrade ? `Downgrade to ${p.name}` : `Upgrade to ${p.name}`}
                </Button>
              );
            })() : (
              <Button
                danger
                block
                size="large"
                className="h-12 rounded-brand font-bold hover:bg-red-50"
                onClick={() => setIsCancelModalVisible(true)}
              >
                Cancel Subscription
              </Button>
            )}
          </Card>
        ))}

        {/* Custom Plan Selection Card */}
        <Card
          className={`
            rounded-brand shadow-sm hover:shadow-md transition-all border-slate-100 
            ${Brand.subscribed_package_id === 4 ? "ring-2 ring-snaptap-blue-dark border-transparent" : "bg-slate-50/50"}
          `}
        >
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Custom Enterprise</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl font-bold text-snaptap-blue-dark">{formatPrice(customPrice)}</span>
              <span className="text-slate-400 font-medium">/ month</span>
            </div>

          <div className="bg-surface-card p-4 sm:p-6 rounded-brand border border-slate-200 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-slate-500">Number of products</span>
                {(() => {
                  const totalProducts = (Brand?.active_products || 0) + (Brand?.in_active_products || 0);
                  const minScans = Math.max(81, totalProducts);
                  return (
                    <InputNumber
                      min={minScans}
                      max={1000}
                      value={customScans}
                      onChange={(v) => setCustomScans(v || minScans)}
                      className="rounded-lg border-slate-200 w-20"
                    />
                  );
                })()}
              </div>
              {(() => {
                const totalProducts = (Brand?.active_products || 0) + (Brand?.in_active_products || 0);
                const minScans = Math.max(81, totalProducts);
                return (
                  <Slider
                    min={minScans}
                    max={500}
                    value={customScans}
                    onChange={setCustomScans}
                    className="mb-0"
                    trackStyle={{ backgroundColor: BRAND.blueDark }}
                    handleStyle={{ borderColor: BRAND.blueDark, backgroundColor: BRAND.blueDark }}
                  />
                );
              })()}
            </div>
          </div>

          <div className="space-y-3 mb-8">
            {features[4].map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                <Icon icon="mdi:check-circle" className="text-green-500" width={18} />
                {feature}
              </div>
            ))}
          </div>

          {Brand.subscribed_package_id !== 4 ? (
            <Button
              type="primary"
              block
              size="large"
              loading={loadingPlanId === 4}
              className="h-12 rounded-brand font-bold !text-white"
              onClick={() => handleUpdatePlan(4, "Custom", customScans)}
            >
              Submit Custom Selection
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button
                type="primary"
                size="large"
                className="flex-1 h-12 rounded-brand font-bold !text-white"
                loading={loadingPlanId === 4}
                disabled={customScans === Brand.total_scans}
                onClick={() => handleUpdatePlan(4, "Custom", customScans)}
              >
                Update Plan
              </Button>
              <Button
                danger
                size="large"
                className="flex-1 h-12 rounded-brand font-bold hover:bg-red-50"
                onClick={() => setIsCancelModalVisible(true)}
              >
                Cancel
              </Button>
            </div>
          )}
        </Card>
      </div>

      <Modal
        title={<span className="text-lg font-bold text-slate-900">Cancel subscription</span>}
        open={isCancelModalVisible}
        onCancel={() => setIsCancelModalVisible(false)}
        footer={null}
        centered
      >
        {/* Cancelling is no longer destructive. Prepaid means this period is
            already paid for, so access runs to its end and nothing is deleted
            — the old copy promised permanent deletion, which would now be a
            lie, and the password gate was guarding an action that no longer
            destroys anything. */}
        <div className="p-2">
          <p className="text-slate-600 mb-4 leading-relaxed">
            Your subscription will <strong className="text-slate-900">not renew</strong>.
            You keep full access until{" "}
            <strong className="text-slate-900">
              {Brand.period_end
                ? dayjs(Brand.period_end).format("MMMM D, YYYY")
                : "the end of your current period"}
            </strong>{" "}
            — you have already paid for it.
          </p>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            Nothing is deleted today. After your period ends your products stop
            showing to customers, and your 3D models are kept for a while in
            case you come back. You can resume any time before then.
          </p>
          <div className="flex gap-3">
            <Button
              size="large"
              className="flex-1 h-12 rounded-brand font-bold"
              onClick={() => setIsCancelModalVisible(false)}
            >
              Keep my plan
            </Button>
            <Button
              danger
              type="primary"
              size="large"
              loading={cancelling}
              onClick={handleCancelPlan}
              className="flex-1 h-12 rounded-brand font-bold"
            >
              Cancel renewal
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
