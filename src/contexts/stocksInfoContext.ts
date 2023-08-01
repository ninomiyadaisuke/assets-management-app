import { atom } from "jotai";

export type SearchedStockType = {
  industry: string;
  stockCode: string;
  stockName: string;
  dividend: number;
  dividendYield: number;
  latestStockPrice: number;
};

export const searchedStockInitialState = {
  stockCode: "",
  industry: "",
  stockName: "",
  dividend: 0,
  dividendYield: 0,
  latestStockPrice: 0,
};

export const stocksInfoContext = atom<SearchedStockType>(
  searchedStockInitialState
);
