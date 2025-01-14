"use client";
import { GetAllCategories, RemoveCategory } from "@/api/categories";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useDeleteDialogStore from "@/store/deleteDialogStore";
import { useQuery } from "@tanstack/react-query";
import { Pencil, Trash2Icon } from "lucide-react";
import React from "react";
import { QueryTags } from "src/constants/ReactQueryTags";
import { useDashModal } from "src/store/dashModalStore";
import { TGetCategory } from "src/types/api/category";

export default function Category() {
  const { setStep } = useDashModal();
  const { setInitial } = useDeleteDialogStore();
  const { isError, isLoading, data, error } = useQuery({
    queryKey: [QueryTags.getAllCategories],
    queryFn: GetAllCategories,
  });
  const handleClick = (category: TGetCategory) => {
    setStep({
      newStep: { value: "category", selected: category },
    });
  };
  const handleDelete = (category: TGetCategory) => {
    setInitial({
      title: `Deleting ${category.name} `,
      description: `Do You Want To Delete ${category.name} `,
      deleteFn: {
        fn: () => RemoveCategory({ id: category._id }),
        queryKey: [QueryTags.getAllCategories],
      },
    });
  };
  console.log("cats : ", data);
  return (
    <div className="py-5">
      {isError && <p className="text-destructive">{error.message}</p>}
      {isLoading && <CatMocks />}
      <div className="grid grid-cols-3 gap-10">
        {!isLoading &&
          !isError &&
          data?.map((category) => (
            <div
              key={category._id}
              className="bg-white hover:bg-slate-100  duration-200 items-center border  rounded-xl flex justify-between px-5 py-4 "
            >
              <p className="text-primary"> {category.name} </p>
              <div className="flex gap-2 ">
                <Button
                  type="button"
                  onClick={() => handleClick(category)}
                  className="w-7 aspect-square bg-blue text-white bg-blue-500 hover:bg-blue-400  flex justify-center items-center  "
                >
                  <Pencil size={15} />
                </Button>
                <Button
                  type="button"
                  onClick={() => handleDelete(category)}
                  variant="destructive"
                  className="w-7 aspect-square  text-white  flex justify-center items-center  "
                >
                  <Trash2Icon size={15} />
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

const CatMocks = () => {
  return (
    <div className="grid w-full grid-cols-3 gap-10">
      {Array(10)
        .fill(null)
        .map((cat, index) => (
          <Skeleton key={index} className="rounded-xl  h-14 w-full" />
        ))}
    </div>
  );
};
