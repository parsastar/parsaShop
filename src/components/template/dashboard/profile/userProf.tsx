"use client";
import { useGetUserByIdQuery } from "@/hooks/queries/users";
import { useGetPaymentsByUserId } from "@/hooks/queries/payments";
import UserPayments from "../user/UserPayments";
import { UserProfileMock } from "../user/UserProfile";
import { Button } from "@/components/ui/button";
import { TUserWithID } from "src/types/api/users";

const UserProf = ({ userId }: { userId: string }) => {
  const { data, status } = useGetUserByIdQuery({ id: userId });
  const { data: payments, status: payStatus } = useGetPaymentsByUserId({
    id: userId,
  });
  return (
    <div className="flex gap-5 my-5 flex-col min-h-[500px]">
      {status == "success" ? (
        <UserProfile user={data.user} />
      ) : (
        <UserProfileMock />
      )}
      {payStatus == "success" && <UserPayments payments={payments.data} />}
      {payStatus == "pending" && <p> loading payments </p>}
      {payStatus == "error" && <p> no payment has done yet </p>}
    </div>
  );
};

export default UserProf;

const UserProfile = ({ user }: { user: TUserWithID }) => {
  return (
    <div className="flex w-full justify-between rounded-3xl bg-[rgb(250_250_250)] shadow-sm p-10">
      <div className="flex gap-2">
        <div className="rounded-full aspect-square text-white bg-gray-400 p-6 flex justify-center items-center">
          {user.name.substring(0, 2).toUpperCase()}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-primary text-xl font-semibold">{user.name}</p>
          <p className="text-gray-500 text-base">{user.email}</p>
          <p className="text-black text-base">{user.phoneNumber}</p>
        </div>
      </div>

      <div className="flex flex-col items-end justify-center">
        <p className="text-primary text-base font-semibold">
          {new Date(user.createdAt)
            .toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
            .split("/")
            .reverse()
            .join("/")}
        </p>
        <div className="flex gap-2 items-center justify-start">
          <p className="text-gray-700 text-base">{user.pocket || 0} $</p>
        </div>
      </div>
    </div>
  );
};
