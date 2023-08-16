import { typedFetch } from "@/libs/fetchUtils";
import { FgnStockReturn } from "@/services/server/fgnStockEdit";

import { url } from "../url";

export const fetchFgnStocksClient = async (uid: string, stockId: string) => {
  const params = { q: uid };
  const query = new URLSearchParams(params);
  return await typedFetch<FgnStockReturn>(
    `${url}/api/edit/fgn/${stockId}?${query}`,
    {}
  );
};
