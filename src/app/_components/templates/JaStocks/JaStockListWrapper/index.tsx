import { FC, ReactElement } from "react";

import { NotItems } from "@/app/_components/atoms/NotItems";
import { fetchStockList } from "@/services/client/jaStockList";
import { serverComponentAuthValidateAndReturnUid } from "@/services/server/auth";
import { BasicInfo } from "@/services/server/jaStockList";

type Props = {
  children: (item: BasicInfo, array: number[]) => ReactElement;
};

export const JaStockListWrapper: FC<Props> = async ({ children }) => {
  const uid = await serverComponentAuthValidateAndReturnUid();
  const japaneseStocks = await fetchStockList(uid);

  return (
    <>
      {japaneseStocks.length > 0 ? (
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
        })
      ) : (
        <NotItems />
      )}
    </>
  );
};
