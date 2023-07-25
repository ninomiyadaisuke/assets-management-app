import "@/app/globals.css";

import cx from "classnames";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Layout } from "@/app/_components/layouts";

import { Footer } from "../_components/layouts/Footer";
import { Header } from "../_components/layouts/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Layout>{children}</Layout>
    </html>
  );
}
