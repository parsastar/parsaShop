import React from "react";
import UserProf from "./userProf";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Profile = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signup");
  }

  return (
    <div className="">
      <UserProf userId={session?.user.id} />
    </div>
  );
};

export default Profile;
