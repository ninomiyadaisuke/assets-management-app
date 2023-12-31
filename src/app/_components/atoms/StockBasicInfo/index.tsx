import { usePathname } from "next/navigation";
import { forwardRef } from "react";

import { returnThemePlusOrMinus } from "@/libs/utils";

import { ToUpdateLink } from "../ToUpdateLink";
import { ValueDisplay } from "../ValueDisplay";

type Props = React.ComponentPropsWithRef<"div"> & {
  id: string;
  stockCode: string;
  stockName: string;
  evaluationAmount: number;
  profitLossAmount: number;
  unit: "円" | "＄";
};

export const StockBasicInfo = forwardRef<HTMLDivElement, Props>(
  function StockBasicInfoBase(
    {
      stockCode,
      stockName,
      evaluationAmount,
      profitLossAmount,
      id,
      unit,
      ...props
    },
    ref
  ) {
    const param = usePathname()!;
    const path = param.includes("foreign-stocks") ? "fgn" : "ja";

    return (
      <div className="flex flex-col gap-2 p-3" {...props} ref={ref}>
        <span className="text-xs text-gray-400">{stockCode}</span>
        <ToUpdateLink href={`/edit/${path}/${id}`}>{stockName}</ToUpdateLink>
        <div className="flex justify-between">
          <p className="text-base">評価額</p>
          <ValueDisplay theme="default" unit={unit}>
            {evaluationAmount}
          </ValueDisplay>
        </div>
        <div className="flex justify-between">
          <p className="text-base">損益額</p>
          <ValueDisplay
            theme={returnThemePlusOrMinus(profitLossAmount)}
            unit={unit}
          >
            {profitLossAmount}
          </ValueDisplay>
        </div>
      </div>
    );
  }
);
