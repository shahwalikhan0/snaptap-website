/**
 * JS mirror of the design tokens.
 *
 * The canonical source is the `@theme` block in `src/app/globals.css` — that's
 * what generates the Tailwind utilities. This file exists only for consumers
 * that cannot use a CSS class:
 *
 *   • the antd theme (`ConfigProvider`, see components/AntdProvider.tsx)
 *   • charting libraries that take colors as props (recharts `stroke`, `fill`)
 *   • antd `Slider` / `Progress` style props
 *   • `framer-motion` animatable style values
 *
 * **In JSX, always prefer the Tailwind class** (`bg-snaptap-blue-dark`) over
 * importing from here. Reach for these constants only when the value has to be
 * a JS string.
 *
 * Keep in sync with globals.css — these two lists are short and change rarely,
 * so a comment is a better tradeoff here than a build step to generate one from
 * the other.
 */
export const BRAND = {
  blue: "#00a8de",
  blueDark: "#007cae",
  blueDeep: "#006080",
  grayDark: "#2e2e2e",
  grayMedium: "#555555",
  grayLight: "#888888",
} as const;

/** Brand corner radius, in px. `rounded-brand` is the CSS equivalent. */
export const RADIUS_BRAND = 6;

/** Matches --font-sans in globals.css. */
export const FONT_SANS =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
