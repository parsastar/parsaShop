import {
  TGetCategories,
  TGetCategory,
  TPostCategory,
} from "src/types/api/category";
import { api } from "./config";

export const GetAllCategories = async (): Promise<TGetCategories> =>
  await api.get("/api/categories").then((res) => res.data.categories);

export const GetCategoryById = async ({
  id,
}: {
  id: string | number;
}): Promise<TGetCategory> =>
  await api.get(`/api/categories/${id}`).then((res) => res.data.category);

export const PostCategory = async ({ category }: { category: TPostCategory }) =>
  await api.post("/api/categories", category).then((res) => res);

export const PutCategory = async ({
  category,
  id,
}: {
  category: TPostCategory;
  id: string | number;
}) => await api.put(`/api/categories/${id}`, category);

export const RemoveCategory = async ({ id }: { id: string | number }) =>
  await api.delete(`/api/categories/${id}`);
