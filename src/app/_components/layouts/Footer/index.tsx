"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnchorHTMLAttributes, FC } from "react";
import { text } from "stream/consumers";

import { IconLinkWithText } from "@/app/_components/atoms/IconLinkWithText";

function isCurrent(flag: boolean): AnchorHTMLAttributes<HTMLAnchorElement> {
  if (!flag) return {};
  return { "aria-current": "page" };
}

const linkData = [
  { text: "日本株", link: "/" },
  { text: "外国株", link: "/foreign-stocks" },
  { text: "¥グラフ", link: "/yen-graph" },
  { text: "＄グラフ", link: "/dollar-graph" },
];

export const Footer: FC = () => {
  const pathname = usePathname();
  return (
    <footer className="flex h-[50px] w-full border-y border-solid border-gray-300 bg-[#f8f9fb] sm:absolute sm:bottom-0 md:top-[750px] md:w-[768px]">
      <ul className="flex w-full justify-between px-4 py-2">
        {linkData.map((data) => (
          <li key={data.text}>
            <IconLinkWithText
              href={data.link}
              text={data.text as "日本株" | "外国株" | "¥グラフ" | "＄グラフ"}
              {...isCurrent(pathname === data.link)}
            />
          </li>
        ))}
      </ul>
    </footer>
  );
};
