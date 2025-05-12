"use client";

import { createContext } from "react";
import { AdminDataType } from "../navigations/types/admin-data";
import { BrandDataType } from "../navigations/types/brand-data";

export type AdminContextType = {
  Admin: AdminDataType | null;
  Brand: BrandDataType | null;

  isLoggedIn: Boolean;
  setAdmin: (Admin: AdminDataType | null) => void;
  setBrand: (Brand: BrandDataType | null) => void;
};

export const AdminContext = createContext<AdminContextType>({
  Admin: null,
  Brand: null,
  isLoggedIn: false,
  setAdmin: () => {},
  setBrand: () => {},
});
