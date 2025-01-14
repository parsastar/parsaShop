import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Controller } from "react-hook-form";
import { TRhfProps } from "src/types/react-hook-form";
import { TProductSchema } from "src/types/validators/product";

export default function ProductImageInput({
  form,
}: {
  form: TRhfProps<TProductSchema>;
}) {
  const { control, watch, register, errors } = form;

  const url = watch("image");
  return (
    <div>
      <div className="flex  flex-col gap-2">
        <p> Image </p>
        <div className="">
          {url ? (
            <Button
              className={` aspect-square min-h-[200px] overflow-hidden relative  h-full flex justify-center items-center rounded-sm  `}
              variant={"none"}
              type="button"
            >
              <label
                className="absolute z-10 left-0 top-0 w-full h-full"
                htmlFor="productImageInout"
              />
              <Image
                src={`/uploads/${url}`}
                fill
                style={{ objectFit: "cover" }}
                alt="petImage"
              />{" "}
            </Button>
          ) : // setPreviewUrl(URL.createObjectURL(file));
          watch("imageFile") ? (
            <Button
              className={` aspect-square min-h-[200px] overflow-hidden relative  h-full flex justify-center items-center rounded-sm  `}
              variant={"none"}
              type="button"
            >
              <label
                className="absolute z-10 left-0 top-0 w-full h-full"
                htmlFor="productImageInout"
              />
              <Image
                alt="preview"
                fill
                style={{ objectFit: "cover" }}
                src={URL.createObjectURL(watch("imageFile"))}
              />
            </Button>
          ) : (
            <Button
              type="button"
              variant={"none"}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='rgba(156,167,173,.9)' stroke-width='4' stroke-dasharray='20%2c 20' stroke-dashoffset='24' stroke-linecap='square'/%3e%3c/svg%3e")`,
              }}
              className={`relative overflow-hidden  aspect-square min-h-[200px]  flex justify-center items-center rounded-sm  `}
            >
              <label
                className="absolute z-10 left-0 top-0 w-full h-full"
                htmlFor="productImageInout"
              />
              <div className="bg-gray-400/80 grid items-center justify-center  w-8 aspect-square rounded-full">
                <Plus className="stroke-[2px] scale-[1.3] text-white " />
              </div>
            </Button>
          )}
          {errors.imageFile && (
            <p className="text-destructive text-base mt-1">
              {errors?.imageFile?.message?.toString()}
            </p>
          )}
        </div>
      </div>
      <Controller
        control={control}
        name="imageFile"
        render={({ field: { onChange, value } }) => (
          <input
            className="hidden"
            id="productImageInout"
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              // const formData = new FormData();
              if (file) {
                // formData.append("file", file);
                onChange(file);
              }
            }}
          />
        )}
      ></Controller>
    </div>
  );
}
