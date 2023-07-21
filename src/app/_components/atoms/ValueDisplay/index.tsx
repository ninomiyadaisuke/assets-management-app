import { forwardRef } from "react";

type Props = React.ComponentPropsWithRef<"span"> & {
  theme?: "plus" | "minus" | "default";
  variant?: "small" | "medium" | "large";
  vold?: "light" | "medium";
  unit?: "円" | "%" | "株" | "＄";
};

export const ValueDisplay = forwardRef<HTMLSpanElement, Props>(
  function ValueDisplayBase(
    {
      theme = "default",
      variant = "medium",
      vold = "light",
      children,
      unit = "円",
      ...props
    },
    ref
  ) {
    return (
      <div className="flex gap-1">
        <span
          ref={ref}
          {...props}
          className={`
        data-[theme=default]:text-num-def
        data-[theme=plus]:text-num-plus
        data-[theme=minus]:text-num-minus
          data-[theme=plus]:before:content-['+']
          data-[variant=small]:text-sm
          data-[variant=medium]:text-base
          data-[variant=large]:text-xl
          data-[vold=medium]:font-medium
          data-[vold=light]:font-light
        `}
          data-theme={theme}
          data-variant={variant}
          data-vold={vold}
        >
          {children}
        </span>
        <p
          className="
          flex items-center data-[theme=default]:text-num-def
        data-[theme=plus]:text-num-plus
        data-[theme=minus]:text-num-minus
          data-[variant=small]:text-xs
          data-[variant=medium]:text-sm
          data-[variant=large]:text-base
          data-[vold=medium]:font-medium
          data-[vold=light]:font-light"
          data-theme={theme}
          data-variant={variant}
          data-vold={vold}
        >
          {unit}
        </p>
      </div>
    );
  }
);
