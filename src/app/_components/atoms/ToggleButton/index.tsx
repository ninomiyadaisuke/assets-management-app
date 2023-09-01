/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import { forwardRef, useId } from "react";
type Props = Omit<React.ComponentPropsWithoutRef<"input">, "type" | "role">;

export const ToggleButton = forwardRef<HTMLInputElement, Props>(
  function ToggleButtonBase({ ...props }, ref) {
    const id = useId();
    return (
      <div className="flex gap-2">
        <p className="text-xs text-gray-600">評価額</p>
        <label className="relative h-[15px]  w-[40px] cursor-pointer  rounded-[50px] bg-[#4bd865] ">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            className="peer absolute left-0 top-0 z-10 block h-full w-full cursor-pointer opacity-0"
            {...props}
          />

          <label
            htmlFor={id}
            className="absolute left-0 h-[15px] w-[15px] rounded-full bg-white [box-shadow:0_0_5px_rgb(0_0_0_/_20%)] peer-checked:left-[25px]"
          ></label>
        </label>
        <p className="text-xs text-gray-600">取得価格</p>
      </div>
    );
  }
);
