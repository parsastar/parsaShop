import Shop from "@/components/template/shop/Shop";
import React, { Suspense } from "react";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const queryParams = new URLSearchParams(await searchParams);

  const QueryString = new URLSearchParams({
    page: queryParams.get("page") || "1",
    pageSize: queryParams.get("pageSize") || "20",
    search: queryParams.get("search") || "",
    category: queryParams.get("category") || "",
  }).toString();

  return (
    <div className={` py-0 container max-w-[1300px]`}>
      <Suspense fallback={<p>loading... </p>}>
        <Shop queryString={QueryString} />
      </Suspense>
    </div>
  );
}
