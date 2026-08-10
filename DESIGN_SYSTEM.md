# SnapTap Website — Design System

Design tokens and reusable UI primitives. Read this before adding UI; it exists
so a new page doesn't reinvent a button, a form field, or a shadow.

Companion docs: `IMPLEMENT_FEATURE.md` (feature/folder conventions),
`SIGN_UP.md` (signup flows).

---

## 1. Where things live

| Path | What |
|---|---|
| `src/app/globals.css` | **The token source.** Tailwind v4 `@theme` block — there is no `tailwind.config.js` |
| `src/app/utils/tokens.ts` | JS mirror of the tokens, for consumers that can't use a CSS class |
| `src/app/app/components/ui/` | Primitives: Button, Input, Textarea, Select, Card, Badge |
| `src/app/app/components/ui/index.ts` | Barrel — **import from here**, not the individual files |
| `src/app/utils/cn.ts` | `cn()` — clsx + tailwind-merge, used by every primitive |
| `src/app/utils/motion.ts` | Shared spring/transition presets for `framer-motion` |
| `src/app/hooks/MotionProvider.tsx` | App-wide `MotionConfig reducedMotion="user"` |
| `src/app/app/components/AntdProvider.tsx` | Themes antd from the same tokens |

`src/app/app/components/` holds cross-feature *feature* components (navbar,
footer, ModelViewer, the two providers). `ui/` is strictly presentational
primitives with no API calls and no feature knowledge.

---

## 2. Two UI layers, one visual language

This app deliberately runs **two** layers, and the split matters:

| Layer | Use for | Why |
|---|---|---|
| **`ui/` primitives** | Buttons, text inputs, textareas, selects, cards, badges | Owned by us, token-driven, spring press feedback, no `!important` |
| **antd** | `Form`, `Modal`, `Table`, `Slider`, `InputNumber`, `Upload`, `Dropdown`, `Tag`, `Tooltip`, `Result` | Complex, stateful widgets we have no business re-implementing |

**antd is themed from the same tokens** by `AntdProvider` (`colorPrimary`,
`borderRadius`, `fontFamily`), so both layers render the same brand without
per-instance overrides. Before that provider existed, every antd usage fought
antd's stock blue and 8px radius with `!bg-[#007cae]` / `!rounded-[6px]` — that
whole category of hack is now gone.

MUI (`@mui/material` + `@emotion/*`) was **removed**: it was installed but never
imported anywhere in `src/`, and antd already fills that role. The remaining
`@emotion/*` packages in the lockfile are transitive deps of antd's
`@ant-design/cssinjs` and framer-motion, not leftovers.

### Two rules that decide the layer for you

1. **A control inside an antd `<Form.Item>` stays antd.** `Form.Item` clones its
   child to inject `value`/`onChange`/`ref` and owns the label and validation
   message. Dropping our `Input` in there would double the label and break
   validation wiring.
2. **A control used as an antd `<Dropdown>`/`<Tooltip>` trigger stays antd.**
   Those inject a `ref` into the child, and our `Button` is a `motion.button`
   without `forwardRef`.

Everywhere else — standalone CTAs, page actions, modal footers, card actions —
use the `ui/` primitives.

---

## 3. Tokens

Tailwind v4 is CSS-first: every custom property in the `@theme` block of
`globals.css` generates real utilities, autocompleted by the Tailwind
IntelliSense extension exactly like built-ins.

### Color

| Token | Utility | Value |
|---|---|---|
| `--color-snaptap-blue` | `text-/bg-/border-snaptap-blue` | `#00a8de` |
| `--color-snaptap-blue-dark` | `…-snaptap-blue-dark` | `#007cae` — primary action |
| `--color-snaptap-blue-deep` | `…-snaptap-blue-deep` | `#006080` — hover/pressed |
| `--color-snaptap-gray-dark` | `…-snaptap-gray-dark` | `#2e2e2e` — body text |
| `--color-snaptap-gray-medium` | `…-snaptap-gray-medium` | `#555555` |
| `--color-snaptap-gray-light` | `…-snaptap-gray-light` | `#888888` — muted |
| `--color-snaptap-bg-light` | `…-snaptap-bg-light` | `slate-50` equivalent |

**There are zero hardcoded brand hex literals left in `src/`.** Keep it that way:
`bg-snaptap-blue-dark`, never `bg-[#007cae]`. Opacity modifiers work as usual
(`bg-snaptap-blue-dark/20`).

### Radius

`--radius-brand: 6px` → **`rounded-brand`**. Zero `rounded-[6px]` remain.

Deliberate exceptions: the showcase modals use `rounded-[12px]`/`[16px]` — those
are intentionally *not* the brand radius, so they stay arbitrary.

### Elevation

