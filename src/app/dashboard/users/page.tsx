import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import DashBoardUsers from "@/components/template/dashboard/users/DashBoardUsers";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  console.log("user : ", user);
  if (user?.role == "USER") {
    redirect(`/dashboard/users/${user.id}`);
  }
  return <DashBoardUsers />;
}
