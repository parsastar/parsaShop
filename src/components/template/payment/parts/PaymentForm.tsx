import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { usePaymentRHF } from "@/hooks/RHF/paymentRHF";
import { useGetUserByIdQuery } from "@/hooks/queries/users";
import { TBasketStore } from "@/store/basketStore";
import { LoaderCircle } from "lucide-react";
import React from "react";

type TInput = {
  id: "address" | "description";
  title: string;
  placeHolder: string;
};

const Inputs = [
  {
    title: "Address : ",
    id: "address",
    placeHolder: "enter you're full  address",
  },
  {
    title: "Description  : ",
    id: "description",
    placeHolder: "any description for you're purchase  ? ",
  },
] as TInput[];
const PaymentForm = ({
  sessionUser,
  Restart,
  items,
  finalPrice,
}: {
  sessionUser: {
    email: string;
    id: string;
    name: string;
    role: string;
    pocket: number;
  };
  finalPrice: number;
  items: TBasketStore["items"];
  Restart: TBasketStore["Restart"];
}) => {
  const { data, status } = useGetUserByIdQuery({ id: sessionUser.id });

  const { handleSubmit, onSubmit, register, errors, isSubmitting } =
    usePaymentRHF({
      items,
      finalPrice,
      Restart,
      user: data
        ? { id: data.user._id, pocket: data.user.pocket || 0 }
        : undefined,
    });
  return (
    <div className="w-full sticky top-0 flex flex-col gap-2">
      <div className="flex justify-between w-full">
        <p className="text-primary text-3xl font-semibold">BUY NOW</p>
        <p className="text-primary text-xl">
          Your Credit: {data?.user.pocket || 0} $
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mt-5 flex flex-col gap-3 "
      >
        {Inputs.map((input) => (
          <div key={input.id} className="flex w-full flex-col gap-2 ">
            <p className="text-xl text-primary font-semibold">{input.title} </p>
            <Textarea
              {...register(input.id)}
              className={
                input.id == "address" ? "min-h-[200px]" : "min-h-[100px]"
              }
              placeholder={input.placeHolder}
            />
            {errors[input.id] && (
              <p className="text-sm text-destructive">
                {errors[input.id]?.message}
              </p>
            )}
          </div>
        ))}
        <Button
          className="bg-green-500 mt-5 py-6 hover:bg-green-400"
          type="submit"
        >
          {" "}
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2 ">
              <p> Purchasing </p>
              <LoaderCircle className="animate-spin" />
            </div>
          ) : (
            <p> Purchase Now </p>
          )}{" "}
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
