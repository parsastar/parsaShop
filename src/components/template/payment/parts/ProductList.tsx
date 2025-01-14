import BasketStoreButtons from "@/components/shared/buttons/BasketStoreButtons";
import { TBasketStore } from "@/store/basketStore";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductList = ({
  items,
  countAll,
  finalPrice,
  setItem,
}: {
  finalPrice: number;
  items: TBasketStore["items"];
  countAll: TBasketStore["countAll"];
  setItem: TBasketStore["setItem"];
}) => {
  return (
    <div className="w-full flex flex-col">
      {/* header Part Starts  */}
      <div className="flex w-full justify-between items-center text-3xl font-semibold  text-black">
        <div className="flex gap-2   items-center">
          {countAll > 0 ? (
            <>
              <p>Total Of </p>
              <p className="text-secondary font-bold">{countAll}</p>
              <p>Products </p>
            </>
          ) : (
            <p className=""> No Items In Your Basket </p>
          )}
        </div>
        <p className="text-primary">{finalPrice} $</p>
      </div>
      {/* header Part ends  */}
      {/* ListPart Starts  Starts  */}
      <div className="grid mt-5 grid-cols-1 gap-5">
        {items.map((item) => {
          const { category, _id, count, name, price, image } = item.item;
          return (
            <Link
              href={`/products/${item.item._id}`}
              key={_id}
              className="flex border overflow-hidden rounded-xl"
            >
              <div className="relative h-full bg-gray-400 aspect-square">
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  alt={name}
                  src={image ? `/uploads/${image}` : "/imageInput.svg"}
                />
              </div>
              <div className="px-4 py-5 flex w-full justify-between">
                <div className="flex flex-col gap-7 justify-between">
                  <div className="flex flex-col gap-1 ">
                    <p className="text-primary text-xl font-semibold">{name}</p>
                    <p className="text-gray-500 text-base ">{category.name}</p>
                  </div>
                  <BasketStoreButtons
                    countAll={countAll}
                    items={items}
                    product={item.item}
                    setItem={setItem}
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <p className="text-xl font-semibold">Available : {count}</p>

                  <div className="text-lg flex gap-2  font-medium">
                    <p className="text-xl font-semibold">Price : </p>
                    <p className="text-gray-500">
                      {" "}
                      {item.count} x {price} $ =
                    </p>
                    <p className="text-xl  text-primary font-semibold">
                      {" "}
                      {item.count * price} ${" "}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
