"use client";
import React from "react";
import { PaginationList, PaginationMock } from "@/components/shared/Pagination";
import { useGetAllProductsQuery } from "@/hooks/queries/product";
import ProductsList, { ProductsListMock } from "./parts/ProductsList";
import ProductFilters from "../dashboard/products/parts/ProductFilters";

export default function Shop({ queryString }: { queryString: string }) {
  const { data, status } = useGetAllProductsQuery({
    queryParams: queryString,
  });
  console.log("rendering ")
  return (
    <div className="flex  flex-col py-10 gap-10">
      <ProductFilters
        totalProducts={data?.pagination.totalProducts.toString()}
        searchParams={queryString}
      />
      <div className="w-full min-h-[400px]">
        {status == "error" && <p>There Is An Error While Fetching Products</p>}
        {status == "pending" ? (
          <ProductsListMock />
        ) : data && data.products.length > 0 ? (
          <ProductsList products={data.products} />
        ) : (
          <p className="w-full text-center text-primary text-3xl font-semibold my-[200px] ">
            No Products Found
          </p>
        )}
      </div>
      {status === "success" ? (
        <PaginationList
          currentPage={data.pagination.currentPage}
          totalPages={data.pagination.totalPages}
        />
      ) : (
        <PaginationMock />
      )}
    </div>
  );
}
