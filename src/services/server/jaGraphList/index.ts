import { sensitiveStocks } from "@/libs/data";

import { handlePrismaError, prisma } from "../index";

export const fetchJaGraphListServer = async (userId: string) => {
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
            industry: true,
            currentStockPrice: true,
          },
        },
      },
    });
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
    const result = Object.entries(industryTotals).map(([industry, price]) => {
      return {
        title: industry,
        price: Number(price.toFixed(0)),
      };
    });
    const sortResult = result.sort((a, b) => b.price - a.price);

    return { result: sortResult };
  } catch (error) {
    return handlePrismaError(error);
  }
};

export type JaGraphListReturn = Awaited<
  ReturnType<typeof fetchJaGraphListServer>
>;

export const fetchJaGraphListDividentServer = async (userId: string) => {
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
            industry: true,
            dividend: true,
          },
        },
      },
    });
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
    const result = Object.entries(industryTotals).map(([industry, price]) => {
      return {
        title: industry,
        price: Number(price.toFixed(0)),
      };
    });
    const sortResult = result.sort((a, b) => b.price - a.price);

    return { result: sortResult };
  } catch (error) {
    return handlePrismaError(error);
  }
};

export const fetchJaGraphListCalculateIndustryRatiosServer = async (
  userId: string
) => {
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
            industry: true,
            dividend: true,
          },
        },
      },
    });
    const industryTotals = holdings.reduce<{ [key: string]: number }>(
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
    const result = Object.entries(industryTotals).map(([industry, price]) => {
      return {
        title: industry,
        price: Number(price.toFixed(0)),
      };
    });
    const sortResult = result.sort((a, b) => b.price - a.price);

    return { result: sortResult };
  } catch (error) {
    return handlePrismaError(error);
  }
};
