import { forwardRef } from "react";

type Props = React.ComponentPropsWithRef<"span"> & {
  theme?: "plus" | "minus" | "default";
  variant?: "small" | "medium" | "large" | "extraLarge";
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
      <div className="flex">
        <span
          ref={ref}
          {...props}
          className={`
          data-[variant=extraLarge]:text-2xl
          data-[variant=large]:text-xl
          data-[variant=medium]:text-base
          data-[variant=small]:text-sm
          data-[vold=light]:font-light
          data-[vold=medium]:font-medium
          data-[theme=default]:text-num-def
          data-[theme=minus]:text-num-minus
          data-[theme=plus]:text-num-plus
          data-[theme=plus]:before:content-['+']
        `}
          data-theme={theme}
          data-variant={variant}
          data-vold={vold}
        >
          {children?.toLocaleString()}
        </span>
        <p
          className="
          flex items-center data-[variant=large]:text-lg
          data-[variant=medium]:text-sm
          data-[variant=small]:text-xs
          data-[vold=light]:font-light
          data-[vold=medium]:font-medium
          data-[theme=default]:text-num-def
          data-[theme=minus]:text-num-minus
          data-[theme=plus]:text-num-plus"
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
