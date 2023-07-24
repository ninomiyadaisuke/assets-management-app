"use client";
import cx from "classnames";
import { forwardRef } from "react";

type Props = {
  theme?: "primary" | "error" | "outline" | "light";
} & React.ComponentPropsWithoutRef<"button">;

export const Button = forwardRef<HTMLButtonElement, Props>(function ButtonBase(
  { className, theme = "primary", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      {...props}
      className={cx(
        className,
        `inline-block w-full border text-sm text-white font-semibold py-3.5 duration-200 rounded-[30px] disabled:opacity-50
        data-[theme=primary]:bg-button-primary 
        data-[theme=primary]:border-button-primary
        data-[theme=error]:border-red-500
        data-[theme=error]:bg-input-error
        data-[theme=error]:text-red-400
          data-[theme=outline]:bg-transparent
        data-[theme=outline]:text-gray-500
        data-[theme=outline]:border-gray-500
        data-[theme=light]:bg-blue-100
        data-[theme=light]:text-button-primary
        data-[theme=light]:border-blue-100
          data-[theme=light]:font-light
        `
      )}
      data-theme={theme}
    />
  );
});
