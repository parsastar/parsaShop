// types.d.ts
import NextAuth, { User as DefaultUser } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      id: string;
      name: string;
      role: "ADMIN" | "USER";
      pocket: number;
    } & DefaultUser;
  }

  interface User {
    id: string;
    name: string;
    role: "ADMIN" | "USER";
    pocket: number;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    pocket: number;
    role: "ADMIN" | "USER";
    email: string;
  }
}
