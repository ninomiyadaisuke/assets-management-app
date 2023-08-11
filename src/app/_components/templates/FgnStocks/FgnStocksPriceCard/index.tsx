import { FC } from "react";

import { CardWrapper } from "@/app/_components/atoms/CardWrapper";
import { TotalProfitAndLoss } from "@/app/_components/atoms/TotalProfitAndLoss";
import { TotalStocks } from "@/app/_components/atoms/TotalStocks";

export const FgnStocksPriceCard: FC = async () => {
  return (
    <CardWrapper>
      <TotalStocks total={1000} />
      <TotalProfitAndLoss profitMargin={10} profitAndLossAmount={200} />
    </CardWrapper>
  );
};
