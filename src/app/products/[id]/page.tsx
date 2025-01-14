import Product from "@/components/template/product/Product";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="max-w-[1300px] mx-auto">
      <Product productId={params.id} />
    </div>
  );
};

export default Page;
