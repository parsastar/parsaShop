import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Rubik } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/providers/NextAuthProviders";
import Header from "src/components/shared/Header";
import Providers from "./provider";

const rubik = Rubik({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rubik ",
});

export const metadata: Metadata = {
  title: "MEHDI SHOP",
  description: "welcome to mehdi's shop ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <NextAuthProvider>
        <body className={`${rubik.variable}`}>
          <Header />
          <Providers>{children}</Providers>
          <Toaster />
        </body>
      </NextAuthProvider>
    </html>
  );
}
