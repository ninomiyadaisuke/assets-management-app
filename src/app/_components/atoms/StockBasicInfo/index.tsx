import { usePathname } from "next/navigation";
import { forwardRef } from "react";

import { ToUpdateLink } from "../ToUpdateLink";
import { ValueDisplay } from "../ValueDisplay";

type Props = React.ComponentPropsWithRef<"div"> & {
  id: string;
  stockCode: string;
  stockName: string;
  evaluationAmount: number;
  profitLossAmount: number;
};

export const StockBasicInfo = forwardRef<HTMLDivElement, Props>(
  function StockBasicInfoBase(
    { stockCode, stockName, evaluationAmount, profitLossAmount, id, ...props },
    ref
  ) {
    const pathname = usePathname();
    const unit = pathname === "/" ? "円" : "＄";
    return (
      <div className="flex flex-col gap-2 p-3" {...props} ref={ref}>
        <span className="text-xs text-gray-400">{stockCode}</span>
        <ToUpdateLink href={`/edit/ja/${id}`}>{stockName}</ToUpdateLink>
        <div className="flex justify-between">
          <p className="text-sm">評価額</p>
          <ValueDisplay theme="plus" unit={unit}>
            {evaluationAmount}
          </ValueDisplay>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">損益額</p>
          <ValueDisplay theme="plus" unit={unit}>
            {profitLossAmount}
          </ValueDisplay>
        </div>
      </div>
    );
  }
);
