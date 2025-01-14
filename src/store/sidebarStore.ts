import { create } from "zustand";

type SidebarStore = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
