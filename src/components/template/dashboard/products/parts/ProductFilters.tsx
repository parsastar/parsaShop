"use client";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import React, { useState } from "react";
import { ProductSelectedCat } from "./ProductSelectCat";
import { Button } from "@/components/ui/button";

export default function ProductFilters({
  totalProducts,
  searchParams,
}: {
  totalProducts?: string;
  searchParams: string;
}) {
  const queryParams = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();
  const [search, setSearch] = useState<string>(queryParams.get("search") || "");
  const handleSubmit = React.useCallback(
    ({
      e,
      category,
    }: {
      category?: string;
      e?: React.FormEvent<HTMLFormElement>;
    }) => {
      e?.preventDefault();
      queryParams.set("search", search);
      queryParams.set("category", category || "");
      replace(`${pathname}?${queryParams.toString()}`, { scroll: false });
    },
    [search, pathname, replace]
  );

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex flex-col gap-5 ">
      <form
        className="w-full gap-10 flex"
        onSubmit={(e) => handleSubmit({ e })}
      >
        <div className="w-full relative group">
          <Button
            type="submit"
            className="absolute p-0 px-2 group-focus-within:text-gray-600 left-3 text-gray-300 top-1/2 translate-y-[-50%]"
            variant={"none"}
          >
            <SearchIcon />
          </Button>
          <Input
            value={search}
            onChange={searchHandler}
            placeholder="Search for Product Name..."
            style={{ transition: ".2s" }}
            className="py-6 indent-10 focus-within:indent-12 duration-200 rounded-full"
          />
        </div>
        <div>
          <ProductSelectedCat
            value={queryParams.get("category") || ""}
            handleSubmit={handleSubmit}
          />
        </div>
      </form>
      <div className="w-full px-5 flex justify-between">
        <div className="text-3xl font-semibold">
          {queryParams.get("search") && (
            <div className="flex gap-2">
              <p>Results for</p>
              <p className="text-primary">{queryParams.get("search")}</p>
            </div>
          )}
        </div>
        {totalProducts && (
          <div className="text-3xl font-semibold">
            <div className="flex gap-2">
              <p className="text-primary">{totalProducts}</p>
              <p>Products</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
