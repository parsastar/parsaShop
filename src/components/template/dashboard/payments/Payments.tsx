"use client";
import React from "react";
import PaymentsList from "./PaymentsList";
import { useSearchParams } from "next/navigation";
import { useGetAllPayments } from "@/hooks/queries/payments";
import { PaginationList, PaginationMock } from "@/components/shared/Pagination";

const Payments = ({}) => {
  const searchParams = useSearchParams();
  const queryParams = new URLSearchParams({
    page: searchParams.get("page") || "1",
    pageSize: searchParams.get("pageSize") || "20",
  });

  const { data, status } = useGetAllPayments({
    queryParams: queryParams.toString(),
  });
  console.log("data : ", data);
  return (
    <div className="flex flex-col gap-5">
      {status == "success" && (
        <>
          <div className="flex">
            <PaymentsList payments={data.payments} />
          </div>
          <PaginationList
            totalPages={data.pagination.totalPages}
            currentPage={data.pagination.currentPage}
          />{" "}
        </>
      )}
      {status == "pending" && (
        <>
          <div className="flex">{/* <PaymentsList payments={da} /> */}</div>
          <PaginationMock />
        </>
      )}
    </div>
  );
};

export default Payments;
