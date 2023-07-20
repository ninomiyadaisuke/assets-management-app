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
      className="w-[62px] h-[24px] bg-white  rounded-full relative  focus:shadow-[0_0_0_2px] focus:shadow-black  outline-none cursor-default"
    >
      <RadixSwitch.Thumb className="block text-white absolute top-0 left-[-2.3px] w-[32px] h-[24px] bg-blackA9  rounded-full shadow-[0_2px_2px] shadow-blackA7 transition-transform duration-300 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[32.6px] data-[state=checked]:after:relative  data-[state=checked]:after:content-['＄']  data-[state=checked]:after:top-[-1px] data-[state=unchecked]:before:relative  data-[state=unchecked]:before:content-['¥'] data-[state=unchecked]:before:top-[-1px] " />
      <RadixSwitch.Thumb className="block absolute left-[10.5px] top-[-1px] transition-opacity duration-75 ease-in-out data-[state=unchecked]:opacity-0 data-[state=unchecked]:visibility-hidden">
        ¥
      </RadixSwitch.Thumb>
      <RadixSwitch.Thumb className="block absolute right-[8.2px] top-[-1px] transition-opacity duration-75 ease-in-out data-[state=checked]:opacity-0 data-[state=checked]:visibility-hidden">
        ＄
      </RadixSwitch.Thumb>
    </RadixSwitch.Root>
  );
});
