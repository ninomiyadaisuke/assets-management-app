"use client";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useRouter } from "next/navigation";
import { FC } from "react";

import { RadioBox } from "@/app/_components/atoms/RadioBox";

type Props = {
  options: string[];
};

export const RadioBoxGroup: FC<Props> = ({ options }) => {
  const router = useRouter();
  return (
    <RadioGroup.Root className="flex gap-1">
      {options.map((label, i) => (
        <RadioGroup.Item key={i} value={label} id={label}>
          <RadioBox
            label={label}
            name="radio"
            onChange={(e) => router.push(`?status=${e.target.value}`)}
            defaultChecked={label === "評価額"}
          />
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
};
