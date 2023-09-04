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
        },
      },
    },
  });
  return holdings;
};

export const fetchJaAndFgnGraphListServer = async (userId: string) => {
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

    const jaTotalPrice = jaHoldings.reduce(
      (sum, holding) =>
        sum + holding.stock.currentStockPrice * holding.numberOfSharesHeld,
      0
    );

    const result = [
      {
        title: "日本株",
        price: jaTotalPrice,
      },
      {
        title: "外国株",
        price: Number(fgnTotalPrice.toFixed(0)),
      },
    ];

    return { result };
  } catch (error) {
    return handlePrismaError(error);
  }
};

export type JaAndFgnGraphListReturn = Awaited<
  ReturnType<typeof fetchJaAndFgnGraphListServer>
>;

export const fetchJaFgnGraphListDividentServer = async (userId: string) => {
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

    const result = [
      {
        title: "日本株",
        price: Number(jaTotalDividend.toFixed(0)),
      },
      {
        title: "外国株",
        price: Number(fgnTotalDividend.toFixed(0)),
      },
    ];

    return { result };
  } catch (error) {
    return handlePrismaError(error);
  }
};
