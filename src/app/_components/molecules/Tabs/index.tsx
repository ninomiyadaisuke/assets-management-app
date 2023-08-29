"use client";
import * as RadixTabs from "@radix-ui/react-tabs";
import { useRouter } from "next/navigation";
import { FC } from "react";

type Props = {
  options: string[];
};

export const Tabs: FC<Props> = ({ options }) => {
  const router = useRouter();
  return (
    <RadixTabs.Root
      className="flex w-full flex-col shadow-[0_2px_10px] shadow-blackA4"
      defaultValue={options[0]}
    >
      <RadixTabs.List className="flex shrink-0 border-b border-mauve6">
        {options.map((value) => (
          <RadixTabs.Trigger
            className="flex h-[50px] flex-1 cursor-default select-none items-center justify-center bg-white px-5 text-[15px] leading-none text-gray-500 outline-none hover:text-primary data-[state=active]:text-primary data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px]"
            value={value}
            onChange={(e) => {
              router.push(`?status=${e.currentTarget.value}`);
              router.refresh();
            }}
          >
            {value}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
    </RadixTabs.Root>
  );
};
