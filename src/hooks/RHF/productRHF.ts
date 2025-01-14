import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useToast } from "../use-toast";

import { TGetProduct } from "src/types/api/product";
import { ProductSchema, TProductSchema } from "src/types/validators/product";
import { UploadImageHandler } from "@/utils/uploadImageHandler";
import {
  useDeleteImageMutation,
  useUploadImageMutation,
} from "../mutation/Image";
import {
  usePostProductMutation,
  usePutProductMutation,
} from "../mutation/product";
import { revalidateQuery } from "@/utils/revalidateQueries";
import { QueryTags } from "src/constants/ReactQueryTags";

export const useProductRHF = ({
  selected,
  handleClose,
}: {
  selected?: TGetProduct;
  handleClose: () => void;
}) => {
  const { toast } = useToast();
  const postProduct = usePostProductMutation();
  const putProduct = usePutProductMutation();
  const uploadImage = useUploadImageMutation();
  const deleteImage = useDeleteImageMutation();
  const {
    register,
    control,
    reset,
    watch,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TProductSchema>({
    resolver: zodResolver(ProductSchema),
    defaultValues: selected
      ? {
          ...selected,
          imageFile: undefined,
          categoryId: selected.category._id,
        }
      : {},
  });

  const onSubmit: SubmitHandler<TProductSchema> = async (data) => {
    try {
      const { imageUrl, ImageUploaded } = await UploadImageHandler({
        imageUrl: data.image,
        imageFile: data.imageFile,
        uploadImage: uploadImage,
        deleteImage: deleteImage,
        toast: toast,
      });

      if (ImageUploaded) {
        data.image = imageUrl;
        const { imageFile, ...sendingData } = data;
        if (selected) {
          await putProduct.mutateAsync(
            { product: sendingData, id: selected._id },
            {
              onSuccess: (res) => {
                // im not using these any more because queryClient.invalidateQueries
                // revalidates from page 0
                revalidateQuery({ query: QueryTags.getAllProducts });
                handleClose();
                toast({
                  title: res.message,
                  variant: "success",
                });
              },
              onError: (error) => {
                toast({
                  title: error.message,
                  variant: "destructive",
                });
              },
            }
          );
        } else {
          console.log("sendingData : ", sendingData);
          await postProduct.mutateAsync(
            { product: sendingData },
            {
              onSuccess: (res) => {
                // im not using these any more because queryClient.invalidateQueries
                // revalidates from page 0
                revalidateQuery({ query: QueryTags.getAllProducts });
                handleClose();
                toast({
                  title: res.message,
                  dir: "rtl",
                  variant: "success",
                });
              },
              onError: (error) => {
                toast({
                  title: error.message,
                  dir: "rtl",
                  variant: "destructive",
                });
              },
            }
          );
        }
      }
    } catch (error) {
      console.log(error);
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
