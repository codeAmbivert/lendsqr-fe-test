"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface LayoutContextType {
  searchText: string;
  setSearchText: (text: string) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <LayoutContext.Provider
      value={{
        searchText,
        setSearchText,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};
