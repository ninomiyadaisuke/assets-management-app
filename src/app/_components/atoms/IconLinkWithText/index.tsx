import {
  ChartBarIcon,
  CurrencyDollarIcon,
  CurrencyYenIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { forwardRef } from "react";

type Props = React.ComponentPropsWithRef<"a"> & {
  href: string;
  text: "日本株" | "外国株" | "¥グラフ" | "＄グラフ" | "¥＄グラフ";
};

export const IconLinkWithText = forwardRef<HTMLAnchorElement, Props>(
  function IconLinkWithTextBase({ href, text = "日本株", ...props }, ref) {
    const className = "h-[24px]";
    const componentTheme = (() => {
      switch (text) {
        case "日本株":
          return <CurrencyYenIcon className={className} />;
        case "外国株":
          return <CurrencyDollarIcon className={className} />;
        case "¥グラフ":
          return <ChartBarIcon className={className} />;
        case "＄グラフ":
          return <ChartBarIcon className={className} />;
        case "¥＄グラフ":
          return <ChartBarIcon className={className} />;
      }
    })();
    return (
      <div className="inline-block">
        <Link
          ref={ref}
          {...props}
          href={href}
          className="flex flex-col text-gray-600 aria-[current]:text-primary"
        >
          {componentTheme}
          <span className="text-xs">{text}</span>
        </Link>
      </div>
    );
  }
);
