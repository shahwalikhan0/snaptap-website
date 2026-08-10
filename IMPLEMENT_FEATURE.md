# AI Coding Skill: Feature-Scoped Next.js & React Development

> Injected into an AI agent’s system prompt before generating code for a new feature.
> Focuses on **feature-level scoping** (colocation) to ensure readable, type-safe, and self-contained modules.

---

## 1. Objective & Scope

When tasked with writing code for a new feature, strictly adhere to the feature-scoped principles below. You are writing code for a **specific feature module**, not global configuration. All components, hooks, types, services, and state management specific to this feature must live inside the feature’s self-contained directory.

---

## 2. Directory Structure (Feature Colocation)

This project uses **Next.js App Router**. Feature directories live under `src/app/app/[feature-name]/` (route-based) rather than a separate `src/features/` folder. The App Router’s file-system routing requires `page.tsx` as the entry point.

Structure each feature directory using this layout:

```text
src/app/app/[feature-name]/
├── page.tsx                  # Main entry-point (default export, required by App Router)
├── components/               # Sub-components unique to this feature
│   ├── FeatureMainCard.tsx
│   └── FeatureActionButton.tsx
├── hooks/                    # Feature-specific custom hooks (UI logic, data fetching)
│   └── useFeatureData.ts
├── services/                 # Feature-specific API calls (NO inline axios/fetch in pages)
│   └── featureApi.ts
├── types.ts                  # Feature-specific TypeScript interfaces
└── index.ts                  # Barrel export — the public API gateway
```

### Shared vs. feature-specific

| Location | What belongs there |
|----------|-------------------|
| `src/app/app/types/` | Cross-feature types: `AdminDataType`, `BrandDataType`, `PlanType` |
| `src/app/hooks/` | Cross-feature hooks: `useAdminContext`, `AdminContext` |
| `src/app/utils/` | Cross-feature utilities: `api.ts` (axios instance), `generateQRCode.ts`, `motion.ts` (spring presets) |
| `src/app/app/components/ui/` | Design-system primitives: `Button`, `Input`, `Textarea`, `Select`, `Card`, `Badge` — see `DESIGN_SYSTEM.md` |
| `src/app/app/[feature]/types.ts` | Feature-specific types only |
| `src/app/app/[feature]/services/` | Feature-specific API calls only |

> **Before writing UI, read `DESIGN_SYSTEM.md`.** Use the `ui/` primitives and
> the `@theme` tokens (`rounded-brand`, `bg-snaptap-blue-dark`, `text-display`)
> rather than re-deriving a button, a form field, a shadow, or a hex literal.

### The Index Entry-Point Rule

The `index.ts` file acts as a strict gateway. Export only the main page component and types other features need:

```typescript
// src/app/app/[feature-name]/index.ts
export { default as FeaturePage } from "./page";
export type { FeatureFormValues } from "./types";
```

### Current features with this pattern

All features in the codebase now follow this structure:

| Feature | `services/` | `types` | `index.ts` | `components/` |
|---------|-------------|---------|------------|---------------|
| sign-up | `signupApi.ts` | `types.ts` | Yes | — |
| login | `loginApi.ts` | (in service) | Yes | — |
| forgot-password | `forgotPasswordApi.ts` | — | Yes | — |
| reset-password | `resetPasswordApi.ts` | — | Yes | — |
| reactivate | `reactivateApi.ts` | — | Yes | — |
| verify-email | `verifyEmailApi.ts` | — | Yes | — |
| inventory | `inventoryApi.ts` | `types.ts` | Yes | Yes |
| inventory/[id] | (shared) | (shared) | Yes | Yes |
| insights | `insightsApi.ts` | `types.ts` | Yes | Yes |
| pricing | `pricingApi.ts` | (shared `PlanType`) | Yes | Yes |
| subscription-page | `paymentApi.ts` | `types.ts` | Yes | Yes |
| manage-profile | `profileApi.ts` | `types.ts` | Yes | Yes |
| showcase | — | — | Yes | — |
| home | — | — | Yes | Yes |
| product | — | — | Yes | Yes |
| docs | — | — | Yes | Yes |

