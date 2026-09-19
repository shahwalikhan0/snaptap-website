"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/app/app/components/ui";
import type { SubscriptionState } from "../services/subscriptionApi";

interface Props {
  subscription: SubscriptionState;
  onAction?: () => void;
}

type Tone = "info" | "warn" | "danger";

const TONES: Record<Tone, { wrap: string; icon: string; title: string; body: string; btn: string }> = {
  info: {
    wrap: "bg-sky-50 border-sky-200",
    icon: "text-sky-600",
    title: "text-sky-900",
    body: "text-sky-800",
    btn: "bg-sky-600 hover:bg-sky-700",
  },
  // Amber is semantic here, not decoration — it is a billing warning.
  warn: {
    wrap: "bg-amber-50 border-amber-200",
    icon: "text-amber-600",
    title: "text-amber-900",
    body: "text-amber-800",
    btn: "bg-amber-600 hover:bg-amber-700",
  },
  danger: {
    wrap: "bg-red-50 border-red-200",
    icon: "text-red-600",
    title: "text-red-900",
    body: "text-red-800",
    btn: "bg-red-600 hover:bg-red-700",
  },
};

/**
 * One banner that speaks for every billing state.
 *
 * The wording matters more than it looks: these are read by someone who may be
 * about to lose their products, so each one names what has happened, what it
 * means for their customers, and the single next action.
 */
export default function SubscriptionStatusBanner({ subscription, onAction }: Props) {
  const {
    status,
    trial_days_left: daysLeft,
    cancel_at_period_end: cancelling,
    period_end: periodEnd,
    pending_plan: pendingPlan,
  } = subscription;

  let tone: Tone = "info";
  let icon = "mdi:information-outline";
  let title = "";
  let body = "";
  let cta: string | null = null;

  if (status === "trialing") {
    const d = daysLeft ?? 0;
    // Nudge harder as the window closes — a trial that ends silently is a
    // customer who finds out by losing their AR viewer.
    tone = d <= 2 ? "warn" : "info";
    icon = "mdi:clock-outline";
    title =
      d === 0
        ? "Your free trial ends today"
        : `${d} day${d === 1 ? "" : "s"} left in your free trial`;
    body =
      "Choose a plan to keep your products live for customers. Nothing is charged until you do.";
    cta = "Choose a plan";
  } else if (status === "trial_expired") {
    tone = "danger";
    icon = "mdi:alert-circle-outline";
    title = "Your free trial has ended";
    body =
      "Your products are no longer visible to customers scanning your QR codes. Choose a plan to bring them back — your models are still here.";
    cta = "Choose a plan";
  } else if (status === "pending_activation") {
    tone = "danger";
    icon = "mdi:credit-card-off-outline";
    title = "Your card was declined";
    body =
      "We saved your card but the first charge did not go through, so your subscription has not started. Try a different card.";
    cta = "Update payment method";
  } else if (status === "delinquent") {
    tone = "danger";
    icon = "mdi:alert-circle-outline";
    title = "Subscription suspended";
    body =
      "We could not collect payment after several attempts, so your products are temporarily unavailable. Update your card to restore service.";
    cta = "Update payment method";
  } else if (status === "past_due") {
    tone = "warn";
    icon = "mdi:refresh";
    title = "Payment failed — we'll retry automatically";
    body =
      "Your last charge didn't go through. We'll retry in a couple of days, or you can update your card now.";
    cta = "Update payment method";
  } else if (status === "no_payment_method") {
    tone = "warn";
    icon = "mdi:credit-card-outline";
    title = "Add a payment method";
    body =
      "Your plan is active but no card is on file, so your next renewal cannot be charged.";
    cta = "Add a card";
  } else if (cancelling) {
    tone = "warn";
    icon = "mdi:calendar-remove-outline";
    title = "Your subscription will not renew";
    body = `You keep full access until ${periodEnd ?? "the end of your period"} — you've already paid for it. You can resume any time before then.`;
  } else if (pendingPlan) {
    tone = "info";
    icon = "mdi:calendar-arrow-right";
    title = `Switching to ${pendingPlan.name} on ${periodEnd}`;
    body =
      "You keep your current plan until then, because you've already paid for this period.";
  } else {
    return null;
  }

  const t = TONES[tone];

  return (
    <div
      className={`${t.wrap} border rounded-brand p-5 flex flex-col sm:flex-row sm:items-center gap-4`}
    >
      <Icon icon={icon} width={22} className={`${t.icon} shrink-0`} />
      <div className="flex-1">
        <p className={`font-semibold ${t.title}`}>{title}</p>
        <p className={`text-sm mt-0.5 ${t.body}`}>{body}</p>
      </div>
      {cta && onAction && (
        <Button size="sm" onClick={onAction} className={`shrink-0 ${t.btn} shadow-none`}>
          {cta}
        </Button>
      )}
    </div>
  );
}
