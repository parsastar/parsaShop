import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashModal } from "@/store/dashModalStore";
import { useSession } from "next-auth/react";
import { TUserWithID } from "src/types/api/users";

const UserProfile = ({ user }: { user: TUserWithID }) => {
  const { data } = useSession();
  const { setStep } = useDashModal();

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
          <Button
            onClick={() =>
              setStep({ newStep: { value: "pocket", selected: user } })
            }
            className="p-2"
          >
            ADD CREDIT{" "}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

export const UserProfileMock = () => {
  return (
    <div className="flex w-full justify-between rounded-3xl bg-[rgb(250_250_250)] shadow-sm p-10">
      <div className="flex gap-2">
        <Skeleton className="rounded-full text-white  w-20 aspect-square flex justify-center items-center" />
        <div className="flex flex-col gap-2 justify-center">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
      <div className="flex flex-col gap-2 items-end justify-center">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-20" />
      </div>
    </div>
  );
};
