import * as ff from "@google-cloud/functions-framework";

import {
  addStockDataToResults,
  getSheetValues,
  getStocks,
  prisma,
  updateStockPrices,
} from "./libs";
import { Result } from "./libs/types";

ff.http("JaStocksFunction", async (req: ff.Request, res: ff.Response) => {
  try {
    const rows = await getSheetValues("閲覧専用!C:D");
    const stocks = await getStocks("日本株");
    const results: Result[] = [];
    if (rows) {
      for (const stock of stocks) {
        const targetRow = rows.find((row) => row[0] === stock.stockName);
        addStockDataToResults(stock, results, targetRow);
      }
    }
    const query = updateStockPrices(results);
    const result = await prisma.$transaction([...query]);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

ff.http("FgnStocksFunction", async (req: ff.Request, res: ff.Response) => {
  try {
    const rows = await getSheetValues("外国株!B:C");
    const stocks = await getStocks("外国株");
    const results: Result[] = [];
    if (rows) {
      for (const stock of stocks) {
        const targetRow = rows.find((row) => row[0] === stock.stockName);
        addStockDataToResults(stock, results, targetRow);
      }
    }
    const query = updateStockPrices(results);
    const result = await prisma.$transaction([...query]);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});
