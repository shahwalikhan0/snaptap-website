"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";

export function SectionHeading({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 scroll-mt-28"
    >
      {children}
    </h2>
  );
}

export function SubHeading({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <h3
      id={id}
      className="text-lg sm:text-xl font-bold text-[#007cae] mb-3 mt-10 scroll-mt-28 flex items-center gap-2"
    >
      <span className="w-1 h-5 bg-[#007cae] rounded-[6px] inline-block" />
      {children}
    </h3>
  );
}

export function InfoBox({
  type,
  children,
}: {
  type: "tip" | "warning" | "info";
  children: React.ReactNode;
}) {
  const styles = {
    tip: {
      bg: "bg-green-50 border-green-200",
      text: "text-green-800",
      icon: "mdi:lightbulb-on-outline",
      iconColor: "text-green-600",
      label: "Tip",
    },
    warning: {
      bg: "bg-amber-50 border-amber-200",
      text: "text-amber-900",
      icon: "mdi:alert-circle-outline",
      iconColor: "text-amber-500",
      label: "Note",
    },
    info: {
      bg: "bg-[#007cae]/5 border-[#007cae]/20",
      text: "text-slate-700",
      icon: "mdi:information-outline",
      iconColor: "text-[#007cae]",
      label: "Info",
    },
  }[type];

  return (
    <div
      className={`${styles.bg} border rounded-[6px] p-4 flex gap-3 my-4 text-sm`}
    >
      <Icon
        icon={styles.icon}
        className={`${styles.iconColor} shrink-0 mt-0.5`}
        width={18}
      />
      <div className={styles.text}>
        <strong className="font-bold mr-1">{styles.label}:</strong>
        {children}
      </div>
    </div>
  );
}

export function StepList({ steps }: { steps: { title: string; desc: string }[] }) {
  return (
    <ol className="space-y-4 my-4">
      {steps.map((s, i) => (
        <li key={i} className="flex gap-4">
          <span className="w-7 h-7 rounded-[6px] bg-[#007cae] text-white text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
            {i + 1}
          </span>
          <div>
            <p className="font-bold text-slate-800 text-sm">{s.title}</p>
            <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 my-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
          <Icon
            icon="mdi:check-circle"
            className="text-[#007cae] mt-0.5 shrink-0"
            width={16}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Divider() {
  return <hr className="my-10 border-slate-100" />;
}

export function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-[6px] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-800 text-sm">{q}</span>
        <Icon
          icon={open ? "mdi:chevron-up" : "mdi:chevron-down"}
          className={`shrink-0 transition-transform ${open ? "text-[#007cae]" : "text-slate-400"}`}
          width={18}
        />
      </button>
      {open && (
        <div className="px-5 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
          {a}
        </div>
      )}
    </div>
  );
}
