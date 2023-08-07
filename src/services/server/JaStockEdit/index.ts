import { Holding, Stock } from "@prisma/client";

import { handlePrismaError, prisma } from "../index";

export const jaFetchStock = async (userId: string, stockId: string) => {
  try {
    // 特定口座のデータを取得
    const holdingsSpecific = await prisma.holding.findMany({
      where: {
        userId,
        account: {
          accountType: "特定口座",
        },
        stock: {
          stockId,
        },
      },
      include: {
        account: true,
        stock: true,
      },
    });

    // 新NISA口座のデータを取得
    const holdingsNISA = await prisma.holding.findMany({
      where: {
        userId,
        account: {
          accountType: "新NISA口座",
        },
        stock: {
          stockId,
        },
      },
      include: {
        account: true,
        stock: true,
      },
    });

    // データを結合
    const holdings = [...holdingsSpecific, ...holdingsNISA];
    const holdingIdAndAccountTypes = holdings.map((holding) => ({
      holdingId: holding.holdingId,
      accountType: holding.account.accountType,
    }));

    const numberOfSharesHeld = holdings.map(
      (holding) => holding.numberOfSharesHeld
    );
    const acquisitionPrice = holdings.map(
      (holding) => holding.acquisitionPrice
    );

    return {
      stockName: holdings[0]?.stock.stockName,
      stockCode: holdings[0]?.stock.stockCode,
      holdingIdAndAccountTypes,
      defaultValues: {
        numberOfSharesHeld,
        acquisitionPrice,
      },
    };
  } catch (error) {
    handlePrismaError(error);
    throw error;
  }
};

export type JaStockReturn = Awaited<ReturnType<typeof jaFetchStock>>;