| Utility | Use for |
|---|---|
| `shadow-sm` | Small/flat cards (Tailwind built-in) |
| `shadow-lg` → `shadow-xl` on hover | Feature/marketing cards (built-ins) |
| `shadow-card` / `shadow-card-hover` | The layered dashboard card shadow |
| `shadow-popover` | Dropdowns and popovers |

Bigger surfaces read as thicker: card → popover → modal.

### Typography

Tracking is **size-specific** and leading tightens as size grows: large display
text needs *negative* tracking because letters read too far apart as they scale
up, while body text sits near `0`. A single fixed `letter-spacing` is wrong
somewhere. `clamp()` scales fluidly instead of jumping at breakpoints, and rem
units mean the user's browser text-size setting still applies.

| Utility | Size | Leading | Tracking |
|---|---|---|---|
| `text-display` | `clamp(2rem, 1.2rem + 4vw, 3.75rem)` | `1.05` | `-0.02em` |
| `text-heading` | `clamp(1.5rem, 1.1rem + 2vw, 2.5rem)` | `1.15` | `-0.01em` |
| `text-title` | `clamp(1.125rem, 1rem + 0.6vw, 1.5rem)` | `1.25` | `-0.005em` |

Each bundles size + leading + tracking, so `className="text-display font-bold"`
is all a hero headline needs — no `text-3xl sm:text-4xl md:text-5xl lg:text-6xl`
ladder. Per-instance `leading-*`/`tracking-*` still override the token defaults.

Body text uses `--font-sans` (`font-sans`), an Apple-first system stack — the
platform font already ships optical sizing and legibility tuning.

### The JS mirror — `src/app/utils/tokens.ts`

Some consumers can't take a CSS class: recharts (`stroke`, `fill`, `stopColor`),
antd `Slider`/`Progress` style props, `framer-motion` animatable values, and the
antd theme itself. For those, and **only** those, import the constants:

```tsx
import { BRAND } from "@/app/utils/tokens";

<Line stroke={BRAND.blue} />
<Slider trackStyle={{ backgroundColor: BRAND.blueDark }} />
```

Exports `BRAND`, `RADIUS_BRAND`, `FONT_SANS`. In JSX, always prefer the Tailwind
class. Keep this file in sync with `globals.css` — both lists are short and
change rarely, so a comment beats a codegen step here.

---

## 4. Primitives

```tsx
import { Button, Input, Textarea, Select, Card, Badge } from "@/app/app/components/ui";
```

### `cn()` — why `className` is safe to pass

Every primitive merges classes with `cn()` (clsx + **tailwind-merge**). Without
tailwind-merge, two utilities targeting the same property have identical
specificity, so the winner depends on their order in the generated stylesheet,
not the order you passed them — making
`<Button variant="secondary" className="text-red-600" />` silently unreliable.
`cn()` drops the losing class, so a caller's `className` always wins. Use `cn()`
in any new primitive that accepts `className`.

### Button

```tsx
<Button onClick={…}>Start as Seller</Button>
<Button variant="secondary" size="md" loading={saving} fullWidth>Save</Button>
<Button variant="ghost" size="sm"><Icon icon="mdi:download" />Invoice</Button>
```

| Prop | Values | Default |
|---|---|---|
| `variant` | `primary` \| `secondary` \| `ghost` \| `danger` | `primary` |
| `size` | `sm` \| `md` \| `lg` | `lg` |
| `loading` | spinner + disabled + `aria-busy` | `false` |
| `fullWidth` | | `false` |

