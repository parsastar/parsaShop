import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          await connectDB();
        } catch (error) {
          throw new Error("A server error occurred");
        }
        if (!email || !password)
          throw new Error("Please enter valid information");
        // check user exist
        const user = await User.findOne({ email });
        if (!user) throw new Error("no account with such email found ");

        // verify password checking
        const isValid = await verifyPassword(password, user.password);
        if (!isValid) throw new Error("Email or password is incorrect.");
        const res = {
          email,
          id: user._id,
          pocket: user.pocket,
          name: user.name,
          role: user.role,
        };

        return res;
      },
      credentials: {},
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add role to the token if user exists (initial login)
      if (user) {
        token.id = user.id;
        token.pocket = user.pocket;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Add role to the session
      session.user.id = token.id;
      session.user.pocket = token.pocket;
      session.user.role = token.role;
      // Remove image field if you don't want it
      return session;
    },
  },
};
