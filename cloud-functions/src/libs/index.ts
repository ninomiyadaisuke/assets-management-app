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

export const updateStockPrices = (results: Result[] = []) => {
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

export const addStockDataToResults = (
  stock: Stock,
  results: Result[] = [],
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
