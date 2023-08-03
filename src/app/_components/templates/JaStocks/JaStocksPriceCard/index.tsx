import { FC } from "react";

import { CardWrapper } from "@/app/_components/atoms/CardWrapper";
import { TotalProfitAndLoss } from "@/app/_components/atoms/TotalProfitAndLoss";
import { TotalStocks } from "@/app/_components/atoms/TotalStocks";
import { getJaStocksTotal } from "@/services/client/jaStockTotal";

export const dynamic = "force-dynamic"; //clodflare solution
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
