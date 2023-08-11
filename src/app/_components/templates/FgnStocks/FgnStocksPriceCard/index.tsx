import { FC } from "react";

import { CardWrapper } from "@/app/_components/atoms/CardWrapper";
import { TotalProfitAndLoss } from "@/app/_components/atoms/TotalProfitAndLoss";
import { TotalStocks } from "@/app/_components/atoms/TotalStocks";
import { UnauthorizedError } from "@/libs/error";
import { fetchFgnStocksTotalClient } from "@/services/client/fgnStocksTotal";
import { serverComponentAuthValidateAndReturnUid } from "@/services/server/auth";

type Props = {
  status: "dollar" | "yen";
};

export const FgnStocksPriceCard: FC<Props> = async ({ status }) => {
  const uid = await serverComponentAuthValidateAndReturnUid();
  if (!uid) throw new UnauthorizedError();
  const data = await fetchFgnStocksTotalClient(uid, status);

  return (
    <CardWrapper>
      <TotalStocks
        unit={status === "yen" ? "円" : "＄"}
        total={data.currentStockPriceSum}
      />
      <TotalProfitAndLoss
        unit={status === "yen" ? "円" : "＄"}
        profitMargin={data.evaluationProfitLossRate}
        profitAndLossAmount={data.profitLossAmount}
      />
    </CardWrapper>
  );
};
