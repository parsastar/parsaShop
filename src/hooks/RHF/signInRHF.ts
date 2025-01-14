import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SignInSchema } from "src/types/validators/SignIn";
import { signIn } from "next-auth/react";

export const useSignInRHF = () => {
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
  } = useForm<SignInSchema>({ resolver: zodResolver(SignInSchema) });
  const onSubmit: SubmitHandler<SignInSchema> = async (data) => {
    const { email, password } = data;
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      toast.error(res.error, {
        duration: 4000,
        position: "top-right",
        style: {
          color: "#fff",
          background: "#A50203",
        },
      });
    } else {
      router.push("/dashboard");
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
