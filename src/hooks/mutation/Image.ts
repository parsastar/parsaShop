import { deleteImage, uploadImage } from "@/api/file";
import { useMutation } from "@tanstack/react-query";

export const useUploadImageMutation = () =>
  useMutation({ mutationFn: (formData: FormData) => uploadImage(formData) });

export const useDeleteImageMutation = () =>
  useMutation({ mutationFn: (fileName: string) => deleteImage(fileName) });
