import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LoaderCircle } from "lucide-react";
import React from "react";
import { useCategoryRHF } from "src/hooks/RHF/categoryRHF";
import { TGetCategory } from "src/types/api/category";

export default function CategoryForm({
  selected,
  handleClose,
}: {
  selected?: TGetCategory;
  handleClose: () => void;
}) {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } =
    useCategoryRHF({ selected, handleClose });
  console.log("isSubmitting :", isSubmitting);
  return (
    <div className=" m-10 max-w-2xl mx-auto">
      <ModalHeader selected={selected} />

      <form
        className="flex flex-col w-full  mx-auto  items-start justify-center gap-10 m-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-1 items-start w-full max-w-xl">
          <label>Category Name </label>
          <Input placeholder="name" {...register("name")} />
          {errors?.name && (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          )}
        </div>

        <Button size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <div className="flex gap-2">
              {" "}
              <p> {selected ? "Editing" : "Creating"} Category</p>{" "}
              <LoaderCircle className={"animate-spin"} />{" "}
            </div>
          ) : (
            <p> {selected ? "Edit" : "Create"}Category</p>
          )}
        </Button>
      </form>
    </div>
  );
}

const ModalHeader = ({ selected }: { selected?: TGetCategory }) => {
  return (
    <div className="flex font-semibold w-full  text-2xl flex-col gap-1 ">
      <p>
        {" "}
        {selected ? `Edit Category ` : `Create New  `}{" "}
        <span className="text-primary">
          {" "}
          {selected ? selected.name : "Category"}{" "}
        </span>
      </p>
      <Separator />
    </div>
  );
};
