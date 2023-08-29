import { fetchLatestUsdToJpyRateClient } from "@/services/client/exchangeRate";

import { handlePrismaError, prisma } from "../index";

export const fetchYenDividendYieldServer = async (userId: string) => {
  const holdings = await prisma.holding.findMany({
    where: {
      userId,
      stock: {
        marketType: "日本株",
      },
    },
    select: {
      numberOfSharesHeld: true,
      acquisitionPrice: true,
      stock: {
        select: {
          dividend: true,
          currentStockPrice: true,
        },
      },
    },
  });

  const totalDivident = holdings.reduce(
    (sum, holding) => sum + holding.stock.dividend,
    0
  );

  const totalAcquisitionPrice = holdings.reduce(
    (sum, holding) => sum + holding.acquisitionPrice,
    0
  );

  const totalCurrentStockPrice = holdings.reduce(
    (sum, holding) => sum + holding.stock.currentStockPrice,
    0
  );

  const marketYield = Number(
    ((totalDivident / totalCurrentStockPrice) * 100).toFixed(2)
  );

  const acquisitionPriceYield = Number(
    ((totalDivident / totalAcquisitionPrice) * 100).toFixed(2)
  );
  return { marketYield, acquisitionPriceYield };
};

export type DividendYieldReturn = Awaited<
  ReturnType<typeof fetchYenDividendYieldServer>
>;
