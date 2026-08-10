import type { Transition } from "framer-motion";

/**
 * Shared spring presets (Apple's damping/response model, mapped to Framer
 * Motion's bounce/duration spring API). Default to critically damped
 * everywhere; reserve bounce for interactions a drag/flick gesture preceded.
 */
export const SPRING_DEFAULT: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.4,
};

export const SPRING_MOMENTUM: Transition = {
  type: "spring",
  bounce: 0.2,
  duration: 0.4,
};

/** Press feedback: respond instantly, settle without overshoot. */
export const TAP_SCALE = { scale: 0.97 };
export const HOVER_SCALE = { scale: 1.02 };
