import { FC, ReactElement } from "react";

import { UnauthorizedError } from "@/libs/error";
import { fetchFgnStockListClient } from "@/services/client/fgnStockList";
import { serverComponentAuthValidateAndReturnUid } from "@/services/server/auth";
import { BasicInfo } from "@/services/server/fgnStockList";

type Props = {
  children: (item: BasicInfo, array: number[]) => ReactElement;
  status: "yen" | "dollar";
};

export const FgnStockListWrapper: FC<Props> = async ({ children, status }) => {
  const uid = await serverComponentAuthValidateAndReturnUid();
  if (!uid) throw new UnauthorizedError();
  const fgnStocks = await fetchFgnStockListClient(uid, status);

  return (
    <>
      {fgnStocks &&
        fgnStocks.map((item) => {
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
