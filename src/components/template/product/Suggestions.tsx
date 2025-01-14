import { useGetAllProductsQuery } from "@/hooks/queries/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Suggestions = ({ category }: { category: string }) => {
  const queryParams = new URLSearchParams({
    page: "1",
    pageSize: "10",
    categorySearch: category,
  });
  const { data, status } = useGetAllProductsQuery({
    queryParams: queryParams.toString(),
  });
  console.log("ss", data);
  return (
    <div className="flex flex-col gap-2">
      <p className="text-primary text-3xl font-semibold">Similar Products</p>
      <div
        style={{ overflow: "scroll" }}
        className="flex  float-left  max-w-[1300px] "
      >
        {status == "success" && data.products.length > 0 ? (
          data.products.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              className="flex shadow-sm hover:shadow-md duration-200  m-5 w-[300px] overflow-hidden rounded-xl  min-w-[300px] flex-col border min-h-[350px] gap-5 "
            >
              <div className="aspect-square relative  ">
                <Image
                  src={`/${
                    product.image
                      ? `uploads/${product.image}`
                      : "imageInput.svg"
                  }`}
                  fill
                  style={{ objectFit: "cover" }}
                  alt={product.name}
                />
              </div>
              <div className="flex flex-col items-start gap-2 p-5">
                <div className="flex w-full items-end justify-between">
                  <p className="text-primary text-xl font-semibold">
                    {product.name}
                  </p>
                  <p className="text-primary text-md">
                    {" "}
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
                <p className="text-base font-medium">
                  Price : {product.price} $
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="w-full text-center text-3xl font-semibold">
            No Similar Product
          </p>
        )}
        {/* {status == "pending" && <div className=""></div>} */}
      </div>
    </div>
  );
};

export default Suggestions;
