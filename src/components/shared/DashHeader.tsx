"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { useDashModal } from "src/store/dashModalStore";

export default function DashHeader() {
  const { data } = useSession();
  const { setStep } = useDashModal();
  const Pages = [
    {
      name: "Products",
      to: "/dashboard/products",
      button: {
        value: "Create New Product",
        function: () =>
          setStep({ newStep: { value: "product", selected: undefined } }),
      },
    },
    {
      name: "Users",
      to: "/dashboard/users",
    },
    {
      name: "Profile",
      to: "/dashboard/profile",
    },
    {
      name: "Categories",
      to: "/dashboard/categories",
      button: {
        value: "Create New Category",
        function: () =>
          setStep({ newStep: { value: "category", selected: undefined } }),
      },
    },
    { name: "Dashboard", to: "/dashboard" },
    { name: "Payments", to: "/dashboard/payments" },
  ];
  const pathname = usePathname();
  return (
    <>
      {Pages.map((page) => {
        if (page.to == "/dashboard" && pathname == "/dashboard") {
          return (
            <div
              key={page.to}
              className="flex justify-between items-center  w-full"
            >
              <p className="text-lg">{page.name}</p>
              {page.button && data?.user?.role == "ADMIN" && (
                <Button
                  type="button"
                  onClick={page.button.function}
                  className="bg-blue-400 hover:bg-blue-500"
                  size="lg"
                >
                  {page.button.value}
                </Button>
              )}
            </div>
          );
        }
        if (pathname.startsWith(page.to) && page.to !== "/dashboard") {
          return (
            <div
              key={page.to}
              className="flex justify-between items-center  w-full"
            >
              <p className="text-lg">{page.name}</p>
              {page.button && data?.user?.role == "ADMIN" && (
                <Button
                  type="button"
                  onClick={page.button.function}
                  className="bg-blue-400 hover:bg-blue-500"
                  size="lg"
                >
                  {page.button.value}
                </Button>
              )}
            </div>
          );
        }
      })}
    </>
  );
}
