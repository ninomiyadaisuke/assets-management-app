import { FC } from "react";

import { CardWrapper } from "@/app/_components/atoms/CardWrapper";
import { TotalProfitAndLoss } from "@/app/_components/atoms/TotalProfitAndLoss";
import { TotalStocks } from "@/app/_components/atoms/TotalStocks";
import { getJaStocksTotal } from "@/services/client/jaStockTotal";

const test = async () => {
  const res = await fetch(
    `https://assets-management-app.vercel.app/api/stocks/ja/total`,
    {
      method: "GET",
    }
  );
  const data = await res.json();
  return data;
};

export const JaStocksPriceCard: FC = async () => {
  // const { currentStockPriceSum, profitLossAmount, evaluationProfitLossRate } =
  //   await getJaStocksTotal();
  const data = await test();
  // console.log(data);

  return (
    <CardWrapper>
      <TotalStocks total={0} />
      <TotalProfitAndLoss profitMargin={10} profitAndLossAmount={10} />
    </CardWrapper>
  );
};
