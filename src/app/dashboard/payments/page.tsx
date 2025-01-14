import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Payments from "@/components/template/dashboard/payments/Payments";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import React from "react";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (user?.role == "USER") {
    redirect(`/dashboard/users/${user.id}`);
  }
  return <Payments />;
};

export default Page;
