"use client";

import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";
import { FC } from "react";

import { ValueDisplay } from "@/app/_components/atoms/ValueDisplay";
import { returnThemePlusOrMinus } from "@/libs/utils";

type Props = {
  profitMargin: number;
  profitAndLossAmount: number;
  unit: "円" | "＄";
};

export const TotalProfitAndLoss: FC<Props> = ({
  profitMargin,
  profitAndLossAmount,
  unit,
}) => {
  return (
    <div className="relative flex flex-col gap-7 px-3 py-4 after:absolute after:top-14 after:h-[1px] after:w-[calc(100%_-_24px)] after:bg-gray-300">
      <div className="flex justify-between">
        <p>損益率</p>
        <ValueDisplay theme={returnThemePlusOrMinus(profitMargin)} unit="%">
          {profitMargin}
        </ValueDisplay>
      </div>
      <div className="flex justify-between">
        <p>評価損益合計</p>
        <ValueDisplay
          theme={returnThemePlusOrMinus(profitAndLossAmount)}
          unit={unit}
        >
          {profitAndLossAmount}
        </ValueDisplay>
      </div>
    </div>
  );
};
