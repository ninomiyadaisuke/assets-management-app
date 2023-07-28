import Link from "next/link";
import { forwardRef } from "react";

type Props = Omit<React.ComponentPropsWithRef<"a">, "href"> & { href: string };

export const ToUpdateLink = forwardRef<HTMLAnchorElement, Props>(
  function ToUpdateLinkBase({ href, ...props }, ref) {
    return (
      <Link
        ref={ref}
        href={href}
        {...props}
        className="relative block w-full text-base font-semibold text-card-link after:absolute after:right-[8px] after:top-[5.5px] after:inline-block after:h-2 after:w-2 after:rotate-45 after:border-r-2 after:border-t-2 after:border-card-link after:content-['']"
      />
    );
  }
);
