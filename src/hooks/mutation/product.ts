import { PostProduct, PutProduct, RemoveProduct } from "@/api/products";
import { useMutation } from "@tanstack/react-query";

export const usePutProductMutation = () =>
  useMutation({
    mutationKey: ["putProduct"],
    mutationFn: PutProduct,
  });

export const usePostProductMutation = () =>
  useMutation({
    mutationKey: ["postProduct"],
    mutationFn: PostProduct,
  });

export const useRemoveProductMutation = () =>
  useMutation({
    mutationKey: ["removeProduct"],
    mutationFn: RemoveProduct,
  });
