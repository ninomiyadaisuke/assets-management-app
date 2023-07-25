"use client";
import cx from "classnames";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { FC } from "react";

import { Footer } from "@/app/_components/layouts/Footer";
import { Header } from "@/app/_components/layouts/Header";

import { FloatingButton } from "../atoms/FloatingButton";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  const pathname = usePathname();
  return (
    <body
      className={cx(
        inter.className,
        "flex justify-center h-full w-full m-0 p-0 bg-[#d6d6d6]"
      )}
    >
      <div className="relative overflow-auto bg-[#f5f5f5] sm:h-screen sm:w-screen md:h-auto md:max-h-[800px] md:min-h-[800px] md:w-[768px]">
        <Header />
        <main className="mt-[50px]">{children}</main>
        {(pathname === "/" || pathname === "/foreign-stocks") && (
          <FloatingButton
            href="/"
            className="absolute sm:bottom-[80px] sm:right-[20px] md:top-[650px]"
          />
        )}
        <Footer />
      </div>
    </body>
  );
};
