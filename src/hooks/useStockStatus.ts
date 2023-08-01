import { useAtom } from "jotai";

import { stocksInfoContext } from "@/contexts/stocksInfoContext";

export const useStockStatus = () => {
  const [stockStatus, setStockStatus] = useAtom(stocksInfoContext);
  const { stockName, ...stockDetails } = stockStatus;
  return {
    stockName,
    stockDetailsArray: [{ ...stockDetails }],
    ...stockDetails,
    setStockStatus,
  };
};
