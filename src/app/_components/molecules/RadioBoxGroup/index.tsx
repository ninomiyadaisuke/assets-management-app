"use client";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useRouter } from "next/navigation";
import { FC } from "react";

import { RadioBox } from "@/app/_components/atoms/RadioBox";

const data = ["評価額", "配当額", "景気敏感割合"];

export const RadioBoxGroup: FC = () => {
  const router = useRouter();
  return (
    <RadioGroup.Root className="flex gap-1">
      {data.map((label, i) => (
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
