import { Holding, Stock } from "@prisma/client";

import { handlePrismaError, prisma } from "../index";

export const jaStockList = async (userId: string) => {
  try {
    const holdings = await prisma.holding.findMany({
      where: {
        userId,
      },
      include: {
        stock: true,
      },
    });

    type HoldingWithStock = Holding & {
      stock: Stock;
    };

    // 同じ株式の情報をまとめるオブジェクトを作成
    const stockMap = holdings.reduce(
      (map: Record<string, HoldingWithStock[]>, holding: HoldingWithStock) => {
        const stockCode = holding.stock.stockCode;
        if (!map[stockCode]) {
          map[stockCode] = [];
        }
        map[stockCode].push(holding);

        return map;
      },
      {}
    );

    const japaneseStocks = Object.values(stockMap)
      .filter((holdings) => holdings[0].stock.marketType === "日本株")
      .map((holdings) => {
        //   // 同じ株式の情報を集約
        const totalShares = holdings.reduce(
          (sum, holding) => sum + holding.numberOfSharesHeld,
          0
        );
        const totalAcquisitionPrice = holdings.reduce(
          (sum, holding) =>
            sum + holding.numberOfSharesHeld * holding.acquisitionPrice,
          0
        );

        const averageAcquisitionPrice = totalAcquisitionPrice / totalShares;
        const totalEvaluationAmount =
          totalShares * holdings[0].stock.currentStockPrice;
        const totalProfitLossAmount =
          totalEvaluationAmount - totalAcquisitionPrice;
        const evaluationProfitLossRate =
          (totalProfitLossAmount / totalAcquisitionPrice) * 100;

        return {
          stockId: holdings[0].stockId,
          dividend: holdings[0].stock.dividend,
          evaluationAmount: totalEvaluationAmount,
          profitLossAmount: totalProfitLossAmount,
          numberOfSharesHeld: totalShares,
          evaluationProfitLossRate: evaluationProfitLossRate,
          acquisitionPrice: averageAcquisitionPrice,
          stockCode: holdings[0].stock.stockCode,
          stockName: holdings[0].stock.stockName,
        };
      });

    return japaneseStocks;
  } catch (error) {
    return handlePrismaError(error);
  }
};

export type JaStockListReturn = Awaited<ReturnType<typeof jaStockList>>;
export type JaStockItem = JaStockListReturn[number];

export type BasicInfo = Pick<
  JaStockItem,
  | "stockId"
  | "evaluationAmount"
  | "profitLossAmount"
  | "stockCode"
  | "stockName"
>;
