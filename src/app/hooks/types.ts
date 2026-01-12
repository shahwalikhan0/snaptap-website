"use client";

import { createContext } from "react";
import { AdminDataType } from "../app/types/admin-data";
import { BrandDataType } from "../app/types/brand-data";

export type AdminContextType = {
  Admin: AdminDataType | null;
  Brand: BrandDataType | null;

  isLoggedIn: boolean;
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

// "use client";

// import { AdminDataType } from "../app/types/admin-data";
// import { BrandDataType } from "../app/types/brand-data";

// export type AdminContextType = {
//   Admin: AdminDataType | null;
//   Brand: BrandDataType | null;
//   isLoggedIn: boolean;
//   setAdmin: (Admin: AdminDataType | null) => void;
//   setBrand: (Brand: BrandDataType | null) => void;
// };
