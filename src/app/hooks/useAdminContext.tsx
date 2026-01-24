"use client";

import React, { useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { AdminDataType } from "../app/types/admin-data";
import { AdminContext } from "./types";
import { BrandDataType } from "../app/types/brand-data";

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [admin, setAdminState] = useState<AdminDataType | null>(null);
  const [brand, setBrandState] = useState<BrandDataType | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from cookies on mount
  useEffect(() => {
    const storedToken = Cookies.get("token");
    const storedAdmin = Cookies.get("admin");
    const storedBrand = Cookies.get("brand");

    if (storedToken) setTokenState(storedToken);
    if (storedAdmin) {
      try {
        setAdminState(JSON.parse(storedAdmin));
      } catch (e) {
        console.error("Failed to parse admin cookie", e);
      }
    }
    if (storedBrand) {
      try {
        setBrandState(JSON.parse(storedBrand));
      } catch (e) {
        console.error("Failed to parse brand cookie", e);
      }
    }
    setIsInitialized(true);
  }, []);

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) {
      // Access token expires in ~50 minutes, set cookie expiry slightly longer
      Cookies.set("token", newToken, { expires: 1 / 24 }); // ~1 hour
    } else {
      Cookies.remove("token");
    }
  };

  const setAdmin = (newAdmin: AdminDataType | null) => {
    setAdminState(newAdmin);
    if (newAdmin) {
      Cookies.set("admin", JSON.stringify(newAdmin), { expires: 7 });
    } else {
      Cookies.remove("admin");
    }
  };

  const setBrand = (newBrand: BrandDataType | null) => {
    setBrandState(newBrand);
    if (newBrand) {
      Cookies.set("brand", JSON.stringify(newBrand), { expires: 7 });
    } else {
      Cookies.remove("brand");
    }
  };

  const isLoggedIn = !!admin?.id;
  return (
    <AdminContext.Provider
      value={{
        Admin: admin,
        isLoggedIn,
        isInitialized,
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
