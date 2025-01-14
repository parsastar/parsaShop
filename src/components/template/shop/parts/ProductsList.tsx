import BasketStoreButtons from "@/components/shared/buttons/BasketStoreButtons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useBasketStore } from "@/store/basketStore";
import Image from "next/image";
import Link from "next/link";
import { TGetProducts } from "src/types/api/product";

const ProductsList = ({ products }: { products: TGetProducts["products"] }) => {
  const { items, setItem, countAll } = useBasketStore();

  return (
    <>
      {products.length > 0 ? (
        <div className="w-full grid gap-10 xl:rid-cols-3  md:grid-cols-2 sm:grid-cols-2  lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex flex-col shadow-sm hover:shadow-md  duration-200 border rounded-2xl  overflow-hidden"
            >
              <div className="relative min-h-[100px]  w-full aspect-square">
                <Image
                  alt={product.name}
                  fill
                  style={{ objectFit: "cover" }}
                  src={
                    product.image
                      ? `/uploads/${product.image}`
                      : "/imageInput.svg"
                  }
                />
              </div>
              <div className="flex justify-between flex-1 flex-col px-4 py-3 gap-2 w-full ">
                <div className="w-full flex flex-col  ">
                  <div className="flex w-full justify-between items-center">
                    <p className="text-primary font-semibold text-xl">
                      {product.name}
                    </p>
                    <p className="text-gray-600 text-base ">
                      {product.category.name}
                    </p>
                  </div>
                  <p className="text-gray-500 font-light text-sm line-clamp-2">
                    {" "}
                    {product.description}
                  </p>
                </div>
                <Separator className="w-full my-1" />
                <div className={"flex justify-between items-center"}>
                  <p className="text-primary text-lg"> {product.price}$</p>
                  <p> {product.count} left </p>
                </div>

                <div className="flex w-full justify-between">
                  <Link
                    className="p-2 px-10 bg-blue-500 hover:bg-blue-400 duration-200 text-white text-sm font-medium rounded-md"
                    href={`/products/${product._id}`}
                  >
                    {" "}
                    Explore {product.name}
                  </Link>
                  <BasketStoreButtons
                    countAll={countAll}
                    items={items}
                    product={product}
                    setItem={setItem}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="w-full text-center text-black text-2xl font-semibold">
          No Products Found{" "}
        </p>
      )}
    </>
  );
};

export default ProductsList;

export const ProductsListMock = () => {
  return (
    <div className="w-full grid gap-10 xl:rid-cols-3  md:grid-cols-2 sm:grid-cols-2  lg:grid-cols-3">
      {Array(20)
        .fill(null)
        .map((fake, index) => (
          <div
            key={index}
            className="w-full flex border rounded-xl flex-col overflow-hidden gap-4"
          >
            <Skeleton className="w-full rounded-none aspect-square min-h-[100px] " />
            <div className="flex px-2 py-2 flex-col gap-2">
              <div className="flex w-full justify-between">
                <Skeleton className="w-1/3 h-4   " />
                <Skeleton className="w-1/4 h-4   " />
              </div>
              <Skeleton className="w-1/3 h-3" />
              <Separator className="w-full my-1" />
              <div className="w-full flex justify-between">
                <Skeleton className="w-14 h-5" />
                <Skeleton className="w-14 h-5" />
              </div>
              <div className="w-full flex justify-between">
                <Skeleton className="w-1/4 min-w-[150px] rounded-xl h-8" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
