"use client";
import Payment from "@/components/template/dashboard/payment/Payment";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const paymentId = params.id;
  return (
    <div>
      <Payment paymentId={paymentId} />
    </div>
  );
};

export default Page;
