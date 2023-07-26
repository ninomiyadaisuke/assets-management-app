"use client";
import { usePathname } from "next/navigation";
import { FC } from "react";

import { Footer } from "@/app/_components/layouts/Footer";
import { Header } from "@/app/_components/layouts/Header";

import { FloatingButton } from "../atoms/FloatingButton";

type Props = {
  children: React.ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="overflow-auto bg-[#f5f5f5] sm:h-screen sm:w-screen md:h-auto md:max-h-[800px] md:min-h-[800px] md:w-[768px]">
      <Header />
      <main className="relative mt-[50px] h-[3000px]">{children}</main>
      {(pathname === "/" || pathname === "/foreign-stocks") && (
        <FloatingButton
          href="/"
          className="fixed sm:bottom-[80px] sm:right-[24px] md:right-[calc((100%_-_768px)/2_+_24px)] md:top-[650px]"
        />
      )}
      <Footer />
    </div>
  );
};
