import axios from "axios";
import api from "@/app/utils/api";
import { ENDPOINTS } from "@/app/utils/endpoints";

/**
 * Prepaid subscriptions and the 7-day trial.
 *
 * Every call acts on the signed-in brand — the server reads the id from the
 * token, so nothing here takes a brandId.
 */

export type BillingStatus =
  | "trial"
  | "trialing"
  | "trial_expired"
  | "active"
  | "past_due"
  | "delinquent"
  | "no_payment_method"
  | "pending_activation";

export interface SubscriptionState {
  status: BillingStatus;
  plan: string | null;
  plan_id: number | null;
  interval: "monthly" | "annual";
  total_scans: number;
  products_used: number;

  trial_ends_at: string | null;
  trial_days_left: number | null;

  period_start: string | null;
  period_end: string | null;
  cancel_at_period_end: boolean;
  pending_plan: { id: number; name: string } | null;

  /** Already charged for the running period — never add this to a total due. */
  base_amount_paid: number;
  views_this_month: number;
  views_included: number;
  views_billable: number;
  usage_accrued: number;
  next_charge_on: string | null;
}

export interface SubscribeResult {
  plan: string;
  interval: string;
  amount: number;
  period_start: string;
  period_end: string;
  total_scans: number;
}

/**
 * A failure the user can act on, separated from a network/server fault.
 *
 * `needsCard` and `declined` both arrive as 402 but mean different things: one
 * wants a card added, the other wants a *different* card. Collapsing them into
 * one message sends people to re-enter the card that just failed.
 */
export interface SubscriptionError {
  message: string;
  needsCard?: boolean;
  declined?: boolean;
  overCap?: boolean;
  /** Changing a plan before any subscription exists — subscribe first. */
  needsSubscribe?: boolean;
}

function toSubscriptionError(err: unknown): SubscriptionError {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as
      | {
          error?: string;
          needsCard?: boolean;
          declined?: boolean;
          overCap?: boolean;
          needsSubscribe?: boolean;
        }
      | undefined;
    return {
      message: data?.error || "Something went wrong. Please try again.",
      needsCard: data?.needsCard,
      declined: data?.declined,
      overCap: data?.overCap,
      needsSubscribe: data?.needsSubscribe,
    };
  }
  return { message: "Something went wrong. Please try again." };
}

/** Current plan, trial window, period and accrued usage. */
export async function fetchSubscription(): Promise<SubscriptionState> {
  const res = await api.get(ENDPOINTS.SUBSCRIPTION);
  return res.data?.data;
}

/**
 * Convert a trial into a paid subscription. Charges the first period
 * immediately; the plan is granted only once the money has moved.
 */
export async function subscribe(input: {
  packageId: number;
  totalScans?: number;
  interval?: "monthly" | "annual";
}): Promise<{ data?: SubscribeResult; error?: SubscriptionError }> {
  try {
    const res = await api.post(ENDPOINTS.SUBSCRIPTION_SUBSCRIBE, input);
    return { data: res.data?.data };
  } catch (err: unknown) {
    return { error: toSubscriptionError(err) };
  }
}

export interface PlanChangeResult {
  /** Upgrade: applied now and charged prorated. */
  plan?: string;
  prorated_charge?: number;
  effective?: string;
  /** Downgrade: queued for the next renewal. */
  scheduled?: boolean;
  effective_from?: string;
  message?: string;
}

/** Upgrade (charged prorated, applies now) or schedule a downgrade. */
export async function changePlan(input: {
  packageId: number;
  totalScans?: number;
}): Promise<{ data?: PlanChangeResult; error?: SubscriptionError }> {
  try {
    const res = await api.post(ENDPOINTS.SUBSCRIPTION_CHANGE_PLAN, input);
    return { data: res.data?.data };
  } catch (err: unknown) {
    return { error: toSubscriptionError(err) };
  }
}

/** Stop the next renewal. Access continues to the end of the paid period. */
export async function cancelSubscription(): Promise<{
  data?: { cancelled: boolean; active_until: string; message: string };
  error?: SubscriptionError;
}> {
  try {
    const res = await api.post(ENDPOINTS.SUBSCRIPTION_CANCEL);
    return { data: res.data?.data };
  } catch (err: unknown) {
    return { error: toSubscriptionError(err) };
  }
}

/** Undo a scheduled cancellation while the period is still running. */
export async function resumeSubscription(): Promise<{
  data?: { resumed: boolean };
  error?: SubscriptionError;
}> {
  try {
    const res = await api.post(ENDPOINTS.SUBSCRIPTION_RESUME);
    return { data: res.data?.data };
  } catch (err: unknown) {
    return { error: toSubscriptionError(err) };
  }
}
