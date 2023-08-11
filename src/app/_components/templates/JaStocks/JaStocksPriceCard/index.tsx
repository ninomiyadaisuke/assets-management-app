import { FC } from "react";

import { CardWrapper } from "@/app/_components/atoms/CardWrapper";
import { TotalProfitAndLoss } from "@/app/_components/atoms/TotalProfitAndLoss";
import { TotalStocks } from "@/app/_components/atoms/TotalStocks";
import { fetchJaStocksTotal } from "@/services/client/jaStockTotal";

export const JaStocksPriceCard: FC = async () => {
  const { currentStockPriceSum, profitLossAmount, evaluationProfitLossRate } =
    await fetchJaStocksTotal();
  return (
    <CardWrapper>
      <TotalStocks unit="円" total={currentStockPriceSum} />
      <TotalProfitAndLoss
        unit="円"
        profitMargin={evaluationProfitLossRate}
        profitAndLossAmount={profitLossAmount}
      />
    </CardWrapper>
  );
};
