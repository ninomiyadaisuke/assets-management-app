import { headers } from "next/headers";
import { FC } from "react";

import { CardWrapper } from "@/app/_components/atoms/CardWrapper";
import { TotalProfitAndLoss } from "@/app/_components/atoms/TotalProfitAndLoss";
import { TotalStocks } from "@/app/_components/atoms/TotalStocks";
import { typedFetch } from "@/libs/fetchUtils";
import { JaStockTotalReturn } from "@/services/server/jaStockTotal";
// import { getJaStocksTotal } from "@/services/client/jaStockTotal";

const getJaStocksTotal = async () => {
  return typedFetch<JaStockTotalReturn>(
    `${process.env.DB_HOST}/api/stocks/ja/total`,
    {
      headers: {
        cookie: headers().get("cookie") as string,
      },
      cache: "no-store",
    }
  );
};

export const JaStocksPriceCard: FC = async () => {
  const { currentStockPriceSum, profitLossAmount, evaluationProfitLossRate } =
    await getJaStocksTotal();

  return (
    <CardWrapper>
      <TotalStocks total={currentStockPriceSum} />
      <TotalProfitAndLoss
        profitMargin={evaluationProfitLossRate}
        profitAndLossAmount={profitLossAmount}
      />
    </CardWrapper>
  );
};
