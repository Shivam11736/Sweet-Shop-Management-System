import { createContext, useContext, useState, ReactNode } from "react";
import { Sweet } from "@/types/sweet";
import { mockSweets } from "@/data/mockSweets";

interface SweetsContextType {
  sweets: Sweet[];
  addSweet: (sweet: Omit<Sweet, "id">) => void;
  updateSweet: (id: string, sweet: Partial<Sweet>) => void;
  deleteSweet: (id: string) => void;
  purchaseSweet: (id: string) => boolean;
  restockSweet: (id: string, amount: number) => void;
}

const SweetsContext = createContext<SweetsContextType | undefined>(undefined);

export function SweetsProvider({ children }: { children: ReactNode }) {
  const [sweets, setSweets] = useState<Sweet[]>(mockSweets);

  const addSweet = (sweet: Omit<Sweet, "id">) => {
    const newSweet: Sweet = {
      ...sweet,
      id: Date.now().toString(),
    };
    setSweets((prev) => [...prev, newSweet]);
  };

  const updateSweet = (id: string, updates: Partial<Sweet>) => {
    setSweets((prev) =>
      prev.map((sweet) => (sweet.id === id ? { ...sweet, ...updates } : sweet))
    );
  };

  const deleteSweet = (id: string) => {
    setSweets((prev) => prev.filter((sweet) => sweet.id !== id));
  };

  const purchaseSweet = (id: string): boolean => {
    const sweet = sweets.find((s) => s.id === id);
    if (!sweet || sweet.quantity <= 0) return false;

    setSweets((prev) =>
      prev.map((s) => (s.id === id ? { ...s, quantity: s.quantity - 1 } : s))
    );
    return true;
  };

  const restockSweet = (id: string, amount: number) => {
    setSweets((prev) =>
      prev.map((s) => (s.id === id ? { ...s, quantity: s.quantity + amount } : s))
    );
  };

  return (
    <SweetsContext.Provider
      value={{
        sweets,
        addSweet,
        updateSweet,
        deleteSweet,
        purchaseSweet,
        restockSweet,
      }}
    >
      {children}
    </SweetsContext.Provider>
  );
}

export function useSweets() {
  const context = useContext(SweetsContext);
  if (context === undefined) {
    throw new Error("useSweets must be used within a SweetsProvider");
  }
  return context;
}
