"use client";

import React, { createContext, useState, useContext } from "react";
import { AdminDataType } from "../navigations/types/admin-data";
import { AdminContext } from "./types";
import { BrandDataType } from "../navigations/types/brand-data";

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [admin, setAdmin] = useState<AdminDataType | null>(null);
  const [brand, setBrand] = useState<BrandDataType | null>(null);

  const isLoggedIn = !!admin?.id;
  return (
    <AdminContext.Provider
      value={{ Admin: admin, isLoggedIn, setAdmin, Brand: brand, setBrand }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
