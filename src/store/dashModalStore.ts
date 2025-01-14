import { TGetCategory } from "src/types/api/category";
import { TGetProduct } from "src/types/api/product";
import { TUserWithID } from "src/types/api/users";
import { create } from "zustand";

type TDashModal = {
  step:
    | { value: "close"; selected: undefined }
    | { value: "category"; selected?: TGetCategory }
    | { value: "product"; selected?: TGetProduct }
    | { value: "pocket"; selected: TUserWithID };
  setStep: ({ newStep }: { newStep: TDashModal["step"] }) => void;
  handleClose: () => void;
};
const initial: TDashModal = {
  step: { value: "close", selected: undefined },
  setStep: () => {},
  handleClose: () => {},
};
export const useDashModal = create<TDashModal>((set) => ({
  ...initial,
  setStep: ({ newStep }: { newStep: TDashModal["step"] }) =>
    set({ step: newStep }),
  handleClose: () => set({ step: { value: "close", selected: undefined } }),
}));
