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
        price,
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
