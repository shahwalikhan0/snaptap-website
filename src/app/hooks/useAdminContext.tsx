"use client";

import React, { useState, useContext } from "react";
import { AdminDataType } from "../app/types/admin-data";
import { AdminContext } from "./types";
import { BrandDataType } from "../app/types/brand-data";

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [admin, setAdmin] = useState<AdminDataType | null>(null);
  const [brand, setBrand] = useState<BrandDataType | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const isLoggedIn = !!admin?.id;
  return (
    <AdminContext.Provider
      value={{
        Admin: admin,
        isLoggedIn,
        setAdmin,
        Brand: brand,
        setBrand,
        token,
        setToken,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);

// "use client";
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { AdminDataType } from "../app/types/admin-data";
// import { BrandDataType } from "../app/types/brand-data";

// type AdminContextType = {
//   Admin: AdminDataType | null;
//   Brand: BrandDataType | null;
//   isLoggedIn: boolean;
//   hydrated: boolean;
//   setAdmin: (admin: AdminDataType | null) => void;
//   setBrand: (brand: BrandDataType | null) => void;
// };

// const AdminContext = createContext<AdminContextType>({
//   Admin: null,
//   Brand: null,
//   isLoggedIn: false,
//   hydrated: false,
//   setAdmin: () => {},
//   setBrand: () => {},
// });

// export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
//   const [Admin, setAdmin] = useState<AdminDataType | null>(null);
//   const [Brand, setBrand] = useState<BrandDataType | null>(null);
//   const [hydrated, setHydrated] = useState(false);

//   const isLoggedIn = Boolean(Admin && Brand);

//   useEffect(() => {
//     const storedAdmin = localStorage.getItem("admin");
//     const storedBrand = localStorage.getItem("brand");

//     if (storedAdmin) {
//       try {
//         setAdmin(JSON.parse(storedAdmin));
//       } catch (e) {
//         console.warn("Invalid admin data in localStorage");
//       }
//     }

//     if (storedBrand) {
//       try {
//         setBrand(JSON.parse(storedBrand));
//       } catch (e) {
//         console.warn("Invalid brand data in localStorage");
//       }
//     }

//     // Set hydrated AFTER attempting to read both
//     setHydrated(true);
//   }, []);

//   return (
//     <AdminContext.Provider
//       value={{
//         Admin,
//         Brand,
//         isLoggedIn,
//         hydrated,
//         setAdmin,
//         setBrand,
//       }}
//     >
//       {children}
//     </AdminContext.Provider>
//   );
// };

// export const useAdmin = () => useContext(AdminContext);
