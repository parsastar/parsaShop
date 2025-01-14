import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpSchema } from "src/types/validators/SignUp";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const useSignUpRHF = () => {
  const router = useRouter();
  const {
    register,
    getValues,
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({ resolver: zodResolver(SignUpSchema) });
  const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
    const { email, password, phone, name } = data;
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, phoneNumber: phone, name }),
      headers: { "Content-type": "application/json" },
    });
    // toast.success
    const backData = await res.json();

    if (backData.status === 200) {
      router.push("/dashboard");
    }
    if (backData.status !== 200) {
      toast.error(backData.error, {
        duration: 4000,
        position: "top-right",
        style: {
          color: "#fff",
          background: "#A50203",
        },
      });
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
