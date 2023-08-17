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
  const marginBottom =
    pathname === "/" || pathname === "/foreign-stocks"
      ? "mt-[50px]"
      : "mt-[10px]";
  return (
    <div className="overflow-auto bg-[#f5f5f5] shadow-lg sm:h-screen sm:w-screen md:h-auto md:max-h-[800px] md:min-h-[800px] md:w-[768px]">
      {(pathname === "/" || pathname === "/foreign-stocks") && <Header />}
      <main className={`relative mb-[100px] ${marginBottom} h-auto w-full`}>
        {children}
      </main>
      {(pathname === "/" || pathname === "/foreign-stocks") && (
        <FloatingButton
          href={pathname === "/" ? "/create/ja" : "/create/fgn"}
          className="fixed sm:bottom-[80px] sm:right-[16px] md:right-[calc((100%_-_768px)/2_+_24px)] md:top-[650px]"
        />
      )}
      <Footer />
    </div>
  );
};
