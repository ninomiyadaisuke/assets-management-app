import { headers } from "next/headers";

import { typedFetch } from "@/libs/fetchUtils";
import { url } from "@/services/client/url";
import type { JaStockTotalReturn } from "@/services/server/jaStockTotal";

export const fetchJaStocksTotal = async () => {
  return typedFetch<JaStockTotalReturn>(`${url}/api/stocks/ja/total`, {
    headers: {
      cookie: headers().get("cookie") as string,
    },
    cache: "no-store",
  });
};
