import { FC } from "react";

import { CardWrapper } from "@/app/_components/atoms/CardWrapper";
import { TotalProfitAndLoss } from "@/app/_components/atoms/TotalProfitAndLoss";
import { TotalStocks } from "@/app/_components/atoms/TotalStocks";
// import { jaStockTotal } from "@/services/server/jaStockTotal";

export const JaStocksPriceCard: FC = async () => {
  // const { currentStockPriceSum, profitLossAmount, evaluationProfitLossRate } =
  //   await jaStockTotal();

  return (
    <CardWrapper>
      <TotalStocks total={0} />
      <TotalProfitAndLoss profitMargin={0} profitAndLossAmount={0} />
    </CardWrapper>
  );
};
