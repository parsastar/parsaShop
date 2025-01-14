import { PostCategory, PutCategory, RemoveCategory } from "@/api/categories";
import { useMutation } from "@tanstack/react-query";

export const usePutCategoryMutation = () =>
  useMutation({
    mutationKey: ["putCategory"],
    mutationFn: PutCategory,
  });

export const usePostCategoryMutation = () =>
  useMutation({
    mutationKey: ["postCategory"],
    mutationFn: PostCategory,
  });

export const useRemoveCategoryMutation = () =>
  useMutation({
    mutationKey: ["removeCategory"],
    mutationFn: RemoveCategory,
  });
