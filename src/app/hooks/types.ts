"use client";

import { createContext } from "react";
import { AdminDataType } from "../app/types/admin-data";
import { BrandDataType } from "../app/types/brand-data";

export type AdminContextType = {
  Admin: AdminDataType | null;
  Brand: BrandDataType | null;
  token: string | null;
  isLoggedIn: boolean;
  setAdmin: (Admin: AdminDataType | null) => void;
  setBrand: (Brand: BrandDataType | null) => void;
  setToken: (token: string | null) => void;
};

export const AdminContext = createContext<AdminContextType>({
  Admin: null,
  Brand: null,
  token: null,
  isLoggedIn: false,
  setAdmin: () => {},
  setBrand: () => {},
  setToken: () => {},
});
