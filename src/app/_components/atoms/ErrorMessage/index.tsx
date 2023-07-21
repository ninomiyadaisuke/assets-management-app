import cx from "classnames";
import { forwardRef } from "react";

type Props = React.ComponentPropsWithRef<"p">;

export const ErrorMessage = forwardRef<HTMLParagraphElement, Props>(
  function ErrorMessageBase({ className, ...props }, ref) {
    return (
      <p
        {...props}
        role="alert"
        aria-live="off"
        ref={ref}
        className={cx(className, "text-red-500 text-xs")}
      />
    );
  }
);
