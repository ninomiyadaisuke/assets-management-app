import {
  ArrowPathIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/20/solid";
import { forwardRef } from "react";

type Props = React.ComponentPropsWithRef<"button"> & {
  theme?: "logout" | "update";
};

export const IconButton = forwardRef<HTMLButtonElement, Props>(
  function IconButtonBase({ className, theme = "logout", ...props }, ref) {
    const componentTheme = (() => {
      switch (theme) {
        case "logout":
          return <ArrowRightOnRectangleIcon className="h-6" />;
        case "update":
          return (
            <div className="rotate-[-90deg]">
              <ArrowPathIcon className="h-6" />
            </div>
          );
      }
    })();

    return (
      <button ref={ref} {...props} className="bg-primary text-white">
        {componentTheme}
      </button>
    );
  }
);
