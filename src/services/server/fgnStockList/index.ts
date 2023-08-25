import { Holding, Stock } from "@prisma/client";

import { NotFoundError } from "@/libs/error";
import { fetchLatestUsdToJpyRateClient } from "@/services/client/exchangeRate";

import { handlePrismaError, prisma } from "../index";

export const fetchYenFgnListServer = async (userId: string | null) => {
  try {
    if (!userId) throw new NotFoundError();
    const holdings = await prisma.holding.findMany({
      where: {
        userId,
      },
      include: {
        stock: true,
      },
    });

    const {
      conversion_rates: { JPY },
    } = await fetchLatestUsdToJpyRateClient();

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

    const enStocks = Object.values(stockMap)
      .filter((holdings) => holdings[0].stock.marketType === "外国株")
      .map((holdings) => {
        // 同じ株式の情報を集約
        const totalShares = holdings.reduce(
          (sum, holding) => sum + holding.numberOfSharesHeld,
          0
        );
        const totalAcquisitionPrice = holdings.reduce(
          (sum, holding) =>
            sum + holding.numberOfSharesHeld * holding.acquisitionPriceJPY!,
          0
        );

        const averageAcquisitionPrice = totalAcquisitionPrice / totalShares;
        const totalEvaluationAmount =
          totalShares * holdings[0].stock.currentStockPrice * JPY;
        const totalProfitLossAmount =
          totalEvaluationAmount - totalAcquisitionPrice;
        const evaluationProfitLossRate =
          (totalProfitLossAmount / totalAcquisitionPrice) * 100;
        const holdingIds = holdings.map((holding) => holding.holdingId);

        return {
          stockId: holdings[0].stockId,
          holdingId: holdingIds, //id
          dividend: holdings[0].stock.dividend, //配当金
          evaluationAmount: totalEvaluationAmount, // 評価額
          profitLossAmount: totalProfitLossAmount, // 損益額
          numberOfSharesHeld: totalShares, // 保有株数
          evaluationProfitLossRate: evaluationProfitLossRate, // 評価損益率
          acquisitionPrice: averageAcquisitionPrice, // 取得価格
          stockCode: holdings[0].stock.stockCode, // 株式コード
          stockName: holdings[0].stock.stockName, // 会社名
        };
      });

    return enStocks;
  } catch (error) {
    return handlePrismaError(error);
  }
};

export type FgnStockListReturn = Awaited<
  ReturnType<typeof fetchYenFgnListServer>
>;

export type FgnStockItem = FgnStockListReturn[number];

export type BasicInfo = Pick<
  FgnStockItem,
  | "stockId"
  | "evaluationAmount"
  | "profitLossAmount"
  | "stockCode"
  | "stockName"
>;

export const fetchDollarFgnListServer = async (userId: string | null) => {
  try {
    if (!userId) throw new NotFoundError();
    const holdings = await prisma.holding.findMany({
      where: {
        userId,
      },
      include: {
        stock: true,
      },
    });
    const enStocks = holdings
      .filter((holding) => holding.stock.marketType === "外国株")
      .map((holding) => {
        const evaluationAmount =
          holding.numberOfSharesHeld * holding.stock.currentStockPrice;
        const profitLossAmount =
          evaluationAmount -
          holding.numberOfSharesHeld * holding.acquisitionPrice;
        const evaluationProfitLossRate =
          (profitLossAmount /
            (holding.numberOfSharesHeld * holding.acquisitionPrice)) *
          100;

        return {
          stockId: holding.stockId,
          holdingId: holding.holdingId, //id
          dividend: holding.stock.dividend, //配当金
          evaluationAmount: evaluationAmount, // 評価額
          profitLossAmount: profitLossAmount, // 損益額
          numberOfSharesHeld: holding.numberOfSharesHeld, // 保有株数
          evaluationProfitLossRate: evaluationProfitLossRate, // 評価損益率
          acquisitionPrice: holding.acquisitionPrice, // 取得価格
          stockCode: holding.stock.stockCode, // 株式コード
          stockName: holding.stock.stockName, // 会社名
        };
      });
    return enStocks;
  } catch (error) {
    return handlePrismaError(error);
  }
};
