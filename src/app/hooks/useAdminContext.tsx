"use client";

import React, { createContext, useState, useContext } from "react";
import { AdminDataType } from "../navigations/types/admin-data";

type AdminContextType = {
  Admin: AdminDataType | null;
  isLoggedIn: Boolean;
  setAdmin: (Admin: AdminDataType | null) => void;
};

export const AdminContext = createContext<AdminContextType>({
  Admin: null,
  isLoggedIn: false,
  setAdmin: () => {},
});

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [admin, setAdmin] = useState<AdminDataType | null>(null);

  const isLoggedIn = !!admin?.id;
  return (
    <AdminContext.Provider value={{ Admin: admin, isLoggedIn, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
