"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import cx from "classnames";
import { forwardRef } from "react";

import { Spinner } from "../Spinner";

type Props = React.ComponentPropsWithRef<"button">;

// test comment
export const SearchButton = forwardRef<HTMLButtonElement, Props>(
  function SearchButtonBase({ className, disabled = false, ...props }, ref) {
    return (
      <button
        ref={ref}
        {...props}
        disabled={disabled}
        className={cx(
          className,
          "inline-block py-0 px-4 h-[38px] bg-primary rounded-r duration-200 disabled:opacity-50"
        )}
      >
        {disabled ? (
          <Spinner variant="small" />
        ) : (
          <MagnifyingGlassIcon className="h-6 w-6 text-white" />
        )}
      </button>
    );
  }
);
