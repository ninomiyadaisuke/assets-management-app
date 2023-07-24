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
      className="relative h-[20px] w-[58px] cursor-default rounded-full bg-gray-300 text-xs text-gray-500 outline-none focus:shadow-[0_0_0_1px] focus:shadow-black"
    >
      <RadixSwitch.Thumb className="absolute left-[-2.3px] top-0 block h-[20px] w-[30px] translate-x-0.5 rounded-full bg-gray-700 text-white shadow-[0_2px_2px] shadow-blackA7 transition-transform duration-300 will-change-transform data-[state=checked]:translate-x-[30px] data-[state=unchecked]:before:relative data-[state=unchecked]:before:top-[2.5px] data-[state=unchecked]:before:content-['¥'] data-[state=checked]:after:relative data-[state=checked]:after:top-[2.5px] data-[state=checked]:after:content-['＄']" />
      <RadixSwitch.Thumb className="data-[state=unchecked]:visibility-hidden absolute left-[10.5px] top-[2.5px] block transition-opacity duration-75  ease-in-out data-[state=unchecked]:opacity-0">
        ¥
      </RadixSwitch.Thumb>
      <RadixSwitch.Thumb className="data-[state=checked]:visibility-hidden absolute right-[8.2px] top-[2.5px] block transition-opacity duration-75  ease-in-out data-[state=checked]:opacity-0">
        ＄
      </RadixSwitch.Thumb>
    </RadixSwitch.Root>
  );
});
