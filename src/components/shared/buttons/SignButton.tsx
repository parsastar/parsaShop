"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignButton() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleClick = () => {
    if (session) {
      signOut();
    } else {
      router.push("/signin");
    }
  };

  return (
    <Button variant={session ? "destructive" : "default"} onClick={handleClick}>
      {session ? "LOG OUT" : "SIGN IN"}
    </Button>
  );
}
