import { headers } from "next/headers";

import { NotFoundError } from "@/libs/error";
import { typedFetch } from "@/libs/fetchUtils";

import { authValidateAndReturnUid } from "../auth";
import { handlePrismaError, prisma } from "../index";

// export const getJaStocksTotal = async () => {
//   return typedFetch<JaStockTotalReturn>(
//     `${process.env.API_URL}/api/stocks/ja/total`,
//     {
//       headers: {
//         cookie: headers().get("cookie") as string,
//       },
//       cache: "no-store",
//     }
//   );
// };

export const jaStockTotal = async () => {
  const userId = await authValidateAndReturnUid();
  try {
    const holdings = await prisma.holding.findMany({
      select: {
        stockId: true,
        numberOfSharesHeld: true,
        acquisitionPrice: true,
        stock: {
          select: {
            stockId: true,
            currentStockPrice: true,
            marketType: true,
          },
        },
      },
      where: {
        userId,
      },
    });
    const foreignHoldings = holdings.filter(
      (holding) => holding.stock.marketType === "日本株"
    );

    if (!foreignHoldings) throw new NotFoundError();

    const currentStockPriceSum = foreignHoldings.reduce(
      (sum, holding) =>
        sum + holding.stock.currentStockPrice * holding.numberOfSharesHeld,
      0
    );

    const acquisitionPriceSumJPY = foreignHoldings.reduce(
      (sum, holding) =>
        sum + holding.acquisitionPrice! * holding.numberOfSharesHeld,
      0
    );
    const profitLossAmount = currentStockPriceSum - acquisitionPriceSumJPY;
    const evaluationProfitLossRate =
      (profitLossAmount / currentStockPriceSum) * 100;

    return {
      currentStockPriceSum,
      profitLossAmount,
      evaluationProfitLossRate,
    };
  } catch (error) {
    return handlePrismaError(error);
  }
};

export type JaStockTotalReturn = Awaited<ReturnType<typeof jaStockTotal>>;
