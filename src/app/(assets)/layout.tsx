import "@/app/globals.css";

import cx from "classnames";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Layout } from "@/app/_components/layouts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cx(
          inter.className,
          "flex justify-center h-full w-full m-0 p-0 bg-[#d6d6d6]"
        )}
      >
        <Layout>{children}</Layout>
        {modal}
      </body>
    </html>
  );
}
