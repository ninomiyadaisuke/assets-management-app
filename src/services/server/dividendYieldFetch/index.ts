import { fetchLatestUsdToJpyRateClient } from "@/services/client/exchangeRate";

import { handlePrismaError, prisma } from "../index";

export const fetchYenDividendYieldServer = async (userId: string) => {
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
      (sum, holding) =>
        sum + holding.stock.dividend * holding.numberOfSharesHeld,
      0
    );

    const totalAcquisitionPrice = holdings.reduce(
      (sum, holding) =>
        sum + holding.acquisitionPrice * holding.numberOfSharesHeld,
      0
    );

    const totalCurrentStockPrice = holdings.reduce(
      (sum, holding) =>
        sum + holding.stock.currentStockPrice * holding.numberOfSharesHeld,
      0
    );

    const marketYield = Number(
      ((totalDivident / totalCurrentStockPrice) * 100).toFixed(2)
    );

    const acquisitionPriceYield = Number(
      ((totalDivident / totalAcquisitionPrice) * 100).toFixed(2)
    );
    return { marketYield, acquisitionPriceYield };
  } catch (error) {
    return handlePrismaError(error);
  }
};

export type DividendYieldReturn = Awaited<
  ReturnType<typeof fetchYenDividendYieldServer>
>;

export const fetchDollarDividendYieldServer = async (userId: string) => {
  try {
    const {
      conversion_rates: { JPY },
    } = await fetchLatestUsdToJpyRateClient();
    const holdings = await prisma.holding.findMany({
      where: {
        userId,
        stock: {
          marketType: "外国株",
        },
      },
      select: {
        numberOfSharesHeld: true,
        acquisitionPriceJPY: true,
        stock: {
          select: {
            dividend: true,
            currentStockPrice: true,
          },
        },
      },
    });

    const totalDivident = holdings.reduce(
      (sum, holding) =>
        sum + holding.stock.dividend * JPY * holding.numberOfSharesHeld,
      0
    );

    const totalAcquisitionPrice = holdings.reduce(
      (sum, holding) =>
        sum + holding.acquisitionPriceJPY! * holding.numberOfSharesHeld,
      0
    );

    const totalCurrentStockPrice = holdings.reduce(
      (sum, holding) =>
        sum +
        holding.stock.currentStockPrice * JPY * holding.numberOfSharesHeld,
      0
    );

    const marketYield = Number(
      ((totalDivident / totalCurrentStockPrice) * 100).toFixed(2)
    );

    const acquisitionPriceYield = Number(
      ((totalDivident / totalAcquisitionPrice) * 100).toFixed(2)
    );

    return { marketYield, acquisitionPriceYield };
  } catch (error) {
    return handlePrismaError(error);
  }
};

export const fetchJaAndDollarDividendYieldServer = async (userId: string) => {
  try {
    const {
      conversion_rates: { JPY },
    } = await fetchLatestUsdToJpyRateClient();
    const yenHoldings = await prisma.holding.findMany({
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
    const dollarHoldings = await prisma.holding.findMany({
      where: {
        userId,
        stock: {
          marketType: "外国株",
        },
      },
      select: {
        numberOfSharesHeld: true,
        acquisitionPriceJPY: true,
        stock: {
          select: {
            dividend: true,
            currentStockPrice: true,
          },
        },
      },
    });

    const yenDivident = yenHoldings.reduce(
      (sum, holding) =>
        sum + holding.stock.dividend * holding.numberOfSharesHeld,
      0
    );

    const yenAcquisitionPrice = yenHoldings.reduce(
      (sum, holding) =>
        sum + holding.acquisitionPrice * holding.numberOfSharesHeld,
      0
    );

    const yenCurrentStockPrice = yenHoldings.reduce(
      (sum, holding) =>
        sum + holding.stock.currentStockPrice * holding.numberOfSharesHeld,
      0
    );

    const dollarDivident = dollarHoldings.reduce(
      (sum, holding) =>
        sum + holding.stock.dividend * JPY * holding.numberOfSharesHeld,
      0
    );

    const dollarAcquisitionPrice = dollarHoldings.reduce(
      (sum, holding) =>
        sum + holding.acquisitionPriceJPY! * holding.numberOfSharesHeld,
      0
    );

    const dollarCurrentStockPrice = dollarHoldings.reduce(
      (sum, holding) =>
        sum +
        holding.stock.currentStockPrice * JPY * holding.numberOfSharesHeld,
      0
    );

    const totalDivident = Number((yenDivident + dollarDivident).toFixed(1));
    const totalAcquisitionPrice = Number(
      (yenAcquisitionPrice + dollarAcquisitionPrice).toFixed(1)
    );

    const totalCurrentStockPrice = Number(
      (yenCurrentStockPrice + dollarCurrentStockPrice).toFixed(1)
    );

    const marketYield = Number(
      ((totalDivident / totalCurrentStockPrice) * 100).toFixed(2)
    );

    const acquisitionPriceYield = Number(
      ((totalDivident / totalAcquisitionPrice) * 100).toFixed(2)
    );

    return { marketYield, acquisitionPriceYield };
  } catch (error) {
    return handlePrismaError(error);
  }
};