Accepts all `framer-motion` button props. Icons go in `children` (there is no
`icon` prop — that's the antd API). Press feedback fires on **pointer-down**
(`whileTap`), not release, and settles with a critically damped spring, so it
stays interruptible if pressed again mid-settle. Includes a `focus-visible` ring.

For an outline-destructive button (antd's `danger` without `type="primary"`),
use `variant="secondary"` + `className="border-red-300 text-red-600 hover:bg-red-50"`
— `cn()` makes that override reliable.

### Input / Textarea / Select

All three render label, control, and error/hint through one shared style
(`fieldStyles.ts`), so they can't visually drift apart.

```tsx
<Input label="Your Email" type="email" name="email" required
       value={v} onChange={h} placeholder="john@example.com" error={errors.email} />

<Textarea label="Message" name="message" rows={5} value={v} onChange={h} />

<Select label="Subject" name="subject" value={v} onChange={h}
        placeholder="Select a topic" options={SUBJECTS} />
```

Shared props: `label`, `error`, `hint`, plus all native attributes.

- `id` is generated with `useId` and wired to `htmlFor` automatically — don't pass one.
- `error` switches to error styling and sets `aria-invalid` + `aria-describedby`; it replaces `hint`.
- `required` renders a red asterisk on the label.
- `Textarea` is `resize-none` by default (`resizable` to opt in) so a drag can't break layout.
- `Select` is a **native** `<select>`: the platform picker on mobile, free
  keyboard and screen-reader support. Options are `SelectOption[]`
  (`{ value, label }`); the chevron is ours, the browser arrow is hidden.

⚠️ These do **not** `forwardRef`, so they can't be antd `Form.Item` children or
`Dropdown` triggers (see §2). Adding `forwardRef` is the prerequisite if that's
ever wanted.

### Card

```tsx
<Card variant="raised" padding="md">…</Card>
<Card variant="raised" padding="none" className="p-5 sm:p-8">…</Card>
```

| `variant` | Shadow | Matches existing usage in |
|---|---|---|
| `flat` | `shadow-sm` | solara, SellerWorkflow, billing-history |
| `raised` | `shadow-lg` | OverviewSection, contact form shell |
| `elevated` | `shadow-card` | insights StatsCards / ChartsSection |
| `interactive` | `raised` + hover lift | clickable feature cards |

`padding`: `none` \| `sm` (`p-4`) \| `md` (`p-6`) \| `lg` (`p-8`). Use
`padding="none"` + `className` for responsive padding.

Variants deliberately mirror the surface treatments **already** in the codebase,
so adopting `Card` in an existing view is a visually neutral refactor rather than
a silent restyle. `CardHeader`, `CardTitle`, `CardFooter` are exported for
structured cards.

### Badge

```tsx
<Badge tone="success" pill>50% Off</Badge>
<Badge tone="danger">Delinquent</Badge>
```

`tone`: `neutral` \| `info` \| `success` \| `warning` \| `danger` — mapping to
the four kinds of feedback the app expresses (status, success, warning, error),
so a billing state always uses the same color language. `pill` for promo labels;
default is the brand radius.

**`Card` and `Badge` are hook-free and carry no `"use client"`**, so they render
from server components too. The form primitives and `Button` are client
components.

---

## 5. Motion

Presets in `src/app/utils/motion.ts`:

- `SPRING_DEFAULT` — critically damped (`bounce: 0`). **The default for UI.**
- `SPRING_MOMENTUM` — slight bounce (`bounce: 0.2`). Only when a gesture carried
  momentum (a flick, a drag release). Overshoot on a menu that merely faded in
  reads as wrong; on a card you flicked it reads as right.
- `TAP_SCALE` / `HOVER_SCALE` — press and hover feedback.

Prefer springs over fixed-duration CSS transitions for anything a user can
touch: a spring animates from the element's *current* value, so it can be
grabbed and reversed mid-flight, which a `@keyframes` animation cannot.

### Reduced motion / transparency / contrast

`MotionProvider` wraps the app in `MotionConfig reducedMotion="user"`, so
**every** `motion.*` component site-wide honours `prefers-reduced-motion`
automatically — transform/layout animations dropped, opacity fades kept. No
per-component media queries needed for framer-motion.

`globals.css` covers what `MotionConfig` can't reach:

- the two hand-rolled CSS `@keyframes` animations (`.animate-scroll`, `.animate-slideDown`)
- `prefers-reduced-transparency` → translucent surfaces become near-solid
- `prefers-contrast: more` → solid backgrounds with a defined border

Reduced motion means a *gentler* equivalent, not no feedback — keep opacity and
color changes that aid comprehension.

---

## 6. Adoption status

**Tokens: complete.**

| | Before | Now |
|---|---|---|
| `rounded-[6px]` literals | 306 | **0** |
| Hardcoded brand hex | 421 | **0** |
| antd `!important` brand overrides | 41 | **0** |
| `[&_.ant-modal-content]:!rounded-[6px]` | 7 | **0** |

**Primitives: in use in 10 files** — HeroSection, contact, PlanCard,
CustomPlanCard, ProductCard, ProductDetailCard, QRCodeModal, PaymentMethodCard,
billing-history, reactivate.

**Remaining antd `Button`s are all in `Form.Item` or `Dropdown` files** and stay
there by the rules in §2. They now inherit brand color from `AntdProvider` via
`type="primary"` instead of forced classes.

### Known follow-ups

1. **`Card` is adopted in one place** (the contact form shell). OverviewSection,
   insights, solara, SellerWorkflow and billing-history still hand-roll their
   card shells — pick the variant matching each file's current shadow (§4) for a
   visually neutral swap.
2. **~25 ad-hoc `<button>` elements** remain in dashboard views. Replacing them
   with `Button` is what makes press feedback and focus rings consistent.
3. **`forwardRef` on the form primitives** would unlock antd `Form.Item` usage
   and let the auth/profile forms move off antd `Input`. Do it with the
   validation behaviour tested — these are login and payment paths.
4. **`sign-up/page.tsx` uses `rounded-[8px]`** on its submit button, inconsistent
   with the brand 6px. Left alone because changing it is a visual decision.

### Adding a primitive

Put it in `ui/`, export it from `ui/index.ts`, style from tokens (no hex, no
`rounded-[6px]`), merge classes with `cn()`, keep it free of API calls and
feature knowledge, and omit `"use client"` unless it needs hooks or handlers.