---

## 3. Component Architecture & Principles

### Separation of Concerns (Container vs. Presentational)

1. **The Container (`page.tsx`):** Handles feature-level orchestration — calls service functions, manages state, coordinates layout.
2. **Presentational Components (`components/`):** Purely structural or visual. They receive typed data and event callbacks via `props`. They do not contain API calls or network side effects.

### Server Components vs. Client Components (Next.js App Router)

- **Default Status:** Treat components as React Server Components (RSC) by default.
- **Client Boundary:** Only inject `"use client"` at the lowest possible node where interactivity is mandatory (e.g., event listeners, `useState`, `useEffect`, form context, framer-motion animations).

---

## 4. Coding Cleanliness & Maintainability Rules

### TypeScript Rigor

- **Zero `any` tolerance.** Every component must have an explicitly defined `interface` or `type` block for its props. Never use `any`.
- **Error handling:** Use `catch (err: unknown)` with `axios.isAxiosError(err)` narrowing — never `catch (err: any)`.
- **Inferred Return Types:** Keep complex hooks explicitly typed for their return payloads.

```typescript
// Good: explicit prop types
interface FeatureMainCardProps {
  metrics: { totalScans: number; conversionRate: number };
  onActionClick: (id: string) => void;
}

export const FeatureMainCard = ({ metrics, onActionClick }: FeatureMainCardProps) => { ... }
```

```typescript
// Good: error handling pattern
import axios from "axios";

catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    toast.error(err.response?.data?.message || err.message);
  } else {
    toast.error("An unexpected error occurred");
  }
}
```

### Service Layer Rules

- **All API calls go in `services/` files.** Page components import and call service functions. No raw `axios.post()` or `fetch()` in page or component files.
- **All endpoint paths come from `src/app/utils/endpoints.ts`.** Never hardcode a path string like `"/brand/login"` in a service file. Import `ENDPOINTS` and use `ENDPOINTS.BRAND_LOGIN` instead. When adding a new endpoint, add the constant to `endpoints.ts` first.
- **Two axios instances** in `src/app/utils/api.ts`:
  - `api` (default export) — authenticated, has token interceptor + auto-refresh. Use for any request that needs the logged-in user's token.
  - `publicApi` (named export) — unauthenticated, no interceptors. Use for signup, login, forgot-password, verify-email, pricing, and any other public endpoint.
- **Never import raw `axios`** in service files. Use `api` or `publicApi` — they already have `baseURL` configured.
- **Service functions return `response.data`**, not the full axios response. The page component handles UI concerns (toast, redirect).

### Money & Currency Rules

SnapTap bills in **USD worldwide**. Regional discounts are applied server-side, so an amount arriving from the API is already the brand's final price — the UI formats, it never converts.

- **Never write a currency symbol into JSX or a template string.** No `` `Rs. ${x}` ``, no `` `$${x}` ``. Import from `src/app/utils/currency.ts`:
  - `formatCurrency(amount)` → `$1,234.56` — invoices, totals, billed amounts.
  - `formatPrice(amount)` → `$19` / `$19.50` — plan headline prices (drops trailing `.00`).
  - `formatRate(amount)` → `$0.015` — per-model-view rates, which are sub-cent.
- **Never re-implement a pricing formula on the client.** The custom-plan price comes from `GET /package/quote` (`fetchCustomPlanQuote`). A client-side copy silently drifts from what the server actually charges — this exact bug existed in three places before it was consolidated.
- **Render rates from live plan data** (`plan.per_view_rate`), not from a hardcoded feature-list string, for the same reason.

### URLs & Domain Rules

- **Never hardcode a public URL.** Import `SITE_URL`, `API_URL`, `SUPPORT_EMAIL`, or `absoluteUrl()` from `src/app/utils/site.ts`. These feed canonical tags, OG metadata, the sitemap, and robots.txt; a stray literal breaks SEO silently after a domain change.
- `src/proxy.ts` 308-redirects the retired `snaptap.pk` hosts to `gosnaptap.com`. It's a fallback behind the infra-level redirect — add new legacy hosts there, not new redirect logic elsewhere.

