import { TGetProduct } from "src/types/api/product";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type TBasketItem = { item: TGetProduct; count: number };

export type TBasketStore = {
  open: boolean;
  setOpen: (open: boolean) => void;
  items: TBasketItem[];
  countAll: number;
  setItem: (
    products: TBasketStore["items"],
    countAll: TBasketStore["countAll"]
  ) => void;
  Restart: () => void;
};

export const useBasketStore = create(
  persist<TBasketStore>(
    (set) => ({
      open: false,
      countAll: 0,
      setOpen: (open) => set({ open }),
      items: [],
      setItem: (products, countAll) => set({ items: products, countAll }),
      Restart: () => set({ items: [], open: false, countAll: 0 }),
    }),
    {
      name: "basket-storage", // The key for storage
      storage: createJSONStorage(() => localStorage), // Wrap localStorage with createJSONStorage
    }
  )
);
