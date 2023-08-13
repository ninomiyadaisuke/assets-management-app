import { typedFetch } from "@/libs/fetchUtils";
import { url } from "@/services/client/url";
import { FgnStockListReturn } from "@/services/server/fgnStockList";

export const fetchFgnStockListClient = async (
  uid: string,
  status: "dollar" | "yen"
) => {
  const params = { q: uid };
  const query = new URLSearchParams(params);
  return typedFetch<FgnStockListReturn>(
    `${url}/api/stocks/fgn/list/${status}?${query}`,
    {}
  );
};
