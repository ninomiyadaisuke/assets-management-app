import { typedFetch } from "@/libs/fetchUtils";
import { url } from "@/services/client/url";
import type { JaStockListReturn } from "@/services/server/jaStockList";

export const fetchStockList = async (uid: string) => {
  const params = { q: uid };
  const query = new URLSearchParams(params);
  return typedFetch<JaStockListReturn>(
    `${url}/api/stocks/ja/list?${query}`,
    {}
  );
};
