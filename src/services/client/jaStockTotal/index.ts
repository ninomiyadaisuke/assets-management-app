import { typedFetch } from "@/libs/fetchUtils";
import { url } from "@/services/client/url";
import type { JaStockTotalReturn } from "@/services/server/jaStockTotal";

export const fetchJaStocksTotal = async (uid: string) => {
  const params = { q: uid };
  const query = new URLSearchParams(params);
  return typedFetch<JaStockTotalReturn>(
    `${url}/api/stocks/ja/total?${query}`,
    {}
  );
};
