import Link from "next/link";
import React from "react";
import { TGetPaymentsByUserID } from "src/types/api/payments";

const UserPayments = ({
  payments,
}: {
  payments: TGetPaymentsByUserID["data"];
}) => {
  return (
    <div className="w-full flex flex-col min-h-[500px] p-5">
      <div className="flex w-full justify-between ">
        <p className="text-primary text-3xl font-semibold "> Payments</p>
        <p className="text-primary text-3xl font-semibold ">
          {" "}
          Total : {payments.length}
        </p>
      </div>
      <div className="flex flex-col gap-5 my-5">
        {payments.length > 0 &&
          payments.map((payment, index) => (
            <Link
              key={payment._id}
              href={`/dashboard/payments/${payment._id}`}
              className="flex border items-center rounded-2xl justify-between p-6 hover:shadow-sm duration-200"
            >
              <div className="flex flex-col ga-2">
                <div className="flex items-center gap-2">
                  <p className="text-lg text-primary"> Address : </p>
                  <p className=" text-sm text-gray-500 line-clamp-2">
                    {" "}
                    {payment.address}{" "}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-lg text-primary"> Description : </p>
                  <p className=" text-sm text-gray-500 line-clamp-2">
                    {" "}
                    {payment.description}{" "}
                  </p>
                </div>
              </div>
              <div className="flex items-end flex-col ga-2">
                <p className="text-base font-semibold text-primary">
                  {new Date(payment.createdAt)
                    .toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                    .split("/")
                    .reverse()
                    .join("/")}{" "}
                </p>
                <p className="text-2xl font-semibold text-primary">
                  {" "}
                  {payment.amount} $
                </p>
                <p className="text-lg font-semibold  text-primary">
                  {" "}
                  Total Of {payment.items.length} Products
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default UserPayments;
