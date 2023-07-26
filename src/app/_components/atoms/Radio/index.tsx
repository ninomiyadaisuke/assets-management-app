"use client";
import * as RadioGroup from "@radix-ui/react-radio-group";
import React, { forwardRef, useId } from "react";

type Props = { value: string; label: string } & Omit<
  React.ComponentPropsWithoutRef<"button">,
  "value" | "id"
>;

const Radio = forwardRef<HTMLButtonElement, Props>(function RadioBase(
  { className, value, label, ...props },
  ref
) {
  const radioId = useId();

  return (
    <div className="flex items-center">
      <RadioGroup.Item
        {...props}
        ref={ref}
        className="h-5 w-5 cursor-default rounded-full border border-gray-600 bg-white"
        value={value}
        id={radioId}
      >
        <RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-2 after:w-2 after:rounded-[50%] after:bg-primary after:content-['']" />
      </RadioGroup.Item>
      <label
        className="pl-[15px] text-sm leading-none text-gray-600"
        htmlFor={radioId}
      >
        {label}
      </label>
    </div>
  );
});

export default Radio;
