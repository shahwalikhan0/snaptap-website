"use client";

import React from "react";
import { MotionConfig } from "framer-motion";

/**
 * reducedMotion="user" makes every motion.* component in the app respect
 * prefers-reduced-motion automatically: transform/layout animations are
 * stripped, opacity fades remain. This is Apple's "reduced motion isn't no
 * feedback, it's a gentler equivalent" rule applied site-wide from one place
 * instead of per-component media queries.
 */
export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <MotionConfig reducedMotion="user">{children}</MotionConfig>;
