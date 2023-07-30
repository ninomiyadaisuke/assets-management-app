import { forwardRef,ReactNode } from "react";

type Props = React.ComponentPropsWithRef<"div"> & {
  children: ReactNode;
};

export const CardWrapper = forwardRef<HTMLDivElement, Props>(
  function CardWrapperBase({ className, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        {...props}
        className="h-auto w-full overflow-hidden rounded-lg bg-card shadow"
      >
        {children}
      </div>
    );
  }
);
