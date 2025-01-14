"use client";
import React from "react";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import { Input } from "../ui/input";
import { useSignUpRHF } from "src/hooks/RHF/signUpRHF";

const SignupPage = () => {
  const { handleSubmit, onSubmit, register, errors, isSubmitting } =
    useSignUpRHF();

  return (
    <div className="w-1/2 md:w-5/6 sm:w-full h-[calc(100vh-117px)] mx-auto flex items-center justify-center flex-col gap-10">
      <Toaster />
      <h3 className="font-semibold text-[2rem]">SIGN UP </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-5/6 sm:w-full  gap-7 p-5 border-solid border-2 border-white-700 rounded-lg shadow-lg text-[1rem]"
      >
        <div className="flex flex-col gap-3">
          <label htmlFor="name">Name</label>
          <div>
            <Input
              placeholder="Name"
              type="text"
              id="name"
              {...register("name")}
            />
            <p className="text-xs italic text-red-500 my-2  border-transparent">
              {errors.name && errors.name?.message}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="email">Email</label>
          <div>
            <Input
              placeholder="Email"
              type="text"
              id="email"
              {...register("email")}
            />
            <p className="text-xs italic text-red-500 my-2  border-transparent">
              {errors.email && errors.email?.message}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="phone">Phone</label>
          <div>
            <Input
              placeholder="Phone"
              type="text"
              id="phone"
              {...register("phone")}
            />
            <p className="text-xs italic text-red-500 my-2  border-transparent">
              {errors.phone && errors.phone?.message}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="password">Password </label>
          <div>
            <Input id="password" type="password" {...register("password")} />
            <p className="text-xs italic text-red-500 my-2  border-transparent">
              {errors.password && errors.password?.message}
            </p>
          </div>
        </div>

        <Button type="submit">
          {isSubmitting ? <LoaderCircle /> : "SIGN UP"}
        </Button>
      </form>
      <div>
        <span className="text-gray-700">Alreay have an Account ? </span>
        <Link href={"/signin"} className=" text-sky-500 mr-2">
          LOG IN
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
