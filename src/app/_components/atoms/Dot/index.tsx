import cx from "classnames";
import { forwardRef } from "react";

import { Color } from "@/libs/colors";

type Props = React.ComponentPropsWithRef<"span"> & {
  color: Color;
};

export const Dot = forwardRef<HTMLSpanElement, Props>(function DotBase(
  { color, className, ...props },
  ref
) {
  return (
    <span
      ref={ref}
      {...props}
      className={cx(className, `inline-block h-3 w-3 rounded-full bg-${color}`)}
    />
  );
});