### UI & Design-System Rules

Full reference: **`DESIGN_SYSTEM.md`**. The short version:

- **Use the `ui/` primitives** (`Button`, `Input`, `Textarea`, `Select`, `Card`, `Badge`) from `@/app/app/components/ui` instead of hand-rolling a `<button>` or a bordered `<div>`. Every field style lives in one place so controls can't drift apart.
- **Never write a brand hex literal or `rounded-[6px]`.** Use the `@theme` tokens: `bg-snaptap-blue-dark`, `rounded-brand`, `shadow-card`, `text-display`. There are currently **zero** of either left in `src/`; a new one is a regression. For a value that genuinely must be a JS string (recharts `stroke`, antd `Slider` style props, framer-motion values), import `BRAND` from `src/app/utils/tokens.ts`.
- **antd vs our primitives** — two rules decide it:
  1. A control inside an antd `<Form.Item>` **stays antd** — `Form.Item` clones its child to inject `value`/`onChange`/`ref` and owns the label and validation message.
  2. An antd `<Dropdown>`/`<Tooltip>` trigger **stays antd** — it injects a `ref`, and our `Button` is a `motion.button` without `forwardRef`.
  Everywhere else (standalone CTAs, page actions, modal footers, card actions), use the primitives.
- **Don't add `!important` overrides to antd.** It's themed from the tokens by `AntdProvider`; `type="primary"` gets you brand color. If a token is wrong, fix the theme, not the instance.
- **Merge classes with `cn()`** (`src/app/utils/cn.ts`) in any component accepting a `className` — plain `clsx` can't resolve conflicting Tailwind utilities, so the caller's override would win only by accident of stylesheet order.
- **Motion:** use the `SPRING_DEFAULT` / `SPRING_MOMENTUM` presets from `src/app/utils/motion.ts`. `MotionProvider` already makes all `motion.*` components honour `prefers-reduced-motion`; don't add per-component media queries.

### Readability & Structure

- **Named Exports:** Prefer `export const MyComponent = ...` for sub-components. Use `default export` only for `page.tsx` files (required by App Router).
- **Destructured Props:** Destructure props directly in the function signature.
- **CSS Class Organization:** Group Tailwind utilities logically: Layout → Sizing/Spacing → Typography → Visuals/Interactivity.

---

## 5. State & Data Fetching Principles

### UI State Locality

Keep state as local as possible. The only global context is `AdminProvider` (auth state) — do not add new global contexts unless multiple independent features depend on the same synchronized state.

### Network State & Caching

- For Next.js Server Components, handle server data fetching directly inline using async/await.
- For interactive client data mutations, call service functions from `useEffect` or event handlers. Keep loading, error, and validation states local to the page component.

---

## 6. Execution Instructions for AI Agent

Before outputting any block of code for the requested feature, verify your plan against this checklist:

1. Did I put files inside a self-contained feature directory under `src/app/app/[feature-name]/`?
2. Are API calls in a `services/` file, not inline in the page component?
3. Do all endpoint paths come from `ENDPOINTS` in `src/app/utils/endpoints.ts` (no hardcoded strings)?
4. Am I using `publicApi` for unauthenticated calls and `api` for authenticated calls (never raw `axios`)?
5. Does the feature have an `index.ts` barrel export?
6. Are all TypeScript interfaces explicitly declared — zero `any` usage?
7. Do all `catch` blocks use `err: unknown` with proper type narrowing?
8. Are all components with hooks/interactivity marked `"use client"`?
9. Are sub-components in `components/` purely presentational (no API calls)?
10. Is my component layout correctly partitioned between Server data-handling and Client interaction?
11. Am I using the `ui/` primitives rather than a hand-rolled button/field/card, and `cn()` for any `className` merge?
12. Are there zero brand hex literals and zero `rounded-[6px]` in my diff (tokens only), and zero new `!important` overrides on antd?

_Proceed to generate the feature code following this structural guideline._
