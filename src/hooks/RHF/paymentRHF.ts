import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { revalidateMultipleQueries } from "@/utils/revalidateQueries";
import { QueryTags } from "src/constants/ReactQueryTags";
import { PaymentSchema, TPaymentSchema } from "src/types/validators/payment";
import { usePostPaymentQuery } from "../mutation/payment";
import { TBasketStore } from "@/store/basketStore";
import { redirect } from "next/navigation";

export const usePaymentRHF = ({
  user,
  items,
  Restart,
  finalPrice,
}: {
  user?: {
    id: string;
    pocket: number;
  };
  finalPrice: number;
  Restart: TBasketStore["Restart"];
  items: TBasketStore["items"];
}) => {
  const { toast } = useToast();
  const PostPayment = usePostPaymentQuery();
  const {
    register,
    getValues,
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TPaymentSchema>({
    resolver: zodResolver(PaymentSchema),
  });
  const onSubmit: SubmitHandler<TPaymentSchema> = async (data) => {
    if (!user) {
      redirect("/signup");
    }
    try {
      if (!user.pocket || user.pocket < finalPrice) {
        toast({
          duration: 5000,
          title: "Not Enough Credit!",
          description:
            "sorry you dont have enough credit to make this payment for mor Credit Contact Admin",
          variant: "destructive",
        });
        return;
      }
      const { address, description } = data;
      const filteredItems = items.map((item) => ({
        count: item.item.count,
        product: item.item._id,
      }));
      const sendingData = {
        userId: user.id,
        address,
        description: description || "",
        items: filteredItems,
        amount: finalPrice,
      };
      await PostPayment.mutateAsync(
        {
          payment: sendingData,
        },
        {
          onSuccess: async (res) => {
            reset();
            revalidateMultipleQueries({
              queries: [
                QueryTags.getAllProducts,
                QueryTags.getSingleUser,
                user.id,
              ],
            });
            toast({
              duration: 5000,
              title: res.data.message,
              variant: "success",
            });
            Restart();
          },
          onError: async (err: any) => {
            toast({
              title: err?.error || "An error occurred",
              variant: "destructive",
            });
          },
        }
      );
    } catch (e) {
      console.log("category rhf error on submitting is  : ", e);
      // handle your error
    }
  };

  return {
    isSubmitting,
    reset,
    getValues,
    handleSubmit,
    register,
    setValue,
    watch,
    control,
    errors,
    onSubmit,
  };
};
