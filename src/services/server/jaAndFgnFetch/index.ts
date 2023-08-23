import { fetchLatestUsdToJpyRateClient } from "@/services/client/exchangeRate";

import { handlePrismaError, prisma } from "../index";

const fetchUserHoldingsByMarketType = async (
  userId: string,
  marketType: "日本株" | "外国株"
) => {
  const holdings = await prisma.holding.findMany({
    where: {
      userId,
      stock: {
        marketType,
      },
    },
    select: {
      numberOfSharesHeld: true,
      stock: {
        select: {
          currentStockPrice: true,
          marketType: true,
          industry: true,
        },
      },
    },
  });
  return holdings;
};

const fetchUserHoldingsWithDividendAndIndustry = async (
  userId: string,
  marketType: "日本株" | "外国株"
) => {
  const holdings = await prisma.holding.findMany({
    where: {
      userId,
      stock: {
        marketType,
      },
    },
    select: {
      numberOfSharesHeld: true,
      stock: {
        select: {
          dividend: true,
          industry: true,
        },
      },
    },
  });
  return holdings;
};

export const fetchJaAndFgnGraphTotalServer = async (userId: string) => {
  try {
    const {
      conversion_rates: { JPY },
    } = await fetchLatestUsdToJpyRateClient();
    const fgnHoldings = await fetchUserHoldingsByMarketType(userId, "外国株");
    const jaHoldings = await fetchUserHoldingsByMarketType(userId, "日本株");

    const fgnTotalPrice = fgnHoldings.reduce(
      (sum, holding) =>
        sum +
        holding.stock.currentStockPrice * holding.numberOfSharesHeld * JPY,
      0
    );

    const JaTotalPrice = jaHoldings.reduce(
      (sum, holding) =>
        sum + holding.stock.currentStockPrice * holding.numberOfSharesHeld,
      0
    );

    const totalPrice = JaTotalPrice + fgnTotalPrice;

    const jaProportion = Number(((JaTotalPrice / totalPrice) * 100).toFixed(2));
    const fgnProportion = Number(
      ((fgnTotalPrice / totalPrice) * 100).toFixed(2)
    );

    const result = [
      {
        id: "日本株",
        value: jaProportion,
      },
      {
        id: "外国株",
        value: fgnProportion,
      },
    ];

    return { result, total: Number(totalPrice.toFixed(1)) };
  } catch (error) {
    return handlePrismaError(error);
  }
};

export type JaAndFgbGraphTotalReturn = Awaited<
  ReturnType<typeof fetchJaAndFgnGraphTotalServer>
>;

export const fetchJaAndFgnGraphDividendServer = async (userId: string) => {
  try {
    const {
      conversion_rates: { JPY },
    } = await fetchLatestUsdToJpyRateClient();
    const fgnHoldings = await fetchUserHoldingsWithDividendAndIndustry(
      userId,
      "外国株"
    );

    const jaHoldings = await fetchUserHoldingsWithDividendAndIndustry(
      userId,
      "日本株"
    );

    const fgnTotalDividend = fgnHoldings.reduce(
      (sum, holding) =>
        sum + holding.stock.dividend * holding.numberOfSharesHeld * JPY,
      0
    );

    const jaTotalDividend = jaHoldings.reduce(
      (sum, holding) =>
        sum + holding.stock.dividend * holding.numberOfSharesHeld,
      0
    );

    const totalDividend = Number(
      (fgnTotalDividend + jaTotalDividend).toFixed(1)
    );

    const jaProportion = Number(
      ((jaTotalDividend / totalDividend) * 100).toFixed(2)
    );
    const fgnProportion = Number(
      ((fgnTotalDividend / totalDividend) * 100).toFixed(2)
    );

    const result = [
      {
        id: "日本株",
        value: jaProportion,
      },
      {
        id: "外国株",
        value: fgnProportion,
      },
    ];

    return { result, total: totalDividend };
  } catch (error) {
    return handlePrismaError(error);
  }
};
