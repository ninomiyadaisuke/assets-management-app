import { Stock } from "@prisma/client";

export const stocksFixtures = (): Omit<Stock, "createdAt" | "updatedAt">[] => [
  {
    stockId: "stock1",
    stockName: "株1",
    stockCode: "code1",
    currentStockPrice: 1000,
    dividend: 100,
    industry: "水産・農林業",
    marketType: "日本株",
  },
  {
    stockId: "stock2",
    stockName: "株2",
    stockCode: "code2",
    currentStockPrice: 1000,
    dividend: 100,
    industry: "食料品",
    marketType: "日本株",
  },
  {
    stockId: "stock3",
    stockName: "株3",
    stockCode: "code3",
    currentStockPrice: 1000,
    dividend: 100,
    industry: "建設業",
    marketType: "日本株",
  },
  {
    stockId: "stock4",
    stockName: "株4",
    stockCode: "code4",
    currentStockPrice: 1000,
    dividend: 100,
    industry: "化学",
    marketType: "日本株",
  },
  {
    stockId: "stock5",
    stockName: "株5",
    stockCode: "code5",
    currentStockPrice: 30,
    dividend: 3.2,
    industry: "繊維製品",
    marketType: "外国株",
  },
  {
    stockId: "stock6",
    stockName: "株6",
    stockCode: "code6",
    currentStockPrice: 30,
    dividend: 3.2,
    industry: "サービス業",
    marketType: "外国株",
  },
  {
    stockId: "stock7",
    stockName: "株7",
    stockCode: "code7",
    currentStockPrice: 30,
    dividend: 3.2,
    industry: "情報・通信業",
    marketType: "外国株",
  },
  {
    stockId: "stock8",
    stockName: "株8",
    stockCode: "code8",
    currentStockPrice: 30,
    dividend: 3.2,
    industry: "小売業",
    marketType: "外国株",
  },
];