import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { usePocketRHF } from "@/hooks/RHF/pocketRHF";
import { LoaderCircle } from "lucide-react";
import React from "react";
import { useCategoryRHF } from "src/hooks/RHF/categoryRHF";
import { TGetCategory } from "src/types/api/category";
import { TUserWithID } from "src/types/api/users";

export default function PocketForm({
  selected,
  handleClose,
}: {
  selected: TUserWithID;
  handleClose: () => void;
}) {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } =
    usePocketRHF({ selected, handleClose });

  return (
    <div className=" m-10 max-w-2xl mx-auto">
      <ModalHeader selected={selected} />

      <form
        className="flex flex-col w-full  mx-auto  items-start justify-center gap-10 m-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-1 items-start w-full max-w-xl">
          <label>CREDIT AMOUNT</label>
          <Input
            placeholder="0$"
            {...register("value", { valueAsNumber: true })}
          />
          {errors?.value && (
            <p className="text-destructive text-sm">{errors.value.message}</p>
          )}
        </div>

        <Button size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <div className="flex gap-2">
              {" "}
              ADDING CREDIT <LoaderCircle className={"animate-spin"} />{" "}
            </div>
          ) : (
            <p> ADD CREDIT </p>
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
        CREDIT FORM
        <span className="text-primary">
          {" "}
          {selected ? selected.name : "Category"}{" "}
        </span>
      </p>
      <Separator />
    </div>
  );
};
