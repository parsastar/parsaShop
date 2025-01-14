import { GetAllProducts, GetProductById } from "@/api/products";
import { useQuery } from "@tanstack/react-query";
import { QueryTags } from "src/constants/ReactQueryTags";

export const useGetAllProductsQuery = ({
  queryParams,
}: {
  queryParams: string;
}) =>
  useQuery({
    queryKey: [QueryTags.getAllProducts],
    queryFn: () => GetAllProducts({ queryParams }),
  });

export const useGetProductByIdQuery = ({ id }: { id: string | number }) =>
  useQuery({
    queryKey: [QueryTags.getAllProducts, id],
    queryFn: () => GetProductById({ id: id }),
  });
