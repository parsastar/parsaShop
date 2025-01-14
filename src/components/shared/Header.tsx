"use client";

import { CircleUser, ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import SignButton from "./buttons/SignButton";
import { useBasketStore } from "@/store/basketStore";
import { Button } from "../ui/button";
export default function Header() {
  const { data } = useSession();
  const pathname = usePathname();
  const { items, setOpen, countAll } = useBasketStore();
  if (pathname.startsWith("/dashboard")) {
    return;
  }
  return (
    <header className="w-full  sticky  top-0 z-10 bg-white shadow-sm  p-5   ">
      <div className="container w-full flex  items-center justify-between   ">
        <div className="flex gap-10 ">
          <h2 className="text-2xl text-black "> MEHDI SHOP </h2>
          <div className="flex gap-5">
            {Pages.map((page, index) => (
              <Link
                className="flex w-full flex-col gap-[1px] items-center group justify-end "
                key={page.name}
                href={`${page.to}`}
              >
                <p
                  className={`text-gray-800 font-light text-lg  ${
                    pathname == page.to && "font-medium text-black"
                  }`}
                >
                  {page.name}
                </p>
                <div
                  className={`h-[2px] ${
                    pathname == page.to ? "w-[80%]" : "w-[0%]"
                  } rounded-full bg-black group-hover:w-[80%] duration-300 `}
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <SignButton />
          <Link
            href={"/payment"}
            className="flex gap-0  p-0 cursor-pointer aspect-square h-full flex-col relative items-center justify-center"
          >
            {countAll > 0 && (
              <p className=" text-base bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full absolute top-[-20%] right-[-25%]">
                {countAll}
              </p>
            )}
            <ShoppingCart size={30} />
          </Link>
          {data?.user && (
            <Link
              href={"/dashboard"}
              className="h-full min-h-[35px] flex justify-center items-center  aspect-square rounded-full "
            >
              <CircleUser size={35} strokeWidth={1.6} />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

const Pages = [
  { name: "Home", to: "/" },
  { name: "Shop", to: "/shop" },
];
