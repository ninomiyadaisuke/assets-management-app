"use client";

import * as RadixSwitch from "@radix-ui/react-switch";
import { ComponentPropsWithoutRef, forwardRef } from "react";

type Props = Omit<ComponentPropsWithoutRef<"button">, "className" | "onChange">;

export const Switch = forwardRef<HTMLButtonElement, Props>(function SwitchBase(
  { ...props },
  ref
) {
  return (
    <RadixSwitch.Root
      {...props}
      ref={ref}
      role="switch"
      className="w-[58px] h-[20px] bg-gray-300 rounded-full relative focus:shadow-[0_0_0_1px] focus:shadow-black outline-none cursor-default text-xs text-gray-500"
    >
      <RadixSwitch.Thumb className="block text-white absolute top-0 left-[-2.3px] w-[30px] h-[20px] bg-gray-700 rounded-full shadow-[0_2px_2px] shadow-blackA7 transition-transform duration-300 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[30px] data-[state=checked]:after:relative data-[state=checked]:after:content-['＄'] data-[state=checked]:after:top-[2.5px] data-[state=unchecked]:before:relative data-[state=unchecked]:before:content-['¥'] data-[state=unchecked]:before:top-[2.5px]" />
      <RadixSwitch.Thumb className="block absolute left-[10.5px] top-[2.5px] transition-opacity duration-75 ease-in-out  data-[state=unchecked]:opacity-0 data-[state=unchecked]:visibility-hidden">
        ¥
      </RadixSwitch.Thumb>
      <RadixSwitch.Thumb className="block absolute right-[8.2px] top-[2.5px] transition-opacity duration-75 ease-in-out  data-[state=checked]:opacity-0 data-[state=checked]:visibility-hidden">
        ＄
      </RadixSwitch.Thumb>
    </RadixSwitch.Root>
  );
});
