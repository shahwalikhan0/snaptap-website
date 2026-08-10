"use client";

import React from "react";
import { ConfigProvider } from "antd";
import { BRAND, RADIUS_BRAND, FONT_SANS } from "@/app/utils/tokens";

/**
 * Themes antd from the design tokens.
 *
 * antd is the widget kit for anything the `ui/` primitives don't cover (Form,
 * Modal, Table, Slider, Upload, Dropdown, DatePicker). Before this provider
 * existed antd rendered with its stock blue and 8px radius, so every usage
 * fought it with per-instance `!important` overrides — hardcoded brand hex and
 * radius forced onto every Button and Modal. Setting the theme once here makes
 * antd match the brand natively and makes those overrides redundant.
 *
 * Deliberately NOT set: controlHeight / sizing tokens. Changing antd's control
 * heights globally would shift existing layouts on every form page, which is a
 * visual regression rather than a token fix.
 */
export const AntdProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: BRAND.blueDark,
        colorInfo: BRAND.blueDark,
        colorLink: BRAND.blueDark,
        colorLinkHover: BRAND.blue,
        colorTextBase: BRAND.grayDark,
        borderRadius: RADIUS_BRAND,
        fontFamily: FONT_SANS,
      },
      components: {
        // antd uses borderRadiusLG for these larger surfaces, so they need it
        // explicitly — `borderRadius` above only covers the base scale.
        Modal: { borderRadiusLG: RADIUS_BRAND },
        Card: { borderRadiusLG: RADIUS_BRAND },
        Button: { primaryShadow: "none" },
      },
    }}
  >
    {children}
  </ConfigProvider>
);
