"use client";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useRouter } from "next/navigation";
import { FC } from "react";

import { RadioBox } from "@/app/_components/atoms/RadioBox";

type Props = {
  options: string[];
  status: "評価額" | "配当額" | "景気敏感割合";
};

export const RadioBoxGroup: FC<Props> = ({ options, status }) => {
  const router = useRouter();
  return (
    <RadioGroup.Root className="flex gap-1">
      {options.map((label, i) => (
        <RadioGroup.Item key={i} value={label} id={label}>
          <RadioBox
            label={label}
            name="radio"
            onChange={(e) => {
              router.push(`?status=${e.target.value}`);
              router.refresh();
            }}
            defaultChecked={label === status}
          />
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
};
