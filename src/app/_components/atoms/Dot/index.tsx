import { forwardRef } from "react";

import { Color } from "@/libs/data";

type Props = React.ComponentPropsWithRef<"span"> & {
  color: Color;
};

export const Dot = forwardRef<HTMLSpanElement, Props>(function DotBase(
  { color, ...props },
  ref
) {
  return (
    <span
      ref={ref}
      {...props}
      className={`inline-block h-3 w-3 rounded-full ${color}`}
    />
  );
});
