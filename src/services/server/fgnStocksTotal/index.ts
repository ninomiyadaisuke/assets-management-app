import { NotFoundError } from "@/libs/error";
import { fetchLatestUsdToJpyRateClient } from "@/services/client/exchangeRate";

import { handlePrismaError, prisma } from "../index";

export const fetchYenFgnStocksTotalServer = async (userId: string | null) => {
  try {
    if (!userId) throw new NotFoundError();
    const selectedHoldings = await prisma.holding.findMany({
      select: {
        stockId: true,
        numberOfSharesHeld: true,
        acquisitionPriceJPY: true,
        stock: {
          select: {
            currentStockPrice: true,
            marketType: true,
          },
        },
      },
      where: {
        userId,
      },
    });

    const foreignHoldings = selectedHoldings.filter(
      (holding) => holding.stock.marketType === "外国株"
    );

    const {
      conversion_rates: { JPY },
    } = await fetchLatestUsdToJpyRateClient();

    const currentStockPriceSum = foreignHoldings.reduce(
      (sum, holding) =>
        sum +
        holding.stock.currentStockPrice * JPY * holding.numberOfSharesHeld,
      0
    );

    const acquisitionPriceSumJPY = foreignHoldings.reduce(
      (sum, holding) =>
        sum + holding.acquisitionPriceJPY! * holding.numberOfSharesHeld,
      0
    );

    const profitLossAmount = currentStockPriceSum - acquisitionPriceSumJPY;

    const evaluationProfitLossRate =
      (profitLossAmount / acquisitionPriceSumJPY) * 100;
    return {
      currentStockPriceSum,
      profitLossAmount,
      evaluationProfitLossRate,
    };
  } catch (error) {
    return handlePrismaError(error);
  }
};

export type FgnStockTotalReturn = Awaited<
  ReturnType<typeof fetchYenFgnStocksTotalServer>
>;

export const fetchDollarFgnStocksTotalServer = async (
  userId: string | null
) => {
  try {
    if (!userId) throw new NotFoundError();
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
      (holding) => holding.stock.marketType === "外国株"
    );

    const currentStockPriceSum = foreignHoldings.reduce(
      (sum, holding) =>
        sum + holding.stock.currentStockPrice * holding.numberOfSharesHeld,
      0
    );

    const acquisitionPriceSum = foreignHoldings.reduce(
      (sum, holding) =>
        sum + holding.acquisitionPrice! * holding.numberOfSharesHeld,
      0
    );

    const profitLossAmount = currentStockPriceSum - acquisitionPriceSum;
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
