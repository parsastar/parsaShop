import Shop from "@/components/template/shop/Shop";
import React from "react";

export default function page({searchParams} : {searchParams : any}) {
  console.log("search params in server compoennt is : " , searchParams)
  return (
    <div className={` py-0 container max-w-[1300px]`}>
      <Shop />
    </div>
  );
}
