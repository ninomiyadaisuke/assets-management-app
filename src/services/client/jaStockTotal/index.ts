import { headers } from "next/headers";

import { typedFetch } from "@/libs/fetchUtils";
import type { JaStockTotalReturn } from "@/services/server/jaStockTotal";

const url = process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";

export const getJaStocksTotal = async () => {
  return typedFetch<JaStockTotalReturn>(`${url}/api/stocks/ja/total`, {
    headers: {
      cookie: headers().get("cookie") as string,
    },
    cache: "no-store",
  });
};
