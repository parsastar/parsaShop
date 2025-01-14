import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { TGetCategory } from "src/types/api/category";
import { useToast } from "@/hooks/use-toast";
import { revalidateMultipleQueries } from "@/utils/revalidateQueries";
import { QueryTags } from "src/constants/ReactQueryTags";
import { usePatchPocketMutation } from "../mutation/pocket";
import { PocketSchema, TPocketSchema } from "src/types/validators/pokcet";

export const usePocketRHF = ({
  handleClose,
  selected,
}: {
  handleClose: () => void;
  selected: TGetCategory;
}) => {
  const { toast } = useToast();
  const patchMutation = usePatchPocketMutation();
  const {
    register,
    getValues,
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TPocketSchema>({
    resolver: zodResolver(PocketSchema),
    defaultValues: { value: 0 },
  });
  const onSubmit: SubmitHandler<TPocketSchema> = async (data) => {
    try {
      const { value } = data;
      await patchMutation.mutateAsync(
        { id: selected._id, value: { value } },
        {
          onSuccess: async (res) => {
            revalidateMultipleQueries({
              queries: [QueryTags.getAllUsers, QueryTags.getSingleUser],
            });
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
    } catch (e) {
      console.log("category rhf error on submitting is  : ", e);
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
