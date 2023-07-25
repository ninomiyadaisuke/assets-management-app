"use client";
import { PlusIcon } from "@heroicons/react/24/solid";
import cx from "classnames";
import Link from "next/link";
import { forwardRef } from "react";

type Props = React.ComponentPropsWithRef<"a"> & {
  href: string;
};

export const FloatingButton = forwardRef<HTMLAnchorElement, Props>(
  function FloatingButtonBase({ className, href, ...props }, ref) {
    return (
      <Link
        href={href}
        ref={ref}
        {...props}
        className={cx(
          className,
          "flex justify-center items-center w-[60px] h-[60px] bg-primary rounded-full text-white"
        )}
      >
        <PlusIcon className="h-8" />
      </Link>
    );
  }
);
