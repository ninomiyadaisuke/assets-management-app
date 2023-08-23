import { sensitiveStocks } from "@/libs/data";

import { handlePrismaError, prisma } from "../index";

export const fetchJaGraphTotalServer = async (userId: string) => {
  try {
    const holdings = await prisma.holding.findMany({
      where: {
        userId,
        stock: {
          marketType: "日本株",
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

    const totalPrice = holdings.reduce(
      (sum, holding) =>
        sum + holding.stock.currentStockPrice * holding.numberOfSharesHeld,
      0
    );

    // 2. industry別の合計値を計算
    const industryTotals = holdings.reduce<{ [key: string]: number }>(
      (acc, holding) => {
        const industryKey: string = holding.stock.industry || "Unknown";
        const value =
          holding.numberOfSharesHeld * holding.stock.currentStockPrice;
        if (!acc[industryKey]) {
          acc[industryKey] = value;
        } else {
          acc[industryKey] += value;
        }
        return acc;
      },
      {}
    );

    const grandTotal = Object.values(industryTotals).reduce(
      (sum, value) => sum + value,
      0
    );

    // 3. 各industryのtotalPriceに対する割合を計算
    const result = Object.entries(industryTotals).map(([industry, total]) => {
      return {
        id: industry,
        value: Number(((total / grandTotal) * 100).toFixed(1)),
      };
    });
    return { result, total: totalPrice };
  } catch (error) {
    return handlePrismaError(error);
  }
};

export type JaGraphTotalReturn = Awaited<
  ReturnType<typeof fetchJaGraphTotalServer>
>;

export const fetchJaGraphDividendServer = async (userId: string) => {
  try {
    const holdings = await prisma.holding.findMany({
      where: {
        userId,
        stock: {
          marketType: "日本株",
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

    const totalDividend = holdings.reduce(
      (sum, holding) =>
        sum + holding.stock.dividend * holding.numberOfSharesHeld,
      0
    );

    // 2. industry別の合計値を計算
    const industryTotals = holdings.reduce<{ [key: string]: number }>(
      (acc, holding) => {
        const industryKey: string = holding.stock.industry || "Unknown";
        const value = holding.numberOfSharesHeld * holding.stock.dividend;
        if (!acc[industryKey]) {
          acc[industryKey] = value;
        } else {
          acc[industryKey] += value;
        }
        return acc;
      },
      {}
    );

    const grandTotal = Object.values(industryTotals).reduce(
      (sum, value) => sum + value,
      0
    );

    const result = Object.entries(industryTotals).map(([industry, total]) => {
      return {
        id: industry,
        value: Number(((total / grandTotal) * 100).toFixed(1)),
      };
    });

    return { result, total: totalDividend };
  } catch (error) {
    return handlePrismaError(error);
  }
};

export const fetchJaGraphCalculateIndustryRatiosServer = async (
  userId: string
) => {
  const holdings = await prisma.holding.findMany({
    where: {
      userId,
      stock: {
        marketType: "日本株",
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

  const totalDividend = holdings.reduce(
    (sum, holding) => sum + holding.stock.dividend * holding.numberOfSharesHeld,
    0
  );
  const industryTotals = holdings.reduce(
    (acc, holding) => {
      const value = holding.numberOfSharesHeld * holding.stock.dividend;
      if (sensitiveStocks.includes(holding.stock.industry!)) {
        acc.Sensitive += value;
      } else {
        acc.Defensive += value;
      }
      return acc;
    },
    { Sensitive: 0, Defensive: 0 }
  );

  const grandTotal = industryTotals.Sensitive + industryTotals.Defensive;

  const result = Object.entries(industryTotals).map(([industry, total]) => {
    return {
      id: industry,
      value: Number(((total / grandTotal) * 100).toFixed(1)),
    };
  });
  return { result, total: totalDividend };
};
