import { RemoveProduct } from "@/api/products";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashModal } from "@/store/dashModalStore";
import useDeleteDialogStore from "@/store/deleteDialogStore";
import { Pen, Trash2 } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";
import { QueryTags } from "src/constants/ReactQueryTags";
import { TGetProduct, TGetProducts } from "src/types/api/product";

export default function ProductList({
  products,
}: {
  products: TGetProducts["products"];
}) {
  const { setStep } = useDashModal();
  const { setInitial } = useDeleteDialogStore();
  const clickHandler = ({ product }: { product: TGetProduct }) => {
    setStep({ newStep: { value: "product", selected: product } });
  };
  const deleteHandler = async ({ product }: { product: TGetProduct }) => {
    setInitial({
      imageUrl: product.image,
      title: "Deleting Product",
      description: `do you want to delete ${product.name}`,
      deleteFn: {
        fn: () => RemoveProduct({ id: product._id }),
        queryKey: [QueryTags.getAllProducts],
      },
    });
  };
  return (
    <div className="flex flex-col gap-10">
      {products.map((product) => (
        <div
          className="border w-full hover:shadow-sm duration-150 p-5 overflow-hidden flex gap-4  rounded-2xl min-h-[300px]"
          key={product._id}
        >
          <div className="min-w-[300px] overflow-hidden  bg-slate-100 relative rounded-2xl aspect-square max-w-[300px]">
            <Image
              fill
              style={{ objectFit: "contain", scale: product.image ? 1 : 0.4 }}
              alt="imageInput"
              src={
                product.image ? `/uploads/${product.image}` : "/imageInput.svg"
              }
            />
          </div>
          <div className="flex flex-col w-full justify-between">
            <div className="flex flex-col my-5 gap-2">
              <div className="flex justify-between w-full">
                <p className="font-semibold text-primary text-3xl">
                  {product.name}
                </p>
                <p className="font-semibold  text-primary text-lg">
                  {new Date(product.createdAt)
                    .toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                    .split("/")
                    .reverse()
                    .join("/")}
                </p>
              </div>
              <p className="text-gray-600 text-lg">{product.category.name}</p>
              <p className="text-sm mt-1 line-clamp-6 text-gray-500">
                {product.description}
              </p>
            </div>
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-2 pb-1">
                <p
                  className={`text-2xl flex gap-3 items-end ${
                    product.count == 0 && "text-gray-400"
                  }`}
                >
                  <p className="text-xl text-primary font-semibold">Count :</p>
                  {product.count == 0 ? "Not Available" : `${product.count}`}
                </p>
                <p className="text-2xl text-primary font-semibold">
                  {product.price}$
                </p>
              </div>

              <div className="flex my-1  justify-start items-center gap-2">
                <Button
                  onClick={() => clickHandler({ product })}
                  style={{ transition: ".2s" }}
                  className="flex gap-3 hover:gap-2 bg-blue-500 rounded-md hover:bg-blue-400 p-6"
                >
                  Edit Product
                  <Pen size={15} />
                </Button>
                <Button
                  onClick={() => deleteHandler({ product })}
                  style={{ transition: ".2s" }}
                  className="flex gap-3 hover:gap-2 bg-red-500 rounded-md hover:bg-red-400 p-6"
                >
                  Delete Product
                  <Trash2 size={15} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export const ProductListMock = () => {
  const size = Number(useSearchParams().get("pageSize")) || 20;
  return (
    <div className="flex flex-col gap-10">
      {[...Array(size)].map((_, index) => (
        <div
          className="border  w-full hover:shadow-sm duration-150 p-5 overflow-hidden flex gap-4 rounded-2xl min-h-[300px]"
          key={index}
        >
          <Skeleton className="min-w-[300px] h-[300px] rounded-2xl" />
          <div className="h-[300px]  w-full flex flex-col justify-between">
            <div className="flex flex-col w-full gap-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-20 w-full" />
            </div>
            <div className="w-full flex items-center justify-between">
              <Skeleton className="h-8 w-1/5" />
              <div className="flex justify-end w-full gap-2">
                <Skeleton className="h-12 w-1/4" />
                <Skeleton className="h-12 w-1/4" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
