import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TGetPayment } from "src/types/api/payments";

const PaymentList = ({ items }: { items: TGetPayment["items"] }) => {
  return (
    <div className="w-full grid gap-10 grid-cols-1">
      {items.map((item, index) => {
        const total = item.count;
        const { _id, name, price, description, image } = item.product;
        return (
          <div
            key={_id}
            className="w-full border flex overflow-hidden shadow-sm duration-200 cursor-pointer rounded-xl hover:shadow-md"
          >
            <div className="relative h-full min-h-[200px] aspect-square">
              <Image
                fill
                alt={name}
                style={{ objectFit: "cover" }}
                src={`/${image ? `uploads/${image}` : "imageInput.svg"}`}
              />
            </div>
            <div className="flex w-full items-center px-5 justify-between py-5">
              <div className="flex w-full  flex-col gap-2 ">
                <p className="text-primary font-semibold text-xl">
                  Name : {name}
                </p>
                <p className="text-primary  text-lg">Price : {price}</p>
                <p className="text-primary  text-lg">count : {total}</p>
                <div className="h-full flex justify-between items-end w-full">
                  <p className="text-primary font-medium text-lg">
                    final price : {`${total} * ${price} = ${total * price} $`}
                  </p>
                  <Link
                    className="p-2 px-4 bg-blue-500 text-white rounded-sm "
                    href={`/products/${item.product._id}`}
                  >
                    explore {name}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PaymentList;
