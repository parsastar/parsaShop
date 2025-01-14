"use client";
import BasketStoreButtons from "@/components/shared/buttons/BasketStoreButtons";
import { useGetProductByIdQuery } from "@/hooks/queries/product";
import { useBasketStore } from "@/store/basketStore";
import Image from "next/image";
import React from "react";
import Suggestions from "./Suggestions";

const Product = ({ productId }: { productId: string }) => {
  const { data, status } = useGetProductByIdQuery({ id: productId });
  const { setItem, countAll, items } = useBasketStore();
  if (status == "success") {
    const { image, name, _id, category, count, createdAt, price, description } =
      data;
    return (
      <div className="flex flex-col gap-10">
        <div className="flex justify-between gap-10 w-full my-10">
          <div className="relative h-[400px] aspect-square">
            <Image
              fill
              alt={name}
              style={{ objectFit: "cover" }}
              src={`/${image ? `uploads/${image}` : "imageInput.svg"}`}
            />
          </div>
          <div className="flex w-full justify-between flex-col gap-5">
            <div className="flex flex-col gap-5">
              <div className="w-full flex  justify-between">
                <div className="flex flex-col gap-2">
                  <p className="text-3xl text-primary font-semibold">{name}</p>
                  <p className="text-lg text-gray-500">{category.name}</p>
                </div>
                <p className="text-lg font-semibold text-gray-500">
                  {new Date(createdAt)
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
              <p className="text-xl text-black">Description : {description}</p>
            </div>
            <div className="flex justify-between items-end w-full">
              <div className="flex items-end gap-5">
                <p className="text-primary text-2xl font-semibold">
                  Price : {price} $
                </p>
                {count < 5 && count != 0 && (
                  <p className="text-sm text-yellow-400">
                    only {count} in Stock
                  </p>
                )}
              </div>

              <BasketStoreButtons
                product={data}
                countAll={countAll}
                items={items}
                setItem={setItem}
              />
            </div>
          </div>
        </div>
        <Suggestions category={data.category._id} />
      </div>
    );
  }
};

export default Product;
