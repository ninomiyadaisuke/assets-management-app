import { useAtom } from "jotai";

import {
  searchedStockInitialState,
  stocksInfoContext,
} from "@/contexts/stocksInfoContext";

import { useAssetType } from "./useAssetType";

export const useStockStatus = () => {
  const [stockStatus, setStockStatus] = useAtom(stocksInfoContext);
  const { stockName, ...stockDetails } = stockStatus;
  const { setAssetType } = useAssetType();

  const resetStockStatus = () => {
    setStockStatus(searchedStockInitialState);
    setAssetType("特定口座");
  };
  return {
    stockName,
    ...stockDetails,
    setStockStatus,
    resetStockStatus,
  };
};
