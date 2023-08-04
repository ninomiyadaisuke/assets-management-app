import { FC, ReactElement } from "react";

import { fetchStockList } from "@/services/client/jaStockList";
import { BasicInfo } from "@/services/server/jaStockList";

type Props = {
  children: (item: BasicInfo, array: number[]) => ReactElement;
};

export const JaStockListWrapper: FC<Props> = async ({ children }) => {
  const japaneseStocks = await fetchStockList();

  return (
    <>
      {japaneseStocks &&
        japaneseStocks.map((item) => {
          const {
            numberOfSharesHeld,
            evaluationProfitLossRate,
            acquisitionPrice,
            dividend,
            ...basic
          } = item;

          const {
            stockId,
            evaluationAmount,
            profitLossAmount,
            stockCode,
            stockName,
            ...array
          } = item;
          return children(basic, [
            array.numberOfSharesHeld,
            array.evaluationProfitLossRate,
            array.acquisitionPrice,
            array.dividend,
          ]);
        })}
    </>
  );
};
