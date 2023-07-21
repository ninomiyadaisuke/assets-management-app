import { forwardRef } from "react";

type Props = React.ComponentPropsWithRef<"p">;

export const ErrorMessage = forwardRef<HTMLParagraphElement, Props>(
  function ErrorMessageBase({ ...props }, ref) {
    return (
      <p
        {...props}
        role="alert"
        aria-live="off"
        ref={ref}
        className="text-red-500 text-xs"
      />
    );
  }
);
