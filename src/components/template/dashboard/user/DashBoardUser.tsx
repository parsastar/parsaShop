"use client";
import { useGetUserByIdQuery } from "@/hooks/queries/users";
import UserProfile, { UserProfileMock } from "./UserProfile";
import { useGetPaymentsByUserId } from "@/hooks/queries/payments";
import UserPayments from "./UserPayments";

const DashBoardUser = ({ userId }: { userId: string }) => {
  const { data, status } = useGetUserByIdQuery({ id: userId });
  const { data: payments, status: payStatus } = useGetPaymentsByUserId({
    id: userId,
  });
  console.log("payments : ", payments);
  return (
    <div className="flex gap-5 my-5 flex-col min-h-[500px]">
      {status == "success" ? (
        <UserProfile user={data.user} />
      ) : (
        <UserProfileMock />
      )}
      {payStatus == "success" ? (
        <UserPayments payments={payments.data} />
      ) : (
        <UserProfileMock />
      )}
    </div>
  );
};

export default DashBoardUser;
