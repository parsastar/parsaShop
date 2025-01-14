import { TGetProduct, TGetProducts, TPostProduct } from "src/types/api/product";
import { api } from "./config";

export const GetAllProducts = ({
  queryParams,
}: {
  queryParams?: string;
}): Promise<TGetProducts> =>
  api.get(`/api/products?${queryParams || ""}`).then((res) => res.data);

export const GetProductById = ({
  id,
}: {
  id: string | number;
}): Promise<TGetProduct> =>
  api.get(`/api/products/${id}`).then((res) => res.data.product);
export const PostProduct = ({ product }: { product: TPostProduct }) =>
  api.post(`/api/products/`, product).then((res) => res.data);

export const PutProduct = ({
  product,
  id,
}: {
  product: TPostProduct;
  id: string | number;
}) => api.put(`/api/products/${id}`, product).then((res) => res.data);

export const RemoveProduct = ({ id }: { id: string | number }) =>
  api.delete(`/api/products/${id}`).then((res) => res.data);
