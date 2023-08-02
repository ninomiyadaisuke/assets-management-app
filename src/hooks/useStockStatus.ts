import { useAtom } from "jotai";

import {
  searchedStockInitialState,
  stocksInfoContext,
} from "@/contexts/stocksInfoContext";

export const useStockStatus = () => {
  const [stockStatus, setStockStatus] = useAtom(stocksInfoContext);
  const { stockName, ...stockDetails } = stockStatus;

  const resetStockStatus = () => {
    setStockStatus(searchedStockInitialState);
  };
  return {
    stockName,
    ...stockDetails,
    setStockStatus,
    resetStockStatus,
  };
};
