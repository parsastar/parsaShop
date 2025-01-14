import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { CategorySchema } from "src/types/validators/category";
import {
  usePostCategoryMutation,
  usePutCategoryMutation,
} from "../mutation/category";
import { TGetCategory, TPostCategory } from "src/types/api/category";
import { useToast } from "@/hooks/use-toast";
import { revalidateQuery } from "@/utils/revalidateQueries";
import { QueryTags } from "src/constants/ReactQueryTags";

export const useCategoryRHF = ({
  handleClose,
  selected,
}: {
  handleClose: () => void;
  selected?: TGetCategory;
}) => {
  const { toast } = useToast();
  const postmutation = usePostCategoryMutation();
  const putmutation = usePutCategoryMutation();
  const {
    register,
    getValues,
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TPostCategory>({
    resolver: zodResolver(CategorySchema),
    defaultValues: selected ? { name: selected.name } : undefined,
  });

  const onSubmit: SubmitHandler<CategorySchema> = async (data) => {
    try {
      const { name } = data;
      if (selected) {
        await putmutation.mutateAsync(
          { id: selected._id, category: { name } },
          {
            onSuccess: async (res) => {
              revalidateQuery({ query: QueryTags.getAllCategories });
              toast({ title: res.data.message, variant: "success" });
              handleClose();
            },
            onError: async (err: any) => {
              toast({
                title: err?.error || "An error occurred",
                variant: "destructive",
              });
            },
          }
        );
      } else {
        await postmutation.mutateAsync(
          { category: { name } },
          {
            onSuccess: (res) => {
              revalidateQuery({ query: QueryTags.getAllCategories });
              toast({ title: res.data.message, variant: "success" });
              handleClose();
            },
            onError: (err: any) => {
              toast({
                title: err?.error || "An error occurred",
                variant: "destructive",
              });
            },
          }
        );
        // await fetch()
      }
    } catch (e) {
      console.log("category rhf error on submiting is  : ", e);
      // handle your error
    }
  };

  return {
    isSubmitting,
    reset,
    getValues,
    handleSubmit,
    register,
    setValue,
    watch,
    control,
    errors,
    onSubmit,
  };
};
