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

    const enStocks = holdings
      .filter((holding) => holding.stock.marketType === "外国株")
      .map((holding) => {
        const evaluationAmount =
          holding.numberOfSharesHeld * holding.stock.currentStockPrice * JPY;
        const profitLossAmount =
          evaluationAmount -
          holding.numberOfSharesHeld * holding.acquisitionPriceJPY!;
        const evaluationProfitLossRate =
          (profitLossAmount / evaluationAmount) * 100;

        return {
          holdingId: holding.holdingId, //id
          dividend: holding.stock.dividend * JPY, //配当金
          evaluationAmount: evaluationAmount, // 評価額
          profitLossAmount: profitLossAmount, // 損益額
          numberOfSharesHeld: holding.numberOfSharesHeld, // 保有株数
          evaluationProfitLossRate: evaluationProfitLossRate, // 評価損益率
          acquisitionPrice: holding.acquisitionPrice, // 取得価格
          stockCode: holding.stock.stockCode, // 株式コード
          stockName: holding.stock.stockName, // 会社名
        };
      });

    return { enStocks };
  } catch (error) {
    return handlePrismaError(error);
  }
};

export type FgnStockListReturn = Awaited<
  ReturnType<typeof fetchYenFgnListServer>
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
    return { enStocks };
  } catch (error) {
    return handlePrismaError(error);
  }
};
