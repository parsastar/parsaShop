import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { TRhfProps } from "src/types/react-hook-form";
import { TProductSchema } from "src/types/validators/product";
import ProductImageInput from "./ProdutcImageInput";
import CategoryInput from "./CategoryInput";

const Inputs = [
  { label: "Name", placeHolder: "name", id: "name", isNumber: false },
  { label: "Price", placeHolder: "100$", id: "price", isNumber: true },
  { label: "Count", placeHolder: "10", id: "count", isNumber: true },
] as TInput[];
type TInput = {
  label: string;
  placeHolder: string;
  isNumber: boolean;
  id: "name" | "description" | "price" | "count";
};

export default function ProductInputs({
  form,
}: {
  form: TRhfProps<TProductSchema>;
}) {
  const { register, errors } = form;
  return (
    <div className="flex flex-wrap w-full justify-between gap-10 gap-y-5">
      {Inputs.map((input) => {
        return (
          <div
            key={input.id}
            className="flex w-full flex-1 min-w-[300px] flex-col gap-2"
          >
            <p>{input.label}</p>
            {input.id == "description" ? (
              <Textarea
                className={`min-h-[400px] max-h-[1000px] w-full ${
                  errors[input.id]?.message && "border-red-500 border"
                }`}
                {...register(input.id, { valueAsNumber: input.isNumber })}
                placeholder={input.placeHolder || input.label}
              />
            ) : (
              <Input
                className={`${
                  errors[input.id]?.message && "border-red-500 border"
                }`}
                {...register(input.id, { valueAsNumber: input.isNumber })}
                placeholder={input.placeHolder || input.label}
              />
            )}

            {errors[input.id]?.message && (
              <p className="text-destructive text-sm">
                {" "}
                {errors[input.id]?.message}
              </p>
            )}
          </div>
        );
      })}
      <div className="flex w-full flex-1 min-w-[300px] flex-col gap-2">
        <p>Category</p>
        <CategoryInput form={form} />
        {errors.categoryId?.message && (
          <p className="text-destructive text-sm">
            {" "}
            {errors.categoryId.message}
          </p>
        )}
      </div>

      <div className="flex w-full gap-10 gap-y-5 ">
        <ProductImageInput form={form} />
        <div className="flex w-full   flex-col gap-2">
          <p>Description</p>
          <Textarea
            className={`min-h-[200px] max-h-[400px] w-full ${
              errors.description?.message && "border-red-500 border"
            }`}
            {...register("description")}
            placeholder="long long long long text"
          />

          {errors.description?.message && (
            <p className="text-destructive text-sm">
              {" "}
              {errors.description?.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
