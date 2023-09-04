import { typedFetch } from "@/libs/fetchUtils";
import { url } from "@/services/client/url";
import { FgnStockTotalReturn } from "@/services/server/fgnStocksTotal";

export const fetchFgnStocksTotalClient = async (
  uid: string,
  status: "dollar" | "yen"
) => {
  const params = { q: uid };
  const query = new URLSearchParams(params);
  return typedFetch<FgnStockTotalReturn>(
    `${url}/api/stocks/fgn/total/${status}?${query}`,
    { cache: "force-cache" }
  );
};
