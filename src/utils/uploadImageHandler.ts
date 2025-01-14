import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

type TUploadImageProps = {
  uploadImage: UseMutationResult<
    AxiosResponse<{ name: string }, any>,
    Error,
    FormData,
    unknown
  >;
  toast: any;
  imageUrl?: string | undefined;
  deleteImage: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    string,
    unknown
  >;
  imageFile?: File;
};

type TUploadImage = {
  imageUrl: string | undefined;
  ImageUploaded: boolean;
};

export const UploadImageHandler = async ({
  imageUrl, // existing image URL (if any)
  imageFile, // new image file to upload
  uploadImage,
  deleteImage,
  toast,
}: TUploadImageProps): Promise<TUploadImage> => {
  console.log("hbd ", imageUrl, imageFile);
  let ImageUploaded = false;
  let finalImageUrl = imageUrl || undefined;
  if (!imageFile) {
    return { imageUrl: finalImageUrl, ImageUploaded: true };
  }
  try {
    // Handle image deletion if there is an existing image URL
    if (imageUrl) {
      await deleteImage.mutateAsync(imageUrl, {
        onSuccess: () => {},
        onError: (err) => {
          throw new Error("Failed to delete the existing image.");
        },
      });
    }

    // Handle image upload if there is a new image file
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      const response = await uploadImage.mutateAsync(formData);
      console.log("res : ", response);
      finalImageUrl = response.data.name;
      ImageUploaded = true;
    } else {
      ImageUploaded = true; // No image file to upload, consider it "uploaded."
    }

    return { imageUrl: finalImageUrl, ImageUploaded };
  } catch (error) {
    toast({
      title: "failed posting Image ",
      dir: "rtl",
      variant: "destructive",
    });
    return { imageUrl: finalImageUrl, ImageUploaded: false };
  }
};
