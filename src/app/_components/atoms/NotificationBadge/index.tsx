"use client";

import { BellIcon } from "@heroicons/react/24/outline";
import { forwardRef } from "react";

type Props = React.ComponentPropsWithRef<"button"> & {
  count?: number;
};

export const NotificationBadge = forwardRef<HTMLButtonElement, Props>(
  function NotificationBadgeBase({ className, count, ...props }, ref) {
    return (
      <button className="relative" ref={ref} {...props}>
        <BellIcon className="h-7 text-white" />
        {count && (
          <span className="absolute right-[-6px] top-[-5px] flex  items-center justify-center rounded-full bg-red-600 px-1 py-[2px] text-[10px] text-white">
            {count}
          </span>
        )}
      </button>
    );
  }
);
