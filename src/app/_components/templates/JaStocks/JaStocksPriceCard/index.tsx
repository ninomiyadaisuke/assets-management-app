import { FC } from "react";

import { CardWrapper } from "@/app/_components/atoms/CardWrapper";
import { TotalProfitAndLoss } from "@/app/_components/atoms/TotalProfitAndLoss";
import { TotalStocks } from "@/app/_components/atoms/TotalStocks";

export const JaStocksPriceCard: FC = async () => {
  return (
    <CardWrapper>
      <TotalStocks total={300000000} />
      <TotalProfitAndLoss profitMargin={30.9} profitAndLossAmount={10000} />
    </CardWrapper>
  );
};
