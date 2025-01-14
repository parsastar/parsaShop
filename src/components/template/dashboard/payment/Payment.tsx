import { useGetPaymentById } from "@/hooks/queries/payments";
import { useSession } from "next-auth/react";
import React from "react";
import PaymentList from "./parts/PaymentList";
import { Separator } from "@/components/ui/separator";

const Payment = ({ paymentId }: { paymentId: string | number }) => {
  const { data } = useSession();
  const role = data?.user.role;
  const { data: payment, status } = useGetPaymentById({ id: paymentId });

  return (
    <div className="flex my-5 flex-col w-full gap-10">
      {status == "success" && (
        <>
          <div className="flex flex-1  gap-10 flex-col">
            {data?.user.role == "ADMIN" && (
              <div className="flex w-full justify-between">
                <p className="text-2xl text-primary font-semibold">
                  Username : {payment?.user.name}
                </p>
                <p className="text-lg font-semibold text-primary">
                  Purchase Date :{" "}
                  {new Date(payment.createdAt)
                    .toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                    .split("/")
                    .reverse()
                    .join("/")}
                </p>
              </div>
            )}
            <div className="flex justify-between w-full ">
              <div className="flex w-full flex-col gap-2">
                <p className="text-primary font-semibold text-xl ">
                  Description :
                </p>
                <p className="text-gray-500 text-lg ">{payment?.description}</p>

                <p className="text-primary mt-5  font-semibold text-lg ">
                  Price : {payment?.amount} $
                </p>
              </div>
              <div className="flex  w-full flex-col gap-2">
                <p className="text-primary font-semibold text-xl ">Address :</p>
                <p className="text-gray-500 text-lg ">{payment?.address}</p>
                <p className="text-primary mt-5 font-semibold text-lg ">
                  Items Count : {payment?.items.length}
                </p>
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex-1">
            <PaymentList items={payment?.items} />
          </div>
        </>
      )}
    </div>
  );
};

export default Payment;
