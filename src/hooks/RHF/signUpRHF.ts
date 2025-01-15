import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpSchema } from "src/types/validators/SignUp";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

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
    try {
      const { email, password, phone, name } = data;
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password, phoneNumber: phone, name }),
        headers: { "Content-type": "application/json" },
      });
      const backData = await res.json();
  
      if (backData.status == 200) {
        try {
          const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
          });
          router.push("/dashboard");
        } catch (error) {
          toast.error("cant sign in", {
            duration: 4000,
            position: "top-right",
            style: {
              color: "#fff",
              background: "#A50203",
            },
          });
        }
      } else {
        toast.error(backData.error, {
          duration: 4000,
          position: "top-right",
          style: {
            color: "#fff",
            background: "#A50203",
          },
        });
      }
    } catch (error) {
      toast.error("cant sign in", {
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
