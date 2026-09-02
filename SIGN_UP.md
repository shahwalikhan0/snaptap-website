# SnapTap Website — Signup Flows

> Reference doc for AI agents and developers working on signup, login, and account management.

---

## Table of Contents

- [Entry Points](#entry-points)
- [Flow 1: Normal Signup](#flow-1-normal-signup)
- [Flow 2: Pricing → Signup](#flow-2-pricing--signup)
- [Post-Signup: Login](#post-signup-login)
- [Password Recovery](#password-recovery)
- [Email Verification](#email-verification)
- [Resending Codes & Links](#resending-codes--links)
- [Account Reactivation](#account-reactivation)
- [Code Structure](#code-structure)
- [Types & Interfaces](#types--interfaces)
- [Auth State Management](#auth-state-management)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Validation Rules](#validation-rules)
- [Error Handling](#error-handling)
- [Notes for AI Agents](#notes-for-ai-agents)
- [Notes for Developers](#notes-for-developers)

---

## Entry Points

Users reach signup via two paths:

1. **Direct** — navigate to `/app/sign-up`
2. **From Pricing** — select a plan on `/app/pricing` → plan stored in `localStorage` → redirected to `/app/sign-up`

---

## Flow 1: Normal Signup

```
User visits /app/sign-up
  → Fills form (username, name, email, phone, password, country, optional fields)
  → POST /brand/create (multipart/form-data)
  → Success: toast + redirect to /app/login after 2s
  → 409 collision: inline panel or inline field error (see below)
  → Other error: toast with backend error message, stay on page
```

### 409 — something you typed is already taken

`POST /brand/create` answers `409` with flags saying *what* collided. The page
reads them via `readSignupConflict()` in `services/signupApi.ts` and renders
`components/SignupConflictNotice.tsx` — never a bare toast, because every one of
these states has an action attached to it.

| Response flags | What it means | UI |
|---|---|---|
| `emailInUse` + `accountVerified: true` | A usable account already owns this email | Panel: "You already have an account", with links to `/app/login` and `/app/forgot-password` |
| `emailInUse` + `accountVerified: false` + `resent: true` | An **unverified** account existed and **the server already mailed a fresh verification link** | Panel: "We've sent a new verification link to <email>". Starts the 60s cooldown |
| `emailInUse` + `accountVerified: false` + `resent: false` + `retryAfterSeconds` | Same, but a link went out very recently so nothing new was mailed | Same panel, worded as "already on its way"; resend button gated on `retryAfterSeconds` |
| `usernameInUse` | Username taken | Inline field error via `form.setFields(...)` + `scrollToField` |
| `nameInUse` | Brand name taken | Inline field error via `form.setFields(...)` + `scrollToField` |

> **In every `emailInUse` case no account was created by that request** and the
> details the user just typed were **not** saved. The panel says so explicitly —
> it also tells the user they can reset the password from their original attempt
> once the email is verified. Don't soften this: a user who thinks their second
> signup "went through" will wait for an email that describes different details.

**Form fields:**

| Field          | Required | Validation                              |
|----------------|----------|-----------------------------------------|
| `username`     | Yes      | Alphanumeric, no spaces, lowercased     |
| `name`         | Yes      | Brand name                              |
| `email`        | Yes      | Valid email format                       |
| `phone`        | Yes      | Regex: `^\+?(\d{10,14})$`              |
| `password`     | Yes      | Minimum 6 characters                    |
| `country`      | Yes      | ISO 3166-1 alpha-2 (searchable `<Select>` from `constants/countries.ts`). Drives the Safepay billing customer and the brand's regional pricing factor. |
| `location`     | No       | HQ location (free text city/address)    |
| `website_url`  | No       | Digital hub / website URL               |
| `category`     | No       | Business sector (from CATEGORIES list)  |
| `profileImage` | No       | PNG/JPG/JPEG/WEBP, max 5MB             |

---

## Flow 2: Pricing → Signup

```
User visits /app/pricing
  → API fetches plans from GET /package
  → User selects a plan (standard or custom)
  → If NOT logged in:
      → localStorage.setItem("selectedPlanId", plan.id)
      → For custom plans: localStorage.setItem("selectedPlanScans", scans)
      → Redirect to /app/sign-up
  → If logged in:
      → PUT /brand/update-detail with plan info
      → Redirect to /app/subscription-page
```

**On the signup form**, stored plan data is automatically included in the `POST /brand/create` payload:
- `subscribed_package_id` — from `localStorage.getItem("selectedPlanId")`
- `total_scans` — from `localStorage.getItem("selectedPlanScans")`

Both keys are cleared from `localStorage` after successful signup.

### Pricing page key files

| File | Purpose |
|------|---------|
| `src/app/app/pricing/page.tsx` | Page wrapper |
| `src/app/app/pricing/pricing-component.tsx` | Plan fetching, selection logic |
| `src/app/app/pricing/components/PlanCard.tsx` | Standard plan card |
| `src/app/app/pricing/components/CustomPlanCard.tsx` | Custom plan with scan slider |
| `src/app/app/pricing/components/PricingHero.tsx` | Hero section with CTA |
| `src/app/app/pricing/components/PricingCTA.tsx` | Bottom CTA section |
| `src/app/app/pricing/constants/data.tsx` | Plan features and icons |

---

## Post-Signup: Login

```
User visits /app/login
  → If already logged in → redirect to /app/inventory
  → Collect username + password
  → POST /brand/login
  → Store Admin, Brand, Token in cookies
  → Check billing status via GET /billing/brand/{brandId}/status
  → Handle account_status:
      "deactivated" → redirect to /app/reactivate
      "pending_deletion" → show cancel-deletion option
      billing action required → redirect to /app/subscription-page
      normal → redirect to /app/inventory
```

### 401 + `requiresVerification`

The `401` body from `POST /brand/login` may carry `requiresVerification: true`
— the account exists but its email was never confirmed. The email address is
**deliberately not returned**, so:

- `isVerificationRequiredError(err)` in `services/loginApi.ts` narrows the error.
- The page renders `components/VerifyEmailNotice.tsx` — a **persistent inline
  panel**, not a toast, because it carries the resend button.
- The resend call uses **the username the user typed** as its `identifier`
  (that's the only handle we have). The panel therefore refers to "the email on
  the account", never to a concrete address.

---

## Password Recovery

```
/app/forgot-password
  → User enters email
  → POST /brand/forgot-password
  → Redirect to /app/reset-password?email=X

/app/reset-password (2-step)
  → Step 1: Enter OTP → POST /brand/verify-otp
       ↳ "Resend code" re-POSTs /brand/forgot-password with the email already
         in the URL query — the user never retypes it, and stays on the page
  → Step 2: Enter new password → POST /brand/reset-password
  → Redirect to /app/login
```

`POST /brand/forgot-password` may now answer
`429 { error, cooldown: true, retryAfterSeconds }` with a `Retry-After` header.

---

## Email Verification

```
/verify-email?token=X
  → GET /brand/verify-email/{token}
  → Success/error displayed
  → Redirect to /app/login
```

**Files:** `src/app/verify-email/page.tsx` (server shell), `src/app/verify-email/VerifyEmailClient.tsx` (client logic)

---

## Resending Codes & Links

Three screens can re-trigger an email: the OTP step of `/app/reset-password`,
the unverified-login panel on `/app/login`, and the email-collision panel on
`/app/sign-up`. They all behave the same way and share one hook.

### `POST /brand/resend-verification`

```
Body: { identifier }        // a username OR an email — the server accepts either

200 { success: true, message: string }
    → Returned IDENTICALLY whether the account was mailed, does not exist, or
      is already verified. This is deliberate anti-enumeration.
      Show `message`. Never infer anything more from a 200.

429 { error, cooldown: true, retryAfterSeconds: number }   + Retry-After header
    → A link was sent recently. Do NOT claim a new one went out.

400 { error }
    → Identifier missing.
```

Service functions: `resendVerificationLink()` in both
`login/services/loginApi.ts` and `sign-up/services/signupApi.ts`
(the OTP screen uses `sendForgotPasswordEmail()` in
`reset-password/services/resetPasswordApi.ts` instead — it resends a *code*,
not a verification link).

### The shared cooldown — `useResendCooldown`

```typescript
// src/app/hooks/useResendCooldown.ts
const { secondsLeft, isCoolingDown, start, reset } = useResendCooldown();

start();          // default 60s window, after a successful resend
start(seconds);   // server-supplied retryAfterSeconds, after a 429
```

Ticks once a second and clears its interval on unmount, so no state is written
after the component goes away. **Use this hook — don't re-roll a `setInterval`
in a component.**

### Reading a 429 — `readCooldown`

```typescript
// src/app/utils/resend.ts
const cooldown = readCooldown(err);   // { isCooldown, retryAfterSeconds, message }
```

Narrows an `unknown` error to a 429 cooldown body, preferring
`retryAfterSeconds` from the body and falling back to the `Retry-After` header.

### Rules for every resend button

1. Disable it while `isCoolingDown` and label it `Resend in {secondsLeft}s`.
2. On a **429**, start the countdown from `retryAfterSeconds` and say a link was
   sent *recently* — never that a new one just went out.
3. On the OTP screen, a successful resend **clears the six input boxes and
   focuses the first one** — the previous code is now dead.
4. Keep the "start over with a different email" escape hatch to
   `/app/forgot-password`; the resend button replaced it, it didn't retire it.

---

## Account Reactivation

```
/app/reactivate
  → User enters username + password
  → PUT /brand/reactivate
  → Success → redirect to /app/login
```

**File:** `src/app/app/reactivate/page.tsx`

---

## Code Structure

Each feature follows the **feature-scoped colocation pattern** defined in `IMPLEMENT_FEATURE.md` — components, services, types, and an `index.ts` barrel export are colocated within each feature directory.

```
src/app/
├── app/
│   ├── sign-up/
│   │   ├── page.tsx              # Signup form (Ant Design Form)
│   │   ├── types.ts              # SignUpFormValues interface
│   │   ├── components/
│   │   │   └── SignupConflictNotice.tsx  # 409 email-collision panel
│   │   ├── services/
│   │   │   └── signupApi.ts      # createBrandAccount(), resendVerificationLink(), readSignupConflict()
│   │   └── index.ts              # Barrel: SignUpPage, SignUpFormValues
│   ├── login/
│   │   ├── page.tsx              # Login form
│   │   ├── components/
│   │   │   └── VerifyEmailNotice.tsx     # "verify your email" panel + resend
│   │   ├── services/
│   │   │   └── loginApi.ts       # loginBrand(), fetchBrandDetail(), fetchBillingGateStatus(),
│   │   │                         # resendVerificationLink(), isVerificationRequiredError()
│   │   └── index.ts              # Barrel: LoginPage, LoginPayload, LoginResponse
│   ├── pricing/
│   │   ├── page.tsx
│   │   ├── pricing-component.tsx
│   │   ├── components/
│   │   │   ├── PlanCard.tsx
│   │   │   ├── CustomPlanCard.tsx
│   │   │   ├── PricingHero.tsx
│   │   │   └── PricingCTA.tsx
│   │   ├── constants/
│   │   │   └── data.tsx
│   │   ├── services/
│   │   │   └── pricingApi.ts     # fetchPlans(), updatePlanDetail()
│   │   └── index.ts
│   ├── forgot-password/
│   │   ├── page.tsx
│   │   ├── services/
│   │   │   └── forgotPasswordApi.ts  # sendForgotPasswordEmail()
│   │   └── index.ts
│   ├── reset-password/
│   │   ├── page.tsx
│   │   ├── services/
│   │   │   └── resetPasswordApi.ts   # verifyOtp(), resetPassword(), sendForgotPasswordEmail()
│   │   └── index.ts
│   ├── reactivate/
│   │   ├── page.tsx
│   │   ├── services/
│   │   │   └── reactivateApi.ts      # reactivateAccount(), cancelDeletion()
│   │   └── index.ts
│   ├── types/                    # Shared types (cross-feature)
│   │   ├── admin-data.ts         # AdminDataType
│   │   ├── brand-data.ts         # BrandDataType
│   │   └── plan.ts               # PlanType
│   └── layout.tsx                # App layout with route protection
├── verify-email/
│   ├── page.tsx                  # Server shell
│   ├── VerifyEmailClient.tsx     # Client logic
│   ├── services/
│   │   └── verifyEmailApi.ts     # verifyEmailToken()
│   └── index.ts
├── hooks/
│   ├── useAdminContext.tsx        # AdminProvider (auth context)
│   ├── useResendCooldown.ts      # Shared 60s resend countdown
│   └── types.ts                  # AdminContextType, AdminContext
├── utils/
│   ├── api.ts                    # Axios client with token refresh interceptor
│   ├── endpoints.ts              # All API paths
│   └── resend.ts                 # readCooldown() — narrows a 429 cooldown body
└── layout.tsx                    # Root layout wrapping AdminProvider
```

### Centralized API endpoints

All endpoint paths are defined in a single file — `src/app/utils/endpoints.ts`. No service file hardcodes a URL path. If a backend route changes, update one constant.

```typescript
// src/app/utils/endpoints.ts
export const ENDPOINTS = {
  BRAND_CREATE: "/brand/create",
  BRAND_LOGIN: "/brand/login",
  BRAND_VERIFY_EMAIL: (token: string) => `/brand/verify-email/${token}`,
  BILLING_STATUS: (brandId: number) => `/billing/brand/${brandId}/status`,
  // ... all other endpoints
} as const;
```

### Two axios instances

`src/app/utils/api.ts` exports two instances:

| Instance | Auth | Usage |
|----------|------|-------|
| `publicApi` (named export) | No interceptors | Signup, login, forgot-password, verify-email, pricing (unauthenticated) |
| `api` (default export) | Token interceptor + refresh | Inventory, insights, manage-profile, subscription (authenticated) |

### Service layer pattern

All API calls are extracted into `services/` files per feature. Page components import and call service functions instead of using `axios` directly. Example:

```typescript
// sign-up/services/signupApi.ts
import { publicApi } from "@/app/utils/api";
import { ENDPOINTS } from "@/app/utils/endpoints";

export async function createBrandAccount(formData: FormData) {
  const response = await publicApi.post(ENDPOINTS.BRAND_CREATE, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}
```

### Error handling pattern

All `catch` blocks use `unknown` with `axios.isAxiosError()` narrowing instead of `any`:

```typescript
import axios from "axios";

catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    const message = err.response?.data?.message || err.message;
    toast.error(message);
  } else {
    toast.error("An unexpected error occurred");
  }
}
```

---

## Types & Interfaces

### SignUpFormValues

```typescript
// src/app/app/sign-up/types.ts
export interface SignUpFormValues {
  username: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  country?: string;   // ISO alpha-2; required by the form + server
  location?: string;
  website_url?: string;
  category?: string;
  profileImage?: File[];
}
```

### AdminDataType

```typescript
// src/app/app/types/admin-data.ts
export type AdminDataType = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string | null;
  description?: string | null;
  image_url?: string | null;
  created_at: string;
  account_status: string; // "active" | "deactivated" | "pending_deletion"
};
```

### BrandDataType

```typescript
// src/app/app/types/brand-data.ts
export type BrandDataType = {
  id: number;
  created_at: string;
  brand_id: number;
  brand_name: string;
  brand_email: string;
  package_name: string;
  total_scans: number;
  scans_remaining: number;
  total_models_generated: number;
  active_products: number;
  in_active_products: number;
  phone: string | null;
  country: string | null;
  location: string | null;
  website_url: string | null;
  category: string | null;
  subscribed_package_id: number | null;
  month: number;
  year: number;
  status: string;
  due_date: string | null;
  date_paid: string | null;
  totalBilling: number;
  is_estimate?: boolean;
};
```

### PlanType

```typescript
// src/app/app/types/plan.ts
export type PlanType = {
  id: number;
  name: string;
  monthly_price: number;
  yearly_price: number;
  description: string;
  scans: number;
};
```

### LoginPayload / LoginResponse (service-scoped)

```typescript
// src/app/app/login/services/loginApi.ts
export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  brand: AdminDataType;
  accessToken: string;
  error?: string;
}

export interface BillingGateStatus {
  requires_action: boolean;
  message: string | null;
}
```

### AdminContextType

```typescript
// src/app/hooks/types.ts
export type AdminContextType = {
  Admin: AdminDataType | null;
  Brand: BrandDataType | null;
  token: string | null;
  isLoggedIn: boolean;
  isInitialized: boolean;
  setAdmin: (Admin: AdminDataType | null) => void;
  setBrand: (Brand: BrandDataType | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
};
```

---

## Auth State Management

**No NextAuth, Clerk, or third-party auth library.** Custom implementation using:

- **React Context** (`AdminProvider` in `useAdminContext.tsx`) — manages `Admin`, `Brand`, `token`, `isLoggedIn`, `isInitialized`
- **js-cookie** — persists auth state across page loads:
  - `token` — 1 hour expiry
  - `admin` — 7 days expiry (JSON stringified)
  - `brand` — 7 days expiry (JSON stringified)
- **localStorage** — temporary plan selection bridge (`selectedPlanId`, `selectedPlanScans`)

### Initialization flow

1. `AdminProvider` reads cookies on mount
2. Sets `isInitialized = true` after hydration
3. Login/signup pages check `isLoggedIn` and auto-redirect if already authenticated

### Token refresh

- Axios interceptor in `src/app/utils/api.ts`
- On 401 response → `POST /brand/refresh-token`
- On 403 with `accountDeactivated` → redirect to `/app/reactivate`

### Route protection

**No `middleware.ts` exists.** All protection is client-side:
- App layout checks `isLoggedIn` and `account_status`
- Deactivated accounts are redirected to `/app/reactivate`
- Allowed unauthenticated paths: `/app/login`, `/app/sign-up`, `/app/reactivate`, `/app/forgot-password`, `/app/reset-password`

---

## API Endpoints

All calls go to the backend at `NEXT_PUBLIC_API_URL`. No local `/api` routes. All paths are centralized in `src/app/utils/endpoints.ts`.

| Method | Endpoint constant | Path | Purpose |
|--------|-------------------|------|---------|
| `POST` | `BRAND_CREATE` | `/brand/create` | Create account (signup) |
| `POST` | `BRAND_LOGIN` | `/brand/login` | Authenticate |
| `POST` | `BRAND_FORGOT_PASSWORD` | `/brand/forgot-password` | Request password reset |
| `POST` | `BRAND_VERIFY_OTP` | `/brand/verify-otp` | Verify OTP code |
| `POST` | `BRAND_RESET_PASSWORD` | `/brand/reset-password` | Set new password |
| `POST` | `BRAND_REFRESH_TOKEN` | `/brand/refresh-token` | Refresh access token |
| `GET`  | `BRAND_VERIFY_EMAIL(token)` | `/brand/verify-email/{token}` | Email verification |
| `POST` | `BRAND_RESEND_VERIFICATION` | `/brand/resend-verification` | Re-send the verification link (identifier = username **or** email) |
| `GET`  | `BRAND_DETAIL` | `/brand/detail` | Fetch user/brand details |
| `GET`  | `BILLING_STATUS(brandId)` | `/billing/brand/{brandId}/status` | Check billing status |
| `GET`  | `PACKAGE_LIST` | `/package` | Fetch pricing plans |
| `PUT`  | `BRAND_UPDATE_DETAIL` | `/brand/update-detail` | Update plan subscription |
| `PUT`  | `BRAND_REACTIVATE` | `/brand/reactivate` | Reactivate account |
| `PUT`  | `BRAND_CANCEL_DELETION` | `/brand/cancel-deletion` | Cancel pending deletion |

---

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3001    # Backend API base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3001   # Same as above (used interchangeably)
```

No OAuth secrets, NextAuth config, or third-party auth env vars.

---

## Validation Rules

### Client-side (Ant Design Form)

> **This form intentionally stays on antd**, even though the app has its own
> `ui/` primitives (see `DESIGN_SYSTEM.md`). `Form.Item` clones its child to
> inject `value`/`onChange`/`ref` and owns the label and validation message, so
> swapping in our `Input` would double the label and break the validation wiring
> below. antd here is themed from the design tokens by `AntdProvider`, so it
> already matches the brand — don't "modernize" these fields without first
> adding `forwardRef` to the primitives and re-testing every rule in this table.

- **username:** Required, no spaces allowed, auto-lowercased
- **name:** Required
- **email:** Required, valid email format
- **phone:** Required, regex `^\+?(\d{10,14})$`
- **password:** Required, minimum 6 characters
- **profileImage:** PNG/JPG/JPEG/WEBP only, max 5MB

### Server-side

- Duplicate username / brand name / email returns `409` with flags saying which field collided (see [Flow 1](#flow-1-normal-signup))
- Email verification required (configurable via `requiresVerification` flag in response)
- Resend endpoints are rate-limited and answer `429` with `retryAfterSeconds`

---

## Error Handling

| Scenario | Display Method |
|----------|----------------|
| Validation errors | Ant Design inline field errors |
| Network failure | Toast: "Server connection failed." |
| Duplicate username / brand name (409) | Inline Ant Design field error via `form.setFields` + toast |
| Duplicate email (409) | Persistent inline panel (`SignupConflictNotice`) — never just a toast |
| Unverified email at login (401) | Persistent inline panel (`VerifyEmailNotice`) with a resend button |
| Resend refused (429) | Countdown from `retryAfterSeconds`; button disabled, no "sent" claim |
| Invalid credentials | Toast: "Invalid username or password." |
| Account deactivated | Redirect to `/app/reactivate` |
| Billing issue at login | Redirect to `/app/subscription-page` with alert |
| Session expired (401) | Auto-refresh via interceptor → fallback: redirect to login |

Toast notifications use `react-toastify`.

---

## Notes for AI Agents

1. **Follow the feature-scoped pattern.** All new auth features must follow the colocation pattern in `IMPLEMENT_FEATURE.md` — components, services, types, and an `index.ts` barrel export per feature directory. Never put feature-specific files in global directories.

2. **API calls go in `services/` files.** Every feature has a `services/` subdirectory with extracted API functions. When adding new API calls, add them to the relevant service file (e.g., `sign-up/services/signupApi.ts`), not inline in the page component. Use `ENDPOINTS` constants from `src/app/utils/endpoints.ts` — never hardcode paths.

3. **Two axios instances.** Use `publicApi` (named export from `@/app/utils/api`) for unauthenticated requests (signup, login, password reset). Use `api` (default export) for authenticated requests. Never create a new axios instance or use raw `axios` directly.

4. **No `any` types.** All `catch` blocks use `err: unknown` with `axios.isAxiosError()` narrowing. All props use explicit interfaces. All state uses proper types. Do not introduce `any`.

5. **Centralized endpoints.** All API paths are in `src/app/utils/endpoints.ts`. When adding a new endpoint, add the constant there first, then reference `ENDPOINTS.YOUR_NEW_ENDPOINT` in the service file.

6. **No server-side auth middleware.** All route protection is client-side React. If you're asked to add protected routes, add checks in the component or layout, not in `middleware.ts`.

7. **Plan selection uses localStorage as a bridge.** The pricing → signup flow relies on `selectedPlanId` and `selectedPlanScans` being in localStorage. Don't refactor this without updating both the pricing service and the signup service.

6. **The signup form sends `multipart/form-data`** (not JSON), because of the optional `profileImage` file upload. The `createBrandAccount()` service function in `sign-up/services/signupApi.ts` handles this.

7. **Token is in cookies, not localStorage.** The `js-cookie` library manages auth persistence. Don't switch to localStorage without understanding the refresh-token interceptor flow in `utils/api.ts`.

8. **No local API routes.** All auth endpoints are on the external backend (`NEXT_PUBLIC_API_URL`). Don't create `/api/auth/*` routes unless explicitly asked.

9. **Account has three statuses:** `active`, `deactivated`, `pending_deletion`. The app layout handles redirects based on these. Check `src/app/app/layout.tsx` for the full logic.

10. **Billing check happens at login**, not signup. The `fetchBillingGateStatus()` function in `login/services/loginApi.ts` handles this and may trigger a redirect to the subscription page.

11. **Email verification is conditional.** The backend response includes `requiresVerification` — don't assume it's always required. It appears in three places now: on a `POST /brand/create` success, on a `401` from `POST /brand/login`, and inside a `409` collision body.

11b. **`POST /brand/resend-verification` is anti-enumeration by design.** Its `200` body is identical whether the account was mailed, doesn't exist, or is already verified. Show the `message` it returns and stop there — never branch on it, never word the UI as if you know an email was actually sent to a real account.

11c. **Never hand-roll the resend countdown.** Use `useResendCooldown` (`src/app/hooks/useResendCooldown.ts`) and `readCooldown` (`src/app/utils/resend.ts`). Three screens depend on them behaving the same.

12. **Shared types live in `src/app/app/types/`.** Cross-feature types (`AdminDataType`, `BrandDataType`, `PlanType`) are in the shared `types/` directory. Feature-specific types (e.g., `SignUpFormValues`, `LoginPayload`) are colocated within their feature.

---

## Notes for Developers

1. **Adding new signup fields:** Update `SignUpFormValues` in `src/app/app/sign-up/types.ts`, add the field to the form JSX in `page.tsx`, and update the `FormData` construction in `services/signupApi.ts`. Backend must also accept the new field on `POST /brand/create`.

2. **Adding new API calls:** Add them to the relevant `services/` file for the feature. Import and call from the page component. Never put raw `axios` calls in page or component files.

3. **Changing auth persistence:** Auth state is in cookies (via `js-cookie`). The `AdminProvider` reads them on mount. The axios interceptor reads the token for every request. Changing to `localStorage` or `httpOnly` cookies requires updating all three touch points.

4. **Testing signup locally:** You need the backend running at `NEXT_PUBLIC_API_URL`. There's no mock/stub mode. Check the `/server` directory in the monorepo root.

5. **Password field:** The form calls it "Security PIN" in the UI but it's `password` in the code and API. Minimum 6 characters.

6. **The `CATEGORIES` list** for the business sector dropdown is defined inline in the signup form component. Update it there if categories change.

7. **Image upload:** The `profileImage` field uses Ant Design's `Upload` component with `beforeUpload` returning `false` (manual upload). The actual file is sent as part of the `FormData` on form submit via `createBrandAccount()`, not uploaded separately.

8. **Redirect timing:** After successful signup, there's a 2-second delay (`setTimeout`) before redirecting to login. This is to let the user read the success toast.

9. **Feature barrel exports:** Every feature has an `index.ts` that re-exports the page component and public types. Import from the barrel when using feature exports in other parts of the app.
