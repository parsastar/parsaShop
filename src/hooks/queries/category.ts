import { GetAllCategories, GetCategoryById } from "@/api/categories";
import { useQuery } from "@tanstack/react-query";
import { QueryTags } from "src/constants/ReactQueryTags";

export const useGetAllCategoriesQuery = () =>
  useQuery({
    queryKey: [QueryTags.getAllCategories],
    queryFn: GetAllCategories,
  });

export const useGetCategoryByIdQuery = ({ id }: { id: string | number }) =>
  useQuery({
    queryKey: [QueryTags.getAllCategories, id],
    queryFn: () => GetCategoryById({ id: id }),
  });
