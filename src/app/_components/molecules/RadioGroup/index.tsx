"use client";

import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import React, { FC } from "react";

import Radio from "../../atoms/Radio";

const radioData = [
  { value: "特定口座", label: "特定" },
  { value: "新NISA口座", label: "NISA" },
  { value: "両方", label: "両方" },
];

export const RadioGroup: FC = () => {
  return (
    <fieldset>
      <legend className="mb-3 text-gray-600">どの口座で登録しますか？</legend>
      <RadixRadioGroup.Root
        className="flex gap-2.5"
        defaultValue="特定口座"
        aria-label="View density"
      >
        {radioData.map((data) => (
          <Radio key={data.value} value={data.value} label={data.label} />
        ))}
      </RadixRadioGroup.Root>
    </fieldset>
  );
};
