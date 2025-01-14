import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useProductRHF } from "@/hooks/RHF/productRHF";
import { LoaderCircle } from "lucide-react";
import React from "react";
import { TGetProduct } from "src/types/api/product";
import ProductInputs from "./parts/Inputs";

export default function ProductForm({
  selected,
  handleClose,
}: {
  selected?: TGetProduct;
  handleClose: () => void;
}) {
  const form = useProductRHF({ handleClose, selected });
  const { handleSubmit, onSubmit, isSubmitting } = form;
  return (
    <div className=" m-10 max-w-2xl mx-auto">
      <ModalHeader selected={selected} />
      <form
        className="flex flex-col w-full  mx-auto  items-start justify-center gap-10 m-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ProductInputs form={form} />
        <Button size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <div className="flex gap-2">
              {" "}
              <p> {selected ? "Editing" : "Creating"} Product</p>{" "}
              <LoaderCircle className={"animate-spin"} />{" "}
            </div>
          ) : (
            <p> {selected ? "Edit" : "Create"} Product</p>
          )}
        </Button>
      </form>
    </div>
  );
}

const ModalHeader = ({ selected }: { selected?: TGetProduct }) => {
  return (
    <div className="flex font-semibold w-full  text-2xl flex-col gap-1 ">
      <p>
        {" "}
        {selected ? `Edit Product ` : `Create New  `}{" "}
        <span className="text-primary">
          {" "}
          {selected ? selected.name : "Product"}{" "}
        </span>
      </p>
      <Separator />
    </div>
  );
};
