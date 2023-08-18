"use client";
import cx from "classnames";
import { forwardRef, useId } from "react";

type Props = Omit<React.ComponentPropsWithRef<"input">, "type" | "id"> & {
  label: string;
};

export const RadioBox = forwardRef<HTMLInputElement, Props>(
  function RadioBoxBase({ label, className, ...props }, ref) {
    const radioId = useId();
    return (
      <>
        <input
          className={cx(className, `absolute sr-only peer`)}
          type="radio"
          ref={ref}
          value={label}
          {...props}
          id={radioId}
        />
        <label
          tabIndex={0}
          className={`inline-block rounded px-2 py-1 text-xs transition-all focus:bg-slate-100 peer-checked:bg-[#E615CD] peer-checked:text-white`}
          htmlFor={radioId}
        >
          {label}
        </label>
      </>
    );
  }
);
