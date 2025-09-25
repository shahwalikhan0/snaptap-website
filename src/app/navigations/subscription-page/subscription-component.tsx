// subscription-component.tsx
"use client";

import React from "react";
import { SubscriptionComponentProps } from "./types";

const MENU_ITEMS = [
  { label: "My Plan", value: "my-plan" },
  { label: "Change Plan", value: "change-plan" },
  { label: "Edit Billing Info", value: "edit-billing" },
];

export default function SubscriptionComponent({
  selectedPage,
  onSelect,
}: SubscriptionComponentProps) {
  return (
    <div
      style={{ padding: "30px", backgroundColor: "#f8f8f8", height: "100%" }}
    >
      <h2 style={{ marginBottom: "30px" }}>Subscriptions</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {MENU_ITEMS.map((item) => (
          <li
            key={item.value}
            onClick={() => onSelect(item.value)}
            style={{
              padding: "12px 16px",
              marginBottom: "12px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: selectedPage === item.value ? "bold" : "normal",
              backgroundColor:
                selectedPage === item.value ? "#e6f7ff" : "transparent",
              transition: "background-color 0.3s",
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
