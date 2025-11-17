import { createContext, useContext, useState, ReactNode } from "react";
import type { ContractCategory } from "@shared/schema";

interface ContractContextType {
  contractText: string;
  category: ContractCategory | null;
  setContractData: (text: string, category: ContractCategory) => void;
  setCategory: (category: ContractCategory) => void;
  clearContractData: () => void;
}

const ContractContext = createContext<ContractContextType | undefined>(undefined);

export function ContractProvider({ children }: { children: ReactNode }) {
  const [contractText, setContractText] = useState("");
  const [category, setCategory] = useState<ContractCategory | null>(null);

  const setContractData = (text: string, cat: ContractCategory) => {
    setContractText(text);
    setCategory(cat);
  };

  const setCategoryOnly = (cat: ContractCategory) => {
    setCategory(cat);
  };

  const clearContractData = () => {
    setContractText("");
    setCategory(null);
  };

  return (
    <ContractContext.Provider value={{ 
      contractText, 
      category, 
      setContractData, 
      setCategory: setCategoryOnly,
      clearContractData 
    }}>
      {children}
    </ContractContext.Provider>
  );
}

export function useContract() {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error("useContract must be used within ContractProvider");
  }
  return context;
}
