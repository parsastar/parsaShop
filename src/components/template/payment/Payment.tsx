"use client";

import ProductList from "./parts/ProductList";
import PaymentForm from "./parts/PaymentForm";
import { useBasketStore } from "@/store/basketStore";
import { useSession } from "next-auth/react";

const Payment = () => {
  const { data } = useSession();
  const { items, countAll, setItem, Restart } = useBasketStore();
  let finalPrice = items.reduce(
    (acc, item) => acc + item.item.price * item.count,
    0
  );
  return (
    <div className="flex py-10 gap-4 min-h-[80svh]  w-full">
      <ProductList
        setItem={setItem}
        countAll={countAll}
        items={items}
        finalPrice={finalPrice}
      />
      <div className="w-1 sticky top-[25%] bg-gray-200 h-4/5 min-h-[70svh] " />
      {data?.user ? (
        <PaymentForm
          sessionUser={data.user}
          finalPrice={finalPrice}
          items={items}
          Restart={Restart}
        />
      ) : (
        <div>
          </div>
      )}
    </div>
  );
};

export default Payment;
