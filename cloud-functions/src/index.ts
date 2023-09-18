import * as ff from "@google-cloud/functions-framework";
import { PubSub } from "@google-cloud/pubsub";

import {
  addDividendDataToResult,
  addStockDataToResults,
  getDividends,
  getSheetValues,
  getStocks,
  prisma,
  updateDividendPrices,
  updateStockPrices,
} from "./libs";
import { Result } from "./libs/types";

const pubSubClient = new PubSub();
const topicName = "updated-jastocks";
const message = "日本株を更新したよ";

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
    const dataBuffer = Buffer.from(message);
    try {
      await pubSubClient.topic(topicName).publishMessage({ data: dataBuffer });
    } catch (error) {}

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

ff.http("DividendFunction", async (req: ff.Request, res: ff.Response) => {
  try {
    const jaRows = await getSheetValues("閲覧専用!C:F");
    const fgnRows = await getSheetValues("外国株!B:E");
    const fgnDividends = await getDividends("外国株");
    const jaDividends = await getDividends("日本株");

    const jaResults: Omit<Result, "currentStockPrice">[] = [];
    const fgnResults: Omit<Result, "currentStockPrice">[] = [];

    if (jaRows) {
      for (const stock of jaDividends) {
        const targetRow = jaRows.find((row) => row[0] === stock.stockName);
        addDividendDataToResult(stock, jaResults, targetRow);
      }
    }

    if (fgnRows) {
      for (const stock of fgnDividends) {
        const targetRow = fgnRows.find((row) => row[0] === stock.stockName);
        addDividendDataToResult(stock, fgnResults, targetRow);
      }
    }

    const jaQuery = updateDividendPrices(jaResults);
    const fgnQuery = updateDividendPrices(fgnResults);
    const result = await prisma.$transaction([...jaQuery, ...fgnQuery]);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});
