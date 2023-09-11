import { PrismaClient } from "@prisma/client";

import { sheets, spreadsheetId } from "./auth";
import { Result, Stock } from "./types";
import { convertToNumber } from "./util";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const getSheetValues = async (sheetName: string) => {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: sheetName,
  });
  return res.data.values;
};

export const getDividends = async (marketType: "日本株" | "外国株") => {
  const stocks = await prisma.stock.findMany({
    where: {
      marketType,
    },
    select: {
      stockId: true,
      stockName: true,
      dividend: true,
    },
  });
  return stocks;
};

export const getStocks = async (marketType: "日本株" | "外国株") => {
  const stocks = await prisma.stock.findMany({
    where: {
      marketType,
    },
    select: {
      stockId: true,
      stockName: true,
      currentStockPrice: true,
    },
  });
  return stocks;
};

export const updateStockPrices = (results: Omit<Result, "dividend">[] = []) => {
  return results.map((result) =>
    prisma.stock.update({
      where: {
        stockId: result.stockId,
      },
      data: {
        currentStockPrice: result.currentStockPrice,
      },
    })
  );
};

export const updateDividendPrices = (
  results: Omit<Result, "currentStockPrice">[] = []
) => {
  return results.map((result) =>
    prisma.stock.update({
      where: {
        stockId: result.stockId,
      },
      data: {
        dividend: result.dividend,
      },
    })
  );
};

export const addStockDataToResults = (
  stock: Omit<Stock, "dividend">,
  results: Omit<Result, "dividend">[] = [],
  targetRow: any[] | undefined
) => {
  if (targetRow) {
    const [_, currentStockPrice] = targetRow;

    const data = {
      stockId: stock.stockId,
      currentStockPrice: convertToNumber(currentStockPrice),
    };
    results.push(data);
  }
  return;
};

export const addDividendDataToResult = (
  stock: Omit<Stock, "currentStockPrice">,
  results: Omit<Result, "currentStockPrice">[] = [],
  targetRow: any[] | undefined
) => {
  if (targetRow) {
    const [_, __, ___, dividend] = targetRow;
    const data = {
      stockId: stock.stockId,
      dividend: convertToNumber(dividend),
    };
    results.push(data);
  }
  return;
};
