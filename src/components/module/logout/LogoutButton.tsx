"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };
  return (
    <button
      className="bg-red-800 w-fit m-auto text-[#fff] py-2 px-4 rounded-md"
      onClick={handleLogout}
    >
      خروج
    </button>
  );
};

export default LogoutButton;
