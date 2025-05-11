"use client";

import React, { createContext, useState, useContext } from "react";
import { BrandDataType } from "../navigations/types/brand-data";

type BrandContextType = {
  Brand: BrandDataType | null;
  isLoggedIn: Boolean;
  setBrand: (Brand: BrandDataType | null) => void;
};

export const BrandContext = createContext<BrandContextType>({
  Brand: null,
  isLoggedIn: false,
  setBrand: () => {},
});

export const BrandProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [brand, setBrand] = useState<BrandDataType | null>(null);

  const isLoggedIn = !!brand?.id;
  return (
    <BrandContext.Provider value={{ Brand: brand, isLoggedIn, setBrand }}>
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = () => useContext(BrandContext);
