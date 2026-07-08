"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { Button, Modal } from "antd";
import { Icon } from "@iconify/react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  completeSetupSession,
  createSetupSession,
  fetchPaymentMethod,
  removePaymentMethod,
  PaymentMethodInfo,
} from "../services/paymentApi";

// Safepay's hosted page dead-ends on "Card saved successfully" without
// redirecting back, so setup opens in a NEW tab and this card polls the
// server (which claims the instrument from the Safepay wallet) until the
// card shows up or the user gives up.
const POLL_INTERVAL_MS = 4000;
const POLL_TIMEOUT_MS = 5 * 60 * 1000;

export function PaymentMethodCard() {
  const [method, setMethod] = useState<PaymentMethodInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [awaitingCard, setAwaitingCard] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const pollTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollStartedAt = useRef(0);

  const stopPolling = useCallback(() => {
    if (pollTimer.current) {
      clearInterval(pollTimer.current);
      pollTimer.current = null;
    }
    setAwaitingCard(false);
  }, []);

  const claimAndFetch = useCallback(async (): Promise<PaymentMethodInfo | null> => {
    let data = await fetchPaymentMethod();
    if (data && data.status !== "active") {
      try {
        await completeSetupSession();
        data = await fetchPaymentMethod();
      } catch {
        // no card saved on Safepay yet
      }
    }
    return data;
  }, []);

  const loadMethod = useCallback(async () => {
    try {
      setLoading(true);
      setMethod(await claimAndFetch());
    } catch (err: unknown) {
      console.error("Failed to load payment method:", err);
    } finally {
      setLoading(false);
    }
  }, [claimAndFetch]);

  useEffect(() => {
    loadMethod();
    const onFocus = () => loadMethod();
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
      if (pollTimer.current) clearInterval(pollTimer.current);
    };
  }, [loadMethod]);

  const startPolling = useCallback(() => {
    setAwaitingCard(true);
    pollStartedAt.current = Date.now();
    pollTimer.current = setInterval(async () => {
      if (Date.now() - pollStartedAt.current > POLL_TIMEOUT_MS) {
        stopPolling();
        return;
      }
      try {
        const data = await claimAndFetch();
        if (data?.status === "active") {
          setMethod(data);
          stopPolling();
          toast.success(
            "Payment method saved! Your invoices will now be charged automatically.",
          );
        }
      } catch {
        // transient — keep polling
      }
    }, POLL_INTERVAL_MS);
  }, [claimAndFetch, stopPolling]);

  const handleAddCard = async () => {
    setStarting(true);
    try {
      const checkoutUrl = await createSetupSession();
      if (!checkoutUrl) throw new Error("No checkout URL returned");
      const tab = window.open(checkoutUrl, "_blank");
      if (!tab) {
        // popup blocked — fall back to same-tab navigation
        window.location.href = checkoutUrl;
        return;
      }
      startPolling();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.error || "Could not start card setup.");
      } else {
        toast.error("Could not start card setup.");
      }
    } finally {
      setStarting(false);
    }
  };

  const handleRemove = async () => {
    setRemoving(true);
    try {
      await removePaymentMethod();
      toast.success("Payment method removed.");
      setConfirmRemove(false);
      setMethod(null);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.error || "Could not remove the card.");
      } else {
        toast.error("Could not remove the card.");
      }
    } finally {
      setRemoving(false);
    }
  };

  const hasCard = method?.status === "active";

  return (
    <div className="bg-slate-50 rounded-[6px] p-6 border border-slate-100">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-[6px] bg-emerald-100 flex items-center justify-center text-emerald-600">
            <Icon icon="mdi:credit-card-outline" width={22} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">
              Payment Method
            </p>
            {loading ? (
              <p className="text-sm text-slate-400 animate-pulse">Loading…</p>
            ) : hasCard ? (
              <p className="text-base font-black text-slate-800 capitalize">
                {method?.card_brand || "Card"} •••• {method?.last4 || "····"}
              </p>
            ) : awaitingCard ? (
              <p className="text-sm font-semibold text-[#007cae] animate-pulse">
                Waiting for card setup in the Safepay tab…
              </p>
            ) : (
              <p className="text-sm font-semibold text-amber-600">
                No card on file — invoices cannot be auto-charged
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          {awaitingCard ? (
            <Button onClick={stopPolling} className="rounded-[6px] font-semibold">
              Cancel
            </Button>
          ) : (
            <Button
              loading={starting}
              onClick={handleAddCard}
              className="rounded-[6px] font-bold !bg-[#007cae] hover:!bg-[#006080] !text-white !border-none"
            >
              {hasCard ? "Replace Card" : "Add Payment Method"}
            </Button>
          )}
          {hasCard && !awaitingCard && (
            <Button
              danger
              onClick={() => setConfirmRemove(true)}
              className="rounded-[6px] font-semibold"
            >
              Remove
            </Button>
          )}
        </div>
      </div>

      <p className="text-[11px] text-slate-400 mt-3">
        {awaitingCard
          ? "Complete the card form in the Safepay tab — this page will update automatically. You can close the Safepay tab once it says \"Card saved successfully\"."
          : "Your card is stored securely by Safepay. SnapTap charges it automatically on the 1st of each month for your plan and model views."}
      </p>

      <Modal
        title="Remove payment method?"
        open={confirmRemove}
        onCancel={() => setConfirmRemove(false)}
        onOk={handleRemove}
        okText="Remove Card"
        okButtonProps={{ danger: true, loading: removing }}
      >
        <p>
          Without a card on file we cannot collect your monthly invoice, and
          your products may become unavailable if payment is missed.
        </p>
      </Modal>
    </div>
  );
}
