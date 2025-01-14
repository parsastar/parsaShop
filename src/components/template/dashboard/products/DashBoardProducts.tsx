"use client";
import { useGetAllProductsQuery } from "@/hooks/queries/product";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import ProductList, { ProductListMock } from "./parts/ProductList";
import ProductFilters from "./parts/ProductFilters";
import { PaginationList, PaginationMock } from "@/components/shared/Pagination";

export default function DashBoardProducts() {
  const searchParams = useSearchParams();
  const queryParams = new URLSearchParams({
    page: searchParams.get("page") || "1",
    pageSize: searchParams.get("pageSize") || "20",
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
  });
  const { data, refetch, status } = useGetAllProductsQuery({
    queryParams: queryParams.toString(),
  });
  console.log("search params is : " , searchParams)

  useEffect(() => {
    console.log("search params is : " , searchParams)
    refetch();
  }, [searchParams]);

  return (
    <div className="flex  flex-col py-10 gap-10">
      <ProductFilters
        totalProducts={data?.pagination.totalProducts.toString()}
        searchParams={searchParams.toString()}
      />
      {status == "error" && <p>There Is An Error While Fetching Products</p>}
      {status == "pending" ? (
        <ProductListMock />
      ) : data && data.products.length > 0 ? (
        <ProductList products={data.products} />
      ) : (
        <p className="w-full text-center text-primary text-3xl font-semibold my-[200px] ">
          No Product Found
        </p>
      )}
      {status == "success" ? (
        <PaginationList
          currentPage={data?.pagination.currentPage}
          totalPages={data?.pagination.totalPages}
        />
      ) : (
        <PaginationMock />
      )}
    </div>
  );
}
