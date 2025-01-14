import { IProduct } from "./../../models/Product";
import { TGetCategory } from "./category";
export type TGetProduct = IProduct & {
  category: TGetCategory;
  _id: string;
};
export type TPostProduct = Omit<IProduct, "createdAt" | "category"> & {
  categoryId: string;
};

export type TGetProducts = {
  products: TGetProduct[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalProducts: number;
  };
  status: number;
};
