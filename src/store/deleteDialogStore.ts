import { AxiosResponse } from "axios";
import { create } from "zustand";

export type IDeleteDialogStore = {
  imageUrl?: string;
  open: boolean;
  title: string;
  description?: string;
  deleteFn?: {
    fn: () => Promise<AxiosResponse<any, any>>;
    queryKey?: string[];
    NextRevalidateFn?: (() => Promise<void>)[];
  }; // this will be used in react-qeury
  setOpen: () => void;
  setInitial: (
    params: Pick<
      IDeleteDialogStore,
      "title" | "description" | "deleteFn" | "imageUrl"
    >
  ) => void;
  setDeleteFn: (deleteFn: IDeleteDialogStore["deleteFn"]) => void;
  setTitle: (title: IDeleteDialogStore["title"]) => void;
  setDescription: (description: IDeleteDialogStore["description"]) => void;
};

const initialState: Omit<
  IDeleteDialogStore,
  "setOpen" | "setInitial" | "setDeleteFn" | "setTitle" | "setDescription"
> = {
  open: false,
  title: "حذف",
  description: "",
  deleteFn: undefined, // Default to no-op function
};

const useDeleteDialogStore = create<IDeleteDialogStore>((set) => ({
  ...initialState,

  setOpen: () => set((state) => ({ open: !state.open })),
  // use setInitial to set title and delete fn and desc and open the dialog
  setInitial: ({ title, deleteFn, description, imageUrl }) =>
    set({ title, deleteFn, description, imageUrl, open: true }),

  setDeleteFn: (deleteFn) => set({ deleteFn }),

  setTitle: (title) => set({ title }),

  setDescription: (description) => set({ description }),
}));

export default useDeleteDialogStore;
