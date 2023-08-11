"use client";
import { FC } from "react";

import { ValueDisplay } from "@/app/_components/atoms/ValueDisplay";

type Props = {
  total: number;
  unit: "円" | "＄";
};

export const TotalStocks: FC<Props> = ({ total, unit }) => {
  return (
    <div className="flex justify-between bg-blue-50 px-3 py-4">
      <h1 className="flex items-end text-blue-900">保有資産合計</h1>
      <ValueDisplay
        theme="default"
        variant="extraLarge"
        vold="medium"
        unit={unit}
      >
        {total}
      </ValueDisplay>
    </div>
  );
};
